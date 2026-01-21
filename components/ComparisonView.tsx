import React from 'react';
import { CryptoCard } from '../types';
import { X, Check, Minus, ArrowLeft, Shield, Globe, Zap, CreditCard, Coins, Smartphone, Wallet, Landmark } from 'lucide-react';

interface Props {
  cards: CryptoCard[];
  onRemove: (id: string) => void;
  onBack: () => void;
}

const ComparisonView: React.FC<Props> = ({ cards, onRemove, onBack }) => {
  const formatCustodyLabel = (custody: string) => {
    if (custody === 'Self-Custody' || custody === 'Non-Custodial') {
      return 'Self-Custody (Non-Custodial)';
    }
    return custody;
  };

  // Define the rows for comparison
  const rows = [
    { label: 'Card Type', key: 'type', icon: CreditCard },
    { label: 'Network', key: 'network', icon: Globe },
    { label: 'Custody', key: 'custody', icon: Shield, format: (val: any) => formatCustodyLabel(val) },
    { label: 'Max Cashback', key: 'cashbackMax', format: (val: any) => typeof val === 'number' ? `${val}%` : (val || 'N/A') },
    { label: 'Annual Fee', key: 'annualFee' },
    { label: 'FX Fee', key: 'fxFee' },
    { label: 'Staking Req.', key: 'stakingRequired', icon: Landmark },
    { label: 'ATM Limit', key: 'atmLimit' },
    { label: 'Mobile Pay', key: 'mobilePay', type: 'boolean', icon: Smartphone },
    { label: 'Supported Assets', key: 'supportedAssets', icon: Wallet },
    { label: 'Metal Card', key: 'metal', type: 'boolean' },
    { label: 'Signup Bonus', key: 'signupBonus', icon: Coins },
    { label: 'Regions', key: 'regions' },
  ];

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
          <CreditCard className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">No cards selected</h3>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">Select up to 6 cards from the Discover tab to unlock detailed side-by-side comparisons.</p>
        <button 
          onClick={onBack}
          className="px-8 py-3 bg-lime-400 text-black font-bold rounded-2xl hover:bg-lime-500 transition-all hover:scale-105 shadow-lg shadow-lime-400/20"
        >
          Go to Discover
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
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Compare Cards</h2>
            <p className="text-sm text-slate-500">Analyzing {cards.length} selected options side-by-side</p>
          </div>
        </div>
      </div>

      {/* Comparison Table Container */}
      <div className="flex-1 overflow-auto custom-scrollbar p-8">
        <div className="bg-white dark:bg-[#151F2E] rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr>
                  <th className="p-6 w-64 bg-slate-50 dark:bg-[#1A2332] border-b border-r border-slate-100 dark:border-slate-800 sticky left-0 z-10">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Card Overview</span>
                  </th>
                  {cards.map(card => (
                    <th key={card.id} className="p-6 min-w-[240px] border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-[#151F2E] align-top relative group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-4">
                           <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-1 shadow-inner">
                              <img 
                                src={card.logo} 
                                alt={card.name} 
                                className="w-full h-full object-cover rounded-xl"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${card.issuer}&background=random`
                                }}
                              />
                           </div>
                           <button 
                            onClick={() => onRemove(card.id)}
                            className="absolute -top-2 -right-2 bg-white dark:bg-slate-800 text-slate-400 hover:text-red-500 rounded-full p-1 shadow-md border border-slate-100 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
                           >
                             <X className="w-3 h-3" />
                           </button>
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{card.name}</h3>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">{card.issuer}</span>
                        
                        <a 
                          href={card.officialLink}
                          className="mt-4 text-xs font-bold text-lime-600 dark:text-lime-400 hover:underline flex items-center gap-1"
                        >
                          Visit Site <Zap className="w-3 h-3" />
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
                    {cards.map(card => {
                      const value = (card as any)[row.key];
                      
                      let displayContent;
                      if (row.type === 'boolean') {
                        displayContent = value ? (
                          <div className="flex justify-center">
                            <div className="w-6 h-6 rounded-full bg-lime-400/20 flex items-center justify-center">
                              <Check className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                             <Minus className="w-4 h-4 text-slate-300" />
                          </div>
                        );
                      } else {
                        displayContent = (
                          <span className={`font-semibold ${row.key === 'cashbackMax' ? 'text-slate-900 dark:text-white text-base' : 'text-slate-700 dark:text-slate-300'}`}>
                            {row.format ? row.format(value) : value}
                          </span>
                        );
                      }

                      return (
                        <td key={`${card.id}-${row.key}`} className="p-5 text-center border-slate-100 dark:border-slate-800/50">
                          {displayContent}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                
                {/* Perks Section Row */}
                <tr className="bg-white dark:bg-[#151F2E] border-t border-slate-100 dark:border-slate-800">
                  <td className="p-6 font-medium text-slate-500 sticky left-0 bg-inherit border-r border-slate-100 dark:border-slate-800 z-10 align-top">
                     Key Features
                  </td>
                  {cards.map(card => (
                    <td key={`${card.id}-perks`} className="p-6 align-top">
                       <ul className="space-y-3 text-left inline-block">
                          {card.perks.map((perk, i) => (
                             <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400 group/item">
                                <div className="w-5 h-5 rounded-full bg-lime-400/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-lime-400/20 transition-colors">
                                    <Check className="w-3 h-3 text-lime-600 dark:text-lime-400" />
                                </div>
                                <span className="text-xs font-medium leading-5">{perk}</span>
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

export default ComparisonView;