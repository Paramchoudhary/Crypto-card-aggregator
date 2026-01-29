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
    <div className="w-full mb-8 py-6">
      {/* Search & Sort Row - Brutalist */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
          <div className="relative w-full md:w-[480px]">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white/50" />
            </div>
            <input
              type="text"
              placeholder="SEARCH BY ISSUER, PERK, OR NETWORK..."
              className="block w-full pl-12 pr-4 py-4 bg-black border-4 border-white text-white placeholder-white/40 focus:outline-none focus:border-lime-400 text-sm font-mono uppercase tracking-wider transition-colors"
              value={filters.search}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative">
               <select 
                  value={sort}
                  onChange={(e) => onSortChange(e.target.value as SortOption)}
                  className="appearance-none bg-black text-white py-4 pl-5 pr-12 border-4 border-white text-sm font-black uppercase tracking-wider focus:outline-none focus:border-lime-400 cursor-pointer min-w-[200px] transition-colors"
               >
                 <option value="featured">★ ALL CARDS</option>
                 <option value="cashbackHigh">HIGHEST CASHBACK</option>
                 <option value="nameAZ">ALPHABETICAL</option>
                 <option value="newest">NEWEST ADDED</option>
               </select>
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
                 <ChevronDown className="h-5 w-5" />
               </div>
             </div>
          </div>
      </div>

      {/* Primary Filters Row - Brutalist */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        
        {/* Region Selector */}
        <div className="relative">
           <div className="flex items-center gap-2 bg-black px-4 py-3 border-4 border-white hover:border-lime-400 transition-colors cursor-pointer">
              <Globe className="w-4 h-4 text-lime-400" />
              <select 
                value={filters.region}
                onChange={(e) => onFilterChange({...filters, region: e.target.value})}
                className="bg-transparent text-sm font-black text-white focus:outline-none cursor-pointer w-[140px] uppercase"
              >
                <option value="">ALL REGIONS</option>
                <optgroup label="Americas">
                    <option value="United States">🇺🇸 USA</option>
                    <option value="Canada">🇨🇦 CANADA</option>
                    <option value="Brazil">🇧🇷 BRAZIL</option>
                    <option value="Argentina">🇦🇷 ARGENTINA</option>
                    <option value="Mexico">🇲🇽 MEXICO</option>
                    <option value="LATAM">🌎 LATAM</option>
                </optgroup>
                <optgroup label="Europe">
                    <option value="United Kingdom">🇬🇧 UK</option>
                    <option value="Germany">🇩🇪 GERMANY</option>
                    <option value="France">🇫🇷 FRANCE</option>
                    <option value="Spain">🇪🇸 SPAIN</option>
                    <option value="Italy">🇮🇹 ITALY</option>
                    <option value="Netherlands">🇳🇱 NETHERLANDS</option>
                    <option value="Switzerland">🇨🇭 SWITZERLAND</option>
                    <option value="EEA">🇪🇺 EUROPE (EEA)</option>
                </optgroup>
                <optgroup label="Asia Pacific">
                    <option value="India">🇮🇳 INDIA</option>
                    <option value="Japan">🇯🇵 JAPAN</option>
                    <option value="South Korea">🇰🇷 S. KOREA</option>
                    <option value="Australia">🇦🇺 AUSTRALIA</option>
                    <option value="Singapore">🇸🇬 SINGAPORE</option>
                    <option value="Vietnam">🇻🇳 VIETNAM</option>
                    <option value="Indonesia">🇮🇩 INDONESIA</option>
                    <option value="Philippines">🇵🇭 PHILIPPINES</option>
                    <option value="Thailand">🇹🇭 THAILAND</option>
                    <option value="China">🇨🇳 CHINA</option>
                    <option value="APAC">🌏 ASIA PACIFIC</option>
                </optgroup>
                <optgroup label="Africa/ME">
                    <option value="Nigeria">🇳🇬 NIGERIA</option>
                    <option value="South Africa">🇿🇦 S. AFRICA</option>
                    <option value="UAE">🇦🇪 UAE</option>
                    <option value="Saudi Arabia">🇸🇦 SAUDI ARABIA</option>
                    <option value="Turkey">🇹🇷 TURKEY</option>
                </optgroup>
                <option value="Global">🌍 GLOBAL</option>
              </select>
           </div>
        </div>

        {/* Currency Selector */}
        <div className="relative">
           <div className="flex items-center gap-2 bg-black px-4 py-3 border-4 border-white hover:border-lime-400 transition-colors cursor-pointer">
              <Banknote className="w-4 h-4 text-lime-400" />
              <select 
                value={filters.currency}
                onChange={(e) => onFilterChange({...filters, currency: e.target.value})}
                className="bg-transparent text-sm font-black text-white focus:outline-none cursor-pointer w-[120px] uppercase"
              >
                <option value="">ANY CURRENCY</option>
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
        <div className="relative">
           <div className="flex items-center gap-2 bg-black px-4 py-3 border-4 border-white hover:border-lime-400 transition-colors cursor-pointer">
              <Lock className="w-4 h-4 text-lime-400" />
              <select 
                value={filters.kyc}
                onChange={(e) => onFilterChange({...filters, kyc: e.target.value})}
                className="bg-transparent text-sm font-black text-white focus:outline-none cursor-pointer w-[130px] uppercase"
              >
                <option value="">ANY PRIVACY</option>
                <option value="Required">KYC REQUIRED</option>
                <option value="Light">LIGHT KYC</option>
                <option value="None">NO KYC</option>
              </select>
           </div>
        </div>

        <div className="h-10 w-1 bg-white/30 mx-2"></div>

        {/* Quick Toggles - Brutalist */}
        {custodyOptions.map(({ label, values }) => (
          <button
            key={label}
            onClick={() => toggleCustodyGroup(values)}
            className={`px-4 py-3 text-xs font-black uppercase tracking-wider transition-all border-4 ${
              isCustodyActive(values)
                ? 'bg-lime-400 border-lime-400 text-black'
                : 'bg-black border-white text-white hover:bg-white hover:text-black'
            }`}
          >
            {label}
          </button>
        ))}

        {/* Clear All - Brutalist */}
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
              className="ml-auto flex items-center gap-2 text-sm font-black text-white hover:text-lime-400 px-4 py-3 border-4 border-white/50 hover:border-lime-400 transition-all uppercase"
            >
                <X className="w-4 h-4" />
                Clear
            </button>
        )}
      </div>

      <div className="text-[11px] text-white/40 font-mono uppercase border-t-2 border-white/20 pt-4 mt-4">
        Note: "Non-custodial" and "self-custody" are treated the same here - you control the private keys.
      </div>
    </div>
  );
};

export default FilterBar;
