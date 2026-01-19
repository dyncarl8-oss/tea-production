// ============================================
// HYBRID COMMUNITY & AFFILIATE PORTAL - TYPES
// ============================================

// User & Authentication Types
export type UserRole = 'admin' | 'member' | 'affiliate' | 'visitor';

export interface UserProfile {
  id: string;
  whopUserId: string;
  username: string;
  name?: string;
  email?: string;
  avatar?: string;
  role: UserRole;
  isAffiliate: boolean;
  affiliateCode?: string;
  joinedAt: Date;
  progress: UserProgress;
}

export interface UserProgress {
  coursesCompleted: string[];
  lessonsCompleted: string[];
  currentCourse?: string;
  totalWatchTime: number; // in minutes
  certificatesEarned: string[];
}

// Symptom-to-Stems Types
export interface Symptom {
  id: string;
  name: string;
  category: SymptomCategory;
  description: string;
  icon: string;
}

export type SymptomCategory = 
  | 'stress' 
  | 'sleep' 
  | 'digestion' 
  | 'energy' 
  | 'immunity' 
  | 'focus' 
  | 'beauty' 
  | 'detox';

export interface HerbalBlend {
  id: string;
  name: string;
  tagline: string;
  description: string;
  benefits: string[];
  ingredients: Ingredient[];
  rituals: string[];
  image: string;
  price: number;
  productUrl: string;
  relatedSymptoms: string[];
}

export interface Ingredient {
  name: string;
  benefit: string;
  origin?: string;
}

export interface SymptomBlendMapping {
  symptomId: string;
  blendIds: string[];
  priority: number;
}

export interface RecommendationResult {
  primaryBlend: HerbalBlend;
  alternativeBlends: HerbalBlend[];
  educationalTips: string[];
  referralLink: string;
}

// Course & Content Types
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // in minutes
  lessonCount: number;
  lessons: Lesson[];
  category: CourseCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructor: string;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
}

export type CourseCategory = 
  | 'herbal-basics' 
  | 'wellness-rituals' 
  | 'business-building' 
  | 'masterclass' 
  | 'live-qa';

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: 'video' | 'pdf' | 'article' | 'quiz';
  content: string; // URL for video/pdf, markdown for article
  duration: number; // in minutes
  order: number;
  resources: LessonResource[];
  isPreview: boolean;
}

export interface LessonResource {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'link';
  url: string;
}

// Community Types
export interface CommunityPost {
  id: string;
  authorId: string;
  author: UserProfile;
  content: string;
  images?: string[];
  likes: number;
  comments: Comment[];
  createdAt: Date;
  isPinned: boolean;
}

export interface Comment {
  id: string;
  authorId: string;
  author: UserProfile;
  content: string;
  createdAt: Date;
}

// Affiliate & Commission Types
export interface AffiliateStats {
  userId: string;
  totalEarnings: number;
  pendingEarnings: number;
  paidEarnings: number;
  totalReferrals: number;
  activeReferrals: number;
  conversionRate: number;
  clicksThisMonth: number;
  commissionsThisMonth: number;
}

export interface ReferralLink {
  id: string;
  affiliateId: string;
  code: string;
  url: string;
  type: 'product' | 'subscription' | 'symptom-tool';
  clicks: number;
  conversions: number;
  earnings: number;
  createdAt: Date;
}

export interface Commission {
  id: string;
  affiliateId: string;
  referralId: string;
  type: 'product' | 'subscription';
  amount: number;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  productName?: string;
  customerName?: string;
  createdAt: Date;
  paidAt?: Date;
}

export interface MarketingAsset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'template' | 'caption' | 'brand-kit';
  category: string;
  url: string;
  thumbnail?: string;
  description: string;
  downloads: number;
  createdAt: Date;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  bonusRate: number; // percentage increase
  assets: MarketingAsset[];
  isActive: boolean;
}

// Admin Types
export interface AdminStats {
  totalUsers: number;
  totalMembers: number;
  totalAffiliates: number;
  totalRevenue: number;
  revenueThisMonth: number;
  activeSubscriptions: number;
  totalCourses: number;
  totalLessons: number;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: Date;
  ip?: string;
}

// Commission Settings
export interface CommissionSettings {
  productCommissionRate: number; // percentage
  subscriptionCommissionRate: number; // percentage
  recurringCommissions: boolean;
  lifetimeAttribution: boolean;
  minimumPayout: number;
  payoutFrequency: 'weekly' | 'biweekly' | 'monthly';
}
