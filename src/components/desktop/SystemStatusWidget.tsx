import React from 'react';
import { Activity } from 'lucide-react';

export const SystemStatusWidget: React.FC = () => {
  return (
    <div className="w-full max-w-xs rounded-2xl bg-[#0e1320]/75 backdrop-blur-xl border border-white/10 p-3 shadow-xl text-slate-200 select-none space-y-2 font-sans text-xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
          <Activity size={11} className="text-emerald-400" />
          SYSTEM STATUS
        </span>
        <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Online
        </span>
      </div>

      {/* Metrics rows */}
      <div className="space-y-1 font-mono text-[11px]">
        <div className="flex justify-between text-slate-300">
          <span className="text-slate-400">Portfolio</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Online
          </span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span className="text-slate-400">Projects</span>
          <span className="text-blue-400 font-bold">3 Featured</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span className="text-slate-400">Experience</span>
          <span className="text-white">FuseCake · Ethnus</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span className="text-slate-400">AWS</span>
          <span className="text-amber-400 font-semibold text-[10px]">Certified Cloud Practitioner</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span className="text-slate-400">Updated</span>
          <span className="text-slate-400">Sep 2026</span>
        </div>
      </div>

      {/* Stack Section */}
      <div className="pt-1.5 border-t border-white/10 space-y-1">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
          CORE STACK
        </span>
        <div className="space-y-0.5 font-mono text-[10.5px]">
          <div className="flex justify-between">
            <span className="text-slate-400">Frontend</span>
            <span className="text-slate-200">React • Next.js 14 • TS</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Backend</span>
            <span className="text-slate-200">Node • Express • Flask</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Database</span>
            <span className="text-slate-200">MongoDB • Mongoose</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Cloud</span>
            <span className="text-slate-200">AWS (EC2, S3, IAM)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
