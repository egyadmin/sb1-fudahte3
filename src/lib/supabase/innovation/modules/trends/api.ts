import { supabase } from '../../../client';
import { MarketTrendData } from '../../types';
import { validateMarketTrendData } from '../../validation';
import { handleApiError } from '../../utils/error';
import { transformMarketTrend } from '../../utils/transformers';

export const trendsApi = {
  async addTrend(data: MarketTrendData) {
    try {
      if (!validateMarketTrendData(data)) {
        throw new Error('Invalid market trend data');
      }

      const { data: result, error } = await supabase
        .from('market_trends')
        .insert([{
          title_en: data.titleEn,
          title_ar: data.titleAr,
          description_en: data.descriptionEn,
          description_ar: data.descriptionAr,
          impact_en: data.impactEn,
          impact_ar: data.impactAr,
          growth_rate: data.growthRate,
          category: data.category,
          status: 'active'
        }])
        .select()
        .single();

      if (error) throw error;
      return transformMarketTrend(result);
    } catch (error) {
      handleApiError(error);
    }
  }
};