import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SlidersHorizontal, RotateCcw, Cpu, Gauge, ArrowUpDown } from 'lucide-react';

export default function FilterBar({
  selectedTool,
  setSelectedTool,
  selectedDifficulty,
  setSelectedDifficulty,
  sortBy,
  setSortBy,
  filteredCount,
  onResetFilters,
  isFiltered
}) {
  const { t } = useLanguage();

  const tools = [
    { id: 'all', label: 'All Models & Stacks' },
    { id: 'Runway', label: 'Runway Gen-3' },
    { id: 'Sora', label: 'OpenAI Sora' },
    { id: 'Midjourney', label: 'Midjourney v6' },
    { id: 'Flux', label: 'Flux.1' },
    { id: 'React', label: 'React / Next.js' },
    { id: 'Three.js', label: 'Three.js / WebGL' },
    { id: 'Claude', label: 'Claude 3.5' },
    { id: 'Suno', label: 'Suno v3.5' },
    { id: 'Spline', label: 'Spline 3D' },
  ];

  const difficulties = [
    { id: 'all', label: t('diffAll') },
    { id: 'beginner', label: t('diffBeginner') },
    { id: 'intermediate', label: t('diffIntermediate') },
    { id: 'expert', label: t('diffExpert') },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-6">
      <div className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-wrap items-center justify-between gap-4">
        
        {/* Filters Left Section */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Tool / Model Selector */}
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
            <select
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#0e121c] border border-white/15 text-slate-200 text-xs sm:text-sm focus:border-cyan-400 focus:outline-none cursor-pointer"
            >
              {tools.map((tool) => (
                <option key={tool.id} value={tool.id} className="bg-[#0e121c] text-slate-200">
                  {tool.label}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-purple-400 shrink-0" />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#0e121c] border border-white/15 text-slate-200 text-xs sm:text-sm focus:border-purple-400 focus:outline-none cursor-pointer"
            >
              {difficulties.map((diff) => (
                <option key={diff.id} value={diff.id} className="bg-[#0e121c] text-slate-200">
                  {diff.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-amber-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#0e121c] border border-white/15 text-slate-200 text-xs sm:text-sm focus:border-amber-400 focus:outline-none cursor-pointer"
            >
              <option value="popular" className="bg-[#0e121c] text-slate-200">{t('sortPopular')}</option>
              <option value="newest" className="bg-[#0e121c] text-slate-200">{t('sortNewest')}</option>
              <option value="difficulty" className="bg-[#0e121c] text-slate-200">{t('sortDifficulty')}</option>
            </select>
          </div>

          {/* Reset Filters Button */}
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-medium transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('clearFilters')}</span>
            </button>
          )}

        </div>

        {/* Results Counter Right Section */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-lg">
            {t('showingResults', { count: filteredCount })}
          </span>
        </div>

      </div>
    </div>
  );
}
