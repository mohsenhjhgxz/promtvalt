import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useBookmarks } from '../context/BookmarksContext';
import { 
  Terminal, 
  Bookmark, 
  Sun, 
  Moon, 
  Globe, 
  ChevronDown, 
  Sparkles, 
  Compass,
  Sliders,
  Check
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenBuilder }) {
  const { currentLang, setLanguage, activeLangConfig, languages, t, isRTL } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { bookmarksCount } = useBookmarks();
  
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#07080d]/80 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('explore')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-500/40 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all duration-300">
            <Terminal className="w-5 h-5 text-cyan-400 group-hover:rotate-6 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping opacity-75"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-wider text-white font-sans">
                PROMPT<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">VAULT</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 font-semibold hidden sm:inline-block">
                v2.5
              </span>
            </div>
            <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block tracking-wide">
              {t('brandSubtitle')}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'explore'
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,245,255,0.15)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="hidden md:inline">{t('navExplore')}</span>
          </button>

          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'bookmarks'
                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span className="hidden md:inline">{t('navBookmarks')}</span>
            {bookmarksCount > 0 && (
              <span className="px-1.5 py-0.2 text-xs font-mono rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                {bookmarksCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenBuilder}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium text-purple-400 hover:text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 transition-all shadow-[0_0_15px_rgba(168,85,247,0.15)]"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="hidden md:inline">{t('navBuilder')}</span>
          </button>
        </nav>

        {/* Controls: Language Dropdown + Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Switcher Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              aria-label={t('languageSelect')}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-slate-200 text-sm font-medium transition-all"
            >
              <span className="text-base">{activeLangConfig.flag}</span>
              <span className="hidden sm:inline font-sans">{activeLangConfig.nativeName}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {langDropdownOpen && (
              <div className={`absolute mt-2 w-56 rounded-2xl glass-panel border border-cyan-500/30 bg-[#0e121c]/98 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150 ${isRTL ? 'left-0' : 'right-0'}`}>
                <div className="px-3 py-1.5 border-b border-white/10 mb-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    {t('languageSelect')} ({languages.length})
                  </span>
                </div>

                <div className="max-h-72 overflow-y-auto py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors ${
                        currentLang === lang.code
                          ? 'bg-cyan-500/20 text-cyan-300 font-medium'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{lang.flag}</span>
                        <div className="flex flex-col text-start">
                          <span className="leading-tight">{lang.nativeName}</span>
                          <span className="text-[10px] text-slate-400">{lang.name} ({lang.dir.toUpperCase()})</span>
                        </div>
                      </div>
                      {currentLang === lang.code && (
                        <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={t('toggleTheme')}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 text-slate-300 hover:text-amber-400 transition-all"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-purple-400" />
            )}
          </button>

        </div>

      </div>
    </header>
  );
}
