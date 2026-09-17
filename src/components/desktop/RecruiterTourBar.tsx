import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS, TOUR_STEPS } from '../../context/OSContext';
import { ArrowLeft, ArrowRight, X, Sparkles, Pause, Play, CheckCircle } from 'lucide-react';

export const RecruiterTourBar: React.FC = () => {
  const {
    isTourActive,
    currentTourStep,
    nextTourStep,
    prevTourStep,
    jumpToTourStep,
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
    Math.ceil(((currentStep?.durationSeconds || 10) * (100 - tourProgress)) / 100)
  );

  return (
    <AnimatePresence>
      <div className="fixed top-8 sm:top-9 left-0 right-0 z-[60] flex justify-center px-2 sm:px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="pointer-events-auto max-w-full"
        >
          {/* Sleek Dynamic Island Tour Pill */}
          <div className="relative overflow-hidden px-2.5 sm:px-4 py-1.5 rounded-full bg-[#0d1220]/95 backdrop-blur-2xl border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.85)] flex items-center gap-2 sm:gap-3 text-slate-200 w-auto max-w-[96vw]">
            {/* Real-Time Auto-Advance Progress Line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/10 overflow-hidden">
              <div
                className={`h-full transition-all duration-75 ${
                  isTourAutoPlaying
                    ? 'bg-gradient-to-r from-amber-400 via-cyan-400 to-blue-500 shadow-[0_0_8px_rgba(0,242,254,0.9)]'
                    : 'bg-slate-500'
                }`}
                style={{ width: `${tourProgress}%` }}
              />
            </div>

            {/* Step Counter Badge & Icon */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
                <Sparkles size={11} className="text-amber-300" />
              </div>
              <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-300 bg-amber-500/10 border border-amber-400/30 px-1.5 py-0.5 rounded shrink-0">
                60s TOUR
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-white truncate max-w-[120px] xs:max-w-[180px] sm:max-w-none">
                {currentStep.title}
              </span>
            </div>

            {/* Interactive Step Indicator Dots */}
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/10 shrink-0">
              {TOUR_STEPS.map((step, idx) => {
                const isActive = idx === currentTourStep;
                const isPassed = idx < currentTourStep;
                return (
                  <button
                    key={step.stepId}
                    onClick={() => jumpToTourStep(idx)}
                    title={`Step ${step.stepId}: ${step.title.split('—')[1]?.trim() || step.title} (${step.durationSeconds}s)`}
                    aria-label={`Step ${step.stepId}`}
                    className={`transition-all rounded-full ${
                      isActive
                        ? 'w-4 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_8px_rgba(0,242,254,0.8)]'
                        : isPassed
                        ? 'w-2 h-2 bg-emerald-400/80 hover:bg-emerald-300 hover:scale-125'
                        : 'w-2 h-2 bg-white/20 hover:bg-white/40 hover:scale-125'
                    }`}
                  />
                );
              })}
            </div>

            {/* Separator & Auto-Play Status */}
            <div className="hidden md:block w-[1px] h-3.5 bg-white/15 shrink-0" />

            <span className="hidden md:inline text-[11px] font-mono text-slate-300 whitespace-nowrap shrink-0">
              {isTourAutoPlaying ? (
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Next in {remainingSecs}s</span>
                </span>
              ) : (
                <span className="text-amber-300/90 font-medium">Paused</span>
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
                <span className="text-[9px] font-mono text-amber-300 bg-amber-500/15 border border-amber-400/25 px-1.5 py-0.5 rounded-full">
                  ||
                </span>
              )}
            </div>

            {/* Navigation Controls */}
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

              {/* Next / Done Button */}
              {isLast ? (
                <button
                  onClick={endTour}
                  aria-label="View Full Portfolio"
                  className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white flex items-center gap-1 transition-all shadow-[0_0_12px_rgba(16,185,129,0.5)] shrink-0"
                >
                  <CheckCircle size={11} />
                  <span>View Full Portfolio →</span>
                </button>
              ) : (
                <button
                  onClick={nextTourStep}
                  aria-label="Next step"
                  title="Next step (→)"
                  className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:from-blue-700 active:to-indigo-700 text-white flex items-center gap-1 transition-all shadow-[0_0_10px_rgba(37,99,235,0.4)] shrink-0"
                >
                  <span>Next</span>
                  <ArrowRight size={11} />
                </button>
              )}

              {/* Exit Tour */}
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
