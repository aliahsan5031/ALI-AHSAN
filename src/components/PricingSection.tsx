import React, { useState } from 'react';
import { PRICING_PLANS, PERSONAL_INFO } from '../data/portfolioData';
import { Check, Clock, ArrowRight, X, CreditCard, Mail, MessageSquare, Linkedin, ExternalLink, Copy, CheckCircle2, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PricingPlan } from '../types';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [selectedPlanModal, setSelectedPlanModal] = useState<PricingPlan | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleOpenContactForm = (planName: string) => {
    onSelectPlan(planName);
    setSelectedPlanModal(null);
  };

  return (
    <section id="pricing" className="py-12 lg:py-16 px-4 lg:px-8 border-b border-[#383A39] relative">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2"
        >
          <span className="text-xs font-bold text-[#CD6E4E] tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#CD6E4E] animate-pulse" />
            Transparent Engagement Tiers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            AI Agent & Workflow <span className="text-[#CD6E4E]">Pricing Packages</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Clear, fixed-scope engineering packages with zero hidden fees. Choose a tier or request a custom architectural proposal.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {PRICING_PLANS.map((plan) => (
            <motion.div
              key={plan.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`
                p-6 rounded-lg border flex flex-col justify-between transition-all duration-300 relative shadow-xl
                ${
                  plan.popular
                    ? 'bg-[#242625] border-[#CD6E4E] shadow-2xl scale-105 z-10'
                    : 'bg-[#242625] border-[#383A39] hover:border-[#CD6E4E]'
                }
              `}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 overflow-hidden w-32 h-32 pointer-events-none z-20 rounded-tr-lg">
                  <div className="absolute top-6 -right-10 w-40 py-1 bg-[#CD6E4E] text-[#161717] text-[10px] font-black uppercase tracking-wider text-center rotate-45 shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  {plan.subtitle && (
                    <p className="text-xs text-slate-400 mt-1 leading-snug">{plan.subtitle}</p>
                  )}
                </div>

                <div className="border-y border-[#383A39] py-4 space-y-1">
                  <div className="text-3xl font-black text-[#CD6E4E]">{plan.price}</div>
                  <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#CD6E4E]" />
                    Turnaround: {plan.turnaround}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Package Features:
                  </div>
                  <ul className="space-y-2.5">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="text-xs text-slate-400 flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#CD6E4E] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-auto space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPlanModal(plan)}
                  className={`
                    w-full py-3.5 px-4 rounded-lg font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg
                    ${
                      plan.popular
                        ? 'bg-[#CD6E4E] hover:bg-[#E07E5D] text-[#161717] border-t border-l border-white/30'
                        : 'bg-[#1d1f1e] hover:bg-[#CD6E4E] hover:text-[#161717] text-[#CD6E4E] border border-[#383A39] hover:border-[#CD6E4E]'
                    }
                  `}
                >
                  <span>Select {plan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                {plan.idealFor && (
                  <p className="text-[10px] text-center text-slate-500 font-mono">
                    Ideal for: {plan.idealFor}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Payment Coming Soon Modal */}
      <AnimatePresence>
        {selectedPlanModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlanModal(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-[#161717] dark-code-block border border-[#383A39] rounded-2xl p-6 sm:p-7 shadow-2xl z-10 text-slate-200 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPlanModal(null)}
                className="absolute top-4 right-4 p-2 bg-[#242625] hover:bg-[#383A39] text-slate-300 rounded-lg border border-[#383A39] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Badge & Notice */}
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#CD6E4E]/10 border border-[#CD6E4E]/30 text-[#CD6E4E]">
                  <CreditCard className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#CD6E4E]/10 text-[#CD6E4E] border border-[#CD6E4E]/20 text-[11px] font-bold uppercase tracking-wider">
                    Package: {selectedPlanModal.name} ({selectedPlanModal.price})
                  </div>
                  <h3 className="text-xl font-black text-white tracking-tight">
                    Payment Option Coming Soon
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold tracking-wide uppercase">
                    For Now Contact At
                  </p>
                </div>
              </div>

              {/* Contact Details & Options List */}
              <div className="mt-6 space-y-3">
                {/* Email Option */}
                <div className="p-3 bg-[#1d1f1e] rounded-xl border border-[#383A39] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-2 bg-[#242625] rounded-lg text-[#CD6E4E] border border-[#383A39] shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-400 uppercase font-mono">Direct Email</div>
                      <div className="text-xs font-semibold text-white truncate">{PERSONAL_INFO.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={handleCopyEmail}
                      className="p-2 bg-[#242625] hover:bg-[#383A39] text-slate-300 rounded-lg border border-[#383A39] transition-colors cursor-pointer text-[10px] flex items-center gap-1"
                      title="Copy Email"
                    >
                      {copiedEmail ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}?subject=Inquiry for ${selectedPlanModal.name}`}
                      className="p-2 bg-[#CD6E4E] hover:bg-[#E07E5D] text-[#161717] font-bold rounded-lg transition-colors cursor-pointer text-[10px] flex items-center gap-1"
                      title="Send Mail"
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
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono">WhatsApp Instant Chat</div>
                      <div className="text-xs font-semibold text-white">{PERSONAL_INFO.whatsapp}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#CD6E4E] transition-colors" />
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
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono">LinkedIn Profile</div>
                      <div className="text-xs font-semibold text-white">Ali Ahsan</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#CD6E4E] transition-colors" />
                </a>

                {/* Direct Website Message Form Option */}
                <button
                  onClick={() => handleOpenContactForm(selectedPlanModal.name)}
                  className="w-full py-3 px-4 bg-[#CD6E4E] hover:bg-[#E07E5D] text-[#161717] font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Inquiry Message</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};


