import React from 'react';
import { RESUME_DATA } from '../../../data/resumeData';
import { useOS } from '../../../context/OSContext';
import { Sparkles, FileText, FolderGit2, ExternalLink, GraduationCap, MapPin, Cpu, Award, Code2, Heart } from 'lucide-react';

// Custom LeetCode Icon
const LeetCodeIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .666-1.607 2.6 2.6 0 0 1 .388-.392l4.255-4.555a1.377 1.377 0 0 0 .047-1.892L14.444.438A1.375 1.375 0 0 0 13.483 0zm-2.88 5.57a1.37 1.37 0 0 0-.97.404L5.61 9.996a1.375 1.375 0 0 0 1.944 1.944l4.023-4.022a1.375 1.375 0 0 0-.974-2.348zM17.5 8a1.375 1.375 0 0 0-1.375 1.375v.063a1.375 1.375 0 0 0 2.75 0V9.375A1.375 1.375 0 0 0 17.5 8zm-3.5 4a1.375 1.375 0 0 0-1.375 1.375v.063a1.375 1.375 0 0 0 2.75 0v-.063A1.375 1.375 0 0 0 14 12zm8.5 0h-4a1.375 1.375 0 0 0 0 2.75h4a1.375 1.375 0 0 0 0-2.75z" />
  </svg>
);

// Custom GitHub Icon
const GitHubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

