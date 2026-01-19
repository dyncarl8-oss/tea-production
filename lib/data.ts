// ============================================
// MOCK DATA STORE
// Replace with database integration later
// ============================================

import type {
  Symptom,
  HerbalBlend,
  SymptomBlendMapping,
  Course,
  Lesson,
  MarketingAsset,
  Campaign,
  CommissionSettings,
} from './types';

// ============================================
// SYMPTOM-TO-STEMS DATA
// ============================================

export const symptoms: Symptom[] = [
  // Stress Category
  {
    id: 'stress-anxiety',
    name: 'Stress & Anxiety',
    category: 'stress',
    description: 'Feeling overwhelmed, anxious, or constantly on edge',
    icon: '🧘',
  },
  {
    id: 'stress-tension',
    name: 'Muscle Tension',
    category: 'stress',
    description: 'Tightness in shoulders, neck, or body',
    icon: '💆',
  },
  // Sleep Category
  {
    id: 'sleep-insomnia',
    name: 'Difficulty Sleeping',
    category: 'sleep',
    description: 'Trouble falling or staying asleep',
    icon: '🌙',
  },
  {
    id: 'sleep-restless',
    name: 'Restless Sleep',
    category: 'sleep',
    description: 'Waking up tired or not feeling rested',
    icon: '😴',
  },
  // Digestion Category
  {
    id: 'digestion-bloating',
    name: 'Bloating & Discomfort',
    category: 'digestion',
    description: 'Feeling bloated or digestive discomfort after meals',
    icon: '🫃',
  },
  {
    id: 'digestion-sluggish',
    name: 'Sluggish Digestion',
    category: 'digestion',
    description: 'Slow digestion or irregular bowel movements',
    icon: '🌿',
  },
  // Energy Category
  {
    id: 'energy-fatigue',
    name: 'Low Energy & Fatigue',
    category: 'energy',
    description: 'Feeling tired throughout the day',
    icon: '⚡',
  },
  {
    id: 'energy-afternoon',
    name: 'Afternoon Slump',
    category: 'energy',
    description: 'Energy crash in the afternoon',
    icon: '☀️',
  },
  // Immunity Category
  {
    id: 'immunity-weak',
    name: 'Weak Immunity',
    category: 'immunity',
    description: 'Getting sick often or recovering slowly',
    icon: '🛡️',
  },
  {
    id: 'immunity-seasonal',
    name: 'Seasonal Wellness',
    category: 'immunity',
    description: 'Need extra support during changing seasons',
    icon: '🍂',
  },
  // Focus Category
  {
    id: 'focus-brain',
    name: 'Brain Fog',
    category: 'focus',
    description: 'Difficulty concentrating or thinking clearly',
    icon: '🧠',
  },
  {
    id: 'focus-memory',
    name: 'Memory Support',
    category: 'focus',
    description: 'Want to improve memory and mental clarity',
    icon: '💡',
  },
  // Beauty Category
  {
    id: 'beauty-skin',
    name: 'Skin Health',
    category: 'beauty',
    description: 'Want clearer, more radiant skin',
    icon: '✨',
  },
  {
    id: 'beauty-hair',
    name: 'Hair & Nails',
    category: 'beauty',
    description: 'Strengthen hair and nails naturally',
    icon: '💇',
  },
  // Detox Category
  {
    id: 'detox-cleanse',
    name: 'Gentle Cleanse',
    category: 'detox',
    description: 'Support your body\'s natural detox process',
    icon: '🍃',
  },
  {
    id: 'detox-liver',
    name: 'Liver Support',
    category: 'detox',
    description: 'Support liver health and function',
    icon: '💚',
  },
];

