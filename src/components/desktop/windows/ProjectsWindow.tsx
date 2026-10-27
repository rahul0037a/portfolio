import React, { useEffect, useState } from 'react';
import { RESUME_DATA, Project, ArchitectureComponent } from '../../../data/resumeData';
import { useOS } from '../../../context/OSContext';
import { ExternalLink, Code2, Layers, CheckCircle2, FolderGit2, Briefcase, Terminal, FileText, ChevronRight, ArrowLeft, Search, HelpCircle, Sparkles, Info, Compass, Utensils, NotebookPen, ArrowUpRight } from 'lucide-react';
import './windows.css';

type ProjectTab = 'architecture' | 'decisions' | 'problem' | 'features' | 'proof';
const tabs: { id: ProjectTab; label: string; icon: typeof Layers }[] = [
  { id: 'architecture', label: 'Architecture', icon: Layers },
  { id: 'decisions', label: 'Engineering Decisions', icon: HelpCircle },
  { id: 'problem', label: 'Problem', icon: Info },
  { id: 'features', label: 'Features', icon: Sparkles },
  { id: 'proof', label: 'Proof', icon: CheckCircle2 },
];
const cleanText = (text: string) => text.replace(/[–—]/g, ' - ');
const isRepositoryUrl = (url?: string) => Boolean(url && /^https?:\/\/(www\.)?github\.com\//i.test(url));
const projectIcon = (id: string) => id === 'wanderlust' ? Compass : id === 'foodplay' ? Utensils : NotebookPen;

function ComponentDetails({ component }: { component: ArchitectureComponent }) {
  return <div className="component-details"><span className="app-eyebrow">{component.category}</span><h4>{component.name}</h4><p className="component-role">{cleanText(component.role)}</p><p>{cleanText(component.explanation)}</p></div>;
}

function ProjectLinks({ project }: { project: Project }) {
  const hasSeparateLiveUrl = project.liveUrl && !isRepositoryUrl(project.liveUrl);
  const repositoryUrl = project.githubUrl || (isRepositoryUrl(project.liveUrl) ? project.liveUrl : undefined);
  return <div className="app-toolbar-actions">
    {hasSeparateLiveUrl && <a className="app-button app-button-primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={13} />Live URL</a>}
    {repositoryUrl && <a className="app-button app-button-secondary" href={repositoryUrl} target="_blank" rel="noopener noreferrer"><Code2 size={14} />GitHub<ArrowUpRight size={12} /></a>}
  </div>;
}

export const ProjectsWindow: React.FC = () => {
  const { openApp, selectedProjectId: osSelectedId, setSelectedProjectId: setOsSelectedId } = useOS();
  const [selectedProjectId, setLocalSelectedProjectId] = useState<string | null>(osSelectedId || 'wanderlust');
  const [activeTab, setActiveTab] = useState<ProjectTab>('architecture');
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>('Passport.js');
  const [searchFilter, setSearchFilter] = useState('');

  const selectProject = (id: string | null) => {
    setLocalSelectedProjectId(id);
    setOsSelectedId(id);
    setActiveTab('architecture');
    const project = RESUME_DATA.projects.find(item => item.id === id);
    setSelectedComponentId(id === 'wanderlust' ? 'Passport.js' : project?.architectureTree.pipeline[0] || null);
  };

  useEffect(() => {
    if (!osSelectedId) return;
    setLocalSelectedProjectId(osSelectedId);
    setActiveTab('architecture');
    const project = RESUME_DATA.projects.find(item => item.id === osSelectedId);
    setSelectedComponentId(osSelectedId === 'wanderlust' ? 'Passport.js' : project?.architectureTree.pipeline[0] || null);
  }, [osSelectedId]);

  const activeProject = RESUME_DATA.projects.find(project => project.id === selectedProjectId);
  const query = searchFilter.trim().toLowerCase();
  const filteredProjects = RESUME_DATA.projects.filter(project => [project.title, project.category, project.description, ...project.tags].some(value => value.toLowerCase().includes(query)));
  const activeComponent = activeProject && selectedComponentId ? activeProject.architectureTree.components[selectedComponentId] : undefined;

  return (
    <div className="projects-app">
      <div className="app-toolbar finder-toolbar">
        <div className="finder-breadcrumb"><button type="button" className="finder-back" onClick={() => selectProject(null)} aria-label="Back to all projects"><ArrowLeft size={15} /></button><button type="button" onClick={() => selectProject(null)}>Projects</button>{activeProject && <><ChevronRight size={13} /><span>{activeProject.title}</span></>}</div>
        <label className="finder-mobile-select"><span className="sr-only">Choose a project</span><select value={selectedProjectId || ''} onChange={event => selectProject(event.target.value || null)}><option value="">All Projects</option>{RESUME_DATA.projects.map(project => <option key={project.id} value={project.id}>{project.title}</option>)}</select></label>
        {!selectedProjectId && <label className="app-search"><Search size={14} /><span className="sr-only">Filter projects</span><input type="search" placeholder="Filter projects..." value={searchFilter} onChange={event => setSearchFilter(event.target.value)} /></label>}
      </div>

      <div className="finder-body">
        <aside className="finder-sidebar" aria-label="Project navigation">
          <span className="app-eyebrow">Repositories</span>
          <button type="button" className={`finder-nav-item ${!selectedProjectId ? 'is-current' : ''}`} onClick={() => selectProject(null)}><FolderGit2 size={15} />All Projects<span className="finder-count">{RESUME_DATA.projects.length}</span></button>
          {RESUME_DATA.projects.map(project => {
            const Icon = projectIcon(project.id);
            return <button type="button" key={project.id} className={`finder-nav-item ${project.id === selectedProjectId ? 'is-current' : ''}`} aria-current={project.id === selectedProjectId ? 'page' : undefined} onClick={() => selectProject(project.id)}><Icon size={15} />{project.title}</button>;
          })}
          <span className="app-eyebrow finder-quick-heading">Quick Links</span>
          {[{ id: 'experience' as const, label: 'Experience', icon: Briefcase }, { id: 'skills' as const, label: 'Tech Stack', icon: Terminal }, { id: 'resume' as const, label: 'Resume (PDF)', icon: FileText }].map(({ id, label, icon: Icon }) => <button type="button" key={id} className="finder-nav-item" onClick={() => openApp(id)}><Icon size={15} />{label}</button>)}
          <p className="finder-sidebar-note">Explore the problem, architecture, and decisions behind each project.</p>
        </aside>

        <main className="finder-main">
          {!selectedProjectId ? (
            <div className="finder-directory">
              <header className="finder-directory-heading"><span className="app-eyebrow">Selected work</span><h2>Software Engineering Portfolio</h2><p>Three projects. Real problems, thoughtful decisions, and the systems behind them.</p></header>
              <div className="project-directory-grid">
                {filteredProjects.map(project => {
                  const Icon = projectIcon(project.id);
                  return <button type="button" className={`project-directory-card ${project.id === 'wanderlust' ? 'is-featured' : ''}`} key={project.id} onClick={() => selectProject(project.id)}>
                    <div className={`project-directory-icon project-color-${project.id}`}><Icon size={26} /></div>
                    <div className="project-directory-card-copy"><span className="app-eyebrow">{project.category}</span><h3>{project.title}<ArrowUpRight size={18} /></h3><p>{project.subtitle}</p><div className="app-tags">{project.tags.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div></div>
                  </button>;
                })}
              </div>
              {!filteredProjects.length && <div className="app-empty-state"><Search size={25} /><h3>No matching projects</h3><p>Try a project name or a technology such as Flask or MongoDB.</p><button type="button" className="app-button app-button-secondary" onClick={() => setSearchFilter('')}>Clear search</button></div>}
            </div>
          ) : activeProject ? (
            <div className="project-detail">
              <header className="project-detail-heading"><div><span className="app-eyebrow">{activeProject.category}</span><h2>{activeProject.title}</h2><p>{activeProject.subtitle}</p></div><ProjectLinks project={activeProject} /></header>
              <nav className="project-tabs" aria-label="Project details">{tabs.map(({ id, label, icon: Icon }) => <button type="button" key={id} onClick={() => setActiveTab(id)} aria-pressed={activeTab === id} className={activeTab === id ? 'is-active' : ''}><Icon size={14} />{label}</button>)}</nav>
              <section className="project-tab-content" aria-label={tabs.find(tab => tab.id === activeTab)?.label}>
                {activeTab === 'architecture' && (
                  <div className="architecture-layout">
                    <div className="architecture-pipeline"><header className="architecture-heading"><h3>How it works</h3><p>Select a component to explore its role.</p></header>
                      {activeProject.architectureTree.pipeline.map((nodeKey, index) => {
                        const compound = nodeKey === 'PASSPORT + JOI + HELMET';
                        const selected = selectedComponentId === nodeKey || (compound && ['Passport.js', 'Joi', 'Helmet'].includes(selectedComponentId || ''));
                        const component = activeProject.architectureTree.components[nodeKey];
                        return <React.Fragment key={nodeKey}><article className={`architecture-node ${selected ? 'is-selected' : ''}`}>
                          <button type="button" className="architecture-node-button" aria-expanded={selected} onClick={() => setSelectedComponentId(compound ? 'Passport.js' : nodeKey)}><span className="architecture-node-number">{String(index + 1).padStart(2, '0')}</span><span className="architecture-node-copy"><strong>{component?.name || nodeKey}</strong><span>{component?.role}</span></span><ChevronRight size={14} /></button>
                          {compound && <div className="architecture-subnodes">{['Passport.js', 'Joi', 'Helmet'].map(subKey => <button type="button" key={subKey} aria-pressed={selectedComponentId === subKey} onClick={() => setSelectedComponentId(subKey)}>{subKey}</button>)}</div>}
                          {selected && activeComponent && <div className="architecture-inline-details"><ComponentDetails component={activeComponent} /></div>}
                        </article>{index < activeProject.architectureTree.pipeline.length - 1 && <div className="architecture-connector" aria-hidden="true" />}</React.Fragment>;
                      })}
                      {activeProject.architectureTree.branches.map(branch => <div className="architecture-branches" key={branch.parentId}><h4>{branch.label}</h4><div className="architecture-branch-grid">{branch.items.map(itemKey => {
                        const component = activeProject.architectureTree.components[itemKey];
                        const selected = selectedComponentId === itemKey;
                        return <article className={`architecture-node ${selected ? 'is-selected' : ''}`} key={itemKey}><button type="button" className="architecture-branch-button" aria-expanded={selected} onClick={() => setSelectedComponentId(itemKey)}><strong>{component?.name || itemKey}</strong><span>{component?.role}</span></button>{selected && activeComponent && <div className="architecture-inline-details"><ComponentDetails component={activeComponent} /></div>}</article>;
                      })}</div></div>)}
                    </div>
                    <aside className="architecture-inspector app-panel" aria-live="polite"><span className="app-eyebrow"><Info size={12} /> Component inspector</span>{activeComponent ? <ComponentDetails component={activeComponent} /> : <p>Select a component to read about its role in the project.</p>}<div className="inspector-footer"><Layers size={13} />{activeProject.title} architecture</div></aside>
                  </div>
                )}
                {activeTab === 'decisions' && <div className="project-reading-column"><header className="architecture-heading"><h3>Engineering Decisions</h3><p>The choices behind the implementation, including their trade-offs.</p></header>{activeProject.engineeringDecisions.map((decision, index) => <article className="app-panel decision-panel" key={index}><h4>{cleanText(decision.question)}</h4><p className="decision-answer">{cleanText(decision.answer)}</p><p>{cleanText(decision.rationale)}</p>{decision.tradeOff && <div className="decision-tradeoff"><span className="app-eyebrow">Trade-off</span><p>{cleanText(decision.tradeOff)}</p></div>}</article>)}</div>}
                {activeTab === 'problem' && <div className="project-reading-column"><article className="app-panel problem-intro"><span className="app-eyebrow">The problem</span><h3>What were you building?</h3><p>{cleanText(activeProject.problem.whatWereYouBuilding)}</p></article><h3 className="app-section-heading">Engineering challenges</h3><div className="project-challenges">{activeProject.problem.challenges.map(challenge => <div key={challenge}><CheckCircle2 size={16} /><p>{cleanText(challenge)}</p></div>)}</div><div className="project-audience"><span className="app-eyebrow">Built for</span><p>{cleanText(activeProject.problem.targetUsers)}</p></div></div>}
                {activeTab === 'features' && <div><header className="architecture-heading"><h3>Features</h3><p>The user-facing capabilities and the engineering that supports them.</p></header><div className="project-features">{activeProject.features.map(feature => <article className="app-panel" key={feature.name}><span className="app-eyebrow">{feature.tag}</span><h4>{feature.name}</h4><p>{cleanText(feature.description)}</p></article>)}</div></div>}
                {activeTab === 'proof' && <div className="project-reading-column"><article className="app-panel project-proof"><span className="app-eyebrow">Project links & outcomes</span><h3>Explore the work</h3><p>{cleanText(activeProject.proof.summary)}</p><ProjectLinks project={activeProject} /><div className="app-tags">{activeProject.proof.badges.map(badge => <span key={badge}>{badge}</span>)}</div></article><article className="project-outcomes"><h4>Project outcomes</h4><p>{cleanText(activeProject.proof.metrics)}</p></article></div>}
              </section>
            </div>
          ) : <div className="app-empty-state"><FolderGit2 size={26} /><h3>Project not found</h3><button className="app-button app-button-secondary" onClick={() => selectProject(null)}>View all projects</button></div>}
        </main>
      </div>
      <footer className="app-status-bar finder-status"><span>{RESUME_DATA.projects.length} projects</span><span>{activeProject ? activeProject.tags.slice(0, 3).join(' / ') : 'Project details & source links'}</span></footer>
    </div>
  );
};
