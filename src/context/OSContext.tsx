import React, { createContext, useContext, useState, useEffect } from 'react';
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
    title: '01 — Who I am',
    tagline: 'VIT Chennai · CSE · 2025 · Balasore, Odisha',
    note: 'AWS Certified Cloud Practitioner and full-stack software engineer passionate about architecting reliable systems.',
    durationSeconds: 10,
  },
  {
    stepNumber: 2,
    id: 'experience',
    stepId: '02',
    title: '02 — Experience',
    tagline: '2023 Ethnus Intern → 2025 VIT CSE → 2026 FuseCake Developer',
    note: 'Shipped 35+ component UI system, 2.4x conversion stateful auth pipeline, and 4+ production MERN applications.',
    durationSeconds: 8,
  },
  {
    stepNumber: 3,
    id: 'projects',
    stepId: '03',
    projectId: 'wanderlust',
    title: '03 — WanderLust',
    tagline: 'Production Architecture: MVC, Passport, Joi, Leaflet, Cloudinary',
    note: 'Clickable architecture pipeline with deep engineering decisions explaining why MongoDB, MVC, Passport, and Cloudinary were chosen.',
    durationSeconds: 15,
  },
  {
    stepNumber: 4,
    id: 'skills',
    stepId: '04',
    title: '04 — Technical Stack',
    tagline: 'Depth Matrix: Frontend, Backend, Data, Cloud & Core Engineering',
    note: 'Concrete project evidence for every tool rather than arbitrary proficiency bars.',
    durationSeconds: 10,
  },
  {
    stepNumber: 5,
    id: 'education',
    stepId: '05',
    title: '05 — AWS / Education',
    tagline: 'AWS Certified Cloud Practitioner (Aug 2024 – Aug 2027) & VIT CSE',
    note: 'Cloud infrastructure foundation in IAM, VPC, EC2, and S3 alongside Stanford Machine Learning.',
    durationSeconds: 7,
  },
  {
    stepNumber: 6,
    id: 'contact',
    stepId: '06',
    title: '06 — Resume + Contact',
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
    title: 'Rahul_Rathi_Resume_v4.pdf — Preview',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultPosition: { x: 70, y: 84 },
    defaultSize: { width: 740, height: 600 },
  },
  projects: {
    id: 'projects',
    title: 'Projects — Finder',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultPosition: { x: 100, y: 84 },
    defaultSize: { width: 920, height: 620 },
  },
  experience: {
    id: 'experience',
    title: 'Career & Work Experience — Notes',
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
    title: 'System Profiler — Tech Stack Depth',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultPosition: { x: 170, y: 84 },
    defaultSize: { width: 720, height: 540 },
  },
  contact: {
    id: 'contact',
    title: 'Mail — New Message to Rahul',
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

const OSContext = createContext<OSContextType | undefined>(undefined);

export const OSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<AppId | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [highestZIndex, setHighestZIndex] = useState<number>(20);
  const [wallpaper, setWallpaper] = useState<WallpaperId>('cloud');
  const [isSpotlightOpen, setIsSpotlightOpen] = useState<boolean>(false);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState<boolean>(false);

  // Recruiter Tour state
  const [isTourActive, setIsTourActive] = useState<boolean>(false);
  const [currentTourStep, setCurrentTourStep] = useState<number>(0);
  const [isTourAutoPlaying, setIsTourAutoPlaying] = useState<boolean>(true);
  const [tourProgress, setTourProgress] = useState<number>(0);

  // Global keyboard shortcut for Spotlight: ⌘K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSpotlightOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsSpotlightOpen(false);
        setIsControlCenterOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openApp = (id: AppId) => {
    if (isTourActive) {
      setIsTourAutoPlaying(false);
    }
    const nextZ = highestZIndex + 1;
    setHighestZIndex(nextZ);
    setActiveWindowId(id);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ,
      },
    }));
  };

  const openProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    openApp('projects');
  };

  const closeApp = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
      },
    }));
    if (activeWindowId === id) {
      const remainingOpen = Object.values(windows).filter((w) => w.id !== id && w.isOpen && !w.isMinimized);
      if (remainingOpen.length > 0) {
        remainingOpen.sort((a, b) => b.zIndex - a.zIndex);
        setActiveWindowId(remainingOpen[0].id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const minimizeApp = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true,
      },
    }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const maximizeApp = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized,
      },
    }));
  };

  const focusApp = (id: AppId) => {
    if (activeWindowId === id) return;
    const nextZ = highestZIndex + 1;
    setHighestZIndex(nextZ);
    setActiveWindowId(id);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        zIndex: nextZ,
      },
    }));
  };

  const toggleSpotlight = () => setIsSpotlightOpen((prev) => !prev);
  const closeSpotlight = () => setIsSpotlightOpen(false);

  const toggleControlCenter = () => setIsControlCenterOpen((prev) => !prev);
  const closeControlCenter = () => setIsControlCenterOpen(false);

  // Recruiter Tour Engine: 60-Second Guided Experience (Steps 01 -> 06)
  const activateTourStep = (stepIdx: number) => {
    const step = TOUR_STEPS[stepIdx];
    if (!step) return;

    setCurrentTourStep(stepIdx);
    setTourProgress(0); // Reset timer bar for new step
    const nextZ = highestZIndex + 2;
    setHighestZIndex(nextZ);
    setActiveWindowId(step.id);

    // If step targets a specific project (Step 3 -> WanderLust), set project ID
    if (step.projectId) {
      setSelectedProjectId(step.projectId);
    }

    setWindows((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        const appId = key as AppId;
        if (appId === step.id) {
          updated[appId] = {
            ...updated[appId],
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ,
            defaultPosition: {
              x: Math.max(16, Math.round((window.innerWidth - (updated[appId].defaultSize?.width || 720)) / 2)),
              y: 94,
            },
          };
        } else {
          updated[appId] = {
            ...updated[appId],
            isOpen: false,
          };
        }
      });
      return updated;
    });
  };

  const startTour = () => {
    setIsTourActive(true);
    setIsTourAutoPlaying(true);
    setTourProgress(0);
    activateTourStep(0);
  };

  const nextTourStep = () => {
    setTourProgress(0);
    if (currentTourStep < TOUR_STEPS.length - 1) {
      activateTourStep(currentTourStep + 1);
    } else {
      endTour();
    }
  };

  const prevTourStep = () => {
    setTourProgress(0);
    if (currentTourStep > 0) {
      activateTourStep(currentTourStep - 1);
    }
  };

  const endTour = () => {
    setIsTourActive(false);
    setIsTourAutoPlaying(false);
    setTourProgress(0);
  };

  const toggleTourAutoPlay = () => {
    setIsTourAutoPlaying((prev) => !prev);
  };

  const pauseTourAutoPlay = () => {
    setIsTourAutoPlaying(false);
  };

  const resumeTourAutoPlay = () => {
    setIsTourAutoPlaying(true);
  };

  // Automated Tour Timer: Auto-advance after exact duration per step!
  useEffect(() => {
    if (!isTourActive || !isTourAutoPlaying) return;

    const currentStep = TOUR_STEPS[currentTourStep];
    const durationMs = (currentStep?.durationSeconds || 10) * 1000;
    const intervalMs = 50;
    const stepIncrement = (intervalMs / durationMs) * 100;

    const timer = setInterval(() => {
      setTourProgress((prev) => {
        if (prev + stepIncrement >= 100) {
          if (currentTourStep < TOUR_STEPS.length - 1) {
            activateTourStep(currentTourStep + 1);
            return 0;
          } else {
            // Reached final step (Resume + Contact) -> pause autoplay and show completed state
            setIsTourAutoPlaying(false);
            return 100;
          }
        }
        return prev + stepIncrement;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isTourActive, isTourAutoPlaying, currentTourStep]);

  return (
    <OSContext.Provider
      value={{
        windows,
        activeWindowId,
        selectedProjectId,
        wallpaper,
        isSpotlightOpen,
        isControlCenterOpen,
        isTourActive,
        currentTourStep,
        isTourAutoPlaying,
        tourProgress,
        openApp,
        closeApp,
        minimizeApp,
        maximizeApp,
        focusApp,
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
        jumpToTourStep: activateTourStep,
        endTour,
        toggleTourAutoPlay,
        pauseTourAutoPlay,
        resumeTourAutoPlay,
      }}
    >
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
};
