import { supabase } from '../client';
import { OpportunityData } from './types';
import { validateOpportunityData } from './validation';
import { OPPORTUNITY_STATUS } from './constants';

export const opportunitiesApi = {
  async addOpportunity(data: OpportunityData) {
    if (!validateOpportunityData(data)) {
      throw new Error('Invalid opportunity data');
    }

    return await supabase
      .from('innovation_opportunities')
      .insert([{
        title_en: data.titleEn,
        title_ar: data.titleAr,
        description_en: data.descriptionEn,
        description_ar: data.descriptionAr,
        impact: data.impact,
        expected_benefits_en: data.expectedBenefitsEn,
        expected_benefits_ar: data.expectedBenefitsAr,
        resources_required: data.resourcesRequired,
        estimated_cost: data.estimatedCost,
        target_date: data.targetDate,
        status: OPPORTUNITY_STATUS.DRAFT
      }])
      .select()
      .single();
  },

  async getOpportunities() {
    return await supabase
      .from('innovation_opportunities')
      .select('*')
      .order('created_at', { ascending: false });
  },

  async updateStatus(id: string, status: keyof typeof OPPORTUNITY_STATUS) {
    if (!Object.values(OPPORTUNITY_STATUS).includes(status)) {
      throw new Error('Invalid status');
    }

    return await supabase
      .from('innovation_opportunities')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
  }
};