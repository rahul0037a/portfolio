import React from 'react';
import { X, Download, ExternalLink, FileText } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const pdfUrl = '/Rahul_Rathi_Resume_v4.pdf';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-5xl h-[92vh] bg-[#050814] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header Controls */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#090e1f] border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <FileText size={16} />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white uppercase">
                Rahul_Rathi_Resume_v4.pdf
              </div>
              <div className="text-[10px] text-slate-400 font-mono hidden sm:block">
                Original Verified Document
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Download Original PDF Button */}
            <a
              href={pdfUrl}
              download="Rahul_Rathi_Resume.pdf"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 text-xs font-bold shadow-neon-cyan flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </a>

            {/* Open in New Window */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Open PDF in new tab"
            >
              <ExternalLink size={16} />
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Embedded Real PDF Viewer */}
        <div className="flex-1 w-full h-full bg-[#03050a] relative overflow-hidden">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0`}
            title="Rahul Rathi Original Resume PDF"
            className="w-full h-full border-none"
          />

          {/* Fallback download prompt if iframe rendering is disabled */}
          <noscript>
            <div className="flex flex-col items-center justify-center h-full p-6 text-center text-slate-300">
              <p className="text-sm mb-4">PDF viewer preview not available in this environment.</p>
              <a
                href={pdfUrl}
                download="Rahul_Rathi_Resume.pdf"
                className="px-6 py-3 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs"
              >
                Download Original PDF Directly
              </a>
            </div>
          </noscript>
        </div>
      </div>
    </div>
  );
};
