import React, { useEffect, useRef, useState } from 'react';
import { RESUME_DATA } from '../../../data/resumeData';
import { Mail, Phone, Copy, Check, ArrowUpRight, ExternalLink } from 'lucide-react';
import './windows.css';

export const ContactWindow: React.FC = () => {
  const [copied, setCopied] = useState<'email' | 'phone' | null>(null);
  const [clipboardError, setClipboardError] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [mailOpened, setMailOpened] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const copyToClipboard = async (text: string, type: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setClipboardError('');
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(null), 2200);
    } catch {
      setCopied(null);
      setClipboardError('Clipboard access is unavailable. You can select and copy the contact details above.');
    }
  };

  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();
    if (!message.trim()) return;
    window.location.href = `mailto:${RESUME_DATA.personal.email}?subject=${encodeURIComponent(subject.trim() || 'Inquiry from Portfolio')}&body=${encodeURIComponent(message)}`;
    setMailOpened(true);
  };

  return (
    <div className="contact-app">
      <header className="contact-intro"><div className="contact-intro-icon"><Mail size={22} /></div><div><h2>Let's build something.</h2><p>Open to full-time software engineering and full-stack roles.</p></div></header>
      <div className="contact-addresses">
        {[{ type: 'email' as const, label: 'To:', value: RESUME_DATA.personal.email, icon: Mail }, { type: 'phone' as const, label: 'Phone:', value: RESUME_DATA.personal.phone, icon: Phone }].map(({ type, label, value, icon: Icon }) => (
          <div className="contact-address-row" key={type}><span className="contact-field-label">{label}</span><span className="contact-address-value"><Icon size={14} />{value}</span><button type="button" className="contact-copy" aria-label={`Copy ${type}`} onClick={() => copyToClipboard(value, type)}>{copied === type ? <Check size={14} /> : <Copy size={14} />}<span>{copied === type ? 'Copied' : `Copy ${type === 'email' ? 'Email' : 'Phone'}`}</span></button></div>
        ))}
        <div className="contact-address-row contact-status"><span className="contact-field-label">Status:</span><span>Available for Full-Time Roles</span><span>{RESUME_DATA.personal.location}</span></div>
        <p className="app-feedback" role="status" aria-live="polite">{clipboardError || (copied ? `${copied === 'email' ? 'Email address' : 'Phone number'} copied.` : '')}</p>
      </div>
      <form onSubmit={handleSend} className="contact-form">
        <label htmlFor="contact-subject">Subject</label><input id="contact-subject" name="subject" type="text" placeholder="Full-Stack Engineer Opportunity / Project Inquiry" value={subject} onChange={e => {setSubject(e.target.value); setMailOpened(false);}} />
        <label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" placeholder="Hi Rahul, I came across your portfolio and would love to discuss..." value={message} onChange={e => {setMessage(e.target.value); setMailOpened(false);}} required rows={5} />
        <p className="contact-mail-note" role="status">{mailOpened ? 'Your email app should open with this draft. Send it there to complete your message.' : 'This opens a draft in your email app. Your message is sent from there.'}</p>
        <div className="contact-actions"><div className="contact-socials">{[{ label: 'LeetCode', href: RESUME_DATA.personal.leetcode }, { label: 'GitHub', href: RESUME_DATA.personal.github }, { label: 'LinkedIn', href: RESUME_DATA.personal.linkedin }].map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ExternalLink size={11} /></a>)}</div><button type="submit" className="app-button app-button-primary">Open Email App<ArrowUpRight size={15} /></button></div>
      </form>
    </div>
  );
};
