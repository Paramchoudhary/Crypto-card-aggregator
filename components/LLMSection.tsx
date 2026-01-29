import React, { useState, useMemo } from 'react';
import { llmData, userNeeds } from '../constants/llmData';
import { LLMModel, LLMFilterState } from '../types';
import LLMCard from './LLMCard';
import LLMSmartFilter from './LLMSmartFilter';
import LLMComparisonView from './LLMComparisonView';
import { Brain, ArrowRight, Copy, LayoutGrid, Sun, Moon } from 'lucide-react';

interface Props {
  darkMode?: boolean;
  onDarkModeToggle?: () => void;
}

const LLMSection: React.FC<Props> = ({ darkMode = false, onDarkModeToggle }) => {
  const [selectedLLMs, setSelectedLLMs] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<'grid' | 'compare'>('grid');
  const [filters, setFilters] = useState<LLMFilterState>({
    selectedNeed: null,
    searchQuery: '',
  });

  // Get matched LLM IDs based on selected need
  const matchedLLMIds = useMemo(() => {
    if (!filters.selectedNeed) return [];
    
    const need = userNeeds.find(n => n.id === filters.selectedNeed);
    if (!need) return [];
    
    return llmData
      .filter(llm => 
        need.matchStrengths.some(strength => 
          llm.primaryStrength === strength || 
          llm.secondaryStrengths.includes(strength)
        )
      )
      .map(llm => llm.id);
  }, [filters.selectedNeed]);

  // Filter LLMs based on search and need
  const filteredLLMs = useMemo(() => {
    return llmData.filter(llm => {
      // Search filter
      const searchLower = filters.searchQuery.toLowerCase();
      const matchesSearch = 
        !searchLower ||
        llm.name.toLowerCase().includes(searchLower) ||
        llm.provider.toLowerCase().includes(searchLower) ||
        llm.primaryStrength.toLowerCase().includes(searchLower) ||
        llm.tagline.toLowerCase().includes(searchLower) ||
        llm.specialFeatures.some(f => f.toLowerCase().includes(searchLower));

      // Need filter - if a need is selected, only show matching LLMs
      const matchesNeed = !filters.selectedNeed || matchedLLMIds.includes(llm.id);

      return matchesSearch && matchesNeed;
    });
  }, [filters, matchedLLMIds]);

  // Handle LLM selection for comparison
  const handleSelect = (id: string) => {
    if (selectedLLMs.includes(id)) {
      setSelectedLLMs(selectedLLMs.filter(llmId => llmId !== id));
    } else {
      if (selectedLLMs.length >= 4) {
        alert("You can select up to 4 LLMs for comparison.");
        return;
      }
      setSelectedLLMs([...selectedLLMs, id]);
    }
  };

  // Get selected LLM data
  const selectedLLMsData = llmData.filter(llm => selectedLLMs.includes(llm.id));

  // Auto-switch to grid if no LLMs selected in compare view
  React.useEffect(() => {
    if (selectedLLMs.length === 0 && activeView === 'compare') {
      setActiveView('grid');
    }
  }, [selectedLLMs.length, activeView]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FB] dark:bg-[#0C0E12] font-sans">
      
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-[#151F2E] border-r border-slate-100 dark:border-slate-800 p-6 z-20">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-violet-400/10 bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">LLM Hub</span>
        </div>

        <nav className="space-y-1 flex-1">
          <button 
            onClick={() => setActiveView('grid')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
              activeView === 'grid'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-lg shadow-slate-900/10' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
            Discover LLMs
          </button>
          
          <button 
            onClick={() => setActiveView('compare')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all group ${
              activeView === 'compare'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-lg shadow-slate-900/10' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Copy className="w-5 h-5" />
            Comparison
            {selectedLLMs.length > 0 && (
              <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-md ${activeView === 'compare' ? 'bg-white/20 text-white dark:text-black' : 'bg-violet-400 text-white'}`}>
                {selectedLLMs.length}
              </span>
            )}
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-300">
        
        {activeView === 'grid' ? (
          <>
            {/* Top Header */}
            <header className="h-20 shrink-0 flex items-center justify-between px-8 bg-[#F8F9FB] dark:bg-[#0C0E12] z-10">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Explore LLMs</h1>
                <p className="text-sm text-slate-500">Find the perfect AI model for your needs</p>
              </div>
              
              {onDarkModeToggle && (
                <div className="flex items-center gap-4">
                  <button 
                    onClick={onDarkModeToggle}
                    className="w-10 h-10 rounded-full bg-white dark:bg-[#151F2E] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                </div>
              )}
            </header>

            {/* Scrollable Content */}
            <main className="flex-1 overflow-y-auto px-8 pb-32 custom-scrollbar">
              {/* Smart Filter */}
              <LLMSmartFilter 
                selectedNeed={filters.selectedNeed}
                searchQuery={filters.searchQuery}
                onNeedSelect={(need) => setFilters(prev => ({ ...prev, selectedNeed: need }))}
                onSearchChange={(query) => setFilters(prev => ({ ...prev, searchQuery: query }))}
                resultsCount={filteredLLMs.length}
              />

              {/* LLM Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
                {filteredLLMs.length > 0 ? filteredLLMs.map(llm => (
                  <LLMCard 
                    key={llm.id}
                    llm={llm}
                    selected={selectedLLMs.includes(llm.id)}
                    onSelect={handleSelect}
                    highlighted={matchedLLMIds.includes(llm.id) && filters.selectedNeed !== null}
                  />
                )) : (
                  <div className="col-span-full py-20 text-center">
                    <p className="text-slate-500">No LLMs match your search criteria.</p>
                    <button 
                      onClick={() => setFilters({ selectedNeed: null, searchQuery: '' })}
                      className="mt-4 text-violet-600 font-bold hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </main>

            {/* Floating Action Bar */}
            {selectedLLMs.length > 0 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-in slide-in-from-bottom-4 fade-in duration-300">
                <div className="flex items-center gap-4 p-2 pl-4 pr-2 bg-slate-900 dark:bg-white rounded-full shadow-2xl shadow-slate-900/20 ring-1 ring-white/10 backdrop-blur-md">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white dark:text-black">{selectedLLMs.length} LLMs selected</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">
                      Ready to compare
                    </span>
                  </div>
                  
                  <div className="h-8 w-px bg-white/20 dark:bg-black/10"></div>
                  
                  <div className="flex -space-x-2 px-1">
                    {selectedLLMsData.slice(0, 3).map(llm => (
                      <img 
                        key={llm.id} 
                        src={llm.logoUrl} 
                        className="w-8 h-8 rounded-full border-2 border-slate-900 dark:border-white bg-white" 
                        alt={llm.name} 
                      />
                    ))}
                    {selectedLLMsData.length > 3 && (
                      <div className="w-8 h-8 rounded-full border-2 border-slate-900 dark:border-white bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
                        +{selectedLLMsData.length - 3}
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => setActiveView('compare')}
                    className="h-10 px-5 rounded-full bg-violet-500 hover:bg-violet-600 text-white font-bold flex items-center gap-2 transition-all hover:scale-105"
                  >
                    Compare <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <LLMComparisonView 
            llms={selectedLLMsData} 
            onRemove={(id) => handleSelect(id)}
            onBack={() => setActiveView('grid')}
          />
        )}
      </div>
    </div>
  );
};

export default LLMSection;
