import React, { useState, useRef, MouseEvent } from 'react';
import { CryptoCard as CryptoCardType } from '../types';
import { Wifi, Zap, Check, Plus, ShieldAlert, ShieldCheck, Trophy, Medal, X } from 'lucide-react';

interface Props {
  card: CryptoCardType;
  selected: boolean;
  onSelect: (id: string) => void;
}

const CryptoCard: React.FC<Props> = ({ card, selected, onSelect }) => {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleFlip = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) return;
    setFlipped(!flipped);
  };

  const handleSelection = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); 
    onSelect(card.id);
  };

  // Rank Badge Logic - Brutalist Style
  const getRankBadge = () => {
    if (!card.rank) return null;
    
    if (card.rank === 1) {
      return (
        <div className="absolute -top-2 -right-2 z-50">
           <div className="w-10 h-10 bg-lime-400 border-4 border-black flex items-center justify-center">
              <Trophy className="w-5 h-5 text-black" />
           </div>
        </div>
      );
    }
    
    if (card.rank === 2) {
       return (
        <div className="absolute -top-2 -right-2 z-50">
           <div className="w-10 h-10 bg-white border-4 border-black flex items-center justify-center">
              <Medal className="w-5 h-5 text-black" />
           </div>
        </div>
      );
    }
    
    if (card.rank === 3) {
       return (
        <div className="absolute -top-2 -right-2 z-50">
           <div className="w-10 h-10 bg-orange-400 border-4 border-black flex items-center justify-center">
              <Medal className="w-4 h-4 text-black" />
           </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div 
      className="group relative h-[240px] w-full cursor-pointer select-none"
      onClick={toggleFlip}
    >
      {getRankBadge()}
      
      <div 
        ref={cardRef}
        className={`relative w-full h-full duration-300 transform-style-3d transition-transform ${flipped ? 'rotate-y-180' : ''}`}
        style={{ 
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Front Side - Brutalist */}
        <div 
            className={`absolute w-full h-full p-5 backface-hidden overflow-hidden bg-black border-4 transition-all duration-300 ${selected ? 'border-lime-400 shadow-[8px_8px_0px_0px_rgba(163,230,53,0.5)]' : 'border-white hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]'} ${flipped ? 'pointer-events-none' : 'pointer-events-auto'}`}
            style={{ zIndex: flipped ? 0 : 10, backfaceVisibility: 'hidden' }}
        >
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* Top Row */}
              <div className="flex justify-between items-start">
                 {/* Issuer Logo & Name */}
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border-2 border-white bg-white overflow-hidden">
                        <img src={card.logo} alt={card.issuer} className="w-full h-full object-cover" onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${card.issuer}&background=random`
                        }}/>
                    </div>
                    <span className="font-black text-white text-sm uppercase tracking-wider">{card.issuer}</span>
                 </div>
                 
                 {/* Quick Select Button - Brutalist */}
                 <button 
                   onClick={handleSelection}
                   className={`relative z-50 w-10 h-10 flex items-center justify-center transition-all border-4 ${selected ? 'bg-lime-400 text-black border-lime-400' : 'bg-black text-white border-white hover:bg-white hover:text-black'}`}
                   aria-label={selected ? "Unselect card" : "Select card to compare"}
                 >
                    {selected ? <Check className="w-5 h-5 stroke-[3]" /> : <Plus className="w-5 h-5 stroke-[3]" />}
                 </button>
              </div>

              {/* Middle - Card Name */}
              <div className="pl-1">
                <h3 className="text-xl font-black text-white uppercase tracking-tight">{card.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-mono text-white/60 px-2 py-1 border border-white/30">{card.type}</span>
                  <span className="text-xs font-mono text-lime-400 font-bold">
                    {typeof card.cashbackMax === 'number' ? `${card.cashbackMax}% CB` : (card.cashbackMax || 'N/A')}
                  </span>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="font-mono text-white/50 text-xs uppercase">Network</span>
                  <span className="text-white font-black text-lg uppercase">
                      {card.network}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-white/30">
                   <Wifi className="w-5 h-5 rotate-90" />
                </div>
              </div>
            </div>
        </div>

        {/* Back Side - Brutalist */}
        <div 
            className={`absolute w-full h-full bg-black p-5 rotate-y-180 backface-hidden border-4 flex flex-col transition-all duration-300 ${selected ? 'border-lime-400' : 'border-white'} ${flipped ? 'pointer-events-auto' : 'pointer-events-none'}`}
            style={{ zIndex: flipped ? 10 : 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
            {/* Content Wrapper */}
            <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                <div className="flex justify-between items-center mb-3 pb-3 border-b-2 border-white/30 shrink-0">
                  <h3 className="font-black text-white text-base uppercase truncate pr-2">{card.name}</h3>
                  <div className="flex items-center gap-1 shrink-0">
                      <span className="text-sm font-black text-lime-400">
                        {typeof card.cashbackMax === 'number' ? `${card.cashbackMax}%` : (card.cashbackMax || 'N/A')}
                      </span>
                      <span className="text-[10px] text-white/50 uppercase font-mono">CB</span>
                  </div>
                </div>
                
                <div className="space-y-2 overflow-y-auto no-scrollbar pb-1 font-mono text-xs">
                  <div className="flex justify-between">
                     <span className="text-white/50 uppercase">Annual Fee</span>
                     <span className="font-bold text-white">{card.annualFee}</span>
                  </div>
                  
                  {/* KYC Badge - Brutalist */}
                  <div className="flex justify-between items-center">
                     <span className="text-white/50 uppercase">KYC Status</span>
                     <div className={`flex items-center gap-1 px-2 py-1 font-black text-[10px] border-2 ${card.kyc === 'Required' ? 'border-white/50 text-white/70' : 'border-lime-400 text-lime-400'}`}>
                        {card.kyc === 'Required' ? <ShieldCheck className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                        {card.kyc === 'Required' ? 'REQUIRED' : 'NO/LIGHT'}
                     </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {card.perks.slice(0, 2).map((perk, i) => (
                        <span key={i} className="text-[10px] bg-white/10 text-white px-2 py-1 border border-white/30 font-mono line-clamp-2 leading-tight text-left">
                            {perk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
            </div>

            {/* Footer / Buttons - Brutalist */}
            <div className="flex gap-2 mt-3 pt-3 border-t-2 border-white/30 shrink-0">
              <button 
                onClick={handleSelection}
                className={`flex-1 py-3 text-xs font-black uppercase transition-all relative z-50 border-4 ${selected ? 'bg-lime-400 text-black border-lime-400' : 'bg-white text-black border-white hover:bg-lime-400 hover:border-lime-400'}`}
              >
                {selected ? 'Selected' : 'Compare'}
              </button>
              <a 
                href={card.officialLink} 
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noreferrer"
                className="w-12 py-3 flex items-center justify-center border-4 border-white text-white hover:bg-white hover:text-black transition-all relative z-50"
              >
                <Zap className="w-4 h-4" />
              </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
