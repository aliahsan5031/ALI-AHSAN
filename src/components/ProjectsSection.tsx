import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ExternalLink, Github, CheckCircle2, Layers, Cpu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Multi-Agent', 'RAG Engines', 'Web Automation', 'Full-Stack AI'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-12 lg:py-16 px-4 lg:px-8 border-b border-[#383A39]">
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
            Case Studies
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Featured <span className="text-[#CD6E4E]">AI Engineering Projects</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Explore real-world autonomous systems, multi-agent workflows, and vector knowledge engines designed for enterprise clients and startups.
          </p>
        </motion.div>

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-2 border-b border-[#383A39] pb-4">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer relative
                ${
                  activeCategory === cat
                    ? 'bg-[#CD6E4E] text-[#161717] shadow-md shadow-[#CD6E4E]/20 border-t border-l border-white/30'
                    : 'bg-[#242625] text-slate-300 hover:text-white border border-[#383A39] hover:border-[#CD6E4E]'
                }
              `}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid with Sleek Interface hover borders */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-[#242625] p-6 rounded-lg shadow-xl border-b-2 border-transparent hover:border-[#CD6E4E] hover:shadow-lg hover:shadow-[#CD6E4E]/10 transition-all group border-t border-l border-r border-[#383A39] flex flex-col justify-between"
              >
                {/* Image Header */}
                <div className="relative h-52 rounded overflow-hidden bg-[#161717] mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#242625] via-[#242625]/30 to-transparent" />

                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#161717]/90 border border-[#383A39] text-[#CD6E4E] text-[10px] font-bold tracking-wider uppercase backdrop-blur-md">
                    {project.category}
                  </span>

                  {project.featured && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-[#CD6E4E] text-[#161717] text-[10px] font-extrabold uppercase tracking-widest">
                      Featured
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#CD6E4E] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#CD6E4E] font-medium">
                      {project.subtitle}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Metrics Badges */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    {project.metrics.map((metric, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="pt-3 border-t border-[#383A39] flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-[#1d1f1e] border border-[#383A39] px-2 py-1 rounded text-[10px] text-slate-300 font-mono tracking-wider"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedProject(project)}
                      className="py-2.5 px-4 bg-[#CD6E4E] hover:bg-[#E07E5D] text-[#161717] font-black text-xs uppercase tracking-wider rounded-lg shrink-0 transition-colors cursor-pointer border-t border-l border-white/30 shadow-md"
                    >
                      Case Study
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-3xl bg-[#242625] border border-[#383A39] rounded-2xl p-6 sm:p-8 space-y-6 relative shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-[#1d1f1e] border border-[#383A39] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#1d1f1e] text-[#CD6E4E] border border-[#383A39] text-xs font-bold uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs text-slate-400">• Case Study</span>
                </div>

                <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                <p className="text-xs text-[#CD6E4E] font-medium">{selectedProject.subtitle}</p>
              </div>

              <div className="rounded overflow-hidden border border-[#383A39] max-h-64">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#CD6E4E] uppercase tracking-wider">
                  System Overview
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Architecture Steps */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#CD6E4E] uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  Technical Architecture Flow
                </h4>
                <div className="space-y-2">
                  {selectedProject.architecture.map((arch, idx) => (
                    <div key={idx} className="p-3 bg-[#161717] rounded border border-[#383A39] text-xs text-slate-300 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded bg-[#1d1f1e] border border-[#383A39] text-[#CD6E4E] font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <span>{arch}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {selectedProject.metrics.map((metric, idx) => (
                  <div key={idx} className="p-3 bg-[#161717] rounded border border-emerald-500/20 text-center">
                    <div className="text-sm font-black text-emerald-400">{metric}</div>
                  </div>
                ))}
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#383A39] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-[#1d1f1e] border border-[#383A39] text-[#CD6E4E] text-xs font-mono">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-[#1d1f1e] hover:bg-[#2e302f] text-slate-300 hover:text-white border border-[#383A39] rounded-lg transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  <a
                    href="#contact"
                    onClick={() => setSelectedProject(null)}
                    className="py-3 px-6 bg-[#CD6E4E] hover:bg-[#E07E5D] text-[#161717] font-black text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 border-t border-l border-white/30 shadow-lg"
                  >
                    <span>Inquire About Build</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

