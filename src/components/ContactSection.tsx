import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '../data/resumeData';
import { Mail, Phone, Send, Copy, Check, Sparkles, MessageSquare, Briefcase, MapPin, Award, GraduationCap, FileText, CheckCircle2, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  onOpenResumeModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResumeModal }) => {
  const { personal, education } = RESUME_DATA;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#00f2fe', '#00e5a3', '#6366f1', '#f59e0b']
    });

    setFormSent(true);
  };

  return (
    <section id="contact" className="relative py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 overflow-hidden z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-semibold flex items-center gap-1.5">
            <Sparkles size={14} />
            Connect & Collaborate // Open for Opportunities
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent" />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Let's Discuss <span className="text-gradient-cyan">Engineering Opportunities</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Actively interviewing for Software Engineering, Full-Stack, and Frontend positions. Whether you have a role, project, or technical conversation in mind — connect directly.
          </p>
        </div>

        {/* 2-Column Clean Recruiter Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Message Form & Direct Touchpoints */}
          <div className="lg:col-span-6 space-y-6">
            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email Card */}
              <div className="card-prism p-5 rounded-2xl border-slate-800/90 flex flex-col justify-between group hover:border-cyan-500/40 transition-all shadow-card-prism">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Mail size={18} />
                  </div>
                  <button
                    onClick={() => copyToClipboard(personal.email, 'email')}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold">Email Address</div>
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors break-all"
                  >
                    {personal.email}
                  </a>
                </div>
                {copiedEmail && (
                  <span className="text-[10px] text-emerald-400 font-mono mt-1">Copied to clipboard!</span>
                )}
              </div>

              {/* Phone Card */}
              <div className="card-prism p-5 rounded-2xl border-slate-800/90 flex flex-col justify-between group hover:border-teal-500/40 transition-all shadow-card-prism">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400">
                    <Phone size={18} />
                  </div>
                  <button
                    onClick={() => copyToClipboard(personal.phone, 'phone')}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Copy phone to clipboard"
                  >
                    {copiedPhone ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold">Direct Mobile</div>
                  <a
                    href={`tel:${personal.phone}`}
                    className="text-xs sm:text-sm font-semibold text-white group-hover:text-teal-300 transition-colors"
                  >
                    {personal.phone}
                  </a>
                </div>
                {copiedPhone && (
                  <span className="text-[10px] text-emerald-400 font-mono mt-1">Copied to clipboard!</span>
                )}
              </div>
            </div>

            {/* Social Link Cards */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="card-prism p-4 rounded-2xl border-slate-800/90 flex items-center gap-3 hover:border-cyan-500/40 hover:bg-[#080d1a] transition-all group shadow-card-prism"
              >
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                  <LinkedinIcon size={20} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    LinkedIn
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">/in/rahul-rathi</div>
                </div>
              </a>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="card-prism p-4 rounded-2xl border-slate-800/90 flex items-center gap-3 hover:border-slate-700 hover:bg-[#080d1a] transition-all group shadow-card-prism"
              >
                <div className="p-2 rounded-xl bg-slate-900 text-slate-200 group-hover:scale-110 transition-transform">
                  <GithubIcon size={20} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white group-hover:text-slate-200 transition-colors">
                    GitHub
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">@rahul0037a</div>
                </div>
              </a>
            </div>

            {/* Direct Message Form */}
            <div className="card-prism p-6 sm:p-7 rounded-3xl border-slate-800/90 shadow-card-prism">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <MessageSquare size={16} className="text-cyan-400" />
                <span>Send Direct Message</span>
              </h3>

              {formSent ? (
                <div className="p-6 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto">
                    <Check size={20} />
                  </div>
                  <div className="font-bold text-white text-sm">Message Sent Successfully!</div>
                  <div className="text-xs text-slate-400">
                    Thank you {formData.name}. Rahul will reply promptly to {formData.email}.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                        placeholder="Alex Miller"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                        placeholder="alex@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                      placeholder="Software Engineer Role / Opportunity"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Message</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
                      placeholder="Hi Rahul, we'd love to schedule an introductory conversation..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-bold text-xs shadow-neon-cyan flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                  >
                    <Send size={13} />
                    <span>Transmit Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Recruiter Candidate Profile & Fast Evaluation Summary */}
          <div className="lg:col-span-6 space-y-4">
            <div className="card-prism p-6 sm:p-8 rounded-3xl border-slate-800/90 shadow-card-prism relative overflow-hidden space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase">
                  <Briefcase size={16} />
                  <span>Candidate Profile & Status</span>
                </div>
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Actively Interviewing
                </span>
              </div>

              {/* Roles Sought */}
              <div>
                <div className="text-xs font-mono uppercase text-slate-400 mb-2 font-semibold">
                  Roles & Positions Targeted
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Software Engineer (SDE I/II)', 'Full-Stack Developer', 'Frontend Engineer (React/Next.js)', 'Backend Engineer (Node/Python)'].map((role) => (
                    <span key={role} className="px-3 py-1 rounded-lg bg-[#050814] border border-slate-800 text-xs text-slate-200 font-medium">
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Work Logistics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-[#050814] border border-slate-800">
                  <div className="text-slate-400 flex items-center gap-1.5 mb-1">
                    <MapPin size={13} className="text-cyan-400" />
                    <span className="font-semibold">Location & Mobility</span>
                  </div>
                  <div className="text-slate-200 font-sans text-xs">
                    Remote • Hybrid • Open to Relocation
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#050814] border border-slate-800">
                  <div className="text-slate-400 flex items-center gap-1.5 mb-1">
                    <Award size={13} className="text-amber-400" />
                    <span className="font-semibold">Cloud Certification</span>
                  </div>
                  <div className="text-slate-200 font-sans text-xs">
                    AWS Cloud Practitioner (Valid 2027)
                  </div>
                </div>
              </div>

              {/* Engineering Strengths Highlights */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-mono uppercase text-slate-400 font-semibold">
                  Key Engineering Strengths
                </div>
                {[
                  'Hands-on experience shipping production SaaS features in Next.js, TypeScript & Tailwind.',
                  'Built scalable full-stack architectures with modular MVC patterns, REST APIs, and NoSQL modeling.',
                  'Strong computer science theoretical foundation from VIT Chennai (7.91 CGPA, 2025).',
                  'Proficient in secure auth systems (Passport.js, connect-mongo HTTP-only sessions, Helmet protection).'
                ].map((strength, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>{strength}</span>
                  </div>
                ))}
              </div>

              {/* View/Download Resume CTA Banner */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-white">Original Verified Resume (PDF)</div>
                  <div className="text-xs text-slate-400 font-mono">Rahul_Rathi_Resume_v4.pdf</div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={onOpenResumeModal}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all hover:scale-105"
                  >
                    <FileText size={14} />
                    <span>View PDF</span>
                  </button>

                  <a
                    href="/Rahul_Rathi_Resume_v4.pdf"
                    download="Rahul_Rathi_Resume.pdf"
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-bold text-xs shadow-neon-cyan flex items-center justify-center gap-1.5 transition-all hover:scale-105"
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
