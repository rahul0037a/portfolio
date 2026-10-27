import React from 'react';
import { RESUME_DATA } from '../../../data/resumeData';
import { useOS } from '../../../context/OSContext';
import { Sparkles, FileText, FolderGit2, ExternalLink, BriefcaseBusiness, Code2, MapPin } from 'lucide-react';
import './windows.css';

export const AboutWindow: React.FC = () => {
  const { openApp, startTour } = useOS();
  const { personal } = RESUME_DATA;
  return (
    <div className="portfolio-app about-app">
      <header className="about-profile"><div className="about-monogram" aria-hidden="true">RR</div><div><span className="app-eyebrow">About the developer</span><h2>{personal.name}</h2><p>Full-Stack Software Engineer & Cloud Builder</p><span className="about-location"><MapPin size={12} />{personal.location}</span></div></header>
      <div className="about-stats">{personal.stats.map(stat => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
      <section className="about-biography"><h3>What I'm interested in building</h3>{personal.aboutBio.slice(1).map(paragraph => <p key={paragraph}>{paragraph.replace(/[–—]/g, ' - ')}</p>)}</section>
      <section className="about-dsa"><Code2 size={18} /><div><h3>Problem Solving & DSA</h3><p>{personal.dsaStats}</p></div><a href={personal.leetcode} target="_blank" rel="noopener noreferrer" aria-label="View LeetCode profile"><ArrowLink /></a></section>
      <nav className="about-profiles" aria-label="Professional profiles">{[{ label: 'LeetCode', href: personal.leetcode, icon: Code2 }, { label: 'GitHub', href: personal.github, icon: Code2 }, { label: 'LinkedIn', href: personal.linkedin, icon: BriefcaseBusiness }].map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer"><Icon size={16} /><span>{label}</span><ExternalLink size={12} /></a>)}</nav>
      <div className="about-actions"><button type="button" className="app-button app-button-primary" onClick={() => openApp('projects')}><FolderGit2 size={14} />View Projects</button><button type="button" className="app-button app-button-secondary" onClick={() => openApp('resume')}><FileText size={14} />Inspect Resume PDF</button><button type="button" className="app-button app-button-secondary" onClick={startTour}><Sparkles size={14} />Launch 60s Tour</button></div>
    </div>
  );
};

const ArrowLink = () => <ExternalLink size={14} />;
