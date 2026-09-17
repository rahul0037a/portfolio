import React, { useState } from 'react';
import { Download, ExternalLink, FileText, CheckCircle2, Award, ZoomIn, ZoomOut } from 'lucide-react';

export const ResumeWindow: React.FC = () => {
  const [zoom, setZoom] = useState(100);

  return (
    <div className="flex flex-col h-full bg-[#0a0d14]">
      {/* Top PDF Action Toolbar */}
      <div className="px-3 sm:px-4 py-2 bg-[#121722] border-b border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
        <div className="flex items-center gap-2 text-slate-300 truncate max-w-[170px] sm:max-w-none">
          <FileText size={15} className="text-red-400 shrink-0" />
          <span className="font-medium text-white truncate text-[11px] sm:text-xs">Rahul_Rathi_Resume_v4.pdf</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Zoom controls */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 px-2 py-1 rounded border border-white/10 text-slate-300">
            <button
              onClick={() => setZoom((z) => Math.max(70, z - 10))}
              className="hover:text-white transition-colors"
              title="Zoom out"
            >
              <ZoomOut size={13} />
            </button>
            <span className="text-[11px] font-mono w-8 text-center">{zoom}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(140, z + 10))}
              className="hover:text-white transition-colors"
              title="Zoom in"
            >
              <ZoomIn size={13} />
            </button>
          </div>

          <a
            href="/Rahul_Rathi_Resume_v4.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium transition-colors flex items-center gap-1 border border-white/10"
          >
            <ExternalLink size={12} />
            <span className="hidden sm:inline">Open in Tab</span>
            <span className="sm:hidden">Open</span>
          </a>

          <a
            href="/Rahul_Rathi_Resume_v4.pdf"
            download="Rahul_Rathi_Resume_v4.pdf"
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors flex items-center gap-1 shadow-sm"
          >
            <Download size={12} />
            <span>Download</span>
          </a>
        </div>
      </div>

      {/* Embedded PDF Viewer */}
      <div className="flex-1 w-full bg-[#1b1f2b] overflow-auto flex items-center justify-center p-2 sm:p-4">
        <div
          style={{ width: `${zoom}%`, minWidth: '280px', maxWidth: '1000px' }}
          className="h-full w-full bg-white rounded-lg shadow-xl overflow-hidden flex flex-col"
        >
          <iframe
            src="/Rahul_Rathi_Resume_v4.pdf#toolbar=0"
            title="Rahul Rathi Resume"
            className="w-full h-full min-h-[400px] border-none"
          />
        </div>
      </div>

      {/* Window Status Bar */}
      <div className="h-7 px-3 sm:px-4 bg-[#0d121c] border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400 shrink-0">
        <div className="flex items-center gap-1.5 truncate">
          <span>156 KB • PDF</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline text-amber-400">AWS Certified</span>
        </div>
        <span className="text-emerald-400 flex items-center gap-1 whitespace-nowrap">
          <CheckCircle2 size={11} />
          <span>Available for Roles</span>
        </span>
      </div>
    </div>
  );
};
