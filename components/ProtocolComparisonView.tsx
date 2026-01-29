import React, { useMemo } from 'react';
import { PrivacyProtocol } from '../privacyTypes';
import { X, Check, Minus, ArrowLeft, Shield, Lock, Clock, Coins, Cpu, Calendar, Globe, Eye, EyeOff, Zap, Trophy } from 'lucide-react';

interface Props {
  protocols: PrivacyProtocol[];
  onRemove: (id: string) => void;
  onBack: () => void;
}

const ProtocolComparisonView: React.FC<Props> = ({ protocols, onRemove, onBack }) => {
  
  // Calculate the "best" protocol based on scoring
  const bestProtocolId = useMemo(() => {
    if (protocols.length === 0) return null;
    
    const scores = protocols.map(p => {
      let score = 0;
      
      // Anonymity Set scoring
      if (p.anonymitySet === 'High') score += 30;
      else if (p.anonymitySet === 'Medium') score += 15;
      else score += 5;
      
      // Default Privacy scoring
      if (p.defaultPrivacy === 'Mandatory') score += 25;
      else score += 10;
      
      // Fees scoring (lower is better)
      if (p.averageFees.includes('< $0.01')) score += 20;
      else if (p.averageFees.includes('< $0.05')) score += 15;
      else score += 5;
      
      // Features count
      score += p.keyFeatures.length * 2;
      score += p.privacyTechDetails.length * 2;
      
      return { id: p.id, score };
    });
    
    const best = scores.reduce((a, b) => a.score > b.score ? a : b);
    return best.id;
  }, [protocols]);
  
  // Define comparison rows
  const rows = [
    { label: 'Privacy Technology', key: 'privacyTech', icon: Lock },
    { label: 'Anonymity Set', key: 'anonymitySet', icon: Shield, type: 'badge' },
    { label: 'Default Privacy', key: 'defaultPrivacy', icon: Eye, type: 'privacyBadge' },
    { label: 'Transaction Speed', key: 'transactionSpeed', icon: Clock },
    { label: 'Average Fees', key: 'averageFees', icon: Coins },
    { label: 'Consensus', key: 'consensus', icon: Cpu },
    { label: 'Launch Year', key: 'launchYear', icon: Calendar },
    { label: 'Market Cap', key: 'marketCap', format: (val: any) => val || 'N/A' },
  ];

  // Anonymity badge styling
  const getAnonymityBadgeStyle = (level: string) => {
    const styles: Record<string, string> = {
      High: 'bg-lime-400/20 text-lime-600 dark:text-lime-400',
      Medium: 'bg-yellow-400/20 text-yellow-600 dark:text-yellow-400',
      Low: 'bg-red-400/20 text-red-600 dark:text-red-400'
    };
    return styles[level] || 'bg-slate-100 dark:bg-slate-800 text-slate-500';
  };

  // Default privacy badge styling
  const getPrivacyBadgeStyle = (type: string) => {
    if (type === 'Mandatory') {
      return 'bg-violet-400/20 text-violet-600 dark:text-violet-400';
    }
    return 'bg-slate-100 dark:bg-slate-800 text-slate-500';
  };

  if (protocols.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
          <Shield className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">No protocols selected</h3>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">Select up to 6 privacy protocols from the Discover tab to unlock detailed side-by-side comparisons.</p>
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
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Compare Protocols</h2>
            <p className="text-sm text-slate-500">Analyzing {protocols.length} selected options side-by-side</p>
          </div>
        </div>
        
        {/* Best Protocol Indicator */}
        {bestProtocolId && (
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-500/10 rounded-xl border border-yellow-200 dark:border-yellow-500/30">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">
              Best Pick: {protocols.find(p => p.id === bestProtocolId)?.name}
            </span>
          </div>
        )}
      </div>

      {/* Comparison Table Container */}
      <div className="flex-1 overflow-auto custom-scrollbar p-8">
        <div className="bg-white dark:bg-[#151F2E] rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr>
                  <th className="p-6 w-64 bg-slate-50 dark:bg-[#1A2332] border-b border-r border-slate-100 dark:border-slate-800 sticky left-0 z-10">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Protocol Overview</span>
                  </th>
                  {protocols.map(protocol => {
                    const isBest = protocol.id === bestProtocolId;
                    return (
                      <th 
                        key={protocol.id} 
                        className={`p-6 min-w-[240px] border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-[#151F2E] align-top relative group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${isBest ? 'ring-2 ring-yellow-400 ring-inset bg-yellow-50/50 dark:bg-yellow-500/5' : ''}`}
                      >
                        {/* Best Badge */}
                        {isBest && (
                          <div className="absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                            <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full shadow-lg shadow-yellow-400/30">
                              <Trophy className="w-3 h-3 text-yellow-900" />
                              <span className="text-[10px] font-bold text-yellow-900 uppercase">Best Pick</span>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex flex-col items-center text-center">
                          <div className="relative mb-4">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-1 shadow-inner ${isBest ? 'ring-2 ring-yellow-400' : ''}`}>
                              <img 
                                src={protocol.logo} 
                                alt={protocol.name} 
                                className="w-full h-full object-contain rounded-xl bg-white"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${protocol.ticker}&background=random`
                                }}
                              />
                            </div>
                            <button 
                              onClick={() => onRemove(protocol.id)}
                              className="absolute -top-2 -right-2 bg-white dark:bg-slate-800 text-slate-400 hover:text-red-500 rounded-full p-1 shadow-md border border-slate-100 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          <h3 className={`font-bold text-lg mb-1 ${isBest ? 'text-yellow-600 dark:text-yellow-400' : 'text-slate-900 dark:text-white'}`}>{protocol.name}</h3>
                          <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">${protocol.ticker}</span>
                          
                          <a 
                            href={protocol.website}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-4 text-xs font-bold text-lime-600 dark:text-lime-400 hover:underline flex items-center gap-1"
                          >
                            Visit Site <Zap className="w-3 h-3" />
                          </a>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="text-sm">
                {rows.map((row, index) => (
                  <tr key={row.key} className={`group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30 ${index % 2 === 0 ? 'bg-white dark:bg-[#151F2E]' : 'bg-slate-50/50 dark:bg-[#1A2332]/30'}`}>
                    <td className="p-5 font-medium text-slate-500 sticky left-0 bg-inherit border-r border-slate-100 dark:border-slate-800 z-10 flex items-center gap-2">
                      {row.icon && <row.icon className="w-4 h-4 text-slate-400" />}
                      {row.label}
                    </td>
                    {protocols.map(protocol => {
                      const value = (protocol as any)[row.key];
                      const isBest = protocol.id === bestProtocolId;
                      
                      let displayContent;
                      if (row.type === 'badge') {
                        displayContent = (
                          <div className="flex justify-center">
                            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${getAnonymityBadgeStyle(value)}`}>
                              {value}
                            </span>
                          </div>
                        );
                      } else if (row.type === 'privacyBadge') {
                        displayContent = (
                          <div className="flex justify-center">
                            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${getPrivacyBadgeStyle(value)}`}>
                              {value === 'Mandatory' ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                              {value}
                            </span>
                          </div>
                        );
                      } else {
                        displayContent = (
                          <span className={`font-semibold ${row.key === 'privacyTech' ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                            {row.format ? row.format(value) : value}
                          </span>
                        );
                      }

                      return (
                        <td 
                          key={`${protocol.id}-${row.key}`} 
                          className={`p-5 text-center border-slate-100 dark:border-slate-800/50 ${isBest ? 'bg-yellow-50/30 dark:bg-yellow-500/5' : ''}`}
                        >
                          {displayContent}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                
                {/* Privacy Tech Details Section */}
                <tr className="bg-white dark:bg-[#151F2E] border-t border-slate-100 dark:border-slate-800">
                  <td className="p-6 font-medium text-slate-500 sticky left-0 bg-inherit border-r border-slate-100 dark:border-slate-800 z-10 align-top">
                    Tech Details
                  </td>
                  {protocols.map(protocol => {
                    const isBest = protocol.id === bestProtocolId;
                    return (
                      <td key={`${protocol.id}-tech`} className={`p-6 align-top ${isBest ? 'bg-yellow-50/30 dark:bg-yellow-500/5' : ''}`}>
                        <ul className="space-y-3 text-left inline-block">
                          {protocol.privacyTechDetails.slice(0, 4).map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400 group/item">
                              <div className="w-5 h-5 rounded-full bg-lime-400/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-lime-400/20 transition-colors">
                                <Check className="w-3 h-3 text-lime-600 dark:text-lime-400" />
                              </div>
                              <span className="text-xs font-medium leading-5">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    );
                  })}
                </tr>
                
                {/* Key Features Section */}
                <tr className="bg-slate-50/50 dark:bg-[#1A2332]/30 border-t border-slate-100 dark:border-slate-800">
                  <td className="p-6 font-medium text-slate-500 sticky left-0 bg-inherit border-r border-slate-100 dark:border-slate-800 z-10 align-top">
                    Key Features
                  </td>
                  {protocols.map(protocol => {
                    const isBest = protocol.id === bestProtocolId;
                    return (
                      <td key={`${protocol.id}-features`} className={`p-6 align-top ${isBest ? 'bg-yellow-50/30 dark:bg-yellow-500/5' : ''}`}>
                        <ul className="space-y-3 text-left inline-block">
                          {protocol.keyFeatures.slice(0, 4).map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400 group/item">
                              <div className="w-5 h-5 rounded-full bg-lime-400/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-lime-400/20 transition-colors">
                                <Check className="w-3 h-3 text-lime-600 dark:text-lime-400" />
                              </div>
                              <span className="text-xs font-medium leading-5">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    );
                  })}
                </tr>

                {/* Use Cases Section */}
                <tr className="bg-white dark:bg-[#151F2E] border-t border-slate-100 dark:border-slate-800">
                  <td className="p-6 font-medium text-slate-500 sticky left-0 bg-inherit border-r border-slate-100 dark:border-slate-800 z-10 align-top">
                    Use Cases
                  </td>
                  {protocols.map(protocol => {
                    const isBest = protocol.id === bestProtocolId;
                    return (
                      <td key={`${protocol.id}-usecases`} className={`p-6 align-top ${isBest ? 'bg-yellow-50/30 dark:bg-yellow-500/5' : ''}`}>
                        <ul className="space-y-3 text-left inline-block">
                          {protocol.useCases.map((useCase, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400 group/item">
                              <div className="w-5 h-5 rounded-full bg-lime-400/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-lime-400/20 transition-colors">
                                <Check className="w-3 h-3 text-lime-600 dark:text-lime-400" />
                              </div>
                              <span className="text-xs font-medium leading-5">{useCase}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtocolComparisonView;
