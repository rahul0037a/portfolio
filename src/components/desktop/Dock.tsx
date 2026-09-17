import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '../../context/OSContext';
import { AppId } from '../../types/os';
import {
  FolderGit2,
  FileText,
  Briefcase,
  GraduationCap,
  Terminal,
  Mail,
  Settings,
  Info,
  Search,
} from 'lucide-react';

interface DockItem {
  id: AppId;
  label: string;
  icon: React.ReactNode;
  bgColor: string;
}

export const Dock: React.FC = () => {
  const { windows, activeWindowId, openApp, focusApp, toggleSpotlight } = useOS();
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const [bouncingApp, setBouncingApp] = useState<AppId | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; label: string; shortcut?: string } | null>(null);

  const dockItems: DockItem[] = [
    {
      id: 'projects',
      label: 'Projects',
      bgColor: 'bg-gradient-to-tr from-blue-600 to-cyan-500',
      icon: <FolderGit2 size={22} className="text-white" />,
    },
    {
      id: 'resume',
      label: 'Resume (PDF)',
      bgColor: 'bg-gradient-to-tr from-rose-600 to-orange-500',
      icon: <FileText size={22} className="text-white" />,
    },
    {
      id: 'experience',
      label: 'Experience',
      bgColor: 'bg-gradient-to-tr from-indigo-600 to-purple-500',
      icon: <Briefcase size={22} className="text-white" />,
    },
    {
      id: 'education',
      label: 'Education & AWS',
      bgColor: 'bg-gradient-to-tr from-amber-600 to-yellow-500',
      icon: <GraduationCap size={22} className="text-white" />,
    },
    {
      id: 'skills',
      label: 'Tech Stack',
      bgColor: 'bg-gradient-to-tr from-emerald-600 to-teal-500',
      icon: <Terminal size={22} className="text-white" />,
    },
    {
      id: 'contact',
      label: 'Contact Mail',
      bgColor: 'bg-gradient-to-tr from-sky-600 to-blue-500',
      icon: <Mail size={22} className="text-white" />,
    },
    {
      id: 'settings',
      label: 'Settings',
      bgColor: 'bg-gradient-to-tr from-slate-700 to-slate-500',
      icon: <Settings size={22} className="text-white" />,
    },
    {
      id: 'about',
      label: 'About Developer',
      bgColor: 'bg-gradient-to-tr from-blue-700 to-indigo-600',
      icon: <Info size={22} className="text-white" />,
    },
  ];

  const handleItemHover = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
    label: string,
    shortcut?: string
  ) => {
    setHoveredApp(id);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      x: rect.left + rect.width / 2,
      label,
      shortcut,
    });
  };

  const handleItemLeave = () => {
    setHoveredApp(null);
    setTooltip(null);
  };

  const handleItemClick = (id: AppId) => {
    setTooltip(null);
    // Trigger macOS launch bounce animation
    setBouncingApp(id);
    setTimeout(() => setBouncingApp(null), 850);

    const win = windows[id];
    if (win && win.isOpen && !win.isMinimized) {
      if (activeWindowId === id) {
        // Active
      } else {
        focusApp(id);
      }
    } else {
      openApp(id);
    }
  };

  return (
    <div className="fixed bottom-2 sm:bottom-3 left-0 right-0 flex justify-center pointer-events-none z-50 px-2">
      {/* Floating macOS Tooltip (Guaranteed Unclipped & Centered) */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 3, scale: 0.92 }}
            transition={{ type: 'spring', damping: 24, stiffness: 450 }}
            style={{ left: `${tooltip.x}px` }}
            className="fixed bottom-[56px] sm:bottom-[76px] -translate-x-1/2 z-[70] pointer-events-none px-2.5 py-1 rounded-lg bg-[#0c101c]/95 backdrop-blur-xl text-white text-[11px] sm:text-xs font-semibold border border-white/20 shadow-[0_8px_25px_rgba(0,0,0,0.85)] whitespace-nowrap flex items-center gap-1.5"
          >
            <span>{tooltip.label}</span>
            {tooltip.shortcut && (
              <span className="text-[10px] font-mono text-slate-400 bg-white/10 px-1 py-0.5 rounded">
                {tooltip.shortcut}
              </span>
            )}
            {/* Downward pointer triangle */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#0c101c] border-r border-b border-white/20" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="pointer-events-auto px-2 sm:px-3 py-1 sm:py-2 rounded-2xl bg-[#101424]/85 sm:bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-1 sm:gap-2 relative max-w-[92vw] sm:max-w-none overflow-x-auto sm:overflow-visible touch-pan-x scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden overscroll-x-contain"
      >
        {dockItems.map((item) => {
          const isOpen = windows[item.id]?.isOpen && !windows[item.id]?.isMinimized;
          const isBouncing = bouncingApp === item.id;

          return (
            <div key={item.id} className="relative flex flex-col items-center shrink-0">
              {/* App Icon Button: Compact on mobile, standard on desktop */}
              <motion.button
                whileHover={{ scale: 1.2, y: -4 }}
                whileTap={{ scale: 0.9 }}
                animate={
                  isBouncing
                    ? {
                        y: [0, -10, 0, -5, 0],
                        scale: [1, 1.08, 1, 1.04, 1],
                      }
                    : {}
                }
                transition={
                  isBouncing
                    ? { duration: 0.6, ease: 'easeOut' }
                    : { type: 'spring', damping: 14, stiffness: 350 }
                }
                onClick={() => handleItemClick(item.id)}
                onMouseEnter={(e) => handleItemHover(e, item.id, item.label)}
                onMouseMove={(e) => handleItemHover(e, item.id, item.label)}
                onMouseLeave={handleItemLeave}
                aria-label={item.label}
                className={`w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl ${item.bgColor} flex items-center justify-center shadow-md sm:shadow-lg border border-white/25 transition-shadow hover:shadow-cyan-500/30 [&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-5 sm:[&>svg]:h-5`}
              >
                {item.icon}
              </motion.button>

              {/* Active Indicator Dot */}
              <div className="h-1 sm:h-1.5 flex items-center justify-center mt-0.5 sm:mt-1">
                {isOpen && (
                  <motion.div
                    layoutId={`dot-${item.id}`}
                    className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                  />
                )}
              </div>
            </div>
          );
        })}

        {/* Divider line before Spotlight */}
        <div className="w-[1px] h-5 sm:h-8 bg-white/15 mx-0.5 sm:mx-1 shrink-0" />

        {/* ⌘K Spotlight Trigger in Dock */}
        <div className="relative flex flex-col items-center shrink-0">
          <motion.button
            whileHover={{ scale: 1.2, y: -4 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              handleItemLeave();
              toggleSpotlight();
            }}
            onMouseEnter={(e) => handleItemHover(e, 'spotlight', 'Spotlight Search', '⌘K')}
            onMouseMove={(e) => handleItemHover(e, 'spotlight', 'Spotlight Search', '⌘K')}
            onMouseLeave={handleItemLeave}
            aria-label="Spotlight Search"
            className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-tr from-slate-800 to-slate-600 flex items-center justify-center shadow-md sm:shadow-lg border border-white/20 hover:border-cyan-400/50 transition-colors [&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-5 sm:[&>svg]:h-5"
          >
            <Search size={16} className="text-white" />
          </motion.button>
          <div className="h-1 sm:h-1.5 mt-0.5 sm:mt-1" />
        </div>
      </motion.div>
    </div>
  );
};
