import React from 'react';
import { ArrowUpRight, Award, BriefcaseBusiness, GraduationCap, Mail } from 'lucide-react';
import { useOS } from '../../context/OSContext';

export const SystemStatusWidget: React.FC = () => {
  const { openApp } = useOS();
  return (
    <section className="profile-widget" aria-labelledby="profile-widget-title">
      <div className="widget-heading"><h2 id="profile-widget-title">At a glance</h2><span>ABOUT ME</span></div>
      <div className="profile-facts">
        <button onClick={() => openApp('experience')}><BriefcaseBusiness size={17} /><span><strong>Building for the real world</strong><small>FuseCake & Ethnus</small></span><ArrowUpRight size={14} /></button>
        <button onClick={() => openApp('education')}><GraduationCap size={18} /><span><strong>Computer Science, B.Tech</strong><small>VIT Chennai, Class of 2025</small></span><ArrowUpRight size={14} /></button>
        <button onClick={() => openApp('education')}><Award size={18} /><span><strong>AWS Certified</strong><small>Cloud Practitioner</small></span><ArrowUpRight size={14} /></button>
      </div>
      <button className="profile-contact" onClick={() => openApp('contact')}><Mail size={15} /><span>Let’s build something together.</span><ArrowUpRight size={15} /></button>
    </section>
  );
};
