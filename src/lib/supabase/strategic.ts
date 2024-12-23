import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export const strategicApi = {
  // Metrics
  async addMetric(data: {
    titleEn: string;
    titleAr: string;
    completion: number;
    trend: number;
  }) {
    return await supabase
      .from('strategic_metrics')
      .insert([data])
      .select()
      .single();
  },

  async getMetrics() {
    return await supabase
      .from('strategic_metrics')
      .select('*')
      .order('created_at', { ascending: false });
  },

  // Resources
  async addResource(data: {
    titleEn: string;
    titleAr: string;
    efficiency: number;
    descriptionEn: string;
    descriptionAr: string;
  }) {
    return await supabase
      .from('strategic_resources')
      .insert([data])
      .select()
      .single();
  },

  async getResources() {
    return await supabase
      .from('strategic_resources')
      .select('*')
      .order('created_at', { ascending: false });
  },

  // Quality
  async addQualityData(data: {
    titleEn: string;
    titleAr: string;
    status: 'improved' | 'stable' | 'declined';
    descriptionEn: string;
    descriptionAr: string;
  }) {
    return await supabase
      .from('strategic_quality')
      .insert([data])
      .select()
      .single();
  },

  async getQualityData() {
    return await supabase
      .from('strategic_quality')
      .select('*')
      .order('created_at', { ascending: false });
  },

  // Improvements
  async addImprovement(data: {
    titleEn: string;
    titleAr: string;
    status: 'planned' | 'in-progress' | 'completed';
    progress: number;
    impactEn: string;
    impactAr: string;
  }) {
    return await supabase
      .from('strategic_improvements')
      .insert([data])
      .select()
      .single();
  },

  async getImprovements() {
    return await supabase
      .from('strategic_improvements')
      .select('*')
      .order('created_at', { ascending: false });
  }
};