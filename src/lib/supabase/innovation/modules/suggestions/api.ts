import { supabase } from '../../../client';
import { SuggestionData } from '../../types';
import { validateSuggestionData } from '../../validation';
import { handleApiError } from '../../utils/error';
import { transformSuggestion } from '../../utils/transformers';

export const suggestionsApi = {
  async addSuggestion(data: SuggestionData) {
    try {
      if (!validateSuggestionData(data)) {
        throw new Error('Invalid suggestion data');
      }

      const { data: result, error } = await supabase
        .from('innovation_suggestions')
        .insert([{
          title_en: data.titleEn,
          title_ar: data.titleAr,
          description_en: data.descriptionEn,
          description_ar: data.descriptionAr,
          category: data.category,
          priority: data.priority,
          status: 'pending'
        }])
        .select()
        .single();

      if (error) throw error;
      return transformSuggestion(result);
    } catch (error) {
      handleApiError(error);
    }
  }
};