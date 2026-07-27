import React, { useState } from 'react';
import { UserCustomization } from '../types';
import { X, Sparkles, CheckCircle2, Sliders, Palette, Layers, Users, RefreshCw } from 'lucide-react';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  customization: UserCustomization;
  onUpdateCustomization: (updated: UserCustomization) => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  isOpen,
  onClose,
  customization,
  onUpdateCustomization,
}) => {
  const [localState, setLocalState] = useState<UserCustomization>(customization);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const colorOptions = [
    { name: 'Arter Amber Gold (Default)', hex: '#CD6E4E', bgClass: 'from-amber-500 to-amber-300' },
    { name: 'Cyberpunk Cyan', hex: '#00f2fe', bgClass: 'from-cyan-500 to-blue-400' },
    { name: 'Neon Emerald', hex: '#10b981', bgClass: 'from-emerald-500 to-teal-300' },
    { name: 'Crimson Power', hex: '#f43f5e', bgClass: 'from-rose-500 to-amber-400' },
  ];

  const sectionOptions = [
    { id: 'home', name: 'Hero Banner' },
    { id: 'about', name: 'About & Core Skills' },
    { id: 'services', name: 'AI Services' },
    { id: 'projects', name: 'Case Studies' },
    { id: 'experience', name: 'Timeline' },
    { id: 'testimonials', name: 'Client Reviews' },
    { id: 'pricing', name: 'Pricing Tiers' },
    { id: 'api-docs', name: 'API Keys & Docs' },
    { id: 'contact', name: 'Contact Form' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCustomization(localState);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleToggleSection = (sectionId: string) => {
    const current = localState.selectedSections;
    if (current.includes(sectionId)) {
      setLocalState({ ...localState, selectedSections: current.filter((id) => id !== sectionId) });
    } else {
      setLocalState({ ...localState, selectedSections: [...current, sectionId] });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-[#242625] border border-[#383A39] rounded-lg p-6 sm:p-8 space-y-6 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-[#1d1f1e] border border-[#383A39] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-[#383A39] pb-4">
          <div className="w-9 h-9 rounded bg-[#1d1f1e] border border-[#383A39] text-[#CD6E4E] flex items-center justify-center">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#CD6E4E] uppercase tracking-widest">Brand Questionnaire</span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-[#CD6E4E]/10 border border-[#CD6E4E]/30 text-[#CD6E4E] uppercase">
                Owner
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">5-Questions Brand & Theme Customizer</h3>
          </div>
        </div>

        {savedSuccess ? (
          <div className="py-12 text-center space-y-3 animate-fade-in">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-white">Customization Saved!</h4>
            <p className="text-xs text-slate-300">Updated portfolio branding and sections live.</p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            {/* Q1: Brand Title */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#CD6E4E] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Q1: What is your Website / Brand Name?
              </label>
              <input
                type="text"
                required
                value={localState.brandName}
                onChange={(e) => setLocalState({ ...localState, brandName: e.target.value })}
                placeholder="e.g. Ali Ahsan"
                className="w-full px-4 py-3 bg-[#161717] border border-[#383A39] focus:border-[#CD6E4E] rounded text-xs text-white focus:outline-none"
              />
            </div>

            {/* Q2: Business Tagline */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#CD6E4E] uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Q2: What is your primary Business Tagline?
              </label>
              <input
                type="text"
                required
                value={localState.tagline}
                onChange={(e) => setLocalState({ ...localState, tagline: e.target.value })}
                placeholder="e.g. AI Agent Architect & Autonomous Systems Developer"
                className="w-full px-4 py-3 bg-[#161717] border border-[#383A39] focus:border-[#CD6E4E] rounded text-xs text-white focus:outline-none"
              />
            </div>

            {/* Q3: Target Audience */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#CD6E4E] uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Q3: Who is your primary Target Audience?
              </label>
              <select
                value={localState.targetAudience}
                onChange={(e) => setLocalState({ ...localState, targetAudience: e.target.value })}
                className="w-full px-4 py-3 bg-[#161717] border border-[#383A39] focus:border-[#CD6E4E] rounded text-xs text-white focus:outline-none"
              >
                <option value="Startups & Tech Founders">Startups & Tech Founders</option>
                <option value="Enterprise AI Engineering Teams">Enterprise AI Engineering Teams</option>
                <option value="CTOs & Product Managers">CTOs & Product Managers</option>
                <option value="SME Businesses Seeking Automation">SME Businesses Seeking Automation</option>
              </select>
            </div>

            {/* Q4: Color Scheme */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#CD6E4E] uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" />
                Q4: Choose Theme Color Scheme (Arter Gold Inspired):
              </label>
              <div className="grid grid-cols-2 gap-3">
                {colorOptions.map((c, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setLocalState({ ...localState, accentColor: c.hex })}
                    className={`
                      p-3 rounded border text-left flex items-center gap-2.5 text-xs font-semibold transition-all
                      ${
                        localState.accentColor === c.hex
                          ? 'bg-[#1d1f1e] border-[#CD6E4E] text-white shadow-md'
                          : 'bg-[#161717] border-[#383A39] text-slate-400 hover:text-white'
                      }
                    `}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Q5: Active Sections */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#CD6E4E] uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Q5: Select Exact Sections To Include:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {sectionOptions.map((sec) => {
                  const isChecked = localState.selectedSections.includes(sec.id);
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => handleToggleSection(sec.id)}
                      className={`
                        p-2.5 rounded border text-xs font-medium text-left transition-all flex items-center justify-between
                        ${
                          isChecked
                            ? 'bg-[#1d1f1e] border-[#CD6E4E] text-[#CD6E4E]'
                            : 'bg-[#161717] border-[#383A39] text-slate-500 line-through'
                        }
                      `}
                    >
                      <span>{sec.name}</span>
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#383A39] flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() =>
                  setLocalState({
                    brandName: 'Ali Ahsan',
                    tagline: 'AI Agent Architect & Autonomous Systems Developer',
                    accentColor: '#CD6E4E',
                    primaryBg: '#1d1f1e',
                    targetAudience: 'Startups & Tech Founders',
                    selectedSections: sectionOptions.map((s) => s.id),
                  })
                }
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
              </button>

              <button
                type="submit"
                className="py-3 px-6 bg-[#CD6E4E] hover:bg-[#E07E5D] text-[#161717] font-black text-xs uppercase tracking-widest rounded-lg transition-colors border-t border-l border-white/30 shadow-lg cursor-pointer"
              >
                Apply Customizations
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
