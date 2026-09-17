import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '../../context/OSContext';
import { WallpaperId } from '../../types/os';
import { Wifi, Bluetooth, Moon, Sun, Download, Sparkles, Sliders, Palette } from 'lucide-react';

export const ControlCenter: React.FC = () => {
  const { isControlCenterOpen, closeControlCenter, wallpaper, setWallpaper, startTour, openApp } = useOS();

  if (!isControlCenterOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Click outside backdrop */}
        <div
          onClick={closeControlCenter}
          className="fixed inset-0 pointer-events-auto bg-transparent"
        />

        {/* Floating Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -5 }}
          transition={{ type: 'spring', damping: 24, stiffness: 350 }}
          className="pointer-events-auto absolute top-9 right-4 w-72 rounded-2xl bg-[#1a1f2c]/95 backdrop-blur-2xl border border-white/20 shadow-2xl p-3.5 space-y-3 text-slate-200 z-50"
        >
          {/* Top Toggles */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <Wifi size={14} />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Wi-Fi</div>
                <div className="text-[10px] text-blue-200">Connected</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <Bluetooth size={14} />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Bluetooth</div>
                <div className="text-[10px] text-blue-200">On</div>
              </div>
            </div>
          </div>

          {/* Quick Recruiter Tour CTA */}
          <button
            onClick={() => {
              startTour();
              closeControlCenter();
            }}
            className="w-full p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm hover:brightness-110 transition-all"
          >
            <Sparkles size={14} className="text-amber-300" />
            <span>Recruiter Quick Tour</span>
          </button>

          {/* Wallpaper selector in Control Center */}
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-300 flex items-center gap-1.5">
                <Palette size={13} className="text-blue-400" />
                Wallpaper
              </span>
              <button
                onClick={() => {
                  openApp('settings');
                  closeControlCenter();
                }}
                className="text-[10px] text-blue-400 hover:underline"
              >
                More...
              </button>
            </div>
            <div className="grid grid-cols-5 gap-1">
              {(['cloud', 'sequoia', 'sonoma', 'obsidian', 'aurora'] as WallpaperId[]).map((w) => (
                <button
                  key={w}
                  onClick={() => setWallpaper(w)}
                  className={`h-7 rounded-lg border text-[9px] font-mono capitalize transition-all ${
                    wallpaper === w
                      ? 'border-cyan-400 ring-1 ring-cyan-400 bg-cyan-500/20 text-white font-bold'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {w === 'cloud' ? 'Mesh' : w.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Direct PDF Download */}
          <a
            href="/Rahul_Rathi_Resume_v4.pdf"
            download="Rahul_Rathi_Resume_v4.pdf"
            className="w-full p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 flex items-center justify-center gap-2 transition-colors"
          >
            <Download size={13} className="text-emerald-400" />
            <span>Download Official Resume PDF</span>
          </a>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
