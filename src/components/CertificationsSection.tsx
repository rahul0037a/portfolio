import React from 'react';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '../data/resumeData';
import { TiltCard } from './TiltCard';
import { ShieldCheck, CheckCircle2, Cloud, Brain, Server, Sparkles, ExternalLink } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  const { certifications } = RESUME_DATA;

  const getCertIcon = (title: string) => {
    if (title.includes('AWS')) {
      return <Cloud className="text-amber-400" size={24} />;
    }
    if (title.includes('Machine Learning')) {
      return <Brain className="text-cyan-400" size={24} />;
    }
    return <Server className="text-indigo-400" size={24} />;
  };

  return (
    <section id="certifications" className="relative py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 overflow-hidden z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-semibold flex items-center gap-1.5">
            <Sparkles size={14} />
            Verified Credentials // Industry Standards
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Industry Certifications & <span className="text-gradient-cyan">Accreditations</span>
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
              Formally evaluated certifications validating enterprise cloud architecture, applied supervised machine learning models, and production MERN development.
            </p>
          </div>
        </div>

        {/* Certifications 3D Tilt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TiltCard
                className="card-prism p-6 rounded-3xl border-slate-800/90 flex flex-col justify-between h-full relative overflow-hidden shadow-card-prism group"
                glareColor={cert.title.includes('AWS') ? 'rgba(245, 158, 11, 0.15)' : 'rgba(99, 102, 241, 0.15)'}
              >
                {/* Highlight ribbon for AWS */}
                {cert.title.includes('AWS') && (
                  <div className="absolute -right-12 top-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-mono text-[9px] uppercase font-bold py-1 px-12 rotate-45 shadow-lg">
                    AWS Cloud
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#060914] border border-slate-800 flex items-center justify-center group-hover:border-cyan-500/40 transition-colors shadow-md">
                      {getCertIcon(cert.title)}
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                      <ShieldCheck size={12} />
                      <span>Verified</span>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-cyan-400 mb-1">
                    {cert.issuer}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {cert.title}
                  </h3>

                  <div className="mt-3 inline-block text-xs font-mono text-slate-300 bg-[#060914] px-2.5 py-1 rounded-md border border-slate-800">
                    {cert.date}
                  </div>

                  {/* Gained Skills List */}
                  <div className="mt-6 pt-4 border-t border-slate-800/60 space-y-2">
                    <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider font-semibold">
                      Core Competencies Validated:
                    </div>
                    {cert.skillsGained.map((sk, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                        <span>{sk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="text-[10px] text-slate-500">Official Credential</span>
                  <span className="text-cyan-400 font-medium">
                    Active & Validated
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
