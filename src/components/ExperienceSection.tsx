import React, { useState } from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { Briefcase, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ExperienceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'work' | 'certification'>('work');

  const filteredExp = EXPERIENCES.filter((e) => e.type === activeTab);

  return (
    <section id="experience" className="py-12 lg:py-16 px-4 lg:px-8 border-b border-[#383A39]">
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
            Track Record
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Experience & <span className="text-[#CD6E4E]">Credentials</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            A proven career trajectory spanning autonomous AI agent engineering, enterprise RAG search engines, and computer science research.
          </p>
        </motion.div>

        {/* Tab Toggle */}
        <div className="flex flex-wrap gap-3 border-b border-[#383A39] pb-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab('work')}
            className={`
              px-5 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer
              ${
                activeTab === 'work'
                  ? 'bg-[#CD6E4E] text-[#161717] shadow-md shadow-[#CD6E4E]/20'
                  : 'bg-[#242625] text-slate-300 hover:text-white border border-[#383A39]'
              }
            `}
          >
            <Briefcase className="w-4 h-4" />
            <span>Work History</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab('certification')}
            className={`
              px-5 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer
              ${
                activeTab === 'certification'
                  ? 'bg-[#CD6E4E] text-[#161717] shadow-md shadow-[#CD6E4E]/20'
                  : 'bg-[#242625] text-slate-300 hover:text-white border border-[#383A39]'
              }
            `}
          >
            <Award className="w-4 h-4" />
            <span>Certifications</span>
          </motion.button>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-[#383A39] ml-4 pl-6 sm:pl-8 space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredExp.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline Node Point */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#161717] border-2 border-[#CD6E4E] group-hover:bg-[#CD6E4E] group-hover:scale-125 transition-all shadow-md shadow-[#CD6E4E]/30" />

                <motion.div
                  whileHover={{ x: 6 }}
                  className="p-6 bg-[#242625] border border-[#383A39] hover:border-[#CD6E4E] rounded-lg shadow-xl space-y-3 transition-all duration-300"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#CD6E4E] transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-xs text-[#CD6E4E] font-semibold mt-0.5">
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {exp.badge && (
                        <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                          {exp.badge}
                        </span>
                      )}
                      {exp.period && (
                        <span className="px-3 py-1 rounded bg-[#1d1f1e] text-slate-300 text-xs font-mono border border-[#383A39] flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-[#CD6E4E]" />
                          {exp.period}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#CD6E4E]" />
                    <span>{exp.location}</span>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-1.5 pt-2 border-t border-[#383A39]">
                    {exp.highlights.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-400 flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#CD6E4E] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

