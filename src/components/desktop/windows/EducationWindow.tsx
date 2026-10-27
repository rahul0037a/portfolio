import React from 'react';
import { RESUME_DATA } from '../../../data/resumeData';
import { Award, GraduationCap, Calendar, ExternalLink, BookOpen } from 'lucide-react';
import './windows.css';

export const EducationWindow: React.FC = () => {
  const { education, certifications } = RESUME_DATA;
  return (
    <div className="portfolio-app education-app">
      <header className="app-page-heading">
        <GraduationCap size={21} />
        <div><h2>Education & AWS</h2><p>A foundation in computer science, with continued learning in cloud and machine learning.</p></div>
      </header>
      <section className="education-degree app-panel">
        <div className="education-degree-heading">
          <div><span className="app-eyebrow">University</span><h3>{education.institution}</h3><p>{education.degree}</p></div>
          <div className="education-grade"><strong>{education.cgpa}</strong><span>CGPA</span></div>
        </div>
        <p className="education-period"><Calendar size={13} />{education.period.replace(/[–—]/g, '-')}<span>{education.location}</span></p>
        <div className="education-courses"><h4><BookOpen size={14} /> Core coursework</h4><div className="app-tags">{education.coreCourses.map(course => <span key={course}>{course}</span>)}</div></div>
        <div className="education-highlights">{education.highlights.map(item => <p key={item}>{item}</p>)}</div>
      </section>
      <section className="education-certifications">
        <h3 className="app-section-heading">Certifications & continued learning</h3>
        {certifications.map((certificate, index) => (
          <article className={`app-panel education-certificate ${index === 0 ? 'education-certificate-featured' : ''}`} key={certificate.title}>
            <div className="certificate-icon"><Award size={21} /></div>
            <div className="certificate-details">
              <h4>{certificate.title}</h4><p>{certificate.issuer}</p><span className="certificate-date">{certificate.date.replace(/[–—]/g, '-')}</span>
              <div className="app-tags">{certificate.skillsGained.map(skill => <span key={skill}>{skill}</span>)}</div>
              {certificate.credentialUrl && <a className="app-inline-link" href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer">View credential <ExternalLink size={12} /></a>}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};
