import React, { useRef, useState } from 'react';
import { PERSONAL_INFO, EXPERIENCES, RADIAL_SKILLS, LINEAR_SKILLS } from '../data/portfolioData';
import { X, Download, FileText, Loader2 } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const cvRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleSavePdf = async () => {
    if (!cvRef.current) return;
    setIsGenerating(true);

    try {
      // @ts-ignore
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = (html2pdfModule.default || html2pdfModule) as any;

      const opt = {
        margin: [0.3, 0.3, 0.3, 0.3],
        filename: `${PERSONAL_INFO.name.replace(/\s+/g, '_')}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: '#161717',
          logging: false,
          onclone: (clonedDoc: Document) => {
            // Replace all unsupported oklch color declarations from stylesheets
            const styleTags = clonedDoc.querySelectorAll('style');
            styleTags.forEach((style) => {
              if (style.textContent && style.textContent.includes('oklch')) {
                style.textContent = style.textContent.replace(/oklch\([^)]+\)/g, 'rgb(160, 160, 160)');
              }
            });

            // Replace inline style oklch references if any
            const elements = clonedDoc.querySelectorAll('*');
            elements.forEach((el) => {
              const inlineStyle = el.getAttribute('style');
              if (inlineStyle && inlineStyle.includes('oklch')) {
                el.setAttribute('style', inlineStyle.replace(/oklch\([^)]+\)/g, 'rgb(160, 160, 160)'));
              }
            });
          },
        },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };

      await html2pdf().set(opt).from(cvRef.current).save();
    } catch (err) {
      console.error('PDF generation error, falling back to window.print:', err);
      window.print();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-4xl bg-[#242625] border border-[#383A39] rounded-lg p-6 sm:p-8 space-y-6 relative shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-[#383A39] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#1d1f1e] border border-[#383A39] text-[#CD6E4E] flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Curriculum Vitae Preview</h3>
              <p className="text-xs text-[#CD6E4E] font-mono">{PERSONAL_INFO.name} — Official Portfolio CV</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSavePdf}
              disabled={isGenerating}
              className="px-4 py-2 bg-[#CD6E4E] hover:bg-[#E07E5D] disabled:opacity-50 text-[#161717] font-black rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-md border-t border-l border-white/30"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>{isGenerating ? 'Generating PDF...' : 'Save PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-[#1d1f1e] border border-[#383A39] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Document Rendering */}
        <div
          ref={cvRef}
          className="p-6 bg-[#161717] rounded border border-[#383A39] space-y-6 font-sans text-xs text-slate-300 dark-code-block"
        >
          <div className="border-b border-[#383A39] pb-4 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-black text-white">{PERSONAL_INFO.name}</h2>
              <p className="text-xs text-[#CD6E4E] font-bold mt-0.5">{PERSONAL_INFO.title}</p>
            </div>
            <div className="text-right text-[11px] text-slate-400 space-y-0.5">
              <p className="text-white font-medium">{PERSONAL_INFO.email}</p>
              <p>{PERSONAL_INFO.phone}</p>
              <p className="text-[#CD6E4E] font-mono text-[10px]">{PERSONAL_INFO.location}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-[#CD6E4E] uppercase tracking-widest border-b border-[#383A39] pb-1">
              Executive Summary
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{PERSONAL_INFO.bio}</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#CD6E4E] uppercase tracking-widest border-b border-[#383A39] pb-1">
              Professional Experience
            </h3>
            <div className="space-y-4">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-white">
                    <span>{exp.role} — <span className="text-[#CD6E4E]">{exp.company}</span></span>
                    <span className="text-slate-400 font-mono text-[11px]">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-0.5 pl-2">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-[#CD6E4E] uppercase tracking-widest border-b border-[#383A39] pb-1">
              Technical Proficiencies
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {[...RADIAL_SKILLS, ...LINEAR_SKILLS].map((skill, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-[#1d1f1e] border border-[#383A39] text-[#CD6E4E] text-[11px] font-mono">
                  {skill.name} ({skill.percentage}%)
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

