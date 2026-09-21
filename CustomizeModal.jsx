import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  Sliders, 
  Copy, 
  Check, 
  RotateCcw, 
  Sparkles, 
  Terminal,
  Layers
} from 'lucide-react';

export default function CustomizeModal({ prompt, onClose, onTriggerToast }) {
  const { t, isRTL } = useLanguage();

  // Extract variables enclosed in square brackets [variable_name]
  const extractVariables = (text) => {
    const matches = text.match(/\[([a-zA-Z0-9_-]+)\]/g) || [];
    const unique = [...new Set(matches.map(m => m.slice(1, -1)))];
    return unique;
  };

  const [variablesList, setVariablesList] = useState([]);
  const [variableValues, setVariableValues] = useState({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (prompt) {
      const vars = extractVariables(prompt.promptText);
      setVariablesList(vars);

      // Initialize with default variables or empty strings
      const initialValues = {};
      vars.forEach(v => {
        initialValues[v] = prompt.defaultVariables?.[v] || '';
      });
      setVariableValues(initialValues);
    }
  }, [prompt]);

  if (!prompt) return null;

  const handleInputChange = (varName, value) => {
    setVariableValues(prev => ({
      ...prev,
      [varName]: value
    }));
  };

  const handleReset = () => {
    const defaultVals = {};
    variablesList.forEach(v => {
      defaultVals[v] = prompt.defaultVariables?.[v] || '';
    });
    setVariableValues(defaultVals);
  };

  // Compute final generated customized prompt
  const getCustomizedPrompt = () => {
    let result = prompt.promptText;
    variablesList.forEach(v => {
      const replacement = variableValues[v] || `[${v}]`;
      result = result.replace(new RegExp(`\\[${v}\\]`, 'g'), replacement);
    });
    return result;
  };

  const customizedText = getCustomizedPrompt();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(customizedText);
      setCopied(true);
      onTriggerToast(t('toastCustomCopied'), 'success');

      // Trigger celebratory cyber confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#00f5ff', '#a855f7', '#fbbf24']
      });

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  // Format label from snake_case or kebab-case
  const formatLabel = (str) => {
    return str
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl glass-panel rounded-2xl border border-cyan-500/40 bg-[#0e121c]/95 shadow-2xl p-6 my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {t('modalTitle')}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('modalSubtitle')}
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

        {/* Modal Body */}
        <div className="overflow-y-auto py-5 space-y-6 flex-1 pr-1">
          
          {/* Target Prompt Info Header */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">
                {prompt.domain.toUpperCase()} • {prompt.model}
              </span>
              <span className="text-sm font-semibold text-white">
                {prompt.title}
              </span>
            </div>

            {variablesList.length > 0 && (
              <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                {t('variablesCount', { count: variablesList.length })}
              </span>
            )}
          </div>

          {/* Dynamic Variable Input Fields */}
          {variablesList.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  {t('variableValues')}
                </label>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{t('resetVariables')}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {variablesList.map((varName) => (
                  <div key={varName} className="space-y-1.5">
                    <label className="text-xs font-mono text-cyan-300 flex items-center gap-1">
                      <span>[{varName}]</span>
                      <span className="text-slate-400 font-sans text-[11px]">- {formatLabel(varName)}</span>
                    </label>
                    <input
                      type="text"
                      value={variableValues[varName] || ''}
                      onChange={(e) => handleInputChange(varName, e.target.value)}
                      placeholder={`Enter custom ${formatLabel(varName)}...`}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#07080d] border border-white/15 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-slate-100 placeholder-slate-500 transition-all font-mono"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">
              This prompt does not have bracketed dynamic placeholders. You can still review and copy below.
            </p>
          )}

          {/* Live Customized Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                {t('livePreview')}
              </label>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-950/40 border border-purple-500/30 px-2 py-0.5 rounded">
                Real-Time Reactive
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#07080d] border border-cyan-500/30 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed shadow-inner max-h-48 overflow-y-auto select-all">
              {customizedText}
            </div>
          </div>

          {/* Instructions note */}
          {prompt.systemInstructions && (
            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-slate-300 flex items-start gap-2">
              <Layers className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{prompt.systemInstructions}</span>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium transition-colors"
          >
            {t('close')}
          </button>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg ${
              copied
                ? 'bg-emerald-500 text-slate-950 border border-emerald-400'
                : 'bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 text-slate-950 shadow-[0_0_20px_rgba(0,245,255,0.3)]'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>{t('copied')}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{t('copyCustomized')}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
