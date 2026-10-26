import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/portfolioData';
import { Check, Clock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PricingPlan } from '../types';
import { PaymentModal } from './PaymentModal';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [selectedPlanModal, setSelectedPlanModal] = useState<PricingPlan | null>(null);

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

      {/* Payment choice: manual bank transfer or inquiry/contact */}
      <AnimatePresence>
        {selectedPlanModal && (
          <PaymentModal
            key={selectedPlanModal.id}
            plan={selectedPlanModal}
            onClose={() => setSelectedPlanModal(null)}
            onOpenInquiryForm={handleOpenContactForm}
          />
        )}
      </AnimatePresence>
    </section>
  );
};


