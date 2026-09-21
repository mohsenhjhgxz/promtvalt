import React, { useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Search, 
  X, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Zap, 
  Video, 
  Image as ImageIcon, 
  Code2, 
  Bot, 
  Box, 
  Music 
} from 'lucide-react';

export default function HeroSection({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory,
  totalPromptsCount
}) {
  const { t, isRTL } = useLanguage();
  const searchInputRef = useRef(null);

  // Keyboard shortcut '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const domains = [
    { id: 'all', label: t('catAll'), icon: Layers },
    { id: 'video', label: t('catVideo'), icon: Video },
    { id: 'image', label: t('catImage'), icon: ImageIcon },
    { id: 'webdev', label: t('catWebDev'), icon: Code2 },
    { id: 'agents', label: t('catAgents'), icon: Bot },
    { id: '3d', label: t('cat3D'), icon: Box },
    { id: 'audio', label: t('catAudio'), icon: Music },
  ];

  return (
    <section className="relative pt-10 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden cyber-grid-bg">
      {/* Background ambient glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-subtle" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center">
        
        {/* Futuristic Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(0,245,255,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          <span>{t('heroBadge')}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 leading-tight">
          {t('heroTitlePrefix')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 animate-gradient">
            {t('heroTitleHighlight')}
          </span>
        </h1>

        {/* Hero Description */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
          {t('heroDescription')}
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 relative">
          <div className="relative flex items-center">
            <div className={`absolute pointer-events-none ${isRTL ? 'right-4' : 'left-4'}`}>
              <Search className="w-5 h-5 text-cyan-400" />
            </div>

            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className={`w-full py-4 rounded-2xl bg-[#0e121c]/90 border border-white/15 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-slate-100 placeholder-slate-400 text-base shadow-xl backdrop-blur-xl transition-all ${
                isRTL ? 'pr-12 pl-24 text-right' : 'pl-12 pr-24 text-left'
              }`}
            />

            {/* Clear button and shortcut badge */}
            <div className={`absolute flex items-center gap-2 ${isRTL ? 'left-4' : 'right-4'}`}>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono bg-white/10 text-slate-400 border border-white/15 rounded-md shadow-inner">
                /
              </kbd>
            </div>
          </div>
        </div>

        {/* Live Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mb-10">
          <div className="p-3.5 rounded-2xl glass-panel border border-white/10 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-xl sm:text-2xl font-mono">
              <Layers className="w-4 h-4" />
              <span>{totalPromptsCount}+</span>
            </div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium mt-0.5">
              {t('statsPrompts')}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl glass-panel border border-white/10 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-purple-400 font-bold text-xl sm:text-2xl font-mono">
              <Sparkles className="w-4 h-4" />
              <span>6</span>
            </div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium mt-0.5">
              {t('statsDomains')}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl glass-panel border border-white/10 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xl sm:text-2xl font-mono">
              <CheckCircle2 className="w-4 h-4" />
              <span>100%</span>
            </div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium mt-0.5">
              {t('statsVerified')}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl glass-panel border border-white/10 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xl sm:text-2xl font-mono">
              <Zap className="w-4 h-4" />
              <span>&lt;50ms</span>
            </div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium mt-0.5">
              {t('statsSpeed')}
            </span>
          </div>
        </div>

        {/* Quick Domain Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {domains.map((domain) => {
            const Icon = domain.icon;
            const isActive = selectedCategory === domain.id;
            return (
              <button
                key={domain.id}
                onClick={() => setSelectedCategory(domain.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-[0_0_20px_rgba(0,245,255,0.4)] border border-cyan-400'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 hover:border-white/25'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
                <span>{domain.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
