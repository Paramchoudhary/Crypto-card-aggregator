// Privacy Protocol Types - Completely decoupled from CryptoCard types

export interface PrivacyProtocol {
  id: string;
  name: string;
  ticker: string;
  logo: string;
  tagline: string;
  
  // Privacy Technology Details
  privacyTech: string; // e.g., "zk-SNARKs", "Ring Signatures", etc.
  privacyTechDetails: string[]; // More detailed breakdown of tech
  
  // Comparison Matrix Fields
  anonymitySet: 'High' | 'Medium' | 'Low';
  defaultPrivacy: 'Mandatory' | 'Opt-in';
  transactionSpeed: string; // e.g., "~75 seconds"
  averageFees: string; // e.g., "< $0.01"
  
  // Additional Info
  consensus: string; // e.g., "Proof of Work", "Proof of Stake"
  launchYear: number;
  marketCap?: string;
  website: string;
  
  // UI Styling
  accentColor: string; // Tailwind color class
  gradientFrom: string;
  gradientTo: string;
  
  // Key Features
  keyFeatures: string[];
  
  // Use Cases
  useCases: string[];
}

export type PrivacySortOption = 'featured' | 'nameAZ' | 'launchYear' | 'anonymityHigh';

export interface PrivacyFilterState {
  search: string;
  privacyTech: string[];
  anonymitySet: string[];
  defaultPrivacy: string[];
}
