import React, { useState } from 'react';
import { RESUME_DATA } from '../../../data/resumeData';
import { Mail, Phone, Copy, Check, Send, ExternalLink, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactWindow: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

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

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Trigger celebratory confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });

    // Construct mailto link
    const mailto = `mailto:${RESUME_DATA.personal.email}?subject=${encodeURIComponent(
      subject || 'Inquiry from Portfolio'
    )}&body=${encodeURIComponent(message)}`;
    window.open(mailto, '_blank');

    setIsSent(true);
    setTimeout(() => setIsSent(false), 4000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0e17] text-slate-100 font-sans">
      {/* Mail Header / Fields */}
      <div className="p-4 bg-[#0f1422] border-b border-white/10 space-y-2.5 text-xs">
        {/* To field */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 w-12 font-medium">To:</span>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-200">
              <Mail size={13} className="text-blue-400" />
              <span className="font-mono">{RESUME_DATA.personal.email}</span>
            </div>
          </div>

          <button
            onClick={() => copyToClipboard(RESUME_DATA.personal.email, 'email')}
            className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors flex items-center gap-1.5 border border-white/10"
          >
            {copiedEmail ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
          </button>
        </div>

        {/* Phone field */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 w-12 font-medium">Phone:</span>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-200">
              <Phone size={13} className="text-emerald-400" />
              <span className="font-mono">{RESUME_DATA.personal.phone}</span>
            </div>
          </div>

          <button
            onClick={() => copyToClipboard(RESUME_DATA.personal.phone, 'phone')}
            className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors flex items-center gap-1.5 border border-white/10"
          >
            {copiedPhone ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            <span>{copiedPhone ? 'Copied!' : 'Copy Phone'}</span>
          </button>
        </div>

        {/* Location & Availability */}
        <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
          <span className="text-slate-500 w-12 font-medium">Status:</span>
          <span className="text-emerald-400 font-medium">Available for Full-Time Roles</span>
          <span>•</span>
          <span>{RESUME_DATA.personal.location}</span>
        </div>
      </div>

      {/* Interactive Compose Form */}
      <form onSubmit={handleSend} className="p-4 flex-1 flex flex-col space-y-3">
        <div>
          <input
            type="text"
            placeholder="Subject (e.g. Full-Stack Engineer Opportunity / Project Inquiry)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#111624] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <textarea
            placeholder="Hi Rahul, I came across your portfolio and would love to discuss..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="w-full flex-1 p-3 rounded-lg bg-[#111624] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-1">
          {/* Social Profiles */}
          <div className="flex items-center gap-2">
            <a
              href={RESUME_DATA.personal.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
            >
              <span>LeetCode</span>
              <ExternalLink size={10} />
            </a>
            <span className="text-slate-600">•</span>
            <a
              href={RESUME_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>GitHub</span>
              <ExternalLink size={10} />
            </a>
            <span className="text-slate-600">•</span>
            <a
              href={RESUME_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-slate-400 hover:text-blue-400 flex items-center gap-1 transition-colors"
            >
              <span>LinkedIn</span>
              <ExternalLink size={10} />
            </a>
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
          >
            {isSent ? (
              <>
                <Sparkles size={13} className="text-amber-300" />
                <span>Opening Mail Client...</span>
              </>
            ) : (
              <>
                <Send size={13} />
                <span>Send Message</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
