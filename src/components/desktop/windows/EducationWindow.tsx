import React from 'react';
import { RESUME_DATA } from '../../../data/resumeData';
import { Award, GraduationCap, Calendar, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const EducationWindow: React.FC = () => {
  return (
    <div className="p-6 bg-[#0a0e17] text-slate-100 font-sans h-full overflow-auto space-y-6">
      {/* AWS Cloud Practitioner Hero Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-indigo-500/5 to-transparent border border-amber-500/30">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Award size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">AWS Certified Cloud Practitioner</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-semibold">
                  ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">Amazon Web Services (AWS) • Aug 2024 – Aug 2027</p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
            Cloud Architecture & IAM
          </span>
        </div>

        <p className="text-xs text-slate-300 mt-3.5 leading-relaxed">
          Comprehensive industry validation covering AWS global cloud infrastructure, IAM security policies, virtual networks (VPC), EC2 compute, S3 storage, relational databases (RDS), and cloud economics.
        </p>
      </div>

      {/* University Degree */}
      <div className="p-5 rounded-2xl bg-[#0f1422] border border-white/10 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <GraduationCap size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Vellore Institute of Technology (VIT)</h3>
              <p className="text-xs text-slate-300">B.Tech in Computer Science and Engineering • Chennai, India</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-blue-400 font-mono">7.91 CGPA</span>
            <div className="text-[10px] text-slate-400 font-mono">2021 – 2025</div>
          </div>
        </div>

        <div className="pt-2 border-t border-white/5">
          <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Core CS Foundation
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {[
              'Data Structures & Algorithms',
              'Object-Oriented Programming (Java/C++)',
              'Database Management Systems',
              'Computer Networks',
              'Operating Systems',
              'Software Engineering'
            ].map((course) => (
              <span key={course} className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stanford Machine Learning */}
      <div className="p-4 rounded-xl bg-[#0f1422] border border-white/10 flex items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Machine Learning Specialization</h4>
          <p className="text-xs text-slate-400">Stanford Online / DeepLearning.AI (Andrew Ng)</p>
          <p className="text-[11px] text-slate-400 mt-1">Supervised Learning, Neural Networks, Cost Optimization</p>
        </div>
        <span className="text-xs font-mono text-emerald-400 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 shrink-0">
          Completed
        </span>
      </div>
    </div>
  );
};
