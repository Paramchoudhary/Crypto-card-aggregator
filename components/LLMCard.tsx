import React, { useState, useRef, MouseEvent } from 'react';
import { LLMModel } from '../types';
import { ExternalLink, Check, Plus, Sparkles, Cpu, Brain, Zap } from 'lucide-react';

interface Props {
  llm: LLMModel;
  selected: boolean;
  onSelect: (id: string) => void;
  highlighted?: boolean;
}

const LLMCard: React.FC<Props> = ({ llm, selected, onSelect, highlighted = false }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const handleSelection = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(llm.id);
  };

  // Get strength icon
  const getStrengthIcon = () => {
    switch (llm.primaryStrength) {
      case 'Coding':
        return <Cpu className="w-4 h-4" />;
      case 'Real-time Search':
        return <Zap className="w-4 h-4" />;
      case 'Long Context':
        return <Brain className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div 
      className={`group relative h-[280px] w-full perspective-1000 cursor-pointer select-none transition-all duration-300 ${
        highlighted ? 'scale-[1.02] z-10' : ''
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Highlighted glow effect */}
      {highlighted && (
        <div className="absolute -inset-2 bg-lime-400/20 rounded-[32px] blur-xl animate-pulse" />
      )}
      
      <div 
        ref={cardRef}
        className={`relative w-full h-full duration-500 transform-style-3d transition-transform ease-out`}
        style={{ 
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)` 
        }}
      >
        {/* Card Face */}
        <div 
          className={`absolute w-full h-full rounded-[24px] p-6 overflow-hidden bg-gradient-to-br ${llm.gradient} shadow-2xl ring-1 ring-white/10 transition-all duration-300 ${
            selected ? 'ring-4 ring-lime-400 shadow-lime-400/20' : ''
          } ${highlighted ? 'ring-2 ring-lime-400/50' : ''}`}
        >
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
          
          {/* Subtle Texture */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
          
          {/* Glossy sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-100 pointer-events-none rounded-[24px]" />

          <div className="relative z-10 flex flex-col justify-between h-full">
            {/* Top Row */}
            <div className="flex justify-between items-start">
              {/* Logo & Provider */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm p-1 border border-white/20 overflow-hidden shadow-lg">
                  <img 
                    src={llm.logoUrl} 
                    alt={llm.name} 
                    className="w-full h-full object-cover rounded-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${llm.name}&background=random`
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg tracking-tight">{llm.name}</h3>
                  <span className="text-xs text-white/60 font-medium">{llm.provider}</span>
                </div>
              </div>
              
              {/* Quick Select Button */}
              <button 
                onClick={handleSelection}
                className={`relative z-50 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
                  selected 
                    ? 'bg-lime-400 text-black shadow-lg shadow-lime-400/50' 
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-md'
                }`}
                aria-label={selected ? "Unselect LLM" : "Select LLM to compare"}
              >
                {selected ? <Check className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4 stroke-[3]" />}
              </button>
            </div>

            {/* Middle - Tagline */}
            <div className="py-2">
              <p className={`text-sm ${llm.accentColor} font-medium leading-relaxed line-clamp-2`}>
                {llm.tagline}
              </p>
            </div>

            {/* Primary Strength Badge */}
            <div className="mb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                {getStrengthIcon()}
                <span className="text-xs font-bold text-white">{llm.primaryStrength}</span>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex justify-between items-end pt-2 border-t border-white/10">
              <div className="flex flex-col">
                <span className="text-[10px] text-white/50 font-semibold uppercase tracking-widest mb-1">Context</span>
                <span className="text-sm font-mono text-white/80">{llm.contextWindow}</span>
              </div>
              
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-white/50 font-semibold uppercase tracking-widest mb-1">Pricing</span>
                <span className={`text-sm font-bold ${llm.accentColor}`}>{llm.pricingModel}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 mt-4">
              <button 
                onClick={handleSelection}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  selected 
                    ? 'bg-lime-400 text-black shadow-lg shadow-lime-400/20' 
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-md'
                }`}
              >
                {selected ? 'Selected' : 'Compare'}
              </button>
              <a 
                href={llm.officialLink}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noreferrer"
                className="w-10 py-2.5 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
              >
                <ExternalLink className="w-4 h-4 text-white/70" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLMCard;
