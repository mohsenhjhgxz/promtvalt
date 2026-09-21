import { Check, Copy, Maximize2 } from 'lucide-react'
import { MODELS } from '../data/prompts.js'

export default function PromptCard({ prompt, copied, onCopy, onOpen }) {
  const model = MODELS[prompt.model]

  return (
    <div className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.05]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center rounded-full bg-gradient-to-r ${model.color} px-2.5 py-1 text-xs font-semibold text-white/95 shadow-sm`}
        >
          {model.label}
        </span>
        <span className="text-[11px] uppercase tracking-wide text-slate-500">{model.kind}</span>
      </div>

      <h3 className="mb-2 text-base font-semibold text-slate-100">{prompt.title}</h3>

      <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-400">{prompt.text}</p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {prompt.tags.map((tag) => (
          <span key={tag} className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-slate-400">
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onOpen(prompt)}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 transition-colors hover:border-white/20 hover:bg-white/5"
        >
          <Maximize2 className="h-3.5 w-3.5" />
          Open
        </button>
        <button
          onClick={() => onCopy(prompt)}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-300 ring-1 ring-inset ring-cyan-500/30 transition-colors hover:bg-cyan-500/20"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}
