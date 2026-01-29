export interface CryptoCard {
  id: string;
  name: string;
  issuer: string;
  logo: string; // URL to logo image
  type: "Debit" | "Prepaid" | "Credit" | "Secured Credit";
  network: "Visa" | "Mastercard" | "Visa/Mastercard";
  cashbackMax: number;
  annualFee: string;
  fxFee: string;
  perks: string[];
  signupBonus: string;
  custody: "Custodial" | "Non-Custodial" | "Self-Custody";
  regions: string;
  officialLink: string;
  cardGradient: string; // Tailwind classes for gradient
  tierColor: string; // Tailwind text color class for accents
  metal: boolean; // Is it a metal card?
  
  // New comparison fields
  stakingRequired: string; // e.g. "None", "Yes (Tiers)"
  atmLimit: string; // e.g. "$200/mo Free"
  mobilePay: boolean; // Google/Apple Pay
  supportedAssets: string; // e.g. "50+ Cryptos"

  // User requested fields
  kyc: "Required" | "Light" | "None";
  supportedCurrencies: string[]; // e.g. ["USD", "EUR", "INR"]
  
  // Paid Listing Rank (1 = Gold, 2 = Silver, 3 = Bronze)
  rank?: number;
}

export type SortOption = "featured" | "cashbackHigh" | "nameAZ" | "newest";

export interface FilterState {
  search: string;
  cardType: string[];
  network: string[];
  custody: string[];
  minCashback: number;
  annualFee: "all" | "free" | "paid";
  fxFee: "all" | "zero";
  
  // New Filters
  region: string;
  kyc: string;
  currency: string;
}

// LLM Ecosystem Types
export interface LLMModel {
  id: string;
  name: string;
  tagline: string;
  primaryStrength: string;
  secondaryStrengths: string[];
  pricingModel: 'Free' | 'Freemium' | 'Subscription' | 'API Only';
  pricingDetails: string;
  logoUrl: string;
  provider: string;
  contextWindow: string;
  apiAvailable: boolean;
  specialFeatures: string[];
  bestFor: string[];
  gradient: string; // Tailwind gradient classes
  accentColor: string; // Tailwind text color
  officialLink: string;
}

export interface LLMUserNeed {
  id: string;
  label: string;
  icon: string;
  matchStrengths: string[];
  description: string;
}

export type LLMFilterState = {
  selectedNeed: string | null;
  searchQuery: string;
};

// Global definition for Google Analytics
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}