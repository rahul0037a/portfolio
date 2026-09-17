import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Server, ShieldCheck, Database, Cloud } from 'lucide-react';

export const SystemPulseVisualizer: React.FC = () => {
  const nodes = [
    { label: 'Client', icon: <Globe size={11} className="text-cyan-400" /> },
    { label: 'API', icon: <Server size={11} className="text-blue-400" /> },
    { label: 'Auth', icon: <ShieldCheck size={11} className="text-emerald-400" /> },
    { label: 'Data', icon: <Database size={11} className="text-teal-400" /> },
    { label: 'Cloud', icon: <Cloud size={11} className="text-amber-400" /> },
  ];

  return (
    <div className="w-full max-w-lg mx-auto mt-4 px-4 py-2.5 rounded-2xl bg-[#090d18]/50 backdrop-blur-md border border-white/5 opacity-50 hover:opacity-85 transition-opacity duration-500 select-none">
      <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mb-1.5 px-1">
        <span className="flex items-center gap-1 text-cyan-400/90 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          APPLICATION FLOW
        </span>
        <span className="text-emerald-400/90 font-medium">REQUEST FLOW · HEALTHY</span>
      </div>

      {/* Connected Bus Line with Nodes: Client → API → Auth → Data → Cloud */}
      <div className="relative flex items-center justify-between px-2 pt-1 pb-1">
        {/* Connecting Track Line */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[1.5px] bg-gradient-to-r from-cyan-500/20 via-blue-500/30 to-amber-500/20" />

        {/* Animated Flowing Light Packet */}
        <motion.div
          animate={{ left: ['5%', '92%', '5%'] }}
          transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
          className="absolute top-1/2 -translate-y-1/2 w-8 h-[2.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px]"
        />

        {nodes.map((node) => (
          <div key={node.label} className="relative z-10 flex flex-col items-center">
            <div className="w-6 h-6 rounded-lg bg-[#0e1424] border border-white/10 flex items-center justify-center shadow-md">
              {node.icon}
            </div>
            <span className="mt-1 text-[8px] font-mono text-slate-400 tracking-tight whitespace-nowrap">
              {node.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
