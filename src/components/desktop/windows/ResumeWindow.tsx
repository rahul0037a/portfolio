import React, { useState } from 'react';
import { Download, ExternalLink, FileText, Minus, Plus } from 'lucide-react';
import pages from '../../../data/resumePreview.json';
import './windows.css';

const RESUME_URL = '/Rahul_Rathi_Resume_v4.pdf';

export const ResumeWindow: React.FC = () => {
  const [zoom, setZoom] = useState(100);
  const [failed, setFailed] = useState(false);
  return (
  <div className="resume-app">
    <div className="app-toolbar resume-toolbar">
      <div className="resume-filename"><FileText size={17} /><div><strong>Rahul Rathi</strong><span>Resume / PDF document</span></div></div>
      <div className="app-toolbar-actions">
        <a className="app-button app-button-secondary" href={RESUME_URL} target="_blank" rel="noopener noreferrer"><ExternalLink size={14} /><span>Open in Tab</span></a>
        <a className="app-button app-button-primary" href={RESUME_URL} download="Rahul_Rathi_Resume_v4.pdf"><Download size={14} /><span>Download</span></a>
      </div>
    </div>
    <div className="resume-preview-controls">
      <span>{pages.length} pages</span>
      <div role="group" aria-label="Resume zoom">
        <button onClick={() => setZoom(value => Math.max(100, value - 25))} disabled={zoom === 100} aria-label="Zoom out"><Minus size={14} /></button>
        <button onClick={() => setZoom(100)} aria-label="Fit resume to window" title="Fit to window">{zoom}%</button>
        <button onClick={() => setZoom(value => Math.min(250, value + 25))} disabled={zoom === 250} aria-label="Zoom in"><Plus size={14} /></button>
      </div>
    </div>
    <div className="resume-viewer" tabIndex={0} aria-label="Resume document preview">
      {failed ? <div className="app-empty-state"><FileText size={28} /><h3>Open the original resume</h3><p>The preview could not load. The PDF is available below.</p><a className="app-button app-button-primary" href={RESUME_URL} target="_blank" rel="noopener noreferrer">Open PDF<ExternalLink size={14} /></a></div> : <div className="resume-pages" style={{ width: `${zoom}%`, '--resume-scale': zoom / 100 } as React.CSSProperties}>
        {pages.map((page, index) => <figure className="resume-page" key={page.src}><img src={page.src} width={page.width} height={page.height} alt={`Rahul Rathi resume, page ${index + 1} of ${pages.length}`} loading={index ? 'lazy' : 'eager'} decoding="async" onError={() => setFailed(true)} /><figcaption>Page {index + 1} of {pages.length}</figcaption></figure>)}
      </div>}
    </div>
    <div className="app-status-bar resume-status"><span>Preview of the original resume.</span><a href={RESUME_URL} target="_blank" rel="noopener noreferrer">Open PDF for text & print <ExternalLink size={11} /></a></div>
  </div>
  );
};
