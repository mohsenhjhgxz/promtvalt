import { Sparkles } from 'lucide-react'

function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex items-center gap-2 text-cyan-400">
        <Sparkles className="size-8" />
        <span className="text-sm font-mono uppercase tracking-widest">Prompt Directory & Playground</span>
      </div>
      <h1 className="text-4xl sm:text-6xl font-[Outfit] font-extrabold tracking-tight">
        Prompt<span className="text-cyan-400">Vault</span>
      </h1>
      <p className="max-w-xl text-slate-400">
        This is a starting scaffold. Build out your curated prompt directory and playground here.
      </p>
    </main>
  )
}

export default App
