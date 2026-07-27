import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, Download, Github, Linkedin, Sparkles, CheckCircle2, MessageSquare, PhoneCall, Sun, Moon, Key, Code, X, BarChart3 } from 'lucide-react';

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

interface SidebarProps {
  onOpenResume: () => void;
  onOpenCustomizer: () => void;
  onBookCall?: () => void;
  onOpenAnalytics?: () => void;
  onOpenApiKeyManager?: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onOpenResume,
  onOpenCustomizer,
  onBookCall,
  onOpenAnalytics,
  onOpenApiKeyManager,
  theme = 'dark',
  onToggleTheme,
  isOpenMobile,
  onCloseMobile,
  isOpen,
  onClose,
}) => {
  const isSidebarOpen = isOpen ?? isOpenMobile ?? false;
  const handleClose = onClose ?? onCloseMobile;

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen z-[100]
        w-80 bg-[#242625] border-r border-[#383A39]
        flex flex-col overflow-y-auto custom-scrollbar shadow-2xl
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Close Button */}
      {isSidebarOpen && handleClose && (
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg bg-[#1d1f1e] hover:bg-[#2e302f] border border-[#383A39] transition-colors z-20 cursor-pointer"
          aria-label="Close sidebar"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Profile Header Box */}
      <div className="px-8 pb-8 pt-12 border-b border-[#383A39] bg-[#2e302f] text-center relative overflow-hidden flex flex-col items-center z-10">
        {/* Glow backdrop */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#CD6E4E]/15 rounded-full blur-2xl pointer-events-none z-0" />

        {/* Avatar with Status Ring */}
        <div className="relative z-10 inline-block mb-4 group">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#CD6E4E] to-[#E07E5D] shadow-xl flex items-center justify-center relative z-10">
            <img
              src={PERSONAL_INFO.avatar}
              alt={PERSONAL_INFO.name}
              className="w-full h-full object-contain bg-[#161717] rounded-full filter contrast-105 relative z-10"
              referrerPolicy="no-referrer"
            />
          </div>
          <span
            className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#2e302f] shadow-md shadow-emerald-500/50 animate-pulse z-20"
            title="Online - Available for AI Projects"
          />
        </div>

        <h2 className="text-xl font-extrabold text-white tracking-tight relative z-10">{PERSONAL_INFO.name}</h2>
        <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mt-1 relative z-10">{PERSONAL_INFO.title}</p>

        {/* Live Status Badge */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-medium tracking-wide relative z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          {PERSONAL_INFO.status}
        </div>
      </div>

      {/* Info List */}
      <div className="p-6 border-b border-[#383A39] text-sm space-y-3 text-slate-300">
        <div className="flex items-center justify-center pt-1 pb-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for Projects
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#CD6E4E]" /> Email:
          </span>
          <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#CD6E4E] hover:underline truncate max-w-[130px]">
            {PERSONAL_INFO.email}
          </a>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <WhatsAppIcon className="w-3.5 h-3.5 text-[#CD6E4E]" /> WhatsApp:
          </span>
          <a href={PERSONAL_INFO.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[#CD6E4E] font-medium hover:underline">
            {PERSONAL_INFO.whatsapp}
          </a>
        </div>
      </div>

      {/* Core Expertise Checklist */}
      <div className="p-6 border-b border-[#383A39]">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#CD6E4E]" />
          Core Expertise
        </h3>
        <div className="space-y-3">
          {[
            'AI Agents',
            'Workflow Automation',
            'RAG Systems',
            'AI Chatbots',
            'AI Web Apps',
            'API Integrations',
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs font-medium text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-[#CD6E4E] shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Languages & Tech Badges */}
      <div className="p-6 border-b border-[#383A39] space-y-4">
        <div className="space-y-2 text-xs">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Languages</h3>
          {PERSONAL_INFO.languages.map((lang, idx) => (
            <div key={idx} className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#CD6E4E]" />
                {lang.name}
              </span>
              <span className="text-slate-400 text-[11px]">{lang.level}</span>
            </div>
          ))}
        </div>

        <div className="h-px bg-[#383A39] w-full" />

        {/* Skill Chips */}
        <div className="flex flex-wrap gap-1.5">
          {['LANGCHAIN', 'API_INTEGRATIONS', 'PYTHON', 'VECTOR_RAG', 'EMBEDDINGS', 'TOKENIZATION', 'NLP', 'N8N', 'GEMINI_2.5'].map((chip, i) => (
            <span key={i} className="bg-[#1d1f1e] border border-[#383A39] px-2 py-1 rounded text-[10px] text-slate-300 font-mono tracking-wider">
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 space-y-3 mt-auto border-t border-[#383A39]">
        {onBookCall && (
          <button
            onClick={onBookCall}
            className="w-full bg-[#CD6E4E] hover:bg-[#E07E5D] text-[#161717] font-black py-3 px-4 text-xs uppercase tracking-[0.2em] rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 border-t border-l border-white/30"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Hire Me / Book Call</span>
          </button>
        )}

        {onOpenApiKeyManager && (
          <button
            onClick={() => {
              onOpenApiKeyManager();
              if (onCloseMobile) onCloseMobile();
              if (onClose) onClose();
            }}
            className="w-full py-2.5 px-3 bg-[#1d1f1e] hover:bg-[#2e302f] text-slate-300 border border-[#383A39] hover:border-amber-500/50 font-bold text-xs rounded-lg uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer shadow-sm group"
          >
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-400" />
              <span>API Key Manager</span>
            </div>
            <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 uppercase">
              SHA-256
            </span>
          </button>
        )}

        <button
          onClick={onOpenResume}
          className="w-full py-2.5 px-3 bg-[#1d1f1e] hover:bg-[#2e302f] text-slate-200 border border-[#383A39] font-bold text-xs rounded-lg uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:border-[#CD6E4E]/50"
        >
          <Download className="w-3.5 h-3.5 text-[#CD6E4E]" />
          <span>Resume</span>
        </button>

        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className="w-full py-2 px-3 bg-[#161717] hover:bg-[#242625] text-slate-300 border border-[#383A39] text-xs font-semibold rounded-lg uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer hover:text-white"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-[#CD6E4E]" />
                <span>Light Theme</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#CD6E4E]" />
                <span>Dark Theme</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Social Footer Icons */}
      <div className="p-4 bg-[#161717] border-t border-[#383A39] flex items-center justify-center gap-4 text-slate-400">
        <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors" title="GitHub">
          <Github className="w-4 h-4" />
        </a>
        <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 transition-colors flex items-center justify-center" title="LinkedIn">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2ZBsDfvQ2isYjlPw4O0rDUM4FLIylJaS3WQ04z3ya_g&s=10" alt="LinkedIn" className="w-4 h-4 object-contain rounded-xs" />
        </a>
        <a href={PERSONAL_INFO.socials.fiverr} target="_blank" rel="noopener noreferrer" className="text-[#1dbf73] hover:text-emerald-300 transition-colors" title="Fiverr">
          <FiverrIcon className="w-4 h-4" />
        </a>
        <a href={PERSONAL_INFO.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors" title="WhatsApp">
          <WhatsAppIcon className="w-4 h-4" />
        </a>
        <a href={PERSONAL_INFO.socials.email} className="text-[#CD6E4E] hover:text-[#E07E5D] transition-colors" title="Email">
          <Mail className="w-4 h-4" />
        </a>
      </div>
    </aside>
  );
};
