import React from 'react';
import { CryptoCard } from '../types';
import { X, Check, CreditCard, Globe, ShieldCheck, Coins } from 'lucide-react';

interface Props {
  cards: CryptoCard[];
  onClose: () => void;
  onRemove: (id: string) => void;
}

const ComparisonModal: React.FC<Props> = ({ cards, onClose, onRemove }) => {
  if (cards.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative w-full max-w-7xl bg-white dark:bg-[#151F2E] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200 ring-1 ring-black/5 dark:ring-white/10">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-[#151F2E]">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Compare Cards</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Table Container */}
        <div className="overflow-auto flex-1 custom-scrollbar bg-white dark:bg-[#151F2E]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-6 min-w-[200px] sticky left-0 bg-white dark:bg-[#151F2E] z-10 border-b border-r border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Features</span>
                </th>
                {cards.map(card => (
                  <th key={card.id} className="p-6 min-w-[280px] border-b border-slate-100 dark:border-slate-800 align-top">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 p-1 overflow-hidden border border-slate-100 dark:border-slate-700">
                             <img src={card.logo} className="w-full h-full object-cover rounded-full" />
                        </div>
                        <button onClick={() => onRemove(card.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="font-bold text-lg text-slate-900 dark:text-white mb-1">{card.name}</div>
                    <div className="text-sm text-slate-500">{card.issuer}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm">
                
                {/* Cashback */}
                <tr>
                    <td className="p-6 font-medium text-slate-500 sticky left-0 bg-white dark:bg-[#151F2E] border-r border-slate-100 dark:border-slate-800 z-10">Cashback</td>
                    {cards.map(card => (
                        <td key={card.id} className="p-6 border-b border-slate-50 dark:border-slate-800/50">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-lime-400/20 text-lime-700 dark:text-lime-300">
                                Up to {card.cashbackMax}%
                            </span>
                        </td>
                    ))}
                </tr>

                {/* Network */}
                <tr>
                    <td className="p-6 font-medium text-slate-500 sticky left-0 bg-white dark:bg-[#151F2E] border-r border-slate-100 dark:border-slate-800 z-10">Network</td>
                    {cards.map(card => (
                        <td key={card.id} className="p-6 border-b border-slate-50 dark:border-slate-800/50 text-slate-700 dark:text-slate-300">
                             <div className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-slate-400" />
                                {card.network}
                             </div>
                        </td>
                    ))}
                </tr>

                 {/* Type */}
                 <tr>
                    <td className="p-6 font-medium text-slate-500 sticky left-0 bg-white dark:bg-[#151F2E] border-r border-slate-100 dark:border-slate-800 z-10">Type</td>
                    {cards.map(card => (
                        <td key={card.id} className="p-6 border-b border-slate-50 dark:border-slate-800/50 text-slate-700 dark:text-slate-300">
                            {card.type}
                        </td>
                    ))}
                </tr>

                {/* Fees */}
                <tr>
                    <td className="p-6 font-medium text-slate-500 sticky left-0 bg-white dark:bg-[#151F2E] border-r border-slate-100 dark:border-slate-800 z-10">Fees</td>
                    {cards.map(card => (
                        <td key={card.id} className="p-6 border-b border-slate-50 dark:border-slate-800/50">
                            <div className="space-y-1">
                                <div className="text-slate-700 dark:text-slate-300"><span className="text-slate-400 text-xs">Annual:</span> {card.annualFee}</div>
                                <div className="text-slate-700 dark:text-slate-300"><span className="text-slate-400 text-xs">FX:</span> {card.fxFee}</div>
                            </div>
                        </td>
                    ))}
                </tr>

                {/* Custody */}
                <tr>
                    <td className="p-6 font-medium text-slate-500 sticky left-0 bg-white dark:bg-[#151F2E] border-r border-slate-100 dark:border-slate-800 z-10">Custody</td>
                    {cards.map(card => (
                        <td key={card.id} className="p-6 border-b border-slate-50 dark:border-slate-800/50 text-slate-700 dark:text-slate-300">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className={`w-4 h-4 ${card.custody.includes('Non') || card.custody.includes('Self') ? 'text-lime-500' : 'text-orange-400'}`} />
                                {card.custody}
                            </div>
                        </td>
                    ))}
                </tr>

                 {/* Perks List */}
                 <tr>
                    <td className="p-6 font-medium text-slate-500 sticky left-0 bg-white dark:bg-[#151F2E] border-r border-slate-100 dark:border-slate-800 z-10 align-top">
                        Top Perks
                    </td>
                    {cards.map(card => (
                        <td key={card.id} className="p-6 align-top">
                            <ul className="space-y-3">
                                {card.perks.map((perk, i) => (
                                    <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                        <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                                            <Check className="w-3 h-3 text-slate-900 dark:text-white" />
                                        </div>
                                        <span className="text-sm">{perk}</span>
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
  );
};

export default ComparisonModal;