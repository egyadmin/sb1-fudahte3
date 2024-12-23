// Type definitions for mock data
export interface Department {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
}

export interface Position {
  id: string;
  titleEn: string;
  titleAr: string;
  departmentId: string;
}

export interface InnovationOpportunity {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  impact: 'high' | 'medium' | 'low';
  status: 'draft' | 'under_review' | 'approved' | 'in_progress' | 'completed' | 'cancelled';
}

export interface InnovationSuggestion {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  category: 'process' | 'product' | 'service' | 'technology';
  priority: 'high' | 'medium' | 'low';
}