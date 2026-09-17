import React from 'react';

export type AppId =
  | 'about'
  | 'resume'
  | 'projects'
  | 'experience'
  | 'education'
  | 'skills'
  | 'contact'
  | 'settings';

export type WallpaperId = 'cloud' | 'sequoia' | 'sonoma' | 'obsidian' | 'aurora';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
}

export interface AppDefinition {
  id: AppId;
  title: string;
  iconName: string;
  badge?: string;
  shortcut?: string;
  defaultSize: { width: number; height: number };
  defaultPosition: { x: number; y: number };
}
