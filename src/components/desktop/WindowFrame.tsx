import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '../../context/OSContext';
import { AppId } from '../../types/os';
import { Maximize2, Minimize2, Minus, X } from 'lucide-react';

interface WindowFrameProps {
  id: AppId;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
  minWidth?: number;
  minHeight?: number;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  id,
  title,
  icon,
  children,
  headerRight,
}) => {
  const { windows, activeWindowId, focusApp, closeApp, minimizeApp, maximizeApp, isTourActive } = useOS();
  const windowState = windows[id];

  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  });

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!windowState || !windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  const isActive = activeWindowId === id;
  const isMax = windowState.isMaximized;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: 'spring', damping: 26, stiffness: 320 }}
      drag={!isMax && !isMobile}
      dragMomentum={false}
      dragElastic={0.05}
      onPointerDown={() => focusApp(id)}
      style={{
        zIndex: windowState.zIndex,
        ...(isMax || isMobile
          ? {
              position: 'fixed',
              top: isTourActive ? '72px' : '36px',
              left: '6px',
              right: '6px',
              bottom: '76px',
              width: 'auto',
              height: 'auto',
              maxWidth: '100vw',
              maxHeight: isTourActive ? 'calc(100vh - 152px)' : 'calc(100vh - 116px)',
            }
          : {
              position: 'absolute',
              top: isTourActive
                ? Math.max(84, windowState.defaultPosition?.y ?? 84)
                : (windowState.defaultPosition?.y ?? 84),
              left: windowState.defaultPosition?.x ?? 80,
              width: windowState.defaultSize?.width ?? 680,
              height: windowState.defaultSize?.height ?? 520,
              maxWidth: 'calc(100vw - 32px)',
              maxHeight: isTourActive ? 'calc(100vh - 180px)' : 'calc(100vh - 140px)',
            }),
      }}
      className={`rounded-xl overflow-hidden shadow-2xl flex flex-col border transition-shadow duration-200 ${
        isActive
          ? 'border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] ring-1 ring-white/10'
          : 'border-white/10 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6)] opacity-95'
      } bg-[#121620]/95 backdrop-blur-2xl`}
    >
      {/* macOS Window Header Bar */}
      <div
        className="h-10 px-3.5 bg-[#1a1f2c]/90 border-b border-white/10 flex items-center justify-between select-none cursor-move shrink-0"
        onDoubleClick={() => maximizeApp(id)}
      >
        {/* Traffic Lights */}
        <div className="flex items-center gap-2 group/lights w-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeApp(id);
            }}
            aria-label="Close window"
            className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center hover:opacity-100 transition-opacity"
          >
            <X size={8} className="text-black/80 opacity-0 group-hover/lights:opacity-100 transition-opacity" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              minimizeApp(id);
            }}
            aria-label="Minimize window"
            className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center hover:opacity-100 transition-opacity"
          >
            <Minus size={8} className="text-black/80 opacity-0 group-hover/lights:opacity-100 transition-opacity" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              maximizeApp(id);
            }}
            aria-label="Maximize window"
            className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center hover:opacity-100 transition-opacity"
          >
            {isMax ? (
              <Minimize2 size={8} className="text-black/80 opacity-0 group-hover/lights:opacity-100 transition-opacity" />
            ) : (
              <Maximize2 size={8} className="text-black/80 opacity-0 group-hover/lights:opacity-100 transition-opacity" />
            )}
          </button>
        </div>

        {/* Window Title */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-200 truncate max-w-[50%]">
          {icon && <span className="opacity-80">{icon}</span>}
          <span className="truncate">{title}</span>
        </div>

        {/* Optional Header Right Actions & Mobile Close Button */}
        <div className="flex items-center gap-1.5 justify-end min-w-16 sm:min-w-20">
          {headerRight}
          {isMobile && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeApp(id);
              }}
              aria-label="Close window"
              className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-auto bg-[#0d111a]/95 text-slate-100 relative">
        {children}
      </div>
    </motion.div>
  );
};
