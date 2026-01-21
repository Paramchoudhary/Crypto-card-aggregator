import React, { useState, useMemo, useEffect } from 'react';
import { privacyProtocols } from '../privacyProtocols';
import { PrivacyFilterState, PrivacySortOption } from '../privacyTypes';
import ProtocolCard from './ProtocolCard';
import ProtocolComparisonView from './ProtocolComparisonView';
import { Shield, ArrowRight, Search, Filter, ChevronDown, Lock, Eye, EyeOff, Zap, Grid, List, SlidersHorizontal, X } from 'lucide-react';

interface Props {
  onBack: () => void;
  darkMode: boolean;
}

const PrivacyPage: React.FC<Props> = ({ onBack, darkMode }) => {
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
    <div className="flex flex-col h-full bg-[#0a0e17] overflow-hidden">
      {/* Cyberpunk Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 h-auto shrink-0 px-8 pt-6 pb-4 bg-slate-900/50 backdrop-blur-sm border-b border-cyan-500/10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/30 blur-xl rounded-full"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                Privacy Protocols
              </h1>
              <p className="text-sm text-slate-400 mt-0.5">Explore blockchain privacy technologies</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative">
              <select 
                value={sort}
                onChange={(e) => setSort(e.target.value as PrivacySortOption)}
                className="appearance-none bg-slate-800/50 border border-cyan-500/20 rounded-xl px-4 py-2.5 pr-10 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 cursor-pointer"
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
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${showFilters ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400' : 'bg-slate-800/50 border-cyan-500/20 text-slate-300 hover:border-cyan-500/40'}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-cyan-500 text-black text-xs font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            placeholder="Search protocols, tech, or features..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full bg-slate-800/50 border border-cyan-500/20 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-transparent"
          />
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-slate-800/30 rounded-xl border border-cyan-500/10 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-wrap gap-6">
              {/* Anonymity Set Filters */}
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Anonymity Set</span>
                <div className="flex gap-2">
                  {['High', 'Medium', 'Low'].map(level => (
                    <button 
                      key={level}
                      onClick={() => toggleFilter('anonymitySet', level)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        filters.anonymitySet.includes(level) 
                          ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400' 
                          : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-cyan-500/30'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Default Privacy Filters */}
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Default Privacy</span>
                <div className="flex gap-2">
                  {['Mandatory', 'Opt-in'].map(type => (
                    <button 
                      key={type}
                      onClick={() => toggleFilter('defaultPrivacy', type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                        filters.defaultPrivacy.includes(type) 
                          ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400' 
                          : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-cyan-500/30'
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
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-slate-400">
            Showing <span className="text-cyan-400 font-semibold">{filteredProtocols.length}</span> protocols
          </span>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="relative z-10 flex-1 overflow-y-auto px-8 pb-32 pt-6 custom-scrollbar">
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
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full"></div>
                <div className="relative w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center border border-cyan-500/20">
                  <Search className="w-8 h-8 text-slate-500" />
                </div>
              </div>
              <p className="text-slate-400">No protocols match your filters.</p>
              <button 
                onClick={clearFilters}
                className="mt-4 text-cyan-400 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Bar */}
      {selectedProtocols.length > 0 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="flex items-center gap-4 p-2 pl-4 pr-2 bg-slate-900/95 rounded-full shadow-2xl shadow-cyan-500/10 ring-1 ring-cyan-500/30 backdrop-blur-md">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">{selectedProtocols.length} protocols selected</span>
              <span className="text-[10px] text-slate-400">
                Ready to compare
              </span>
            </div>
            
            <div className="h-8 w-px bg-cyan-500/20"></div>
            
            <div className="flex -space-x-2 px-1">
              {selectedProtocolsData.slice(0, 4).map(p => (
                <div key={p.id} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                  <img 
                    src={p.logo} 
                    className="w-full h-full object-contain" 
                    alt={p.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${p.ticker}&background=0f172a&color=22d3ee`
                    }}
                  />
                </div>
              ))}
              {selectedProtocolsData.length > 4 && (
                <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold">
                  +{selectedProtocolsData.length - 4}
                </div>
              )}
            </div>

            <button 
              onClick={() => setActiveView('compare')}
              className="h-10 px-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
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
