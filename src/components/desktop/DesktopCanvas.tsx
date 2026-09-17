import React from 'react';
import { useOS } from '../../context/OSContext';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { DesktopIcon } from './DesktopIcon';
import { WindowFrame } from './WindowFrame';
import { SpotlightSearch } from './SpotlightSearch';
import { ControlCenter } from './ControlCenter';
import { RecruiterTourBar } from './RecruiterTourBar';
import { DesktopHeroWidget } from './DesktopHeroWidget';
import { SystemStatusWidget } from './SystemStatusWidget';
import { SystemPulseVisualizer } from './SystemPulseVisualizer';
import { WallpaperCanvas } from './WallpaperCanvas';

// Windows
import { ResumeWindow } from './windows/ResumeWindow';
import { ProjectsWindow } from './windows/ProjectsWindow';
import { ExperienceWindow } from './windows/ExperienceWindow';
import { EducationWindow } from './windows/EducationWindow';
import { SkillsWindow } from './windows/SkillsWindow';
import { ContactWindow } from './windows/ContactWindow';
import { AboutWindow } from './windows/AboutWindow';
import { SettingsWindow } from './windows/SettingsWindow';

import {
  FileText,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Terminal,
  Mail,
  Info,
  Settings,
  Sparkles,
  Command,
  ExternalLink,
} from 'lucide-react';
import { RESUME_DATA } from '../../data/resumeData';

