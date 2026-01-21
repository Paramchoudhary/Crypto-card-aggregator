import { PrivacyProtocol } from './privacyTypes';

// Privacy Protocols Data - Completely decoupled from crypto cards data
export const privacyProtocols: PrivacyProtocol[] = [
  {
    id: 'zcash',
    name: 'Zcash',
    ticker: 'ZEC',
    logo: 'https://cryptologos.cc/logos/zcash-zec-logo.png',
    tagline: 'Privacy-protecting digital currency',
    
    privacyTech: 'zk-SNARKs',
    privacyTechDetails: [
      'Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge',
      'Shielded transactions hide sender, receiver, and amount',
      'Two address types: transparent (t-addr) and shielded (z-addr)',
      'Turnstile mechanism ensures supply integrity',
      'Sapling upgrade improved performance and memory usage',
      'Orchard shielded pool with enhanced security'
    ],
    
    anonymitySet: 'High',
    defaultPrivacy: 'Opt-in',
    transactionSpeed: '~75 seconds',
    averageFees: '< $0.01',
    
    consensus: 'Proof of Work (Equihash)',
    launchYear: 2016,
    marketCap: '$500M+',
    website: 'https://z.cash',
    
    accentColor: 'text-yellow-400',
    gradientFrom: 'from-yellow-500',
    gradientTo: 'to-orange-600',
    
    keyFeatures: [
      'Shielded addresses for complete privacy',
      'Selective disclosure via viewing keys',
      'Memo fields for encrypted messages',
      'Regulatory compliance via disclosure options',
      'Cross-chain bridges available',
      'Hardware wallet support'
    ],
    
    useCases: [
      'Private peer-to-peer payments',
      'Business transactions requiring confidentiality',
      'Donations and charitable giving',
      'Salary payments in crypto'
    ]
  },
  {
    id: 'monero',
    name: 'Monero',
    ticker: 'XMR',
    logo: 'https://cryptologos.cc/logos/monero-xmr-logo.png',
    tagline: 'Private, decentralized cryptocurrency',
    
    privacyTech: 'Ring Signatures & RingCT',
    privacyTechDetails: [
      'Ring Signatures obscure sender identity',
      'Ring Confidential Transactions (RingCT) hide amounts',
      'Stealth addresses provide one-time destinations',
      'Dandelion++ protocol hides transaction origin IP',
      'Bulletproofs for efficient range proofs',
      'ASIC-resistant RandomX mining algorithm'
    ],
    
    anonymitySet: 'High',
    defaultPrivacy: 'Mandatory',
    transactionSpeed: '~2 minutes',
    averageFees: '< $0.01',
    
    consensus: 'Proof of Work (RandomX)',
    launchYear: 2014,
    marketCap: '$3B+',
    website: 'https://getmonero.org',
    
    accentColor: 'text-orange-500',
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-red-600',
    
    keyFeatures: [
      'Privacy by default - all transactions private',
      'Fungibility - all XMR is equal',
      'Dynamic block size',
      'Tail emission for security',
      'Active development community',
      'Atomic swaps with Bitcoin'
    ],
    
    useCases: [
      'Maximum privacy transactions',
      'Fungible store of value',
      'Private commerce',
      'Circumventing financial surveillance'
    ]
  },
  {
    id: 'dash',
    name: 'Dash',
    ticker: 'DASH',
    logo: 'https://cryptologos.cc/logos/dash-dash-logo.png',
    tagline: 'Digital Cash for instant transactions',
    
    privacyTech: 'PrivateSend (CoinJoin)',
    privacyTechDetails: [
      'CoinJoin implementation via masternode network',
      'Multiple mixing rounds for enhanced privacy',
      'Denominated amounts for uniformity',
      'Decentralized mixing through masternodes',
      'Optional privacy - transparent by default',
      'ChainLocks for instant transaction finality'
    ],
    
    anonymitySet: 'Medium',
    defaultPrivacy: 'Opt-in',
    transactionSpeed: '~1-2 seconds (InstantSend)',
    averageFees: '< $0.01',
    
    consensus: 'Proof of Work + Masternodes',
    launchYear: 2014,
    marketCap: '$400M+',
    website: 'https://dash.org',
    
    accentColor: 'text-blue-400',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-blue-700',
    
    keyFeatures: [
      'InstantSend for immediate confirmations',
      'PrivateSend for optional privacy',
      'Self-funding treasury system',
      'Masternode governance',
      'Mobile-friendly with DashDirect',
      'Wide merchant adoption'
    ],
    
    useCases: [
      'Fast retail payments',
      'Optional private transactions',
      'Remittances',
      'Point-of-sale systems'
    ]
  },
  {
    id: 'railgun',
    name: 'Railgun',
    ticker: 'RAIL',
    logo: 'https://cryptologos.cc/logos/railgun-rail-logo.png',
    tagline: 'Privacy system for Ethereum & EVM chains',
    
    privacyTech: 'zk-SNARKs on EVM',
    privacyTechDetails: [
      'Zero-knowledge proofs on Ethereum',
      'Shield any ERC-20 token',
      'Private DeFi interactions',
      'Supports NFTs and complex transactions',
      'Cross-chain privacy via bridges',
      'Groth16 proving system'
    ],
    
    anonymitySet: 'High',
    defaultPrivacy: 'Opt-in',
    transactionSpeed: '~15 seconds (Ethereum)',
    averageFees: 'Variable (gas-dependent)',
    
    consensus: 'Inherits from host chain',
    launchYear: 2021,
    marketCap: '$50M+',
    website: 'https://railgun.org',
    
    accentColor: 'text-purple-400',
    gradientFrom: 'from-purple-600',
    gradientTo: 'to-indigo-700',
    
    keyFeatures: [
      'Privacy for any ERC-20 token',
      'Private DeFi swaps and transfers',
      'Works on Ethereum, BSC, Polygon, Arbitrum',
      'Mobile wallet support',
      'Browser extension available',
      'Relayer network for metadata protection'
    ],
    
    useCases: [
      'Private DeFi trading',
      'Shielded token transfers',
      'Private NFT transactions',
      'Anonymous governance participation'
    ]
  },
  {
    id: 'oasis-network',
    name: 'Oasis Network',
    ticker: 'ROSE',
    logo: 'https://cryptologos.cc/logos/oasis-network-rose-logo.png',
    tagline: 'Privacy-enabled blockchain for Web3',
    
    privacyTech: 'Trusted Execution Environments (TEE)',
    privacyTechDetails: [
      'Sapphire ParaTime for confidential smart contracts',
      'Intel SGX secure enclaves',
      'Data tokenization framework',
      'Confidential compute layer',
      'ParaTime architecture for scalability',
      'Cipher ParaTime for confidential DeFi'
    ],
    
    anonymitySet: 'Medium',
    defaultPrivacy: 'Opt-in',
    transactionSpeed: '~6 seconds',
    averageFees: '< $0.01',
    
    consensus: 'Proof of Stake',
    launchYear: 2020,
    marketCap: '$500M+',
    website: 'https://oasisprotocol.org',
    
    accentColor: 'text-cyan-400',
    gradientFrom: 'from-cyan-500',
    gradientTo: 'to-blue-600',
    
    keyFeatures: [
      'Confidential smart contracts',
      'Data tokenization and monetization',
      'EVM compatible (Sapphire)',
      'Enterprise partnerships',
      'Scalable ParaTime architecture',
      'Privacy-preserving data analytics'
    ],
    
    useCases: [
      'Confidential DeFi applications',
      'Private data marketplaces',
      'Healthcare data sharing',
      'Enterprise confidential compute'
    ]
  },
  {
    id: 'secret-network',
    name: 'Secret Network',
    ticker: 'SCRT',
    logo: 'https://cryptologos.cc/logos/secret-scrt-logo.png',
    tagline: 'Blockchain with programmable privacy',
    
    privacyTech: 'Trusted Execution Environments (TEE)',
    privacyTechDetails: [
      'Secret Contracts for private smart contracts',
      'Intel SGX encrypted computation',
      'Viewing keys for selective disclosure',
      'SNIP-20 private token standard',
      'IBC enabled for Cosmos ecosystem',
      'Confidential NFTs (SNIP-721)'
    ],
    
    anonymitySet: 'High',
    defaultPrivacy: 'Mandatory',
    transactionSpeed: '~6 seconds',
    averageFees: '< $0.05',
    
    consensus: 'Proof of Stake (Tendermint)',
    launchYear: 2020,
    marketCap: '$150M+',
    website: 'https://scrt.network',
    
    accentColor: 'text-gray-300',
    gradientFrom: 'from-slate-600',
    gradientTo: 'to-slate-800',
    
    keyFeatures: [
      'Private by default smart contracts',
      'Cross-chain via IBC protocol',
      'Secret DeFi ecosystem',
      'Private NFTs and gaming',
      'Bridges to Ethereum and BSC',
      'Active developer grants program'
    ],
    
    useCases: [
      'Private decentralized exchanges',
      'Confidential voting systems',
      'Private NFT marketplaces',
      'Secure messaging applications'
    ]
  },
  {
    id: 'aleo',
    name: 'Aleo',
    ticker: 'ALEO',
    logo: 'https://cryptologos.cc/logos/aleo-aleo-logo.png',
    tagline: 'Platform for fully private applications',
    
    privacyTech: 'zk-SNARKs (Marlin)',
    privacyTechDetails: [
      'Zero-knowledge by default',
      'Marlin universal setup for SNARKs',
      'Leo programming language for ZK apps',
      'snarkVM for off-chain computation',
      'AleoBFT consensus mechanism',
      'Record-based state model'
    ],
    
    anonymitySet: 'High',
    defaultPrivacy: 'Mandatory',
    transactionSpeed: '~15 seconds',
    averageFees: 'Variable',
    
    consensus: 'AleoBFT (PoS + PoW hybrid)',
    launchYear: 2024,
    marketCap: '$1B+',
    website: 'https://aleo.org',
    
    accentColor: 'text-emerald-400',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-teal-600',
    
    keyFeatures: [
      'Full-stack privacy platform',
      'Developer-friendly Leo language',
      'Decentralized prover network',
      'Programs stored privately on-chain',
      'Zero-knowledge machine learning',
      'WebAssembly support'
    ],
    
    useCases: [
      'Private identity verification',
      'Confidential DeFi protocols',
      'Private gaming and gambling',
      'Enterprise data sharing'
    ]
  },
  {
    id: 'iron-fish',
    name: 'Iron Fish',
    ticker: 'IRON',
    logo: 'https://pbs.twimg.com/profile_images/1634953049516625920/7nsTOjxQ_400x400.png',
    tagline: 'Private, anonymous cryptocurrency',
    
    privacyTech: 'zk-SNARKs (Sapling)',
    privacyTechDetails: [
      'Every transaction is private by default',
      'Sapling-based zero-knowledge proofs',
      'Encrypted memo fields',
      'View keys for compliance',
      'Multi-asset support',
      'Custom assets with full privacy'
    ],
    
    anonymitySet: 'High',
    defaultPrivacy: 'Mandatory',
    transactionSpeed: '~60 seconds',
    averageFees: '< $0.01',
    
    consensus: 'Proof of Work',
    launchYear: 2023,
    marketCap: '$50M+',
    website: 'https://ironfish.network',
    
    accentColor: 'text-blue-300',
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-indigo-800',
    
    keyFeatures: [
      'Privacy by default',
      'Custom asset creation with privacy',
      'Bridge to Ethereum ecosystem',
      'View keys for auditing',
      'CPU-friendly mining',
      'Active community incentives'
    ],
    
    useCases: [
      'Private peer-to-peer payments',
      'Anonymous asset creation',
      'Compliance-friendly privacy',
      'Private stablecoin transfers'
    ]
  },
  {
    id: 'aztec-network',
    name: 'Aztec Network',
    ticker: 'N/A',
    logo: 'https://pbs.twimg.com/profile_images/1692242391653826560/TFJlZNRb_400x400.jpg',
    tagline: 'Encrypted Ethereum with privacy rollups',
    
    privacyTech: 'zk-SNARKs (PLONK/Noir)',
    privacyTechDetails: [
      'Privacy-first zkRollup on Ethereum',
      'PLONK proving system',
      'Noir programming language',
      'Aztec Connect for private DeFi',
      'Private smart contracts',
      'Hybrid public/private state'
    ],
    
    anonymitySet: 'High',
    defaultPrivacy: 'Mandatory',
    transactionSpeed: '~10 minutes (batch)',
    averageFees: 'Gas efficient (rollup)',
    
    consensus: 'Inherits Ethereum security',
    launchYear: 2022,
    marketCap: 'Pre-token',
    website: 'https://aztec.network',
    
    accentColor: 'text-violet-400',
    gradientFrom: 'from-violet-600',
    gradientTo: 'to-purple-800',
    
    keyFeatures: [
      'Private zkRollup on Ethereum',
      'Noir language for ZK development',
      'Private DeFi via Aztec Connect',
      'Encrypted state transitions',
      'Account abstraction built-in',
      'Composable privacy'
    ],
    
    useCases: [
      'Private Ethereum transactions',
      'Confidential DeFi interactions',
      'Private token transfers',
      'Anonymous voting on Ethereum'
    ]
  },
  {
    id: 'mina-protocol',
    name: 'Mina Protocol',
    ticker: 'MINA',
    logo: 'https://cryptologos.cc/logos/mina-mina-logo.png',
    tagline: 'The world\'s lightest blockchain',
    
    privacyTech: 'zk-SNARKs (Kimchi)',
    privacyTechDetails: [
      'Constant 22KB blockchain size',
      'Recursive zero-knowledge proofs',
      'zkApps for private smart contracts',
      'SnarkyJS for TypeScript development',
      'Off-chain computation with on-chain verification',
      'Pickles proving system'
    ],
    
    anonymitySet: 'Medium',
    defaultPrivacy: 'Opt-in',
    transactionSpeed: '~3 minutes',
    averageFees: '< $0.01',
    
    consensus: 'Ouroboros Samasika (PoS)',
    launchYear: 2021,
    marketCap: '$700M+',
    website: 'https://minaprotocol.com',
    
    accentColor: 'text-pink-400',
    gradientFrom: 'from-pink-500',
    gradientTo: 'to-rose-600',
    
    keyFeatures: [
      '22KB constant blockchain size',
      'zkApps for decentralized applications',
      'TypeScript-based development',
      'Private credential verification',
      'Bridged to Ethereum',
      'True decentralization via light nodes'
    ],
    
    useCases: [
      'Private credential verification',
      'Decentralized identity',
      'Privacy-preserving oracles',
      'Lightweight blockchain access'
    ]
  }
];
