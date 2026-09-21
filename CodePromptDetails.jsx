import React, { useState } from 'react';
import { Code2, Terminal, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CodePromptDetails({ prompt }) {
  const { t } = useLanguage();
  const [showOutput, setShowOutput] = useState(false);

  if (prompt.domain !== 'webdev' && prompt.domain !== 'agents') return null;

  return (
    <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2.5">
      {/* Tech Stack Pills */}
      {prompt.techStack && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mr-1">
            <Layers className="w-3 h-3 text-cyan-400" />
            Stack:
          </span>
          {prompt.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* System Prompt preview if available */}
      {prompt.systemPrompt && (
        <div className="p-2.5 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs">
          <div className="flex items-center gap-1.5 text-purple-300 font-mono text-[11px] font-semibold mb-1">
            <Terminal className="w-3 h-3" />
            {t('systemPrompt')}
          </div>
          <p className="text-slate-300 text-[11px] line-clamp-2 italic font-mono">
            "{prompt.systemPrompt}"
          </p>
        </div>
      )}

      {/* Expected Output Accordion */}
      {prompt.expectedOutput && (
        <div className="text-xs">
          <button
            onClick={() => setShowOutput(!showOutput)}
            className="flex items-center justify-between w-full py-1 text-slate-400 hover:text-cyan-400 font-mono text-[11px] transition-colors"
          >
            <span className="flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              {t('expectedOutput')}
            </span>
            {showOutput ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showOutput && (
            <div className="mt-1.5 p-2 rounded-lg bg-black/40 border border-cyan-500/20 text-slate-300 font-mono text-[11px] leading-relaxed">
              {prompt.expectedOutput}
              {prompt.previewCode && (
                <pre className="mt-2 p-2 rounded bg-[#07080d] border border-white/10 overflow-x-auto text-cyan-300 text-[10px]">
                  <code>{prompt.previewCode}</code>
                </pre>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
