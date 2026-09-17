import React from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/90 bg-[#060914] py-14 px-4 sm:px-6 lg:px-8 text-sm font-sans z-10 relative">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center font-mono font-black text-slate-950 text-sm shadow-neon-cyan">
            RR
          </div>
          <div>
            <div className="text-white font-bold text-base flex items-center gap-2">
              <span>{RESUME_DATA.personal.name}</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                VIT Chennai '25
              </span>
            </div>
            <div className="text-xs text-slate-300 mt-0.5 font-mono">
              © {new Date().getFullYear()} • Built with React, TypeScript, Tailwind & Three.js
            </div>
          </div>
        </div>

        {/* Quick Links with Bright, High-Contrast Visibility */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          <a
            href={RESUME_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-cyan-300 font-semibold transition-colors px-2 py-1 rounded-lg hover:bg-slate-800/60"
          >
            GitHub
          </a>
          <span className="text-slate-600">•</span>
          <a
            href={RESUME_DATA.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-cyan-300 font-semibold transition-colors px-2 py-1 rounded-lg hover:bg-slate-800/60"
          >
            LinkedIn
          </a>
          <span className="text-slate-600">•</span>
          <a
            href={`mailto:${RESUME_DATA.personal.email}`}
            className="text-slate-300 hover:text-cyan-300 font-semibold transition-colors px-2 py-1 rounded-lg hover:bg-slate-800/60"
          >
            {RESUME_DATA.personal.email}
          </a>
          <span className="text-slate-600">•</span>
          <button
            onClick={scrollToTop}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
            title="Back to top"
          >
            <ArrowUp size={13} className="text-cyan-400" />
            <span className="font-semibold text-[11px]">Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
