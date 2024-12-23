export type ImpactLevel = 'high' | 'medium' | 'low';
export type Status = 'draft' | 'under_review' | 'approved' | 'in_progress' | 'completed' | 'cancelled';
export type Priority = 'high' | 'medium' | 'low';
export type Category = 'process' | 'product' | 'service' | 'technology';

export interface BilingualText {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
}

export interface BaseInnovationEntity extends BilingualText {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}