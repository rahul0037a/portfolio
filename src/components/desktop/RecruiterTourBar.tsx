import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS, TOUR_STEPS } from '../../context/OSContext';
import { ArrowLeft, ArrowRight, X, Sparkles, Pause, Play } from 'lucide-react';

export const RecruiterTourBar: React.FC = () => {
  const {
    isTourActive,
    currentTourStep,
    nextTourStep,
    prevTourStep,
    endTour,
    isTourAutoPlaying,
    tourProgress,
    toggleTourAutoPlay,
  } = useOS();

  // Keyboard shortcuts for tour navigation
  useEffect(() => {
    if (!isTourActive) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextTourStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevTourStep();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        toggleTourAutoPlay();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        endTour();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTourActive, nextTourStep, prevTourStep, toggleTourAutoPlay, endTour]);

  if (!isTourActive) return null;

  const currentStep = TOUR_STEPS[currentTourStep];
  const isFirst = currentTourStep === 0;
  const isLast = currentTourStep === TOUR_STEPS.length - 1;

  // Calculate remaining seconds for the step
  const remainingSecs = Math.max(
    1,
    Math.ceil(((currentStep.durationSeconds || 8) * (100 - tourProgress)) / 100)
  );

  return (
    <AnimatePresence>
      <div className="fixed top-7 sm:top-8 left-0 right-0 z-[60] flex justify-center px-1.5 sm:px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="pointer-events-auto max-w-full"
        >
          {/* Sleek Dynamic Island Tour Pill */}
          <div className="relative overflow-hidden px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#101422]/95 backdrop-blur-2xl border border-white/20 shadow-[0_12px_36px_rgba(0,0,0,0.75)] flex items-center gap-1.5 sm:gap-3 text-slate-200 w-auto max-w-[96vw]">
            {/* Real-Time Auto-Advance Progress Line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/10 overflow-hidden">
              <div
                className={`h-full transition-all duration-75 ${
                  isTourAutoPlaying
                    ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_8px_rgba(0,242,254,0.9)]'
                    : 'bg-slate-500'
                }`}
                style={{ width: `${tourProgress}%` }}
              />
            </div>

            {/* Step Counter Badge & Icon */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 shrink-0">
                <Sparkles size={10} className="text-amber-300 sm:w-3 sm:h-3" />
              </div>
              <span className="text-[10px] sm:text-xs font-mono font-bold text-blue-300 bg-blue-500/20 border border-blue-400/30 px-1.5 py-0.5 rounded shrink-0">
                {currentTourStep + 1}/{TOUR_STEPS.length}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-white truncate max-w-[70px] xs:max-w-[110px] sm:max-w-none">
                {currentStep.title}
              </span>
            </div>

            {/* Desktop Separator & Auto-Play Indicator */}
            <div className="hidden md:block w-[1px] h-3.5 bg-white/15 shrink-0" />

            <span className="hidden md:inline text-[10px] font-mono text-slate-400 whitespace-nowrap shrink-0">
              {isTourAutoPlaying ? (
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Next in {remainingSecs}s</span>
                </span>
              ) : (
                <span className="text-slate-400">Paused (Click Next to proceed)</span>
              )}
            </span>

            {/* Mobile Auto-Play Timer Chip */}
            <div className="flex md:hidden items-center shrink-0">
              {isTourAutoPlaying ? (
                <span className="flex items-center gap-1 text-[10px] font-mono text-cyan-300 bg-cyan-500/15 border border-cyan-400/30 px-1.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>{remainingSecs}s</span>
                </span>
              ) : (
                <span className="text-[9px] font-mono text-amber-300/90 bg-amber-500/15 border border-amber-400/25 px-1.5 py-0.5 rounded-full">
                  ||
                </span>
              )}
            </div>

            {/* Navigation & Controls */}
            <div className="flex items-center gap-1 sm:gap-1.5 ml-auto shrink-0">
              {/* Play / Pause Toggle Button */}
              <button
                onClick={toggleTourAutoPlay}
                aria-label={isTourAutoPlaying ? 'Pause auto-tour' : 'Resume auto-tour'}
                title={isTourAutoPlaying ? 'Pause auto-tour (Space)' : 'Resume auto-tour (Space)'}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full hover:bg-white/10 active:bg-white/20 text-slate-300 hover:text-white transition-colors flex items-center justify-center shrink-0"
              >
                {isTourAutoPlaying ? (
                  <Pause size={11} className="text-amber-300" />
                ) : (
                  <Play size={11} className="text-emerald-400" />
                )}
              </button>

              {/* Prev Button */}
              <button
                onClick={prevTourStep}
                disabled={isFirst}
                aria-label="Previous step"
                title="Previous step (←)"
                className={`p-1 sm:px-2 sm:py-1 rounded-full sm:rounded-md text-[11px] font-medium flex items-center justify-center gap-1 transition-colors border shrink-0 ${
                  isFirst
                    ? 'opacity-25 cursor-not-allowed border-white/5 bg-white/5 text-slate-500'
                    : 'hover:bg-white/10 border-white/10 text-slate-200 active:bg-white/20'
                }`}
              >
                <ArrowLeft size={11} />
                <span className="hidden sm:inline">Prev</span>
              </button>

              {/* Next Button */}
              <button
                onClick={nextTourStep}
                aria-label={isLast ? 'Finish tour' : 'Next step'}
                title={isLast ? 'Finish tour' : 'Next step (→)'}
                className="px-2 sm:px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:from-blue-700 active:to-indigo-700 text-white flex items-center gap-1 transition-all shadow-[0_0_10px_rgba(37,99,235,0.4)] shrink-0"
              >
                <span>{isLast ? 'Done' : 'Next'}</span>
                <ArrowRight size={11} />
              </button>

              {/* Close Tour */}
              <button
                onClick={endTour}
                aria-label="Exit tour"
                title="Exit tour (Esc)"
                className="p-1 sm:p-1.5 rounded-full hover:bg-white/10 active:bg-white/20 text-slate-400 hover:text-white transition-colors shrink-0 ml-0.5"
              >
                <X size={13} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
