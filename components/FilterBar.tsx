import React from 'react';
import { FilterState, SortOption } from '../types';
import { Search, ChevronDown, X, Globe, Lock, Banknote } from 'lucide-react';

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

  const custodyOptions = [
    { label: 'Self-Custody (Non-Custodial)', values: ['Self-Custody', 'Non-Custodial'] }
  ];

  const isCustodyActive = (values: string[]) => values.some(value => filters.custody.includes(value));

  const toggleCustodyGroup = (values: string[]) => {
    const hasAny = isCustodyActive(values);
    const updated = hasAny
      ? filters.custody.filter(item => !values.includes(item))
      : [...filters.custody, ...values.filter(value => !filters.custody.includes(value))];
    onFilterChange({ ...filters, custody: updated });
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
                 <option value="featured">✨ All</option>
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

      {/* Primary Filters Row */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        
        {/* Region Selector - Expanded with Top 20+ Countries & Flags */}
        <div className="relative group">
           <div className="flex items-center gap-2 bg-white dark:bg-[#151F2E] px-4 py-2.5 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors cursor-pointer shadow-sm">
              <Globe className="w-4 h-4 text-slate-400" />
              <select 
                value={filters.region}
                onChange={(e) => onFilterChange({...filters, region: e.target.value})}
                className="bg-transparent text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer w-[130px]"
              >
                <option value="">All Regions</option>
                <optgroup label="Americas">
                    <option value="United States">🇺🇸 United States</option>
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="Brazil">🇧🇷 Brazil</option>
                    <option value="Argentina">🇦🇷 Argentina</option>
                    <option value="Mexico">🇲🇽 Mexico</option>
                    <option value="LATAM">🌎 Latin America</option>
                </optgroup>
                <optgroup label="Europe">
                    <option value="United Kingdom">🇬🇧 United Kingdom</option>
                    <option value="Germany">🇩🇪 Germany</option>
                    <option value="France">🇫🇷 France</option>
                    <option value="Spain">🇪🇸 Spain</option>
                    <option value="Italy">🇮🇹 Italy</option>
                    <option value="Netherlands">🇳🇱 Netherlands</option>
                    <option value="Switzerland">🇨🇭 Switzerland</option>
                    <option value="EEA">🇪🇺 Europe (EEA)</option>
                </optgroup>
                <optgroup label="Asia Pacific">
                    <option value="India">🇮🇳 India</option>
                    <option value="Japan">🇯🇵 Japan</option>
                    <option value="South Korea">🇰🇷 South Korea</option>
                    <option value="Australia">🇦🇺 Australia</option>
                    <option value="Singapore">🇸🇬 Singapore</option>
                    <option value="Vietnam">🇻🇳 Vietnam</option>
                    <option value="Indonesia">🇮🇩 Indonesia</option>
                    <option value="Philippines">🇵🇭 Philippines</option>
                    <option value="Thailand">🇹🇭 Thailand</option>
                    <option value="China">🇨🇳 China</option>
                    <option value="APAC">🌏 Asia Pacific</option>
                </optgroup>
                <optgroup label="Africa/ME">
                    <option value="Nigeria">🇳🇬 Nigeria</option>
                    <option value="South Africa">🇿🇦 South Africa</option>
                    <option value="UAE">🇦🇪 UAE</option>
                    <option value="Saudi Arabia">🇸🇦 Saudi Arabia</option>
                    <option value="Turkey">🇹🇷 Turkey</option>
                </optgroup>
                <option value="Global">🌍 Global / Worldwide</option>
              </select>
           </div>
        </div>

        {/* Currency Selector */}
        <div className="relative group">
           <div className="flex items-center gap-2 bg-white dark:bg-[#151F2E] px-4 py-2.5 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors cursor-pointer shadow-sm">
              <Banknote className="w-4 h-4 text-slate-400" />
              <select 
                value={filters.currency}
                onChange={(e) => onFilterChange({...filters, currency: e.target.value})}
                className="bg-transparent text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer w-[110px]"
              >
                <option value="">Any Currency</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
                <option value="BRL">BRL (R$)</option>
                <option value="NGN">NGN (₦)</option>
                <option value="JPY">JPY (¥)</option>
                <option value="KRW">KRW (₩)</option>
              </select>
           </div>
        </div>

        {/* KYC Selector */}
        <div className="relative group">
           <div className="flex items-center gap-2 bg-white dark:bg-[#151F2E] px-4 py-2.5 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors cursor-pointer shadow-sm">
              <Lock className="w-4 h-4 text-slate-400" />
              <select 
                value={filters.kyc}
                onChange={(e) => onFilterChange({...filters, kyc: e.target.value})}
                className="bg-transparent text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer w-[120px]"
              >
                <option value="">Any Privacy</option>
                <option value="Required">KYC Required</option>
                <option value="Light">Light KYC</option>
                <option value="None">No KYC</option>
              </select>
           </div>
        </div>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

        {/* Quick Toggles */}
        {custodyOptions.map(({ label, values }) => (
          <button
            key={label}
            onClick={() => toggleCustodyGroup(values)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
              isCustodyActive(values)
                ? 'bg-lime-400 border-lime-400 text-black'
                : 'bg-white dark:bg-[#151F2E] border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {label}
          </button>
        ))}

        {/* Clear All */}
        {(filters.region || filters.kyc || filters.currency || filters.custody.length > 0 || filters.search) && (
            <button 
              onClick={() => onFilterChange({ 
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
              className="ml-auto flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-3 py-2"
            >
                <X className="w-4 h-4" />
                Clear
            </button>
        )}

        <div className="basis-full text-[11px] text-slate-400">
          Note: "Non-custodial" and "self-custody" are treated the same here - you control the private keys.
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
