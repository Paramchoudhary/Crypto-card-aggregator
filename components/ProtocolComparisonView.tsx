import React from 'react';
import { PrivacyProtocol } from '../privacyTypes';
import { X, Check, Minus, ArrowLeft, Shield, Lock, Clock, Coins, Cpu, Calendar, Globe, Eye, EyeOff, ExternalLink, Zap } from 'lucide-react';

interface Props {
  protocols: PrivacyProtocol[];
  onRemove: (id: string) => void;
  onBack: () => void;
}

const ProtocolComparisonView: React.FC<Props> = ({ protocols, onRemove, onBack }) => {
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
      High: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      Low: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return styles[level] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  // Default privacy badge styling
  const getPrivacyBadgeStyle = (type: string) => {
    if (type === 'Mandatory') {
      return 'bg-violet-500/20 text-violet-400 border-violet-500/30';
    }
    return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  if (protocols.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-in fade-in zoom-in duration-300">
        {/* Cyberpunk empty state */}
        <div className="relative">
          <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full"></div>
          <div className="relative w-24 h-24 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 border border-cyan-500/30">
            <Shield className="w-12 h-12 text-cyan-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">No protocols selected</h3>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">Select up to 6 privacy protocols to compare their features, technology, and anonymity capabilities.</p>
        <button 
          onClick={onBack}
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-2xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-cyan-500/20"
        >
          Browse Protocols
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#0a0e17]">
      {/* Cyberpunk Header */}
      <div className="flex items-center justify-between px-8 py-6 bg-slate-900/80 border-b border-cyan-500/20 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2.5 hover:bg-cyan-500/10 rounded-xl transition-colors border border-cyan-500/20"
          >
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Protocol Comparison
              </span>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                <span className="text-xs font-mono text-cyan-400">{protocols.length} ACTIVE</span>
              </div>
            </h2>
            <p className="text-sm text-slate-400 mt-1">Analyzing privacy technologies side-by-side</p>
          </div>
        </div>
      </div>

      {/* Comparison Table Container */}
      <div className="flex-1 overflow-auto custom-scrollbar p-8">
        <div className="bg-slate-900/50 rounded-3xl shadow-2xl border border-cyan-500/10 overflow-hidden backdrop-blur-sm">
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}></div>
          
          <div className="overflow-x-auto relative">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr>
                  <th className="p-6 w-64 bg-slate-800/80 border-b border-r border-cyan-500/10 sticky left-0 z-10">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Protocol Matrix
                    </span>
                  </th>
                  {protocols.map(protocol => (
                    <th key={protocol.id} className="p-6 min-w-[260px] border-b border-cyan-500/10 bg-slate-900/50 align-top relative group transition-colors hover:bg-slate-800/50">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-4">
                          <div className={`absolute inset-0 bg-gradient-to-br ${protocol.gradientFrom} ${protocol.gradientTo} opacity-20 blur-xl rounded-full`}></div>
                          <div className="relative w-16 h-16 rounded-2xl bg-slate-800 p-2 shadow-lg border border-cyan-500/20">
                            <img 
                              src={protocol.logo} 
                              alt={protocol.name} 
                              className="w-full h-full object-contain rounded-xl"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${protocol.ticker}&background=0f172a&color=22d3ee`
                              }}
                            />
                          </div>
                          <button 
                            onClick={() => onRemove(protocol.id)}
                            className="absolute -top-2 -right-2 bg-slate-800 text-slate-400 hover:text-red-400 rounded-full p-1.5 shadow-md border border-cyan-500/20 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <h3 className="font-bold text-lg text-white mb-1">{protocol.name}</h3>
                        <span className={`text-xs font-mono font-semibold ${protocol.accentColor}`}>${protocol.ticker}</span>
                        
                        <a 
                          href={protocol.website}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
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
                  <tr key={row.key} className={`group transition-colors hover:bg-cyan-500/5 ${index % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-800/20'}`}>
                    <td className="p-5 font-medium text-slate-400 sticky left-0 bg-inherit border-r border-cyan-500/10 z-10 backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        {row.icon && <row.icon className="w-4 h-4 text-cyan-500/60" />}
                        {row.label}
                      </div>
                    </td>
                    {protocols.map(protocol => {
                      const value = (protocol as any)[row.key];
                      
                      let displayContent;
                      if (row.type === 'badge') {
                        displayContent = (
                          <div className="flex justify-center">
                            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${getAnonymityBadgeStyle(value)}`}>
                              {value}
                            </span>
                          </div>
                        );
                      } else if (row.type === 'privacyBadge') {
                        displayContent = (
                          <div className="flex justify-center">
                            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1.5 ${getPrivacyBadgeStyle(value)}`}>
                              {value === 'Mandatory' ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                              {value}
                            </span>
                          </div>
                        );
                      } else {
                        displayContent = (
                          <span className="font-semibold text-slate-200">
                            {row.format ? row.format(value) : value}
                          </span>
                        );
                      }

                      return (
                        <td key={`${protocol.id}-${row.key}`} className="p-5 text-center border-cyan-500/5">
                          {displayContent}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                
                {/* Privacy Tech Details Section */}
                <tr className="bg-slate-800/30 border-t border-cyan-500/10">
                  <td className="p-6 font-medium text-slate-400 sticky left-0 bg-inherit border-r border-cyan-500/10 z-10 align-top backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-500/60" />
                      Tech Details
                    </div>
                  </td>
                  {protocols.map(protocol => (
                    <td key={`${protocol.id}-tech`} className="p-6 align-top">
                      <ul className="space-y-2 text-left inline-block">
                        {protocol.privacyTechDetails.slice(0, 4).map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-300 group/item">
                            <div className="w-5 h-5 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0 mt-0.5 border border-cyan-500/20">
                              <Check className="w-3 h-3 text-cyan-400" />
                            </div>
                            <span className="text-xs font-medium leading-5">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                
                {/* Key Features Section */}
                <tr className="bg-slate-900/30 border-t border-cyan-500/10">
                  <td className="p-6 font-medium text-slate-400 sticky left-0 bg-inherit border-r border-cyan-500/10 z-10 align-top backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-cyan-500/60" />
                      Key Features
                    </div>
                  </td>
                  {protocols.map(protocol => (
                    <td key={`${protocol.id}-features`} className="p-6 align-top">
                      <ul className="space-y-2 text-left inline-block">
                        {protocol.keyFeatures.slice(0, 4).map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-300 group/item">
                            <div className="w-5 h-5 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
                              <Check className="w-3 h-3 text-emerald-400" />
                            </div>
                            <span className="text-xs font-medium leading-5">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Use Cases Section */}
                <tr className="bg-slate-800/30 border-t border-cyan-500/10">
                  <td className="p-6 font-medium text-slate-400 sticky left-0 bg-inherit border-r border-cyan-500/10 z-10 align-top backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-cyan-500/60" />
                      Use Cases
                    </div>
                  </td>
                  {protocols.map(protocol => (
                    <td key={`${protocol.id}-usecases`} className="p-6 align-top">
                      <ul className="space-y-2 text-left inline-block">
                        {protocol.useCases.map((useCase, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-300 group/item">
                            <div className="w-5 h-5 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0 mt-0.5 border border-violet-500/20">
                              <Check className="w-3 h-3 text-violet-400" />
                            </div>
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

export default ProtocolComparisonView;
