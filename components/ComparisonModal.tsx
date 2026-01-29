import React from 'react';
import { CryptoCard } from '../types';
import { X, Check, CreditCard, Globe, ShieldCheck, Coins } from 'lucide-react';

interface Props {
  cards: CryptoCard[];
  onClose: () => void;
  onRemove: (id: string) => void;
}

const ComparisonModal: React.FC<Props> = ({ cards, onClose, onRemove }) => {
  const formatCustodyLabel = (custody: string) => {
    if (custody === 'Self-Custody' || custody === 'Non-Custodial') {
      return 'Self-Custody (Non-Custodial)';
    }
    return custody;
  };

  if (cards.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90" onClick={onClose}></div>
      <div className="relative w-full max-w-7xl bg-black border-4 border-white overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header - Brutalist */}
        <div className="p-6 border-b-4 border-white flex justify-between items-center bg-black">
          <div>
            <h2 className="text-xl font-black text-white uppercase">Compare Cards</h2>
          </div>
          <button onClick={onClose} className="p-2 border-4 border-white hover:bg-white hover:text-black transition-all text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Table Container - Brutalist */}
        <div className="overflow-auto flex-1 bg-black">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-6 min-w-[200px] sticky left-0 bg-white text-black z-10 border-b-4 border-r-4 border-black">
                  <span className="text-xs font-black uppercase tracking-wider">Features</span>
                </th>
                {cards.map(card => (
                  <th key={card.id} className="p-6 min-w-[280px] border-b-4 border-l-4 border-white align-top">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 border-2 border-white bg-white overflow-hidden">
                             <img src={card.logo} className="w-full h-full object-cover" />
                        </div>
                        <button onClick={() => onRemove(card.id)} className="text-white/50 hover:text-red-500 transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="font-black text-lg text-white mb-1 uppercase">{card.name}</div>
                    <div className="text-sm text-white/50 font-mono">{card.issuer}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm font-mono">
                
                {/* Cashback */}
                <tr>
                    <td className="p-6 font-black text-white uppercase text-xs sticky left-0 bg-black border-r-4 border-white z-10">Cashback</td>
                    {cards.map(card => (
                        <td key={card.id} className="p-6 border-b-4 border-white/20 border-l-4">
                            <span className="inline-flex items-center px-3 py-1 border-2 border-lime-400 text-sm font-black text-lime-400">
                                {typeof card.cashbackMax === 'number' ? `Up to ${card.cashbackMax}%` : (card.cashbackMax || 'N/A')}
                            </span>
                        </td>
                    ))}
                </tr>

                {/* Network */}
                <tr>
                    <td className="p-6 font-black text-white uppercase text-xs sticky left-0 bg-black border-r-4 border-white z-10">Network</td>
                    {cards.map(card => (
                        <td key={card.id} className="p-6 border-b-4 border-white/20 text-white border-l-4">
                             <div className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-lime-400" />
                                {card.network}
                             </div>
                        </td>
                    ))}
                </tr>

                 {/* Type */}
                 <tr>
                    <td className="p-6 font-black text-white uppercase text-xs sticky left-0 bg-black border-r-4 border-white z-10">Type</td>
                    {cards.map(card => (
                        <td key={card.id} className="p-6 border-b-4 border-white/20 text-white border-l-4">
                            {card.type}
                        </td>
                    ))}
                </tr>

                {/* Fees */}
                <tr>
                    <td className="p-6 font-black text-white uppercase text-xs sticky left-0 bg-black border-r-4 border-white z-10">Fees</td>
                    {cards.map(card => (
                        <td key={card.id} className="p-6 border-b-4 border-white/20 border-l-4">
                            <div className="space-y-1">
                                <div className="text-white"><span className="text-white/50 text-xs">Annual:</span> {card.annualFee}</div>
                                <div className="text-white"><span className="text-white/50 text-xs">FX:</span> {card.fxFee}</div>
                            </div>
                        </td>
                    ))}
                </tr>

                {/* Custody */}
                <tr>
                    <td className="p-6 font-black text-white uppercase text-xs sticky left-0 bg-black border-r-4 border-white z-10">Custody</td>
                    {cards.map(card => (
                        <td key={card.id} className="p-6 border-b-4 border-white/20 text-white border-l-4">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className={`w-4 h-4 ${card.custody.includes('Non') || card.custody.includes('Self') ? 'text-lime-400' : 'text-orange-400'}`} />
                                {formatCustodyLabel(card.custody)}
                            </div>
                        </td>
                    ))}
                </tr>

                 {/* Perks List */}
                 <tr>
                    <td className="p-6 font-black text-white uppercase text-xs sticky left-0 bg-black border-r-4 border-white z-10 align-top">
                        Top Perks
                    </td>
                    {cards.map(card => (
                        <td key={card.id} className="p-6 align-top border-l-4 border-white/20">
                            <ul className="space-y-3">
                                {card.perks.map((perk, i) => (
                                    <li key={i} className="flex items-start gap-2 text-white">
                                        <div className="w-5 h-5 border-2 border-lime-400 flex items-center justify-center shrink-0 mt-0.5">
                                            <Check className="w-3 h-3 text-lime-400" />
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