export const herbalBlends: HerbalBlend[] = [
  {
    id: 'calm-shores',
    name: 'Calm Shores',
    tagline: 'Find your peace in every sip',
    description: 'A soothing blend designed to melt away stress and bring tranquility to your day. Inspired by the gentle rhythm of Caribbean waves.',
    benefits: [
      'Reduces stress and anxiety naturally',
      'Promotes a sense of calm',
      'Supports relaxation without drowsiness',
      'Gentle on the stomach',
    ],
    ingredients: [
      { name: 'Chamomile', benefit: 'Calms the nervous system', origin: 'Jamaica' },
      { name: 'Lemon Balm', benefit: 'Reduces anxiety', origin: 'Caribbean' },
      { name: 'Passionflower', benefit: 'Promotes relaxation', origin: 'Trinidad' },
      { name: 'Lavender', benefit: 'Soothes the mind', origin: 'Grenada' },
    ],
    rituals: [
      'Brew for 5-7 minutes in hot water',
      'Take deep breaths while steeping',
      'Enjoy in a quiet moment',
      'Best enjoyed in the evening',
    ],
    image: '/blends/calm-shores.jpg',
    price: 24.99,
    productUrl: 'https://yourstore.com/calm-shores',
    relatedSymptoms: ['stress-anxiety', 'stress-tension', 'sleep-restless'],
  },
  {
    id: 'dream-tide',
    name: 'Dream Tide',
    tagline: 'Drift into peaceful slumber',
    description: 'A deeply relaxing nighttime blend to help you achieve restful, restorative sleep. Wake up refreshed and renewed.',
    benefits: [
      'Promotes deep, restful sleep',
      'Helps you fall asleep faster',
      'Reduces nighttime waking',
      'Non-habit forming',
    ],
    ingredients: [
      { name: 'Valerian Root', benefit: 'Natural sleep aid', origin: 'Jamaica' },
      { name: 'Chamomile', benefit: 'Relaxes the body', origin: 'Caribbean' },
      { name: 'Hops', benefit: 'Promotes drowsiness', origin: 'Barbados' },
      { name: 'Skullcap', benefit: 'Calms racing thoughts', origin: 'Trinidad' },
    ],
    rituals: [
      'Steep for 10 minutes before bed',
      'Dim the lights while drinking',
      'Put away screens 30 minutes prior',
      'Practice gratitude while sipping',
    ],
    image: '/blends/dream-tide.jpg',
    price: 27.99,
    productUrl: 'https://yourstore.com/dream-tide',
    relatedSymptoms: ['sleep-insomnia', 'sleep-restless', 'stress-anxiety'],
  },
  {
    id: 'island-vitality',
    name: 'Island Vitality',
    tagline: 'Energize your spirit naturally',
    description: 'A revitalizing blend that provides sustained energy without the crash. Powered by Caribbean herbs.',
    benefits: [
      'Boosts natural energy levels',
      'No jitters or crash',
      'Supports mental alertness',
      'Rich in antioxidants',
    ],
    ingredients: [
      { name: 'Moringa', benefit: 'Nutrient-rich energy', origin: 'Jamaica' },
      { name: 'Green Tea', benefit: 'Sustained energy boost', origin: 'Caribbean' },
      { name: 'Ginger', benefit: 'Invigorating warmth', origin: 'Trinidad' },
      { name: 'Lemongrass', benefit: 'Refreshing clarity', origin: 'Grenada' },
    ],
    rituals: [
      'Best enjoyed in the morning',
      'Steep for 3-5 minutes',
      'Pair with intention setting',
      'Take a mindful moment before your day',
    ],
    image: '/blends/island-vitality.jpg',
    price: 22.99,
    productUrl: 'https://yourstore.com/island-vitality',
    relatedSymptoms: ['energy-fatigue', 'energy-afternoon', 'focus-brain'],
  },
  {
    id: 'belly-breeze',
    name: 'Belly Breeze',
    tagline: 'Soothe and support your gut',
    description: 'A gentle digestive blend that calms the stomach and supports healthy digestion after meals.',
    benefits: [
      'Relieves bloating and discomfort',
      'Supports healthy digestion',
      'Calms the stomach',
      'Aids nutrient absorption',
    ],
    ingredients: [
      { name: 'Peppermint', benefit: 'Soothes the stomach', origin: 'Jamaica' },
      { name: 'Ginger', benefit: 'Aids digestion', origin: 'Caribbean' },
      { name: 'Fennel', benefit: 'Reduces bloating', origin: 'Barbados' },
      { name: 'Licorice Root', benefit: 'Coats and protects', origin: 'Trinidad' },
    ],
    rituals: [
      'Enjoy after meals',
      'Steep for 5-7 minutes',
      'Sip slowly and mindfully',
      'Great warm or iced',
    ],
    image: '/blends/belly-breeze.jpg',
    price: 21.99,
    productUrl: 'https://yourstore.com/belly-breeze',
    relatedSymptoms: ['digestion-bloating', 'digestion-sluggish'],
  },
  {
    id: 'shield-of-roots',
    name: 'Shield of Roots',
    tagline: 'Strengthen your natural defenses',
    description: 'A powerful immunity blend crafted from traditional Caribbean roots and herbs.',
    benefits: [
      'Boosts immune function',
      'Rich in vitamin C',
      'Supports seasonal wellness',
      'Anti-inflammatory properties',
    ],
    ingredients: [
      { name: 'Echinacea', benefit: 'Immune support', origin: 'Jamaica' },
      { name: 'Elderberry', benefit: 'Antioxidant power', origin: 'Caribbean' },
      { name: 'Turmeric', benefit: 'Anti-inflammatory', origin: 'Trinidad' },
      { name: 'Hibiscus', benefit: 'Vitamin C rich', origin: 'Grenada' },
    ],
    rituals: [
      'Drink daily for prevention',
      'Increase during cold season',
      'Steep for 7-10 minutes',
      'Add honey for extra soothing',
    ],
    image: '/blends/shield-of-roots.jpg',
    price: 26.99,
    productUrl: 'https://yourstore.com/shield-of-roots',
    relatedSymptoms: ['immunity-weak', 'immunity-seasonal'],
  },
  {
    id: 'clarity-cove',
    name: 'Clarity Cove',
    tagline: 'Sharpen your mind naturally',
    description: 'A focus-enhancing blend that clears brain fog and supports mental clarity.',
    benefits: [
      'Improves focus and concentration',
      'Clears brain fog',
      'Supports memory function',
      'Enhances mental performance',
    ],
    ingredients: [
      { name: 'Ginkgo Biloba', benefit: 'Cognitive support', origin: 'Caribbean' },
      { name: 'Rosemary', benefit: 'Memory enhancement', origin: 'Jamaica' },
      { name: 'Gotu Kola', benefit: 'Mental clarity', origin: 'Trinidad' },
      { name: 'Peppermint', benefit: 'Alertness boost', origin: 'Grenada' },
    ],
    rituals: [
      'Perfect for work or study sessions',
      'Steep for 5 minutes',
      'Set an intention for focus',
      'Take breaks and stay hydrated',
    ],
    image: '/blends/clarity-cove.jpg',
    price: 25.99,
    productUrl: 'https://yourstore.com/clarity-cove',
    relatedSymptoms: ['focus-brain', 'focus-memory', 'energy-afternoon'],
  },
  {
    id: 'glow-garden',
    name: 'Glow Garden',
    tagline: 'Radiate beauty from within',
    description: 'A beauty-boosting blend that nourishes skin, hair, and nails from the inside out.',
    benefits: [
      'Promotes radiant skin',
      'Strengthens hair and nails',
      'Rich in antioxidants',
      'Supports collagen production',
    ],
    ingredients: [
      { name: 'Hibiscus', benefit: 'Skin elasticity', origin: 'Jamaica' },
      { name: 'Rose Petals', benefit: 'Anti-aging properties', origin: 'Caribbean' },
      { name: 'Nettle', benefit: 'Hair strengthening', origin: 'Trinidad' },
      { name: 'Horsetail', benefit: 'Nail fortification', origin: 'Grenada' },
    ],
    rituals: [
      'Drink daily for best results',
      'Steep for 7-10 minutes',
      'Also great as a face steam',
      'Combine with skincare routine',
    ],
    image: '/blends/glow-garden.jpg',
    price: 28.99,
    productUrl: 'https://yourstore.com/glow-garden',
    relatedSymptoms: ['beauty-skin', 'beauty-hair'],
  },
  {
    id: 'pure-flow',
    name: 'Pure Flow',
    tagline: 'Cleanse and renew naturally',
    description: 'A gentle detox blend that supports your body\'s natural cleansing processes.',
    benefits: [
      'Supports liver function',
      'Gentle daily detox',
      'Aids elimination',
      'Reduces water retention',
    ],
    ingredients: [
      { name: 'Dandelion Root', benefit: 'Liver support', origin: 'Jamaica' },
      { name: 'Milk Thistle', benefit: 'Detoxification', origin: 'Caribbean' },
      { name: 'Burdock Root', benefit: 'Blood purifying', origin: 'Trinidad' },
      { name: 'Nettle', benefit: 'Mineral rich', origin: 'Grenada' },
    ],
    rituals: [
      'Best enjoyed in the morning',
      'Drink plenty of water throughout the day',
      'Steep for 10 minutes',
      'Perfect for a reset week',
    ],
    image: '/blends/pure-flow.jpg',
    price: 24.99,
    productUrl: 'https://yourstore.com/pure-flow',
    relatedSymptoms: ['detox-cleanse', 'detox-liver'],
  },
];

