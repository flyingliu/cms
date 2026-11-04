// Project 1: AI Visibility Dashboard Types
export interface DashboardData {
  summary: Summary;
  platforms: Platform[];
  trend: TrendData[];
  questions: Question[];
}

export interface Summary {
  visibilityScore: number;
  mentions: number;
  recommendations: number;
  avgScore: number;
}

export interface Platform {
  name: string;
  visibilityScore: number;
  mentions: number;
  recommendations: number;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface TrendData {
  date: string;
  visibilityScore: number;
  mentions: number;
}

export interface Question {
  id: string;
  question: string;
  platform: string;
  topic: string;
  mentioned: boolean;
  recommended: boolean;
  answer: string;
  citations: Citation[];
  timestamp: string;
}

export interface Citation {
  source: string;
  url: string;
  relevanceScore: number;
}

export interface AIInsight {
  analysis: string;
  recommendations: string[];
  generatedAt: string;
}

// Project 2: Product Knowledge Center Types
export interface BrandKnowledge {
  brand: Brand;
  series: ProductSeries[];
}

export interface Brand {
  name: string;
  description: string;
  logo?: string;
  website: string;
}

export interface ProductSeries {
  id: string;
  name: string;
  description: string;
  products: Product[];
}

export interface Product {
  id: string;
  seriesId: string;
  name: string;
  slug: string;
  description: string;
  keyFeatures: string[];
  bestFor: string[];
  faqs: FAQ[];
  images?: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface AskAIRequest {
  question: string;
  productId?: string;
}

export interface AskAIResponse {
  answer: string;
  sources: string[];
  confidence: number;
}
