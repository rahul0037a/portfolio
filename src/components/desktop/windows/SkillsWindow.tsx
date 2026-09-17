import React, { useState } from 'react';
import { RESUME_DATA, SkillCategory } from '../../../data/resumeData';
import { useOS } from '../../../context/OSContext';
import { Terminal, Search, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export const SkillsWindow: React.FC = () => {
  const { openProject, openApp } = useOS();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'data', label: 'Data' },
    { id: 'cloud', label: 'Cloud' },
    { id: 'engineering', label: 'Engineering' },
  ];

  const filteredCategories: SkillCategory[] = RESUME_DATA.skillCategories
    .filter((c) => activeCategory === 'all' || c.category.toLowerCase() === activeCategory.toLowerCase())
    .map((c) => ({
      ...c,
      skills: c.skills.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.usedInProjects.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    }))
    .filter((c) => c.skills.length > 0);

  const handleBadgeClick = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('fusecake') || lower.includes('ethnus')) {
      openApp('experience');
    } else if (lower.includes('wanderlust')) {
      openProject('wanderlust');
    } else if (lower.includes('foodplay')) {
      openProject('foodplay');
    } else if (lower.includes('blog blitz')) {
      openProject('blog-blitz');
    }
  };

  const isClickable = (name: string): boolean => {
    const lower = name.toLowerCase();
    return (
      lower.includes('wanderlust') ||
      lower.includes('fusecake') ||
      lower.includes('foodplay') ||
      lower.includes('blog blitz') ||
      lower.includes('ethnus')
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0e17] text-slate-100 font-sans select-none">
      {/* Category Filter Toolbar & Search */}
      <div className="p-3 bg-[#0f1422] border-b border-white/10 flex flex-wrap items-center justify-between gap-2.5 text-xs shrink-0">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all text-xs ${
                activeCategory === c.id
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 text-xs text-slate-300 w-full sm:w-48">
          <Search size={12} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search skill or project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-[11px] text-white placeholder-slate-500 focus:outline-none w-full font-mono"
          />
        </div>
      </div>

      {/* Skills Matrix with Depth Indicator */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#0b0f19] custom-scrollbar space-y-6">
        <div className="flex items-center justify-between pb-1 border-b border-white/10">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Layers size={14} className="text-blue-400" />
              <span>Technology Depth Matrix</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Demonstrated production evidence and concrete project implementations for every skill.
            </p>
          </div>
          <span className="hidden sm:inline text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-400/20 px-2 py-0.5 rounded">
            Click project tag to inspect repo
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredCategories.map((cat) => (
            <div
              key={cat.category}
              className="p-4 rounded-2xl bg-[#111624] border border-white/10 space-y-3.5 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <div>
                  <h3 className="text-sm font-extrabold text-blue-400 tracking-wide font-mono uppercase">
                    {cat.category}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
                    {cat.description}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                  {cat.skills.length} skills
                </span>
              </div>

              {/* Skills List with Depth Indicator */}
              <div className="space-y-2">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-2.5 rounded-xl bg-[#0d1220] border border-white/5 hover:border-white/15 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          skill.highlight ? 'bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]' : 'bg-slate-500'
                        }`}
                      />
                      <span className="text-xs font-bold text-white font-mono">
                        {skill.name}
                      </span>
                    </div>

                    {/* Depth Indicator: Used in projects */}
                    <div className="flex flex-wrap items-center gap-1 sm:justify-end">
                      <span className="text-[10px] font-mono text-slate-500 hidden sm:inline mr-0.5">
                        Used in:
                      </span>
                      {skill.usedInProjects.map((pName) => {
                        const clickable = isClickable(pName);
                        return clickable ? (
                          <button
                            key={pName}
                            onClick={() => handleBadgeClick(pName)}
                            className="px-2 py-0.5 rounded bg-blue-500/15 hover:bg-blue-500/30 border border-blue-400/30 text-blue-300 hover:text-white text-[10px] font-mono transition-colors flex items-center gap-0.5 group"
                            title={`Inspect ${pName}`}
                          >
                            <span>{pName}</span>
                            <ArrowRight size={9} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        ) : (
                          <span
                            key={pName}
                            className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 text-[10px] font-mono"
                          >
                            {pName}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* System Diagnostics Footer */}
        <div className="p-4 rounded-2xl bg-[#0f1422] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-emerald-400" />
            <span className="font-mono text-slate-300">Engineering Philosophy:</span>
            <span>Real code repositories & quantifiable metrics rather than arbitrary percentage bars.</span>
          </div>
          <span className="font-mono text-[11px] text-blue-400">VIT CSE '25 · AWS Certified</span>
        </div>
      </div>

      {/* Footer Status */}
      <div className="h-7 px-4 bg-[#0a0d16] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0">
        <span>5 Core Categories • 25+ Technologies Indexed with Project Depth</span>
        <span className="text-emerald-400 flex items-center gap-1">
          <CheckCircle2 size={12} />
          100% Verified in Codebase
        </span>
      </div>
    </div>
  );
};
