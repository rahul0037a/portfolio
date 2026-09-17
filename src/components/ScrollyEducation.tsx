import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RESUME_DATA } from '../data/resumeData';
import { GraduationCap, BookOpen, Award, CheckCircle2, Cpu, Database, Network, Binary, Sparkles } from 'lucide-react';

export const ScrollyEducation: React.FC = () => {
  const { education } = RESUME_DATA;
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yRight = useTransform(scrollYProgress, [0, 1], [80, -60]);

  const foundationPillars = [
    {
      title: "Data Structures & Algorithms",
      icon: <Binary className="text-teal-400" size={20} />,
      desc: "Algorithmic complexity, tree/graph traversals, dynamic programming, space-time optimization."
    },
    {
      title: "Object-Oriented Programming & MVC",
      icon: <Cpu className="text-cyan-400" size={20} />,
      desc: "Polymorphism, encapsulation, modularity, design patterns, separation of concerns."
    },
    {
      title: "Database Management & SQL",
      icon: <Database className="text-sky-400" size={20} />,
      desc: "Relational modeling, indexing strategies, ACID compliance, normalization & NoSQL schemas."
    },
    {
      title: "Operating Systems & Networks",
      icon: <Network className="text-emerald-400" size={20} />,
      desc: "Concurrency, process synchronization, memory management, HTTP/TCP protocol layers."
    }
  ];

  return (
    <section
      ref={targetRef}
      id="foundation"
      className="relative py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 overflow-hidden z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Chapter Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono text-teal-400 tracking-wider uppercase font-semibold flex items-center gap-1.5">
            <Sparkles size={13} />
            Chapter 01 // The Foundation
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/30 to-transparent" />
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Academic Rigor at <span className="text-gradient">VIT Chennai</span>
        </h2>
        <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
          Four years of intensive Computer Science coursework cultivating computational intuition, algorithmic discipline, and system architecture fundamentals.
        </p>

        {/* Scrollytelling Split Grid with Parallax Offsets */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Academic Credentials with Parallax Translation */}
          <motion.div style={{ y: yLeft }} className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border-slate-800/90 relative overflow-hidden group shadow-aurora-card">
              <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-all" />

              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-sm">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-teal-400 font-semibold">Undergraduate Degree</div>
                  <div className="text-lg font-bold text-white leading-snug">Vellore Institute of Technology</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm font-semibold text-slate-200">{education.degree}</div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">Chennai Campus • {education.period}</div>
                </div>

                {/* Score Pill */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#080d1a] border border-slate-800">
                  <span className="text-xs font-mono text-slate-400">Cumulative GPA</span>
                  <div className="flex items-center gap-1.5 font-mono text-base font-bold text-teal-300">
                    <Award size={16} />
                    <span>{education.cgpa}</span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-400 leading-relaxed space-y-2.5">
                  {education.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-teal-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coursework Tags */}
              <div className="mt-6 pt-5 border-t border-slate-800/80">
                <div className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen size={13} className="text-teal-400" />
                  <span>Key Coursework</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {education.coreCourses.map((c, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-teal-500/30 transition-colors"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 4 Engineering Pillars with Staggered Parallax */}
          <motion.div style={{ y: yRight }} className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono uppercase text-teal-400 tracking-wider mb-2 font-semibold">
              CSE Theoretical & Practical Pillars
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {foundationPillars.map((pillar, index) => (
                <div
                  key={index}
                  className="glass-card p-5 rounded-2xl border-slate-800/90 glass-card-hover group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 group-hover:border-teal-500/40 transition-colors">
                      {pillar.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-teal-300 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/50 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>Pillar 0{index + 1}</span>
                    <span className="text-teal-400 font-medium">Mastered</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Code snapshot illustration */}
            <div className="glass-card p-4 rounded-2xl border-slate-800 font-mono text-xs text-slate-300 bg-[#080d1a]/90 mt-4 overflow-x-auto shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] text-slate-500">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500/80 inline-block" />
                  <span className="ml-1 text-slate-400">Foundation.cs.ts</span>
                </span>
                <span>VIT_CS_2025</span>
              </div>
              <pre className="mt-3 text-slate-300 leading-relaxed">
                <code>
                  <span className="text-cyan-400">interface</span> <span className="text-teal-300">SoftwareEngineer</span> {'{\n'}
                  {'  '}degree: <span className="text-amber-300">"B.Tech CSE"</span>; <span className="text-slate-500">// VIT Chennai (7.91 CGPA)</span>{'\n'}
                  {'  '}competencies: [<span className="text-teal-300">"DataStructures"</span>, <span className="text-teal-300">"SystemDesign"</span>, <span className="text-teal-300">"FullStack"</span>, <span className="text-teal-300">"AWS_Cloud"</span>];{'\n'}
                  {'  '}readyForProduction: <span className="text-teal-400">true</span>;{'\n'}
                  {'}'}
                </code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
