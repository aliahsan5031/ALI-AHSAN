import { BankTransferDetails } from '../data/paymentConfig';
import { PricingPlan } from '../types';

/** Remove spaces/dashes and upper-case, so IBANs compare reliably. */
export const normalizeIban = (iban: string): string =>
  iban.replace(/[\s-]+/g, '').toUpperCase();

/** Groups an IBAN in blocks of four for display, e.g. "AB12CD34" -> "AB12 CD34". */
export const formatIban = (iban: string): string =>
  normalizeIban(iban).replace(/(.{4})/g, '$1 ').trim();

/** ISO 13616 mod-97 checksum. Catches typos in the configured IBAN. */
export const isValidIban = (iban: string): boolean => {
  const value = normalizeIban(iban);
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(value)) return false;
  const rearranged = value.slice(4) + value.slice(0, 4);
  let remainder = 0;
  for (const char of rearranged) {
    const digits = /\d/.test(char) ? char : String(char.charCodeAt(0) - 55);
    for (const digit of digits) {
      remainder = (remainder * 10 + Number(digit)) % 97;
    }
  }
  return remainder === 1;
};

/** Labels of bank details that have not been provided yet. */
export const getMissingBankFields = (details: BankTransferDetails): string[] => {
  const missing: string[] = [];
  if (!details.bankName) missing.push('Bank name');
  if (!details.beneficiaryName) missing.push('Beneficiary name');
  if (!details.swiftBic) missing.push('SWIFT/BIC');
  if (!details.currencyNote) missing.push('Account currency');
  return missing;
};

/**
 * A short reference the customer can put in the transfer description,
 * e.g. plan-growth -> "AA-GROWTH". It is a suggestion only: it is never used to
 * decide whether anything was paid.
 */
export const getTransferReferenceHint = (plan: Pick<PricingPlan, 'id'>): string =>
  `AA-${plan.id.replace(/^plan-/, '').toUpperCase()}`;

export const buildPaymentEmailSubject = (plan: Pick<PricingPlan, 'name'>): string =>
  `Bank transfer made - ${plan.name}`;

/** Pre-filled email the customer completes after they have sent a transfer. */
export const buildPaymentEmailBody = (
  plan: Pick<PricingPlan, 'id' | 'name' | 'price'>,
): string =>
  [
    'Hi Ali,',
    '',
    `I have sent a bank transfer for: ${plan.name} (${plan.price}).`,
    '',
    'Sender name: ',
    'Amount and currency sent: ',
    'Transfer date: ',
    `Payment reference / transaction ID: (suggested reference: ${getTransferReferenceHint(plan)})`,
    '',
    'Please confirm once the deposit appears in your account.',
  ].join('\n');

export const buildPaymentMailto = (
  email: string,
  plan: Pick<PricingPlan, 'id' | 'name' | 'price'>,
): string =>
  `mailto:${email}?subject=${encodeURIComponent(buildPaymentEmailSubject(plan))}` +
  `&body=${encodeURIComponent(buildPaymentEmailBody(plan))}`;

/** wa.me link with a pre-filled message. `baseUrl` is the site's existing WhatsApp link. */
export const buildPaymentWhatsAppUrl = (
  baseUrl: string,
  plan: Pick<PricingPlan, 'id' | 'name' | 'price'>,
): string =>
  `${baseUrl}?text=${encodeURIComponent(
    `Hi Ali, I'd like to pay for "${plan.name}" (${plan.price}) by bank transfer. ` +
      `Please confirm the beneficiary details before I send. Suggested reference: ${getTransferReferenceHint(plan)}`,
  )}`;
