import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { RESUME_DATA } from '../data/resumeData';
import { Briefcase, Calendar, MapPin, ChevronRight, Layers, Sparkles } from 'lucide-react';

export const ScrollyExperience: React.FC = () => {
  const { experiences } = RESUME_DATA;
  const [selectedExpId, setSelectedExpId] = useState(experiences[0].id);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yTimeline = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const activeExperience = experiences.find((e) => e.id === selectedExpId) || experiences[0];

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 overflow-hidden z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono text-teal-400 tracking-wider uppercase font-semibold flex items-center gap-1.5">
            <Sparkles size={13} />
            Chapter 02 // Experience Journey
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/30 to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Production Engineering & <span className="text-gradient">SaaS Impact</span>
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
              Shipping resilient features in production environments — from high-impact Next.js startup features to full-stack MERN cloud deployments.
            </p>
          </div>
        </div>

        {/* Interactive Experience Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Role Selection Cards with Parallax Shift */}
          <motion.div style={{ y: yTimeline }} className="lg:col-span-4 space-y-3.5">
            <div className="text-xs font-mono uppercase text-teal-400 tracking-wider mb-2 font-semibold">
              Select Role Timeline
            </div>
            {experiences.map((exp) => {
              const isSelected = exp.id === selectedExpId;
              return (
                <button
                  key={exp.id}
                  onClick={() => setSelectedExpId(exp.id)}
                  className={`w-full text-left p-5 rounded-2xl transition-all relative border ${
                    isSelected
                      ? 'bg-[#0a1124] border-teal-500/50 shadow-aurora-glow'
                      : 'bg-[#060b17]/60 border-slate-800 hover:border-slate-700 hover:bg-[#080e1e]'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute -left-[1px] top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-teal-400 to-cyan-500 rounded-r" />
                  )}

                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono text-teal-300 font-medium">
                      {exp.period}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 font-mono">
                      {exp.location}
                    </span>
                  </div>

                  <div className="text-base font-bold text-white transition-colors">
                    {exp.role}
                  </div>
                  <div className="text-sm text-slate-300 font-medium">
                    @ {exp.company}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {exp.techStack.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                    {exp.techStack.length > 3 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-500">
                        +{exp.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Right: Detailed Deep Dive of Active Experience */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExperience.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="glass-card p-6 sm:p-8 rounded-3xl border-slate-800/90 shadow-aurora-card relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl" />

                {/* Header detail */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-teal-400 mb-1">
                      <Briefcase size={14} />
                      <span className="uppercase tracking-wide font-semibold">Position Breakdown</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {activeExperience.role}{' '}
                      <span className="text-gradient">@ {activeExperience.company}</span>
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 bg-[#080d1a] px-3.5 py-2 rounded-xl border border-slate-800">
                    <Calendar size={13} className="text-teal-400" />
                    <span>{activeExperience.period}</span>
                    <span className="text-slate-600">•</span>
                    <MapPin size={13} className="text-teal-400" />
                    <span>{activeExperience.location}</span>
                  </div>
                </div>

                {/* Key Metrics / Snapshot */}
                <div className="grid grid-cols-3 gap-3 my-6">
                  {activeExperience.stats.map((st, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-[#080d1a] border border-slate-800 text-center">
                      <div className="text-xs text-slate-400 font-mono">{st.label}</div>
                      <div className="text-sm sm:text-base font-bold text-teal-300 mt-1">{st.value}</div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <p className="text-sm text-slate-300 leading-relaxed bg-[#080d1a]/80 p-4 rounded-2xl border border-slate-800/80 mb-6 italic">
                  "{activeExperience.summary}"
                </p>

                {/* Bullets / Impact */}
                <div className="space-y-3.5">
                  <div className="text-xs font-mono uppercase text-teal-400 tracking-wider font-semibold">
                    Key Responsibilities & Deliverables
                  </div>
                  {activeExperience.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center shrink-0 mt-0.5 text-teal-400">
                        <ChevronRight size={12} />
                      </div>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1">
                    <Layers size={13} className="text-teal-400" />
                    Technologies:
                  </span>
                  {activeExperience.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-teal-500/10 border border-teal-500/30 text-teal-300 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
