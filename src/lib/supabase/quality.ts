import { supabase } from './client';

export const qualityApi = {
  // Quality Standards
  async getQualityStandards() {
    return await supabase
      .from('quality_standards')
      .select('*')
      .order('created_at', { ascending: false });
  },

  async addQualityStandard(data: {
    titleEn: string;
    titleAr: string;
    descriptionEn?: string;
    descriptionAr?: string;
    category: string;
  }) {
    return await supabase
      .from('quality_standards')
      .insert([{
        title_en: data.titleEn,
        title_ar: data.titleAr,
        description_en: data.descriptionEn,
        description_ar: data.descriptionAr,
        category: data.category,
        status: 'active'
      }])
      .select()
      .single();
  },

  // Quality Audits
  async getQualityAudits() {
    return await supabase
      .from('quality_audits')
      .select('*')
      .order('audit_date', { ascending: false });
  },

  async addQualityAudit(data: {
    titleEn: string;
    titleAr: string;
    findingsEn?: string;
    findingsAr?: string;
    auditDate: string;
    score: number;
  }) {
    return await supabase
      .from('quality_audits')
      .insert([{
        title_en: data.titleEn,
        title_ar: data.titleAr,
        findings_en: data.findingsEn,
        findings_ar: data.findingsAr,
        audit_date: data.auditDate,
        score: data.score,
        status: 'pending'
      }])
      .select()
      .single();
  },

  // Safety Guidelines
  async getSafetyGuidelines() {
    return await supabase
      .from('safety_guidelines')
      .select('*')
      .order('created_at', { ascending: false });
  },

  async addSafetyGuideline(data: {
    titleEn: string;
    titleAr: string;
    contentEn: string;
    contentAr: string;
    category: string;
    priority: string;
    effectiveDate: string;
  }) {
    return await supabase
      .from('safety_guidelines')
      .insert([{
        title_en: data.titleEn,
        title_ar: data.titleAr,
        content_en: data.contentEn,
        content_ar: data.contentAr,
        category: data.category,
        priority: data.priority,
        effective_date: data.effectiveDate
      }])
      .select()
      .single();
  },

  // Emergency Protocols
  async getEmergencyProtocols() {
    return await supabase
      .from('emergency_protocols')
      .select('*')
      .order('created_at', { ascending: false });
  },

  async addEmergencyProtocol(data: {
    titleEn: string;
    titleAr: string;
    procedureEn: string;
    procedureAr: string;
    emergencyType: string;
    priority: string;
  }) {
    return await supabase
      .from('emergency_protocols')
      .insert([{
        title_en: data.titleEn,
        title_ar: data.titleAr,
        procedure_en: data.procedureEn,
        procedure_ar: data.procedureAr,
        emergency_type: data.emergencyType,
        priority: data.priority,
        last_updated: new Date().toISOString()
      }])
      .select()
      .single();
  }
};