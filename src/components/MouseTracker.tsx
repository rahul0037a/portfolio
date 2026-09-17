import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const MouseTracker: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const springX = useSpring(-1000, { stiffness: 200, damping: 28 });
  const springY = useSpring(-1000, { stiffness: 200, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [springX, springY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      {/* Soft Interactive Spotlight Orb */}
      <motion.div
        className="w-[500px] h-[500px] rounded-full absolute -translate-x-1/2 -translate-y-1/2 opacity-35 mix-blend-screen filter blur-[80px]"
        style={{
          left: springX,
          top: springY,
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.2) 35%, rgba(6, 182, 212, 0.1) 60%, transparent 80%)',
        }}
      />
    </div>
  );
};