export const symptomBlendMappings: SymptomBlendMapping[] = [
  { symptomId: 'stress-anxiety', blendIds: ['calm-shores', 'dream-tide'], priority: 1 },
  { symptomId: 'stress-tension', blendIds: ['calm-shores'], priority: 1 },
  { symptomId: 'sleep-insomnia', blendIds: ['dream-tide', 'calm-shores'], priority: 1 },
  { symptomId: 'sleep-restless', blendIds: ['dream-tide', 'calm-shores'], priority: 1 },
  { symptomId: 'digestion-bloating', blendIds: ['belly-breeze'], priority: 1 },
  { symptomId: 'digestion-sluggish', blendIds: ['belly-breeze', 'pure-flow'], priority: 1 },
  { symptomId: 'energy-fatigue', blendIds: ['island-vitality'], priority: 1 },
  { symptomId: 'energy-afternoon', blendIds: ['island-vitality', 'clarity-cove'], priority: 1 },
  { symptomId: 'immunity-weak', blendIds: ['shield-of-roots'], priority: 1 },
  { symptomId: 'immunity-seasonal', blendIds: ['shield-of-roots'], priority: 1 },
  { symptomId: 'focus-brain', blendIds: ['clarity-cove', 'island-vitality'], priority: 1 },
  { symptomId: 'focus-memory', blendIds: ['clarity-cove'], priority: 1 },
  { symptomId: 'beauty-skin', blendIds: ['glow-garden', 'pure-flow'], priority: 1 },
  { symptomId: 'beauty-hair', blendIds: ['glow-garden'], priority: 1 },
  { symptomId: 'detox-cleanse', blendIds: ['pure-flow'], priority: 1 },
  { symptomId: 'detox-liver', blendIds: ['pure-flow'], priority: 1 },
];

