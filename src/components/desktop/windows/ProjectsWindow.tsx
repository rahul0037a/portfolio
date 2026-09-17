import React, { useState } from 'react';
import { RESUME_DATA, Project } from '../../../data/resumeData';
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
  Cpu,
  Activity,
  Zap,
  CheckCircle2,
  FolderGit2,
  Briefcase,
  Terminal,
  FileText,
  ChevronRight,
  ArrowLeft,
  LayoutGrid,
  List,
  Search,
} from 'lucide-react';

export const ProjectsWindow: React.FC = () => {
  const { openApp } = useOS();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'architecture' | 'overview'>('architecture');
  const [searchFilter, setSearchFilter] = useState('');

  const activeProject: Project | undefined = RESUME_DATA.projects.find((p) => p.id === selectedProjectId);

  const filteredProjects = RESUME_DATA.projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full bg-[#0a0e17] text-slate-100 font-sans select-none">
      {/* Finder Navigation Toolbar & Breadcrumbs */}
      <div className="px-4 py-2.5 bg-[#0f1422] border-b border-white/10 flex items-center justify-between gap-3 text-xs">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2">
          {selectedProjectId && (
            <button
              onClick={() => setSelectedProjectId(null)}
              className="p-1 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-[11px]"
              title="Back to all projects"
            >
              <ArrowLeft size={13} />
              <span>Projects</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
            <span>Macintosh HD</span>
            <ChevronRight size={12} className="text-slate-600" />
            <span
              onClick={() => setSelectedProjectId(null)}
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
              placeholder="Search projects..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="bg-transparent text-[11px] text-white placeholder-slate-500 focus:outline-none w-full"
            />
          </div>
        )}
      </div>

      {/* Finder Body: Left Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Finder Sidebar: Favorites */}
        <div className="w-44 sm:w-52 bg-[#0c101c] border-r border-white/10 p-3 flex flex-col shrink-0 text-xs">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider px-2 py-1 font-bold">
            Favorites
          </span>
          <div className="mt-1 space-y-0.5">
            <button
              onClick={() => setSelectedProjectId(null)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                !selectedProjectId
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <FolderGit2 size={14} className={!selectedProjectId ? 'text-white' : 'text-blue-400'} />
              <span>All Projects</span>
            </button>

            <button
              onClick={() => openApp('experience')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
            >
              <Briefcase size={14} className="text-indigo-400" />
              <span>Experience</span>
            </button>

            <button
              onClick={() => openApp('skills')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
            >
              <Terminal size={14} className="text-emerald-400" />
              <span>Skills Matrix</span>
            </button>

            <button
              onClick={() => openApp('resume')}
              className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
            >
              <FileText size={14} className="text-rose-400" />
              <span>Resume.pdf</span>
            </button>
          </div>

          <div className="mt-auto p-2.5 rounded-xl bg-white/5 border border-white/5 text-[10px] text-slate-400">
            <div className="text-white font-medium mb-1">Senior Standards</div>
            <p className="leading-relaxed">
              Modular architectures, strict typing, schema validation, and cloud deployments.
            </p>
          </div>
        </div>

        {/* Main Finder Canvas */}
        <div className="flex-1 overflow-auto bg-[#0b0f19]">
          {!selectedProjectId ? (
            /* 1. Folder Grid View of Projects */
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white">Repositories & Applications</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Select a project to inspect its production architecture and code details.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                  {filteredProjects.length} items
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProjectId(p.id)}
                    className="p-4 rounded-2xl bg-[#111624]/80 hover:bg-[#151c2e] border border-white/10 hover:border-blue-500/50 cursor-pointer transition-all shadow-md group relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
                            {p.id === 'wanderlust' ? '🏖️' : p.id === 'foodplay' ? '🥗' : p.id === 'fusecake' ? '🎫' : '✍️'}
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

                        <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                          Inspect →
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                        {p.subtitle}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-1">
                      {p.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeProject ? (
            /* 2. Detailed Project Inspector with Architecture View */
            <div className="flex flex-col h-full">
              {/* Project Header Bar */}
              <div className="p-4 sm:p-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-[#111624]/60 shrink-0">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-xl font-bold text-white">{activeProject.title}</h2>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 font-mono">
                      {activeProject.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">{activeProject.subtitle}</p>
                </div>

                <div className="flex items-center gap-2">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <ExternalLink size={13} />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors border border-white/10"
                    >
                      <Code2 size={13} />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>

              {/* View Switcher Tabs: Architecture (Default!) vs Overview */}
              <div className="px-6 pt-3 flex items-center gap-4 border-b border-white/10 text-xs shrink-0">
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`pb-2 font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === 'architecture'
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers size={13} />
                  <span>Production Architecture</span>
                </button>
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2 font-medium border-b-2 transition-colors ${
                    activeTab === 'overview'
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Technical Details & Highlights
                </button>
              </div>

              {/* Detail Content */}
              <div className="p-6 flex-1 overflow-auto">
                {activeTab === 'architecture' ? (
                  /* Connected 5-Tier Production Pipeline */
                  <div className="max-w-xl space-y-2.5">
                    <div className="text-xs text-slate-400 font-mono mb-2">
                      Connected 5-Tier Production Pipeline:
                    </div>

                    {activeProject.id === 'wanderlust' && (
                      <div className="space-y-2 text-xs">
                        <div className="p-3 rounded-xl bg-[#111624] border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Globe size={15} className="text-blue-400" />
                            <div>
                              <span className="font-bold text-white">01. Client Presentation</span>
                              <p className="text-[11px] text-slate-400">Leaflet.js map pins & coordinate geocoding query</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 rounded text-blue-300">Leaflet • EJS</span>
                        </div>
                        <div className="text-center text-slate-500 font-bold">↓</div>
                        <div className="p-3 rounded-xl bg-[#111624] border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Server size={15} className="text-indigo-400" />
                            <div>
                              <span className="font-bold text-white">02. Gateway & MVC Routing</span>
                              <p className="text-[11px] text-slate-400">Express.js endpoint routing & input sanitization</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 rounded text-indigo-300">Express • Node</span>
                        </div>
                        <div className="text-center text-slate-500 font-bold">↓</div>
                        <div className="p-3 rounded-xl bg-[#111624] border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <ShieldCheck size={15} className="text-emerald-400" />
                            <div>
                              <span className="font-bold text-white">03. Auth & Session Guard</span>
                              <p className="text-[11px] text-slate-400">Passport.js authentication, Joi schema validation & Helmet headers</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 rounded text-emerald-300">Passport • Helmet</span>
                        </div>
                        <div className="text-center text-slate-500 font-bold">↓</div>
                        <div className="p-3 rounded-xl bg-[#111624] border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Database size={15} className="text-teal-400" />
                            <div>
                              <span className="font-bold text-white">04. Data Persistence</span>
                              <p className="text-[11px] text-slate-400">MongoDB cluster with Mongoose relational schemas</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 rounded text-teal-300">MongoDB • Mongoose</span>
                        </div>
                        <div className="text-center text-slate-500 font-bold">↓</div>
                        <div className="p-3 rounded-xl bg-[#111624] border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Cloud size={15} className="text-amber-400" />
                            <div>
                              <span className="font-bold text-white">05. Cloud Infrastructure</span>
                              <p className="text-[11px] text-slate-400">Cloudinary distributed asset CDN & Render PaaS hosting</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 rounded text-amber-300">Cloudinary • Render</span>
                        </div>
                      </div>
                    )}

                    {activeProject.id === 'foodplay' && (
                      <div className="space-y-2 text-xs">
                        <div className="p-3 rounded-xl bg-[#111624] border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Activity size={15} className="text-teal-400" />
                            <div>
                              <span className="font-bold text-white">01. Biometrics Intake</span>
                              <p className="text-[11px] text-slate-400">Weight, height, age, activity level parameter intake</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 rounded text-teal-300">Client UI</span>
                        </div>
                        <div className="text-center text-slate-500 font-bold">↓</div>
                        <div className="p-3 rounded-xl bg-[#111624] border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Server size={15} className="text-cyan-400" />
                            <div>
                              <span className="font-bold text-white">02. Flask Microservice</span>
                              <p className="text-[11px] text-slate-400">High performance lightweight Python backend API</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 rounded text-cyan-300">Python • Flask</span>
                        </div>
                        <div className="text-center text-slate-500 font-bold">↓</div>
                        <div className="p-3 rounded-xl bg-[#111624] border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Cpu size={15} className="text-indigo-400" />
                            <div>
                              <span className="font-bold text-white">03. Mifflin-St Jeor Engine</span>
                              <p className="text-[11px] text-slate-400">Computes Basal Metabolic Rate (BMR) & Daily TDEE math</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 rounded text-indigo-300">Algorithm</span>
                        </div>
                        <div className="text-center text-slate-500 font-bold">↓</div>
                        <div className="p-3 rounded-xl bg-[#111624] border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Zap size={15} className="text-amber-400" />
                            <div>
                              <span className="font-bold text-white">04. Macro Partitioning</span>
                              <p className="text-[11px] text-slate-400">Caloric distribution into protein, carb & lipid targets</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 rounded text-amber-300">Cut • Bulk</span>
                        </div>
                        <div className="text-center text-slate-500 font-bold">↓</div>
                        <div className="p-3 rounded-xl bg-[#111624] border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Cloud size={15} className="text-emerald-400" />
                            <div>
                              <span className="font-bold text-white">05. Cloud Deployment</span>
                              <p className="text-[11px] text-slate-400">Verified across 50+ real active users with &lt;20ms latency</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 rounded text-emerald-300">Render PaaS</span>
                        </div>
                      </div>
                    )}

                    {activeProject.id === 'fusecake' && (
                      <div className="space-y-2 text-xs">
                        <div className="p-3 rounded-xl bg-[#111624] border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Globe size={15} className="text-cyan-400" />
                            <div>
                              <span className="font-bold text-white">01. Discovery Interface</span>
                              <p className="text-[11px] text-slate-400">Multi-criteria event search by keyword, city, category</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 rounded text-cyan-300">Next.js 14</span>
                        </div>
                        <div className="text-center text-slate-500 font-bold">↓</div>
                        <div className="p-3 rounded-xl bg-[#111624] border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Server size={15} className="text-indigo-400" />
                            <div>
                              <span className="font-bold text-white">02. App Router Layer</span>
                              <p className="text-[11px] text-slate-400">Type-safe server data dispatch and curated feed delivery</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 rounded text-indigo-300">SSR Pipeline</span>
                        </div>
                        <div className="text-center text-slate-500 font-bold">↓</div>
                        <div className="p-3 rounded-xl bg-[#111624] border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <ShieldCheck size={15} className="text-emerald-400" />
                            <div>
                              <span className="font-bold text-white">03. Stateful Return Flow</span>
                              <p className="text-[11px] text-slate-400">Preserves user intent, gates onboarding, directs to registration</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 rounded text-emerald-300">2.4x Conversion</span>
                        </div>
                        <div className="text-center text-slate-500 font-bold">↓</div>
                        <div className="p-3 rounded-xl bg-[#111624] border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Layers size={15} className="text-purple-400" />
                            <div>
                              <span className="font-bold text-white">04. 35+ Component System</span>
                              <p className="text-[11px] text-slate-400">Modular reusable cards, filter drawers, event tickets</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 rounded text-purple-300">UI Kit</span>
                        </div>
                      </div>
                    )}

                    {activeProject.id === 'blog-blitz' && (
                      <div className="space-y-2 text-xs">
                        <div className="p-3 rounded-xl bg-[#111624] border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Globe size={15} className="text-blue-400" />
                            <div>
                              <span className="font-bold text-white">01. React Workspace</span>
                              <p className="text-[11px] text-slate-400">Live preview editor & client state management</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 rounded text-blue-300">React • Tailwind</span>
                        </div>
                        <div className="text-center text-slate-500 font-bold">↓</div>
                        <div className="p-3 rounded-xl bg-[#111624] border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <ShieldCheck size={15} className="text-indigo-400" />
                            <div>
                              <span className="font-bold text-white">02. JWT Authenticated Endpoints</span>
                              <p className="text-[11px] text-slate-400">Secure tokens, role authorizations & drafts engine</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 rounded text-indigo-300">Express • JWT</span>
                        </div>
                        <div className="text-center text-slate-500 font-bold">↓</div>
                        <div className="p-3 rounded-xl bg-[#111624] border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Database size={15} className="text-emerald-400" />
                            <div>
                              <span className="font-bold text-white">03. MongoDB Articles</span>
                              <p className="text-[11px] text-slate-400">Indexed document schemas for fast article lookups</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 rounded text-emerald-300">MongoDB</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Technical Details & Highlights */
                  <div className="space-y-6 max-w-2xl">
                    <div>
                      <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                        System Overview
                      </h3>
                      <p className="text-sm text-slate-200 leading-relaxed bg-[#111624]/60 p-3.5 rounded-xl border border-white/5">
                        {activeProject.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                        Engineering Highlights
                      </h3>
                      <ul className="space-y-2">
                        {activeProject.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                            <CheckCircle2 size={15} className="text-blue-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                        Technologies
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {activeProject.tags.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Proper Finder Status Bar at the bottom */}
      <div className="h-7 px-4 bg-[#0a0d16] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0">
        <span>4 projects • 2 internships • AWS Certified</span>
        <span className="text-emerald-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Available for opportunities
        </span>
      </div>
    </div>
  );
};
