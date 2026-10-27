import React from 'react';
import { useOS } from '../../../context/OSContext';
import { WallpaperId } from '../../../types/os';
import { Palette, Check, MousePointer2, Accessibility } from 'lucide-react';
import './windows.css';

const wallpapers: { id: WallpaperId; name: string; subtitle: string }[] = [
  { id: 'cloud', name: 'Cloud Mesh', subtitle: 'Layered blue horizons with a gentle cursor light' },
  { id: 'sequoia', name: 'Sequoia Twilight', subtitle: 'A warm sunset on a deep blue horizon' },
  { id: 'sonoma', name: 'Sonoma Glow', subtitle: 'Soft violet and indigo tones' },
  { id: 'obsidian', name: 'Studio Obsidian', subtitle: 'A focused, minimal dark workspace' },
  { id: 'aurora', name: 'Aurora Emerald', subtitle: 'Calm green and teal light' },
];

export const SettingsWindow: React.FC = () => {
  const { wallpaper, setWallpaper } = useOS();
  return (
    <div className="portfolio-app settings-app">
      <header className="app-page-heading"><Palette size={21} /><div><h2>Desktop Wallpaper</h2><p>Make this workspace feel a little more like yours.</p></div></header>
      <div className="wallpaper-options" role="group" aria-label="Desktop wallpaper">{wallpapers.map(option => <button type="button" className={`wallpaper-option ${wallpaper === option.id ? 'is-selected' : ''}`} aria-pressed={wallpaper === option.id} key={option.id} onClick={() => setWallpaper(option.id)}><div className={`wallpaper-thumbnail wallpaper-thumbnail-${option.id}`} aria-hidden="true">{wallpaper === option.id && <span><Check size={13} /></span>}</div><strong>{option.name}</strong><p>{option.subtitle}</p></button>)}</div>
      <section className="settings-notes"><h3><MousePointer2 size={14} />Display & Interactivity</h3><p>Use the dock or desktop icons to launch apps. Drag a window by its title bar and use the window controls to minimize or maximize it.</p><h3><Accessibility size={14} />Motion preferences</h3><p>Animations follow your device's reduced-motion setting.</p></section>
    </div>
  );
};
