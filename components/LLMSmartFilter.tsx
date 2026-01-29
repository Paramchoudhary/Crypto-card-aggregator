import React from 'react';
import { Search, Code, Zap, FileText, Image, Globe, Pen, X, Sparkles } from 'lucide-react';
import { userNeeds } from '../constants/llmData';

interface Props {
  selectedNeed: string | null;
  searchQuery: string;
  onNeedSelect: (needId: string | null) => void;
  onSearchChange: (query: string) => void;
  resultsCount: number;
}

// Map icon strings to components
const iconMap: Record<string, React.ElementType> = {
  Code,
  Zap,
  FileText,
  Image,
  Globe,
  Pen,
};

const LLMSmartFilter: React.FC<Props> = ({
  selectedNeed,
  searchQuery,
  onNeedSelect,
  onSearchChange,
  resultsCount,
}) => {
  return (
    <div className="w-full mb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Find My LLM</h3>
          <p className="text-xs text-slate-500">Select your primary need to find the best match</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search by name, provider, or feature..."
          className="block w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#151F2E] border-none text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-violet-400/50 text-sm font-medium shadow-sm transition-shadow"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button 
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Smart Filter Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {userNeeds.map((need) => {
          const IconComponent = iconMap[need.icon] || Globe;
          const isActive = selectedNeed === need.id;
          
          return (
            <button
              key={need.id}
              onClick={() => onNeedSelect(isActive ? null : need.id)}
              className={`group relative p-4 rounded-2xl transition-all duration-300 text-left overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/20 scale-[1.02]'
                  : 'bg-white dark:bg-[#151F2E] hover:bg-slate-50 dark:hover:bg-[#1A2332] border border-slate-100 dark:border-slate-800 hover:border-violet-200 dark:hover:border-violet-800'
              }`}
            >
              {/* Background glow for active state */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              )}
              
              <div className="relative z-10">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-violet-100 group-hover:text-violet-600 dark:group-hover:bg-violet-900/30 dark:group-hover:text-violet-400'
                }`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                
                <p className={`text-xs font-bold leading-tight line-clamp-2 ${
                  isActive ? 'text-white' : 'text-slate-700 dark:text-slate-300'
                }`}>
                  {need.label.replace('I need ', '').replace('I work with ', '')}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Filter Indicator & Results Count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {selectedNeed && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-100 dark:bg-violet-900/30 rounded-full">
              <span className="text-xs font-bold text-violet-700 dark:text-violet-300">
                Filtered: {userNeeds.find(n => n.id === selectedNeed)?.label}
              </span>
              <button 
                onClick={() => onNeedSelect(null)}
                className="w-4 h-4 rounded-full bg-violet-200 dark:bg-violet-800 flex items-center justify-center hover:bg-violet-300 dark:hover:bg-violet-700 transition-colors"
              >
                <X className="w-3 h-3 text-violet-600 dark:text-violet-300" />
              </button>
            </div>
          )}
        </div>
        
        <span className="text-sm text-slate-500">
          Showing <span className="font-bold text-slate-900 dark:text-white">{resultsCount}</span> LLMs
        </span>
      </div>
    </div>
  );
};

export default LLMSmartFilter;
