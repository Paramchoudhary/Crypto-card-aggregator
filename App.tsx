import React, { useState, useEffect, useMemo } from 'react';
import { cryptoCards } from './data';
import { FilterState, SortOption } from './types';
import CryptoCard from './components/CryptoCard';
import FilterBar from './components/FilterBar';
import ComparisonView from './components/ComparisonView';
import { LayoutDashboard, ArrowRight, Sun, Moon, ArrowUpRight, Copy } from 'lucide-react';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>('cashbackHigh');
  const [activeTab, setActiveTab] = useState<'discover' | 'compare'>('discover');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    cardType: [],
    network: [],
    custody: [],
    minCashback: 0,
    annualFee: 'all',
    fxFee: 'all',
  });

  // Dark Mode Logic
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Automatically switch to compare tab if full, though we allow manual switching
  useEffect(() => {
    if (selectedCards.length > 0 && activeTab === 'compare') {
      // keep compare tab open
    } else if (selectedCards.length === 0 && activeTab === 'compare') {
      setActiveTab('discover');
    }
  }, [selectedCards.length]);

  // Filtering Logic
  const filteredCards = useMemo(() => {
    return cryptoCards.filter(card => {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        card.name.toLowerCase().includes(searchLower) || 
        card.issuer.toLowerCase().includes(searchLower) ||
        card.perks.some(p => p.toLowerCase().includes(searchLower));

      const matchesNetwork = filters.network.length === 0 || filters.network.includes(card.network);
      const matchesCustody = filters.custody.length === 0 || filters.custody.includes(card.custody);
      const matchesCashback = card.cashbackMax >= filters.minCashback;
      
      return matchesSearch && matchesNetwork && matchesCustody && matchesCashback;
    }).sort((a, b) => {
      if (sort === 'cashbackHigh') return b.cashbackMax - a.cashbackMax;
      if (sort === 'nameAZ') return a.name.localeCompare(b.name);
      if (sort === 'newest') return 0;
      return 0;
    });
  }, [filters, sort]);

  const handleSelect = (id: string) => {
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter(c => c !== id));
    } else {
      // Allow selecting more cards for the table view comparison
      if (selectedCards.length >= 6) {
        alert("You can select up to 6 cards for comparison.");
        return;
      }
      setSelectedCards([...selectedCards, id]);
    }
  };

  const selectedCardsData = cryptoCards.filter(c => selectedCards.includes(c.id));

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FB] dark:bg-[#0C0E12] font-sans selection:bg-lime-400 selection:text-black">
      
      {/* Sidebar - Minimalist Finto Style */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-[#151F2E] border-r border-slate-100 dark:border-slate-800 p-6 z-20">
         <div className="flex items-center gap-3 mb-12 px-2">
            <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center shadow-lg shadow-lime-400/20">
              <span className="font-bold text-black">F</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Crypto Card Aggregator</span>
         </div>

         <nav className="space-y-1 flex-1">
            <button 
              onClick={() => setActiveTab('discover')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                activeTab === 'discover'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-lg shadow-slate-900/10' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Discover Cards
            </button>
            
            <button 
              onClick={() => setActiveTab('compare')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all group ${
                activeTab === 'compare'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-lg shadow-slate-900/10' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Copy className="w-5 h-5" />
              Comparison
              {selectedCards.length > 0 && (
                <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-md ${activeTab === 'compare' ? 'bg-white/20 text-white dark:text-black' : 'bg-lime-400 text-black'}`}>
                  {selectedCards.length}
                </span>
              )}
            </button>
         </nav>

      
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-300">
        
        {/* Render Active View */}
        {activeTab === 'discover' ? (
          <>
            {/* Top Header */}
            <header className="h-20 shrink-0 flex items-center justify-between px-8 bg-[#F8F9FB] dark:bg-[#0C0E12] z-10">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Explore Cards</h1>
              </div>
              
              <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-10 h-10 rounded-full bg-white dark:bg-[#151F2E] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
               
              </div>
            </header>

            {/* Scrollable Content */}
            <main className="flex-1 overflow-y-auto px-8 pb-32 custom-scrollbar">
              <FilterBar 
                filters={filters} 
                sort={sort} 
                onFilterChange={setFilters} 
                onSortChange={setSort}
                resultsCount={filteredCards.length}
              />

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
                  {filteredCards.map(card => (
                      <CryptoCard 
                        key={card.id}
                        card={card}
                        selected={selectedCards.includes(card.id)}
                        onSelect={handleSelect}
                      />
                  ))}
              </div>
            </main>

            {/* Floating Action Bar */}
            {selectedCards.length > 0 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-in slide-in-from-bottom-4 fade-in duration-300">
                <div className="flex items-center gap-4 p-2 pl-4 pr-2 bg-slate-900 dark:bg-white rounded-full shadow-2xl shadow-slate-900/20 ring-1 ring-white/10 backdrop-blur-md">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white dark:text-black">{selectedCards.length} cards selected</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">Ready to compare</span>
                    </div>
                    
                    <div className="h-8 w-px bg-white/20 dark:bg-black/10"></div>
                    
                    <div className="flex -space-x-2 px-1">
                      {selectedCardsData.slice(0, 4).map(c => (
                        <img key={c.id} src={c.logo} className="w-8 h-8 rounded-full border-2 border-slate-900 dark:border-white bg-white" />
                      ))}
                      {selectedCardsData.length > 4 && (
                        <div className="w-8 h-8 rounded-full border-2 border-slate-900 dark:border-white bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
                          +{selectedCardsData.length - 4}
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={() => setActiveTab('compare')}
                      className="h-10 px-5 rounded-full bg-lime-400 hover:bg-lime-500 text-black font-bold flex items-center gap-2 transition-all hover:scale-105"
                    >
                      Compare <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <ComparisonView 
            cards={selectedCardsData} 
            onRemove={(id) => handleSelect(id)}
            onBack={() => setActiveTab('discover')}
          />
        )}

      </div>
    </div>
  );
};

export default App;