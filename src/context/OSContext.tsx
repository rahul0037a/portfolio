import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { AppId, WallpaperId, WindowState } from '../types/os';

export interface TourStep {
  stepNumber: number;
  id: AppId;
  stepId: string;
  projectId?: string;
  title: string;
  tagline: string;
  note: string;
  durationSeconds: number; // Optimal viewing time per section
}

export const TOUR_STEPS: TourStep[] = [
  {
    stepNumber: 1,
    id: 'about',
    stepId: '01',
    title: 'Who I am',
    tagline: 'VIT Chennai · CSE · 2025 · Balasore, Odisha',
    note: 'AWS Certified Cloud Practitioner and full-stack software engineer passionate about architecting reliable systems.',
    durationSeconds: 10,
  },
  {
    stepNumber: 2,
    id: 'experience',
    stepId: '02',
    title: 'Experience',
    tagline: '2023 Ethnus Intern → 2025 VIT CSE → 2026 FuseCake Developer',
    note: 'Shipped 35+ component UI system, 2.4x conversion stateful auth pipeline, and 4+ production MERN applications.',
    durationSeconds: 8,
  },
  {
    stepNumber: 3,
    id: 'projects',
    stepId: '03',
    projectId: 'wanderlust',
    title: 'WanderLust',
    tagline: 'Production Architecture: MVC, Passport, Joi, Leaflet, Cloudinary',
    note: 'Clickable architecture pipeline with deep engineering decisions explaining why MongoDB, MVC, Passport, and Cloudinary were chosen.',
    durationSeconds: 15,
  },
  {
    stepNumber: 4,
    id: 'skills',
    stepId: '04',
    title: 'Technical Stack',
    tagline: 'Depth Matrix: Frontend, Backend, Data, Cloud & Core Engineering',
    note: 'Concrete project evidence for every tool rather than arbitrary proficiency bars.',
    durationSeconds: 10,
  },
  {
    stepNumber: 5,
    id: 'education',
    stepId: '05',
    title: 'AWS / Education',
    tagline: 'AWS Certified Cloud Practitioner (Aug 2024 - Aug 2027) & VIT CSE',
    note: 'Cloud infrastructure foundation in IAM, VPC, EC2, and S3 alongside Stanford Machine Learning.',
    durationSeconds: 7,
  },
  {
    stepNumber: 6,
    id: 'contact',
    stepId: '06',
    title: 'Resume + Contact',
    tagline: 'Resume PDF Download & Direct Contact Lines',
    note: 'Immediate availability for Full-Time Software Engineer & Full-Stack roles (Remote / Relocation).',
    durationSeconds: 10,
  },
];

interface OSContextType {
  windows: Record<AppId, WindowState>;
  activeWindowId: AppId | null;
  selectedProjectId: string | null;
  wallpaper: WallpaperId;
  isSpotlightOpen: boolean;
  isControlCenterOpen: boolean;
  isTourActive: boolean;
  currentTourStep: number;
  isTourAutoPlaying: boolean;
  tourProgress: number; // 0 to 100%
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  maximizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  updateWindowPosition: (id: AppId, position: { x: number; y: number }) => void;
  setSelectedProjectId: (id: string | null) => void;
  openProject: (id: string) => void;
  toggleSpotlight: () => void;
  closeSpotlight: () => void;
  toggleControlCenter: () => void;
  closeControlCenter: () => void;
  setWallpaper: (wallpaper: WallpaperId) => void;
  startTour: () => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
  jumpToTourStep: (stepIdx: number) => void;
  endTour: () => void;
  toggleTourAutoPlay: () => void;
  pauseTourAutoPlay: () => void;
  resumeTourAutoPlay: () => void;
}

const INITIAL_WINDOWS: Record<AppId, WindowState> = {
  about: {
    id: 'about',
    title: 'About Rahul Rathi',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultPosition: { x: 80, y: 84 },
    defaultSize: { width: 580, height: 550 },
  },
  resume: {
    id: 'resume',
    title: 'Rahul_Rathi_Resume_v4.pdf - Preview',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultPosition: { x: 70, y: 84 },
    defaultSize: { width: 740, height: 600 },
  },
  projects: {
    id: 'projects',
    title: 'Projects - Finder',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultPosition: { x: 100, y: 84 },
    defaultSize: { width: 920, height: 620 },
  },
  experience: {
    id: 'experience',
    title: 'Career & Work Experience - Notes',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultPosition: { x: 130, y: 84 },
    defaultSize: { width: 760, height: 550 },
  },
  education: {
    id: 'education',
    title: 'Academics & AWS Certification',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultPosition: { x: 150, y: 84 },
    defaultSize: { width: 680, height: 520 },
  },
  skills: {
    id: 'skills',
    title: 'System Profiler - Tech Stack Depth',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultPosition: { x: 170, y: 84 },
    defaultSize: { width: 720, height: 540 },
  },
  contact: {
    id: 'contact',
    title: 'Mail - New Message to Rahul',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultPosition: { x: 190, y: 84 },
    defaultSize: { width: 600, height: 520 },
  },
  settings: {
    id: 'settings',
    title: 'System Settings',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultPosition: { x: 210, y: 84 },
    defaultSize: { width: 520, height: 380 },
  },
};

