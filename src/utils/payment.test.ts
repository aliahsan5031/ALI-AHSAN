import { describe, expect, it } from 'vitest';
import { BANK_TRANSFER } from '../data/paymentConfig';
import { PRICING_PLANS } from '../data/portfolioData';
import {
  buildPaymentEmailBody,
  buildPaymentMailto,
  buildPaymentWhatsAppUrl,
  formatIban,
  getMissingBankFields,
  getTransferReferenceHint,
  isValidIban,
  normalizeIban,
} from './payment';

describe('configured bank details', () => {
  it('uses the exact account number and IBAN supplied by the owner', () => {
    expect(BANK_TRANSFER.accountNumber).toBe('00300114746720');
    expect(BANK_TRANSFER.iban).toBe('PK66MEZN0000300114746720');
  });

  it('has an IBAN that passes the mod-97 checksum and is consistent with the account number', () => {
    expect(isValidIban(BANK_TRANSFER.iban)).toBe(true);
    expect(normalizeIban(BANK_TRANSFER.iban).endsWith(BANK_TRANSFER.accountNumber)).toBe(true);
  });

  it('does not invent unknown details (bank, beneficiary, SWIFT, currency stay unset)', () => {
    expect(BANK_TRANSFER.bankName).toBeNull();
    expect(BANK_TRANSFER.beneficiaryName).toBeNull();
    expect(BANK_TRANSFER.swiftBic).toBeNull();
    expect(BANK_TRANSFER.currencyNote).toBeNull();
    expect(getMissingBankFields(BANK_TRANSFER)).toEqual([
      'Bank name',
      'Beneficiary name',
      'SWIFT/BIC',
      'Account currency',
    ]);
  });

  it('reports nothing missing once every detail is provided', () => {
    expect(
      getMissingBankFields({
        ...BANK_TRANSFER,
        bankName: 'X',
        beneficiaryName: 'Y',
        swiftBic: 'Z',
        currencyNote: 'W',
      }),
    ).toEqual([]);
  });
});

describe('IBAN helpers', () => {
  it('formats in groups of four without altering the value', () => {
    expect(formatIban('PK66MEZN0000300114746720')).toBe('PK66 MEZN 0000 3001 1474 6720');
    expect(normalizeIban(formatIban('PK66MEZN0000300114746720'))).toBe('PK66MEZN0000300114746720');
  });

  it('rejects a mistyped IBAN and malformed input', () => {
    expect(isValidIban('PK66MEZN0000300114746721')).toBe(false);
    expect(isValidIban('PK00')).toBe(false);
    expect(isValidIban('')).toBe(false);
  });

  it('accepts the standard ISO 13616 example', () => {
    expect(isValidIban('GB82 WEST 1234 5698 7654 32')).toBe(true);
  });
});

describe('plan data is unchanged', () => {
  it('keeps the existing three packages and prices', () => {
    expect(PRICING_PLANS.map((p) => p.price)).toEqual(['$99', '$149', '$199']);
  });
});

describe('payment message builders', () => {
  const plan = PRICING_PLANS[1];

  it('derives a reference hint from the plan id', () => {
    expect(getTransferReferenceHint(plan)).toBe('AA-GROWTH');
  });

  it('builds a mailto with an encoded subject and body mentioning the plan and price', () => {
    const url = buildPaymentMailto('someone@example.com', plan);
    expect(url.startsWith('mailto:someone@example.com?subject=')).toBe(true);
    const params = new URLSearchParams(url.split('?')[1]);
    expect(params.get('subject')).toContain(plan.name);
    expect(params.get('body')).toContain(plan.price);
    expect(params.get('body')).toContain('AA-GROWTH');
  });

  it('never states that payment was received', () => {
    const body = buildPaymentEmailBody(plan).toLowerCase();
    expect(body).not.toMatch(/\bpaid\b|payment received|confirmed paid/);
    expect(body).toContain('please confirm once the deposit appears');
  });

  it('builds a WhatsApp link on the existing base URL', () => {
    const url = buildPaymentWhatsAppUrl('https://wa.me/923098200159', plan);
    expect(url.startsWith('https://wa.me/923098200159?text=')).toBe(true);
    expect(decodeURIComponent(url)).toContain(plan.name);
  });
});