// Custom LinkedIn Icon
const LinkedInIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export const AboutWindow: React.FC = () => {
  const { openApp, startTour } = useOS();

  return (
    <div className="p-4 sm:p-6 bg-[#0a0e17] text-slate-100 font-sans flex flex-col items-center justify-start text-center space-y-4 max-h-[85vh] overflow-y-auto custom-scrollbar select-none">
      {/* Developer Monogram / Icon */}
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(59,130,246,0.5)] border border-white/25 text-2xl font-black tracking-tight text-white">
          RR
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0a0e17] flex items-center justify-center" title="Available for hire">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
        </div>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          {RESUME_DATA.personal.name}
        </h2>
        <p className="text-xs sm:text-sm text-blue-400 font-mono font-medium mt-0.5">
          Full-Stack Software Engineer · Cloud Builder
        </p>
      </div>

      {/* Real Person Layer: 4-Core Credentials Box */}
      <div className="w-full max-w-md bg-[#111624] border border-white/10 rounded-2xl p-4 text-xs text-left font-mono shadow-sm divide-y divide-white/5 space-y-2">
        <div className="flex items-center justify-between pt-0 pb-2">
          <span className="text-slate-400 flex items-center gap-2">
            <GraduationCap size={14} className="text-blue-400 shrink-0" />
            <span>Education:</span>
          </span>
          <span className="text-white font-bold">VIT Chennai · CSE · 2025</span>
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="text-slate-400 flex items-center gap-2">
            <MapPin size={14} className="text-emerald-400 shrink-0" />
            <span>Location:</span>
          </span>
          <span className="text-white font-semibold">Balasore, Odisha</span>
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="text-slate-400 flex items-center gap-2">
            <Cpu size={14} className="text-cyan-400 shrink-0" />
            <span>Specialization:</span>
          </span>
          <span className="text-cyan-300 font-bold">Full-Stack Engineering</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-slate-400 flex items-center gap-2">
            <Award size={14} className="text-amber-400 shrink-0" />
            <span>Credential:</span>
          </span>
          <span className="text-amber-300 font-bold">AWS Certified Cloud Practitioner</span>
        </div>
      </div>

      {/* 3–4 Sentences About What Rahul is Interested in Building */}
      <div className="w-full max-w-md bg-gradient-to-r from-blue-950/40 via-[#111624] to-indigo-950/40 border border-blue-500/25 rounded-2xl p-4 text-left space-y-2 shadow-sm">
        <div className="flex items-center gap-2">
          <Heart size={14} className="text-rose-400 shrink-0" />
          <span className="text-[11px] font-mono text-blue-300 font-bold uppercase tracking-wider">
            What I'm Interested in Building
          </span>
        </div>
        <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans space-y-2">
          <p>
            I'm deeply interested in architecting end-to-end full-stack systems where clean design meets rock-solid engineering reliability.
          </p>
          <p>
            I love turning complex requirements into fast, intuitive applications—whether that means crafting low-latency RESTful APIs, orchestrating stateful authentication pipelines, or fine-tuning database schemas.
          </p>
          <p>
            I'm actively seeking Full-Time Software Engineering and Full-Stack roles where I can contribute to high-scale production platforms alongside ambitious engineering teams.
          </p>
        </div>
      </div>

      {/* Algorithmic Problem Solving & DSA Highlights Box */}
      <div className="w-full max-w-md bg-[#111624] border border-amber-500/30 rounded-xl p-3 text-left space-y-1.5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 size={15} className="text-amber-400" />
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono">
              Problem Solving & DSA
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-[10px] font-mono text-amber-300 font-bold">
            100+ Solved
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          Solved <strong className="text-white font-semibold">100+ algorithmic problems</strong> across LeetCode, HackerRank, and competitive platforms with solid fluency in Arrays, Hash Maps, Dynamic Programming, and Graph traversals.
        </p>
      </div>

      {/* Professional Profiles Grid */}
      <div className="w-full max-w-md space-y-1.5 text-left">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
          Profiles & Verified Handles
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* LeetCode Profile */}
          <a
            href={RESUME_DATA.personal.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-2.5 rounded-xl bg-[#111624] hover:bg-[#161d30] border border-amber-500/30 hover:border-amber-400/60 transition-all flex flex-col justify-between shadow-sm hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#FFA116] group-hover:scale-110 transition-transform">
                <LeetCodeIcon size={18} />
              </span>
              <ExternalLink size={11} className="text-slate-400 group-hover:text-amber-300" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-amber-300">LeetCode</div>
              <div className="text-[10px] text-amber-400 font-mono">@rathirahul1000</div>
            </div>
          </a>

          {/* GitHub Profile */}
          <a
            href={RESUME_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-2.5 rounded-xl bg-[#111624] hover:bg-[#161d30] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between shadow-sm hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-white group-hover:scale-110 transition-transform">
                <GitHubIcon size={18} />
              </span>
              <ExternalLink size={11} className="text-slate-400 group-hover:text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">GitHub</div>
              <div className="text-[10px] text-slate-400 font-mono">@rahul0037a</div>
            </div>
          </a>

          {/* LinkedIn Profile */}
          <a
            href={RESUME_DATA.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-2.5 rounded-xl bg-[#111624] hover:bg-[#161d30] border border-blue-500/30 hover:border-blue-400/60 transition-all flex flex-col justify-between shadow-sm hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#0A66C2] group-hover:scale-110 transition-transform">
                <LinkedInIcon size={18} />
              </span>
              <ExternalLink size={11} className="text-slate-400 group-hover:text-blue-300" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-blue-300">LinkedIn</div>
              <div className="text-[10px] text-blue-400 font-mono">Rahul Rathi</div>
            </div>
          </a>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        <button
          onClick={startTour}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 via-blue-500/20 to-indigo-500/20 hover:from-amber-500/30 hover:to-blue-500/30 border border-amber-400/50 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm hover:scale-105 active:scale-95"
        >
          <Sparkles size={14} className="text-amber-300" />
          <span>Launch 60s Tour</span>
        </button>

        <button
          onClick={() => openApp('resume')}
          className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all border border-white/15 hover:text-white hover:scale-105 active:scale-95"
        >
          <FileText size={14} className="text-rose-400" />
          <span>Inspect Resume PDF</span>
        </button>

        <button
          onClick={() => openApp('projects')}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm hover:scale-105 active:scale-95"
        >
          <FolderGit2 size={14} />
          <span>View Projects</span>
        </button>
      </div>
    </div>
  );
};
