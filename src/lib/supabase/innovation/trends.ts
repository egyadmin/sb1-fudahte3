import { supabase } from '../client';
import { MarketTrendData } from './types';
import { validateMarketTrendData } from './utils';
import { MARKET_TREND_CATEGORIES } from './constants';

export const trendsApi = {
  async addTrend(data: MarketTrendData) {
    if (!validateMarketTrendData(data)) {
      throw new Error('Invalid market trend data');
    }

    return await supabase
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
  },

  async getTrends() {
    return await supabase
      .from('market_trends')
      .select('*')
      .order('created_at', { ascending: false });
  }
};