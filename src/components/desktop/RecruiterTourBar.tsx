import React, { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, Sparkles, Pause, Play, Check } from 'lucide-react';
import { useOS, TOUR_STEPS } from '../../context/OSContext';

const cleanTitle = (title: string) => title.replace(/^\d+\s*[\u2013\u2014-]\s*/, '');

export const RecruiterTourBar: React.FC = () => {
  const { isTourActive, currentTourStep, nextTourStep, prevTourStep, jumpToTourStep, endTour, isTourAutoPlaying, tourProgress, toggleTourAutoPlay, isSpotlightOpen, isControlCenterOpen } = useOS();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isTourActive || isSpotlightOpen || isControlCenterOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); endTour(); return; }
      const target = event.target as HTMLElement | null;
      if (target?.isContentEditable || target?.closest('input, textarea, select, button, a, [role="combobox"]')) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); nextTourStep(); }
      else if (event.key === 'ArrowLeft') { event.preventDefault(); prevTourStep(); }
      else if (event.key === ' ' || event.code === 'Space') { event.preventDefault(); toggleTourAutoPlay(); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isTourActive, isSpotlightOpen, isControlCenterOpen, nextTourStep, prevTourStep, toggleTourAutoPlay, endTour]);

  const step = TOUR_STEPS[currentTourStep];
  const isLast = currentTourStep === TOUR_STEPS.length - 1;
  const complete = isLast && tourProgress >= 100;
  const remainingSeconds = Math.max(0, Math.ceil(step.durationSeconds * (100 - tourProgress) / 100));

  return (
    <AnimatePresence>
      {isTourActive && (
        <div className="os-tour-position">
          <motion.div className="os-tour" role="region" aria-label="Recruiter guided tour" initial={reducedMotion ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ type: 'spring', stiffness: 350, damping: 28 }}>
            <div className="os-tour-copy"><Sparkles size={16} /><div className="os-tour-title"><span className="os-tour-label">60s TOUR / {currentTourStep + 1} OF {TOUR_STEPS.length}</span>{cleanTitle(step.title)}</div></div>
            <div className="os-tour-dots" aria-label="Tour sections">
              {TOUR_STEPS.map((item, index) => <button type="button" key={item.stepId} onClick={() => jumpToTourStep(index)} className={`os-tour-dot ${index === currentTourStep ? 'is-active' : index < currentTourStep ? 'is-passed' : ''}`} aria-label={`View ${cleanTitle(item.title)}`} aria-current={index === currentTourStep ? 'step' : undefined} title={cleanTitle(item.title)} />)}
            </div>
            <span className="os-tour-status">{complete ? 'Complete' : isTourAutoPlaying ? `Next in ${remainingSeconds}s` : 'Paused'}</span>
            <div className="os-tour-actions">
              {!complete && <button type="button" onClick={toggleTourAutoPlay} aria-label={isTourAutoPlaying ? 'Pause auto-tour' : 'Resume auto-tour'} title={isTourAutoPlaying ? 'Pause auto-tour' : 'Resume auto-tour'}>{isTourAutoPlaying ? <Pause size={14} /> : <Play size={14} />}</button>}
              <button type="button" onClick={prevTourStep} disabled={currentTourStep === 0} aria-label="Previous step" title="Previous step"><ArrowLeft size={14} /></button>
              <button type="button" onClick={isLast ? endTour : nextTourStep} className="os-tour-next" aria-label={isLast ? 'View Full Portfolio' : 'Next step'}>{isLast ? <><span>Done</span><Check size={13} /></> : <><span>Next</span><ArrowRight size={13} /></>}</button>
              <button type="button" onClick={endTour} aria-label="Exit tour" title="Exit tour (Esc)"><X size={14} /></button>
            </div>
            <div className="os-tour-progress" role="progressbar" aria-label="Current section progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(tourProgress)}><div style={{ transform: `scaleX(${Math.min(100, Math.max(0, tourProgress)) / 100})` }} /></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
