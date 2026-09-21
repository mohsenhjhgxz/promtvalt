import { useMemo, useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { Search, Sparkles, Globe } from 'lucide-react'
import { CATEGORY_ORDER, PROMPTS } from './data/prompts.js'
import CategoryFilter from './components/CategoryFilter.jsx'
import PromptCard from './components/PromptCard.jsx'
import PromptModal from './components/PromptModal.jsx'

// پیکربندی ۸ زبان زنده با پشتیبانی از جهت نوشتار RTL/LTR
const LANGUAGES = {
  en: { name: 'English', dir: 'ltr', flag: '🇺🇸' },
  fa: { name: 'فارسی', dir: 'rtl', flag: '🇮🇷' },
  de: { name: 'Deutsch', dir: 'ltr', flag: '🇩🇪' },
  ru: { name: 'Русский', dir: 'ltr', flag: '🇷🇺' },
  es: { name: 'Español', dir: 'ltr', flag: '🇪🇸' },
  fr: { name: 'Français', dir: 'ltr', flag: '🇫🇷' },
  zh: { name: '中文', dir: 'ltr', flag: '🇨🇳' },
  ar: { name: 'العربية', dir: 'rtl', flag: '🇸🇦' },
}

const UI_TEXT = {
  en: {
    title: 'Curated prompts for your favorite models',
    subtitle: 'Browse, customize, and copy production-ready prompts for Midjourney, Runway, Sora, Flux, Claude, GPT-4o, and Web Dev.',
    searchPlaceholder: 'Search prompts, tags...',
    noMatch: 'No prompts match your search.',
    tryDifferent: 'Try a different keyword or category.',
    footer: 'prompts across models · PromptVault',
  },
  fa: {
    title: 'مجموعه پرامپت‌های برگزیده برای هوش مصنوعی',
    subtitle: 'مرور، شخصی‌سازی و کپی پرامپت‌های آماده و حرفه‌ای برای میدجورنی، سورا، ران‌وی، فلوکس، کلود، GPT-4o و توسعه وب.',
    searchPlaceholder: 'جستجو در پرامپت‌ها، تگ‌ها...',
    noMatch: 'هیچ پرامپتی با جستجوی شما مطابقت نداشت.',
    tryDifferent: 'کلمه کلیدی یا دسته‌بندی دیگری را امتحان کنید.',
    footer: 'پرامپت هوش مصنوعی در دسته‌بندی‌های گوناگون · پرامپت‌والت',
  },
  de: {
    title: 'Kuratierte Prompts für Ihre Lieblingsmodelle',
    subtitle: 'Durchsuchen, anpassen und kopieren Sie produktionsreife Prompts für Midjourney, Runway, Sora, Claude und mehr.',
    searchPlaceholder: 'Prompts, Tags suchen...',
    noMatch: 'Keine passenden Prompts gefunden.',
    tryDifferent: 'Versuchen Sie einen anderen Begriff oder eine andere Kategorie.',
    footer: 'Prompts über Modelle hinweg · PromptVault',
  },
  ru: {
    title: 'Отобранные промпты для ваших любимых нейросетей',
    subtitle: 'Просматривайте, настраивайте и копируйте готовые промпты для Midjourney, Runway, Sora, Claude и веб-разработки.',
    searchPlaceholder: 'Поиск промптов, тегов...',
    noMatch: 'Ничего не найдено по вашему запросу.',
    tryDifferent: 'Попробуйте другой запрос или категорию.',
    footer: 'промптов по категориям · PromptVault',
  },
  es: {
    title: 'Prompts seleccionados para tus modelos favoritos',
    subtitle: 'Explora, personaliza y copia prompts listos para producción para Midjourney, Runway, Sora, Claude y desarrollo web.',
    searchPlaceholder: 'Buscar prompts, etiquetas...',
    noMatch: 'No se encontraron prompts coincidentes.',
    tryDifferent: 'Prueba con otra palabra clave o categoría.',
    footer: 'prompts en diversas categorías · PromptVault',
  },
  fr: {
    title: 'Prompts sélectionnés pour vos modèles préférés',
    subtitle: 'Parcourez, personnalisez et copiez des prompts prêts à l’emploi pour Midjourney, Runway, Sora, Claude et dev web.',
    searchPlaceholder: 'Rechercher des prompts, des tags...',
    noMatch: 'Aucun prompt ne correspond à votre recherche.',
    tryDifferent: 'Essayez un autre mot-clé ou une autre catégorie.',
    footer: 'prompts dans plusieurs catégories · PromptVault',
  },
  zh: {
    title: '为您喜爱的模型精心挑选的提示词',
    subtitle: '浏览、定制并复制适用于 Midjourney、Runway、Sora、Claude、GPT-4o 和 Web 开发的高质量提示词。',
    searchPlaceholder: '搜索提示词、标签...',
    noMatch: '没有找到匹配的提示词。',
    tryDifferent: '尝试其他关键词或分类。',
    footer: '条精选提示词 · PromptVault',
  },
  ar: {
    title: 'أوامر احترافية مختارة لنماذج الذكاء الاصطناعي',
    subtitle: 'تصفح وخصص وانسخ أوامر جاهزة للاستخدام في Midjourney وRunway وSora وClaude وتطوير الويب.',
    searchPlaceholder: 'ابحث في الأوامر، الوسوم...',
    noMatch: 'لا توجد نتائج تطابق بحثك.',
    tryDifferent: 'جرب كلمة بحث أخرى أو تصنيفاً مختلفاً.',
    footer: 'أوامر ذكاء اصطناعي عبر مختلف النماذج · PromptVault',
  },
}

export default function App() {
  const [lang, setLang] = useState('en')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [openPrompt, setOpenPrompt] = useState(null)
  const [copiedId, setCopiedId] = useState(null)

  const currentLang = LANGUAGES[lang] || LANGUAGES.en
  const t = UI_TEXT[lang] || UI_TEXT.en

  useEffect(() => {
    document.documentElement.dir = currentLang.dir
    document.documentElement.lang = lang
  }, [lang, currentLang.dir])

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
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-cyan-400" />
            <span className="text-lg font-bold tracking-tight text-slate-100">PromptVault</span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300 backdrop-blur-md">
            <Globe className="h-4 w-4 text-cyan-400" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-slate-200 outline-none cursor-pointer"
            >
              {Object.entries(LANGUAGES).map(([code, meta]) => (
                <option key={code} value={code} className="bg-slate-900 text-slate-200">
                  {meta.flag} {meta.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            {t.title}
          </h1>
          <p className="mt-2 max-w-2xl text-slate-400">
            {t.subtitle}
          </p>
        </div>

        <div className="flex w-full flex-col gap-4">
          <div className="relative w-full sm:max-w-sm">
            <Search
              className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 ${
                currentLang.dir === 'rtl' ? 'right-3' : 'left-3'
              }`}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className={`w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-sm text-slate-200 outline-none placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 ${
                currentLang.dir === 'rtl' ? 'pr-9 pl-3 text-right' : 'pl-9 pr-3 text-left'
              }`}
            />
          </div>
          <CategoryFilter categories={CATEGORY_ORDER} active={category} onChange={setCategory} />
        </div>
      </header>

      <main>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] py-16 text-center">
            <p className="text-slate-300">{t.noMatch}</p>
            <p className="text-sm text-slate-500">{t.tryDifferent}</p>
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
        {PROMPTS.length} {t.footer}
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