import React, { useState } from 'react';
import { RESUME_DATA } from '../../../data/resumeData';
import { useOS } from '../../../context/OSContext';
import { Search, Layers, ArrowUpRight } from 'lucide-react';
import './windows.css';

export const SkillsWindow: React.FC = () => {
  const { openProject, openApp } = useOS();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = [{ id: 'all', label: 'All Technologies' }, ...RESUME_DATA.skillCategories.map(category => ({ id: category.category.toLowerCase(), label: category.category }))];
  const query = searchQuery.trim().toLowerCase();
  const filteredCategories = RESUME_DATA.skillCategories
    .filter(category => activeCategory === 'all' || category.category.toLowerCase() === activeCategory)
    .map(category => ({ ...category, skills: category.skills.filter(skill => skill.name.toLowerCase().includes(query) || skill.usedInProjects.some(project => project.toLowerCase().includes(query))) }))
    .filter(category => category.skills.length);
  const visibleSkillCount = filteredCategories.reduce((total, category) => total + category.skills.length, 0);
  const totalSkills = RESUME_DATA.skillCategories.reduce((total, category) => total + category.skills.length, 0);

  const getEvidenceAction = (name: string): (() => void) | undefined => {
    const lower = name.toLowerCase();
    if (lower.includes('fusecake') || lower.includes('ethnus')) return () => openApp('experience');
    if (lower.includes('wanderlust')) return () => openProject('wanderlust');
    if (lower.includes('foodplay')) return () => openProject('foodplay');
    if (lower.includes('blog blitz')) return () => openProject('blog-blitz');
    if (lower.includes('vit') || lower.includes('stanford') || lower.includes('aws certified')) return () => openApp('education');
    if (lower.includes('portfolio os')) return () => openApp('about');
    return undefined;
  };

  return (
    <div className="skills-app">
      <div className="skills-toolbar">
        <nav className="skills-categories" aria-label="Skill categories">{categories.map(category => <button type="button" key={category.id} aria-pressed={activeCategory === category.id} onClick={() => setActiveCategory(category.id)}>{category.label}</button>)}</nav>
        <label className="app-search"><Search size={14} /><span className="sr-only">Search skill or project</span><input type="search" placeholder="Search skill or project..." value={searchQuery} onChange={event => setSearchQuery(event.target.value)} /></label>
      </div>
      <main className="skills-content">
        <header className="app-page-heading"><Layers size={20} /><div><h2>Technology Depth Matrix</h2><p>A practical stack, connected to the projects and experiences where I used it. Select a tag to explore.</p></div></header>
        {filteredCategories.length ? <div className="skills-grid">{filteredCategories.map(category => <section className="app-panel skills-category" key={category.category}><header><h3>{category.category}</h3><p>{category.description}</p></header><div>{category.skills.map(skill => <div className="skill-evidence-row" key={skill.name}><h4>{skill.name}</h4><div className="skill-project-links">{skill.usedInProjects.map(project => {
          const action = getEvidenceAction(project);
          return action ? <button type="button" key={project} onClick={action} title={`Explore ${project}`}>{project}<ArrowUpRight size={10} /></button> : <span key={project}>{project}</span>;
        })}</div></div>)}</div></section>)}</div> : <div className="app-empty-state"><Search size={25} /><h3>No matching technologies</h3><p>Try a skill or project name, or browse all categories.</p><button type="button" className="app-button app-button-secondary" onClick={() => {setSearchQuery(''); setActiveCategory('all');}}>Reset filters</button></div>}
      </main>
      <footer className="app-status-bar"><span>{visibleSkillCount} of {totalSkills} technologies</span><span>{RESUME_DATA.skillCategories.length} core categories</span></footer>
    </div>
  );
};
