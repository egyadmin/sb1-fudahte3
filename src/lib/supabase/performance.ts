import { supabase } from './client';

export const performanceApi = {
  // Goals
  async getGoals(employeeId: string) {
    return await supabase
      .from('hr_performance_goals')
      .select('*')
      .eq('employee_id', employeeId)
      .order('created_at', { ascending: false });
  },

  async addGoal(data: {
    titleEn: string;
    titleAr: string;
    descriptionEn?: string;
    descriptionAr?: string;
    targetDate?: string;
    employeeId: string;
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    return await supabase
      .from('hr_performance_goals')
      .insert([{
        title_en: data.titleEn,
        title_ar: data.titleAr,
        description_en: data.descriptionEn,
        description_ar: data.descriptionAr,
        target_date: data.targetDate,
        employee_id: data.employeeId,
        status: 'pending',
        created_by: user.id
      }])
      .select()
      .single();
  },

  // Reviews
  async addReview(data: {
    employeeId: string;
    reviewerId: string;
    reviewCycleId: string;
    feedbackEn: string;
    feedbackAr: string;
    rating: number;
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    return await supabase
      .from('hr_performance_reviews')
      .insert([{
        employee_id: data.employeeId,
        reviewer_id: data.reviewerId,
        review_cycle_id: data.reviewCycleId,
        feedback_en: data.feedbackEn,
        feedback_ar: data.feedbackAr,
        rating: data.rating,
        status: 'draft',
        created_by: user.id
      }])
      .select()
      .single();
  },

  // Team Feedback
  async addTeamFeedback(data: {
    employeeId: string;
    feedbackEn: string;
    feedbackAr: string;
    category: string;
    rating: number;
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    return await supabase
      .from('hr_team_feedback')
      .insert([{
        employee_id: data.employeeId,
        feedback_provider_id: user.id,
        feedback_en: data.feedbackEn,
        feedback_ar: data.feedbackAr,
        category: data.category,
        rating: data.rating,
        created_by: user.id
      }])
      .select()
      .single();
  }
};