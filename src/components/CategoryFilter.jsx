import { MODELS } from '../data/prompts.js'

export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('all')}
        className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
          active === 'all'
            ? 'bg-slate-100 text-slate-900'
            : 'border border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200'
        }`}
      >
        All
      </button>
      {categories.map((key) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
            active === key
              ? 'bg-slate-100 text-slate-900'
              : 'border border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200'
          }`}
        >
          {MODELS[key].label}
        </button>
      ))}
    </div>
  )
}
