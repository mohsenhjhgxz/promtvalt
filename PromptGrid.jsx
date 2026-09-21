import React from 'react';
import PromptCard from './PromptCard';
import { useLanguage } from '../context/LanguageContext';
import { SearchX, BookmarkX, RotateCcw } from 'lucide-react';

export default function PromptGrid({
  prompts,
  isBookmarksView,
  onCustomize,
  onInspect,
  onTriggerToast,
  onResetFilters
}) {
  const { t } = useLanguage();

  if (prompts.length === 0) {
    if (isBookmarksView) {
      return (
        <div className="max-w-md mx-auto py-20 px-4 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <BookmarkX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">
            {t('noBookmarksFound')}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            {t('noBookmarksDesc')}
          </p>
        </div>
      );
    }

    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 shadow-[0_0_20px_rgba(0,245,255,0.2)]">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">
          {t('noPromptsFound')}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-6">
          {t('noPromptsDesc')}
        </p>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t('clearFilters')}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map((prompt) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            onCustomize={onCustomize}
            onInspect={onInspect}
            onTriggerToast={onTriggerToast}
          />
        ))}
      </div>
    </div>
  );
}