export const DesktopCanvas: React.FC = () => {
  const { startTour, toggleSpotlight } = useOS();

  return (
    <div className="fixed inset-0 overflow-hidden select-none font-sans bg-[#050811]">
      {/* Dynamic Active Wallpaper with Mouse Tracking & Multiple Aesthetics */}
      <WallpaperCanvas />

      {/* Top macOS Menu Bar */}
      <MenuBar />

      {/* Guided Recruiter Tour Bar (Active when tour started) */}
      <RecruiterTourBar />

      {/* Desktop Workspace */}
      <div className="relative w-full h-full pt-8 sm:pt-10 pb-20 sm:pb-24 px-3 sm:px-6 overflow-y-auto md:overflow-hidden flex flex-col justify-between touch-pan-y custom-scrollbar">
        {/* Main Desktop Space with Left Icons, Center Hero, and Right System Status */}
        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center z-0 relative pointer-events-auto py-2 md:py-0">
          {/* Center Column: Hero Widget + Subtle Signature System Pulse */}
          <div className="order-1 md:order-2 md:col-span-6 flex flex-col items-center justify-center">
            <DesktopHeroWidget />
            <div className="w-full">
              <SystemPulseVisualizer />
            </div>
          </div>

          {/* Left Column: Consistent Desktop Icons (Grid on mobile, Column on desktop) */}
          <div className="order-2 md:order-1 md:col-span-3 grid grid-cols-4 sm:grid-cols-4 md:flex md:flex-col items-center md:items-start justify-items-center gap-1.5 sm:gap-3 max-h-none md:max-h-[calc(100vh-160px)] pb-4 md:pb-0">
            {/* About Me App */}
            <DesktopIcon
              id="about"
              title="About Me"
              badge="INFO"
              badgeColor="bg-cyan-600 text-white"
              icon={<Info size={22} className="text-cyan-400" />}
            />

            {/* Resume PDF File */}
            <DesktopIcon
              id="resume"
              title="Resume.pdf"
              badge="PDF"
              badgeColor="bg-rose-600 text-white"
              icon={<FileText size={22} className="text-rose-400" />}
            />

            {/* Projects Folder */}
            <DesktopIcon
              id="projects"
              title="Projects"
              badge="3"
              badgeColor="bg-blue-600 text-white"
              icon={<FolderGit2 size={22} className="text-blue-400" />}
            />

            {/* Experience App */}
            <DesktopIcon
              id="experience"
              title="Experience"
              icon={<Briefcase size={22} className="text-indigo-400" />}
            />

            {/* Education & AWS Certification */}
            <DesktopIcon
              id="education"
              title="Education & AWS"
              badge="AWS"
              badgeColor="bg-amber-600 text-white"
              icon={<GraduationCap size={22} className="text-amber-400" />}
            />

            {/* Tech Stack Profiler */}
            <DesktopIcon
              id="skills"
              title="Tech Stack"
              icon={<Terminal size={22} className="text-emerald-400" />}
            />

            {/* Contact Mail */}
            <DesktopIcon
              id="contact"
              title="Contact Mail"
              badge="OPEN"
              badgeColor="bg-emerald-600 text-white"
              icon={<Mail size={22} className="text-sky-400" />}
            />
          </div>

          {/* Right Column: 3-Second Recruiter Card + Compact System Status */}
          <div className="hidden lg:flex md:col-span-3 order-3 flex-col items-end gap-3">
            {/* 3-Second Recruiter Summary Card */}
            <div className="w-full max-w-xs p-3.5 rounded-2xl bg-[#0f1422]/80 backdrop-blur-xl border border-white/10 shadow-xl text-slate-200 select-none space-y-2">
              <div>
                <h2 className="text-sm font-bold text-white tracking-tight">
                  {RESUME_DATA.personal.name}
                </h2>
                <p className="text-xs font-mono text-blue-400 font-medium">
                  Full-Stack Software Engineer
                </p>
              </div>

              <div className="text-[11px] font-mono text-slate-300">
                React • Next.js • Node.js • Java • AWS
              </div>

              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-medium pt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open to Full-Time Roles</span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-white/5 font-mono text-[11px]">
                <a
                  href={RESUME_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>GitHub</span>
                  <ExternalLink size={9} />
                </a>
                <span className="text-slate-600">•</span>
                <a
                  href={RESUME_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                >
                  <span>LinkedIn</span>
                  <ExternalLink size={9} />
                </a>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={toggleSpotlight}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] font-mono flex items-center gap-1 transition-colors border border-white/10"
                >
                  <Command size={11} />
                  <span>⌘K Search</span>
                </button>

                <button
                  onClick={startTour}
                  className="px-2.5 py-1 rounded-lg bg-blue-600/30 hover:bg-blue-600/40 border border-blue-400/40 text-blue-200 text-[11px] font-medium flex items-center gap-1 transition-colors"
                >
                  <Sparkles size={11} className="text-amber-300" />
                  <span>60s Tour</span>
                </button>
              </div>
            </div>

            {/* System Status & Stack Widget (15% more compact) */}
            <SystemStatusWidget />
          </div>
        </div>

        {/* Draggable macOS Windows Rendering Layer */}
        {/* 1. Resume PDF Window */}
        <WindowFrame
          id="resume"
          title="Rahul_Rathi_Resume_v4.pdf — Preview"
          icon={<FileText size={14} className="text-red-400" />}
        >
          <ResumeWindow />
        </WindowFrame>

        {/* 2. Projects Finder Window */}
        <WindowFrame
          id="projects"
          title="Projects — Finder"
          icon={<FolderGit2 size={14} className="text-blue-400" />}
        >
          <ProjectsWindow />
        </WindowFrame>

        {/* 3. Experience Window */}
        <WindowFrame
          id="experience"
          title="Career & Work Experience — Notes"
          icon={<Briefcase size={14} className="text-indigo-400" />}
        >
          <ExperienceWindow />
        </WindowFrame>

        {/* 4. Education & AWS Window */}
        <WindowFrame
          id="education"
          title="Academics & AWS Certification"
          icon={<GraduationCap size={14} className="text-amber-400" />}
        >
          <EducationWindow />
        </WindowFrame>

        {/* 5. Skills Profiler Window */}
        <WindowFrame
          id="skills"
          title="System Profiler — Tech Stack"
          icon={<Terminal size={14} className="text-emerald-400" />}
        >
          <SkillsWindow />
        </WindowFrame>

        {/* 6. Contact Window */}
        <WindowFrame
          id="contact"
          title="Mail — New Message to Rahul"
          icon={<Mail size={14} className="text-sky-400" />}
        >
          <ContactWindow />
        </WindowFrame>

        {/* 7. About Developer Window */}
        <WindowFrame
          id="about"
          title="About Rahul Rathi"
          icon={<Info size={14} className="text-blue-400" />}
        >
          <AboutWindow />
        </WindowFrame>

        {/* 8. Settings Window */}
        <WindowFrame
          id="settings"
          title="System Settings"
          icon={<Settings size={14} className="text-slate-400" />}
        >
          <SettingsWindow />
        </WindowFrame>
      </div>

      {/* macOS Bottom Dock */}
      <Dock />

      {/* Spotlight Search Overlay */}
      <SpotlightSearch />

      {/* Control Center Overlay */}
      <ControlCenter />
    </div>
  );
};
