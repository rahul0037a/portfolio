import React, { useState, useEffect } from 'react';
import { RESUME_DATA, Project, ArchitectureComponent } from '../../../data/resumeData';
import { useOS } from '../../../context/OSContext';
import {
  ExternalLink,
  Code2,
  Layers,
  Globe,
  Server,
  Database,
  ShieldCheck,
  Cloud,
  CheckCircle2,
  FolderGit2,
  Briefcase,
  Terminal,
  FileText,
  ChevronRight,
  ArrowLeft,
  Search,
  HelpCircle,
  Sparkles,
  Info,
  MapPin,
  Cpu,
  Compass,
} from 'lucide-react';

export const ProjectsWindow: React.FC = () => {
  const { openApp, selectedProjectId: osSelectedId, setSelectedProjectId: setOsSelectedId } = useOS();
  const [selectedProjectId, setLocalSelectedProjectId] = useState<string | null>('wanderlust');
  const [activeTab, setActiveTab] = useState<'architecture' | 'problem' | 'decisions' | 'features' | 'proof'>('architecture');
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>('Passport.js');
  const [searchFilter, setSearchFilter] = useState('');

  // Sync with OSContext selectedProjectId (e.g. from Tour Step 3 or external links)
  useEffect(() => {
    if (osSelectedId !== undefined && osSelectedId !== null) {
      setLocalSelectedProjectId(osSelectedId);
      if (osSelectedId === 'wanderlust') {
        setSelectedComponentId('Passport.js');
      } else {
        const p = RESUME_DATA.projects.find((proj) => proj.id === osSelectedId);
        if (p && p.architectureTree.pipeline.length > 0) {
          setSelectedComponentId(p.architectureTree.pipeline[0]);
        }
      }
    }
  }, [osSelectedId]);

  const selectProject = (id: string | null) => {
    setLocalSelectedProjectId(id);
    setOsSelectedId(id);
    if (id === 'wanderlust') {
      setSelectedComponentId('Passport.js');
    } else if (id) {
      const p = RESUME_DATA.projects.find((proj) => proj.id === id);
      if (p && p.architectureTree.pipeline.length > 0) {
        setSelectedComponentId(p.architectureTree.pipeline[0]);
      }
    }
  };

  const activeProject: Project | undefined = RESUME_DATA.projects.find((p) => p.id === selectedProjectId);

  const filteredProjects = RESUME_DATA.projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  const activeComponent: ArchitectureComponent | undefined =
    activeProject && selectedComponentId
      ? activeProject.architectureTree.components[selectedComponentId]
      : undefined;

  return (
    <div className="flex flex-col h-full bg-[#0a0e17] text-slate-100 font-sans select-none">
      {/* Finder Navigation Toolbar & Breadcrumbs */}
      <div className="px-3 sm:px-4 py-2 bg-[#0f1422] border-b border-white/10 flex items-center justify-between gap-2 sm:gap-3 text-xs shrink-0">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2">
          {selectedProjectId && (
            <button
              onClick={() => selectProject(null)}
              className="p-1 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-[11px]"
              title="Back to all projects"
            >
              <ArrowLeft size={13} />
              <span className="hidden xs:inline">All Projects</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
            <span>Finder</span>
            <ChevronRight size={12} className="text-slate-600" />
            <span
              onClick={() => selectProject(null)}
              className="hover:text-slate-200 cursor-pointer"
            >
              Projects
            </span>
            {activeProject && (
              <>
                <ChevronRight size={12} className="text-slate-600" />
                <span className="text-blue-400 font-semibold">{activeProject.title}</span>
              </>
            )}
          </div>
        </div>

        {/* Finder Search */}
        {!selectedProjectId && (
          <div className="flex items-center gap-2 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 text-xs text-slate-300 w-44 sm:w-56">
            <Search size={12} className="text-slate-400" />
            <input
              type="text"
              placeholder="Filter projects..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="bg-transparent text-[11px] text-white placeholder-slate-500 focus:outline-none w-full font-mono"
            />
          </div>
        )}
      </div>

      {/* Finder Body: Left Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Finder Sidebar: Favorites */}
        <div className="hidden md:flex md:w-44 lg:w-48 bg-[#0c101c] border-r border-white/10 p-3 flex-col shrink-0 text-xs">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider px-2 py-1 font-bold">
            Repositories
          </span>
          <div className="mt-1 space-y-0.5">
            <button
              onClick={() => selectProject(null)}
              className={`w-full text-left px-2 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                !selectedProjectId
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <FolderGit2 size={13} className={!selectedProjectId ? 'text-white' : 'text-blue-400'} />
              <span>All Projects</span>
            </button>

            {RESUME_DATA.projects.map((p) => {
              const isCurrent = p.id === selectedProjectId;
              return (
                <button
                  key={p.id}
                  onClick={() => selectProject(p.id)}
                  className={`w-full text-left px-2 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    isCurrent
                      ? 'bg-blue-600/30 border border-blue-500/40 text-blue-200 font-semibold'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="truncate">{p.title}</span>
                  {p.id === 'wanderlust' && (
                    <span className="text-[9px] font-mono text-amber-300 bg-amber-500/15 px-1 rounded">
                      Featured
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider px-2 py-1 font-bold">
              Quick Links
            </span>
            <div className="mt-1 space-y-0.5">
              <button
                onClick={() => openApp('experience')}
                className="w-full text-left px-2 py-1.5 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
              >
                <Briefcase size={13} className="text-indigo-400" />
                <span>Experience</span>
              </button>
              <button
                onClick={() => openApp('skills')}
                className="w-full text-left px-2 py-1.5 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
              >
                <Terminal size={13} className="text-emerald-400" />
                <span>Tech Stack</span>
              </button>
              <button
                onClick={() => openApp('resume')}
                className="w-full text-left px-2 py-1.5 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
              >
                <FileText size={13} className="text-rose-400" />
                <span>Resume (PDF)</span>
              </button>
            </div>
          </div>

          <div className="mt-auto p-2.5 rounded-xl bg-white/5 border border-white/5 text-[10px] text-slate-400">
            <div className="text-amber-300 font-bold mb-1 flex items-center gap-1 font-mono">
              <Sparkles size={11} />
              <span>Interview Ready</span>
            </div>
            <p className="leading-relaxed">
              Every project details the problem, production architecture, engineering trade-offs, and proof.
            </p>
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 overflow-y-auto bg-[#0b0f19] custom-scrollbar">
          {!selectedProjectId ? (
            /* 1. Projects Directory Grid */
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white">Software Engineering Portfolio</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Click any application to inspect its production architecture, engineering decisions, and live proof.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-blue-300 bg-blue-500/10 border border-blue-500/30 px-2.5 py-1 rounded-md">
                  {filteredProjects.length} Repositories
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => selectProject(p.id)}
                    className="p-4 rounded-2xl bg-[#111624]/90 hover:bg-[#151c2e] border border-white/10 hover:border-blue-500/60 cursor-pointer transition-all shadow-md group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
                            {p.id === 'wanderlust' ? '🏖️' : p.id === 'foodplay' ? '🥗' : '✍️'}
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                              {p.title}
                            </h3>
                            <span className="text-[10px] font-mono text-blue-300">
                              {p.category}
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono text-slate-300 px-2 py-0.5 rounded bg-white/5 border border-white/10 group-hover:border-blue-400/40">
                          Inspect →
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                        {p.subtitle}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {p.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400">
                        {p.proof.badges[0] || 'Verified'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeProject ? (
            /* 2. Detailed Project Deep-Dive: 5-Pillar Standard Structure */
            <div className="flex flex-col min-h-full">
              {/* Project Header Bar with Proof Actions */}
              <div className="p-4 sm:p-5 border-b border-white/10 bg-[#111624]/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      {activeProject.title}
                    </h2>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 font-mono">
                      {activeProject.category}
                    </span>
                    {activeProject.id === 'wanderlust' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 font-mono font-bold">
                        Architecture Centerpiece
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">{activeProject.subtitle}</p>
                </div>

                {/* Proof Direct Actions */}
                <div className="flex items-center gap-2">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <ExternalLink size={13} />
                      <span>Live URL</span>
                    </a>
                  )}
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/15 hover:text-white"
                    >
                      <Code2 size={13} />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>

              {/* 5-Pillar Standard Navigation Tabs */}
              <div className="px-4 sm:px-6 bg-[#0e1322] border-b border-white/10 flex items-center gap-2 sm:gap-4 overflow-x-auto text-xs shrink-0 no-scrollbar">
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`py-2.5 px-2 font-medium border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'architecture'
                      ? 'border-blue-500 text-blue-400 font-bold'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers size={13} />
                  <span>Architecture</span>
                  <span className="text-[9px] font-mono px-1 rounded bg-blue-500/20 text-blue-300">Clickable</span>
                </button>

                <button
                  onClick={() => setActiveTab('decisions')}
                  className={`py-2.5 px-2 font-medium border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'decisions'
                      ? 'border-blue-500 text-blue-400 font-bold'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <HelpCircle size={13} />
                  <span>Engineering Decisions</span>
                  <span className="text-[9px] font-mono px-1 rounded bg-white/10 text-slate-300">Why X?</span>
                </button>

                <button
                  onClick={() => setActiveTab('problem')}
                  className={`py-2.5 px-2 font-medium border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'problem'
                      ? 'border-blue-500 text-blue-400 font-bold'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Info size={13} />
                  <span>Problem</span>
                </button>

                <button
                  onClick={() => setActiveTab('features')}
                  className={`py-2.5 px-2 font-medium border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'features'
                      ? 'border-blue-500 text-blue-400 font-bold'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles size={13} />
                  <span>Features</span>
                </button>

                <button
                  onClick={() => setActiveTab('proof')}
                  className={`py-2.5 px-2 font-medium border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'proof'
                      ? 'border-blue-500 text-blue-400 font-bold'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <CheckCircle2 size={13} />
                  <span>Proof</span>
                </button>
              </div>

              {/* Tab Contents */}
              <div className="p-4 sm:p-6 flex-1">
                {/* 1. PRODUCTION ARCHITECTURE CENTERPIECE */}
                {activeTab === 'architecture' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left: Connected Flow Pipeline Tree */}
                    <div className="lg:col-span-7 space-y-3">
                      <div className="flex items-center justify-between pb-1">
                        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                          <Layers size={13} className="text-blue-400" />
                          <span>Interactive Production Architecture</span>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-400/20">
                          Click any node to inspect
                        </span>
                      </div>

                      {/* Main Pipeline Nodes */}
                      <div className="space-y-1.5 font-mono text-xs">
                        {activeProject.architectureTree.pipeline.map((nodeKey, idx) => {
                          const isPassportCompound = nodeKey === 'PASSPORT + JOI + HELMET';
                          const isSelected = selectedComponentId === nodeKey || (isPassportCompound && ['Passport.js', 'Joi', 'Helmet'].includes(selectedComponentId || ''));
                          const comp = activeProject.architectureTree.components[nodeKey];

                          return (
                            <React.Fragment key={nodeKey}>
                              <div
                                onClick={() => setSelectedComponentId(isPassportCompound ? 'Passport.js' : nodeKey)}
                                className={`p-3 rounded-xl border transition-all cursor-pointer shadow-sm relative group ${
                                  isSelected
                                    ? 'bg-blue-950/60 border-blue-400/80 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                                    : 'bg-[#111624] border-white/10 hover:border-blue-400/40 hover:bg-[#151c2e]'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2.5">
                                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                                      isSelected ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-300'
                                    }`}>
                                      {idx + 1}
                                    </div>
                                    <div>
                                      <span className={`font-bold tracking-wide ${isSelected ? 'text-blue-300' : 'text-white'}`}>
                                        {nodeKey}
                                      </span>
                                      {comp && (
                                        <p className="text-[11px] font-sans text-slate-400 mt-0.5 line-clamp-1">
                                          {comp.role}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  <span className={`text-[10px] px-2 py-0.5 rounded border ${
                                    isSelected
                                      ? 'bg-blue-500/30 border-blue-400/50 text-blue-200'
                                      : 'bg-white/5 border-white/10 text-slate-400'
                                  }`}>
                                    {comp?.category.toUpperCase() || 'CORE'}
                                  </span>
                                </div>

                                {/* Clickable sub-component pills for Passport + Joi + Helmet */}
                                {isPassportCompound && (
                                  <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                                    {['Passport.js', 'Joi', 'Helmet'].map((subKey) => {
                                      const isSubActive = selectedComponentId === subKey;
                                      return (
                                        <button
                                          key={subKey}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedComponentId(subKey);
                                          }}
                                          className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all ${
                                            isSubActive
                                              ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                                              : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                                          }`}
                                        >
                                          {subKey}
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>

                              {/* Downward Flow Arrow */}
                              {idx < activeProject.architectureTree.pipeline.length - 1 && (
                                <div className="flex items-center justify-center my-[-2px] text-slate-500 font-mono text-xs">
                                  <span>↓</span>
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}

                        {/* Architecture Branch Tree (e.g. Cloudinary, Nominatim, Leaflet) */}
                        {activeProject.architectureTree.branches.map((branch) => (
                          <div key={branch.parentId} className="pt-2 pl-4 sm:pl-6 border-l-2 border-dashed border-blue-500/30 ml-4 space-y-2 mt-2">
                            <div className="text-[10px] font-mono text-blue-400 font-semibold uppercase tracking-wider">
                              ├── {branch.label}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              {branch.items.map((itemKey) => {
                                const isSelected = selectedComponentId === itemKey;
                                const comp = activeProject.architectureTree.components[itemKey];

                                return (
                                  <div
                                    key={itemKey}
                                    onClick={() => setSelectedComponentId(itemKey)}
                                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                                      isSelected
                                        ? 'bg-cyan-950/70 border-cyan-400/80 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                                        : 'bg-[#111624] border-white/10 hover:border-cyan-400/40'
                                    }`}
                                  >
                                    <div className="text-[11px] font-bold text-white group-hover:text-cyan-300">
                                      {itemKey}
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 font-sans">
                                      {comp?.role || 'Third-party integration'}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Detailed Component Inspector Panel */}
                    <div className="lg:col-span-5">
                      <div className="sticky top-4 p-4 sm:p-5 rounded-2xl bg-[#111624] border border-white/15 shadow-xl space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                            <Info size={12} className="text-cyan-400" />
                            COMPONENT INSPECTOR
                          </span>
                          {activeComponent && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase">
                              {activeComponent.category}
                            </span>
                          )}
                        </div>

                        {activeComponent ? (
                          <div className="space-y-3.5">
                            <div>
                              <h3 className="text-lg font-bold text-white">
                                {activeComponent.name}
                              </h3>
                              <p className="text-xs font-mono text-cyan-400 mt-1">
                                {activeComponent.role}
                              </p>
                            </div>

                            <div className="p-3.5 rounded-xl bg-[#0a0e17] border border-white/10 text-xs text-slate-300 leading-relaxed space-y-2">
                              <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block font-bold">
                                Interview Talking Point & Production Role:
                              </span>
                              <p>{activeComponent.explanation}</p>
                            </div>

                            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                              <span>Verified Implementation</span>
                              <span className="text-emerald-400 font-semibold">Active in Repo</span>
                            </div>
                          </div>
                        ) : (
                          <div className="py-8 text-center text-xs text-slate-400">
                            Click any component on the left to inspect its role and interview rationale.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. ENGINEERING DECISIONS (Why X?) */}
                {activeTab === 'decisions' && (
                  <div className="space-y-4 max-w-3xl">
                    <div className="border-b border-white/10 pb-3">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <HelpCircle size={15} className="text-amber-400" />
                        <span>Architectural Trade-offs & Engineering Decisions</span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Concrete answers to interview questions explaining why specific technologies and patterns were chosen over alternatives.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {activeProject.engineeringDecisions.map((dec, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-[#111624] border border-white/10 space-y-2.5"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-blue-600/30 border border-blue-400/40 text-blue-300 text-[10px] font-mono flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              <span>{dec.question}</span>
                            </h4>
                          </div>

                          <div className="text-xs font-mono text-blue-300 bg-blue-500/10 p-2 rounded-lg border border-blue-500/20">
                            <strong className="text-blue-400 uppercase text-[10px] block mb-0.5">Core Decision:</strong>
                            {dec.answer}
                          </div>

                          <div className="text-xs text-slate-300 leading-relaxed space-y-1">
                            <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold block">
                              Technical Rationale:
                            </span>
                            <p>{dec.rationale}</p>
                          </div>

                          {dec.tradeOff && (
                            <div className="pt-2 border-t border-white/5 text-xs text-slate-400 leading-relaxed font-mono">
                              <span className="text-amber-400/90 font-bold uppercase text-[10px] block mb-0.5">
                                Trade-off & Mitigation:
                              </span>
                              <p className="text-[11px] text-slate-300 font-sans">{dec.tradeOff}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. PROBLEM (What were you building?) */}
                {activeTab === 'problem' && (
                  <div className="space-y-5 max-w-3xl">
                    <div className="p-4 rounded-2xl bg-[#111624] border border-white/10 space-y-2">
                      <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider font-bold">
                        What were you building?
                      </span>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {activeProject.problem.whatWereYouBuilding}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                        Core Engineering Challenges Solved:
                      </span>
                      <ul className="space-y-2">
                        {activeProject.problem.challenges.map((ch, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 bg-[#111624]/60 p-3 rounded-xl border border-white/5">
                            <CheckCircle2 size={15} className="text-blue-400 shrink-0 mt-0.5" />
                            <span>{ch}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center justify-between">
                      <span className="font-mono text-slate-400">Target Users & Audience:</span>
                      <span className="font-medium text-white">{activeProject.problem.targetUsers}</span>
                    </div>
                  </div>
                )}

                {/* 4. FEATURES */}
                {activeTab === 'features' && (
                  <div className="space-y-4 max-w-3xl">
                    <div className="border-b border-white/10 pb-2">
                      <h3 className="text-sm font-bold text-white">Shipped Functional Features</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Key user-facing modules and backend business logic.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeProject.features.map((feat, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-xl bg-[#111624] border border-white/10 space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-white">{feat.name}</h4>
                            {feat.tag && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-400/20">
                                {feat.tag}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed font-sans">
                            {feat.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. PROOF */}
                {activeTab === 'proof' && (
                  <div className="space-y-5 max-w-3xl">
                    <div className="p-4 rounded-2xl bg-[#111624] border border-white/10 space-y-3">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                        Verification & Proof
                      </span>
                      <p className="text-xs sm:text-sm text-slate-200">
                        {activeProject.proof.summary}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {activeProject.proof.badges.map((b, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-medium flex items-center gap-1.5"
                          >
                            <CheckCircle2 size={12} />
                            <span>{b}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Verification Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeProject.liveUrl && (
                        <a
                          href={activeProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 transition-colors flex items-center justify-between group"
                        >
                          <div>
                            <div className="text-sm font-bold text-white group-hover:text-blue-300">Live URL Deployment</div>
                            <div className="text-xs text-slate-400 font-mono mt-0.5 truncate max-w-[200px]">
                              {activeProject.liveUrl}
                            </div>
                          </div>
                          <ExternalLink size={16} className="text-blue-400 group-hover:scale-110 transition-transform" />
                        </a>
                      )}

                      {activeProject.githubUrl && (
                        <a
                          href={activeProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 transition-colors flex items-center justify-between group"
                        >
                          <div>
                            <div className="text-sm font-bold text-white group-hover:text-slate-200">GitHub Source Code</div>
                            <div className="text-xs text-slate-400 font-mono mt-0.5">
                              Open Source Repository
                            </div>
                          </div>
                          <Code2 size={16} className="text-slate-300 group-hover:scale-110 transition-transform" />
                        </a>
                      )}
                    </div>

                    {/* Performance / Verification Metrics */}
                    <div className="p-3.5 rounded-xl bg-[#0a0e17] border border-white/10 text-xs font-mono text-slate-300 flex items-center justify-between">
                      <span className="text-slate-400">Production Metrics:</span>
                      <span className="text-blue-300">{activeProject.proof.metrics}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Finder Status Bar */}
      <div className="h-7 px-4 bg-[#0a0d16] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0">
        <span>3 Production Projects • Interactive Architecture Engine</span>
        <span className="text-emerald-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Production Verified
        </span>
      </div>
    </div>
  );
};
