import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Terminal, Globe, Heart, ShieldCheck, Sparkles } from 'lucide-react';

export default function Footer() {
  const { t, languages } = useLanguage();

  return (
    <footer className="w-full border-t border-white/10 bg-[#06070a]/90 backdrop-blur-md pt-12 pb-8 mt-16 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-wider">
                PROMPT<span className="text-cyan-400">VAULT</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              {t('footerDesc')}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-cyan-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('allRightsReserved')}</span>
            </div>
          </div>

          {/* Curated Domains */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold mb-3">
              Prompt Categories
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Video: Runway Gen-3 & Sora</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Image: Midjourney v6 & Flux.1</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Code: React, Next.js & Tailwind</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Agents: Claude 3.5 & GPT-4o</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">3D Design & Audio Synthesis</li>
            </ul>
          </div>

          {/* Localization Info */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold mb-3 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              Internationalization ({languages.length})
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              Instant runtime LTR & RTL support:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {languages.map((l) => (
                <span key={l.code} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                  {l.flag} {l.nativeName}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} PromptVault Engine. {t('footerBuiltWith')}
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Cyberpunk Glassmorphism UI</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
