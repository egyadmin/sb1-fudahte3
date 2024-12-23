import type { Database } from '../../types';
import type { OpportunityData, SuggestionData, MarketTrendData } from '../types';

type DBOpportunity = Database['public']['Tables']['innovation_opportunities']['Row'];
type DBSuggestion = Database['public']['Tables']['innovation_suggestions']['Row'];
type DBMarketTrend = Database['public']['Tables']['market_trends']['Row'];

export const transformOpportunity = (data: DBOpportunity): OpportunityData => ({
  id: data.id,
  titleEn: data.title_en,
  titleAr: data.title_ar,
  descriptionEn: data.description_en,
  descriptionAr: data.description_ar,
  impact: data.impact,
  expectedBenefitsEn: data.expected_benefits_en || undefined,
  expectedBenefitsAr: data.expected_benefits_ar || undefined,
  resourcesRequired: data.resources_required || undefined,
  estimatedCost: data.estimated_cost || undefined,
  targetDate: data.target_date || undefined,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
  createdBy: data.created_by
});

export const transformSuggestion = (data: DBSuggestion): SuggestionData => ({
  id: data.id,
  titleEn: data.title_en,
  titleAr: data.title_ar,
  descriptionEn: data.description_en,
  descriptionAr: data.description_ar,
  category: data.category,
  priority: data.priority,
  votesCount: data.votes_count,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
  createdBy: data.created_by
});

export const transformMarketTrend = (data: DBMarketTrend): MarketTrendData => ({
  id: data.id,
  titleEn: data.title_en,
  titleAr: data.title_ar,
  descriptionEn: data.description_en,
  descriptionAr: data.description_ar,
  impactEn: data.impact_en,
  impactAr: data.impact_ar,
  growthRate: data.growth_rate,
  category: data.category,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
  createdBy: data.created_by
});