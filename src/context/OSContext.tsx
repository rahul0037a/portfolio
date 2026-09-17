import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppId, WallpaperId, WindowState } from '../types/os';

export interface TourStep {
  stepNumber: number;
  id: AppId;
  title: string;
  tagline: string;
  note: string;
  durationSeconds: number; // Optimal viewing time per section
}

export const TOUR_STEPS: TourStep[] = [
  {
    stepNumber: 1,
    id: 'about',
    title: 'About Rahul',
    tagline: 'Full-Stack Software Engineer • VIT Chennai ’25',
    note: 'Graduated in Computer Science with a 7.91 CGPA, 100+ solved DSA problems, production web platforms, and AWS cloud architecture.',
    durationSeconds: 8,
  },
  {
    stepNumber: 2,
    id: 'experience',
    title: 'Work Experience',
    tagline: 'FuseCake SaaS Developer & Ethnus MERN Intern',
    note: 'Architected 35+ component UI system, 5-stage auth return pipeline, and optimized database query latency by 40%.',
    durationSeconds: 10,
  },
  {
    stepNumber: 3,
    id: 'projects',
    title: 'Best Projects & Architecture',
    tagline: 'WanderLust, FoodPlay, FuseCake, Blog Blitz',
    note: 'Interactive production architectures: Leaflet geocoding, Express MVC, and Python Mifflin-St Jeor metabolic algorithm.',
    durationSeconds: 12,
  },
  {
    stepNumber: 4,
    id: 'skills',
    title: 'Technical Skills Matrix',
    tagline: 'React, Next.js 14, Node.js, Java, Python, MongoDB, AWS',
    note: 'Comprehensive proficiency across frontend systems, backend microservices, and AWS cloud deployment.',
    durationSeconds: 8,
  },
  {
    stepNumber: 5,
    id: 'education',
    title: 'AWS Certification & Academics',
    tagline: 'AWS Certified Cloud Practitioner (Aug 2024 – Aug 2027)',
    note: 'Industry-validated cloud engineering foundation in IAM, VPC, EC2, S3, alongside Stanford Machine Learning.',
    durationSeconds: 9,
  },
  {
    stepNumber: 6,
    id: 'resume',
    title: 'Official Resume Preview',
    tagline: 'Rahul_Rathi_Resume_v4.pdf (156 KB)',
    note: 'Review and download the authentic uploaded PDF resume directly with 1-click.',
    durationSeconds: 11,
  },
  {
    stepNumber: 7,
    id: 'contact',
    title: 'Direct Contact & Availability',
    tagline: 'rathirahul1000@gmail.com • +91 6370223485',
    note: 'Actively seeking Full-Time Software Engineer & Full-Stack roles. Available immediately for remote or relocation.',
    durationSeconds: 12,
  },
];

interface OSContextType {
  windows: Record<AppId, WindowState>;
  activeWindowId: AppId | null;
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
  toggleSpotlight: () => void;
  closeSpotlight: () => void;
  toggleControlCenter: () => void;
  closeControlCenter: () => void;
  setWallpaper: (wallpaper: WallpaperId) => void;
  startTour: () => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
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
    defaultSize: { width: 560, height: 530 },
  },
  resume: {
    id: 'resume',
    title: 'Rahul_Rathi_Resume_v4.pdf — Preview',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultPosition: { x: 70, y: 84 },
    defaultSize: { width: 720, height: 600 },
  },
  projects: {
    id: 'projects',
    title: 'Projects — Finder',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultPosition: { x: 120, y: 84 },
    defaultSize: { width: 880, height: 600 },
  },
  experience: {
    id: 'experience',
    title: 'Career & Work Experience — Notes',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultPosition: { x: 140, y: 84 },
    defaultSize: { width: 720, height: 530 },
  },
  education: {
    id: 'education',
    title: 'Academics & AWS Certification',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultPosition: { x: 160, y: 84 },
    defaultSize: { width: 660, height: 500 },
  },
  skills: {
    id: 'skills',
    title: 'System Profiler — Tech Stack',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultPosition: { x: 180, y: 84 },
    defaultSize: { width: 680, height: 510 },
  },
  contact: {
    id: 'contact',
    title: 'Mail — New Message to Rahul',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultPosition: { x: 200, y: 84 },
    defaultSize: { width: 590, height: 500 },
  },
  settings: {
    id: 'settings',
    title: 'System Settings',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultPosition: { x: 220, y: 84 },
    defaultSize: { width: 520, height: 380 },
  },
};

const OSContext = createContext<OSContextType | undefined>(undefined);

export const OSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<AppId | null>(null);
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
    // If user opens an app manually while tour is active, pause auto-play so we don't interrupt them!
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

  // Recruiter Tour Engine: Steps 01 -> 07 with auto-browse
  const activateTourStep = (stepIdx: number) => {
    const step = TOUR_STEPS[stepIdx];
    if (!step) return;

    setCurrentTourStep(stepIdx);
    setTourProgress(0); // Reset timer bar for new step
    const nextZ = highestZIndex + 2;
    setHighestZIndex(nextZ);
    setActiveWindowId(step.id);

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
              x: Math.max(16, Math.round((window.innerWidth - (updated[appId].defaultSize?.width || 700)) / 2)),
              y: 84,
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

  // Automated Tour Timer: Auto-advance after optimal duration per step!
  useEffect(() => {
    if (!isTourActive || !isTourAutoPlaying) return;

    const currentStep = TOUR_STEPS[currentTourStep];
    const durationMs = (currentStep?.durationSeconds || 8) * 1000;
    const intervalMs = 50;
    const stepIncrement = (intervalMs / durationMs) * 100;

    const timer = setInterval(() => {
      setTourProgress((prev) => {
        if (prev + stepIncrement >= 100) {
          // Auto-advance to next step
          if (currentTourStep < TOUR_STEPS.length - 1) {
            activateTourStep(currentTourStep + 1);
            return 0;
          } else {
            // Reached final step (Contact) -> stop auto play and leave open
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
        toggleSpotlight,
        closeSpotlight,
        toggleControlCenter,
        closeControlCenter,
        setWallpaper,
        startTour,
        nextTourStep,
        prevTourStep,
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
