import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, Cpu, Database, Brain, Check, Sparkles, Cloud, Layers, CheckCircle2 } from 'lucide-react';

interface SkillItem {
  name: string;
  category: 'frontend' | 'backend' | 'cloud' | 'languages' | 'ml';
  status: 'Advanced' | 'Proficient' | 'Certified';
  usedIn: string;
  highlight?: boolean;
}

const DETAILED_SKILLS: SkillItem[] = [
  // Frontend
  { name: 'React.js', category: 'frontend', status: 'Advanced', usedIn: 'FuseCake & Ethnus', highlight: true },
  { name: 'Next.js 14', category: 'frontend', status: 'Advanced', usedIn: 'FuseCake SaaS', highlight: true },
  { name: 'TypeScript', category: 'frontend', status: 'Advanced', usedIn: 'FuseCake & Core Apps', highlight: true },
  { name: 'Tailwind CSS', category: 'frontend', status: 'Advanced', usedIn: 'FuseCake & Portfolios', highlight: true },
  { name: 'Leaflet.js', category: 'frontend', status: 'Proficient', usedIn: 'WanderLust Maps' },
  { name: 'HTML5 / CSS3', category: 'frontend', status: 'Advanced', usedIn: 'Blog Blitz & All Projects' },

  // Backend
  { name: 'Node.js', category: 'backend', status: 'Advanced', usedIn: 'WanderLust & Ethnus', highlight: true },
  { name: 'Express.js', category: 'backend', status: 'Advanced', usedIn: 'MVC REST APIs', highlight: true },
  { name: 'Flask', category: 'backend', status: 'Proficient', usedIn: 'FoodPlay Diet Planner', highlight: true },
  { name: 'RESTful API Design', category: 'backend', status: 'Advanced', usedIn: 'FuseCake & WanderLust', highlight: true },
  { name: 'Passport.js & Auth', category: 'backend', status: 'Advanced', usedIn: 'WanderLust Security' },
  { name: 'Session Management', category: 'backend', status: 'Advanced', usedIn: 'connect-mongo & RBAC' },

  // Cloud & Databases
  { name: 'AWS Cloud', category: 'cloud', status: 'Certified', usedIn: 'Certified Practitioner 2027', highlight: true },
  { name: 'MongoDB & Mongoose', category: 'cloud', status: 'Advanced', usedIn: 'WanderLust & MERN', highlight: true },
  { name: 'MySQL & Relational', category: 'cloud', status: 'Proficient', usedIn: 'VIT Chennai & Systems' },
  { name: 'Cloudinary CDN', category: 'cloud', status: 'Proficient', usedIn: 'WanderLust Media' },
  { name: 'Render Deployment', category: 'cloud', status: 'Advanced', usedIn: 'Live Hosted Apps' },
  { name: 'Git & GitHub CI/CD', category: 'cloud', status: 'Advanced', usedIn: 'Team Collaboration' },

  // Languages
  { name: 'JavaScript (ES6+)', category: 'languages', status: 'Advanced', usedIn: 'Full-Stack Ecosystem', highlight: true },
  { name: 'Python', category: 'languages', status: 'Advanced', usedIn: 'Flask & ML Modeling', highlight: true },
  { name: 'Java', category: 'languages', status: 'Proficient', usedIn: 'VIT Chennai Core CS' },
  { name: 'SQL', category: 'languages', status: 'Proficient', usedIn: 'Relational Schemas' },

  // Machine Learning
  { name: 'Supervised Learning', category: 'ml', status: 'Certified', usedIn: 'Stanford / Andrew Ng', highlight: true },
  { name: 'Regression & Classification', category: 'ml', status: 'Certified', usedIn: 'Stanford Coursera', highlight: true },
  { name: 'Feature Engineering', category: 'ml', status: 'Proficient', usedIn: 'Applied Modeling' },
  { name: 'Exploratory Data Analysis', category: 'ml', status: 'Proficient', usedIn: 'Data Analytics' }
];

export const SkillsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'frontend' | 'backend' | 'cloud' | 'languages' | 'ml'>('all');

  const filterOptions = [
    { id: 'all', label: 'All Stack' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'cloud', label: 'Cloud & DB (AWS)' },
    { id: 'languages', label: 'Languages' },
    { id: 'ml', label: 'Machine Learning' },
  ];

  const filtered = activeFilter === 'all'
    ? DETAILED_SKILLS
    : DETAILED_SKILLS.filter((s) => s.category === activeFilter);

  return (
    <section id="skills" className="relative py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 overflow-hidden z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-semibold flex items-center gap-1.5">
            <Sparkles size={14} />
            Technical Arsenal // Verified Proficiencies
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Skills Matrix & <span className="text-gradient-cyan">Engineering Competence</span>
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
              Every tool and language backed by concrete production code, academic rigor at VIT Chennai, or official industry certifications.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#050814] p-1.5 rounded-2xl border border-slate-800 shadow-inner">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setActiveFilter(opt.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                  activeFilter === opt.id
                    ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold shadow-neon-cyan'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Skill Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="card-prism p-5 rounded-2xl border-slate-800/90 card-prism-hover group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                    {skill.highlight && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
                    {skill.name}
                  </span>

                  <span
                    className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
                      skill.status === 'Certified'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                        : skill.status === 'Advanced'
                        ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    {skill.status}
                  </span>
                </div>

                <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5 mt-2">
                  <span className="text-slate-600">Track:</span>
                  <span className="text-slate-300">{skill.usedIn}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="capitalize">{skill.category}</span>
                <span className="text-emerald-400/80 flex items-center gap-1">
                  <Check size={12} /> Verified
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
