// Innovation Types
export interface OpportunityData {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  impact: 'high' | 'medium' | 'low';
  expectedBenefitsEn?: string;
  expectedBenefitsAr?: string;
  resourcesRequired?: string;
  estimatedCost?: number;
  targetDate?: string;
}

export interface SuggestionData {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  category: string;
  priority: string;
}

export interface MarketTrendData {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  impactEn: string;
  impactAr: string;
  growthRate: number;
  category: string;
}