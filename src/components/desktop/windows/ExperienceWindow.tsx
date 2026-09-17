import React, { useState } from 'react';
import { RESUME_DATA, Experience } from '../../../data/resumeData';
import { Calendar, MapPin, CheckCircle2, ArrowDown, Sparkles, Award, Cpu, Code2 } from 'lucide-react';

export const ExperienceWindow: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('fusecake');
  const role: Experience =
    RESUME_DATA.experiences.find((e) => e.id === selectedId) || RESUME_DATA.experiences[0];

  return (
    <div className="flex flex-col h-full bg-[#0a0e17] text-slate-100 font-sans select-none">
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: OS-Style Vertical Timeline */}
        <div className="w-full md:w-64 lg:w-72 bg-[#0c101c] border-b md:border-b-0 md:border-r border-white/10 p-3 sm:p-4 flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
              TIMELINE NAVIGATION
            </span>
            <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              3 Milestones
            </span>
          </div>

          {/* Connected OS-Style Timeline Nodes */}
          <div className="flex flex-col space-y-1 my-auto md:my-0">
            {RESUME_DATA.experiences.map((exp, idx) => {
              const isSelected = exp.id === selectedId;

              return (
                <React.Fragment key={exp.id}>
                  {/* Timeline Card */}
                  <div
                    onClick={() => setSelectedId(exp.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer shadow-sm relative group ${
                      isSelected
                        ? 'bg-blue-950/60 border-blue-400/80 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                        : 'bg-[#111624] border-white/10 hover:border-blue-400/40 hover:bg-[#151c2e]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-black ${isSelected ? 'text-amber-300' : 'text-slate-400'}`}>
                        {exp.year}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-blue-500/30 text-blue-200 border border-blue-400/40'
                          : 'bg-white/5 text-slate-400'
                      }`}>
                        {exp.period.split('–')[0].trim()}
                      </span>
                    </div>

                    <div className="mt-1">
                      <h4 className={`text-sm font-bold tracking-tight ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                        {exp.company}
                      </h4>
                      <p className="text-xs text-blue-400 font-mono mt-0.5 truncate">
                        {exp.role}
                      </p>
                    </div>

                    {/* Active Pip Indicator */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,1)] animate-pulse" />
                    )}
                  </div>

                  {/* OS Timeline Connector */}
                  {idx < RESUME_DATA.experiences.length - 1 && (
                    <div className="flex items-center justify-center py-1">
                      <div className="flex flex-col items-center text-slate-600">
                        <div className="w-[1.5px] h-3 bg-blue-500/40" />
                        <ArrowDown size={11} className="text-blue-400" />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="mt-auto hidden md:block pt-3 border-t border-white/10 text-[10px] font-mono text-slate-400">
            <span>Click any event to inspect:</span>
            <div className="text-blue-300 font-semibold mt-1">
              Role → What you built → Technologies → Result
            </div>
          </div>
        </div>

        {/* Right: Detailed Structured View */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#0b0f19] custom-scrollbar">
          <div className="max-w-2xl space-y-6">
            {/* Header: Role & Metadata */}
            <div className="border-b border-white/10 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                      {role.year}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      {role.role}
                    </h2>
                  </div>
                  <h3 className="text-sm font-mono text-blue-400 font-semibold mt-1">
                    {role.company}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-slate-400" />
                    <span>{role.period}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-slate-400" />
                    <span>{role.location}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Structured 4-Part Breakdown */}
            <div className="space-y-4">
              {/* 1. What You Built */}
              <div className="p-4 rounded-2xl bg-[#111624] border border-white/10 space-y-2 shadow-sm">
                <div className="flex items-center gap-2">
                  <Code2 size={15} className="text-cyan-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                    What You Built
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {role.whatYouBuilt || role.summary}
                </p>
              </div>

              {/* 2. Technologies Utilized */}
              <div className="p-4 rounded-2xl bg-[#111624] border border-white/10 space-y-2.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <Cpu size={15} className="text-indigo-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
                    Technologies & Architecture
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(role.technologies || role.techStack).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3. Result & Measurable Impact */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-emerald-900/30 border border-emerald-500/30 space-y-2.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <Award size={15} className="text-emerald-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold">
                    Result & Measurable Impact
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-sans">
                  {role.result}
                </p>

                {role.stats && role.stats.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-500/20">
                    {role.stats.map((s, i) => (
                      <div key={i} className="p-2 rounded-xl bg-[#090e18]/80 border border-white/5 text-center">
                        <div className="text-base sm:text-lg font-bold font-mono text-emerald-400">
                          {s.value}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Detailed Responsibilities Bullets */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  Detailed Responsibilities:
                </span>
                <ul className="space-y-2">
                  {role.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 bg-[#111624]/40 p-3 rounded-xl border border-white/5">
                      <CheckCircle2 size={15} className="text-blue-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="h-7 px-4 bg-[#0a0d16] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0">
        <span>2023 Ethnus (Intern) → 2025 VIT Chennai (B.Tech) → 2026 FuseCake (SaaS Developer)</span>
        <span className="text-blue-400 flex items-center gap-1">
          <Sparkles size={11} className="text-amber-400" />
          Production Engineering Evidence
        </span>
      </div>
    </div>
  );
};
