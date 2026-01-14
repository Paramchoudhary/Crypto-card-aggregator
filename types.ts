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
}

export type SortOption = "cashbackHigh" | "nameAZ" | "newest";

export interface FilterState {
  search: string;
  cardType: string[];
  network: string[];
  custody: string[];
  minCashback: number;
  annualFee: "all" | "free" | "paid";
  fxFee: "all" | "zero";
}