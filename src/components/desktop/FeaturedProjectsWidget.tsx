import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Compass, Utensils, NotebookPen, FolderGit2 } from 'lucide-react';
import { RESUME_DATA } from '../../data/resumeData';
import { useOS } from '../../context/OSContext';

const PROJECT_ICONS = { wanderlust: Compass, foodplay: Utensils, 'blog-blitz': NotebookPen };
const PROJECT_LABELS: Record<string, string> = { wanderlust: 'Vacation rentals, thoughtfully engineered.', foodplay: 'Nutrition, made personal.', 'blog-blitz': 'A home for ideas and stories.' };

export function FeaturedProjectsWidget() {
  const { openProject, openApp } = useOS();
  const [activeId, setActiveId] = useState('wanderlust');
  const project = RESUME_DATA.projects.find(item => item.id === activeId) || RESUME_DATA.projects[0];
  const ProjectIcon = PROJECT_ICONS[project.id as keyof typeof PROJECT_ICONS] || FolderGit2;

  return (
    <section className={`work-widget work-widget-${project.id}`} aria-labelledby="work-widget-title">
      <div className="widget-heading"><h2 id="work-widget-title">Selected work</h2><button onClick={() => openApp('projects')} aria-label="Explore all projects"><ArrowUpRight size={16} /></button></div>
      <button className="work-preview" onClick={() => openProject(project.id)} aria-label={`Explore ${project.title}`}>
        <span className="work-preview-art" aria-hidden="true"><ProjectIcon size={58} strokeWidth={1} /><span className="work-preview-orbit" /><span className="work-preview-orbit orbit-two" /></span>
        <span className="work-preview-caption"><strong>{project.title}</strong><ArrowUpRight size={20} /></span>
        <span className="work-preview-description">{PROJECT_LABELS[project.id]}</span>
      </button>
      <div className="work-project-tabs" aria-label="Featured project preview">
        {RESUME_DATA.projects.map(item => <button key={item.id} aria-pressed={project.id === item.id} onClick={() => setActiveId(item.id)}>{item.title}</button>)}
      </div>
      <button className="work-detail-link" onClick={() => openProject(project.id)}>Explore the architecture <ArrowRight size={14} /></button>
    </section>
  );
}