// ============================================
// COURSE & LESSON DATA
// ============================================

export const courses: Course[] = [
  {
    id: 'herbal-foundations',
    title: 'Herbal Foundations',
    description: 'Master the basics of herbal wellness and learn how to incorporate healing herbs into your daily routine.',
    thumbnail: '/courses/herbal-foundations.jpg',
    duration: 120,
    lessonCount: 8,
    lessons: [],
    category: 'herbal-basics',
    difficulty: 'beginner',
    instructor: 'Dr. Maya Green',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isPublished: true,
  },
  {
    id: 'morning-rituals',
    title: 'Morning Wellness Rituals',
    description: 'Transform your mornings with intentional herbal rituals that set you up for success.',
    thumbnail: '/courses/morning-rituals.jpg',
    duration: 90,
    lessonCount: 6,
    lessons: [],
    category: 'wellness-rituals',
    difficulty: 'beginner',
    instructor: 'Sister Sage',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    isPublished: true,
  },
  {
    id: 'build-your-brand',
    title: 'Build Your Wellness Brand',
    description: 'Learn how to share your herbal journey and build a thriving wellness business from home.',
    thumbnail: '/courses/build-brand.jpg',
    duration: 180,
    lessonCount: 12,
    lessons: [],
    category: 'business-building',
    difficulty: 'intermediate',
    instructor: 'Marcus Flow',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
    isPublished: true,
  },
  {
    id: 'deep-sleep-masterclass',
    title: 'Deep Sleep Masterclass',
    description: 'An in-depth exploration of herbal solutions for achieving restorative sleep.',
    thumbnail: '/courses/sleep-masterclass.jpg',
    duration: 150,
    lessonCount: 10,
    lessons: [],
    category: 'masterclass',
    difficulty: 'advanced',
    instructor: 'Dr. Maya Green',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
    isPublished: true,
  },
];

