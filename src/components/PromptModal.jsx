import { useEffect, useState } from 'react'
import { Check, Copy, X } from 'lucide-react'
import { MODELS } from '../data/prompts.js'

export default function PromptModal({ prompt, onClose, onCopy, copied }) {
  const [draft, setDraft] = useState(prompt.text)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const model = MODELS[prompt.model]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-fade-in w-full max-w-xl rounded-2xl border border-white/10 bg-[#0b0d14] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <span
              className={`mb-2 inline-flex items-center rounded-full bg-gradient-to-r ${model.color} px-2.5 py-1 text-xs font-semibold text-white/95`}
            >
              {model.label}
            </span>
            <h2 className="mt-2 text-lg font-semibold text-slate-100">{prompt.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={7}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm leading-relaxed text-slate-200 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-white/5"
          >
            Close
          </button>
          <button
            onClick={() => onCopy({ ...prompt, text: draft })}
            className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 ring-1 ring-inset ring-cyan-500/30 transition-colors hover:bg-cyan-500/20"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy prompt'}
          </button>
        </div>
      </div>
    </div>
  )
}
