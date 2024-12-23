import { validateBilingual, validateNumber, validateDate } from '../utils/shared';
import { OpportunityData, SuggestionData, MarketTrendData } from '../types';
import { OPPORTUNITY_STATUS, SUGGESTION_CATEGORIES, PRIORITY_LEVELS, MARKET_TREND_CATEGORIES } from '../constants';

export const validateOpportunityData = (data: OpportunityData): boolean => {
  if (!validateBilingual(data.titleEn, data.titleAr)) return false;
  if (!validateBilingual(data.descriptionEn, data.descriptionAr)) return false;
  if (!Object.values(PRIORITY_LEVELS).includes(data.impact)) return false;
  
  if (data.estimatedCost !== undefined && !validateNumber(data.estimatedCost)) return false;
  if (data.targetDate && !validateDate(data.targetDate)) return false;

  return true;
};

export const validateSuggestionData = (data: SuggestionData): boolean => {
  if (!validateBilingual(data.titleEn, data.titleAr)) return false;
  if (!validateBilingual(data.descriptionEn, data.descriptionAr)) return false;
  if (!Object.values(SUGGESTION_CATEGORIES).includes(data.category)) return false;
  if (!Object.values(PRIORITY_LEVELS).includes(data.priority)) return false;

  return true;
};

export const validateMarketTrendData = (data: MarketTrendData): boolean => {
  if (!validateBilingual(data.titleEn, data.titleAr)) return false;
  if (!validateBilingual(data.descriptionEn, data.descriptionAr)) return false;
  if (!validateBilingual(data.impactEn, data.impactAr)) return false;
  if (!validateNumber(data.growthRate)) return false;
  if (!Object.values(MARKET_TREND_CATEGORIES).includes(data.category)) return false;

  return true;
};