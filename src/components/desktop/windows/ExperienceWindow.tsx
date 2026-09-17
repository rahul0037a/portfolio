import React, { useState } from 'react';
import { RESUME_DATA, Experience } from '../../../data/resumeData';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const ExperienceWindow: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('fusecake');
  const role: Experience =
    RESUME_DATA.experiences.find((e) => e.id === selectedId) || RESUME_DATA.experiences[0];

  return (
    <div className="flex flex-col h-full bg-[#0a0e17] text-slate-100 font-sans">
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Roles Sidebar / Top Tabs on Mobile */}
        <div className="w-full md:w-52 lg:w-56 bg-[#0f1422] border-b md:border-b-0 md:border-r border-white/10 p-2 sm:p-3 flex flex-row md:flex-col overflow-x-auto shrink-0 gap-1.5 no-scrollbar">
          <span className="hidden md:block text-[11px] font-mono text-slate-400 uppercase tracking-wider px-2 py-1">
            Career History
          </span>
          <div className="flex flex-row md:flex-col gap-1.5 w-full">
            {RESUME_DATA.experiences.map((exp) => {
              const isSelected = exp.id === selectedId;
              return (
                <button
                  key={exp.id}
                  onClick={() => setSelectedId(exp.id)}
                  className={`px-3 py-2 md:py-2.5 rounded-lg text-xs font-medium transition-all shrink-0 md:w-full text-left ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="font-bold truncate">{exp.company}</div>
                  <div className="text-[11px] opacity-80 truncate hidden sm:block">{exp.role}</div>
                  <div className="text-[10px] opacity-60 font-mono mt-0.5 hidden md:block">{exp.period}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content Pane */}
        <div className="flex-1 p-4 sm:p-6 overflow-auto bg-[#0b0f19]">
          <div className="max-w-xl space-y-6">
            {/* Header */}
            <div className="border-b border-white/10 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-bold text-white">{role.role}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono">
                  {role.company}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Calendar size={13} />
                  {role.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={13} />
                  {role.location}
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="p-3.5 rounded-xl bg-[#111624]/70 border border-white/5 text-xs text-slate-300 leading-relaxed">
              {role.summary}
            </div>

            {/* Bullets */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Responsibilities & Measurable Impact
              </h3>
              <ul className="space-y-3">
                {role.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            {role.stats && role.stats.length > 0 && (
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                  Key Metrics
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {role.stats.map((m, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#111624] border border-white/10 text-center">
                      <div className="text-lg font-bold text-blue-400 font-mono">{m.value}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech stack */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Technologies Utilized
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {role.techStack.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proper Status Bar */}
      <div className="h-7 px-4 bg-[#0a0d16] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0">
        <span>2 roles • FuseCake (SaaS) & Ethnus (MERN/Cloud)</span>
        <span className="text-blue-400">Remote Delivery</span>
      </div>
    </div>
  );
};
