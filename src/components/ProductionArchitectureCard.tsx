import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Server, ShieldCheck, Database, Cloud, Activity, Cpu, Zap, ArrowDown, Sparkles, CheckCircle2 } from 'lucide-react';

type ArchitectureId = 'wanderlust' | 'foodplay' | 'fusecake';

interface ArchitectureStep {
  label: string;
  name: string;
  detail: string;
  tech: string;
  badge: string;
  icon: React.ReactNode;
}

interface ArchitectureFlow {
  id: ArchitectureId;
  name: string;
  badge: string;
  badgeColor: string;
  latency: string;
  steps: ArchitectureStep[];
}

const FLOWS: Record<ArchitectureId, ArchitectureFlow> = {
  wanderlust: {
    id: 'wanderlust',
    name: 'WanderLust',
    badge: 'MVC Vacation Rental',
    badgeColor: 'border-indigo-500/40 text-indigo-300 bg-indigo-500/10',
    latency: 'MVC REST Routing',
    steps: [
      {
        label: '01. Client Presentation',
        name: 'Browser Client + Leaflet.js',
        detail: 'Interactive map pins & coordinate geocoding query',
        tech: 'Leaflet.js • EJS',
        badge: 'Client',
        icon: <Globe size={13} className="text-cyan-400" />
      },
      {
        label: '02. Gateway & Routing',
        name: 'Express.js MVC Router',
        detail: 'RESTful endpoint dispatch & input sanitization',
        tech: 'Express.js • Node.js',
        badge: 'Gateway',
        icon: <Server size={13} className="text-indigo-400" />
      },
      {
        label: '03. Auth & Guard',
        name: 'Passport.js & Helmet Protection',
        detail: 'Joi schema validation, HTTP-only cookie sessions',
        tech: 'Helmet • connect-mongo',
        badge: 'Security',
        icon: <ShieldCheck size={13} className="text-emerald-400" />
      },
      {
        label: '04. Data Persistence',
        name: 'MongoDB Cluster Schemas',
        detail: 'Mongoose relational modeling (Users, Bookings, Reviews)',
        tech: 'MongoDB • Mongoose',
        badge: 'Database',
        icon: <Database size={13} className="text-teal-400" />
      },
      {
        label: '05. Cloud Infrastructure',
        name: 'Cloudinary CDN & Render PaaS',
        detail: 'Distributed media caching & live production hosting',
        tech: 'Cloudinary • Render',
        badge: 'Cloud',
        icon: <Cloud size={13} className="text-amber-400" />
      }
    ]
  },
  foodplay: {
    id: 'foodplay',
    name: 'FoodPlay',
    badge: 'Nutrition Engine',
    badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
    latency: '<20ms API Response',
    steps: [
      {
        label: '01. Biometrics Ingest',
        name: 'Biometric Parameter Intake',
        detail: 'Client intake (weight, height, age, activity level)',
        tech: 'Responsive UI • JS',
        badge: 'Input',
        icon: <Activity size={13} className="text-teal-400" />
      },
      {
        label: '02. API Routing',
        name: 'Flask RESTful Microservice',
        detail: 'Endpoint routing & input parameter sanitization',
        tech: 'Python 3 • Flask',
        badge: 'Backend',
        icon: <Server size={13} className="text-cyan-400" />
      },
      {
        label: '03. Metabolic Calculation',
        name: 'Mifflin-St Jeor Algorithm',
        detail: 'Computes Basal Metabolic Rate (BMR) & Daily TDEE',
        tech: 'Algorithmic Engine',
        badge: 'Logic Core',
        icon: <Cpu size={13} className="text-indigo-400" />
      },
      {
        label: '04. Target Allocator',
        name: 'Macro Distribution Optimizer',
        detail: 'Caloric partition into dynamic protein, carb & lipid targets',
        tech: 'Cut • Bulk • Maintain',
        badge: 'Optimization',
        icon: <Zap size={13} className="text-amber-400" />
      },
      {
        label: '05. Deployment & Test',
        name: 'Render Cloud Deployment',
        detail: 'Live production testing verified across 50+ real users',
        tech: 'Render PaaS • 50+ Users',
        badge: 'Cloud Tier',
        icon: <Cloud size={13} className="text-emerald-400" />
      }
    ]
  },
  fusecake: {
    id: 'fusecake',
    name: 'FuseCake',
    badge: 'Events Discovery SaaS',
    badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
    latency: 'Edge Revalidated',
    steps: [
      {
        label: '01. Discovery Interface',
        name: 'Next.js 14 Events Interface',
        detail: 'Multi-criteria search by keyword, city, category, price',
        tech: 'React.js • Tailwind',
        badge: 'Frontend',
        icon: <Globe size={13} className="text-cyan-400" />
      },
      {
        label: '02. App Router Layer',
        name: 'Server-Side Rendering Pipeline',
        detail: 'Type-safe server data dispatch and curated feed delivery',
        tech: 'Next.js 14 • TypeScript',
        badge: 'App Router',
        icon: <Server size={13} className="text-indigo-400" />
      },
      {
        label: '03. Stateful Gatekeeper',
        name: 'Auth-Gated Return Flow',
        detail: 'Captures intent, gates sign-in/up, redirects to registration',
        tech: 'Contextual Session Gate',
        badge: 'Auth Flow',
        icon: <ShieldCheck size={13} className="text-emerald-400" />
      },
      {
        label: '04. Data Layer',
        name: 'Events & Organizer Store',
        detail: 'Fast structured retrieval for startup event metadata',
        tech: 'REST Services • Schema',
        badge: 'Data Layer',
        icon: <Database size={13} className="text-teal-400" />
      },
      {
        label: '05. Component System',
        name: 'Modular Component Architecture',
        detail: 'Reusable event cards, filter drawers, registration modals',
        tech: 'Component UI Kit',
        badge: 'UI Kit',
        icon: <Zap size={13} className="text-purple-400" />
      }
    ]
  }
};

