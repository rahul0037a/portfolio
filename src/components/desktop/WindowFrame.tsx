import React, { useEffect, useRef, useState } from 'react';
import { motion, useDragControls, useMotionValue, useReducedMotion } from 'framer-motion';
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

export const WindowFrame: React.FC<WindowFrameProps> = ({ id, title, icon, children, headerRight }) => {
  const {
    windows, activeWindowId, focusApp, closeApp, minimizeApp, maximizeApp,
    updateWindowPosition, isTourActive, isTourAutoPlaying, pauseTourAutoPlay,
    isSpotlightOpen, isControlCenterOpen,
  } = useOS();
  const windowState = windows[id];
  const reduceMotion = useReducedMotion();
  const dragControls = useDragControls();
  const frameRef = useRef<HTMLDivElement>(null);
  const wasVisible = useRef(false);
  const openerRef = useRef<HTMLElement | null>(null);
  const handledFocusRequest = useRef(-1);
  const [viewport, setViewport] = useState(() => ({ width: window.innerWidth, height: window.innerHeight }));
  const isMobile = viewport.width < 768;
  const isVisible = windowState.isOpen && !windowState.isMinimized;
  const isActive = activeWindowId === id;
  const isExpanded = windowState.isMaximized || isMobile;
  const topInset = isTourActive ? 112 : 56;
  const bottomInset = 84;
  const margin = isMobile ? 8 : 16;
  const width = isExpanded ? viewport.width - margin * 2 : Math.min(windowState.defaultSize?.width ?? 680, viewport.width - margin * 2);
  const height = isExpanded ? viewport.height - topInset - bottomInset : Math.min(windowState.defaultSize?.height ?? 520, viewport.height - topInset - bottomInset);
  const maxX = Math.max(margin, viewport.width - width - margin);
  const maxY = Math.max(topInset, viewport.height - height - bottomInset);
  const storedPosition = windowState.position ?? windowState.defaultPosition ?? { x: 80, y: 84 };
  const clampX = (value: number) => Math.min(maxX, Math.max(margin, value));
  const clampY = (value: number) => Math.min(maxY, Math.max(topInset, value));
  const x = useMotionValue(clampX(storedPosition.x));
  const y = useMotionValue(clampY(storedPosition.y));

  useEffect(() => {
    const resize = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    x.set(isExpanded ? margin : clampX(storedPosition.x));
    y.set(isExpanded ? topInset : clampY(storedPosition.y));
  }, [storedPosition.x, storedPosition.y, isExpanded, topInset, width, height, viewport.width, viewport.height, margin, x, y]);

  useEffect(() => {
    if (isVisible) {
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    } else if (wasVisible.current && !activeWindowId && !isSpotlightOpen && !isControlCenterOpen) {
      const opener = openerRef.current;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
      else document.getElementById('workspace')?.focus({ preventScroll: true });
    }
    wasVisible.current = isVisible;
  }, [isVisible]);

  // Only explicit app activation requests move focus. Pointer focus and overlay dismissal
  // preserve the visitor's current input, while Spotlight can activate an already-open app.
  useEffect(() => {
    const request = windowState.focusRequest ?? 0;
    if (!isVisible || !isActive || isSpotlightOpen || isControlCenterOpen || handledFocusRequest.current === request) return;
    const frame = requestAnimationFrame(() => {
      frameRef.current?.focus({ preventScroll: true });
      handledFocusRequest.current = request;
    });
    return () => cancelAnimationFrame(frame);
  }, [isVisible, isActive, isSpotlightOpen, isControlCenterOpen, windowState.focusRequest]);

  useEffect(() => {
    if (isVisible && isActive && document.activeElement === document.body) {
      frameRef.current?.focus({ preventScroll: true });
    }
  }, [isVisible, isActive]);

  if (!windowState.isOpen) return null;

  const pauseForInteraction = () => {
    focusApp(id);
    if (isTourActive && isTourAutoPlaying) pauseTourAutoPlay();
  };

  return (
    <motion.div
      ref={frameRef}
      role="dialog"
      aria-labelledby={`window-title-${id}`}
      aria-modal="false"
      aria-hidden={windowState.isMinimized || undefined}
      inert={windowState.isMinimized}
      hidden={windowState.isMinimized}
      tabIndex={-1}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.975 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 28, stiffness: 380 }}
      drag={!isExpanded}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{ left: margin, top: topInset, right: maxX, bottom: maxY }}
      onDragEnd={() => updateWindowPosition(id, { x: clampX(x.get()), y: clampY(y.get()) })}
      onPointerDown={pauseForInteraction}
      onWheel={() => { if (isTourActive && isTourAutoPlaying) pauseTourAutoPlay(); }}
      onFocus={() => focusApp(id)}
      onKeyDown={(event) => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'w') {
          event.preventDefault();
          event.stopPropagation();
          closeApp(id);
          return;
        }
        const target = event.target as HTMLElement;
        const isContentInteraction = target !== event.currentTarget && Boolean(target.closest('.os-window-content'));
        if (isTourActive && isTourAutoPlaying && (event.key === 'Tab' || isContentInteraction)) pauseTourAutoPlay();
      }}
      style={{
        position: 'fixed', top: 0, left: 0, x, y,
        display: windowState.isMinimized ? 'none' : undefined,
        width, height: Math.max(120, height),
        zIndex: windowState.zIndex,
      }}
      className={`os-window flex flex-col overflow-hidden rounded-2xl border bg-[#10151e] outline-none ${
        isActive
          ? 'border-white/20 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.75)] ring-1 ring-white/5'
          : 'border-white/10 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.5)]'
      }`}
      data-active={isActive}
    >
      <div
        className={`os-window-header h-12 shrink-0 border-b border-white/[0.07] bg-[#1a202b] px-3 flex items-center gap-3 select-none ${isExpanded ? '' : 'cursor-grab active:cursor-grabbing'}`}
        onPointerDown={(event) => {
          if (event.button !== 0 || (event.target as HTMLElement).closest('button,a,input')) return;
          if (!isExpanded) dragControls.start(event);
        }}
        onDoubleClick={(event) => {
          if (!(event.target as HTMLElement).closest('button,a,input') && !isMobile) maximizeApp(id);
        }}
        style={{ touchAction: 'none' }}
      >
        <div className="flex items-center gap-0.5 shrink-0 group/lights" aria-label="Window controls">
          {[
            { label: 'Close window', action: closeApp, color: 'bg-[#ee6c65]', Icon: X },
            { label: 'Minimize window', action: minimizeApp, color: 'bg-[#e5b858]', Icon: Minus },
            { label: windowState.isMaximized ? 'Restore window' : 'Maximize window', action: maximizeApp, color: 'bg-[#63be78]', Icon: windowState.isMaximized ? Minimize2 : Maximize2 },
          ].map(({ label, action, color, Icon }) => (
            <button
              key={label}
              type="button"
              onClick={(event) => { event.stopPropagation(); action(id); }}
              aria-label={label}
              title={label}
              className="w-7 h-8 flex items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-300 focus-visible:outline-offset-[-2px]"
            >
              <span className={`w-3 h-3 rounded-full ${color} flex items-center justify-center shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]`}>
                <Icon size={8} strokeWidth={2.5} className="text-[#252b33] opacity-0 group-hover/lights:opacity-100 group-focus-within/lights:opacity-100" />
              </span>
            </button>
          ))}
        </div>
        <div className="flex-1 min-w-0 flex items-center justify-center gap-2 text-xs font-medium text-slate-300">
          {icon && <span className="shrink-0 opacity-70">{icon}</span>}
          <span id={`window-title-${id}`} className="truncate">{title.replace(/[\u2013\u2014]/g, '-')}</span>
        </div>
        <div className="flex shrink-0 items-center justify-end gap-1 min-w-7 sm:min-w-20">
          {headerRight}
          {isMobile && (
            <button type="button" onClick={() => closeApp(id)} aria-label="Close window" className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 hover:bg-white/10">
              <X size={16} />
            </button>
          )}
        </div>
      </div>
      <div className="os-window-content flex-1 min-h-0 overflow-auto bg-[#0d121b] text-slate-100 relative">
        {children}
      </div>
    </motion.div>
  );
};
