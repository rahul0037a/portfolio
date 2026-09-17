import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '../../context/OSContext';
import { AppId } from '../../types/os';
import { Search, FileText, FolderGit2, Briefcase, GraduationCap, Terminal, Mail, Download, ArrowRight, ExternalLink } from 'lucide-react';
import { RESUME_DATA } from '../../data/resumeData';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: 'App' | 'Project' | 'Skill' | 'Action';
  icon: React.ReactNode;
  onSelect: () => void;
}

export const SpotlightSearch: React.FC = () => {
  const { isSpotlightOpen, closeSpotlight, openApp, startTour } = useOS();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSpotlightOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isSpotlightOpen]);

  const allItems: SearchResult[] = [
    {
      id: 'app-resume',
      title: 'Resume (PDF Preview)',
      subtitle: 'View authentic uploaded Rahul_Rathi_Resume_v4.pdf',
      category: 'App',
      icon: <FileText size={16} className="text-rose-400" />,
      onSelect: () => openApp('resume'),
    },
    {
      id: 'app-projects',
      title: 'Projects Explorer',
      subtitle: 'WanderLust, FoodPlay, FuseCake, Blog Blitz',
      category: 'App',
      icon: <FolderGit2 size={16} className="text-blue-400" />,
      onSelect: () => openApp('projects'),
    },
    {
      id: 'app-experience',
      title: 'Work Experience',
      subtitle: 'FuseCake SaaS Developer & Ethnus Intern',
      category: 'App',
      icon: <Briefcase size={16} className="text-indigo-400" />,
      onSelect: () => openApp('experience'),
    },
    {
      id: 'app-education',
      title: 'Education & AWS Certification',
      subtitle: "VIT Chennai '25 (7.91 CGPA) & AWS Cloud Practitioner",
      category: 'App',
      icon: <GraduationCap size={16} className="text-amber-400" />,
      onSelect: () => openApp('education'),
    },
    {
      id: 'app-skills',
      title: 'Tech Stack & Skills Matrix',
      subtitle: 'React, Next.js, Node.js, Java, Python, AWS, MongoDB',
      category: 'App',
      icon: <Terminal size={16} className="text-emerald-400" />,
      onSelect: () => openApp('skills'),
    },
    {
      id: 'app-contact',
      title: 'Contact Mail',
      subtitle: 'Email Rahul directly (rathirahul1000@gmail.com)',
      category: 'App',
      icon: <Mail size={16} className="text-sky-400" />,
      onSelect: () => openApp('contact'),
    },
    {
      id: 'action-recruiter',
      title: 'Recruiter Quick Tour',
      subtitle: '60-second guided tour of Rahul\'s engineering background',
      category: 'Action',
      icon: <ArrowRight size={16} className="text-amber-300" />,
      onSelect: () => startTour(),
    },
    {
      id: 'action-leetcode',
      title: 'LeetCode Profile (100+ DSA Questions Solved)',
      subtitle: 'https://leetcode.com/u/rathirahul1000 • Problem solving portfolio',
      category: 'Action',
      icon: <ExternalLink size={16} className="text-amber-400" />,
      onSelect: () => {
        window.open(RESUME_DATA.personal.leetcode, '_blank');
      },
    },
    {
      id: 'action-github',
      title: 'GitHub Profile (@rahul0037a)',
      subtitle: 'https://github.com/rahul0037a • Open source repositories and code',
      category: 'Action',
      icon: <ExternalLink size={16} className="text-white" />,
      onSelect: () => {
        window.open(RESUME_DATA.personal.github, '_blank');
      },
    },
    {
      id: 'action-linkedin',
      title: 'LinkedIn Profile (Rahul Rathi)',
      subtitle: 'https://linkedin.com/in/rahul-rathi-85ab42206 • Professional network',
      category: 'Action',
      icon: <ExternalLink size={16} className="text-blue-400" />,
      onSelect: () => {
        window.open(RESUME_DATA.personal.linkedin, '_blank');
      },
    },
    {
      id: 'action-download-pdf',
      title: 'Download Official Resume PDF',
      subtitle: 'Directly download 156 KB Rahul_Rathi_Resume_v4.pdf',
      category: 'Action',
      icon: <Download size={16} className="text-emerald-400" />,
      onSelect: () => {
        window.open('/Rahul_Rathi_Resume_v4.pdf', '_blank');
      },
    },
    {
      id: 'proj-wanderlust',
      title: 'WanderLust (Vacation Rental)',
      subtitle: 'Express MVC, MongoDB, Leaflet, Cloudinary, Passport.js',
      category: 'Project',
      icon: <FolderGit2 size={16} className="text-blue-400" />,
      onSelect: () => openApp('projects'),
    },
    {
      id: 'proj-foodplay',
      title: 'FoodPlay (Nutrition Engine)',
      subtitle: 'Python, Flask, Mifflin-St Jeor Algorithm, <20ms API',
      category: 'Project',
      icon: <FolderGit2 size={16} className="text-teal-400" />,
      onSelect: () => openApp('projects'),
    },
    {
      id: 'proj-fusecake',
      title: 'FuseCake (Event Discovery)',
      subtitle: 'Next.js 14, 5-stage Auth Flow, 2.4x conversion, 35+ components',
      category: 'Project',
      icon: <FolderGit2 size={16} className="text-purple-400" />,
      onSelect: () => openApp('projects'),
    },
  ];

  const filteredItems = query.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : allItems.slice(0, 7);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].onSelect();
        closeSpotlight();
      }
    } else if (e.key === 'Escape') {
      closeSpotlight();
    }
  };

  if (!isSpotlightOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-24 px-2 sm:px-4">
        {/* Backdrop click dismiss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSpotlight}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Spotlight Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="w-full max-w-xl bg-[#1a1f2c]/95 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden z-50"
        >
          {/* Search Input Bar */}
          <div className="p-3.5 border-b border-white/10 flex items-center gap-3">
            <Search size={18} className="text-slate-400 shrink-0 ml-1" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Spotlight Search (e.g. AWS, WanderLust, Resume, Contact...)"
              className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
            />
            <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-white/10 border border-white/10">
              ESC
            </span>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-auto p-2 space-y-1">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      item.onSelect();
                      closeSpotlight();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`p-2.5 rounded-xl cursor-pointer transition-colors flex items-center justify-between ${
                      isSelected ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold truncate">{item.title}</div>
                        <div className={`text-[11px] truncate ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                          {item.subtitle}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded shrink-0 ml-2 ${
                        isSelected ? 'bg-blue-700 text-white' : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                No matching results found for "{query}".
              </div>
            )}
          </div>

          {/* Keyboard tip footer */}
          <div className="px-4 py-2 bg-black/30 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>Navigate with ↑ ↓</span>
            <span>Press ↵ Enter to Open</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
