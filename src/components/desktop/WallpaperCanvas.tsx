import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '../../context/OSContext';

export const WallpaperCanvas: React.FC = () => {
  const { wallpaper, activeWindowId } = useOS();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  // Track cursor coordinates for the interactive mouse tracking wallpaper
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Context-reactive state flags
  const isProjects = activeWindowId === 'projects';
  const isEducation = activeWindowId === 'education';
  const isExperience = activeWindowId === 'experience';
  const isResume = activeWindowId === 'resume';
  const isSkills = activeWindowId === 'skills';

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      <AnimatePresence mode="wait">
        {/* 1. CLOUD: Interactive Cloud Infrastructure with Mouse Tracking & Context-Reactive Topology */}
        {wallpaper === 'cloud' && (
          <motion.div
            key="cloud"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-[#050811]"
          >
            {/* Dark Deep Canvas */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#060914] via-[#050811] to-[#04060d]" />

            {/* Interactive Mouse Tracking Spotlight Cursor Glows */}
            <div
              className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `
                  radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 242, 254, 0.18), transparent 60%),
                  radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.16), transparent 50%)
                `,
              }}
            />

            {/* Static Ambient Base Glows (Context Reactive) */}
            <div
              className={`absolute top-1/4 -left-20 w-[550px] h-[550px] rounded-full blur-[150px] transition-all duration-700 ${
                isProjects
                  ? 'bg-cyan-500/[0.18] scale-110'
                  : 'bg-cyan-600/[0.06]'
              }`}
            />
            <div
              className={`absolute -bottom-20 right-10 w-[600px] h-[600px] rounded-full blur-[160px] transition-all duration-700 ${
                isEducation
                  ? 'bg-amber-500/[0.18] scale-110'
                  : isExperience
                  ? 'bg-indigo-600/[0.16]'
                  : 'bg-indigo-600/[0.08]'
              }`}
            />

            {/* SVG Distributed Cloud Infrastructure Topology */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="cloudMeshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#6366f1" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
                </linearGradient>

                <linearGradient id="cyanProjectGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.6" />
                </linearGradient>

                <linearGradient id="amberAwsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.65" />
                </linearGradient>

                <pattern id="infraGridPattern" width="48" height="48" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#ffffff" fillOpacity="0.02" />
                </pattern>

                {/* Packet Glow Filter */}
                <filter id="packetGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="100%" height="100%" fill="url(#infraGridPattern)" />

              {/* Context 1: Subtle Timeline Grid Background (Illuminates when Experience is active) */}
              <g
                className="transition-opacity duration-700 ease-in-out"
                opacity={isExperience ? 0.85 : 0.08}
              >
                {/* Timeline Main Coordinate Axis */}
                <line x1="100" y1="460" x2="1340" y2="460" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="6 6" />

                {/* Milestone 1: Ethnus */}
                <g transform="translate(320, 460)">
                  <circle r="6" fill="#818cf8" fillOpacity={isExperience ? 0.95 : 0.25} />
                  <circle r="12" fill="none" stroke="#818cf8" strokeWidth="1" strokeDasharray="3 3" opacity={isExperience ? 0.7 : 0} />
                  <line x1="0" y1="-28" x2="0" y2="28" stroke="#818cf8" strokeWidth="1" opacity="0.45" />
                  <text x="-65" y="-34" fill="#c7d2fe" fontSize="9.5" fontFamily="monospace" fontWeight="600">2023 · ETHNUS INTERN</text>
                  <text x="-65" y="-18" fill="#94a3b8" fontSize="8" fontFamily="monospace">MERN Stack Architecture</text>
                </g>

                {/* Milestone 2: VIT Chennai Graduate */}
                <g transform="translate(740, 460)">
                  <circle r="6" fill="#00f2fe" fillOpacity={isExperience ? 0.95 : 0.25} />
                  <circle r="12" fill="none" stroke="#00f2fe" strokeWidth="1" strokeDasharray="3 3" opacity={isExperience ? 0.7 : 0} />
                  <line x1="0" y1="-28" x2="0" y2="28" stroke="#00f2fe" strokeWidth="1" opacity="0.45" />
                  <text x="-65" y="-34" fill="#a5f3fc" fontSize="9.5" fontFamily="monospace" fontWeight="600">2025 · VIT B.TECH CSE</text>
                  <text x="-65" y="-18" fill="#94a3b8" fontSize="8" fontFamily="monospace">Full-Stack Systems · AWS Certified</text>
                </g>

                {/* Milestone 3: FuseCake */}
                <g transform="translate(1120, 460)">
                  <circle r="6.5" fill="#6366f1" fillOpacity={isExperience ? 0.95 : 0.25} />
                  <circle r="13" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="3 3" opacity={isExperience ? 0.7 : 0} />
                  <line x1="0" y1="-28" x2="0" y2="28" stroke="#6366f1" strokeWidth="1" opacity="0.45" />
                  <text x="-75" y="-34" fill="#c7d2fe" fontSize="9.5" fontFamily="monospace" fontWeight="600">2026 · FUSECAKE DEVELOPER</text>
                  <text x="-75" y="-18" fill="#94a3b8" fontSize="8" fontFamily="monospace">Events Discovery SaaS · Next.js 14</text>
                </g>
              </g>

              {/* Constellation Network Lines */}
              <g
                stroke={isProjects ? 'url(#cyanProjectGrad)' : 'url(#cloudMeshGrad)'}
                strokeWidth={isProjects ? 1.4 : 1}
                fill="none"
                className="transition-all duration-700"
                opacity={isProjects ? 0.85 : 0.65}
              >
                {/* Top Left Cluster: Client & Gateway */}
                <line x1="80" y1="120" x2="220" y2="80" />
                <line x1="220" y1="80" x2="340" y2="140" />
                <line x1="80" y1="120" x2="160" y2="240" />
                <line x1="160" y1="240" x2="340" y2="140" />

                {/* Cross Bridges: Application Flow */}
                <line x1="340" y1="140" x2="480" y2="100" strokeDasharray="3 3" opacity={isProjects ? 0.75 : 0.4} />
                <line x1="480" y1="100" x2="850" y2="90" strokeDasharray="3 3" opacity={isProjects ? 0.75 : 0.35} />
                <line x1="160" y1="240" x2="280" y2="360" strokeDasharray="3 3" opacity={0.3} />

                {/* Top Right Cluster: API Gateway & IAM Auth */}
                <line x1="850" y1="90" x2="980" y2="60" />
                <line x1="980" y1="60" x2="1140" y2="110" />
                <line x1="980" y1="60" x2="1040" y2="200" />
                <line x1="1040" y1="200" x2="1140" y2="110" />
                <line x1="1040" y1="200" x2="1220" y2="240" />

                {/* Bottom Left Cluster: Data / Persistence */}
                <line x1="100" y1="620" x2="240" y2="580" />
                <line x1="240" y1="580" x2="360" y2="680" />
                <line x1="240" y1="580" x2="180" y2="740" />
              </g>

              {/* Bottom Right AWS Cloud Infrastructure Lines (Illuminates in Amber when AWS/Education is active) */}
              <g
                stroke={isEducation ? 'url(#amberAwsGrad)' : 'url(#cloudMeshGrad)'}
                strokeWidth={isEducation ? 1.6 : 1}
                fill="none"
                className="transition-all duration-700"
                opacity={isEducation ? 0.95 : 0.65}
              >
                <line x1="820" y1="660" x2="960" y2="590" />
                <line x1="960" y1="590" x2="1100" y2="630" />
                <line x1="960" y1="590" x2="1020" y2="720" />
                <line x1="1100" y1="630" x2="1240" y2="670" />
                <line x1="1020" y1="720" x2="1240" y2="670" />
              </g>

              {/* Topology Nodes */}
              <g opacity="0.85">
                {/* Client / Gateway Nodes */}
                <circle cx="80" cy="120" r={isProjects ? 4.5 : 3.5} fill="#00f2fe" fillOpacity={isProjects ? 0.9 : 0.6} />
                <circle cx="220" cy="80" r={isProjects ? 5.5 : 4.5} fill="#6366f1" fillOpacity={isProjects ? 0.9 : 0.7} />
                <circle cx="340" cy="140" r={isProjects || isEducation ? 5 : 4} fill={isEducation ? '#f59e0b' : '#38bdf8'} fillOpacity="0.7" />
                <circle cx="160" cy="240" r="3.5" fill="#00f2fe" fillOpacity="0.5" />

                {/* API & Auth Nodes */}
                <circle cx="980" cy="60" r={isResume ? 5.5 : 4.5} fill={isResume ? '#10b981' : '#6366f1'} fillOpacity="0.8" />
                <circle cx="1140" cy="110" r="4" fill="#00f2fe" fillOpacity="0.6" />
                <circle cx="1040" cy="200" r={isProjects ? 4.5 : 3.5} fill="#38bdf8" fillOpacity="0.6" />

                {/* AWS Cloud Nodes (Highlights vividly when Education/AWS is active) */}
                <g className="transition-all duration-700">
                  <circle cx="960" cy="590" r={isEducation ? 6.5 : 5} fill="#f59e0b" fillOpacity={isEducation ? 0.95 : 0.8} />
                  {isEducation && (
                    <circle cx="960" cy="590" r="12" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
                  )}

                  <circle cx="1100" cy="630" r={isEducation ? 5 : 4} fill={isEducation ? '#fbbf24' : '#00f2fe'} fillOpacity="0.75" />
                  <circle cx="1020" cy="720" r="3.5" fill="#6366f1" fillOpacity="0.6" />

                  <circle cx="1240" cy="670" r={isEducation ? 6 : 4.5} fill="#f59e0b" fillOpacity={isEducation ? 0.95 : 0.8} />
                  {isEducation && (
                    <circle cx="1240" cy="670" r="11" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
                  )}
                </g>
              </g>

              {/* 
                SINGLE SUBTLE PACKET PULSE:
                A single faint cyan dot that travels along the architecture connection every 5 seconds.
                Represents a request/data packet: Client → API → Auth → Data → Cloud
                Very subtle, calm, zero particle clutter.
              */}
              <g>
                <circle r="3" fill="#00f2fe" filter="url(#packetGlow)">
                  <animateMotion
                    dur="5.2s"
                    repeatCount="indefinite"
                    path="M 80,120 L 220,80 L 340,140 L 480,100 L 850,90 L 980,60 L 1040,200 L 1100,630 L 960,590 L 1240,670"
                    keyPoints="0; 0.84; 1; 1"
                    keyTimes="0; 0.72; 0.78; 1"
                    calcMode="linear"
                  />
                  <animate
                    attributeName="opacity"
                    values="0; 0.9; 0.9; 0; 0"
                    keyTimes="0; 0.08; 0.70; 0.76; 1"
                    dur="5.2s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Tiny trailing halo behind the packet */}
                <circle r="1.5" fill="#38bdf8" opacity="0.5" filter="url(#packetGlow)">
                  <animateMotion
                    dur="5.2s"
                    repeatCount="indefinite"
                    path="M 80,120 L 220,80 L 340,140 L 480,100 L 850,90 L 980,60 L 1040,200 L 1100,630 L 960,590 L 1240,670"
                    keyPoints="0; 0.82; 1; 1"
                    keyTimes="0.02; 0.74; 0.80; 1"
                    calcMode="linear"
                  />
                  <animate
                    attributeName="opacity"
                    values="0; 0.45; 0.45; 0; 0"
                    keyTimes="0; 0.1; 0.70; 0.76; 1"
                    dur="5.2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>

              {/* Micro Labels on Distributed Nodes with Context Highlight */}
              <g fill="#94a3b8" fontSize="8.5" fontFamily="monospace" opacity="0.5">
                <text x="230" y="83" fill={isProjects ? '#00f2fe' : '#94a3b8'}>VPC-EDGE</text>
                <text x="350" y="143" fill={isEducation ? '#fbbf24' : '#94a3b8'}>ap-south-1</text>
                <text x="990" y="63" fill={isResume ? '#34d399' : '#94a3b8'}>IAM-AUTH</text>
                <text x="970" y="593" fill={isEducation ? '#fde68a' : '#fbbf24'}>AWS-S3</text>
                <text x="1250" y="673" fill={isEducation ? '#fde68a' : '#fbbf24'}>EC2-CLUSTER</text>
              </g>

              {/* Context-Reactive Topology Status Tag */}
              <g fontFamily="monospace" fontSize="8.5" letterSpacing="0.05em">
                {isProjects && (
                  <text x="80" y="100" fill="#00f2fe" opacity="0.8">
                    ● TOPOLOGY: APPLICATION & DATA FLOW ACTIVE
                  </text>
                )}
                {isEducation && (
                  <text x="880" y="750" fill="#f59e0b" opacity="0.85">
                    ● TOPOLOGY: AWS CLOUD INFRASTRUCTURE (ap-south-1) ACTIVE
                  </text>
                )}
                {isExperience && (
                  <text x="100" y="435" fill="#818cf8" opacity="0.85">
                    ● TOPOLOGY: CAREER ENGINEERING TIMELINE (FUSECAKE · ETHNUS) MAPPED
                  </text>
                )}
                {isResume && (
                  <text x="960" y="42" fill="#34d399" opacity="0.85">
                    ● TOPOLOGY: VERIFIED CREDENTIAL PIPELINE ACTIVE
                  </text>
                )}
                {isSkills && (
                  <text x="80" y="100" fill="#38bdf8" opacity="0.8">
                    ● TOPOLOGY: POLYGLOT DISTRIBUTED STACK
                  </text>
                )}
              </g>
            </svg>

            {/* Vignette mask: keeps center screen pitch dark so hero card is 100% readable */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,8,17,0.92)_0%,rgba(5,8,17,0.6)_55%,rgba(5,8,17,0.1)_100%)] pointer-events-none" />
          </motion.div>
        )}

        {/* 2. SEQUOIA: Sequoia Twilight */}
        {wallpaper === 'sequoia' && (
          <motion.div
            key="sequoia"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-[#080d1c]"
          >
            {/* Twilight Sky Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b1633] via-[#121b38] to-[#1f162b]" />

            {/* Warm Sunset Amber/Rose Horizon Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-[45vh] bg-gradient-to-t from-amber-600/15 via-rose-600/10 to-transparent blur-2xl" />

            {/* Soft Ambient Mountain Contour */}
            <div className="absolute -bottom-24 -left-10 right-0 h-96 opacity-30">
              <svg viewBox="0 0 1440 320" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                <path
                  fill="#060914"
                  d="M0,192L80,181.3C160,171,320,149,480,165.3C640,181,800,235,960,224C1120,213,1280,139,1360,101.3L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                />
              </svg>
            </div>

            {/* Starfield dots */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:40px_40px] opacity-40" />

            {/* Center Vignette Mask */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,13,28,0.85)_0%,transparent_80%)]" />
          </motion.div>
        )}

        {/* 3. SONOMA: Sonoma Glow */}
        {wallpaper === 'sonoma' && (
          <motion.div
            key="sonoma"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-[#0d0718]"
          >
            {/* Purple & Violet Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1b0a2d] via-[#100922] to-[#090514]" />

            {/* Organic Luminous Aurora Orbs */}
            <div className="absolute top-10 left-1/4 w-[600px] h-[600px] rounded-full bg-purple-600/15 blur-[160px]" />
            <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full bg-fuchsia-600/10 blur-[150px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-indigo-600/10 blur-[170px]" />

            {/* Soft grid */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px] opacity-35" />

            {/* Center Vignette Mask */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(13,7,24,0.88)_0%,transparent_75%)]" />
          </motion.div>
        )}

        {/* 4. OBSIDIAN: Studio Obsidian */}
        {wallpaper === 'obsidian' && (
          <motion.div
            key="obsidian"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-[#07090e]"
          >
            {/* Pure Minimalist Dark Graphite */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#090c13] via-[#07090e] to-[#040508]" />

            {/* Technical Engineering Dot Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

            {/* Very Subtle Corner Crosshair accents */}
            <div className="absolute top-8 left-8 text-white/10 font-mono text-[9px]">+ 01_ROOT</div>
            <div className="absolute top-8 right-8 text-white/10 font-mono text-[9px]">SYS_ARM64 +</div>
            <div className="absolute bottom-20 left-8 text-white/10 font-mono text-[9px]">+ LAT_NODE</div>
            <div className="absolute bottom-20 right-8 text-white/10 font-mono text-[9px]">PROD_V4 +</div>

            {/* Center Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(7,9,14,0.92)_0%,transparent_80%)]" />
          </motion.div>
        )}

        {/* 5. AURORA: Aurora Emerald */}
        {wallpaper === 'aurora' && (
          <motion.div
            key="aurora"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-[#040f12]"
          >
            {/* Celestial Emerald Sky */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#06191c] via-[#041014] to-[#02080a]" />

            {/* Flowing Emerald & Teal Aurora Curtains */}
            <div className="absolute -top-32 left-1/3 w-[650px] h-[650px] rounded-full bg-emerald-500/15 blur-[160px]" />
            <div className="absolute top-1/3 right-10 w-[550px] h-[550px] rounded-full bg-teal-500/12 blur-[150px]" />
            <div className="absolute -bottom-20 left-10 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />

            {/* Starfield */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:36px_36px] opacity-40" />

            {/* Center Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,15,18,0.88)_0%,transparent_75%)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
