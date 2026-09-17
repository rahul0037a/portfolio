import React, { useState } from 'react';
import { RESUME_DATA, SkillCategory } from '../../../data/resumeData';
import { Terminal, Check } from 'lucide-react';

export const SkillsWindow: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'languages', label: 'Languages' },
    { id: 'frameworks', label: 'Frameworks' },
    { id: 'databases', label: 'Databases & Cloud' },
    { id: 'core', label: 'Core & Fundamentals' },
  ];

  const filteredCategories: SkillCategory[] =
    activeCategory === 'all'
      ? RESUME_DATA.skillCategories
      : RESUME_DATA.skillCategories.filter((c) =>
          c.category.toLowerCase().includes(activeCategory)
        );

  return (
    <div className="flex flex-col h-full bg-[#0a0e17] text-slate-100 font-sans">
      {/* Category filter pills */}
      <div className="p-3 bg-[#0f1422] border-b border-white/10 flex flex-wrap items-center gap-1.5 text-xs">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeCategory === c.id
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Skills Matrix */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredCategories.map((cat) => (
            <div
              key={cat.category}
              className="p-4 rounded-xl bg-[#111624] border border-white/10 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
                  {cat.category}
                </h3>
                <span className="text-[10px] font-mono text-slate-400">
                  {cat.skills.length} skills
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`px-2.5 py-1 rounded-md border text-xs font-mono transition-colors flex items-center gap-1.5 ${
                      skill.highlight
                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-200 font-medium'
                        : 'bg-white/5 border-white/10 text-slate-300'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        skill.highlight ? 'bg-blue-400' : 'bg-slate-500'
                      }`}
                    />
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* System Diagnostics Bar */}
        <div className="mt-6 p-3.5 rounded-xl bg-[#0f1422] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-emerald-400" />
            <span className="font-mono text-slate-300">Core Specialization:</span>
            <span>Scalable Full-Stack Web Architecture & AWS Cloud</span>
          </div>
          <span className="font-mono text-[11px] text-blue-400">VIT CSE '25</span>
        </div>
      </div>
    </div>
  );
};
