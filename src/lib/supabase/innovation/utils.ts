import { OPPORTUNITY_STATUS, PRIORITY_LEVELS } from './constants';
import type { OpportunityData, SuggestionData, MarketTrendData } from './types';

export const validateOpportunityData = (data: OpportunityData): boolean => {
  return !!(
    data.titleEn &&
    data.titleAr &&
    data.descriptionEn &&
    data.descriptionAr &&
    Object.values(PRIORITY_LEVELS).includes(data.impact as any)
  );
};

export const validateSuggestionData = (data: SuggestionData): boolean => {
  return !!(
    data.titleEn &&
    data.titleAr &&
    data.descriptionEn &&
    data.descriptionAr &&
    data.category &&
    Object.values(PRIORITY_LEVELS).includes(data.priority as any)
  );
};

export const validateMarketTrendData = (data: MarketTrendData): boolean => {
  return !!(
    data.titleEn &&
    data.titleAr &&
    data.descriptionEn &&
    data.descriptionAr &&
    data.impactEn &&
    data.impactAr &&
    typeof data.growthRate === 'number' &&
    data.category
  );
};