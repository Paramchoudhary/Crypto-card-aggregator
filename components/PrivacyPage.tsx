import React, { useState, useMemo, useEffect } from 'react';
import { privacyProtocols } from '../privacyProtocols';
import { PrivacyFilterState, PrivacySortOption } from '../privacyTypes';
import ProtocolCard from './ProtocolCard';
import ProtocolComparisonView from './ProtocolComparisonView';
import { Shield, ArrowRight, Search, ChevronDown, Eye, EyeOff, SlidersHorizontal, Sun, Moon } from 'lucide-react';

interface Props {
  onBack: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const PrivacyPage: React.FC<Props> = ({ onBack, darkMode, onToggleDarkMode }) => {
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<'discover' | 'compare'>('discover');
  const [sort, setSort] = useState<PrivacySortOption>('featured');
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState<PrivacyFilterState>({
    search: '',
    privacyTech: [],
    anonymitySet: [],
    defaultPrivacy: []
  });

  // Auto-switch to discover if no protocols selected
  useEffect(() => {
    if (selectedProtocols.length === 0 && activeView === 'compare') {
      setActiveView('discover');
    }
  }, [selectedProtocols.length, activeView]);

  // Filtered and sorted protocols
  const filteredProtocols = useMemo(() => {
    return privacyProtocols.filter(protocol => {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        protocol.name.toLowerCase().includes(searchLower) ||
        protocol.ticker.toLowerCase().includes(searchLower) ||
        protocol.privacyTech.toLowerCase().includes(searchLower) ||
        protocol.tagline.toLowerCase().includes(searchLower);

      const matchesAnonymity = filters.anonymitySet.length === 0 || 
        filters.anonymitySet.includes(protocol.anonymitySet);
      
      const matchesDefaultPrivacy = filters.defaultPrivacy.length === 0 || 
        filters.defaultPrivacy.includes(protocol.defaultPrivacy);

      return matchesSearch && matchesAnonymity && matchesDefaultPrivacy;
    }).sort((a, b) => {
      if (sort === 'featured') return 0;
      if (sort === 'nameAZ') return a.name.localeCompare(b.name);
      if (sort === 'launchYear') return b.launchYear - a.launchYear;
      if (sort === 'anonymityHigh') {
        const order = { High: 0, Medium: 1, Low: 2 };
        return order[a.anonymitySet] - order[b.anonymitySet];
      }
      return 0;
    });
  }, [filters, sort]);

  const handleSelect = (id: string) => {
    if (selectedProtocols.includes(id)) {
      setSelectedProtocols(selectedProtocols.filter(p => p !== id));
    } else {
      if (selectedProtocols.length >= 6) {
        alert("You can select up to 6 protocols for comparison.");
        return;
      }
      setSelectedProtocols([...selectedProtocols, id]);
    }
  };

  const selectedProtocolsData = privacyProtocols.filter(p => selectedProtocols.includes(p.id));

  // Filter toggle helpers
  const toggleFilter = (category: keyof PrivacyFilterState, value: string) => {
    const current = filters[category] as string[];
    if (current.includes(value)) {
      setFilters({ ...filters, [category]: current.filter(v => v !== value) });
    } else {
      setFilters({ ...filters, [category]: [...current, value] });
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      privacyTech: [],
      anonymitySet: [],
      defaultPrivacy: []
    });
  };

  const activeFilterCount = filters.anonymitySet.length + filters.defaultPrivacy.length;

