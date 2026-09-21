import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  X, 
  Copy, 
  Check, 
  Sliders, 
  Bookmark, 
  Film, 
  Code2, 
  Terminal, 
  Layers, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function PromptDetailModal({ 
  prompt, 
  onClose, 
  onCustomize, 
  onTriggerToast 
}) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!prompt) return null;

  const handleCopyPrompt = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onTriggerToast(t('toastCopied'), 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl glass-panel rounded-2xl border border-cyan-500/30 bg-[#0c101a]/95 shadow-2xl p-6 sm:p-8 my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10 shrink-0 gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 uppercase">
                {prompt.domain}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300">
                {prompt.model}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono uppercase bg-purple-500/15 border border-purple-500/30 text-purple-300">
                {prompt.difficulty}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              {prompt.title}
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              {prompt.description}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label={t('close')}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="overflow-y-auto py-5 space-y-6 flex-1 pr-1">
          
          {/* Visual Concept Showcase */}
          {prompt.previewImage && (
            <div className="rounded-2xl overflow-hidden border border-white/15 max-h-80 relative group bg-black/60 shadow-xl">
              <img 
                src={prompt.previewImage} 
                alt={prompt.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-xs font-mono text-cyan-300">
                {prompt.aspectRatio && `Aspect Ratio: ${prompt.aspectRatio}`}
              </div>
            </div>
          )}

          {/* Full Prompt Content Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                <Terminal className="w-4 h-4" />
                {t('detailsTitle')}
              </span>
              <button
                onClick={() => handleCopyPrompt(prompt.promptText)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t('copied') : t('copyPrompt')}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#06080d] border border-cyan-500/30 font-mono text-sm text-slate-200 leading-relaxed select-all">
              {prompt.promptText}
            </div>
          </div>

          {/* Video Camera Directives */}
          {prompt.cameraDirectives && (
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-2.5">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold flex items-center gap-1.5">
                <Film className="w-4 h-4" />
                {t('cameraDirectives')}
              </span>
              <div className="flex flex-wrap gap-2">
                {prompt.cameraDirectives.map((dir, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                    {dir}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* System Prompt vs User Prompt (if code / agent) */}
          {prompt.systemPrompt && (
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold flex items-center gap-1.5">
                <Terminal className="w-4 h-4" />
                {t('systemPrompt')}
              </span>
              <p className="text-xs font-mono text-slate-200 leading-relaxed italic bg-black/40 p-3 rounded-lg border border-purple-500/20">
                {prompt.systemPrompt}
              </p>
            </div>
          )}

          {/* Expected Output or Tech Stack */}
          {prompt.expectedOutput && (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-semibold flex items-center gap-1.5">
                <Code2 className="w-4 h-4" />
                {t('expectedOutput')}
              </span>
              <p className="text-xs font-mono text-slate-200 leading-relaxed">
                {prompt.expectedOutput}
              </p>
              {prompt.previewCode && (
                <pre className="mt-2 p-3 rounded-lg bg-black/60 border border-emerald-500/30 text-emerald-300 font-mono text-xs overflow-x-auto">
                  <code>{prompt.previewCode}</code>
                </pre>
              )}
            </div>
          )}

          {/* Optimization & Implementation Guidelines */}
          {prompt.systemInstructions && (
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                {t('instructionsTitle')}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {prompt.systemInstructions}
              </p>
            </div>
          )}

        </div>

        {/* Modal Actions Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium transition-colors"
          >
            {t('close')}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onCustomize(prompt);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-sm font-semibold transition-all"
            >
              <Sliders className="w-4 h-4" />
              <span>{t('customize')}</span>
            </button>

            <button
              onClick={() => handleCopyPrompt(prompt.promptText)}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-sm font-bold shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all"
            >
              <Copy className="w-4 h-4" />
              <span>{t('copyPrompt')}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
