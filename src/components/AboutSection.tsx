import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { UserCheck, Cpu, Code2, ShieldAlert, Zap, Layers, Server, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: Cpu,
      title: 'Autonomous Reasoning',
      desc: 'Architecting self-evaluating agent loops that inspect their own intermediate thoughts and tool outputs before delivering final results.',
    },
    {
      icon: Layers,
      title: 'Deterministic Guardrails',
      desc: 'Enforcing strict JSON Schema validation, pydantic output parsers, and zero-hallucination source grounding.',
    },
    {
      icon: Server,
      title: 'Enterprise Tooling',
      desc: 'Connecting LLMs directly to custom FastMCP servers, PostgreSQL databases, vector stores, and private webhooks.',
    },
    {
      icon: Globe,
      title: 'Resilient Web Automation',
      desc: 'Deploying self-healing web scrapers that navigate anti-bot protections and adapt dynamically to DOM changes.',
    },
  ];

  const skillGroups = [
    {
      category: 'Agentic Frameworks',
      icon: Cpu,
      skills: [
        { name: 'AutoGen & Hierarchical Agents', pct: '92%' },
        { name: 'n8n', pct: '96%' },
        { name: 'Make.com', pct: '95%' },
        { name: 'Zapier', pct: '94%' },
        { name: 'Manus', pct: '92%' },
      ],
    },
    {
      category: 'RAG & Vector Storage',
      icon: Code2,
      skills: [
        { name: 'Vector Search Databases', pct: '96%' },
        { name: 'LlamaIndex Semantic Search', pct: '95%' },
        { name: 'Hybrid Keyword & Dense Search', pct: '90%' },
        { name: 'Cohere Rerank & Cross-Encoders', pct: '94%' },
        { name: 'Embeddings & Tokenizations', pct: '94%' },
      ],
    },
    {
      category: 'Languages & Web Automation',
      icon: ShieldAlert,
      skills: [
        { name: 'Python (FastAPI, Asyncio)', pct: '98%' },
        { name: 'Prompt Engineering & Guardrails', pct: '95%' },
        { name: 'Playwright & Web Scraping', pct: '96%' },
        { name: 'REST APIs & Serverless Microservices', pct: '91%' },
      ],
    },
  ];

  const coreTechs = [
    {
      name: 'Python',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 128 128">
          <path d="M62.6 0c-30.8 0-28.9 13.4-28.9 13.4l.1 13.9h29.4v4.2H21.5S0 29 0 60.3c0 31.3 18.7 30.2 18.7 30.2h11.2V74.8s-.6-17.7 17.5-17.7h30.2s16.6.2 16.6-16V16.6S96.1 0 62.6 0zm-16.3 9.4c3.4 0 6.1 2.8 6.1 6.1 0 3.4-2.8 6.1-6.1 6.1-3.4 0-6.1-2.8-6.1-6.1 0-3.3 2.7-6.1 6.1-6.1z" fill="#306998"/>
          <path d="M65.4 128c30.8 0 28.9-13.4 28.9-13.4l-.1-13.9H64.8v-4.2h41.7s21.5 2.5 21.5-28.8c0-31.3-18.7-30.2-18.7-30.2H98.1v15.7s.6 17.7-17.5 17.7H50.4s-16.6-.2-16.6 16v24.5s-2 16.6 31.6 16.6zm16.3-9.4c-3.4 0-6.1-2.8-6.1-6.1 0-3.4 2.8-6.1 6.1-6.1 3.4 0 6.1 2.8 6.1 6.1 0 3.3-2.8 6.1-6.1 6.1z" fill="#FFD43B"/>
        </svg>
      ),
    },
    {
      name: 'n8n',
      icon: (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJChhGSF5xro_NU1hNJeTBckvaE3m-ts4qGUYDD4KQBg&s=10"
          alt="n8n"
          className="w-5 h-5 object-contain rounded-sm"
        />
      ),
    },
    {
      name: 'FastAPI',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#009688"/>
          <path d="M13.09 4.5l-1.09 5.82h3.82l-5.45 9.18 1.09-5.82H7.64l5.45-9.18z" fill="white"/>
        </svg>
      ),
    },
    {
      name: 'LangChain',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      name: 'LangGraph',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <circle cx="6" cy="6" r="3" fill="#38BDF8"/>
          <circle cx="18" cy="6" r="3" fill="#38BDF8"/>
          <circle cx="12" cy="18" r="3" fill="#818CF8"/>
          <path d="M8.5 7.5L15.5 7.5M8 8.5L10.5 15.5M16 8.5L13.5 15.5" stroke="#94A3B8" strokeWidth="1.5"/>
        </svg>
      ),
    },
    {
      name: 'Retrieval-Augmented Generation (RAG)',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M4 6c0-1.1 3.6-2 8-2s8 .9 8 2-3.6 2-8 2-8-.9-8-2z" fill="#A855F7" opacity="0.8"/>
          <path d="M4 6v6c0 1.1 3.6 2 8 2s8-.9 8-2V6" stroke="#A855F7" strokeWidth="1.5"/>
          <path d="M4 12v6c0 1.1 3.6 2 8 2s8-.9 8-2v-6" stroke="#A855F7" strokeWidth="1.5"/>
          <path d="M18 10l3 3m0 0l-3 3m3-3h-5" stroke="#CD6E4E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      name: 'Make.com',
      icon: (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTy8u9Ihrb8kVtZQR07tHcgD0pqzPsPimrlajzcEs3bQ&s"
          alt="Make.com"
          className="w-5 h-5 object-contain rounded-sm"
        />
      ),
    },
    {
      name: 'Loveable',
      icon: (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiK_vw5qvn1ZRi110cxeId-NoNLGPLZ0JJN4175-vTeg&s"
          alt="Loveable"
          className="w-5 h-5 object-contain rounded-sm"
        />
      ),
    },
    {
      name: 'Zapier',
      icon: (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFxCBvo0ZUU8SWKsDXrUDUDiCecwDatAKsWGheCBVnNg&s=10"
          alt="Zapier"
          className="w-5 h-5 object-contain rounded-sm"
        />
      ),
    },
    {
      name: 'Manus',
      icon: (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgwRwAQnADUmLPR2IkihE-Scw4mNjwZl4xwuLZXJOrdQ&s"
          alt="Manus"
          className="w-5 h-5 object-contain rounded-sm"
        />
      ),
    },
    {
      name: 'Claude',
      icon: (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREWKDD4mTWVyCLvqZwuCkOMkzydSeKaMj_JCTTQLDC5A&s"
          alt="Claude"
          className="w-5 h-5 object-contain rounded-sm"
        />
      ),
    },
    {
      name: 'OpenAI',
      icon: (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0w3oYgUovoisc6-xkWRwHdOEKxVxRWWZTpdCCSg5czg&s=10"
          alt="OpenAI"
          className="w-5 h-5 object-contain rounded-sm"
        />
      ),
    },
    {
      name: 'Gemini',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" fill="url(#gemini-grad-marquee)"/>
          <defs>
            <linearGradient id="gemini-grad-marquee" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1A73E8"/>
              <stop offset="0.5" stopColor="#8AB4F8"/>
              <stop offset="1" stopColor="#C58AF9"/>
            </linearGradient>
          </defs>
        </svg>
      ),
    },
  ];

  return (
    <section id="about" className="py-12 lg:py-16 px-4 lg:px-8 border-b border-[#383A39]">
      <div className="max-w-6xl mx-auto space-y-12">
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
            About Ali Ahsan
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Engineering Next-Gen <span className="text-[#CD6E4E]">Autonomous Intelligence</span>
          </h2>
        </motion.div>

        {/* Story Grid */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl space-y-4 text-xs sm:text-sm text-slate-400 leading-relaxed"
          >
            <p className="text-sm sm:text-base text-slate-200 font-medium">
              Hello! I'm <strong className="text-[#CD6E4E] font-bold">{PERSONAL_INFO.name}</strong>. I specialize in designing and engineering custom AI agent ecosystems, RAG knowledge vaults, and full-stack web automation for ambitious founders and enterprise engineering teams.
            </p>

            <p>
              My focus is on creating practical AI systems that integrate seamlessly with existing business tools rather than building generic chatbots. Every solution is designed around the client's workflow, ensuring reliable automation, accurate information retrieval, and a smooth user experience.
            </p>

            <p>
              Whether you need an AI agent to automate customer support, streamline internal operations, process business emails, connect multiple platforms, or build an end-to-end AI solution, I focus on delivering scalable, maintainable, and production-ready systems tailored to your business.
            </p>
          </motion.div>
        </div>

        {/* Core Technologies Marquee Flowing Row */}
        <div className="space-y-4 pt-4">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl font-extrabold text-white uppercase tracking-wider text-center"
          >
            Core Technologies
          </motion.h3>

          <div className="relative w-full overflow-hidden py-4">
            {/* Fade overlays on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#1d1f1e] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#1d1f1e] to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex items-center gap-8 sm:gap-10 w-max"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                ease: 'linear',
                duration: 25,
                repeat: Infinity,
              }}
            >
              {[...coreTechs, ...coreTechs].map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 text-slate-300 hover:text-white text-sm sm:text-base font-semibold whitespace-nowrap transition-all group cursor-default"
                >
                  <div className="w-6 h-6 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                    {tech.icon}
                  </div>
                  <span className="tracking-wide">{tech.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

