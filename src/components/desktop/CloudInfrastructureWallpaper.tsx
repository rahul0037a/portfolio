import React from 'react';
import { motion } from 'framer-motion';

export const CloudInfrastructureWallpaper: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#050811] z-0 select-none">
      {/* Deep Space Background Canvas with subtle dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060914] via-[#050811] to-[#04060d]" />

      {/* Low-Opacity Ambient Radial Glows (Cyan / Indigo / Violet) */}
      <div className="absolute top-1/4 -left-20 w-[550px] h-[550px] rounded-full bg-cyan-600/[0.07] blur-[150px]" />
      <div className="absolute -bottom-20 right-10 w-[600px] h-[600px] rounded-full bg-indigo-600/[0.08] blur-[160px]" />
      <div className="absolute top-10 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/[0.05] blur-[130px]" />

      {/* SVG Distributed Cloud Infrastructure Topology */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
          </linearGradient>

          <pattern id="infraGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#ffffff" fillOpacity="0.02" />
          </pattern>
        </defs>

        {/* Ultra-subtle background dot matrix */}
        <rect width="100%" height="100%" fill="url(#infraGrid)" />

        {/* Network Lines - Constellation Topology */}
        <g stroke="url(#cloudGrad)" strokeWidth="1" fill="none" opacity="0.6">
          {/* Top Left Cluster */}
          <line x1="80" y1="120" x2="220" y2="80" />
          <line x1="220" y1="80" x2="340" y2="140" />
          <line x1="80" y1="120" x2="160" y2="240" />
          <line x1="160" y1="240" x2="340" y2="140" />

          {/* Cross Network Bridges */}
          <line x1="340" y1="140" x2="480" y2="100" strokeDasharray="3 3" opacity="0.4" />
          <line x1="160" y1="240" x2="280" y2="360" strokeDasharray="3 3" opacity="0.3" />

          {/* Top Right Cluster */}
          <line x1="850" y1="90" x2="980" y2="60" />
          <line x1="980" y1="60" x2="1140" y2="110" />
          <line x1="980" y1="60" x2="1040" y2="200" />
          <line x1="1040" y1="200" x2="1140" y2="110" />
          <line x1="1040" y1="200" x2="1220" y2="240" />

          {/* Bottom Left Cluster */}
          <line x1="100" y1="620" x2="240" y2="580" />
          <line x1="240" y1="580" x2="360" y2="680" />
          <line x1="240" y1="580" x2="180" y2="740" />

          {/* Bottom Right AWS Cloud Topology */}
          <line x1="820" y1="660" x2="960" y2="590" />
          <line x1="960" y1="590" x2="1100" y2="630" />
          <line x1="960" y1="590" x2="1020" y2="720" />
          <line x1="1100" y1="630" x2="1240" y2="670" />
          <line x1="1020" y1="720" x2="1240" y2="670" />
        </g>

        {/* Topology Node Rings */}
        <g opacity="0.75">
          {/* Top Nodes */}
          <circle cx="80" cy="120" r="3" fill="#00f2fe" fillOpacity="0.4" />
          <circle cx="220" cy="80" r="4" fill="#6366f1" fillOpacity="0.5" />
          <circle cx="340" cy="140" r="3.5" fill="#38bdf8" fillOpacity="0.4" />
          <circle cx="160" cy="240" r="3" fill="#00f2fe" fillOpacity="0.3" />

          <circle cx="980" cy="60" r="4" fill="#6366f1" fillOpacity="0.5" />
          <circle cx="1140" cy="110" r="3.5" fill="#00f2fe" fillOpacity="0.4" />
          <circle cx="1040" cy="200" r="3" fill="#38bdf8" fillOpacity="0.3" />

          {/* Bottom AWS Nodes */}
          <circle cx="960" cy="590" r="4.5" fill="#f59e0b" fillOpacity="0.5" />
          <circle cx="1100" cy="630" r="3.5" fill="#00f2fe" fillOpacity="0.4" />
          <circle cx="1020" cy="720" r="3" fill="#6366f1" fillOpacity="0.4" />
          <circle cx="1240" cy="670" r="4" fill="#f59e0b" fillOpacity="0.5" />
        </g>

        {/* Micro Labels on Distributed Nodes */}
        <g fill="#94a3b8" fontSize="8" fontFamily="monospace" opacity="0.35">
          <text x="230" y="83">VPC-EDGE</text>
          <text x="350" y="143">ap-south-1</text>
          <text x="990" y="63">IAM-AUTH</text>
          <text x="970" y="593" fill="#fbbf24">AWS-S3</text>
          <text x="1250" y="673" fill="#fbbf24">EC2-CLUSTER</text>
        </g>
      </svg>

      {/* Vignette mask: keeps center screen deep and pitch dark so the hero card is 100% readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,8,17,0.92)_0%,rgba(5,8,17,0.6)_55%,rgba(5,8,17,0.1)_100%)] pointer-events-none" />
    </div>
  );
};
