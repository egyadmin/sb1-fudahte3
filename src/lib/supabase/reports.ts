import { supabase } from './client';

export const reportsApi = {
  async addReport(data: {
    titleEn: string;
    titleAr: string;
    typeEn: string;
    typeAr: string;
    contentEn?: string;
    contentAr?: string;
    startDate: string;
    endDate: string;
    department: string;
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    return await supabase
      .from('reports')
      .insert([{
        title_en: data.titleEn,
        title_ar: data.titleAr,
        type_en: data.typeEn,
        type_ar: data.typeAr,
        content_en: data.contentEn,
        content_ar: data.contentAr,
        start_date: data.startDate,
        end_date: data.endDate,
        department: data.department,
        created_by: user.id
      }])
      .select()
      .single();
  },

  async getReports() {
    return await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false });
  },

  async updateReport(id: string, data: {
    status?: string;
    contentEn?: string;
    contentAr?: string;
  }) {
    return await supabase
      .from('reports')
      .update(data)
      .eq('id', id)
      .select()
      .single();
  },

  async deleteReport(id: string) {
    return await supabase
      .from('reports')
      .delete()
      .eq('id', id);
  }
};