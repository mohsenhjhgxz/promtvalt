import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useBookmarks } from '../context/BookmarksContext';
import VideoPromptDetails from './VideoPromptDetails';
import CodePromptDetails from './CodePromptDetails';
import { 
  Copy, 
  Check, 
  Sliders, 
  Maximize2, 
  Bookmark, 
  Video, 
  Image as ImageIcon, 
  Code2, 
  Bot, 
  Box, 
  Music,
  Zap
} from 'lucide-react';

export default function PromptCard({ 
  prompt, 
  onCustomize, 
  onInspect, 
  onTriggerToast 
}) {
  const { t, isRTL } = useLanguage();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [copied, setCopied] = useState(false);
  const [copyCount, setCopyCount] = useState(prompt.copies || 0);

  const bookmarked = isBookmarked(prompt.id);

  const domainIcons = {
    video: Video,
    image: ImageIcon,
    webdev: Code2,
    agents: Bot,
    '3d': Box,
    audio: Music,
  };

  const domainColors = {
    video: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30',
    image: 'text-purple-400 bg-purple-950/40 border-purple-500/30',
    webdev: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
    agents: 'text-pink-400 bg-pink-950/40 border-pink-500/30',
    '3d': 'text-amber-400 bg-amber-950/40 border-amber-500/30',
    audio: 'text-blue-400 bg-blue-950/40 border-blue-500/30',
  };

  const difficultyColors = {
    beginner: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20',
    intermediate: 'text-amber-400 border-amber-500/30 bg-amber-950/20',
    expert: 'text-rose-400 border-rose-500/30 bg-rose-950/20',
  };

  const DomainIcon = domainIcons[prompt.domain] || Zap;

  // Handle direct Copy Prompt
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.promptText);
      setCopied(true);
      setCopyCount(prev => prev + 1);
      onTriggerToast(t('toastCopied'), 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleBookmarkToggle = () => {
    toggleBookmark(prompt.id);
    onTriggerToast(
      !bookmarked ? t('toastBookmarkAdded') : t('toastBookmarkRemoved'),
      'bookmark'
    );
  };

  // Highlight bracketed variables e.g. [subject]
  const renderHighlightedPrompt = (text) => {
    const parts = text.split(/(\[[a-zA-Z0-9_-]+\])/g);
    return parts.map((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        return (
          <span 
            key={index} 
            className="inline-block px-1.5 py-0.2 mx-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono font-medium shadow-[0_0_8px_rgba(0,245,255,0.2)]"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="glow-card rounded-2xl glass-panel p-5 flex flex-col justify-between border border-white/10 hover:border-cyan-500/40 bg-[#0e121c]/85 transition-all duration-300">
      
      <div>
        {/* Card Header: Category Badge + Model + Difficulty + Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Domain Pill */}
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium border ${domainColors[prompt.domain] || 'text-cyan-400'}`}>
              <DomainIcon className="w-3.5 h-3.5" />
              <span className="capitalize">{prompt.domain}</span>
            </span>

            {/* Model Pill */}
            <span className="text-[11px] font-mono px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
              {prompt.model}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Difficulty Badge */}
            <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border font-semibold ${difficultyColors[prompt.difficulty] || ''}`}>
              {prompt.difficulty}
            </span>

            {/* Bookmark Star Button */}
            <button
              onClick={handleBookmarkToggle}
              aria-label="Bookmark prompt"
              className={`p-1.5 rounded-lg border transition-all ${
                bookmarked
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
          {prompt.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-400 mb-3 leading-relaxed">
          {prompt.description}
        </p>

        {/* Optional Visual Preview for Image/Concept Prompts */}
        {prompt.previewImage && (
          <div 
            onClick={() => onInspect(prompt)}
            className="relative mb-3.5 rounded-xl overflow-hidden group/img cursor-pointer border border-white/10 aspect-video bg-black/50"
          >
            <img 
              src={prompt.previewImage} 
              alt={prompt.title}
              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-2.5 justify-between">
              <span className="text-[11px] font-mono text-cyan-300 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur">
                <Maximize2 className="w-3 h-3" />
                {t('inspect')}
              </span>
              {prompt.aspectRatio && (
                <span className="text-[10px] font-mono text-slate-300 bg-white/10 px-1.5 py-0.5 rounded">
                  {prompt.aspectRatio}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Specialized Domain Layout Sections */}
        <VideoPromptDetails prompt={prompt} />
        <CodePromptDetails prompt={prompt} />

        {/* Prompt Blueprint Snippet */}
        <div className="mt-3.5 p-3 rounded-xl bg-[#07080d]/80 border border-white/10 relative group/code">
          <p className="text-xs font-mono text-slate-300 leading-relaxed max-h-24 overflow-y-auto pr-1">
            {renderHighlightedPrompt(prompt.promptText)}
          </p>
        </div>
      </div>

      {/* Card Footer: Action Buttons */}
      <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between gap-2">
        
        {/* Copy Counter */}
        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
          <Zap className="w-3 h-3 text-cyan-400" />
          {t('copiesCount', { count: copyCount.toLocaleString() })}
        </span>

        {/* Action Button Group */}
        <div className="flex items-center gap-1.5">
          {/* Customize / Try Modal Trigger */}
          <button
            onClick={() => onCustomize(prompt)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 text-xs font-medium transition-all"
            title={t('customize')}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('customize')}</span>
          </button>

          {/* Direct Copy Button */}
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-md ${
              copied
                ? 'bg-emerald-500 text-slate-950 font-bold border border-emerald-400'
                : 'bg-white/10 hover:bg-cyan-500 text-white hover:text-slate-950 border border-white/15 hover:border-cyan-400'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{t('copied')}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{t('copyPrompt')}</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