  if (activeView === 'compare') {
    return (
      <ProtocolComparisonView 
        protocols={selectedProtocolsData}
        onRemove={handleSelect}
        onBack={() => setActiveView('discover')}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F8F9FB] dark:bg-[#0C0E12] overflow-hidden">
      {/* Header - Same as Cards */}
      <header className="h-20 shrink-0 flex items-center justify-between px-8 bg-[#F8F9FB] dark:bg-[#0C0E12] z-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Privacy Protocols</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleDarkMode}
            className="w-10 h-10 rounded-full bg-white dark:bg-[#151F2E] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Filter Bar - Same style as Cards */}
      <div className="px-8 pb-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search protocols..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full bg-white dark:bg-[#151F2E] border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select 
              value={sort}
              onChange={(e) => setSort(e.target.value as PrivacySortOption)}
              className="appearance-none bg-white dark:bg-[#151F2E] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 pr-10 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-lime-400 cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="nameAZ">Name A-Z</option>
              <option value="launchYear">Newest First</option>
              <option value="anonymityHigh">Highest Anonymity</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          
          {/* Filter Toggle */}
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${showFilters ? 'bg-lime-400 border-lime-400 text-black' : 'bg-white dark:bg-[#151F2E] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-lime-400'}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${showFilters ? 'bg-black/20 text-black' : 'bg-lime-400 text-black'}`}>
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Results Count */}
          <span className="text-sm text-slate-500 ml-auto">
            {filteredProtocols.length} protocols
          </span>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white dark:bg-[#151F2E] rounded-xl border border-slate-200 dark:border-slate-800 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-wrap gap-6">
              {/* Anonymity Set Filters */}
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Anonymity Set</span>
                <div className="flex gap-2">
                  {['High', 'Medium', 'Low'].map(level => (
                    <button 
                      key={level}
                      onClick={() => toggleFilter('anonymitySet', level)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        filters.anonymitySet.includes(level) 
                          ? 'bg-lime-400 border-lime-400 text-black' 
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-lime-400'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Default Privacy Filters */}
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Default Privacy</span>
                <div className="flex gap-2">
                  {['Mandatory', 'Opt-in'].map(type => (
                    <button 
                      key={type}
                      onClick={() => toggleFilter('defaultPrivacy', type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                        filters.defaultPrivacy.includes(type) 
                          ? 'bg-lime-400 border-lime-400 text-black' 
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-lime-400'
                      }`}
                    >
                      {type === 'Mandatory' ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {activeFilterCount > 0 && (
                <div className="flex items-end">
                  <button 
                    onClick={clearFilters}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto px-8 pb-32 custom-scrollbar">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
          {filteredProtocols.length > 0 ? filteredProtocols.map(protocol => (
            <ProtocolCard 
              key={protocol.id}
              protocol={protocol}
              selected={selectedProtocols.includes(protocol.id)}
              onSelect={handleSelect}
            />
          )) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-500">No protocols match your specific filters.</p>
              <button 
                onClick={clearFilters}
                className="mt-4 text-lime-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Bar - Same as Cards */}
      {selectedProtocols.length > 0 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="flex items-center gap-4 p-2 pl-4 pr-2 bg-slate-900 dark:bg-white rounded-full shadow-2xl shadow-slate-900/20 ring-1 ring-white/10 backdrop-blur-md">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white dark:text-black">{selectedProtocols.length} protocols selected</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                Ready to compare
              </span>
            </div>
            
            <div className="h-8 w-px bg-white/20 dark:bg-black/10"></div>
            
            <div className="flex -space-x-2 px-1">
              {selectedProtocolsData.slice(0, 4).map(p => (
                <div key={p.id} className="w-8 h-8 rounded-full border-2 border-slate-900 dark:border-white bg-white overflow-hidden">
                  <img 
                    src={p.logo} 
                    className="w-full h-full object-contain" 
                    alt={p.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${p.ticker}&background=random`
                    }}
                  />
                </div>
              ))}
              {selectedProtocolsData.length > 4 && (
                <div className="w-8 h-8 rounded-full border-2 border-slate-900 dark:border-white bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
                  +{selectedProtocolsData.length - 4}
                </div>
              )}
            </div>

            <button 
              onClick={() => setActiveView('compare')}
              className="h-10 px-5 rounded-full bg-lime-400 hover:bg-lime-500 text-black font-bold flex items-center gap-2 transition-all hover:scale-105"
            >
              Compare <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyPage;
