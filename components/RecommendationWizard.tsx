import React, { useState } from 'react';
import { CryptoCard } from '../types';
import { Globe, Wallet, ShieldCheck, ArrowRight, Check, X, Sparkles } from 'lucide-react';
import { cryptoCards } from '../data';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectCard: (id: string) => void;
}

type Step = 'region' | 'currency' | 'kyc' | 'result';

const RecommendationWizard: React.FC<Props> = ({ isOpen, onClose, onSelectCard }) => {
  const [step, setStep] = useState<Step>('region');
  const [preferences, setPreferences] = useState({
    region: '',
    currency: '',
    kyc: '',
  });

  const [matches, setMatches] = useState<CryptoCard[]>([]);

  if (!isOpen) return null;

  // Same smart matching logic as App.tsx to ensure consistency
  const checkRegionMatch = (cardRegions: string, selectedRegion: string) => {
    if (!selectedRegion || selectedRegion === 'Global') return true;
    
    const cardReg = cardRegions.toLowerCase();
    const selReg = selectedRegion.toLowerCase();
    
    if (cardReg.includes(selReg)) return true;
    
    const mappings: Record<string, string[]> = {
       'india': ['apac', 'asia', 'global', 'worldwide'],
       'nigeria': ['africa', 'global', 'worldwide'],
       'japan': ['apac', 'asia', 'global', 'worldwide'],
       'south korea': ['apac', 'asia', 'global', 'worldwide'],
       'vietnam': ['apac', 'asia', 'global', 'worldwide'],
       'indonesia': ['apac', 'asia', 'global', 'worldwide'],
       'philippines': ['apac', 'asia', 'global', 'worldwide'],
       'thailand': ['apac', 'asia', 'global', 'worldwide'],
       'singapore': ['apac', 'asia', 'global', 'worldwide'],
       'australia': ['apac', 'oceania', 'global', 'worldwide'],
       'china': ['apac', 'asia', 'global', 'worldwide'],
       
       'brazil': ['latam', 'south america', 'global', 'worldwide'],
       'argentina': ['latam', 'south america', 'global', 'worldwide'],
       'mexico': ['latam', 'north america', 'global', 'worldwide'],
       
       'canada': ['north america', 'global', 'worldwide'],
       
       'united kingdom': ['uk', 'europe', 'global', 'worldwide'],
       'germany': ['eea', 'europe', 'global', 'worldwide'],
       'france': ['eea', 'europe', 'global', 'worldwide'],
       'spain': ['eea', 'europe', 'global', 'worldwide'],
       'italy': ['eea', 'europe', 'global', 'worldwide'],
       'netherlands': ['eea', 'europe', 'global', 'worldwide'],
       'switzerland': ['europe', 'global', 'worldwide'],
       
       'turkey': ['europe', 'asia', 'global', 'worldwide'],
       'uae': ['mena', 'global', 'worldwide'],
       'saudi arabia': ['mena', 'global', 'worldwide'],
       'south africa': ['africa', 'global', 'worldwide'],
       
       'united states': ['us', 'usa'],
    };

    if (mappings[selReg]) {
       if (['united states', 'usa'].includes(selReg)) {
          return mappings[selReg].some(r => cardReg.includes(r));
       }
       return mappings[selReg].some(r => cardReg.includes(r));
    }

    return false;
  };

  const handleNext = (key: string, value: string) => {
    const newPrefs = { ...preferences, [key]: value };
    setPreferences(newPrefs);

    if (step === 'region') setStep('currency');
    if (step === 'currency') setStep('kyc');
    if (step === 'kyc') {
      // Calculate matches
      const results = cryptoCards.filter(card => {
        // Region Logic
        const regionMatch = checkRegionMatch(card.regions, newPrefs.region);

        // Currency Logic
        const currencyMatch = 
             card.supportedCurrencies.includes(newPrefs.currency) || 
             card.supportedCurrencies.includes('Global') ||
             (newPrefs.currency === 'INR' && card.regions.includes('Global')); 
        
        // KYC Logic
        const kycMatch = newPrefs.kyc === 'Any' ? true : card.kyc === newPrefs.kyc;

        return regionMatch && currencyMatch && kycMatch;
      });
      
      setMatches(results);
      setStep('result');
    }
  };

  const reset = () => {
    setStep('region');
    setPreferences({ region: '', currency: '', kyc: '' });
  };

  const renderStep = () => {
    switch (step) {
      case 'region':
        const countries = [
            { name: 'United States', flag: '🇺🇸' },
            { name: 'United Kingdom', flag: '🇬🇧' },
            { name: 'Canada', flag: '🇨🇦' },
            { name: 'Australia', flag: '🇦🇺' },
            { name: 'India', flag: '🇮🇳' },
            { name: 'Nigeria', flag: '🇳🇬' },
            { name: 'Brazil', flag: '🇧🇷' },
            { name: 'Germany', flag: '🇩🇪' },
            { name: 'France', flag: '🇫🇷' },
            { name: 'Japan', flag: '🇯🇵' },
            { name: 'South Korea', flag: '🇰🇷' },
            { name: 'Vietnam', flag: '🇻🇳' },
            { name: 'Indonesia', flag: '🇮🇩' },
            { name: 'Turkey', flag: '🇹🇷' },
            { name: 'Mexico', flag: '🇲🇽' },
            { name: 'Argentina', flag: '🇦🇷' },
            { name: 'South Africa', flag: '🇿🇦' },
            { name: 'UAE', flag: '🇦🇪' },
            { name: 'Singapore', flag: '🇸🇬' },
            { name: 'Philippines', flag: '🇵🇭' }
        ];

        return (
          <div className="space-y-4 animate-in slide-in-from-right duration-300 flex flex-col h-full">
            <div className="shrink-0">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Where do you live?</h3>
                <p className="text-sm text-slate-500 mb-4">Select your country to find available cards.</p>
            </div>
            
            <div className="overflow-y-auto custom-scrollbar flex-1 pr-2">
                <div className="grid grid-cols-2 gap-3 pb-2">
                {countries.map(c => (
                    <button
                    key={c.name}
                    onClick={() => handleNext('region', c.name)}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-lime-400 hover:bg-lime-50 dark:hover:bg-lime-900/10 transition-all text-left group flex items-center gap-3"
                    >
                      <span className="text-2xl">{c.flag}</span>
                      <span className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-lime-600 dark:group-hover:text-lime-400">{c.name}</span>
                    </button>
                ))}
                    <button
                        onClick={() => handleNext('region', 'Global')}
                        className="p-3 col-span-2 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-lime-400 hover:bg-lime-50 dark:hover:bg-lime-900/10 transition-all text-center group flex items-center justify-center gap-2"
                    >
                        <span className="text-xl">🌍</span>
                        <span className="font-bold text-slate-500 dark:text-slate-400 group-hover:text-lime-600 dark:group-hover:text-lime-400">Other / Global</span>
                    </button>
                </div>
            </div>
          </div>
        );
      case 'currency':
        return (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Primary Currency?</h3>
            <div className="grid grid-cols-2 gap-3">
              {['USD', 'EUR', 'GBP', 'INR', 'BRL', 'NGN', 'JPY', 'KRW'].map(c => (
                <button
                  key={c}
                  onClick={() => handleNext('currency', c)}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-lime-400 hover:bg-lime-50 dark:hover:bg-lime-900/10 transition-all text-left group"
                >
                   <span className="font-bold text-slate-900 dark:text-white group-hover:text-lime-600 dark:group-hover:text-lime-400">{c}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 'kyc':
        return (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Privacy Preference</h3>
            <div className="space-y-3">
               <button onClick={() => handleNext('kyc', 'Required')} className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-lime-400 hover:bg-lime-50 dark:hover:bg-lime-900/10 text-left">
                  <span className="font-bold block text-slate-900 dark:text-white">Standard (KYC Required)</span>
                  <span className="text-xs text-slate-500">Best limits & perks. Identity verification required.</span>
               </button>
               <button onClick={() => handleNext('kyc', 'Light')} className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-lime-400 hover:bg-lime-50 dark:hover:bg-lime-900/10 text-left">
                  <span className="font-bold block text-slate-900 dark:text-white">Light / No KYC</span>
                  <span className="text-xs text-slate-500">Lower limits, higher privacy. Often decentralized.</span>
               </button>
               <button onClick={() => handleNext('kyc', 'Any')} className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-lime-400 hover:bg-lime-50 dark:hover:bg-lime-900/10 text-left">
                  <span className="font-bold block text-slate-900 dark:text-white">I don't care</span>
               </button>
            </div>
          </div>
        );
      case 'result':
        return (
           <div className="animate-in zoom-in duration-300 h-full flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                 <Sparkles className="w-5 h-5 text-lime-400 fill-lime-400" />
                 We found {matches.length} matches
              </h3>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
                 {matches.length > 0 ? matches.map(card => (
                    <div key={card.id} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center gap-4 group cursor-pointer hover:ring-2 hover:ring-lime-400 transition-all" onClick={() => { onSelectCard(card.id); onClose(); }}>
                       <img src={card.logo} className="w-10 h-10 rounded-full" />
                       <div className="flex-1">
                          <h4 className="font-bold text-slate-900 dark:text-white">{card.name}</h4>
                          <p className="text-xs text-slate-500">{card.issuer} • {card.kyc === 'Required' ? 'KYC' : 'No KYC'}</p>
                       </div>
                       <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-lime-400" />
                    </div>
                 )) : (
                    <div className="text-center py-10">
                       <p className="text-slate-500">No exact matches found for these strict criteria.</p>
                       <button onClick={reset} className="mt-4 text-lime-600 font-bold hover:underline">Try Again</button>
                    </div>
                 )}
              </div>
              
              <button onClick={reset} className="mt-4 w-full py-3 bg-slate-200 dark:bg-slate-700 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600">Start Over</button>
           </div>
        )
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
       <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
       <div className="relative w-full max-w-md bg-white dark:bg-[#151F2E] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] h-[600px] ring-1 ring-white/10">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-[#1A2332] shrink-0">
             <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-lime-500" />
                <span className="font-bold text-slate-900 dark:text-white">Card Wizard</span>
             </div>
             <button onClick={onClose}><X className="w-5 h-5 text-slate-400" /></button>
          </div>
          
          <div className="flex-1 p-6 flex flex-col overflow-hidden">
             {renderStep()}
          </div>
          
          <div className="p-4 bg-slate-50 dark:bg-[#1A2332] flex justify-center gap-1 shrink-0">
             <div className={`h-1.5 w-1.5 rounded-full transition-colors ${step === 'region' ? 'bg-lime-400' : 'bg-slate-300 dark:bg-slate-700'}`} />
             <div className={`h-1.5 w-1.5 rounded-full transition-colors ${step === 'currency' ? 'bg-lime-400' : 'bg-slate-300 dark:bg-slate-700'}`} />
             <div className={`h-1.5 w-1.5 rounded-full transition-colors ${step === 'kyc' ? 'bg-lime-400' : 'bg-slate-300 dark:bg-slate-700'}`} />
          </div>
       </div>
    </div>
  );
};

export default RecommendationWizard;