interface DesktopState {
  windows: Record<AppId, WindowState>;
  activeWindowId: AppId | null;
  selectedProjectId: string | null;
  isSpotlightOpen: boolean;
  isControlCenterOpen: boolean;
  isTourActive: boolean;
  currentTourStep: number;
  isTourAutoPlaying: boolean;
  tourProgress: number;
  tourRevision: number;
}

type DesktopAction =
  | { type: 'OPEN' | 'CLOSE' | 'MINIMIZE' | 'MAXIMIZE' | 'FOCUS'; id: AppId }
  | { type: 'POSITION'; id: AppId; position: { x: number; y: number } }
  | { type: 'PROJECT'; id: string | null; open?: boolean }
  | { type: 'SPOTLIGHT' | 'CONTROL_CENTER'; open?: boolean }
  | { type: 'DISMISS_OVERLAYS' }
  | { type: 'TOUR_START' | 'TOUR_NEXT' | 'TOUR_PREV'; viewportWidth: number }
  | { type: 'TOUR_STEP'; index: number; viewportWidth: number }
  | { type: 'TOUR_END' }
  | { type: 'TOUR_PLAY'; playing?: boolean }
  | { type: 'TOUR_TICK'; progress: number; viewportWidth: number; revision: number };

const INITIAL_STATE: DesktopState = {
  windows: INITIAL_WINDOWS,
  activeWindowId: null,
  selectedProjectId: null,
  isSpotlightOpen: false,
  isControlCenterOpen: false,
  isTourActive: false,
  currentTourStep: 0,
  isTourAutoPlaying: false,
  tourProgress: 0,
  tourRevision: 0,
};

// Desktop windows occupy layers 20-27. Shell navigation and overlays stay above them.
function bringToFront(windows: Record<AppId, WindowState>, id: AppId) {
  const ordered = Object.values(windows).filter((item) => item.id !== id).sort((a, b) => a.zIndex - b.zIndex);
  const updated = { ...windows };
  ordered.forEach((item, index) => {
    updated[item.id] = { ...item, zIndex: 20 + index };
  });
  updated[id] = { ...windows[id], zIndex: 20 + ordered.length };
  return updated;
}

