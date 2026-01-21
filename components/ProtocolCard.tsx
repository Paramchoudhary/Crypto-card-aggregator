import React, { useState, useRef, MouseEvent } from 'react';
import { PrivacyProtocol } from '../privacyTypes';
import { Shield, Zap, Check, Plus, Eye, EyeOff, Clock, Coins, ExternalLink, Lock } from 'lucide-react';

interface Props {
  protocol: PrivacyProtocol;
  selected: boolean;
  onSelect: (id: string) => void;
}

const ProtocolCard: React.FC<Props> = ({ protocol, selected, onSelect }) => {
  const [flipped, setFlipped] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (flipped || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -6; 
    const rotateY = ((x - centerX) / centerX) * 6;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const toggleFlip = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) return;
    setFlipped(!flipped);
    setRotate({ x: 0, y: 0 });
  };

  const handleSelection = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); 
    onSelect(protocol.id);
  };

  // Get anonymity badge styling
  const getAnonymityBadge = () => {
    const styles = {
      High: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      Low: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return styles[protocol.anonymitySet];
  };

  return (
    <div 
      className="group relative h-[280px] w-full perspective-1000 cursor-pointer select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={toggleFlip}
    >
      <div 
        ref={cardRef}
        className={`relative w-full h-full duration-500 transform-style-3d transition-transform ease-out ${flipped ? 'rotate-y-180' : ''}`}
        style={{ 
          transform: flipped 
            ? 'rotateY(180deg)' 
            : `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)` 
        }}
      >
        {/* Front Side - Cyberpunk Style */}
        <div 
          className={`absolute w-full h-full rounded-[24px] p-5 backface-hidden overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl transition-all duration-300 ${selected ? 'ring-2 ring-cyan-400 shadow-cyan-400/30 scale-[1.02]' : 'ring-1 ring-cyan-500/20'} ${flipped ? 'pointer-events-none' : 'pointer-events-auto'}`}
          style={{ zIndex: flipped ? 0 : 10 }}
        >
          {/* Cyberpunk Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          
          {/* Neon Glow Effects */}
          <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${protocol.gradientFrom} ${protocol.gradientTo} opacity-20 blur-3xl`}></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-cyan-500 opacity-10 blur-2xl"></div>
          
          {/* Scan Line Effect */}
          <div className="absolute inset-0 overflow-hidden rounded-[24px] opacity-30 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-pulse"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-between h-full">
            {/* Top Row */}
            <div className="flex justify-between items-start">
              {/* Protocol Logo & Name */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-black/50 backdrop-blur-sm p-1.5 border border-cyan-500/30 overflow-hidden shadow-lg shadow-cyan-500/10">
                  <img 
                    src={protocol.logo} 
                    alt={protocol.name} 
                    className="w-full h-full object-contain rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${protocol.ticker}&background=0f172a&color=22d3ee`
                    }}
                  />
                </div>
                <div>
                  <span className="font-bold text-white text-lg tracking-wide">{protocol.name}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-xs font-mono ${protocol.accentColor}`}>${protocol.ticker}</span>
                    <span className="text-[10px] text-slate-500">•</span>
                    <span className="text-[10px] text-slate-400">{protocol.launchYear}</span>
                  </div>
                </div>
              </div>
              
              {/* Select Button */}
              <button 
                onClick={handleSelection}
                className={`relative z-50 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${selected ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/50' : 'bg-white/10 text-cyan-400 hover:bg-white/20 backdrop-blur-md border border-cyan-500/30'}`}
                aria-label={selected ? "Unselect protocol" : "Select protocol to compare"}
              >
                {selected ? <Check className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4 stroke-[3]" />}
              </button>
            </div>

            {/* Middle - Privacy Tech Badge */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Lock className={`w-4 h-4 ${protocol.accentColor}`} />
                <span className="text-sm font-semibold text-slate-300">{protocol.privacyTech}</span>
              </div>
              
              <p className="text-xs text-slate-400 line-clamp-2">{protocol.tagline}</p>
            </div>

            {/* Bottom Row - Key Stats */}
            <div className="flex justify-between items-end">
              <div className="flex gap-3">
                {/* Anonymity Badge */}
                <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${getAnonymityBadge()}`}>
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    {protocol.anonymitySet}
                  </div>
                </div>
                
                {/* Default Privacy Badge */}
                <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${protocol.defaultPrivacy === 'Mandatory' ? 'bg-violet-500/20 text-violet-400 border-violet-500/30' : 'bg-slate-500/20 text-slate-400 border-slate-500/30'}`}>
                  <div className="flex items-center gap-1">
                    {protocol.defaultPrivacy === 'Mandatory' ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    {protocol.defaultPrivacy}
                  </div>
                </div>
              </div>
              
              {/* Network Indicator */}
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                  <span className="text-[10px] font-mono uppercase tracking-wider">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Side - Detailed Info */}
        <div 
          className={`absolute w-full h-full rounded-[24px] bg-slate-900 p-5 rotate-y-180 backface-hidden shadow-xl ring-1 ring-cyan-500/20 flex flex-col transition-all duration-300 ${selected ? 'ring-2 ring-cyan-400' : ''} ${flipped ? 'pointer-events-auto' : 'pointer-events-none'}`}
          style={{ zIndex: flipped ? 10 : 0 }}
        >
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5 rounded-[24px]" style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)`,
            backgroundSize: '15px 15px'
          }}></div>
          
          <div className="relative z-10 flex-1 overflow-hidden flex flex-col min-h-0">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-cyan-500/20 shrink-0">
              <h3 className="font-bold text-white text-lg">{protocol.name}</h3>
              <span className={`text-sm font-mono font-bold ${protocol.accentColor}`}>${protocol.ticker}</span>
            </div>
            
            <div className="space-y-3 overflow-y-auto no-scrollbar pb-1 flex-1">
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-800/50 rounded-lg p-2 border border-slate-700/50">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span className="text-[10px] text-slate-400 uppercase">Speed</span>
                  </div>
                  <span className="text-xs font-semibold text-white">{protocol.transactionSpeed}</span>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-2 border border-slate-700/50">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Coins className="w-3 h-3 text-cyan-400" />
                    <span className="text-[10px] text-slate-400 uppercase">Fees</span>
                  </div>
                  <span className="text-xs font-semibold text-white">{protocol.averageFees}</span>
                </div>
              </div>
              
              {/* Privacy Tech Details */}
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Privacy Tech</span>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {protocol.privacyTechDetails.slice(0, 2).map((detail, i) => (
                    <span key={i} className="text-[9px] bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/20">
                      {detail.length > 40 ? detail.substring(0, 40) + '...' : detail}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Consensus */}
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Consensus</span>
                <span className="font-medium text-slate-300">{protocol.consensus.split(' ')[0]}</span>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-2 mt-3 pt-2 border-t border-cyan-500/20 shrink-0">
            <button 
              onClick={handleSelection}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all relative z-50 ${selected ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/30' : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90'}`}
            >
              {selected ? 'Selected' : 'Compare'}
            </button>
            <a 
              href={protocol.website} 
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noreferrer"
              className="w-10 py-2.5 flex items-center justify-center rounded-xl border border-cyan-500/30 hover:bg-cyan-500/10 transition-colors relative z-50"
            >
              <ExternalLink className="w-4 h-4 text-cyan-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtocolCard;
