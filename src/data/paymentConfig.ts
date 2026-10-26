/**
 * Manual bank-transfer details — the ONE place to review or edit them.
 *
 * Nothing else in the codebase should repeat these values (a test enforces this).
 *
 * Fields set to `null` are details that have NOT been supplied/verified yet.
 * The payment dialog shows them as "to be confirmed" and tells the customer to
 * confirm the details with the site owner before sending money. Replace `null`
 * with the exact value from your bank (e.g. the bank's own account certificate
 * or online banking profile) — do not guess.
 */
export interface BankTransferDetails {
  /** Domestic account number, exactly as issued by the bank. */
  accountNumber: string;
  /** International Bank Account Number. */
  iban: string;
  /** Legal name of the bank. Not yet supplied. */
  bankName: string | null;
  /** Account title / beneficiary name exactly as on the bank record. Not yet supplied. */
  beneficiaryName: string | null;
  /** SWIFT/BIC code, needed for transfers from outside Pakistan. Not yet supplied. */
  swiftBic: string | null;
  /**
   * Currency of the receiving account and any conversion/fee guidance.
   * Not yet supplied — plan prices are shown exactly as listed on the site.
   */
  currencyNote: string | null;
}

export const BANK_TRANSFER: BankTransferDetails = {
  accountNumber: '00300114746720',
  iban: 'PK66MEZN0000300114746720',
  bankName: null,
  beneficiaryName: null,
  swiftBic: null,
  currencyNote: null,
};
