import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useMotionTemplate, useReducedMotion } from 'framer-motion';
import { useOS } from '../../context/OSContext';
import './wallpaper.css';

// The topology sits around the workspace, leaving the portfolio itself readable.
const NETWORK_PATHS = [
  { id: 'edge', d: 'M -60 185 L 90 140 L 250 90 L 400 165 L 590 100 L 830 130 L 1070 80 L 1310 155 L 1510 90 L 1660 125', duration: '18s', delay: '-5s' },
  { id: 'client', d: 'M 90 140 L 180 330 L 95 510 L 190 690 L 110 840 L 340 915', duration: '13s', delay: '-3s' },
  { id: 'gateway', d: 'M 250 90 L 180 330 L 400 165', duration: '11s', delay: '-6s', secondary: true },
  { id: 'service', d: 'M 1070 80 L 1180 320 L 1430 390 L 1510 90', duration: '12s', delay: '-8s' },
  { id: 'cloud', d: 'M 1430 390 L 1455 625 L 1540 825 L 1270 875 L 1090 750 L 840 905 L 590 850 L 340 915 L 110 840 L -60 900', duration: '20s', delay: '-12s' },
  { id: 'data', d: 'M 1455 625 L 1270 875 L 1180 320', duration: '15s', delay: '-2s', secondary: true },
];

const NETWORK_NODES = [
  [90, 140], [250, 90], [400, 165], [590, 100], [830, 130],
  [1070, 80], [1310, 155], [1510, 90], [180, 330], [95, 510],
  [190, 690], [110, 840], [340, 915], [590, 850], [840, 905],
  [1090, 750], [1270, 875], [1540, 825], [1455, 625], [1430, 390], [1180, 320],
];

export const WallpaperCanvas: React.FC = () => {
  const { wallpaper, activeWindowId } = useOS();
  const reduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(() => document.hidden);
  const pointerX = useMotionValue(-1000);
  const pointerY = useMotionValue(-1000);
  const glow = useMotionTemplate`radial-gradient(500px circle at ${pointerX}px ${pointerY}px, rgba(153,192,232,.10), transparent 70%)`;

  useEffect(() => {
    const handleVisibility = () => setIsPaused(document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const handleMove = (event: PointerEvent) => { pointerX.set(event.clientX); pointerY.set(event.clientY); };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <div
      className={`desktop-wallpaper wallpaper-${wallpaper}${isPaused ? ' is-paused' : ''}${reduceMotion ? ' is-reduced-motion' : ''}`}
      data-active-app={activeWindowId || undefined}
      aria-hidden="true"
    >
      <div className="wallpaper-horizon" />
      <div className="wallpaper-atmosphere" />
      <div className="wallpaper-ridge ridge-back" />
      <div className="wallpaper-ridge ridge-middle" />
      <div className="wallpaper-ridge ridge-front" />
      <div className="wallpaper-shade" />
      {wallpaper === 'cloud' && (
        <svg className="wallpaper-topology" viewBox="0 0 1600 1000" preserveAspectRatio="none" focusable="false">
          {NETWORK_PATHS.map(path => (
            <g key={path.id} className={path.secondary ? 'topology-secondary' : undefined}>
              <path d={path.d} className="topology-link" vectorEffect="non-scaling-stroke" />
              <path
                d={path.d}
                pathLength={100}
                className="topology-packet"
                vectorEffect="non-scaling-stroke"
                style={{ animationDuration: path.duration, animationDelay: path.delay }}
              />
            </g>
          ))}
          {NETWORK_NODES.map(([x, y], index) => (
            <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
              {index % 3 === 0 && <circle r="7" className="topology-pulse" style={{ animationDelay: `${index * -0.65}s` }} />}
              <circle r={index % 3 === 0 ? 3 : 2} className="topology-node" />
            </g>
          ))}
        </svg>
      )}
      {!reduceMotion && <motion.div className="wallpaper-cursor-light" style={{ background: glow }} />}
    </div>
  );
};
