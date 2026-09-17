import React from 'react';
import { useOS } from '../../context/OSContext';
import { FolderGit2, FileText, Sparkles, ExternalLink } from 'lucide-react';
import { RESUME_DATA } from '../../data/resumeData';

export const DesktopHeroWidget: React.FC = () => {
  const { openApp, startTour } = useOS();

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl bg-[#0f1422]/85 backdrop-blur-2xl border border-white/20 p-5 sm:p-7 md:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] text-center select-none space-y-3.5 sm:space-y-4 relative group">
      {/* Subtle Ambient Glow Behind Card */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600/15 via-indigo-600/10 to-cyan-600/15 blur-xl opacity-60 pointer-events-none -z-10" />

      {/* Name & Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          {RESUME_DATA.personal.name}
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-mono text-blue-400 font-semibold mt-1">
          Full-Stack Software Engineer · Cloud Builder
        </p>
      </div>

      {/* Core Mission */}
      <div className="space-y-1">
        <p className="text-xs sm:text-sm md:text-base text-slate-200 font-medium leading-relaxed">
          I build full-stack systems from idea to production.
        </p>
        <p className="text-[11px] sm:text-xs md:text-sm font-mono text-slate-400 tracking-wide">
          React · Next.js · Node.js · Express · Java · AWS
        </p>
      </div>

      {/* Prominent Direct GitHub & LinkedIn Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-0.5">
        <a
          href={RESUME_DATA.personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/20 text-slate-200 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all shadow-sm group/link"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span className="font-semibold">GitHub</span>
          <span className="text-[10px] text-slate-400">@rahul0037a</span>
          <ExternalLink size={10} className="text-slate-400 opacity-60 group-hover/link:opacity-100" />
        </a>

        <a
          href={RESUME_DATA.personal.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 rounded-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/40 text-blue-200 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all shadow-sm group/link"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
          <span className="font-semibold">LinkedIn</span>
          <span className="text-[10px] text-blue-300">Rahul Rathi</span>
          <ExternalLink size={10} className="text-blue-400 opacity-60 group-hover/link:opacity-100" />
        </a>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1">
        <button
          onClick={() => openApp('projects')}
          className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2 transition-all shadow-md hover:scale-105 active:scale-95"
        >
          <FolderGit2 size={15} />
          <span>View Projects</span>
        </button>

        <button
          onClick={() => openApp('resume')}
          className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-slate-100 text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2 transition-all hover:text-white hover:scale-105 active:scale-95"
        >
          <FileText size={15} className="text-rose-400" />
          <span>Resume (PDF)</span>
        </button>

        <button
          onClick={startTour}
          className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-blue-500/20 to-indigo-500/20 hover:from-amber-500/30 hover:to-blue-500/30 border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2 transition-all shadow-sm hover:scale-105 active:scale-95"
        >
          <Sparkles size={14} className="text-amber-300" />
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
        <span className="text-slate-500 font-mono text-[11px]">• Balasore, Odisha / Remote</span>
      </div>
    </div>
  );
};
