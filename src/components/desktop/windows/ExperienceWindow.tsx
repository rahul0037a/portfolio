import React, { useState } from 'react';
import { RESUME_DATA } from '../../../data/resumeData';
import { Calendar, MapPin, CheckCircle2, Briefcase, GraduationCap } from 'lucide-react';
import './windows.css';

const cleanText = (text: string) => text.replace(/[–—]/g, ' - ');

export const ExperienceWindow: React.FC = () => {
  const [selectedId, setSelectedId] = useState('fusecake');
  const role = RESUME_DATA.experiences.find(experience => experience.id === selectedId) || RESUME_DATA.experiences[0];
  return (
    <div className="experience-app">
      <div className="experience-body">
        <nav className="experience-timeline" aria-label="Career timeline"><span className="app-eyebrow">Timeline</span><div>{RESUME_DATA.experiences.map(experience => {
          const Icon = experience.id === 'vit' ? GraduationCap : Briefcase;
          return <button type="button" key={experience.id} className={selectedId === experience.id ? 'is-selected' : ''} aria-pressed={selectedId === experience.id} onClick={() => setSelectedId(experience.id)}><Icon size={15} /><span><span className="timeline-year">{experience.year}</span><strong>{experience.company}</strong><span className="timeline-role">{experience.role}</span></span></button>;
        })}</div><p>Select a milestone to explore the work and its impact.</p></nav>
        <main className="experience-details">
          <header className="experience-heading"><span className="app-eyebrow">{role.year} / {role.company}</span><h2>{role.role}</h2><div><span><Calendar size={13} />{cleanText(role.period)}</span><span><MapPin size={13} />{role.location}</span></div></header>
          <section className="app-panel experience-built"><h3>What You Built</h3><p>{cleanText(role.whatYouBuilt || role.summary)}</p></section>
          <section className="experience-technologies"><h3>Technologies & Architecture</h3><div className="app-tags">{(role.technologies || role.techStack).map(technology => <span key={technology}>{technology}</span>)}</div></section>
          <section className="app-panel experience-result"><h3>Result & Measurable Impact</h3><p>{cleanText(role.result)}</p>{role.stats?.length > 0 && <div className="experience-stats">{role.stats.map(stat => <div key={stat.label}><strong>{cleanText(stat.value)}</strong><span>{stat.label}</span></div>)}</div>}</section>
          <section className="experience-responsibilities"><h3>Detailed Responsibilities</h3><ul>{role.bullets.map(bullet => <li key={bullet}><CheckCircle2 size={14} /><p>{cleanText(bullet)}</p></li>)}</ul></section>
        </main>
      </div>
      <footer className="app-status-bar"><span>{RESUME_DATA.experiences.length} career milestones</span><span>Ethnus / VIT Chennai / FuseCake</span></footer>
    </div>
  );
};
