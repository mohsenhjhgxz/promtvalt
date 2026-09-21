import { useMemo, useState } from 'react'
import confetti from 'canvas-confetti'
import { Search, Sparkles } from 'lucide-react'
import { CATEGORY_ORDER, PROMPTS } from './data/prompts.js'
import CategoryFilter from './components/CategoryFilter.jsx'
import PromptCard from './components/PromptCard.jsx'
import PromptModal from './components/PromptModal.jsx'

export default function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [openPrompt, setOpenPrompt] = useState(null)
  const [copiedId, setCopiedId] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PROMPTS.filter((p) => {
      if (category !== 'all' && p.model !== category) return false
      if (!q) return true
      return (
        p.title.toLowerCase().includes(q) ||
        p.text.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    })
  }, [query, category])

  const handleCopy = async (prompt) => {
    try {
      await navigator.clipboard.writeText(prompt.text)
    } catch {
      return
    }
    setCopiedId(prompt.id)
    confetti({
      particleCount: 60,
      spread: 55,
      startVelocity: 28,
      gravity: 1.1,
      origin: { y: 0.7 },
      colors: ['#22d3ee', '#a855f7', '#f472b6'],
    })
    setTimeout(() => setCopiedId((id) => (id === prompt.id ? null : id)), 1600)
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-6 py-10">
      <header className="mb-10 flex flex-col items-start gap-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-cyan-400" />
          <span className="text-lg font-bold tracking-tight text-slate-100">PromptVault</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            Curated prompts for your favorite models
          </h1>
          <p className="mt-2 max-w-2xl text-slate-400">
            Browse, customize, and copy production-ready prompts for Midjourney, Runway, Sora, Flux, Claude,
            GPT-4o, Three.js, and React.
          </p>
        </div>

        <div className="flex w-full flex-col gap-4">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search prompts, tags..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-9 pr-3 text-sm text-slate-200 outline-none placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
            />
          </div>
          <CategoryFilter categories={CATEGORY_ORDER} active={category} onChange={setCategory} />
        </div>
      </header>

      <main>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] py-16 text-center">
            <p className="text-slate-300">No prompts match your search.</p>
            <p className="text-sm text-slate-500">Try a different keyword or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                copied={copiedId === prompt.id}
                onCopy={handleCopy}
                onOpen={setOpenPrompt}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="mt-16 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
        {PROMPTS.length} prompts across {CATEGORY_ORDER.length} models · PromptVault
      </footer>

      {openPrompt && (
        <PromptModal
          key={openPrompt.id}
          prompt={openPrompt}
          copied={copiedId === openPrompt.id}
          onClose={() => setOpenPrompt(null)}
          onCopy={handleCopy}
        />
      )}
    </div>
  )
}
