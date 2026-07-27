import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowRight, Terminal, Sparkles, ShieldCheck, Play, Bot, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const roles = [
    'AI Agent Architect',
    'Autonomous Workflow Developer',
    'Custom RAG System Engineer',
    'Full-Stack AI Developer',
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  return (
    <section id="home" className="relative py-10 lg:py-14 px-4 lg:px-8 border-b border-[#383A39] overflow-hidden">
      {/* Background ambient lighting - Sleek Interface floating blur glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.12, 0.05],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-96 h-96 bg-[#CD6E4E] blur-[120px] rounded-full pointer-events-none -mr-48 -mt-48 z-0"
      />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Sleek Hero Feature Banner Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#242625] border border-[#383A39] rounded-xl p-8 sm:p-12 relative overflow-hidden shadow-2xl group hover:border-[#CD6E4E]/40 transition-colors"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#242625] via-[#242625]/90 to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1d1f1e] border border-[#383A39] text-[#CD6E4E] text-xs font-semibold uppercase tracking-widest"
            >
              <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
              <span>AGENTIC AI ARCHITECTURE</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
            >
              Build Your Next <br />
              <span className="text-[#CD6E4E]">AI Employee & Agentic Workflow</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-2 text-base sm:text-lg font-mono text-slate-300"
            >
              <span className="text-[#CD6E4E]">&gt;</span>
              <span className="text-[#CD6E4E] font-bold">{displayText}</span>
              <span className="w-2 h-4 bg-[#CD6E4E] inline-block animate-pulse" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed"
            >
              Autonomous agentic workflows tailored for modern business: high-performance multi-agent orchestration, self-healing scrapers, custom RAG search vaults, and full-stack AI web applications.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onNavigate('contact')}
                className="bg-[#CD6E4E] hover:bg-[#E07E5D] text-[#161717] px-7 py-3.5 font-black text-xs uppercase tracking-widest rounded-lg shadow-xl shadow-[#CD6E4E]/25 transition-all flex items-center gap-2.5 cursor-pointer border-t border-l border-white/30"
              >
                <ArrowRight className="w-4 h-4 text-[#161717]" />
                <span>Get Started</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onNavigate('projects')}
                className="bg-[#1d1f1e] hover:bg-[#2e302f] text-white border border-[#383A39] hover:border-[#CD6E4E] px-7 py-3.5 font-extrabold text-xs uppercase tracking-widest rounded-lg transition-all flex items-center gap-2.5 cursor-pointer shadow-lg shadow-black/40"
              >
                <span>Projects</span>
                <ArrowRight className="w-4 h-4 text-[#CD6E4E]" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Sleek Interface 4-Column Metric Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {PERSONAL_INFO.stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-[#242625] p-6 rounded-lg shadow-xl border-b-2 border-transparent hover:border-[#CD6E4E] hover:shadow-lg hover:shadow-[#CD6E4E]/10 transition-all group border-t border-l border-r border-[#383A39]"
            >
              <div className="text-[#CD6E4E] text-2xl sm:text-3xl font-extrabold group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1 leading-relaxed">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Live Code Snippet Terminal Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-xl bg-[#1d1f1e] dark-code-block border border-[#383A39] overflow-hidden shadow-2xl hover:border-[#CD6E4E]/30 transition-colors"
        >
          <div className="px-4 py-3 bg-[#242625] border-b border-[#383A39] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#CD6E4E] inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
              <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#CD6E4E]" />
                agent_orchestrator.ts
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Production Ready
            </span>
          </div>

          <div className="p-5 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto leading-relaxed">
            <p className="text-slate-500">// Initialize Ali Ahsan Autonomous Agent Team</p>
            <p>
              <span className="text-rose-400">import</span> &#123; <span className="text-[#CD6E4E]">AgentTeam</span>, <span className="text-[#CD6E4E]">FastMCP</span>, <span className="text-[#CD6E4E]">VectorVault</span> &#125; <span className="text-rose-400">from</span> <span className="text-emerald-300">'@ali-ahsan/core'</span>;
            </p>
            <br />
            <p>
              <span className="text-purple-400">const</span> researchTeam = <span className="text-rose-400">new</span> <span className="text-[#CD6E4E]">AgentTeam</span>(&#123;
            </p>
            <p className="pl-4">
              <span className="text-blue-300">llm</span>: <span className="text-emerald-300">'gemini-2.5-flash'</span>,
            </p>
            <p className="pl-4">
              <span className="text-blue-300">agents</span>: [<span className="text-emerald-300">'ScraperBot'</span>, <span className="text-emerald-300">'VectorRAGSearch'</span>, <span className="text-emerald-300">'ReportWriter'</span>],
            </p>
            <p className="pl-4">
              <span className="text-blue-300">tools</span>: [<span className="text-[#CD6E4E]">FastMCP</span>.<span className="text-yellow-300">getTool</span>(<span className="text-emerald-300">'playwright_browser'</span>), <span className="text-[#CD6E4E]">VectorVault</span>.<span className="text-yellow-300">pinecone</span>()],
            </p>
            <p className="pl-4 text-emerald-400">
              <span className="text-blue-300">selfHealing</span>: <span className="text-rose-400">true</span>, <span className="text-slate-500">// Auto-recovers on broken selectors</span>
            </p>
            <p>&#125;);</p>
            <br />
            <p className="text-[#CD6E4E] animate-pulse">
              &gt; Execution Result: 100% Task Completion in 1.4s | 0 Hallucinations Detected
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
