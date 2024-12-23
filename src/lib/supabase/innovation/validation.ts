import { OpportunityData, SuggestionData, MarketTrendData } from './types';
import { OPPORTUNITY_STATUS, SUGGESTION_CATEGORIES, PRIORITY_LEVELS, MARKET_TREND_CATEGORIES } from './constants';

export const validateOpportunityData = (data: OpportunityData): boolean => {
  if (!data.titleEn?.trim() || !data.titleAr?.trim()) return false;
  if (!data.descriptionEn?.trim() || !data.descriptionAr?.trim()) return false;
  if (!Object.values(PRIORITY_LEVELS).includes(data.impact)) return false;
  
  if (data.estimatedCost !== undefined && data.estimatedCost < 0) return false;
  if (data.targetDate && isNaN(Date.parse(data.targetDate))) return false;

  return true;
};

export const validateSuggestionData = (data: SuggestionData): boolean => {
  if (!data.titleEn?.trim() || !data.titleAr?.trim()) return false;
  if (!data.descriptionEn?.trim() || !data.descriptionAr?.trim()) return false;
  if (!Object.values(SUGGESTION_CATEGORIES).includes(data.category as any)) return false;
  if (!Object.values(PRIORITY_LEVELS).includes(data.priority as any)) return false;

  return true;
};

export const validateMarketTrendData = (data: MarketTrendData): boolean => {
  if (!data.titleEn?.trim() || !data.titleAr?.trim()) return false;
  if (!data.descriptionEn?.trim() || !data.descriptionAr?.trim()) return false;
  if (!data.impactEn?.trim() || !data.impactAr?.trim()) return false;
  if (typeof data.growthRate !== 'number' || isNaN(data.growthRate)) return false;
  if (!Object.values(MARKET_TREND_CATEGORIES).includes(data.category as any)) return false;

  return true;
};