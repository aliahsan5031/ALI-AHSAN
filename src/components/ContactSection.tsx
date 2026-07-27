import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Github, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FiverrIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <img
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROJl_A5q9yezCvFAQWAebspqDDACHiNN927aNxj0XB1g&s=10"
    alt="Fiverr"
    className={`${className} object-contain rounded-full`}
  />
);

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.573-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

interface ContactSectionProps {
  prefilledMessage?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ prefilledMessage = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'AI Agent / Workflow Consultation',
    message: prefilledMessage || '',
  });

  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (prefilledMessage) {
      setFormData((prev) => ({ ...prev, message: prefilledMessage }));
    }
  }, [prefilledMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Construct mailto link to dispatch directly to aliahsan5031@gmail.com
    const recipient = 'aliahsan5031@gmail.com';
    const emailSubject = encodeURIComponent(`[Website Inquiry] ${formData.subject} - ${formData.name}`);
    const emailBody = encodeURIComponent(
      `Hello Ali Ahsan,\n\nYou received a new project inquiry from your website portfolio:\n\n` +
      `----------------------------------------\n` +
      `Client Name: ${formData.name}\n` +
      `Client Email: ${formData.email}\n` +
      `Subject: ${formData.subject}\n` +
      `----------------------------------------\n\n` +
      `Project Details & Objectives:\n` +
      `${formData.message}\n\n` +
      `----------------------------------------\n` +
      `Sent via Website Direct Dispatch`
    );

    const mailtoUrl = `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;

    // Attempt to open email client
    try {
      window.location.href = mailtoUrl;
    } catch (err) {
      console.error('Failed to launch mailto client:', err);
    }

    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-12 lg:py-16 px-4 lg:px-8 border-b border-[#383A39]">
      <div className="max-w-6xl mx-auto space-y-12">
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
            Get In Touch
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Let's Build Your <span className="text-[#CD6E4E]">Autonomous System</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Have a project in mind or want to explore how AI agents can automate your workflows? Send a message or schedule a 30-minute discovery call directly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Direct Info & Calendar Simulator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-6 bg-[#242625] border border-[#383A39] rounded-lg shadow-xl space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#CD6E4E]">
                Direct Contact Information
              </h3>

              <div className="space-y-4 text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-[#1d1f1e] border border-[#383A39] text-[#CD6E4E] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400 font-medium">Direct Email</div>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-white font-bold hover:text-[#CD6E4E] transition-colors">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-[#1d1f1e] border border-[#383A39] text-[#CD6E4E] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400 font-medium">Phone / WhatsApp</div>
                    <a href={PERSONAL_INFO.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="text-white font-bold hover:text-[#CD6E4E] transition-colors">
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-[#1d1f1e] border border-[#383A39] text-[#CD6E4E] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400 font-medium">Location</div>
                    <div className="text-white font-bold">{PERSONAL_INFO.location}</div>
                  </div>
                </div>

                {/* Profiles Bar */}
                <div className="pt-2 border-t border-[#383A39] space-y-2">
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Social & Professional Links</div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href={PERSONAL_INFO.socials.fiverr}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-[#161717] hover:bg-[#1d1f1e] border border-[#383A39] text-[#1dbf73] font-bold rounded-lg flex items-center gap-2 transition-all hover:border-[#1dbf73]/50 shadow-sm"
                    >
                      <FiverrIcon className="w-4 h-4 text-[#1dbf73]" />
                      <span>Fiverr</span>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href={PERSONAL_INFO.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-[#161717] hover:bg-[#1d1f1e] border border-[#383A39] text-slate-200 font-bold rounded-lg flex items-center gap-2 transition-all hover:border-slate-400 shadow-sm"
                    >
                      <Github className="w-4 h-4 text-slate-200" />
                      <span>GitHub</span>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href={PERSONAL_INFO.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-[#161717] hover:bg-[#1d1f1e] border border-[#383A39] text-sky-400 font-bold rounded-lg flex items-center gap-2 transition-all hover:border-sky-400/50 shadow-sm"
                    >
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2ZBsDfvQ2isYjlPw4O0rDUM4FLIylJaS3WQ04z3ya_g&s=10" alt="LinkedIn" className="w-4 h-4 object-contain rounded-xs" />
                      <span>LinkedIn</span>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href={PERSONAL_INFO.socials.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#161717] hover:bg-[#1d1f1e] border border-[#383A39] text-emerald-400 font-bold rounded flex items-center gap-2 transition-all hover:border-emerald-400/50"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp</span>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="px-3 py-1.5 bg-[#161717] hover:bg-[#1d1f1e] border border-[#383A39] text-amber-400 font-bold rounded flex items-center gap-2 transition-all hover:border-amber-400/50"
                    >
                      <Mail className="w-4 h-4 text-amber-400" />
                      <span>Email</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 p-6 sm:p-8 bg-[#242625] border border-[#383A39] rounded-lg space-y-6 shadow-2xl"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Project Message Transmitted!</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Your project inquiry from <strong className="text-white">{formData.name}</strong> ({formData.email}) has been formatted and transmitted directly to Ali's primary email inbox:
                  <br />
                  <span className="inline-block mt-2 font-mono text-sm font-bold text-[#CD6E4E] bg-[#161717] px-3 py-1.5 rounded border border-[#383A39]">
                    aliahsan5031@gmail.com
                  </span>
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={`mailto:aliahsan5031@gmail.com?subject=${encodeURIComponent(`[Website Inquiry] ${formData.subject} - ${formData.name}`)}&body=${encodeURIComponent(`Client Name: ${formData.name}\nClient Email: ${formData.email}\nSubject: ${formData.subject}\n\nProject Details:\n${formData.message}`)}`}
                    className="py-2.5 px-5 bg-[#CD6E4E] hover:bg-[#E07E5D] text-[#161717] font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Re-open Email App</span>
                  </a>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="py-2.5 px-5 bg-[#1d1f1e] hover:bg-[#2e302f] text-slate-300 hover:text-white text-xs font-bold rounded border border-[#383A39] cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#CD6E4E]" />
                  Send an Inquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-[#161717] border border-[#383A39] focus:border-[#CD6E4E] rounded text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 bg-[#161717] border border-[#383A39] focus:border-[#CD6E4E] rounded text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Subject / Service Interest</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-[#161717] border border-[#383A39] focus:border-[#CD6E4E] rounded text-xs text-white focus:outline-none"
                  >
                    <option value="AI Agent / Workflow Consultation">AI Agent / Workflow Consultation</option>
                    <option value="Multi-Agent System Architecture">Multi-Agent System Architecture</option>
                    <option value="Custom RAG Search Engine">Custom RAG Search Engine</option>
                    <option value="Autonomous Web Scraper">Autonomous Web Scraper</option>
                    <option value="Full-Stack AI Web Application">Full-Stack AI Web Application</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Project Details & Objectives *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, timeline, or workflow bottleneck..."
                    className="w-full px-4 py-3 bg-[#161717] border border-[#383A39] focus:border-[#CD6E4E] rounded text-xs text-white placeholder-slate-500 focus:outline-none leading-relaxed"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#CD6E4E] hover:bg-[#E07E5D] text-[#161717] font-black text-xs uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xl border-t border-l border-white/30"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Project Message</span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

