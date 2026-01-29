import React, { useState, useEffect, useMemo } from 'react';
import { cryptoCards } from './data';
import { FilterState, SortOption } from './types';
import CryptoCard from './components/CryptoCard';
import FilterBar from './components/FilterBar';
import ComparisonView from './components/ComparisonView';
import RecommendationWizard from './components/RecommendationWizard';
import { LayoutDashboard, ArrowRight, Copy, Sparkles, AlertTriangle, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>('featured');
  const [activeTab, setActiveTab] = useState<'discover' | 'compare'>('discover');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [showNoCardsMessage, setShowNoCardsMessage] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    if (typeof window.gtag === 'function') {
       window.gtag('event', 'page_view', {
          page_title: activeTab === 'discover' ? 'Discover Cards' : 'Comparison View',
          page_path: `/${activeTab}`,
          send_to: 'G-XXXXXXXXXX'
       });
    }
  }, [activeTab]);

  const handleTabChange = (tab: 'discover' | 'compare') => {
    if (tab === 'compare' && selectedCards.length === 0) {
      setShowNoCardsMessage(true);
      setMobileMenuOpen(false);
      return;
    }
    setShowNoCardsMessage(false);
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const handleCompareClick = () => {
    if (selectedCards.length === 0) {
      setShowNoCardsMessage(true);
      return;
    }
    setShowNoCardsMessage(false);
    setActiveTab('compare');
  };

  const handleGoToDiscover = () => {
    setShowNoCardsMessage(false);
    setActiveTab('discover');
  };

  useEffect(() => {
    if (selectedCards.length === 0 && activeTab === 'compare') {
      setActiveTab('discover');
    }
  }, [selectedCards.length, activeTab]);

  useEffect(() => {
    if (selectedCards.length > 0) {
      setShowNoCardsMessage(false);
    }
  }, [selectedCards.length]);

  const checkRegionMatch = (cardRegions: string, selectedRegion: string) => {
    if (!selectedRegion || selectedRegion === 'Global') return true;
    
    const cardReg = cardRegions.toLowerCase();
    const selReg = selectedRegion.toLowerCase();
    
    if (cardReg.includes(selReg)) return true;
    
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
       'united states': ['us', 'usa'],
       'usa': ['us', 'usa'],
    };

    if (mappings[selReg]) {
       if (['united states', 'usa'].includes(selReg)) {
          return mappings[selReg].some(r => cardReg.includes(r));
       }
       return mappings[selReg].some(r => cardReg.includes(r));
    }

    return false;
  };

  const filteredCards = useMemo(() => {
    return cryptoCards.filter(card => {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        card.name.toLowerCase().includes(searchLower) || 
        card.issuer.toLowerCase().includes(searchLower) ||
        card.perks.some(p => p.toLowerCase().includes(searchLower));

      const matchesNetwork = filters.network.length === 0 || filters.network.includes(card.network);
      const matchesCustody = filters.custody.length === 0 || filters.custody.includes(card.custody);
      const matchesCashback = typeof card.cashbackMax === 'number' 
        ? card.cashbackMax >= filters.minCashback 
        : filters.minCashback === 0;

      const matchesRegion = checkRegionMatch(card.regions, filters.region);
      const matchesKyc = filters.kyc === '' || card.kyc === filters.kyc;
      const matchesCurrency = filters.currency === '' || 
                              card.supportedCurrencies.includes(filters.currency) ||
                              card.supportedCurrencies.includes('Global');
      
      return matchesSearch && matchesNetwork && matchesCustody && matchesCashback && matchesRegion && matchesKyc && matchesCurrency;
    }).sort((a, b) => {
      if (sort === 'featured') {
         const rankA = a.rank || 999;
         const rankB = b.rank || 999;
         return rankA - rankB;
      }
      if (sort === 'cashbackHigh') {
        const aMax = typeof a.cashbackMax === 'number' ? a.cashbackMax : 0;
        const bMax = typeof b.cashbackMax === 'number' ? b.cashbackMax : 0;
        return bMax - aMax;
      }
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
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-black font-mono selection:bg-lime-400 selection:text-black">
      
      <RecommendationWizard 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
        onSelectCard={(id) => {
          setSelectedCards(prev => [...prev, id]);
        }} 
      />

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/80" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-0 left-0 w-72 h-full bg-black border-r-4 border-white p-6 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-4 border-white bg-black flex items-center justify-center">
                  <span className="text-white font-black text-lg">CA</span>
                </div>
                <span className="text-xl font-black tracking-tighter text-white uppercase">CryptoAgg</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 border-2 border-white text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-3 flex-1">
              <button 
                onClick={() => handleTabChange('discover')}
                className={`w-full flex items-center gap-3 px-4 py-4 text-sm font-black uppercase tracking-wider transition-all border-4 ${
                  activeTab === 'discover'
                    ? 'bg-white text-black border-white' 
                    : 'bg-black text-white border-white'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                Discover
              </button>
              
              <button 
                onClick={() => handleTabChange('compare')}
                className={`w-full flex items-center gap-3 px-4 py-4 text-sm font-black uppercase tracking-wider transition-all border-4 ${
                  activeTab === 'compare'
                    ? 'bg-white text-black border-white' 
                    : 'bg-black text-white border-white'
                }`}
              >
                <Copy className="w-5 h-5" />
                Compare
                {selectedCards.length > 0 && (
                  <span className="ml-auto text-xs font-black px-2 py-1 bg-lime-400 text-black border-2 border-lime-400">
                    {selectedCards.length}
                  </span>
                )}
              </button>

              <button 
                onClick={() => { setIsWizardOpen(true); setMobileMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-4 text-sm font-black uppercase tracking-wider text-black bg-lime-400 border-4 border-lime-400 mt-4"
              >
                <Sparkles className="w-5 h-5" />
                Find My Card
              </button>
            </nav>

            <div className="border-t-4 border-white pt-6 mt-6">
              <p className="text-xs text-white/60 font-mono uppercase">Crypto Cards Aggregator</p>
              <p className="text-xs text-white/40 font-mono mt-1">© 2026</p>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-black border-r-4 border-white p-6 z-20 shrink-0">
         <div className="flex items-center gap-3 mb-12 px-2">
            <div className="w-12 h-12 border-4 border-white bg-black flex items-center justify-center">
              <span className="text-white font-black text-xl">CA</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-white uppercase">CryptoAgg</span>
         </div>

         <nav className="space-y-2 flex-1">
            <button 
              onClick={() => handleTabChange('discover')}
              className={`w-full flex items-center gap-3 px-4 py-4 text-sm font-black uppercase tracking-wider transition-all border-4 ${
                activeTab === 'discover'
                  ? 'bg-white text-black border-white' 
                  : 'bg-black text-white border-white hover:bg-white hover:text-black'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Discover
            </button>
            
            <button 
              onClick={() => handleTabChange('compare')}
              className={`w-full flex items-center gap-3 px-4 py-4 text-sm font-black uppercase tracking-wider transition-all border-4 ${
                activeTab === 'compare'
                  ? 'bg-white text-black border-white' 
                  : 'bg-black text-white border-white hover:bg-white hover:text-black'
              }`}
            >
              <Copy className="w-5 h-5" />
              Compare
              {selectedCards.length > 0 && (
                <span className={`ml-auto text-xs font-black px-2 py-1 border-2 ${activeTab === 'compare' ? 'bg-black text-white border-black' : 'bg-lime-400 text-black border-lime-400'}`}>
                  {selectedCards.length}
                </span>
              )}
            </button>

            <button 
               onClick={() => setIsWizardOpen(true)}
               className="w-full flex items-center gap-3 px-4 py-4 text-sm font-black uppercase tracking-wider text-black bg-lime-400 border-4 border-lime-400 hover:bg-lime-300 transition-all mt-6"
            >
               <Sparkles className="w-5 h-5" />
               Find My Card
            </button>
         </nav>

         <div className="border-t-4 border-white pt-6 mt-6">
           <p className="text-xs text-white/60 font-mono uppercase">Crypto Cards Aggregator</p>
           <p className="text-xs text-white/40 font-mono mt-1">© 2026</p>
         </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-300">
        
        {/* No Cards Selected Message */}
        {showNoCardsMessage && (
          <div className="absolute inset-0 z-50 bg-black flex items-center justify-center p-4">
            <div className="border-4 border-white p-6 sm:p-12 max-w-lg text-center w-full">
              <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-lime-400 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-lime-400" />
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white uppercase mb-3 sm:mb-4">No Cards Selected</h2>
              <p className="text-white/70 font-mono mb-6 sm:mb-8 text-sm sm:text-lg">Please select the cards first.</p>
              <button 
                onClick={handleGoToDiscover}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-lime-400 text-black font-black uppercase tracking-wider border-4 border-lime-400 hover:bg-lime-300 transition-all flex items-center gap-3 justify-center mx-auto"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="text-sm sm:text-base">Discover Cards</span>
              </button>
            </div>
          </div>
        )}

        {/* Render Active View */}
        {activeTab === 'discover' ? (
          <>
            {/* Top Header - Mobile Responsive */}
            <header className="h-16 sm:h-20 md:h-24 shrink-0 flex items-center justify-between px-4 sm:px-6 md:px-8 bg-black border-b-4 border-white z-10">
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 border-2 border-white text-white mr-3"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight truncate">Explore Cards</h1>
                <p className="text-white/50 font-mono text-xs sm:text-sm mt-0.5 sm:mt-1">{filteredCards.length} cards</p>
              </div>
              
              {/* Mobile Find Card Button */}
              <button 
                onClick={() => setIsWizardOpen(true)}
                className="md:hidden p-2 bg-lime-400 text-black border-2 border-lime-400"
              >
                <Sparkles className="w-5 h-5" />
              </button>
            </header>

            {/* Scrollable Content */}
            <main className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 pb-32 sm:pb-36 bg-black">
              <FilterBar 
                filters={filters} 
                sort={sort} 
                onFilterChange={setFilters} 
                onSortChange={setSort}
                resultsCount={filteredCards.length}
              />

              {/* Cards Grid - Mobile Responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredCards.length > 0 ? filteredCards.map(card => (
                      <CryptoCard 
                        key={card.id}
                        card={card}
                        selected={selectedCards.includes(card.id)}
                        onSelect={handleSelect}
                      />
                  )) : (
                     <div className="col-span-full py-12 sm:py-20 text-center border-4 border-white/20">
                        <p className="text-white/60 font-mono uppercase text-sm sm:text-base">No cards match your filters</p>
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
                           className="mt-4 text-lime-400 font-black uppercase hover:underline text-sm sm:text-base"
                        >
                           Clear all filters
                        </button>
                     </div>
                  )}
              </div>
            </main>

            {/* Floating Action Bar - Mobile Responsive */}
            {selectedCards.length > 0 && (
              <div className="absolute bottom-4 sm:bottom-8 left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-30">
                <div className="flex items-center gap-2 sm:gap-4 p-2 sm:pl-6 sm:pr-2 bg-black border-4 border-white">
                    <div className="flex flex-col flex-1 sm:flex-initial min-w-0">
                      <span className="text-xs sm:text-sm font-black text-white uppercase truncate">{selectedCards.length} selected</span>
                      <span className="text-[10px] sm:text-xs text-white/50 font-mono hidden sm:block">
                          Ready to compare
                      </span>
                    </div>
                    
                    <div className="hidden sm:block h-10 w-1 bg-white/30"></div>
                    
                    <div className="hidden sm:flex -space-x-2 px-2">
                      {selectedCardsData.slice(0, 3).map(c => (
                        <img key={c.id} src={c.logo} className="w-8 sm:w-10 h-8 sm:h-10 border-2 border-white bg-white" alt={c.name} />
                      ))}
                      {selectedCardsData.length > 3 && (
                        <div className="w-8 sm:w-10 h-8 sm:h-10 border-2 border-white bg-black text-white flex items-center justify-center text-[10px] sm:text-xs font-black">
                          +{selectedCardsData.length - 3}
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={handleCompareClick}
                      className="h-10 sm:h-12 px-4 sm:px-6 bg-lime-400 hover:bg-lime-300 text-black font-black uppercase flex items-center gap-2 transition-all border-4 border-lime-400 text-xs sm:text-sm"
                    >
                      Compare <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
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

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t-4 border-white flex z-40">
          <button 
            onClick={() => handleTabChange('discover')}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 ${
              activeTab === 'discover' ? 'bg-white text-black' : 'text-white'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase">Discover</span>
          </button>
          <button 
            onClick={() => handleTabChange('compare')}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 relative ${
              activeTab === 'compare' ? 'bg-white text-black' : 'text-white'
            }`}
          >
            <Copy className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase">Compare</span>
            {selectedCards.length > 0 && (
              <span className="absolute top-1 right-1/4 w-5 h-5 bg-lime-400 text-black text-[10px] font-black flex items-center justify-center">
                {selectedCards.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setIsWizardOpen(true)}
            className="flex-1 flex flex-col items-center justify-center py-3 gap-1 bg-lime-400 text-black"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase">Wizard</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
