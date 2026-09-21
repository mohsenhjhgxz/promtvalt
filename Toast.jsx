import React from 'react';
import { CheckCircle2, BookmarkCheck, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />,
    bookmark: <BookmarkCheck className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-purple-400 shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="glass-panel px-4 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-cyan-500/30 bg-[#0e121c]/95 text-slate-100 min-w-[280px] max-w-md">
        {icons[type] || icons.success}
        <span className="text-sm font-medium tracking-wide flex-1">{message}</span>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
