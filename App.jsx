import React, { useState, useMemo } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { BookmarksProvider, useBookmarks } from './context/BookmarksContext';
import { samplePrompts } from './data/promptsData';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FilterBar from './components/FilterBar';
import PromptGrid from './components/PromptGrid';
import CustomizeModal from './components/CustomizeModal';
import PromptDetailModal from './components/PromptDetailModal';
import PromptBuilderModal from './components/PromptBuilderModal';
import Toast from './components/Toast';
import Footer from './components/Footer';

function PromptVaultApp() {
  const { bookmarks } = useBookmarks();
  const [prompts, setPrompts] = useState(samplePrompts);
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'bookmarks'
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTool, setSelectedTool] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'newest' | 'difficulty'

  // Modals state
  const [customizingPrompt, setCustomizingPrompt] = useState(null);
  const [inspectingPrompt, setInspectingPrompt] = useState(null);
  const [builderOpen, setBuilderOpen] = useState(false);

  // Toast state
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: 'success' });
    }, 3200);
  };

  const handleAddPrompt = (newPrompt) => {
    setPrompts(prev => [newPrompt, ...prev]);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTool('all');
    setSelectedDifficulty('all');
    setSortBy('popular');
  };

  const isFiltered = 
    searchQuery !== '' || 
    selectedCategory !== 'all' || 
    selectedTool !== 'all' || 
    selectedDifficulty !== 'all';

  // Filter and sort prompts
  const filteredPrompts = useMemo(() => {
    return prompts.filter(p => {
      // Bookmarks filter
      if (activeTab === 'bookmarks' && !bookmarks.includes(p.id)) {
        return false;
      }

      // Domain / Category filter
      if (selectedCategory !== 'all' && p.domain !== selectedCategory) {
        return false;
      }

      // Model / Tool filter
      if (selectedTool !== 'all' && !p.model.toLowerCase().includes(selectedTool.toLowerCase())) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && p.difficulty !== selectedDifficulty) {
        return false;
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesText = p.promptText.toLowerCase().includes(query);
        const matchesModel = p.model.toLowerCase().includes(query);
        const matchesTags = p.tags?.some(tag => tag.toLowerCase().includes(query));
        const matchesDirectives = p.cameraDirectives?.some(dir => dir.toLowerCase().includes(query));

        if (!matchesTitle && !matchesDesc && !matchesText && !matchesModel && !matchesTags && !matchesDirectives) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.copies || 0) - (a.copies || 0);
      }
      if (sortBy === 'newest') {
        return b.id.localeCompare(a.id);
      }
      if (sortBy === 'difficulty') {
        const diffRank = { beginner: 1, intermediate: 2, expert: 3 };
        return (diffRank[b.difficulty] || 1) - (diffRank[a.difficulty] || 1);
      }
      return 0;
    });
  }, [prompts, activeTab, bookmarks, selectedCategory, selectedTool, selectedDifficulty, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#07080d] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenBuilder={() => setBuilderOpen(true)}
      />

      {/* Hero & Search (shown in Explore tab) */}
      {activeTab === 'explore' ? (
        <HeroSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          totalPromptsCount={prompts.length}
        />
      ) : (
        <div className="pt-10 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-2">
            Saved Prompts
          </h2>
          <p className="text-sm text-slate-400">
            Quickly access and customize your bookmarked prompt blueprints.
          </p>
        </div>
      )}

      {/* Filter and Sorting Bar */}
      <FilterBar
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filteredCount={filteredPrompts.length}
        onResetFilters={resetFilters}
        isFiltered={isFiltered}
      />

      {/* Prompt Grid Content */}
      <main className="flex-1">
        <PromptGrid
          prompts={filteredPrompts}
          isBookmarksView={activeTab === 'bookmarks'}
          onCustomize={(prompt) => setCustomizingPrompt(prompt)}
          onInspect={(prompt) => setInspectingPrompt(prompt)}
          onTriggerToast={triggerToast}
          onResetFilters={resetFilters}
        />
      </main>

      {/* Modals */}
      {customizingPrompt && (
        <CustomizeModal
          prompt={customizingPrompt}
          onClose={() => setCustomizingPrompt(null)}
          onTriggerToast={triggerToast}
        />
      )}

      {inspectingPrompt && (
        <PromptDetailModal
          prompt={inspectingPrompt}
          onClose={() => setInspectingPrompt(null)}
          onCustomize={(prompt) => setCustomizingPrompt(prompt)}
          onTriggerToast={triggerToast}
        />
      )}

      {builderOpen && (
        <PromptBuilderModal
          onClose={() => setBuilderOpen(false)}
          onAddPrompt={handleAddPrompt}
          onTriggerToast={triggerToast}
        />
      )}

      {/* Toast Notification */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'success' })} 
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <BookmarksProvider>
          <PromptVaultApp />
        </BookmarksProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