export const ProductionArchitectureCard: React.FC = () => {
  const [activeId, setActiveId] = useState<ArchitectureId>('wanderlust');
  const flow = FLOWS[activeId];

  return (
    <div className="w-full card-prism rounded-2xl border-slate-800/90 shadow-2xl overflow-hidden flex flex-col font-sans max-w-lg mx-auto">
      {/* Compact Top Header & Selector */}
      <div className="px-4 py-2.5 bg-[#060914] border-b border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">
            Production Architecture
          </span>
        </div>

        {/* Small Project Selector */}
        <div className="flex items-center gap-1 bg-[#090e1f] p-0.5 rounded-lg border border-slate-800/90">
          {(['wanderlust', 'foodplay', 'fusecake'] as ArchitectureId[]).map((id) => {
            const isSelected = activeId === id;
            return (
              <button
                key={id}
                onClick={() => setActiveId(id)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {id === 'wanderlust' ? 'WanderLust' : id === 'foodplay' ? 'FoodPlay' : 'FuseCake'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Animated Flow Pipeline */}
      <AnimatePresence mode="wait">
        <motion.div
          key={flow.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="p-3.5 sm:p-4 bg-[#04060e] flex flex-col"
        >
          {/* Subheader bar */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/60 mb-2.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-xs">{flow.name}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-medium ${flow.badgeColor}`}>
                {flow.badge}
              </span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400">
              {flow.latency}
            </span>
          </div>

          {/* Connected Flow Steps with Visual Direction Arrows */}
          <div className="flex flex-col gap-1.5">
            {flow.steps.map((step, idx) => (
              <React.Fragment key={step.name}>
                {/* Step Node */}
                <div className="p-2 sm:py-2 sm:px-3 rounded-xl bg-[#080d1a]/95 border border-slate-800/80 hover:border-cyan-500/40 transition-colors flex items-center justify-between gap-2.5 group">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-[#040711] border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-cyan-400/50 transition-colors">
                      {step.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                          {step.name}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {step.detail}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#040711] border border-slate-800/80 text-cyan-300">
                      {step.tech}
                    </span>
                  </div>
                </div>

                {/* Animated Arrow Connector between steps */}
                {idx < flow.steps.length - 1 && (
                  <div className="flex items-center justify-center my-[-2px]">
                    <div className="flex items-center gap-1 text-slate-600">
                      <div className="w-1 h-1 rounded-full bg-cyan-500/40 animate-ping" />
                      <ArrowDown size={11} className="text-cyan-500/60" />
                      <div className="w-1 h-1 rounded-full bg-cyan-500/40 animate-ping" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Bottom Compact Verified Footer */}
          <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 size={12} />
              5-Tier Production Pipeline
            </span>
            <span className="text-slate-500">
              Verified from Resume v4
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
