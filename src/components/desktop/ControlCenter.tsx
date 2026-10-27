import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Download, Sparkles, Palette, Check, X, ArrowUpRight, Settings } from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { WallpaperId } from '../../types/os';

const WALLPAPERS: { id: WallpaperId; name: string; background: string }[] = [
  { id: 'cloud', name: 'Cloud Mesh', background: 'linear-gradient(140deg,#152d45,#0b1420 65%,#30526a)' },
  { id: 'sequoia', name: 'Sequoia Twilight', background: 'linear-gradient(150deg,#3b527b,#a66c67 55%,#272c4d)' },
  { id: 'sonoma', name: 'Sonoma Glow', background: 'linear-gradient(130deg,#635281,#242840 70%,#506f9c)' },
  { id: 'obsidian', name: 'Studio Obsidian', background: 'linear-gradient(135deg,#434c5b,#10151f 70%,#242e3d)' },
  { id: 'aurora', name: 'Aurora Emerald', background: 'linear-gradient(140deg,#476a60,#102d31 60%,#48738a)' },
];

export const ControlCenter: React.FC = () => {
  const { isControlCenterOpen, closeControlCenter, wallpaper, setWallpaper, startTour, openApp } = useOS();
  const panelRef = useRef<HTMLDivElement>(null);
  const shouldRestoreFocus = useRef(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isControlCenterOpen) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    shouldRestoreFocus.current = true;
    panelRef.current?.focus();
    return () => { if (shouldRestoreFocus.current && previous?.isConnected) previous.focus(); };
  }, [isControlCenterOpen]);

  const launch = (action: () => void) => {
    shouldRestoreFocus.current = false;
    action();
    closeControlCenter();
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); closeControlCenter(); }
    if (event.key !== 'Tab') return;
    const buttons = panelRef.current?.querySelectorAll<HTMLElement>('button, a[href]');
    if (!buttons?.length) return;
    const first = buttons[0]; const last = buttons[buttons.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && (document.activeElement === last || document.activeElement === panelRef.current)) { event.preventDefault(); first.focus(); }
  };

  return (
    <AnimatePresence>
      {isControlCenterOpen && (
        <div className="os-control-layer" onPointerDown={event => { if (event.target === event.currentTarget) closeControlCenter(); }}>
          <motion.div ref={panelRef} className="os-control-panel" role="dialog" aria-modal="true" aria-label="Control Center" tabIndex={-1} onKeyDown={handleKeyDown} initial={reducedMotion ? false : { opacity: 0, y: -5, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 32 }}>
            <div className="os-control-heading"><h2>Control Center</h2><button onClick={closeControlCenter} aria-label="Close Control Center"><X size={15} /></button></div>
            <div className="os-control-section-heading"><span><Palette size={14} />Wallpaper</span><button onClick={() => launch(() => openApp('settings'))}>More...</button></div>
            <div className="os-control-wallpapers" aria-label="Wallpaper selection">
              {WALLPAPERS.map(item => <button key={item.id} type="button" className="os-control-wallpaper" style={{ background: item.background }} onClick={() => setWallpaper(item.id)} aria-label={`Set ${item.name} wallpaper`} aria-pressed={wallpaper === item.id} title={item.name}>{wallpaper === item.id && <Check size={13} strokeWidth={2.5} />}</button>)}
            </div>
            <p className="os-control-wallpaper-name">{WALLPAPERS.find(item => item.id === wallpaper)?.name}</p>
            <button className="os-control-action is-primary" onClick={() => launch(startTour)}><Sparkles size={15} /><span>Recruiter Quick Tour</span><ArrowUpRight size={14} /></button>
            <a className="os-control-action" href="/Rahul_Rathi_Resume_v4.pdf" download="Rahul_Rathi_Resume_v4.pdf"><Download size={15} /><span>Download Official Resume PDF</span></a>
            <button className="os-control-action" onClick={() => launch(() => openApp('settings'))}><Settings size={15} /><span>System Settings...</span><ArrowUpRight size={14} /></button>
            <p className="os-control-note">Make this workspace your own.</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
