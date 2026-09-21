import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  Sparkles, 
  Plus, 
  Copy, 
  Check, 
  Terminal, 
  Layers, 
  Save, 
  Tag 
} from 'lucide-react';

export default function PromptBuilderModal({ onClose, onAddPrompt, onTriggerToast }) {
  const { t } = useLanguage();

  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('video');
  const [model, setModel] = useState('Runway Gen-3 Alpha');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [promptContent, setPromptContent] = useState('Cinematic shot of [subject], illuminated by [lighting], captured with [camera_lens], photorealistic, 8k.');
  const [copied, setCopied] = useState(false);

  // Quick tag injectors
  const quickTags = [
    '[subject]',
    '[lighting]',
    '[camera_angle]',
    '[art_style]',
    '[environment]',
    '[color_palette]',
    '[tech_stack]'
  ];

  const injectTag = (tag) => {
    setPromptContent(prev => prev + ' ' + tag);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptContent);
      setCopied(true);
      onTriggerToast(t('toastCopied'), 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveToDirectory = () => {
    if (!title.trim() || !promptContent.trim()) {
      alert('Please provide a title and prompt content.');
      return;
    }

    const newPrompt = {
      id: `custom-${Date.now()}`,
      domain,
      title,
      description: `Custom engineered prompt for ${model}.`,
      model,
      difficulty,
      copies: 1,
      tags: ['Custom', domain.toUpperCase()],
      promptText: promptContent,
      defaultVariables: {},
    };

    onAddPrompt(newPrompt);
    onTriggerToast('Prompt saved to directory session!', 'success');
    
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 }
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl glass-panel rounded-2xl border border-purple-500/40 bg-[#0e121c]/95 shadow-2xl p-6 sm:p-8 my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Prompt Architect & Lab
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Design custom dynamic prompt templates with one-click variable injectors.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label={t('close')}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto py-5 space-y-5 flex-1 pr-1">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1">
                Prompt Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Cyberpunk Hovercar Chase..."
                className="w-full px-3.5 py-2 rounded-xl bg-[#07080d] border border-white/15 focus:border-purple-400 text-sm text-slate-100 placeholder-slate-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1">
                Target Domain
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#07080d] border border-white/15 focus:border-purple-400 text-sm text-slate-100"
              >
                <option value="video">Video Generation</option>
                <option value="image">Image Generation</option>
                <option value="webdev">Web Development</option>
                <option value="agents">AI Agents</option>
                <option value="3d">3D & Spatial</option>
                <option value="audio">Audio & Music</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1">
                AI Model / Framework
              </label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. Sora, Midjourney v6..."
                className="w-full px-3.5 py-2 rounded-xl bg-[#07080d] border border-white/15 focus:border-purple-400 text-sm text-slate-100"
              />
            </div>
          </div>

          {/* Quick Variable Injector Buttons */}
          <div>
            <label className="text-xs font-mono text-cyan-400 flex items-center gap-1 mb-2 font-semibold">
              <Tag className="w-3.5 h-3.5" />
              Quick Dynamic Variable Injectors (Click to insert):
            </label>
            <div className="flex flex-wrap gap-2">
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => injectTag(tag)}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Editor Area */}
          <div>
            <label className="text-xs font-mono text-slate-300 block mb-1.5 font-semibold">
              Prompt Architecture
            </label>
            <textarea
              rows={5}
              value={promptContent}
              onChange={(e) => setPromptContent(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#07080d] border border-white/15 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-slate-100 font-mono leading-relaxed resize-none"
              placeholder="Draft your prompt here using [variable] brackets..."
            />
          </div>

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium transition-colors"
          >
            {t('close')}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 text-sm font-semibold transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t('copied') : t('copyPrompt')}</span>
            </button>

            <button
              onClick={handleSaveToDirectory}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-slate-950 text-sm font-bold shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save to Directory</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
