import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RESUME_DATA } from '../data/resumeData';
import { ProductionArchitectureCard } from './ProductionArchitectureCard';
import { ArrowDown, Award, Sparkles, Cloud, Code2, Layers, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenResumeModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResumeModal }) => {
  const { scrollY } = useScroll();

  // Subtle parallax translation
  const yHeroContent = useTransform(scrollY, [0, 600], [0, 60]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0.2]);

  return (
    <section
      id="story"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10"
    >
      <motion.div
        style={{ y: yHeroContent, opacity: opacityHero }}
        className="max-w-7xl mx-auto w-full z-10"
      >
        {/* Responsive Grid: Left Text Column + Right Code & Architecture Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status & Certification Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full card-prism border-indigo-500/40 text-xs font-mono text-indigo-300 shadow-neon-indigo mb-6"
            >
              <Award size={14} className="text-amber-400" />
              <span className="font-semibold text-slate-100">AWS Certified Cloud Practitioner</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">VIT Chennai '25 (7.91 CGPA)</span>
              <span className="relative flex h-2 w-2 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]"
            >
              Engineering Scalable Systems,{' '}
              <span className="text-gradient-neon block mt-1">
                Concept to Cloud.
              </span>
            </motion.h1>

            {/* Subtitle Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed"
            >
              Hi, I'm <strong className="text-white font-semibold">{RESUME_DATA.personal.name}</strong> — Full-Stack Software Engineer & AWS Certified Builder. I build high-concurrency web platforms, resilient REST services, and component-driven user interfaces with React, Next.js, TypeScript, Node.js, and AWS.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-9 flex flex-wrap items-center gap-3.5"
            >
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 hover:from-indigo-400 hover:to-cyan-300 text-white font-bold text-sm shadow-neon-indigo hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>Explore Featured Projects</span>
                <ArrowDown size={16} className="animate-bounce" />
              </a>

              <a
                href="#skills"
                className="px-5 py-3.5 rounded-xl card-prism hover:bg-slate-900 border border-slate-700/80 text-slate-200 text-sm font-medium transition-all hover:border-indigo-400/50 hover:scale-105 flex items-center gap-2"
              >
                <span>View Tech Arsenal</span>
                <ArrowRight size={15} className="text-indigo-400" />
              </a>

              <button
                onClick={onOpenResumeModal}
                className="px-5 py-3.5 rounded-xl card-prism hover:bg-slate-900 border border-slate-800 text-slate-300 text-sm font-medium transition-all hover:text-white hover:border-slate-700"
              >
                Review Full Resume
              </button>
            </motion.div>

            {/* Quick Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-12 w-full grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {RESUME_DATA.personal.stats.map((stat, i) => (
                <div
                  key={i}
                  className="card-prism p-3.5 rounded-2xl border-slate-800 text-center card-prism-hover"
                >
                  <div className="text-xl sm:text-2xl font-black text-gradient-cyan font-mono">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Interactive Animated Production Architecture Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full">
            <ProductionArchitectureCard />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
