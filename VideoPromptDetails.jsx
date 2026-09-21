import React from 'react';
import { Film, Video, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function VideoPromptDetails({ prompt }) {
  const { t } = useLanguage();

  if (prompt.domain !== 'video') return null;

  return (
    <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5 font-mono text-cyan-400">
          <Film className="w-3.5 h-3.5" />
          {t('cameraDirectives')}
        </span>
        <div className="flex items-center gap-2 font-mono text-[11px]">
          {prompt.aspectRatio && (
            <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
              {prompt.aspectRatio}
            </span>
          )}
          {prompt.fps && (
            <span className="px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300">
              {prompt.fps}
            </span>
          )}
        </div>
      </div>

      {/* Camera Motion Tags */}
      {prompt.cameraDirectives && (
        <div className="flex flex-wrap gap-1.5">
          {prompt.cameraDirectives.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
