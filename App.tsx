import React, { useState, useEffect, useMemo } from 'react';
import { cryptoCards } from './data';
import { FilterState, SortOption } from './types';
import CryptoCard from './components/CryptoCard';
import FilterBar from './components/FilterBar';
import ComparisonView from './components/ComparisonView';
import RecommendationWizard from './components/RecommendationWizard';
import PrivacyPage from './components/PrivacyPage';
import { LayoutDashboard, ArrowRight, Sun, Moon, ArrowUpRight, Copy, Sparkles, Wallet, Layers, Coins, Shield } from 'lucide-react';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  // Changed default sort to featured (serial wise)
  const [sort, setSort] = useState<SortOption>('featured');
  const [activeTab, setActiveTab] = useState<'discover' | 'compare'>('discover');
  const [activePage, setActivePage] = useState<'cards' | 'privacy'>('cards');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    cardType: [],
    network: [],
    custody: [],
    minCashback: 0,
    annualFee: 'all',
    fxFee: 'all',
    region: '',
    kyc: '',
    currency: ''
  });

  // Dark Mode Logic
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Google Analytics Tracking
  useEffect(() => {
    if (typeof window.gtag === 'function') {
       const pageTitle = activePage === 'privacy' 
         ? 'Privacy Protocols' 
         : activeTab === 'discover' ? 'Discover Cards' : 'Comparison View';
       const pagePath = activePage === 'privacy' ? '/privacy' : `/${activeTab}`;
       
       window.gtag('event', 'page_view', {
          page_title: pageTitle,
          page_path: pagePath,
          send_to: 'G-XXXXXXXXXX' // Optional: ensures it sends to your specific ID if multiple are present
       });
    }
  }, [activeTab, activePage]);

  const handleTabChange = (tab: 'discover' | 'compare') => {
    setActiveTab(tab);
  };

  const handleCompareClick = () => {
    setActiveTab('compare');
  };

  // Automatically switch to compare tab if full, though we allow manual switching
  useEffect(() => {
    if (selectedCards.length === 0 && activeTab === 'compare') {
      setActiveTab('discover');
    }
  }, [selectedCards.length, activeTab]);

  // Helper for Smart Region Matching
  const checkRegionMatch = (cardRegions: string, selectedRegion: string) => {
    if (!selectedRegion || selectedRegion === 'Global') return true;
    
    const cardReg = cardRegions.toLowerCase();
    const selReg = selectedRegion.toLowerCase();
    
    // 1. Direct match (e.g. Card has "US", User selects "US")
    if (cardReg.includes(selReg)) return true;
    
    // 2. Parent Region Mapping
    const mappings: Record<string, string[]> = {
       'india': ['apac', 'asia', 'global', 'worldwide'],
       'nigeria': ['africa', 'global', 'worldwide'],
       'japan': ['apac', 'asia', 'global', 'worldwide'],
       'south korea': ['apac', 'asia', 'global', 'worldwide'],
       'vietnam': ['apac', 'asia', 'global', 'worldwide'],
       'indonesia': ['apac', 'asia', 'global', 'worldwide'],
       'philippines': ['apac', 'asia', 'global', 'worldwide'],
       'thailand': ['apac', 'asia', 'global', 'worldwide'],
       'singapore': ['apac', 'asia', 'global', 'worldwide'],
       'australia': ['apac', 'oceania', 'global', 'worldwide'],
       'china': ['apac', 'asia', 'global', 'worldwide'],
       
       'brazil': ['latam', 'south america', 'global', 'worldwide'],
       'argentina': ['latam', 'south america', 'global', 'worldwide'],
       'mexico': ['latam', 'north america', 'global', 'worldwide'],
       
       'canada': ['north america', 'global', 'worldwide'],
       
       'united kingdom': ['uk', 'europe', 'global', 'worldwide'],
       'germany': ['eea', 'europe', 'global', 'worldwide'],
       'france': ['eea', 'europe', 'global', 'worldwide'],
       'spain': ['eea', 'europe', 'global', 'worldwide'],
       'italy': ['eea', 'europe', 'global', 'worldwide'],
       'netherlands': ['eea', 'europe', 'global', 'worldwide'],
       'switzerland': ['europe', 'global', 'worldwide'],
       
       'turkey': ['europe', 'asia', 'global', 'worldwide'],
       'uae': ['mena', 'global', 'worldwide'],
       'saudi arabia': ['mena', 'global', 'worldwide'],
       'south africa': ['africa', 'global', 'worldwide'],
       
       // USA is often excluded from Global, so we are stricter. 
       // We only match if card explicitly says US/USA.
       'united states': ['us', 'usa'],
       'usa': ['us', 'usa'],
    };

    if (mappings[selReg]) {
       // Special Strict Case: USA
       if (['united states', 'usa'].includes(selReg)) {
          return mappings[selReg].some(r => cardReg.includes(r));
       }
       // General Case: Match any parent region
       return mappings[selReg].some(r => cardReg.includes(r));
    }

    return false;
  };

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

      // New Smart Region Filter
      const matchesRegion = checkRegionMatch(card.regions, filters.region);

      const matchesKyc = filters.kyc === '' || card.kyc === filters.kyc;
      
      const matchesCurrency = filters.currency === '' || 
                              card.supportedCurrencies.includes(filters.currency) ||
                              card.supportedCurrencies.includes('Global');
      
      return matchesSearch && matchesNetwork && matchesCustody && matchesCashback && matchesRegion && matchesKyc && matchesCurrency;
    }).sort((a, b) => {
      // Logic for sorting
      if (sort === 'featured') {
         // Sort by rank if exists, else keep original order (which is essentially 0 since map preserves order)
         const rankA = a.rank || 999;
         const rankB = b.rank || 999;
         return rankA - rankB;
      }
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
      
      <RecommendationWizard 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
        onSelectCard={(id) => {
          setSelectedCards(prev => [...prev, id]);
          // Optional: Scroll to card or highlight it
        }} 
      />

      {/* Sidebar - Minimalist Finto Style */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-[#151F2E] border-r border-slate-100 dark:border-slate-800 p-6 z-20">
         <div className="flex items-center gap-3 mb-12 px-2">
            {/* Custom Logo for CryptoAgg */}
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-lime-400/10 bg-slate-900 dark:bg-black flex items-center justify-center relative">
              <Layers className="absolute w-6 h-6 text-lime-400" />
              <Coins className="absolute w-3 h-3 text-white bottom-2 right-2" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">CryptoAgg</span>
         </div>

         <nav className="space-y-1 flex-1">
            <button 
              onClick={() => { setActivePage('cards'); handleTabChange('discover'); }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                activePage === 'cards' && activeTab === 'discover'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-lg shadow-slate-900/10' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Discover Cards
            </button>
            
            <button 
              onClick={() => { setActivePage('cards'); handleTabChange('compare'); }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all group ${
                activePage === 'cards' && activeTab === 'compare'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-lg shadow-slate-900/10' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Copy className="w-5 h-5" />
              Comparison
              {selectedCards.length > 0 && (
                <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-md ${activePage === 'cards' && activeTab === 'compare' ? 'bg-white/20 text-white dark:text-black' : 'bg-lime-400 text-black'}`}>
                  {selectedCards.length}
                </span>
              )}
            </button>

            {/* Privacy Protocols Section - Cyberpunk Style */}
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="px-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Privacy</span>
              <button 
                onClick={() => setActivePage('privacy')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all mt-2 ${
                  activePage === 'privacy'
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 shadow-lg shadow-cyan-500/10 border border-cyan-500/30' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-400 dark:hover:text-cyan-400'
                }`}
              >
                <Shield className="w-5 h-5" />
                Privacy Protocols
                <span className={`ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded ${activePage === 'privacy' ? 'bg-cyan-400/20 text-cyan-400' : 'bg-cyan-500/10 text-cyan-500'}`}>
                  NEW
                </span>
              </button>
            </div>

            <button 
               onClick={() => setIsWizardOpen(true)}
               className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold text-lime-600 dark:text-lime-400 hover:bg-lime-50 dark:hover:bg-lime-900/10 transition-all mt-4"
            >
               <Sparkles className="w-5 h-5" />
               Find My Card
            </button>
         </nav>

        
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-300">
        
        {/* Render Privacy Page or Cards View */}
        {activePage === 'privacy' ? (
          <PrivacyPage 
            onBack={() => setActivePage('cards')} 
            darkMode={darkMode}
          />
        ) : activeTab === 'discover' ? (
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
                  {filteredCards.length > 0 ? filteredCards.map(card => (
                      <CryptoCard 
                        key={card.id}
                        card={card}
                        selected={selectedCards.includes(card.id)}
                        onSelect={handleSelect}
                      />
                  )) : (
                     <div className="col-span-full py-20 text-center">
                        <p className="text-slate-500">No cards match your specific filters.</p>
                        <button 
                           onClick={() => setFilters({
                              search: '',
                              cardType: [],
                              network: [],
                              custody: [],
                              minCashback: 0,
                              annualFee: 'all',
                              fxFee: 'all',
                              region: '',
                              kyc: '',
                              currency: ''
                           })}
                           className="mt-4 text-lime-600 font-bold hover:underline"
                        >
                           Clear all filters
                        </button>
                     </div>
                  )}
              </div>
            </main>

            {/* Floating Action Bar */}
            {selectedCards.length > 0 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-in slide-in-from-bottom-4 fade-in duration-300">
                <div className="flex items-center gap-4 p-2 pl-4 pr-2 bg-slate-900 dark:bg-white rounded-full shadow-2xl shadow-slate-900/20 ring-1 ring-white/10 backdrop-blur-md">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white dark:text-black">{selectedCards.length} cards selected</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">
                          Ready to compare
                      </span>
                    </div>
                    
                    <div className="h-8 w-px bg-white/20 dark:bg-black/10"></div>
                    
                    <div className="flex -space-x-2 px-1">
                      {selectedCardsData.slice(0, 4).map(c => (
                        <img key={c.id} src={c.logo} className="w-8 h-8 rounded-full border-2 border-slate-900 dark:border-white bg-white" alt={c.name} />
                      ))}
                      {selectedCardsData.length > 4 && (
                        <div className="w-8 h-8 rounded-full border-2 border-slate-900 dark:border-white bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
                          +{selectedCardsData.length - 4}
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={handleCompareClick}
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
