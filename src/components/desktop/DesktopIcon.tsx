import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { AppId } from '../../types/os';

interface DesktopIconProps {
  id: AppId;
  title: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  title,
  icon,
  badge,
  badgeColor = 'bg-blue-600 text-white',
}) => {
  const { openApp } = useOS();
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      openApp(id);
    } else {
      setIsSelected(true);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openApp(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      openApp(id);
    }
  };

  return (
    <div
      tabIndex={0}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      onBlur={() => setIsSelected(false)}
      className={`group w-24 p-2 rounded-xl flex flex-col items-center justify-center cursor-pointer select-none transition-all outline-none relative ${
        isSelected
          ? 'bg-white/15 backdrop-blur-md ring-1 ring-white/30 shadow-lg'
          : 'hover:bg-white/10'
      }`}
    >
      {/* Consistent Icon Squircle Container */}
      <div className="w-13 h-13 rounded-2xl bg-[#121724]/90 border border-white/15 backdrop-blur-xl shadow-lg flex items-center justify-center transition-all group-hover:scale-105 group-hover:border-white/30 relative">
        <div className="flex items-center justify-center">
          {icon}
        </div>

        {/* State Badge */}
        {badge && (
          <span
            className={`absolute -top-1.5 -right-1.5 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold shadow-md border border-white/20 ${badgeColor}`}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Label with drop shadow */}
      <span
        className={`mt-2 text-xs text-center font-medium leading-tight px-1.5 py-0.5 rounded transition-colors break-words max-w-[95px] ${
          isSelected ? 'bg-blue-600 text-white' : 'text-slate-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]'
        }`}
      >
        {title}
      </span>
    </div>
  );
};
