import { supabase } from '../client';
import { SuggestionData } from './types';
import { validateSuggestionData } from './utils';
import { SUGGESTION_CATEGORIES } from './constants';

export const suggestionsApi = {
  async addSuggestion(data: SuggestionData) {
    if (!validateSuggestionData(data)) {
      throw new Error('Invalid suggestion data');
    }

    return await supabase
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
  },

  async getSuggestions() {
    return await supabase
      .from('innovation_suggestions')
      .select('*')
      .order('created_at', { ascending: false });
  },

  async vote(id: string, userId: string) {
    return await supabase
      .from('innovation_suggestions_votes')
      .insert([{
        suggestion_id: id,
        created_by: userId
      }])
      .select()
      .single();
  }
};