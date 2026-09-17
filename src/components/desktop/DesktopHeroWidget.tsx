import React from 'react';
import { useOS } from '../../context/OSContext';
import { FolderGit2, FileText, Sparkles } from 'lucide-react';
import { RESUME_DATA } from '../../data/resumeData';

export const DesktopHeroWidget: React.FC = () => {
  const { openApp, startTour } = useOS();

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl bg-[#0f1422]/85 backdrop-blur-2xl border border-white/20 p-7 sm:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] text-center select-none space-y-5 relative group">
      {/* Subtle Ambient Glow Behind Card */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600/15 via-indigo-600/10 to-cyan-600/15 blur-xl opacity-60 pointer-events-none -z-10" />

      {/* Name & Title */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          {RESUME_DATA.personal.name}
        </h1>
        <p className="text-sm sm:text-base font-mono text-blue-400 font-semibold mt-1.5">
          Full-Stack Software Engineer
        </p>
      </div>

      {/* Core Mission */}
      <div className="space-y-1.5">
        <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
          I build full-stack systems from idea to production.
        </p>
        <p className="text-xs sm:text-sm font-mono text-slate-400 tracking-wide">
          React · Next.js · Node.js · Java · AWS
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
        <button
          onClick={() => openApp('projects')}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-md hover:scale-105 active:scale-95"
        >
          <FolderGit2 size={16} />
          <span>View Projects</span>
        </button>

        <button
          onClick={() => openApp('resume')}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-slate-100 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all hover:text-white hover:scale-105 active:scale-95"
        >
          <FileText size={16} className="text-rose-400" />
          <span>Resume (PDF)</span>
        </button>

        <button
          onClick={startTour}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-blue-500/20 to-indigo-500/20 hover:from-amber-500/30 hover:to-blue-500/30 border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-sm hover:scale-105 active:scale-95"
        >
          <Sparkles size={15} className="text-amber-300" />
          <span>60s Tour</span>
        </button>
      </div>

      {/* Availability Pill */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-slate-400">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span className="text-emerald-400 font-semibold font-mono text-xs">
          Open to Full-Time Roles
        </span>
      </div>
    </div>
  );
};
