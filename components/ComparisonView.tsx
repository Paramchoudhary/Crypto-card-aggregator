import React from 'react';
import { CryptoCard } from '../types';
import { X, Check, Minus, ArrowLeft, Shield, Globe, Zap, CreditCard, Coins, Smartphone, Wallet, Landmark, AlertTriangle, LayoutDashboard } from 'lucide-react';

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
      <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-black">
        <div className="border-4 border-white p-12 max-w-lg">
          <div className="w-20 h-20 border-4 border-lime-400 mx-auto mb-6 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-lime-400" />
          </div>
          <h3 className="text-3xl font-black text-white uppercase mb-4">No Cards Selected</h3>
          <p className="text-white/70 font-mono mb-8">Please select the cards first.</p>
          <button 
            onClick={onBack}
            className="px-8 py-4 bg-lime-400 text-black font-black uppercase tracking-wider border-4 border-lime-400 hover:bg-lime-300 transition-all flex items-center gap-3 mx-auto"
          >
            <LayoutDashboard className="w-5 h-5" />
            Go to Discover Cards
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Header - Brutalist */}
      <div className="flex items-center justify-between px-8 py-6 bg-black border-b-4 border-white">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 border-4 border-white text-white hover:bg-white hover:text-black transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">Compare Cards</h2>
            <p className="text-sm text-white/50 font-mono">Analyzing {cards.length} selected options</p>
          </div>
        </div>
      </div>

      {/* Comparison Table Container - Brutalist */}
      <div className="flex-1 overflow-auto p-8">
        <div className="bg-black border-4 border-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr>
                  <th className="p-6 w-64 bg-white text-black border-b-4 border-r-4 border-black sticky left-0 z-10">
                    <span className="text-xs font-black uppercase tracking-wider">Card Overview</span>
                  </th>
                  {cards.map(card => (
                    <th key={card.id} className="p-6 min-w-[240px] border-b-4 border-l-4 border-white bg-black align-top relative group">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-4">
                           <div className="w-16 h-16 border-4 border-white bg-white p-1">
                              <img 
                                src={card.logo} 
                                alt={card.name} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${card.issuer}&background=random`
                                }}
                              />
                           </div>
                           <button 
                            onClick={() => onRemove(card.id)}
                            className="absolute -top-2 -right-2 bg-black text-white hover:bg-red-500 hover:text-white border-2 border-white p-1 transition-all"
                           >
                             <X className="w-3 h-3" />
                           </button>
                        </div>
                        <h3 className="font-black text-lg text-white uppercase mb-1">{card.name}</h3>
                        <span className="text-xs font-mono px-2 py-1 border-2 border-white/50 text-white/70">{card.issuer}</span>
                        
                        <a 
                          href={card.officialLink}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 text-xs font-black text-lime-400 hover:text-lime-300 flex items-center gap-1 uppercase"
                        >
                          Visit Site <Zap className="w-3 h-3" />
                        </a>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm font-mono">
                {rows.map((row, index) => (
                  <tr key={row.key} className={`${index % 2 === 0 ? 'bg-black' : 'bg-white/5'}`}>
                    <td className="p-5 font-black text-white uppercase text-xs sticky left-0 bg-inherit border-r-4 border-white z-10 flex items-center gap-2">
                       {row.icon && <row.icon className="w-4 h-4 text-lime-400" />}
                       {row.label}
                    </td>
                    {cards.map(card => {
                      const value = (card as any)[row.key];
                      
                      let displayContent;
                      if (row.type === 'boolean') {
                        displayContent = value ? (
                          <div className="flex justify-center">
                            <div className="w-8 h-8 border-2 border-lime-400 bg-lime-400/20 flex items-center justify-center">
                              <Check className="w-5 h-5 text-lime-400" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <div className="w-8 h-8 border-2 border-white/30 flex items-center justify-center">
                              <Minus className="w-4 h-4 text-white/30" />
                            </div>
                          </div>
                        );
                      } else {
                        displayContent = (
                          <span className={`font-mono ${row.key === 'cashbackMax' ? 'text-lime-400 text-lg font-black' : 'text-white'}`}>
                            {row.format ? row.format(value) : value}
                          </span>
                        );
                      }

                      return (
                        <td key={`${card.id}-${row.key}`} className="p-5 text-center border-l-4 border-white/20">
                          {displayContent}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                
                {/* Perks Section Row */}
                <tr className="bg-black border-t-4 border-white">
                  <td className="p-6 font-black text-white uppercase text-xs sticky left-0 bg-black border-r-4 border-white z-10 align-top">
                     Key Features
                  </td>
                  {cards.map(card => (
                    <td key={`${card.id}-perks`} className="p-6 align-top border-l-4 border-white/20">
                       <ul className="space-y-3 text-left inline-block">
                          {card.perks.map((perk, i) => (
                             <li key={i} className="flex items-start gap-2 text-white/80 group/item">
                                <div className="w-5 h-5 border-2 border-lime-400 flex items-center justify-center shrink-0 mt-0.5">
                                    <Check className="w-3 h-3 text-lime-400" />
                                </div>
                                <span className="text-xs font-mono leading-5">{perk}</span>
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
