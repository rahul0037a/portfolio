import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FolderGit2, FileText, Briefcase, GraduationCap, Terminal, Mail, Settings, Info, Search } from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { AppId } from '../../types/os';

const ITEMS: { id: AppId; label: string; icon: React.ElementType }[] = [
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'resume', label: 'Resume (PDF)', icon: FileText },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education & AWS', icon: GraduationCap },
  { id: 'skills', label: 'Tech Stack', icon: Terminal },
  { id: 'contact', label: 'Contact Mail', icon: Mail },
  { id: 'about', label: 'About Developer', icon: Info },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Dock: React.FC = () => {
  const { windows, activeWindowId, openApp, toggleSpotlight } = useOS();
  const reducedMotion = useReducedMotion();

  return (
    <div className="os-dock-position">
      <motion.nav className="os-dock" aria-label="Application dock" initial={reducedMotion ? false : { y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 250, damping: 25 }}>
        {ITEMS.map(({ id, label, icon: Icon }) => (
          <div className="os-dock-item" key={id}>
            <motion.button type="button" onClick={() => openApp(id)} className={`os-dock-button os-app-${id} ${activeWindowId === id ? 'is-active' : ''}`} aria-label={label} aria-pressed={activeWindowId === id} aria-describedby={`dock-label-${id}`} whileHover={reducedMotion ? undefined : { y: -6, scale: 1.1 }} whileTap={reducedMotion ? undefined : { scale: 0.94 }} transition={{ type: 'spring', stiffness: 420, damping: 24 }}>
              <Icon size={22} strokeWidth={1.65} aria-hidden="true" />
            </motion.button>
            <span id={`dock-label-${id}`} className="os-dock-tooltip" role="tooltip">{label}{windows[id].isMinimized ? ' (minimized)' : ''}</span>
            <span className={`os-dock-indicator ${windows[id].isOpen ? 'is-open' : ''} ${windows[id].isMinimized ? 'is-minimized' : ''}`} aria-hidden="true" />
          </div>
        ))}
        <div className="os-dock-divider" aria-hidden="true" />
        <div className="os-dock-item">
          <motion.button className="os-dock-button os-dock-search" onClick={toggleSpotlight} aria-label="Spotlight Search" aria-describedby="dock-label-search" whileHover={reducedMotion ? undefined : { y: -6, scale: 1.1 }} whileTap={reducedMotion ? undefined : { scale: 0.94 }}><Search size={21} strokeWidth={1.7} /></motion.button>
          <span id="dock-label-search" className="os-dock-tooltip" role="tooltip">Spotlight Search</span>
          <span className="os-dock-indicator" aria-hidden="true" />
        </div>
      </motion.nav>
    </div>
  );
};