export const lessons: Lesson[] = [
  // Herbal Foundations Lessons
  {
    id: 'hf-1',
    courseId: 'herbal-foundations',
    title: 'Welcome to Herbal Wellness',
    description: 'An introduction to the world of herbal healing and what you\'ll learn.',
    type: 'video',
    content: 'https://example.com/videos/hf-1.mp4',
    duration: 15,
    order: 1,
    resources: [],
    isPreview: true,
  },
  {
    id: 'hf-2',
    courseId: 'herbal-foundations',
    title: 'Understanding Herbs & Their Benefits',
    description: 'Learn about the main categories of healing herbs.',
    type: 'video',
    content: 'https://example.com/videos/hf-2.mp4',
    duration: 20,
    order: 2,
    resources: [
      { id: 'hf-2-r1', name: 'Herb Reference Guide', type: 'pdf', url: '/resources/herb-guide.pdf' },
    ],
    isPreview: false,
  },
  {
    id: 'hf-3',
    courseId: 'herbal-foundations',
    title: 'Preparing Your First Blend',
    description: 'Hands-on guide to blending your first herbal tea.',
    type: 'video',
    content: 'https://example.com/videos/hf-3.mp4',
    duration: 18,
    order: 3,
    resources: [],
    isPreview: false,
  },
];

// ============================================
// MARKETING ASSETS DATA
// ============================================

export const marketingAssets: MarketingAsset[] = [
  {
    id: 'asset-1',
    name: 'Product Photography Pack',
    type: 'image',
    category: 'Product Photos',
    url: '/assets/product-photos.zip',
    thumbnail: '/assets/thumbnails/product-photos.jpg',
    description: 'High-quality photos of all our herbal blends',
    downloads: 245,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'asset-2',
    name: 'Social Media Templates',
    type: 'template',
    category: 'Social Media',
    url: '/assets/social-templates.zip',
    thumbnail: '/assets/thumbnails/social-templates.jpg',
    description: 'Ready-to-use Instagram and Facebook post templates',
    downloads: 389,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'asset-3',
    name: 'Caption Library',
    type: 'caption',
    category: 'Copy & Content',
    url: '/assets/captions.pdf',
    thumbnail: '/assets/thumbnails/captions.jpg',
    description: '50+ copy-paste captions for social media',
    downloads: 567,
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 'asset-4',
    name: 'Brand Style Guide',
    type: 'brand-kit',
    category: 'Brand Assets',
    url: '/assets/brand-guide.pdf',
    thumbnail: '/assets/thumbnails/brand-guide.jpg',
    description: 'Complete brand guidelines, logos, and colors',
    downloads: 178,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'asset-5',
    name: 'Product Demo Video',
    type: 'video',
    category: 'Videos',
    url: '/assets/product-demo.mp4',
    thumbnail: '/assets/thumbnails/product-demo.jpg',
    description: 'Professional product demonstration video',
    downloads: 234,
    createdAt: new Date('2024-02-15'),
  },
];

export const campaigns: Campaign[] = [
  {
    id: 'campaign-1',
    name: 'Spring Reset Challenge',
    description: 'Earn 25% bonus commission on all Pure Flow sales!',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-03-31'),
    bonusRate: 25,
    assets: marketingAssets.slice(0, 2),
    isActive: true,
  },
];

// ============================================
// COMMISSION SETTINGS
// ============================================

export const commissionSettings: CommissionSettings = {
  productCommissionRate: 20, // 20%
  subscriptionCommissionRate: 30, // 30%
  recurringCommissions: true,
  lifetimeAttribution: true,
  minimumPayout: 50,
  payoutFrequency: 'monthly',
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getSymptomById(id: string): Symptom | undefined {
  return symptoms.find(s => s.id === id);
}

export function getBlendById(id: string): HerbalBlend | undefined {
  return herbalBlends.find(b => b.id === id);
}

export function getBlendsForSymptoms(symptomIds: string[]): HerbalBlend[] {
  const blendIds = new Set<string>();
  
  symptomIds.forEach(symptomId => {
    const mappings = symptomBlendMappings.filter(m => m.symptomId === symptomId);
    mappings.forEach(m => m.blendIds.forEach(id => blendIds.add(id)));
  });
  
  return Array.from(blendIds)
    .map(id => getBlendById(id))
    .filter((b): b is HerbalBlend => b !== undefined);
}

export function getCourseById(id: string): Course | undefined {
  return courses.find(c => c.id === id);
}

export function getLessonsForCourse(courseId: string): Lesson[] {
  return lessons.filter(l => l.courseId === courseId).sort((a, b) => a.order - b.order);
}

export function getSymptomsByCategory(category: string): Symptom[] {
  return symptoms.filter(s => s.category === category);
}
