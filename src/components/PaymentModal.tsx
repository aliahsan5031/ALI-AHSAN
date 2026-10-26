import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Landmark,
  Mail,
  MessageSquare,
  Linkedin,
  ExternalLink,
  Copy,
  CheckCircle2,
  Send,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { BANK_TRANSFER } from '../data/paymentConfig';
import { PricingPlan } from '../types';
import {
  buildPaymentMailto,
  buildPaymentWhatsAppUrl,
  formatIban,
  getMissingBankFields,
  getTransferReferenceHint,
} from '../utils/payment';

interface PaymentModalProps {
  plan: PricingPlan;
  onClose: () => void;
  onOpenInquiryForm: (planName: string) => void;
}

type PaymentTab = 'bank' | 'contact';

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select, textarea';

/** One labelled detail with an optional copy button and a clear "not provided yet" state. */
const DetailRow: React.FC<{
  label: string;
  value: string | null;
  copyText?: string;
  mono?: boolean;
}> = ({ label, value, copyText, mono }) => {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleCopy = async () => {
    clearTimeout(timer.current);
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(copyText ?? value ?? '');
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
    timer.current = setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="p-3 bg-[#1d1f1e] rounded-xl border border-[#383A39] flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="text-[10px] text-slate-400 uppercase font-mono">{label}</div>
        {value ? (
          <div
            className={`text-xs font-semibold text-white break-all select-all ${mono ? 'font-mono tracking-wide' : ''}`}
          >
            {value}
          </div>
        ) : (
          <div className="text-xs font-semibold text-amber-400">
            To be confirmed — ask me before sending
          </div>
        )}
        {status === 'failed' && (
          <div className="text-[10px] text-rose-400 mt-1">
            Copy isn&apos;t available here — select the text and copy it manually.
          </div>
        )}
      </div>
      {value && (
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${label}`}
          className="p-2 bg-[#242625] hover:bg-[#383A39] text-slate-300 rounded-lg border border-[#383A39] transition-colors cursor-pointer shrink-0"
        >
          {status === 'copied' ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      )}
      <span className="sr-only" role="status" aria-live="polite">
        {status === 'copied' ? `${label} copied` : status === 'failed' ? `Could not copy ${label}` : ''}
      </span>
    </div>
  );
};

export const PaymentModal: React.FC<PaymentModalProps> = ({ plan, onClose, onOpenInquiryForm }) => {
  const [tab, setTab] = useState<PaymentTab>('bank');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();
  const emailTimer = useRef<ReturnType<typeof setTimeout>>();

  const missingFields = getMissingBankFields(BANK_TRANSFER);
  const reference = getTransferReferenceHint(plan);

  // Focus management: move focus into the dialog, trap Tab, close on Escape, restore focus on exit.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
      clearTimeout(emailTimer.current);
    };
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const items: HTMLElement[] = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === dialogRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  const handleCopyEmail = async () => {
    clearTimeout(emailTimer.current);
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopiedEmail(true);
      emailTimer.current = setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  const tabClass = (active: boolean) =>
    `flex-1 py-2.5 px-3 rounded-lg text-[11px] font-black uppercase tracking-wider transition-colors cursor-pointer ${
      active
        ? 'bg-[#CD6E4E] text-[#161717]'
        : 'bg-[#1d1f1e] text-slate-300 border border-[#383A39] hover:border-[#CD6E4E]/50'
    }`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
      />

      {/* Dialog */}
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-[#161717] dark-code-block border border-[#383A39] rounded-2xl p-5 sm:p-7 shadow-2xl z-10 text-slate-200 outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#242625] hover:bg-[#383A39] text-slate-300 rounded-lg border border-[#383A39] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-3 pr-8 pl-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#CD6E4E]/10 border border-[#CD6E4E]/30 text-[#CD6E4E]">
            <Landmark className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#CD6E4E]/10 text-[#CD6E4E] border border-[#CD6E4E]/20 text-[11px] font-bold uppercase tracking-wider">
              Package: {plan.name} ({plan.price})
            </div>
            <h3 id={titleId} className="text-xl font-black text-white tracking-tight">
              How would you like to proceed?
            </h3>
            <p id={descId} className="text-xs text-slate-400 leading-relaxed">
              Pay by manual bank transfer, or send an inquiry first. Nothing is charged by this website.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div role="tablist" aria-label="Payment options" className="mt-5 flex gap-2">
          <button
            type="button"
            role="tab"
            id="payment-tab-bank"
            aria-selected={tab === 'bank'}
            aria-controls="payment-panel-bank"
            onClick={() => setTab('bank')}
            className={tabClass(tab === 'bank')}
          >
            Bank transfer
          </button>
          <button
            type="button"
            role="tab"
            id="payment-tab-contact"
            aria-selected={tab === 'contact'}
            aria-controls="payment-panel-contact"
            onClick={() => setTab('contact')}
            className={tabClass(tab === 'contact')}
          >
            Inquiry / contact
          </button>
        </div>

        {/* Bank transfer panel */}
        {tab === 'bank' && (
          <div
            role="tabpanel"
            id="payment-panel-bank"
            aria-labelledby="payment-tab-bank"
            className="mt-5 space-y-4"
          >
            <div className="p-3 rounded-xl border border-[#383A39] bg-[#1d1f1e] flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#CD6E4E] shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-[11px] text-slate-300 leading-relaxed">
                <strong className="text-white">Manual bank transfer.</strong> You send the money yourself from your
                own bank app or branch &mdash; clicking anything on this site does not move money. Your order starts
                only after <strong className="text-white">I verify the deposit in my bank account</strong>; a form,
                screenshot or message alone does not count as payment.
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 px-1">
              <span className="text-xs text-slate-400">Amount for this package</span>
              <span className="text-lg font-black text-[#CD6E4E]">{plan.price}</span>
            </div>

            <div className="space-y-2.5">
              <DetailRow label="Account number" value={BANK_TRANSFER.accountNumber} mono />
              <DetailRow
                label="IBAN"
                value={formatIban(BANK_TRANSFER.iban)}
                copyText={BANK_TRANSFER.iban}
                mono
              />
              <DetailRow label="Beneficiary name" value={BANK_TRANSFER.beneficiaryName} />
              <DetailRow label="Bank name" value={BANK_TRANSFER.bankName} />
              <DetailRow label="SWIFT/BIC (international)" value={BANK_TRANSFER.swiftBic} mono />
              <DetailRow label="Account currency / fees" value={BANK_TRANSFER.currencyNote} />
            </div>

            {missingFields.length > 0 && (
              <div
                role="note"
                className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-start gap-2.5"
              >
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-[11px] text-amber-200 leading-relaxed">
                  Still to be confirmed: {missingFields.join(', ')}. Please message me and wait for confirmation of
                  the beneficiary details <strong>before</strong> sending any money. Your bank may also charge
                  transfer or currency-conversion fees &mdash; those are set by your bank, not by me.
                </p>
              </div>
            )}

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">How to pay</div>
              <ol className="space-y-2 text-xs text-slate-400 list-decimal list-inside leading-relaxed">
                <li>Message me to confirm the package, the amount and the beneficiary details.</li>
                <li>
                  Make the transfer from your own bank. Put this reference in the transfer description if your bank
                  allows it: <code className="px-1.5 py-0.5 rounded bg-[#242625] text-[#CD6E4E] font-mono">{reference}</code>{' '}
                  plus your name.
                </li>
                <li>Send me the payment reference or transaction ID your bank gives you, and the date you sent it.</li>
                <li>I check my bank account. Once the deposit is confirmed, I confirm your order and kickoff.</li>
              </ol>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={buildPaymentMailto(PERSONAL_INFO.email, plan)}
                className="py-3 px-4 bg-[#CD6E4E] hover:bg-[#E07E5D] text-[#161717] font-black rounded-xl text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Email payment details</span>
              </a>
              <a
                href={buildPaymentWhatsAppUrl(PERSONAL_INFO.socials.whatsapp, plan)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-[#1d1f1e] hover:bg-[#242625] border border-[#383A39] hover:border-[#CD6E4E]/50 text-white font-black rounded-xl text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>Confirm on WhatsApp</span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => setTab('contact')}
              className="w-full text-center text-[11px] text-slate-400 hover:text-[#CD6E4E] underline underline-offset-2 transition-colors cursor-pointer"
            >
              Prefer to send an inquiry first? Use the contact options
            </button>
          </div>
        )}

        {/* Inquiry / contact panel (existing options, unchanged in behavior) */}
        {tab === 'contact' && (
          <div
            role="tabpanel"
            id="payment-panel-contact"
            aria-labelledby="payment-tab-contact"
            className="mt-5 space-y-3"
          >
            <p className="text-xs text-amber-400 font-semibold tracking-wide uppercase text-center">
              Contact me directly
            </p>

            {/* Email Option */}
            <div className="p-3 bg-[#1d1f1e] rounded-xl border border-[#383A39] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 bg-[#242625] rounded-lg text-[#CD6E4E] border border-[#383A39] shrink-0">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Direct Email</div>
                  <div className="text-xs font-semibold text-white truncate">{PERSONAL_INFO.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 bg-[#242625] hover:bg-[#383A39] text-slate-300 rounded-lg border border-[#383A39] transition-colors cursor-pointer text-[10px] flex items-center gap-1"
                  title="Copy Email"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Inquiry for ${plan.name}`}
                  className="p-2 bg-[#CD6E4E] hover:bg-[#E07E5D] text-[#161717] font-bold rounded-lg transition-colors cursor-pointer text-[10px] flex items-center gap-1"
                  title="Send Mail"
                  aria-label="Send email"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* WhatsApp Option */}
            <a
              href={PERSONAL_INFO.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#1d1f1e] hover:bg-[#242625] hover:border-[#CD6E4E]/50 rounded-xl border border-[#383A39] flex items-center justify-between gap-3 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#242625] group-hover:bg-[#CD6E4E]/10 rounded-lg text-emerald-400 border border-[#383A39] shrink-0 transition-colors">
                  <MessageSquare className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">WhatsApp Instant Chat</div>
                  <div className="text-xs font-semibold text-white">{PERSONAL_INFO.whatsapp}</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#CD6E4E] transition-colors" aria-hidden="true" />
            </a>

            {/* LinkedIn Option */}
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#1d1f1e] hover:bg-[#242625] hover:border-[#CD6E4E]/50 rounded-xl border border-[#383A39] flex items-center justify-between gap-3 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#242625] group-hover:bg-[#CD6E4E]/10 rounded-lg text-sky-400 border border-[#383A39] shrink-0 transition-colors">
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">LinkedIn Profile</div>
                  <div className="text-xs font-semibold text-white">Ali Ahsan</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#CD6E4E] transition-colors" aria-hidden="true" />
            </a>

            {/* Direct Website Message Form Option */}
            <button
              type="button"
              onClick={() => onOpenInquiryForm(plan.name)}
              className="w-full py-3 px-4 bg-[#CD6E4E] hover:bg-[#E07E5D] text-[#161717] font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg mt-2"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              <span>Send Direct Inquiry Message</span>
            </button>

            <button
              type="button"
              onClick={() => setTab('bank')}
              className="w-full text-center text-[11px] text-slate-400 hover:text-[#CD6E4E] underline underline-offset-2 transition-colors cursor-pointer"
            >
              Ready to pay? Back to bank transfer details
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
