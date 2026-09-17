import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { Search, Wifi, Battery, Sparkles, Sliders } from 'lucide-react';

export const MenuBar: React.FC = () => {
  const {
    activeWindowId,
    openApp,
    startTour,
    toggleSpotlight,
    toggleControlCenter,
  } = useOS();

  const [timeString, setTimeString] = useState<string>('');
  const [shortTime, setShortTime] = useState<string>('');
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
      setShortTime(
        now.toLocaleTimeString('en-US', {
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
      <div className="flex items-center gap-3 sm:gap-4 relative">
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
                  <span>Recruiter 60s Tour</span>
                </button>
                <div className="h-[1px] bg-white/10 my-1" />
                <a
                  href="https://github.com/rahul0037a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>GitHub Repository</span>
                  <span className="text-[10px] opacity-60">@rahul0037a</span>
                </a>
                <a
                  href="https://linkedin.com/in/rahul-rathi-85ab42206"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between text-blue-300"
                >
                  <span>LinkedIn Profile</span>
                  <span className="text-[10px] opacity-60">Connect</span>
                </a>
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
        <span className="font-bold text-white tracking-wide truncate max-w-[85px] sm:max-w-none">{getActiveAppLabel()}</span>

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
          <span>60s Tour</span>
        </button>
      </div>

      {/* Right Menu Items with Prominent GitHub + LinkedIn */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Prominent GitHub Button */}
        <a
          href="https://github.com/rahul0037a"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors border border-white/15 text-[11px]"
          title="GitHub: rahul0037a"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span className="hidden xs:inline font-mono">GitHub</span>
        </a>

        {/* Prominent LinkedIn Button */}
        <a
          href="https://linkedin.com/in/rahul-rathi-85ab42206"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-500/10 hover:bg-blue-500/25 text-blue-300 hover:text-white transition-colors border border-blue-400/40 text-[11px]"
          title="LinkedIn: Rahul Rathi"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
          <span className="hidden xs:inline font-mono">LinkedIn</span>
        </a>

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
        <Wifi size={13} className="opacity-90 hidden xs:block" />
        <div className="flex items-center gap-1">
          <Battery size={14} className="text-emerald-400" />
          <span className="hidden sm:inline text-[10px] font-mono opacity-80">100%</span>
        </div>

        {/* Date & Time */}
        <span className="text-xs font-medium text-slate-200 tracking-tight whitespace-nowrap">
          <span className="hidden sm:inline">{timeString}</span>
          <span className="sm:hidden">{shortTime}</span>
        </span>
      </div>
    </div>
  );
};
