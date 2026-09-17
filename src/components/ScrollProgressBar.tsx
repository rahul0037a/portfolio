import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const CHAPTERS = [
  { id: 'story', label: 'Intro' },
  { id: 'foundation', label: 'Foundation' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Credentials' },
  { id: 'contact', label: 'Connect' },
];

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  const [activeChapter, setActiveChapter] = useState('story');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const element = document.getElementById(CHAPTERS[i].id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveChapter(CHAPTERS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top glowing linear progress track */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400 z-50 origin-left shadow-[0_0_12px_#00f2fe]"
        style={{ scaleX }}
      />

      {/* Ultra-slim right edge dot navigation (does not obstruct content) */}
      <div className="hidden 2xl:flex fixed right-3 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4 pointer-events-auto">
        {CHAPTERS.map((chap) => {
          const isActive = activeChapter === chap.id;
          return (
            <a
              key={chap.id}
              href={`#${chap.id}`}
              className="group relative flex items-center justify-center p-1"
              title={chap.label}
            >
              {/* Tooltip on hover only */}
              <span className="absolute right-6 px-2 py-0.5 rounded text-[10px] font-mono font-medium text-white bg-slate-900/90 border border-slate-700 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {chap.label}
              </span>

              {/* Tiny dot */}
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-cyan-400 shadow-[0_0_12px_#00f2fe]'
                    : 'w-1.5 h-1.5 bg-slate-700 group-hover:bg-slate-400'
                }`}
              />
            </a>
          );
        })}
      </div>
    </>
  );
};
