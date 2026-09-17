import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { Search, Wifi, Battery, Sparkles, Sliders, FileText, FolderGit2 } from 'lucide-react';

export const MenuBar: React.FC = () => {
  const {
    activeWindowId,
    openApp,
    startTour,
    toggleSpotlight,
    toggleControlCenter,
  } = useOS();

  const [timeString, setTimeString] = useState<string>('');
  const [isAppleMenuOpen, setIsAppleMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getActiveAppLabel = () => {
    switch (activeWindowId) {
      case 'resume':
        return 'Preview';
      case 'projects':
        return 'Finder';
      case 'experience':
        return 'Notes';
      case 'education':
        return 'Credentials';
      case 'skills':
        return 'System Profiler';
      case 'contact':
        return 'Mail';
      case 'settings':
        return 'Settings';
      case 'about':
        return 'About';
      default:
        return 'Finder';
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-7 px-3 bg-black/45 backdrop-blur-xl border-b border-white/10 text-slate-200 text-xs font-medium select-none z-50 flex items-center justify-between">
      {/* Left Menu Items */}
      <div className="flex items-center gap-4 relative">
        {/* Apple Logo Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsAppleMenuOpen((prev) => !prev)}
            aria-label="Apple Menu"
            className="hover:text-white transition-colors flex items-center font-bold text-sm px-1.5 py-0.5 rounded hover:bg-white/10"
          >
            
          </button>

          {isAppleMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsAppleMenuOpen(false)}
              />
              <div className="absolute left-0 top-7 w-56 rounded-xl bg-[#1a1f2c]/95 backdrop-blur-2xl border border-white/15 shadow-2xl p-1.5 z-50 text-xs text-slate-200 space-y-0.5">
                <button
                  onClick={() => {
                    openApp('about');
                    setIsAppleMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                >
                  About This Developer
                </button>
                <div className="h-[1px] bg-white/10 my-1" />
                <button
                  onClick={() => {
                    openApp('resume');
                    setIsAppleMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Official Resume PDF</span>
                  <span className="text-[10px] opacity-60">156 KB</span>
                </button>
                <button
                  onClick={() => {
                    startTour();
                    setIsAppleMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-1.5 text-amber-300"
                >
                  <Sparkles size={12} />
                  <span>Recruiter Quick Tour</span>
                </button>
                <div className="h-[1px] bg-white/10 my-1" />
                <button
                  onClick={() => {
                    openApp('settings');
                    setIsAppleMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                >
                  System Settings...
                </button>
              </div>
            </>
          )}
        </div>

        {/* Current Active App Name */}
        <span className="font-bold text-white tracking-wide">{getActiveAppLabel()}</span>

        {/* Desktop Quick Nav */}
        <button
          onClick={() => openApp('projects')}
          className="hidden sm:block hover:text-white transition-colors px-1.5 py-0.5 rounded hover:bg-white/10"
        >
          Projects
        </button>
        <button
          onClick={() => openApp('resume')}
          className="hidden sm:block hover:text-white transition-colors px-1.5 py-0.5 rounded hover:bg-white/10"
        >
          Resume
        </button>
        <button
          onClick={() => openApp('contact')}
          className="hidden sm:block hover:text-white transition-colors px-1.5 py-0.5 rounded hover:bg-white/10"
        >
          Contact
        </button>

        {/* Recruiter Quick Tour Pill */}
        <button
          onClick={startTour}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 hover:bg-blue-500/30 transition-all text-[11px]"
        >
          <Sparkles size={11} className="text-amber-300" />
          <span>Recruiter Tour</span>
        </button>
      </div>

      {/* Right Menu Items */}
      <div className="flex items-center gap-3">
        {/* Spotlight Search */}
        <button
          onClick={toggleSpotlight}
          className="hover:text-white transition-colors p-1 rounded hover:bg-white/10 flex items-center gap-1 text-[11px]"
          title="Search Spotlight (⌘K)"
        >
          <Search size={13} />
          <span className="hidden md:inline text-[10px] text-slate-400 font-mono">⌘K</span>
        </button>

        {/* Control Center */}
        <button
          onClick={toggleControlCenter}
          className="hover:text-white transition-colors p-1 rounded hover:bg-white/10"
          title="Control Center"
        >
          <Sliders size={13} />
        </button>

        {/* Status indicators */}
        <Wifi size={13} className="opacity-90" />
        <div className="flex items-center gap-1">
          <Battery size={14} className="text-emerald-400" />
          <span className="text-[10px] font-mono opacity-80">100%</span>
        </div>

        {/* Date & Time */}
        <span className="text-xs font-medium text-slate-200 tracking-tight">
          {timeString}
        </span>
      </div>
    </div>
  );
};
