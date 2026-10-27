import React, { useEffect, useRef, useState } from 'react';
import { Command, Search, SlidersHorizontal, Sparkles, ChevronDown, ArrowUpRight, Monitor } from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { RESUME_DATA } from '../../data/resumeData';
import { AppId } from '../../types/os';
import './shell.css';

const APP_LABELS: Record<AppId, string> = {
  about: 'About', resume: 'Preview', projects: 'Finder', experience: 'Notes',
  education: 'Credentials', skills: 'System Profiler', contact: 'Mail', settings: 'Settings',
};

export const MenuBar: React.FC = () => {
  const { activeWindowId, openApp, startTour, toggleSpotlight, toggleControlCenter, isControlCenterOpen } = useOS();
  const [now, setNow] = useState(() => new Date());
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  const launch = (id: AppId) => { openApp(id); setMenuOpen(false); };
  const shortTime = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const date = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <header className="os-menubar">
      <div className="os-menubar-left">
        <div ref={menuRef} className="os-system-menu">
          <button type="button" className="os-brand" onClick={() => setMenuOpen(!isMenuOpen)} aria-expanded={isMenuOpen} aria-controls="os-system-menu" aria-label="RathiOS menu">
            <Command size={17} strokeWidth={1.7} aria-hidden="true" />
            <span>Rathi<span className="os-brand-suffix">OS</span></span>
            <ChevronDown size={11} className="os-brand-chevron" aria-hidden="true" />
          </button>
          {isMenuOpen && (
            <div id="os-system-menu" className="os-menu-panel" aria-label="System shortcuts">
              <div className="os-menu-heading">Rahul's workspace</div>
              <button onClick={() => launch('about')}><Monitor size={15} />About This Developer</button>
              <button onClick={() => launch('resume')}>Official Resume PDF<ArrowUpRight size={13} /></button>
              <button onClick={() => { startTour(); setMenuOpen(false); }}><Sparkles size={15} />Recruiter 60s Tour</button>
              <div className="os-menu-separator" />
              <a href={RESUME_DATA.personal.github} target="_blank" rel="noopener noreferrer">GitHub Repository<ArrowUpRight size={13} /></a>
              <a href={RESUME_DATA.personal.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn Profile<ArrowUpRight size={13} /></a>
              <div className="os-menu-separator" />
              <button onClick={() => launch('settings')}>System Settings...</button>
            </div>
          )}
        </div>
        <span className="os-menu-active">{activeWindowId ? APP_LABELS[activeWindowId] : 'Desktop'}</span>
        <nav className="os-menu-nav" aria-label="Quick navigation">
          <button onClick={() => openApp('projects')}>Projects</button>
          <button onClick={() => openApp('resume')}>Resume</button>
          <button onClick={() => openApp('contact')}>Contact</button>
        </nav>
      </div>
      <div className="os-menubar-right">
        <button className="os-menu-tour" onClick={startTour}><Sparkles size={13} />60s Tour</button>
        <button className="os-menu-search" onClick={toggleSpotlight} aria-label="Spotlight Search" title={`Spotlight Search (${isMac ? '⌘' : 'Ctrl+'}K)`}>
          <Search size={15} /><span>Search</span><kbd>{isMac ? '⌘' : 'Ctrl'} K</kbd>
        </button>
        <button className={`os-menu-icon ${isControlCenterOpen ? 'is-selected' : ''}`} onClick={toggleControlCenter} aria-label="Control Center" aria-expanded={isControlCenterOpen} title="Control Center"><SlidersHorizontal size={16} /></button>
        <time className="os-menu-clock" dateTime={now.toISOString()} title={now.toLocaleString()}><span className="os-menu-date">{date}</span><span>{shortTime}</span></time>
      </div>
    </header>
  );
};
