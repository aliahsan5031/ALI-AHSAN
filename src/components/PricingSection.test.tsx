import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PricingSection } from './PricingSection';
import { BANK_TRANSFER } from '../data/paymentConfig';
import { PRICING_PLANS, PERSONAL_INFO } from '../data/portfolioData';

const setClipboard = (value: unknown) =>
  Object.defineProperty(navigator, 'clipboard', { value, configurable: true });

const dialogGone = () =>
  waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

const openPlan = async (
  index: number,
  onSelectPlan = vi.fn(),
  clipboard: unknown = { writeText: vi.fn().mockResolvedValue(undefined) },
) => {
  const user = userEvent.setup();
  // userEvent.setup() installs its own clipboard stub, so override it afterwards.
  setClipboard(clipboard);
  render(<PricingSection onSelectPlan={onSelectPlan} />);
  const plan = PRICING_PLANS[index];
  await user.click(screen.getByRole('button', { name: new RegExp(`Select ${plan.name}`) }));
  return { user, plan, onSelectPlan, dialog: screen.getByRole('dialog') };
};

describe('PricingSection payment dialog', () => {
  it('opens an accessible dialog for the selected package showing its existing price', async () => {
    const { dialog, plan } = await openPlan(1);
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAccessibleName(/how would you like to proceed/i);
    expect(within(dialog).getByText(new RegExp(`${plan.name} \\(\\$149\\)`))).toBeInTheDocument();
    expect(plan.price).toBe('$149');
  });

  it('shows the bank details, labelled as a manual transfer, by default', async () => {
    const { dialog } = await openPlan(0);
    expect(within(dialog).getByText('Manual bank transfer.')).toBeInTheDocument();
    expect(within(dialog).getByText(BANK_TRANSFER.accountNumber)).toBeInTheDocument();
    expect(within(dialog).getByText('PK66 MEZN 0000 3001 1474 6720')).toBeInTheDocument();
  });

  it('says money moves only from the customer’s bank and that the owner verifies the deposit', async () => {
    const { dialog } = await openPlan(0);
    expect(within(dialog).getByText(/does not move money/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/verify the deposit in my bank account/i)).toBeInTheDocument();
  });

  it('marks undisclosed details as to-be-confirmed instead of inventing them', async () => {
    const { dialog } = await openPlan(0);
    expect(within(dialog).getAllByText('To be confirmed — ask me before sending')).toHaveLength(4);
    expect(within(dialog).getByRole('note')).toHaveTextContent(/before\s*sending any money/i);
  });

  it('copies the raw IBAN (no spaces) to the clipboard', async () => {
    const { user, dialog } = await openPlan(0);
    await user.click(within(dialog).getByRole('button', { name: 'Copy IBAN' }));
    expect(vi.mocked(navigator.clipboard.writeText)).toHaveBeenCalledWith(BANK_TRANSFER.iban);
    expect(await within(dialog).findByText('IBAN copied')).toBeInTheDocument();
  });

  it('shows a usable message when the clipboard is unavailable', async () => {
    const { user, dialog } = await openPlan(0, vi.fn(), null);
    await user.click(within(dialog).getByRole('button', { name: 'Copy Account number' }));
    expect(await within(dialog).findByText(/select the text and copy it manually/i)).toBeInTheDocument();
  });

  it('keeps the existing inquiry/contact options available', async () => {
    const { user, dialog } = await openPlan(2);
    await user.click(within(dialog).getByRole('tab', { name: /inquiry \/ contact/i }));
    expect(within(dialog).getByText(PERSONAL_INFO.email)).toBeInTheDocument();
    expect(within(dialog).getByRole('link', { name: /whatsapp instant chat/i })).toHaveAttribute(
      'href',
      PERSONAL_INFO.socials.whatsapp,
    );
    expect(within(dialog).getByRole('link', { name: /linkedin profile/i })).toBeInTheDocument();
  });

  it('routes “Send Direct Inquiry Message” to the existing contact flow and closes the dialog', async () => {
    const onSelectPlan = vi.fn();
    const { user, dialog, plan } = await openPlan(2, onSelectPlan);
    await user.click(within(dialog).getByRole('tab', { name: /inquiry \/ contact/i }));
    await user.click(within(dialog).getByRole('button', { name: /send direct inquiry message/i }));
    expect(onSelectPlan).toHaveBeenCalledWith(plan.name);
    await dialogGone();
  });

  it('offers a way back to the inquiry flow from the bank tab', async () => {
    const { user, dialog } = await openPlan(0);
    await user.click(within(dialog).getByRole('button', { name: /use the contact options/i }));
    expect(within(dialog).getByRole('tab', { name: /inquiry \/ contact/i })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('closes on Escape and via the close button', async () => {
    const { user } = await openPlan(0);
    await user.keyboard('{Escape}');
    await dialogGone();

    await user.click(screen.getByRole('button', { name: /select multi-agent ecosystem/i }));
    await user.click(screen.getByRole('button', { name: /close dialog/i }));
    await dialogGone();
  });

  it('never claims a transfer is paid or confirmed', async () => {
    const { dialog } = await openPlan(0);
    expect(dialog.textContent ?? '').not.toMatch(/payment (received|successful|confirmed)|you have paid|order confirmed/i);
  });
});
