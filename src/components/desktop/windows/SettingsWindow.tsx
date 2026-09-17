import React from 'react';
import { useOS } from '../../../context/OSContext';
import { WallpaperId } from '../../../types/os';
import { Palette, Monitor, Check, Sparkles, MousePointer } from 'lucide-react';

export const SettingsWindow: React.FC = () => {
  const { wallpaper, setWallpaper } = useOS();

  const wallpapers: {
    id: WallpaperId;
    name: string;
    subtitle: string;
    gradient: string;
    tag?: string;
  }[] = [
    {
      id: 'cloud',
      name: 'Cloud Mesh',
      subtitle: 'Dynamic AWS topology + cursor spotlight',
      gradient: 'from-[#050811] via-[#091530] to-[#04060d]',
      tag: 'Mouse Tracking',
    },
    {
      id: 'sequoia',
      name: 'Sequoia Twilight',
      subtitle: 'macOS sunset dusk horizon',
      gradient: 'from-blue-900 via-indigo-950 to-rose-950',
    },
    {
      id: 'sonoma',
      name: 'Sonoma Glow',
      subtitle: 'Organic violet & indigo aurora',
      gradient: 'from-purple-950 via-slate-950 to-blue-950',
    },
    {
      id: 'obsidian',
      name: 'Studio Obsidian',
      subtitle: 'Minimalist dark engineering matrix',
      gradient: 'from-neutral-900 via-zinc-950 to-black',
    },
    {
      id: 'aurora',
      name: 'Aurora Emerald',
      subtitle: 'Celestial teal & green waves',
      gradient: 'from-emerald-950 via-slate-950 to-teal-950',
    },
  ];

  return (
    <div className="p-6 bg-[#0a0e17] text-slate-100 font-sans h-full space-y-6 overflow-auto">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Palette size={16} className="text-blue-400" />
          <h3 className="text-sm font-bold text-white">Desktop Wallpaper</h3>
        </div>
        <p className="text-xs text-slate-400">
          Select a background aesthetic for your workstation session.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {wallpapers.map((w) => {
            const isSelected = wallpaper === w.id;
            return (
              <button
                key={w.id}
                onClick={() => setWallpaper(w.id)}
                className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'border-blue-500 ring-2 ring-blue-500/30 bg-blue-500/10'
                    : 'border-white/10 hover:border-white/20 bg-white/5'
                }`}
              >
                {/* Visual Thumbnail */}
                <div
                  className={`h-20 w-full rounded-xl bg-gradient-to-br ${w.gradient} mb-2.5 border border-white/10 flex flex-col justify-between p-2 relative overflow-hidden`}
                >
                  {w.tag && (
                    <span className="self-start px-2 py-0.5 rounded-full bg-cyan-500/25 border border-cyan-400/40 text-[9px] font-mono text-cyan-200 font-bold flex items-center gap-1 shadow-sm">
                      <MousePointer size={10} className="animate-bounce" />
                      {w.tag}
                    </span>
                  )}

                  {isSelected && (
                    <div className="self-end w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md ml-auto">
                      <Check size={12} />
                    </div>
                  )}
                </div>

                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{w.name}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 truncate">{w.subtitle}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <Monitor size={16} className="text-emerald-400" />
          <h3 className="text-sm font-bold text-white">Display & Interactivity</h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          The <strong className="text-cyan-300">Cloud Mesh</strong> wallpaper features an active
          mouse-tracking spotlight and ambient node illumination that follows your cursor in real
          time.
        </p>
      </div>
    </div>
  );
};
