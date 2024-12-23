import { supabase } from '../../../client';
import { OpportunityData } from '../../types';
import { validateOpportunityData } from '../../validation';
import { OPPORTUNITY_STATUS } from '../../constants';
import { handleApiError } from '../../utils/error';
import { transformOpportunity } from '../../utils/transformers';

export const opportunitiesApi = {
  async addOpportunity(data: OpportunityData) {
    try {
      if (!validateOpportunityData(data)) {
        throw new Error('Invalid opportunity data');
      }

      const { data: result, error } = await supabase
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

      if (error) throw error;
      return transformOpportunity(result);
    } catch (error) {
      handleApiError(error);
    }
  }
};