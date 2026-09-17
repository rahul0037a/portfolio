import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RESUME_DATA, Project } from '../data/resumeData';
import { ExternalLink, Layers, ShieldCheck, Database, Globe, Server, CheckCircle2, Sparkles, ArrowUpRight, Code, MapPin, Cpu } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { TiltCard } from './TiltCard';

export const ScrollyProjects: React.FC = () => {
  const { projects } = RESUME_DATA;
  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0].id);
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'security'>('overview');

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  return (
    <section id="projects" className="relative py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 overflow-hidden z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-semibold flex items-center gap-1.5">
            <Sparkles size={14} />
            Featured Work // Production Engineering
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Flagship Systems & <span className="text-gradient-cyan">Deployed Inventions</span>
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
              Full-stack web platforms engineered from ground up — featuring modular MVC architectures, secure session handling, custom algorithmic engines, and live cloud deployments.
            </p>
          </div>

          {/* Project Selector Tabs */}
          <div className="flex items-center gap-2 bg-[#050814] p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto shadow-inner">
            {projects.map((proj) => (
              <button
                key={proj.id}
                onClick={() => {
                  setActiveProjectId(proj.id);
                  setActiveTab('overview');
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-2 ${
                  activeProjectId === proj.id
                    ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold shadow-neon-cyan'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span>{proj.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Project Main Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left Column: Project Detail & Deliverables */}
            <div className="lg:col-span-7 flex flex-col justify-between card-prism p-6 sm:p-8 rounded-3xl border-slate-800/90 shadow-card-prism relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

              <div>
                {/* Meta header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-mono text-cyan-300 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 font-semibold">
                    {activeProject.category}
                  </span>
                  {activeProject.metrics && (
                    <span className="text-xs font-mono text-emerald-300 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-1.5 font-medium">
                      <Sparkles size={12} className="text-emerald-400" />
                      {activeProject.metrics}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  {activeProject.title}
                </h3>
                <p className="text-sm sm:text-base font-medium text-slate-300 mt-1.5">
                  {activeProject.subtitle}
                </p>

                <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                  {activeProject.description}
                </p>

                {/* Sub-tab navigation */}
                <div className="mt-6 flex items-center gap-2 border-b border-slate-800 pb-3">
                  {[
                    { id: 'overview', label: 'Key Deliverables' },
                    { id: 'architecture', label: 'System Architecture' },
                    { id: 'security', label: 'Security & Cloud' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`text-xs font-mono px-3 py-1.5 rounded-lg transition-all ${
                        activeTab === tab.id
                          ? 'bg-slate-800 text-cyan-300 font-semibold border border-slate-700'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="mt-4 min-h-[160px]">
                  {activeTab === 'overview' && (
                    <div className="space-y-3">
                      {activeProject.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                          <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400 font-mono text-[10px]">
                            0{idx + 1}
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'architecture' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3.5 rounded-xl bg-[#060914] border border-slate-800">
                        <div className="text-cyan-400 text-[10px] uppercase font-bold mb-1">Frontend Layer</div>
                        <div className="text-slate-200 font-sans">{activeProject.architecture.frontend}</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#060914] border border-slate-800">
                        <div className="text-indigo-400 text-[10px] uppercase font-bold mb-1">Backend REST API</div>
                        <div className="text-slate-200 font-sans">{activeProject.architecture.backend}</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#060914] border border-slate-800 sm:col-span-2">
                        <div className="text-teal-400 text-[10px] uppercase font-bold mb-1">Database & Data Schemas</div>
                        <div className="text-slate-200 font-sans">{activeProject.architecture.database}</div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'security' && (
                    <div className="p-4 rounded-xl bg-[#060914] border border-slate-800 text-xs font-mono space-y-3">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold">
                        <ShieldCheck size={16} />
                        <span>Security & Deployment Stack</span>
                      </div>
                      <p className="text-slate-300 font-sans leading-relaxed">
                        {activeProject.architecture.securityCloud}
                      </p>
                      <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                        Verified zero critical CVEs, Helmet HTTP protection, and CORS configuration.
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tech Badges & Launch CTAs */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-[#050814] border border-slate-800 text-slate-300 hover:border-cyan-500/40 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-bold text-xs shadow-neon-cyan flex items-center gap-2 transition-all hover:scale-105"
                    >
                      <span>Launch Live Web Application</span>
                      <ArrowUpRight size={15} />
                    </a>
                  )}

                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl card-prism hover:bg-slate-900 border border-slate-700/80 text-slate-200 hover:text-white text-xs font-mono flex items-center gap-2 transition-all hover:scale-105"
                    >
                      <GithubIcon size={16} />
                      <span>Inspect Repository</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Visual Simulated App Viewport with 3D Mouse Tilt */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <TiltCard className="card-prism p-6 border-slate-800/90 flex-1 flex flex-col justify-between shadow-card-prism relative overflow-hidden" glareColor="rgba(0, 240, 255, 0.18)">
                <div className="absolute bottom-0 right-0 w-52 h-52 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

                <div>
                  {/* Browser Window Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="px-3 py-1 rounded-md bg-[#050814] border border-slate-800 text-[10px] font-mono text-slate-400 truncate max-w-[200px]">
                      {activeProject.liveUrl ? activeProject.liveUrl.replace('https://', '') : 'github.com/rahul0037a'}
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Live" />
                  </div>

                  {/* Visual Blueprint / Project graphic */}
                  {activeProject.id === 'wanderlust' && (
                    <div className="p-4 rounded-2xl bg-[#050814] border border-slate-800/80 space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span className="flex items-center gap-1 text-cyan-400">
                          <MapPin size={13} />
                          OpenStreetMap Nominatim
                        </span>
                        <span className="text-emerald-400">200 OK</span>
                      </div>
                      <div className="h-28 rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-slate-800 flex flex-col items-center justify-center text-center p-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-dot-grid opacity-30" />
                        <div className="relative z-10">
                          <div className="text-cyan-300 font-bold text-sm">Leaflet.js Dynamic Geocoding</div>
                          <div className="text-slate-400 text-[11px] mt-1">Cloudinary Image CDN • Passport.js Sessions</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                        <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                          <div className="font-bold text-cyan-400">MVC</div> Pattern
                        </div>
                        <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                          <div className="font-bold text-emerald-400">Mongoose</div> Schemas
                        </div>
                        <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                          <div className="font-bold text-indigo-400">Helmet</div> Headers
                        </div>
                      </div>
                    </div>
                  )}

                  {activeProject.id === 'foodplay' && (
                    <div className="p-4 rounded-2xl bg-[#050814] border border-slate-800/80 space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span className="text-teal-400 font-bold">BMR / TDEE Calculation Engine</span>
                        <span className="text-emerald-400">50+ Users</span>
                      </div>
                      <div className="h-28 rounded-xl bg-gradient-to-br from-slate-900 to-teal-950/40 border border-slate-800 flex flex-col items-center justify-center text-center p-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-dot-grid opacity-30" />
                        <div className="relative z-10">
                          <div className="text-teal-300 font-bold text-sm">Target Macro Optimization</div>
                          <div className="text-slate-400 text-[11px] mt-1">Cut • Bulk • Maintain Target Calories</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                        <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                          <div className="font-bold text-teal-400">Flask</div> REST API
                        </div>
                        <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                          <div className="font-bold text-cyan-400">Biometric</div> Inputs
                        </div>
                        <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                          <div className="font-bold text-amber-400">Render</div> PaaS
                        </div>
                      </div>
                    </div>
                  )}

                  {activeProject.id === 'blog-blitz' && (
                    <div className="p-4 rounded-2xl bg-[#050814] border border-slate-800/80 space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span className="text-indigo-400 font-bold">Team Collaborative Architecture</span>
                        <span className="text-emerald-400">8+ Pages</span>
                      </div>
                      <div className="h-28 rounded-xl bg-gradient-to-br from-slate-900 to-fuchsia-950/40 border border-slate-800 flex flex-col items-center justify-center text-center p-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-dot-grid opacity-30" />
                        <div className="relative z-10">
                          <div className="text-indigo-300 font-bold text-sm">Mobile-First UI/UX System</div>
                          <div className="text-slate-400 text-[11px] mt-1">Git Branch & Pull Request Workflows</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                        <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                          <div className="font-bold text-indigo-400">Vercel</div> Edge CDN
                        </div>
                        <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                          <div className="font-bold text-fuchsia-400">3-Member</div> Team Git
                        </div>
                        <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                          <div className="font-bold text-cyan-400">Responsive</div> Layouts
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Verification Note */}
                <div className="mt-5 p-3.5 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-center">
                  <span className="text-[11px] text-cyan-300 font-mono flex items-center justify-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400" />
                    Production code extracted directly from resume
                  </span>
                </div>
              </TiltCard>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
