import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/portfolioData';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-12 lg:py-16 px-4 lg:px-8 border-b border-[#383A39]">
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
            Client Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Trusted by <span className="text-[#CD6E4E]">Founders & CTOs</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Here is what technical leaders and product managers say about Ali Ahsan's AI agent architecture & engineering execution.
          </p>
        </motion.div>

        {/* Carousel Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative p-6 sm:p-8 bg-[#242625] border border-[#383A39] rounded-lg shadow-xl overflow-hidden"
        >
          {/* Subtle Quote Background Icon */}
          <Quote className="absolute top-6 right-8 w-24 h-24 text-[#CD6E4E]/5 pointer-events-none" />

          <div className="max-w-3xl space-y-6">
            {/* Rating Stars */}
            <div className="flex items-center gap-1">
              {[...Array(activeTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#CD6E4E] text-[#CD6E4E]" />
              ))}
              <span className="ml-2 text-xs font-mono font-bold text-[#CD6E4E]">
                5.0 Star Rating
              </span>
            </div>

            {/* Quote Body with AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <p className="text-sm sm:text-base text-slate-200 font-medium italic leading-relaxed">
                  "{activeTestimonial.quote}"
                </p>

                {/* Client Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-[#383A39]">
                  <img
                    src={activeTestimonial.avatar}
                    alt={activeTestimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#CD6E4E]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{activeTestimonial.name}</h4>
                    <p className="text-xs text-[#CD6E4E] font-medium">
                      {activeTestimonial.role}, <span className="text-slate-300">{activeTestimonial.company}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                      Project: {activeTestimonial.projectType}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Controls */}
          <div className="mt-8 flex items-center justify-between border-t border-[#383A39] pt-4">
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`
                    w-2.5 h-2.5 rounded-full transition-all cursor-pointer
                    ${currentIndex === idx ? 'w-8 bg-[#CD6E4E]' : 'bg-slate-600 hover:bg-slate-400'}
                  `}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="p-2 bg-[#1d1f1e] border border-[#383A39] hover:bg-[#CD6E4E] hover:text-[#161717] text-slate-300 rounded transition-all cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="p-2 bg-[#1d1f1e] border border-[#383A39] hover:bg-[#CD6E4E] hover:text-[#161717] text-slate-300 rounded transition-all cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

