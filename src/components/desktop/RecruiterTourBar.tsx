import React from 'react';
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-8 left-1/2 -translate-x-1/2 z-[60] pointer-events-auto"
      >
        {/* Sleek, Non-Overlapping Dynamic Island Pill with Progress Strip */}
        <div className="relative overflow-hidden px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#111624]/95 backdrop-blur-2xl border border-white/20 shadow-2xl flex items-center gap-2 sm:gap-3 text-slate-200 max-w-[96vw]">
          {/* Real-Time Auto-Advance Progress Line at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 overflow-hidden">
            <div
              className={`h-full transition-all duration-75 ${
                isTourAutoPlaying
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_6px_rgba(0,242,254,0.8)]'
                  : 'bg-slate-500'
              }`}
              style={{ width: `${tourProgress}%` }}
            />
          </div>

          {/* Step Badge */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="w-5 h-5 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300">
              <Sparkles size={11} className="text-amber-300" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-white whitespace-nowrap truncate max-w-[120px] sm:max-w-none">
              {String(currentTourStep + 1).padStart(2, '0')}/{String(TOUR_STEPS.length).padStart(2, '0')}: {currentStep.title}
            </span>
          </div>

          <div className="hidden md:block w-[1px] h-3.5 bg-white/15" />

          {/* Auto-Play Indicator */}
          <span className="hidden md:inline text-[10px] font-mono text-slate-400 whitespace-nowrap">
            {isTourAutoPlaying ? (
              <span className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>Next in {remainingSecs}s</span>
              </span>
            ) : (
              <span className="text-slate-400">Paused (Browse at your pace)</span>
            )}
          </span>

          {/* Navigation & Auto-Play Controls */}
          <div className="flex items-center gap-1.5 ml-auto">
            {/* Play / Pause Toggle Button */}
            <button
              onClick={toggleTourAutoPlay}
              aria-label={isTourAutoPlaying ? 'Pause auto-tour' : 'Resume auto-tour'}
              title={isTourAutoPlaying ? 'Pause auto-tour' : 'Resume auto-tour'}
              className="p-1 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-[11px] font-mono"
            >
              {isTourAutoPlaying ? (
                <Pause size={12} className="text-amber-300" />
              ) : (
                <Play size={12} className="text-emerald-400" />
              )}
            </button>

            {/* Prev Button */}
            <button
              onClick={prevTourStep}
              disabled={isFirst}
              className={`px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-colors border ${
                isFirst
                  ? 'opacity-30 cursor-not-allowed border-white/5 bg-white/5 text-slate-500'
                  : 'hover:bg-white/10 border-white/10 text-slate-200'
              }`}
            >
              <ArrowLeft size={10} />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Next Button */}
            <button
              onClick={nextTourStep}
              className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1 transition-colors shadow-sm"
            >
              <span>{isLast ? 'Finish' : 'Next'}</span>
              <ArrowRight size={10} />
            </button>

            {/* Close Tour */}
            <button
              onClick={endTour}
              aria-label="Exit tour"
              className="p-1 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors ml-0.5"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
