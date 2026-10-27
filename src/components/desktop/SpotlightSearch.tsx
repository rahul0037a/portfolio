import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Search, FileText, FolderGit2, Briefcase, GraduationCap, Terminal, Mail, Info, Settings, Sparkles, ArrowUpRight, Download, Code2 } from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { RESUME_DATA } from '../../data/resumeData';
import { AppId } from '../../types/os';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: 'App' | 'Project' | 'Skill' | 'Action';
  icon: React.ElementType;
  onSelect: () => void;
}

export const SpotlightSearch: React.FC = () => {
  const { isSpotlightOpen, closeSpotlight, openApp, openProject, startTour } = useOS();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const resultListRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isSpotlightOpen) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    restoreFocusRef.current = true;
    setQuery('');
    setSelectedIndex(0);
    inputRef.current?.focus();
    return () => {
      if (restoreFocusRef.current && previousFocus?.isConnected) previousFocus.focus();
    };
  }, [isSpotlightOpen]);

  useEffect(() => {
    resultListRef.current?.querySelector<HTMLElement>(`[data-result-index="${selectedIndex}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  const apps: { id: AppId; title: string; subtitle: string; icon: React.ElementType }[] = [
    { id: 'projects', title: 'Projects Explorer', subtitle: RESUME_DATA.projects.map(project => project.title).join(', '), icon: FolderGit2 },
    { id: 'resume', title: 'Resume (PDF Preview)', subtitle: 'Preview or download the official resume', icon: FileText },
    { id: 'experience', title: 'Work Experience', subtitle: RESUME_DATA.experiences.map(item => item.company).join(', '), icon: Briefcase },
    { id: 'skills', title: 'Tech Stack', subtitle: RESUME_DATA.skillCategories.map(category => category.category).join(', '), icon: Terminal },
    { id: 'education', title: 'Education & AWS', subtitle: 'VIT Chennai, AWS certification, Stanford Machine Learning', icon: GraduationCap },
    { id: 'contact', title: 'Contact Mail', subtitle: 'Email, phone, and professional profiles', icon: Mail },
    { id: 'about', title: 'About Me', subtitle: 'Meet Rahul Rathi, full-stack engineer and cloud builder', icon: Info },
    { id: 'settings', title: 'Settings', subtitle: 'Personalize the desktop wallpaper', icon: Settings },
  ];
  const allItems: SearchResult[] = [
    ...apps.map(app => ({ ...app, id: `app-${app.id}`, category: 'App' as const, onSelect: () => openApp(app.id) })),
    ...RESUME_DATA.projects.map(project => ({
      id: `project-${project.id}`, title: project.title, subtitle: `${project.subtitle} | ${project.tags.join(', ')}`,
      category: 'Project' as const, icon: FolderGit2, onSelect: () => openProject(project.id),
    })),
    ...RESUME_DATA.skillCategories.flatMap(category => category.skills.map(skill => ({
      id: `skill-${category.category}-${skill.name}`.toLowerCase().replace(/[^a-z0-9-]+/g, '-'), title: skill.name,
      subtitle: `${category.category} | ${skill.usedInProjects.join(', ')}`,
      category: 'Skill' as const, icon: Code2, onSelect: () => openApp('skills'),
    }))),
    { id: 'tour', title: 'Recruiter 60s Tour', subtitle: 'A guided look at experience, projects, and skills', category: 'Action', icon: Sparkles, onSelect: startTour },
    { id: 'download-resume', title: 'Download Official Resume PDF', subtitle: 'Save a copy of Rahul Rathi\'s resume', category: 'Action', icon: Download, onSelect: () => {
      const link = document.createElement('a'); link.href = '/Rahul_Rathi_Resume_v4.pdf'; link.download = 'Rahul_Rathi_Resume_v4.pdf'; link.click();
    } },
    ...(['github', 'linkedin', 'leetcode'] as const).map(key => ({
      id: `external-${key}`, title: key === 'github' ? 'GitHub Profile' : key === 'linkedin' ? 'LinkedIn Profile' : 'LeetCode Profile',
      subtitle: RESUME_DATA.personal[key], category: 'Action' as const, icon: ArrowUpRight,
      onSelect: () => window.open(RESUME_DATA.personal[key], '_blank', 'noopener,noreferrer'),
    })),
  ];
  const search = query.trim().toLowerCase();
  const filteredItems = search ? allItems.filter(item => `${item.title} ${item.subtitle} ${item.category}`.toLowerCase().includes(search)).sort((a, b) => {
    const rank = (item: SearchResult) => item.title.toLowerCase() === search ? 0 : item.title.toLowerCase().startsWith(search) ? 1 : 2;
    return rank(a) - rank(b);
  }) : allItems.slice(0, 7);
  const safeIndex = filteredItems.length ? Math.min(selectedIndex, filteredItems.length - 1) : 0;

  const select = (item: SearchResult) => {
    restoreFocusRef.current = item.category === 'Action' && item.id !== 'tour';
    item.onSelect();
    closeSpotlight();
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); closeSpotlight(); }
    else if (event.key === 'Tab') {
      event.preventDefault();
      if (document.activeElement === inputRef.current) closeRef.current?.focus();
      else inputRef.current?.focus();
    } else if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && filteredItems.length) {
      event.preventDefault();
      setSelectedIndex((safeIndex + (event.key === 'ArrowDown' ? 1 : -1) + filteredItems.length) % filteredItems.length);
    } else if (event.key === 'Enter' && document.activeElement === inputRef.current) {
      event.preventDefault();
      if (filteredItems[safeIndex]) select(filteredItems[safeIndex]);
    }
  };

  return (
    <AnimatePresence>
      {isSpotlightOpen && (
        <motion.div key="spotlight" className="os-spotlight-layer" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .16 }} onPointerDown={event => { if (event.target === event.currentTarget) closeSpotlight(); }}>
          <motion.div className="os-spotlight" role="dialog" aria-modal="true" aria-label="Spotlight Search" onKeyDown={handleKeyDown} initial={reducedMotion ? false : { y: -12, scale: .98 }} animate={{ y: 0, scale: 1 }} exit={reducedMotion ? undefined : { scale: .98, y: -6 }} transition={{ type: 'spring', stiffness: 400, damping: 32 }}>
            <div className="os-spotlight-input-row">
              <Search size={21} strokeWidth={1.7} aria-hidden="true" />
              <input ref={inputRef} type="search" value={query} onChange={event => { setQuery(event.target.value); setSelectedIndex(0); }} placeholder="Search apps, projects, skills..." aria-label="Search apps, projects, skills" role="combobox" aria-expanded="true" aria-autocomplete="list" aria-controls="spotlight-results" aria-activedescendant={filteredItems[safeIndex] ? `spotlight-${filteredItems[safeIndex].id}` : undefined} autoComplete="off" spellCheck={false} />
              <button ref={closeRef} className="os-spotlight-close" onClick={closeSpotlight} aria-label="Close search">esc</button>
            </div>
            <div className="os-spotlight-section" aria-live="polite">{search ? `${filteredItems.length} ${filteredItems.length === 1 ? 'result' : 'results'}` : 'Quick access'}</div>
            <div id="spotlight-results" role="listbox" aria-label="Search results" className="os-spotlight-results" ref={resultListRef}>
              {filteredItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div id={`spotlight-${item.id}`} key={item.id} data-result-index={index} role="option" aria-selected={safeIndex === index} onClick={() => select(item)} onPointerMove={() => setSelectedIndex(index)} className={`os-spotlight-result ${safeIndex === index ? 'is-selected' : ''}`}>
                    <span className="os-spotlight-result-icon"><Icon size={17} strokeWidth={1.65} /></span>
                    <div className="os-spotlight-result-copy"><div className="os-spotlight-result-title">{item.title}</div><div className="os-spotlight-result-subtitle">{item.subtitle}</div></div>
                    <span className="os-spotlight-result-category">{item.category}</span>
                  </div>
                );
              })}
              {!filteredItems.length && <div className="os-search-empty"><strong>No results for “{query}”</strong>Try a project name, technology, or “resume”.</div>}
            </div>
            <div className="os-spotlight-footer"><span>↑ ↓ to navigate</span><span>Enter to open</span><span>Esc to close</span></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