function topVisibleWindow(windows: Record<AppId, WindowState>): AppId | null {
  return Object.values(windows)
    .filter((item) => item.isOpen && !item.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null;
}

function showTourStep(state: DesktopState, index: number, viewportWidth: number): DesktopState {
  const step = TOUR_STEPS[index];
  if (!step) return state;
  const windows = bringToFront(state.windows, step.id);
  for (const appId of Object.keys(windows) as AppId[]) {
    const item = windows[appId];
    windows[appId] = {
      ...item,
      isOpen: appId === step.id,
      isMinimized: false,
      // A guided step always opens in a predictable, centered position.
      ...(appId === step.id ? {
        isMaximized: false,
        focusRequest: (item.focusRequest ?? 0) + 1,
        position: {
          x: Math.max(12, (viewportWidth - Math.min(item.defaultSize?.width ?? 720, viewportWidth - 24)) / 2),
          y: 112,
        },
      } : {}),
    };
  }
  return {
    ...state,
    windows,
    activeWindowId: step.id,
    selectedProjectId: step.projectId ?? state.selectedProjectId,
    currentTourStep: index,
    tourProgress: 0,
    tourRevision: state.tourRevision + 1,
    isSpotlightOpen: false,
    isControlCenterOpen: false,
  };
}

function desktopReducer(state: DesktopState, action: DesktopAction): DesktopState {
  switch (action.type) {
    case 'OPEN': {
      const windows = bringToFront(state.windows, action.id);
      windows[action.id] = { ...windows[action.id], isOpen: true, isMinimized: false, focusRequest: (windows[action.id].focusRequest ?? 0) + 1 };
      return { ...state, windows, activeWindowId: action.id, isTourAutoPlaying: state.isTourActive ? false : state.isTourAutoPlaying };
    }
    case 'CLOSE':
    case 'MINIMIZE': {
      const windows = {
        ...state.windows,
        [action.id]: {
          ...state.windows[action.id],
          ...(action.type === 'CLOSE' ? { isOpen: false, isMinimized: false } : { isMinimized: true }),
        },
      };
      return {
        ...state,
        windows,
        activeWindowId: state.activeWindowId === action.id ? topVisibleWindow(windows) : state.activeWindowId,
        isTourAutoPlaying: state.isTourActive ? false : state.isTourAutoPlaying,
      };
    }
    case 'MAXIMIZE':
      return {
        ...state,
        windows: {
          ...bringToFront(state.windows, action.id),
          [action.id]: {
            ...state.windows[action.id],
            isMaximized: !state.windows[action.id].isMaximized,
            zIndex: 27,
          },
        },
        activeWindowId: action.id,
      };
    case 'FOCUS':
      if (state.activeWindowId === action.id || !state.windows[action.id].isOpen || state.windows[action.id].isMinimized) return state;
      return { ...state, windows: bringToFront(state.windows, action.id), activeWindowId: action.id };
    case 'POSITION':
      return { ...state, windows: { ...state.windows, [action.id]: { ...state.windows[action.id], position: action.position } } };
    case 'PROJECT': {
      const updated = { ...state, selectedProjectId: action.id };
      return action.open ? desktopReducer(updated, { type: 'OPEN', id: 'projects' }) : updated;
    }
    case 'SPOTLIGHT': {
      const open = action.open ?? !state.isSpotlightOpen;
      return { ...state, isSpotlightOpen: open, isControlCenterOpen: false, isTourAutoPlaying: open && state.isTourActive ? false : state.isTourAutoPlaying };
    }
    case 'CONTROL_CENTER': {
      const open = action.open ?? !state.isControlCenterOpen;
      return { ...state, isControlCenterOpen: open, isSpotlightOpen: false, isTourAutoPlaying: open && state.isTourActive ? false : state.isTourAutoPlaying };
    }
    case 'DISMISS_OVERLAYS':
      return state.isSpotlightOpen || state.isControlCenterOpen ? { ...state, isSpotlightOpen: false, isControlCenterOpen: false } : state;
    case 'TOUR_START':
      return showTourStep({ ...state, isTourActive: true, isTourAutoPlaying: true }, 0, action.viewportWidth);
    case 'TOUR_STEP':
      return showTourStep(state, action.index, action.viewportWidth);
    case 'TOUR_NEXT':
      return state.currentTourStep < TOUR_STEPS.length - 1
        ? showTourStep(state, state.currentTourStep + 1, action.viewportWidth)
        : { ...state, isTourActive: false, isTourAutoPlaying: false, tourProgress: 0 };
    case 'TOUR_PREV':
      return showTourStep(state, Math.max(0, state.currentTourStep - 1), action.viewportWidth);
    case 'TOUR_END':
      return { ...state, isTourActive: false, isTourAutoPlaying: false, tourProgress: 0 };
    case 'TOUR_PLAY': {
      const playing = action.playing ?? !state.isTourAutoPlaying;
      if (state.isTourAutoPlaying === playing || !state.isTourActive) return state;
      return { ...state, isTourAutoPlaying: playing, tourProgress: playing && state.tourProgress >= 100 ? 0 : state.tourProgress, tourRevision: state.tourRevision + 1 };
    }
    case 'TOUR_TICK':
      if (!state.isTourActive || !state.isTourAutoPlaying || action.revision !== state.tourRevision) return state;
      if (action.progress < 100) return { ...state, tourProgress: Math.max(0, action.progress) };
      return state.currentTourStep < TOUR_STEPS.length - 1
        ? showTourStep(state, state.currentTourStep + 1, action.viewportWidth)
        : { ...state, isTourAutoPlaying: false, tourProgress: 100 };
    default:
      return state;
  }
}

const WALLPAPER_KEY = 'rathios-wallpaper';
const WALLPAPERS: WallpaperId[] = ['cloud', 'sequoia', 'sonoma', 'obsidian', 'aurora'];

function readWallpaper(): WallpaperId {
  try {
    const saved = localStorage.getItem(WALLPAPER_KEY);
    return WALLPAPERS.includes(saved as WallpaperId) ? saved as WallpaperId : 'cloud';
  } catch {
    return 'cloud';
  }
}

const viewportWidth = () => typeof window === 'undefined' ? 1280 : window.innerWidth;
const OSContext = createContext<OSContextType | undefined>(undefined);

export const OSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(desktopReducer, INITIAL_STATE);
  const [wallpaper, updateWallpaper] = useState<WallpaperId>(readWallpaper);

  const setWallpaper = useCallback((value: WallpaperId) => {
    if (WALLPAPERS.includes(value)) updateWallpaper(value);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(WALLPAPER_KEY, wallpaper);
    } catch {
      // The desktop still works when browser storage is unavailable.
    }
  }, [wallpaper]);

  const openApp = useCallback((id: AppId) => dispatch({ type: 'OPEN', id }), []);
  const closeApp = useCallback((id: AppId) => dispatch({ type: 'CLOSE', id }), []);
  const minimizeApp = useCallback((id: AppId) => dispatch({ type: 'MINIMIZE', id }), []);
  const maximizeApp = useCallback((id: AppId) => dispatch({ type: 'MAXIMIZE', id }), []);
  const focusApp = useCallback((id: AppId) => dispatch({ type: 'FOCUS', id }), []);
  const updateWindowPosition = useCallback((id: AppId, position: { x: number; y: number }) => dispatch({ type: 'POSITION', id, position }), []);
  const setSelectedProjectId = useCallback((id: string | null) => dispatch({ type: 'PROJECT', id }), []);
  const openProject = useCallback((id: string) => dispatch({ type: 'PROJECT', id, open: true }), []);
  const toggleSpotlight = useCallback(() => dispatch({ type: 'SPOTLIGHT' }), []);
  const closeSpotlight = useCallback(() => dispatch({ type: 'SPOTLIGHT', open: false }), []);
  const toggleControlCenter = useCallback(() => dispatch({ type: 'CONTROL_CENTER' }), []);
  const closeControlCenter = useCallback(() => dispatch({ type: 'CONTROL_CENTER', open: false }), []);
  const startTour = useCallback(() => dispatch({ type: 'TOUR_START', viewportWidth: viewportWidth() }), []);
  const nextTourStep = useCallback(() => dispatch({ type: 'TOUR_NEXT', viewportWidth: viewportWidth() }), []);
  const prevTourStep = useCallback(() => dispatch({ type: 'TOUR_PREV', viewportWidth: viewportWidth() }), []);
  const jumpToTourStep = useCallback((index: number) => dispatch({ type: 'TOUR_STEP', index, viewportWidth: viewportWidth() }), []);
  const endTour = useCallback(() => dispatch({ type: 'TOUR_END' }), []);
  const toggleTourAutoPlay = useCallback(() => dispatch({ type: 'TOUR_PLAY' }), []);
  const pauseTourAutoPlay = useCallback(() => dispatch({ type: 'TOUR_PLAY', playing: false }), []);
  const resumeTourAutoPlay = useCallback(() => dispatch({ type: 'TOUR_PLAY', playing: true }), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        dispatch({ type: 'SPOTLIGHT' });
      } else if (event.key === 'Escape') {
        dispatch({ type: 'DISMISS_OVERLAYS' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Elapsed time is based on the monotonic clock, so delayed intervals do not slow the tour.
  useEffect(() => {
    if (!state.isTourActive || !state.isTourAutoPlaying) return;
    const startingProgress = state.tourProgress;
    const startedAt = performance.now();
    const duration = TOUR_STEPS[state.currentTourStep].durationSeconds * 1000;
    const timer = window.setInterval(() => {
      dispatch({
        type: 'TOUR_TICK',
        progress: startingProgress + ((performance.now() - startedAt) / duration) * 100,
        viewportWidth: viewportWidth(),
        revision: state.tourRevision,
      });
    }, 50);
    return () => window.clearInterval(timer);
    // Progress deliberately does not restart the clock on every tick.
  }, [state.isTourActive, state.isTourAutoPlaying, state.currentTourStep, state.tourRevision]);

  useEffect(() => {
    const pauseWhenHidden = () => {
      if (document.hidden) pauseTourAutoPlay();
    };
    document.addEventListener('visibilitychange', pauseWhenHidden);
    return () => document.removeEventListener('visibilitychange', pauseWhenHidden);
  }, [pauseTourAutoPlay]);

  return (
    <OSContext.Provider value={{
      ...state,
      wallpaper,
      openApp,
      closeApp,
      minimizeApp,
      maximizeApp,
      focusApp,
      updateWindowPosition,
      setSelectedProjectId,
      openProject,
      toggleSpotlight,
      closeSpotlight,
      toggleControlCenter,
      closeControlCenter,
      setWallpaper,
      startTour,
      nextTourStep,
      prevTourStep,
      jumpToTourStep,
      endTour,
      toggleTourAutoPlay,
      pauseTourAutoPlay,
      resumeTourAutoPlay,
    }}>
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) throw new Error('useOS must be used within an OSProvider');
  return context;
};
