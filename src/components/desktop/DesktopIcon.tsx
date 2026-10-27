import React from 'react';
import { useOS } from '../../context/OSContext';
import { AppId } from '../../types/os';

interface DesktopIconProps {
  id: AppId;
  title: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ id, title, icon, badge }) => {
  const { openApp, activeWindowId } = useOS();
  return (
    <button type="button" className={`os-desktop-icon os-app-${id} ${activeWindowId === id ? 'is-active' : ''}`} onClick={() => openApp(id)} aria-label={`Open ${title}`}>
      <span className="os-desktop-icon-art" aria-hidden="true">{icon}{badge && <span className="os-desktop-badge">{badge}</span>}</span>
      <span className="os-desktop-icon-label">{title}</span>
    </button>
  );
};
