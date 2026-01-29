import React from 'react';
import { LLMModel } from '../types';
import { 
  X, Check, Minus, ArrowLeft, Building, Target, Layers, 
  DollarSign, Code, ExternalLink, Sparkles, Brain 
} from 'lucide-react';

interface Props {
  llms: LLMModel[];
  onRemove: (id: string) => void;
  onBack: () => void;
}

const LLMComparisonView: React.FC<Props> = ({ llms, onRemove, onBack }) => {
  // Define the rows for comparison
  const rows = [
    { label: 'Provider', key: 'provider', icon: Building },
    { label: 'Primary Strength', key: 'primaryStrength', icon: Target },
    { label: 'Context Window', key: 'contextWindow', icon: Layers },
    { label: 'Pricing Model', key: 'pricingModel', icon: DollarSign },
    { label: 'Pricing Details', key: 'pricingDetails' },
    { label: 'API Available', key: 'apiAvailable', type: 'boolean', icon: Code },
  ];

  if (llms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
          <Brain className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">No LLMs selected</h3>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">Select LLMs from the grid to unlock detailed side-by-side comparisons.</p>
        <button 
          onClick={onBack}
          className="px-8 py-3 bg-violet-500 text-white font-bold rounded-2xl hover:bg-violet-600 transition-all hover:scale-105 shadow-lg shadow-violet-500/20"
        >
          Go to LLM Grid
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F8F9FB] dark:bg-[#0C0E12]">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 bg-white dark:bg-[#151F2E] border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Compare LLMs</h2>
            <p className="text-sm text-slate-500">Analyzing {llms.length} selected AI models side-by-side</p>
          </div>
        </div>
      </div>

      {/* Comparison Table Container */}
      <div className="flex-1 overflow-auto custom-scrollbar p-8">
        <div className="bg-white dark:bg-[#151F2E] rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr>
                  <th className="p-6 w-56 bg-slate-50 dark:bg-[#1A2332] border-b border-r border-slate-100 dark:border-slate-800 sticky left-0 z-10">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">LLM Overview</span>
                  </th>
                  {llms.map(llm => (
                    <th key={llm.id} className="p-6 min-w-[220px] border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-[#151F2E] align-top relative group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-4">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${llm.gradient} p-1 shadow-lg`}>
                            <img 
                              src={llm.logoUrl} 
                              alt={llm.name} 
                              className="w-full h-full object-cover rounded-xl bg-white/10"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${llm.name}&background=random`
                              }}
                            />
                          </div>
                          <button 
                            onClick={() => onRemove(llm.id)}
                            className="absolute -top-2 -right-2 bg-white dark:bg-slate-800 text-slate-400 hover:text-red-500 rounded-full p-1 shadow-md border border-slate-100 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{llm.name}</h3>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">{llm.provider}</span>
                        
                        <a 
                          href={llm.officialLink}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1"
                        >
                          Visit Site <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {rows.map((row, index) => (
                  <tr key={row.key} className={`group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30 ${index % 2 === 0 ? 'bg-white dark:bg-[#151F2E]' : 'bg-slate-50/50 dark:bg-[#1A2332]/30'}`}>
                    <td className="p-5 font-medium text-slate-500 sticky left-0 bg-inherit border-r border-slate-100 dark:border-slate-800 z-10 flex items-center gap-2">
                      {row.icon && <row.icon className="w-4 h-4 text-slate-400" />}
                      {row.label}
                    </td>
                    {llms.map(llm => {
                      const value = (llm as any)[row.key];
                      
                      let displayContent;
                      if (row.type === 'boolean') {
                        displayContent = value ? (
                          <div className="flex justify-center">
                            <div className="w-6 h-6 rounded-full bg-violet-400/20 flex items-center justify-center">
                              <Check className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <Minus className="w-4 h-4 text-slate-300" />
                          </div>
                        );
                      } else {
                        displayContent = (
                          <span className={`font-semibold ${row.key === 'primaryStrength' ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                            {value}
                          </span>
                        );
                      }

                      return (
                        <td key={`${llm.id}-${row.key}`} className="p-5 text-center border-slate-100 dark:border-slate-800/50">
                          {displayContent}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                
                {/* Secondary Strengths Row */}
                <tr className="bg-white dark:bg-[#151F2E] border-t border-slate-100 dark:border-slate-800">
                  <td className="p-6 font-medium text-slate-500 sticky left-0 bg-inherit border-r border-slate-100 dark:border-slate-800 z-10 align-top">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-slate-400" />
                      Other Strengths
                    </div>
                  </td>
                  {llms.map(llm => (
                    <td key={`${llm.id}-strengths`} className="p-6 align-top">
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {llm.secondaryStrengths.map((strength, i) => (
                          <span 
                            key={i} 
                            className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-full font-medium border border-slate-200 dark:border-slate-700/50"
                          >
                            {strength}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Special Features Row */}
                <tr className="bg-slate-50/50 dark:bg-[#1A2332]/30">
                  <td className="p-6 font-medium text-slate-500 sticky left-0 bg-inherit border-r border-slate-100 dark:border-slate-800 z-10 align-top">
                    Special Features
                  </td>
                  {llms.map(llm => (
                    <td key={`${llm.id}-features`} className="p-6 align-top">
                      <ul className="space-y-2 text-left inline-block">
                        {llm.specialFeatures.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400 group/item">
                            <div className="w-5 h-5 rounded-full bg-violet-400/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-violet-400/20 transition-colors">
                              <Check className="w-3 h-3 text-violet-600 dark:text-violet-400" />
                            </div>
                            <span className="text-xs font-medium leading-5">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Best For Row */}
                <tr className="bg-white dark:bg-[#151F2E] border-t border-slate-100 dark:border-slate-800">
                  <td className="p-6 font-medium text-slate-500 sticky left-0 bg-inherit border-r border-slate-100 dark:border-slate-800 z-10 align-top">
                    Best For
                  </td>
                  {llms.map(llm => (
                    <td key={`${llm.id}-bestfor`} className="p-6 align-top">
                      <ul className="space-y-2 text-left inline-block">
                        {llm.bestFor.map((useCase, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                            <span className="text-violet-500 font-bold">•</span>
                            <span className="text-xs font-medium leading-5">{useCase}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLMComparisonView;
