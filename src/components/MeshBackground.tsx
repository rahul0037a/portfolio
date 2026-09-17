import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const MeshBackground: React.FC = () => {
  const { scrollY } = useScroll();
  const yOrb1 = useTransform(scrollY, [0, 4000], [0, 500]);
  const yOrb2 = useTransform(scrollY, [0, 4000], [0, -400]);
  const yOrb3 = useTransform(scrollY, [0, 4000], [0, 300]);

  return (
    <div className="bg-mesh-canvas" aria-hidden="true">
      {/* Dot Grid overlay */}
      <div className="absolute inset-0 bg-dot-grid opacity-40" />

      {/* Floating Gradient Mesh Orbs with Parallax */}
      <motion.div style={{ y: yOrb1 }} className="mesh-orb mesh-orb-1" />
      <motion.div style={{ y: yOrb2 }} className="mesh-orb mesh-orb-2" />
      <motion.div style={{ y: yOrb3 }} className="mesh-orb mesh-orb-3" />

      {/* Edge gradient vignettes */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-transparent to-[#02040a]" />
    </div>
  );
};
