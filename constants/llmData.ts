import { LLMModel } from '../types';

export const llmData: LLMModel[] = [
  {
    id: 'claude',
    name: 'Claude',
    tagline: 'The AI assistant built to be helpful, harmless, and honest',
    primaryStrength: 'Coding',
    secondaryStrengths: ['Long Context', 'Creative Writing', 'Analysis', 'Safety'],
    pricingModel: 'Freemium',
    pricingDetails: 'Free tier available, Pro at $20/mo, API pricing varies by model',
    logoUrl: 'https://unavatar.io/twitter/AnthropicAI',
    provider: 'Anthropic',
    contextWindow: '200K tokens',
    apiAvailable: true,
    specialFeatures: ['Constitutional AI', 'Artifacts', 'Computer Use', 'Extended Thinking'],
    bestFor: ['Code generation', 'Technical writing', 'Research', 'Long documents'],
    gradient: 'from-[#D97706] to-[#B45309]',
    accentColor: 'text-amber-300',
    officialLink: 'https://claude.ai',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    tagline: 'The AI that started it all - versatile and widely integrated',
    primaryStrength: 'General Purpose',
    secondaryStrengths: ['Plugins', 'Image Generation', 'Voice', 'Web Browsing'],
    pricingModel: 'Freemium',
    pricingDetails: 'Free tier with GPT-4o mini, Plus at $20/mo, Pro at $200/mo',
    logoUrl: 'https://unavatar.io/twitter/OpenAI',
    provider: 'OpenAI',
    contextWindow: '128K tokens',
    apiAvailable: true,
    specialFeatures: ['DALL-E Integration', 'GPT Store', 'Voice Mode', 'Memory'],
    bestFor: ['General tasks', 'Image creation', 'Plugins ecosystem', 'Accessibility'],
    gradient: 'from-[#10A37F] to-[#0D8A6A]',
    accentColor: 'text-emerald-300',
    officialLink: 'https://chat.openai.com',
  },
  {
    id: 'kimi',
    name: 'Kimi',
    tagline: 'The long-context champion from Moonshot AI',
    primaryStrength: 'Long Context',
    secondaryStrengths: ['Document Analysis', 'Chinese Language', 'Research'],
    pricingModel: 'Free',
    pricingDetails: 'Free to use with generous limits',
    logoUrl: 'https://unavatar.io/twitter/Moonaboratory',
    provider: 'Moonshot AI',
    contextWindow: '2M tokens',
    apiAvailable: true,
    specialFeatures: ['Ultra-long context', 'File analysis', 'Web search', 'Chinese optimization'],
    bestFor: ['Long document analysis', 'Research papers', 'Chinese content', 'Book summaries'],
    gradient: 'from-[#6366F1] to-[#4F46E5]',
    accentColor: 'text-indigo-300',
    officialLink: 'https://kimi.moonshot.cn',
  },
  {
    id: 'grok',
    name: 'Grok',
    tagline: 'Real-time knowledge with a rebellious personality',
    primaryStrength: 'Real-time Search',
    secondaryStrengths: ['X/Twitter Integration', 'Current Events', 'Humor'],
    pricingModel: 'Subscription',
    pricingDetails: 'Included with X Premium+ at $16/mo',
    logoUrl: 'https://unavatar.io/twitter/xlogohdx',
    provider: 'xAI',
    contextWindow: '128K tokens',
    apiAvailable: true,
    specialFeatures: ['Real-time X data', 'Image understanding', 'Uncensored mode', 'DeepSearch'],
    bestFor: ['Current events', 'Social media analysis', 'Trending topics', 'Unfiltered responses'],
    gradient: 'from-[#000000] to-[#1A1A1A]',
    accentColor: 'text-white',
    officialLink: 'https://grok.x.ai',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    tagline: 'Google\'s multimodal AI powerhouse',
    primaryStrength: 'Multimodal',
    secondaryStrengths: ['Google Integration', 'Video Understanding', 'Code'],
    pricingModel: 'Freemium',
    pricingDetails: 'Free tier available, Advanced at $19.99/mo with Google One',
    logoUrl: 'https://unavatar.io/twitter/GoogleAI',
    provider: 'Google',
    contextWindow: '1M tokens',
    apiAvailable: true,
    specialFeatures: ['Native multimodal', 'Google Workspace integration', 'Gems', 'Deep Research'],
    bestFor: ['Multimodal tasks', 'Google ecosystem users', 'Video analysis', 'Research'],
    gradient: 'from-[#4285F4] via-[#EA4335] to-[#FBBC04]',
    accentColor: 'text-blue-200',
    officialLink: 'https://gemini.google.com',
  },
];

// Define user needs for the smart filter
export const userNeeds = [
  {
    id: 'coding',
    label: 'I need help with coding',
    icon: 'Code',
    matchStrengths: ['Coding'],
    description: 'Code generation, debugging, and technical assistance'
  },
  {
    id: 'realtime',
    label: 'I need real-time information',
    icon: 'Zap',
    matchStrengths: ['Real-time Search'],
    description: 'Current events, live data, and trending topics'
  },
  {
    id: 'long-docs',
    label: 'I work with long documents',
    icon: 'FileText',
    matchStrengths: ['Long Context'],
    description: 'Books, research papers, and lengthy content'
  },
  {
    id: 'multimodal',
    label: 'I need image/video understanding',
    icon: 'Image',
    matchStrengths: ['Multimodal', 'Image Generation'],
    description: 'Visual content analysis and creation'
  },
  {
    id: 'general',
    label: 'I need a versatile all-rounder',
    icon: 'Globe',
    matchStrengths: ['General Purpose'],
    description: 'Everyday tasks and broad capabilities'
  },
  {
    id: 'creative',
    label: 'I need creative writing help',
    icon: 'Pen',
    matchStrengths: ['Creative Writing', 'Humor'],
    description: 'Stories, content, and creative projects'
  },
];

// Comparison attributes for the comparison view
export const comparisonAttributes = [
  { key: 'provider', label: 'Provider', icon: 'Building' },
  { key: 'primaryStrength', label: 'Primary Strength', icon: 'Target' },
  { key: 'contextWindow', label: 'Context Window', icon: 'Layers' },
  { key: 'pricingModel', label: 'Pricing', icon: 'DollarSign' },
  { key: 'apiAvailable', label: 'API Available', icon: 'Code', type: 'boolean' },
];
