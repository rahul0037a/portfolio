import React, { lazy, Suspense } from 'react';
import { FileText, FolderGit2, BriefcaseBusiness, GraduationCap, Terminal, Mail, Info, Settings, Monitor, Command, ArrowUpRight } from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { AppId } from '../../types/os';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { DesktopIcon } from './DesktopIcon';
import { WindowFrame } from './WindowFrame';
import { SpotlightSearch } from './SpotlightSearch';
import { ControlCenter } from './ControlCenter';
import { RecruiterTourBar } from './RecruiterTourBar';
import { DesktopHeroWidget } from './DesktopHeroWidget';
import { SystemStatusWidget } from './SystemStatusWidget';
import { FeaturedProjectsWidget } from './FeaturedProjectsWidget';
import { WallpaperCanvas } from './WallpaperCanvas';
import { WindowContentBoundary } from './WindowContentBoundary';

const AboutWindow = lazy(() => import('./windows/AboutWindow').then(module => ({ default: module.AboutWindow })));
const ResumeWindow = lazy(() => import('./windows/ResumeWindow').then(module => ({ default: module.ResumeWindow })));
const ProjectsWindow = lazy(() => import('./windows/ProjectsWindow').then(module => ({ default: module.ProjectsWindow })));
const ExperienceWindow = lazy(() => import('./windows/ExperienceWindow').then(module => ({ default: module.ExperienceWindow })));
const EducationWindow = lazy(() => import('./windows/EducationWindow').then(module => ({ default: module.EducationWindow })));
const SkillsWindow = lazy(() => import('./windows/SkillsWindow').then(module => ({ default: module.SkillsWindow })));
const ContactWindow = lazy(() => import('./windows/ContactWindow').then(module => ({ default: module.ContactWindow })));
const SettingsWindow = lazy(() => import('./windows/SettingsWindow').then(module => ({ default: module.SettingsWindow })));

const APPS = [
  { id: 'about', label: 'About Me', title: 'About Rahul Rathi', icon: Info, content: AboutWindow },
  { id: 'resume', label: 'Resume.pdf', title: 'Rahul_Rathi_Resume_v4.pdf | Preview', icon: FileText, content: ResumeWindow, badge: 'PDF' },
  { id: 'projects', label: 'Projects', title: 'Projects | Finder', icon: FolderGit2, content: ProjectsWindow, badge: '3' },
  { id: 'experience', label: 'Experience', title: 'Career & Work Experience | Notes', icon: BriefcaseBusiness, content: ExperienceWindow },
  { id: 'education', label: 'Education & AWS', title: 'Academics & AWS Certification', icon: GraduationCap, content: EducationWindow },
  { id: 'skills', label: 'Tech Stack', title: 'System Profiler | Tech Stack', icon: Terminal, content: SkillsWindow },
  { id: 'contact', label: 'Contact Mail', title: 'Mail | New Message to Rahul', icon: Mail, content: ContactWindow },
] as const;

export const DesktopCanvas: React.FC = () => {
  const { toggleSpotlight, openApp } = useOS();

  return (
    <div className="os-desktop">
      <a className="skip-to-workspace" href="#workspace">Skip to workspace</a>
      <WallpaperCanvas />
      <MenuBar />
      <RecruiterTourBar />

      <main id="workspace" className="desktop-workspace" tabIndex={-1}>
        <div className="workspace-heading">
          <div className="workspace-breadcrumb"><Monitor size={15} /><span>Rahul’s workspace</span><span className="workspace-breadcrumb-divider">/</span><span>Portfolio</span></div>
          <button className="workspace-availability" onClick={() => openApp('contact')}><span /> Open to Full-Time Roles <ArrowUpRight size={13} /></button>
        </div>

        <div className="desktop-layout">
          <nav className="desktop-apps" aria-label="Desktop apps">
            {APPS.map(app => <DesktopIcon key={app.id} id={app.id} title={app.label} badge={'badge' in app ? app.badge : undefined} icon={<app.icon size={24} />} />)}
          </nav>
          <div className="desktop-main-column">
            <DesktopHeroWidget />
            <section className="stack-widget" aria-labelledby="stack-widget-title">
              <div><Terminal size={15} /><h2 id="stack-widget-title">Tools I build with</h2></div>
              <p><span>React</span><span>Next.js</span><span>TypeScript</span><span>Node.js</span><span>Java</span><span>AWS</span></p>
              <button onClick={() => openApp('skills')} aria-label="Explore Tech Stack"><ArrowUpRight size={17} /></button>
            </section>
          </div>
          <aside className="desktop-side-column" aria-label="Portfolio highlights">
            <FeaturedProjectsWidget />
            <SystemStatusWidget />
          </aside>
        </div>

        <div className="workspace-footer"><span>Built with curiosity. Designed to explore.</span><button onClick={toggleSpotlight}><Command size={12} /><span>Search anything</span><kbd>Ctrl / ⌘ K</kbd></button></div>
      </main>

      <div className="desktop-windows">
        {APPS.map(app => <WindowFrame key={app.id} id={app.id as AppId} title={app.title} icon={<app.icon size={14} />}><WindowContentBoundary><Suspense fallback={<div className="window-loading" role="status"><span /> Opening {app.label}…</div>}><app.content /></Suspense></WindowContentBoundary></WindowFrame>)}
        <WindowFrame id="settings" title="System Settings" icon={<Settings size={14} />}><WindowContentBoundary><Suspense fallback={<div className="window-loading" role="status">Opening Settings…</div>}><SettingsWindow /></Suspense></WindowContentBoundary></WindowFrame>
      </div>
      <Dock />
      <SpotlightSearch />
      <ControlCenter />
    </div>
  );
};
