export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
export type ApprovalType = 'leave' | 'expense' | 'purchase' | 'document';

export interface Approval {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  type: ApprovalType;
  status: ApprovalStatus;
  requesterId: string;
  approverId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApprovalRequest {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  type: ApprovalType;
}