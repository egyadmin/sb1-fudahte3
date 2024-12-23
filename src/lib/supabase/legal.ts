```typescript
import { supabase } from './client';

export const legalApi = {
  // Legal Documents
  async addLegalDocument(data: {
    titleEn: string;
    titleAr: string;
    type: string;
    contentEn: string;
    contentAr: string;
    status: string;
    effectiveDate: string;
    expiryDate?: string;
    documentNumber?: string;
    issuingAuthorityEn?: string;
    issuingAuthorityAr?: string;
  }) {
    return await supabase
      .from('legal_documents')
      .insert([{
        title_en: data.titleEn,
        title_ar: data.titleAr,
        type: data.type,
        content_en: data.contentEn,
        content_ar: data.contentAr,
        status: data.status,
        effective_date: data.effectiveDate,
        expiry_date: data.expiryDate,
        document_number: data.documentNumber,
        issuing_authority_en: data.issuingAuthorityEn,
        issuing_authority_ar: data.issuingAuthorityAr
      }])
      .select()
      .single();
  },

  // Compliance Checklists
  async addComplianceChecklist(data: {
    titleEn: string;
    titleAr: string;
    descriptionEn?: string;
    descriptionAr?: string;
    category: string;
    priority: string;
    dueDate: string;
  }) {
    return await supabase
      .from('compliance_checklists')
      .insert([{
        title_en: data.titleEn,
        title_ar: data.titleAr,
        description_en: data.descriptionEn,
        description_ar: data.descriptionAr,
        category: data.category,
        priority: data.priority,
        due_date: data.dueDate,
        status: 'pending'
      }])
      .select()
      .single();
  },

  // Compliance Training
  async addComplianceTraining(data: {
    titleEn: string;
    titleAr: string;
    descriptionEn?: string;
    descriptionAr?: string;
    type: string;
    startDate: string;
    endDate: string;
    materialsUrl?: string;
    completionCriteria?: string;
  }) {
    return await supabase
      .from('compliance_trainings')
      .insert([{
        title_en: data.titleEn,
        title_ar: data.titleAr,
        description_en: data.descriptionEn,
        description_ar: data.descriptionAr,
        type: data.type,
        start_date: data.startDate,
        end_date: data.endDate,
        materials_url: data.materialsUrl,
        completion_criteria: data.completionCriteria,
        status: 'scheduled'
      }])
      .select()
      .single();
  },

  // Compliance Audits
  async addComplianceAudit(data: {
    titleEn: string;
    titleAr: string;
    type: string;
    scopeEn: string;
    scopeAr: string;
    findingsEn?: string;
    findingsAr?: string;
    auditDate: string;
    auditorEn: string;
    auditorAr: string;
    score?: number;
  }) {
    return await supabase
      .from('compliance_audits')
      .insert([{
        title_en: data.titleEn,
        title_ar: data.titleAr,
        type: data.type,
        scope_en: data.scopeEn,
        scope_ar: data.scopeAr,
        findings_en: data.findingsEn,
        findings_ar: data.findingsAr,
        audit_date: data.auditDate,
        auditor_en: data.auditorEn,
        auditor_ar: data.auditorAr,
        score: data.score,
        status: 'planned'
      }])
      .select()
      .single();
  },

  // Legal Contracts
  async addLegalContract(data: {
    titleEn: string;
    titleAr: string;
    type: string;
    descriptionEn?: string;
    descriptionAr?: string;
    startDate: string;
    endDate?: string;
    value?: number;
    partyNameEn: string;
    partyNameAr: string;
    termsEn?: string;
    termsAr?: string;
  }) {
    return await supabase
      .from('legal_contracts')
      .insert([{
        title_en: data.titleEn,
        title_ar: data.titleAr,
        type: data.type,
        description_en: data.descriptionEn,
        description_ar: data.descriptionAr,
        start_date: data.startDate,
        end_date: data.endDate,
        value: data.value,
        party_name_en: data.partyNameEn,
        party_name_ar: data.partyNameAr,
        terms_en: data.termsEn,
        terms_ar: data.termsAr,
        status: 'draft'
      }])
      .select()
      .single();
  }
};
```