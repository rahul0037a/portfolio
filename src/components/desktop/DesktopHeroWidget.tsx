import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, FileText, FolderGit2, Play, Code2, BriefcaseBusiness } from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { RESUME_DATA } from '../../data/resumeData';

export const DesktopHeroWidget: React.FC = () => {
  const { openApp, startTour } = useOS();
  const reduceMotion = useReducedMotion();

  return (
    <motion.section className="welcome-panel" aria-labelledby="welcome-title"
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      <div className="welcome-topline">
        <span className="welcome-avatar" aria-hidden="true">rr</span>
        <span>Welcome to my corner of the internet.</span>
        <button onClick={() => openApp('about')} aria-label="Open About Me" title="About Me"><ArrowUpRight size={17} /></button>
      </div>
      <div className="welcome-copy">
        <p className="welcome-hello">Hey, I’m</p>
        <h1 id="welcome-title">Rahul Rathi<span>.</span></h1>
        <p className="welcome-role">Full-stack engineer. <span>Cloud builder.</span></p>
        <p className="welcome-description">I build full-stack systems from idea to production, with thoughtful interfaces and reliable engineering.</p>
      </div>
      <div className="welcome-actions">
        <button className="desktop-button desktop-button-primary" onClick={() => openApp('projects')}>
          <FolderGit2 size={16} /> View Projects <ArrowUpRight size={15} />
        </button>
        <button className="desktop-button desktop-button-secondary" onClick={() => openApp('resume')}>
          <FileText size={16} /> Resume (PDF)
        </button>
      </div>
      <div className="welcome-bottomline">
        <div className="welcome-socials">
          <a href={RESUME_DATA.personal.github} target="_blank" rel="noopener noreferrer"><Code2 size={14} /> GitHub <ArrowUpRight size={11} /></a>
          <a href={RESUME_DATA.personal.linkedin} target="_blank" rel="noopener noreferrer"><BriefcaseBusiness size={14} /> LinkedIn <ArrowUpRight size={11} /></a>
        </div>
        <button className="welcome-tour" onClick={startTour}><Play size={12} fill="currentColor" /> Take the 60s Tour</button>
      </div>
    </motion.section>
  );
};
