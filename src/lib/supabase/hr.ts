import { supabase } from './client';
import { Database } from './types';

export const hrApi = {
  // Departments
  async getDepartments() {
    return await supabase
      .from('hr_departments')
      .select('*')
      .order('created_at', { ascending: false });
  },

  async addDepartment(data: {
    nameEn: string;
    nameAr: string;
    descriptionEn?: string;
    descriptionAr?: string;
  }) {
    return await supabase
      .from('hr_departments')
      .insert([{
        name_en: data.nameEn,
        name_ar: data.nameAr,
        description_en: data.descriptionEn,
        description_ar: data.descriptionAr,
      }])
      .select()
      .single();
  },

  // Positions
  async getPositions() {
    return await supabase
      .from('hr_positions')
      .select(`
        *,
        department:hr_departments(*)
      `)
      .order('created_at', { ascending: false });
  },

  async addPosition(data: {
    titleEn: string;
    titleAr: string;
    departmentId: string;
    requirementsEn?: string;
    requirementsAr?: string;
  }) {
    return await supabase
      .from('hr_positions')
      .insert([{
        title_en: data.titleEn,
        title_ar: data.titleAr,
        department_id: data.departmentId,
        requirements_en: data.requirementsEn,
        requirements_ar: data.requirementsAr,
      }])
      .select()
      .single();
  },

  // Employees
  async getEmployees() {
    return await supabase
      .from('hr_employees')
      .select(`
        *,
        position:hr_positions(*),
        department:hr_departments(*)
      `)
      .order('created_at', { ascending: false });
  },

  async addEmployee(data: {
    nameEn: string;
    nameAr: string;
    email: string;
    phone?: string;
    positionId: string;
    departmentId: string;
    hireDate: string;
    imageUrl?: string;
  }) {
    return await supabase
      .from('hr_employees')
      .insert([{
        name_en: data.nameEn,
        name_ar: data.nameAr,
        email: data.email,
        phone: data.phone,
        position_id: data.positionId,
        department_id: data.departmentId,
        hire_date: data.hireDate,
        status: 'active',
        image_url: data.imageUrl,
      }])
      .select()
      .single();
  },

  // Recruitment
  async getRecruitment() {
    return await supabase
      .from('hr_recruitment')
      .select(`
        *,
        position:hr_positions(*)
      `)
      .order('created_at', { ascending: false });
  },

  async addRecruitment(data: {
    positionId: string;
    startDate: string;
    endDate?: string;
    requirementsEn?: string;
    requirementsAr?: string;
  }) {
    return await supabase
      .from('hr_recruitment')
      .insert([{
        position_id: data.positionId,
        status: 'open',
        start_date: data.startDate,
        end_date: data.endDate,
        requirements_en: data.requirementsEn,
        requirements_ar: data.requirementsAr,
      }])
      .select()
      .single();
  },

  // Policies
  async getPolicies() {
    return await supabase
      .from('hr_policies')
      .select('*')
      .order('created_at', { ascending: false });
  },

  async addPolicy(data: {
    titleEn: string;
    titleAr: string;
    contentEn: string;
    contentAr: string;
    category: 'general' | 'leave' | 'conduct' | 'benefits';
    effectiveDate: string;
    version: string;
  }) {
    return await supabase
      .from('hr_policies')
      .insert([{
        title_en: data.titleEn,
        title_ar: data.titleAr,
        content_en: data.contentEn,
        content_ar: data.contentAr,
        category: data.category,
        effective_date: data.effectiveDate,
        version: data.version,
      }])
      .select()
      .single();
  },
};