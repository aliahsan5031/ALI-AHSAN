import React, { useState } from 'react';
import { SERVICES } from '../data/portfolioData';
import { Service } from '../types';
import { Bot, Database, Globe, Layout, Cpu, Sparkles, Check, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesSectionProps {
  onSelectService: (service: Service) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot': return <Bot className="w-6 h-6 text-[#CD6E4E]" />;
      case 'Database': return <Database className="w-6 h-6 text-[#CD6E4E]" />;
      case 'Globe': return <Globe className="w-6 h-6 text-[#CD6E4E]" />;
      case 'Layout': return <Layout className="w-6 h-6 text-[#CD6E4E]" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-[#CD6E4E]" />;
      default: return <Sparkles className="w-6 h-6 text-[#CD6E4E]" />;
    }
  };

  return (
    <section id="services" className="py-12 lg:py-16 px-4 lg:px-8 border-b border-[#383A39]">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2"
        >
          <span className="text-xs font-bold text-[#CD6E4E] tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#CD6E4E] animate-pulse" />
            What I Build
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Agent Systems & <span className="text-[#CD6E4E]">LLM Workflows</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Custom autonomous agents designed to handle repetitive tasks with human-level accuracy and connecting data sources to modern LLMs.
          </p>
        </motion.div>

        {/* Services Cards Grid with Sleek Interface hover borders */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-[#242625] p-6 rounded-lg shadow-xl border-b-2 border-transparent hover:border-[#CD6E4E] hover:shadow-lg hover:shadow-[#CD6E4E]/10 transition-all group border-t border-l border-r border-[#383A39] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded bg-[#1d1f1e] border border-[#383A39] flex items-center justify-center text-[#CD6E4E] group-hover:border-[#CD6E4E] group-hover:scale-110 transition-all">
                  {getIcon(service.iconName)}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#CD6E4E] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Key Features Bullet List */}
                <ul className="space-y-2 pt-2 border-t border-[#383A39]">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#CD6E4E] shrink-0" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 space-y-4">
                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {service.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-[#1d1f1e] border border-[#383A39] px-2 py-1 rounded text-[10px] text-slate-300 font-mono tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedService(service)}
                  className="w-full py-2.5 px-4 bg-[#CD6E4E] hover:bg-[#E07E5D] text-[#161717] font-black text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer border-t border-l border-white/30"
                >
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-lg bg-[#242625] border border-[#383A39] rounded-2xl p-6 sm:p-8 space-y-6 relative shadow-2xl overflow-y-auto max-h-[90vh] text-center"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-[#1d1f1e] border border-[#383A39] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center justify-center gap-3 pt-2">
                <div className="w-16 h-16 rounded-2xl bg-[#1d1f1e] border border-[#CD6E4E]/50 flex items-center justify-center text-[#CD6E4E] shadow-xl shadow-[#CD6E4E]/15">
                  {getIcon(selectedService.iconName)}
                </div>
                
                <h3 className="text-xl sm:text-2xl font-black text-white">{selectedService.title}</h3>

                {/* Prominent Updated Soon Screen Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#CD6E4E]/20 border border-[#CD6E4E] text-[#CD6E4E] font-black text-sm uppercase tracking-widest my-1 shadow-lg shadow-[#CD6E4E]/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#CD6E4E] animate-ping" />
                  Updated Soon
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                Interactive architectural diagrams, API endpoints, and live benchmarks for <span className="text-white font-bold">{selectedService.title}</span> will be <span className="text-[#CD6E4E] font-bold">Updated Soon</span> in the upcoming build release.
              </p>

              {/* Feature Preview Specs */}
              <div className="bg-[#1d1f1e] border border-[#383A39] rounded-xl p-4 text-left space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#CD6E4E] uppercase tracking-wider">
                  <span>Architecture Status</span>
                  <span className="bg-[#CD6E4E] text-[#161717] px-2.5 py-0.5 rounded text-[10px] font-black">Updated Soon</span>
                </div>
                <ul className="space-y-1.5 pt-1">
                  {selectedService.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="text-xs text-slate-400 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#CD6E4E] shrink-0" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-1/2 py-3 px-5 bg-[#1d1f1e] hover:bg-[#2e3130] text-slate-300 border border-[#383A39] font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                >
                  Close
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const service = selectedService;
                    setSelectedService(null);
                    onSelectService(service);
                  }}
                  className="w-full sm:w-1/2 py-3 px-5 bg-[#CD6E4E] hover:bg-[#E07E5D] text-[#161717] font-black text-xs uppercase tracking-widest rounded-lg shadow-lg transition-transform cursor-pointer border-t border-l border-white/30"
                >
                  Inquire Now
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

