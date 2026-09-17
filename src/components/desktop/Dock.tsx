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

  const handleItemClick = (id: AppId) => {
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
    <div className="fixed bottom-3 left-0 right-0 flex justify-center pointer-events-none z-50">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="pointer-events-auto px-3 py-2 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl flex items-center gap-2 relative"
      >
        {dockItems.map((item) => {
          const isOpen = windows[item.id]?.isOpen && !windows[item.id]?.isMinimized;
          const isHovered = hoveredApp === item.id;
          const isBouncing = bouncingApp === item.id;

          return (
            <div key={item.id} className="relative flex flex-col items-center">
              {/* Tooltip on Hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.9 }}
                    animate={{ opacity: 1, y: -6, scale: 1 }}
                    exit={{ opacity: 0, y: 2, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -top-10 px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md text-white text-[11px] font-medium border border-white/15 shadow-xl whitespace-nowrap pointer-events-none z-50"
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* App Icon Button with spring scale & authentic launch bounce */}
              <motion.button
                whileHover={{ scale: 1.28, y: -8 }}
                whileTap={{ scale: 0.95 }}
                animate={
                  isBouncing
                    ? {
                        y: [0, -16, 0, -8, 0],
                        scale: [1, 1.1, 1, 1.05, 1],
                      }
                    : {}
                }
                transition={
                  isBouncing
                    ? { duration: 0.7, ease: 'easeOut' }
                    : { type: 'spring', damping: 14, stiffness: 350 }
                }
                onClick={() => handleItemClick(item.id)}
                onMouseEnter={() => setHoveredApp(item.id)}
                onMouseLeave={() => setHoveredApp(null)}
                aria-label={item.label}
                className={`w-11 h-11 rounded-xl ${item.bgColor} flex items-center justify-center shadow-lg border border-white/25 transition-shadow hover:shadow-cyan-500/30`}
              >
                {item.icon}
              </motion.button>

              {/* Active Indicator Dot */}
              <div className="h-1.5 flex items-center justify-center mt-1">
                {isOpen && (
                  <motion.div
                    layoutId={`dot-${item.id}`}
                    className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                  />
                )}
              </div>
            </div>
          );
        })}

        {/* Divider line before Spotlight */}
        <div className="w-[1px] h-8 bg-white/15 mx-1" />

        {/* ⌘K Spotlight Trigger in Dock */}
        <div className="relative flex flex-col items-center">
          <AnimatePresence>
            {hoveredApp === 'spotlight' && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.9 }}
                animate={{ opacity: 1, y: -6, scale: 1 }}
                exit={{ opacity: 0, y: 2, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="absolute -top-10 px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md text-white text-[11px] font-medium border border-white/15 shadow-xl whitespace-nowrap pointer-events-none z-50 flex items-center gap-1.5"
              >
                <span>Spotlight Search</span>
                <span className="text-[10px] font-mono text-slate-400">⌘K</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.28, y: -8 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSpotlight}
            onMouseEnter={() => setHoveredApp('spotlight')}
            onMouseLeave={() => setHoveredApp(null)}
            aria-label="Spotlight Search"
            className="w-11 h-11 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-600 flex items-center justify-center shadow-lg border border-white/20 hover:border-cyan-400/50 transition-colors"
          >
            <Search size={20} className="text-white" />
          </motion.button>
          <div className="h-1.5 mt-1" />
        </div>
      </motion.div>
    </div>
  );
};
