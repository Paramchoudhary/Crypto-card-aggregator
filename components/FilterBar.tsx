import React from 'react';
import { FilterState, SortOption } from '../types';
import { Search, ChevronDown, X } from 'lucide-react';

interface Props {
  filters: FilterState;
  sort: SortOption;
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sort: SortOption) => void;
  resultsCount: number;
}

const FilterBar: React.FC<Props> = ({ filters, sort, onFilterChange, onSortChange, resultsCount }) => {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const toggleFilter = (category: keyof FilterState, value: string) => {
    const current = filters[category] as string[];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    onFilterChange({ ...filters, [category]: updated });
  };

  return (
    <div className="w-full mb-8">
      {/* Search & Sort Row */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
          <div className="relative w-full md:w-[480px]">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search by issuer, perk, or network..."
              className="block w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#151F2E] border-none text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-lime-400/50 text-sm font-medium shadow-sm transition-shadow"
              value={filters.search}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative">
               <select 
                  value={sort}
                  onChange={(e) => onSortChange(e.target.value as SortOption)}
                  className="appearance-none bg-white dark:bg-[#151F2E] text-slate-700 dark:text-slate-200 py-3.5 pl-5 pr-10 rounded-2xl text-sm font-semibold focus:outline-none cursor-pointer shadow-sm min-w-[180px]"
               >
                 <option value="cashbackHigh">Highest Cashback</option>
                 <option value="nameAZ">Alphabetical</option>
                 <option value="newest">Newest Added</option>
               </select>
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                 <ChevronDown className="h-4 w-4" />
               </div>
             </div>
          </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-slate-400 mr-2">Filters:</span>
            
            {/* Custody Filter */}
            {['Non-Custodial', 'Self-Custody', 'Custodial'].map(type => (
               <button
                  key={type}
                  onClick={() => toggleFilter('custody', type)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                    filters.custody.includes(type)
                      ? 'bg-lime-400 border-lime-400 text-black'
                      : 'bg-white dark:bg-[#151F2E] border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
               >
                  {type}
               </button>
            ))}

            <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-2"></div>

            {/* Network Filter */}
            {['Visa', 'Mastercard'].map(net => (
               <button
                  key={net}
                  onClick={() => toggleFilter('network', net)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                    filters.network.includes(net)
                      ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-black'
                      : 'bg-white dark:bg-[#151F2E] border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
               >
                  {net}
               </button>
            ))}

             {/* Clear All */}
             {(filters.custody.length > 0 || filters.network.length > 0 || filters.search) && (
                <button 
                  onClick={() => onFilterChange({ search: '', cardType: [], network: [], custody: [], minCashback: 0, annualFee: 'all', fxFee: 'all' })}
                  className="ml-auto flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-3 py-2"
                >
                    <X className="w-4 h-4" />
                    Clear
                </button>
             )}
      </div>
    </div>
  );
};

export default FilterBar;