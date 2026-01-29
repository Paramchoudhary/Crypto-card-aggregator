import React, { useState, useRef, MouseEvent } from 'react';
import { CryptoCard as CryptoCardType } from '../types';
import { Wifi, Zap, Check, Plus, ShieldAlert, ShieldCheck, Trophy, Medal } from 'lucide-react';

interface Props {
  card: CryptoCardType;
  selected: boolean;
  onSelect: (id: string) => void;
}

const CryptoCard: React.FC<Props> = ({ card, selected, onSelect }) => {
  const [flipped, setFlipped] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Determine if this card needs dark text (for bright backgrounds)
  const needsDarkText = card.tierColor === 'text-black';

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (flipped || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Reduce rotation intensity for a more solid, premium feel
    const rotateX = ((y - centerY) / centerY) * -5; 
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const toggleFlip = (e: React.MouseEvent) => {
    // If we clicked a button or link, don't flip
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) return;
    setFlipped(!flipped);
    setRotate({ x: 0, y: 0 });
  };

  const handleSelection = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); 
    onSelect(card.id);
  };

  // Rank Badge Logic
  const getRankBadge = () => {
    if (!card.rank) return null;
    
    if (card.rank === 1) {
      return (
        <div className="absolute -top-3 -right-3 z-50 animate-bounce delay-100">
           <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 blur-sm rounded-full opacity-50"></div>
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 border-2 border-yellow-100 shadow-lg flex items-center justify-center">
                 <Trophy className="w-5 h-5 text-yellow-900 fill-yellow-900" />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-yellow-600 text-[8px] text-white font-bold px-1.5 py-0.5 rounded-full shadow-sm whitespace-nowrap border border-yellow-400">
                 #1 CHOICE
              </div>
           </div>
        </div>
      );
    }
    
    if (card.rank === 2) {
       return (
        <div className="absolute -top-3 -right-3 z-50">
           <div className="relative">
              <div className="absolute inset-0 bg-slate-300 blur-sm rounded-full opacity-50"></div>
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 border-2 border-slate-100 shadow-lg flex items-center justify-center">
                 <Medal className="w-5 h-5 text-slate-800" />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-slate-600 text-[8px] text-white font-bold px-1.5 py-0.5 rounded-full shadow-sm whitespace-nowrap border border-slate-400">
                 TOP TIER
              </div>
           </div>
        </div>
      );
    }
    
    if (card.rank === 3) {
       return (
        <div className="absolute -top-3 -right-3 z-50">
           <div className="relative">
              <div className="absolute inset-0 bg-amber-600 blur-sm rounded-full opacity-50"></div>
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 border-2 border-amber-300 shadow-lg flex items-center justify-center">
                 <Medal className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-800 text-[8px] text-white font-bold px-1.5 py-0.5 rounded-full shadow-sm whitespace-nowrap border border-amber-500">
                 POPULAR
              </div>
           </div>
        </div>
      );
    }

    return null;
  };

  // Dynamic text colors based on card background
  const textPrimary = needsDarkText ? 'text-black' : 'text-white';
  const textSecondary = needsDarkText ? 'text-black/70' : 'text-white/90';
  const textMuted = needsDarkText ? 'text-black/50' : 'text-white/50';
  const textCard = needsDarkText ? 'text-black/80' : 'text-white/80';
  const borderColor = needsDarkText ? 'border-black/20' : 'border-white/20';
  const bgButton = needsDarkText ? 'bg-black/10 hover:bg-black/20' : 'bg-white/20 hover:bg-white/30';
  const chipGradient = needsDarkText ? 'from-amber-300 to-amber-500' : 'from-amber-200 to-amber-400';

  return (
    <div 
      className="group relative h-[220px] w-full perspective-1000 cursor-pointer select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={toggleFlip}
    >
      {getRankBadge()}
      
      <div 
        ref={cardRef}
        className={`relative w-full h-full duration-500 transform-style-3d transition-transform ease-out ${flipped ? 'rotate-y-180' : ''}`}
        style={{ 
          transform: flipped 
            ? 'rotateY(180deg)' 
            : `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)` 
        }}
      >
        {/* Front Side */}
        <div 
            className={`absolute w-full h-full rounded-[24px] p-5 backface-hidden overflow-hidden bg-gradient-to-br ${card.cardGradient} shadow-2xl ring-1 ring-white/10 transition-all duration-300 ${selected ? 'ring-4 ring-lime-400 shadow-lime-400/20 scale-[1.02]' : ''} ${flipped ? 'pointer-events-none' : 'pointer-events-auto'}`}
            style={{ zIndex: flipped ? 0 : 10 }}
        >
            
            {/* Subtle Texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
            
            {/* Glossy sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-100 pointer-events-none rounded-[24px]"></div>

            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* Top Row */}
              <div className="flex justify-between items-start">
                 {/* Issuer Logo & Name */}
                 <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${needsDarkText ? 'bg-black/10' : 'bg-white/10'} backdrop-blur-sm p-0.5 border ${borderColor} overflow-hidden shadow-sm`}>
                        <img src={card.logo} alt={card.issuer} className="w-full h-full object-cover rounded-full" onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${card.issuer}&background=random`
                        }}/>
                    </div>
                    <span className={`font-medium ${textSecondary} text-sm tracking-wide`}>{card.issuer}</span>
                 </div>
                 
                 {/* Quick Select Button on Front */}
                 <button 
                   onClick={handleSelection}
                   className={`relative z-50 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${selected ? 'bg-lime-400 text-black shadow-lg shadow-lime-400/50' : `${bgButton} ${textPrimary} backdrop-blur-md`}`}
                   aria-label={selected ? "Unselect card" : "Select card to compare"}
                 >
                    {selected ? <Check className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4 stroke-[3]" />}
                 </button>
              </div>

              {/* Middle (Chip) */}
              <div className="pl-1">
                   <div className={`w-10 h-7 bg-gradient-to-br ${chipGradient} rounded-md border border-amber-500/30 flex items-center justify-center opacity-90 shadow-sm`}>
                      <div className="w-5 h-3 border border-amber-600/40 rounded-sm"></div>
                   </div>
              </div>

              {/* Bottom Row */}
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className={`font-mono ${textCard} text-sm tracking-wider mb-1 drop-shadow-sm`}>•••• 8842</span>
                  <span className={`text-[10px] ${textMuted} font-semibold uppercase tracking-widest`}>Card Holder</span>
                </div>
                
                <div className="flex flex-col items-end">
                   <Wifi className={`${textMuted} w-4 h-4 rotate-90 mb-1`} />
                   <div className={`${textPrimary} font-bold italic opacity-90 text-lg drop-shadow-md`}>
                       {card.network}
                   </div>
                </div>
              </div>
            </div>
        </div>

        {/* Back Side */}
        <div 
            className={`absolute w-full h-full rounded-[24px] bg-white dark:bg-[#1A1D24] p-5 rotate-y-180 backface-hidden shadow-xl ring-1 ring-slate-200 dark:ring-slate-800 flex flex-col transition-all duration-300 ${selected ? 'ring-2 ring-lime-400' : ''} ${flipped ? 'pointer-events-auto' : 'pointer-events-none'}`}
            style={{ zIndex: flipped ? 10 : 0 }}
        >
            {/* Content Wrapper - Flex 1 to take available space, overflow-hidden to prevent pushing buttons out */}
            <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-100 dark:border-slate-800/50 shrink-0">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base truncate pr-2">{card.name}</h3>
                  <div className="flex items-center gap-1 shrink-0">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {typeof card.cashbackMax === 'number' ? `${card.cashbackMax}%` : (card.cashbackMax || 'N/A')}
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase">CB</span>
                  </div>
                </div>
                
                <div className="space-y-2 overflow-y-auto no-scrollbar pb-1">
                  <div className="flex justify-between text-xs">
                     <span className="text-slate-500">Annual Fee</span>
                     <span className="font-semibold text-slate-700 dark:text-slate-300">{card.annualFee}</span>
                  </div>
                  
                  {/* KYC Badge */}
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-slate-500">KYC Status</span>
                     <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md font-bold text-[10px] ${card.kyc === 'Required' ? 'bg-slate-100 dark:bg-slate-800 text-slate-500' : 'bg-lime-400/20 text-lime-700 dark:text-lime-400'}`}>
                        {card.kyc === 'Required' ? <ShieldCheck className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                        {card.kyc === 'Required' ? 'Required' : 'No/Light'}
                     </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {card.perks.slice(0, 2).map((perk, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-full font-medium border border-slate-200 dark:border-slate-700/50 line-clamp-2 leading-tight text-left">
                            {perk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
            </div>

            {/* Footer / Buttons - Fixed height (via intrinsic size) at bottom */}
            <div className="flex gap-2 mt-3 pt-2 border-t border-slate-50 dark:border-slate-800/30 shrink-0">
              <button 
                onClick={handleSelection}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all relative z-50 ${selected ? 'bg-lime-400 text-black shadow-lg shadow-lime-400/20' : 'bg-slate-900 dark:bg-white text-white dark:text-black hover:opacity-90'}`}
              >
                {selected ? 'Selected' : 'Compare'}
              </button>
              <a 
                href={card.officialLink} 
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noreferrer"
                className="w-9 py-2 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors relative z-50"
              >
                <Zap className="w-4 h-4 text-slate-400 dark:text-slate-400" />
              </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
