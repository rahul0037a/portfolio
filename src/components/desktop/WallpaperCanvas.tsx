import React, { useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate, useReducedMotion } from 'framer-motion';
import { useOS } from '../../context/OSContext';

export const WallpaperCanvas: React.FC = () => {
  const { wallpaper } = useOS();
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(-1000);
  const pointerY = useMotionValue(-1000);
  const glow = useMotionTemplate`radial-gradient(500px circle at ${pointerX}px ${pointerY}px, rgba(153,192,232,.065), transparent 70%)`;

  useEffect(() => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const handleMove = (event: PointerEvent) => { pointerX.set(event.clientX); pointerY.set(event.clientY); };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <div className={`desktop-wallpaper wallpaper-${wallpaper}`} aria-hidden="true">
      <div className="wallpaper-horizon" />
      <div className="wallpaper-ridge ridge-back" />
      <div className="wallpaper-ridge ridge-middle" />
      <div className="wallpaper-ridge ridge-front" />
      <div className="wallpaper-shade" />
      {!reduceMotion && <motion.div className="wallpaper-cursor-light" style={{ background: glow }} />}
    </div>
  );
};
