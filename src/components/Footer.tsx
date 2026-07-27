import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { LogoIcon } from './LogoIcon';

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

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#161717] border-t border-[#383A39] py-10 px-4 lg:px-8 text-xs text-slate-400">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#252827] to-[#161717] border border-[#CD6E4E]/40 flex items-center justify-center shadow-lg shadow-[#CD6E4E]/20">
              <LogoIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-base font-extrabold text-white tracking-wider block">
                ALI <span className="text-[#CD6E4E]">AHSAN</span>
              </span>
              <p className="text-[11px] text-slate-400 font-medium">
                AI Engineering & Autonomous Agent Architecture Portfolio
              </p>
            </div>
          </div>

          {/* Socials & Top Scroll */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-slate-400">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#242625] border border-[#383A39] text-slate-200 hover:text-white hover:border-slate-400 rounded transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#242625] border border-[#383A39] text-sky-400 hover:text-sky-300 hover:border-sky-400/50 rounded transition-colors flex items-center justify-center"
                title="LinkedIn Profile"
              >
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2ZBsDfvQ2isYjlPw4O0rDUM4FLIylJaS3WQ04z3ya_g&s=10" alt="LinkedIn" className="w-4 h-4 object-contain rounded-xs" />
              </a>
              <a
                href={PERSONAL_INFO.socials.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#242625] border border-[#383A39] text-[#1dbf73] hover:text-emerald-300 hover:border-[#1dbf73]/50 rounded transition-colors"
                title="Fiverr Profile"
              >
                <FiverrIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#242625] border border-[#383A39] text-emerald-400 hover:text-emerald-300 hover:border-emerald-400/50 rounded transition-colors"
                title="WhatsApp Direct Contact"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.email}
                className="p-2 bg-[#242625] border border-[#383A39] text-amber-400 hover:text-amber-300 hover:border-amber-400/50 rounded transition-colors"
                title="Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2.5 bg-[#CD6E4E] hover:bg-[#E07E5D] text-[#161717] rounded font-bold transition-transform hover:scale-110"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="border-t border-[#383A39] pt-6 flex flex-col items-center sm:items-start justify-center text-xs text-slate-400 font-medium leading-relaxed gap-1 text-center sm:text-left">
          <p>© 2026 Ali Ahsan. All Rights Reserved.</p>
          <p className="text-[11px] text-slate-400">Building AI Agents, Workflow Automation, and Intelligent Software Solutions.</p>
        </div>
      </div>
    </footer>
  );
};
