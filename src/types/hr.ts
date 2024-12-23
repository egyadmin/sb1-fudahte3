export interface Employee {
  id: string;
  nameEn: string;
  nameAr: string;
  positionEn: string;
  positionAr: string;
  departmentEn: string;
  departmentAr: string;
  email: string;
  phone: string;
  imageUrl: string;
}

export interface Department {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
}

export interface Position {
  id: string;
  titleEn: string;
  titleAr: string;
  departmentId: string;
  requirementsEn?: string;
  requirementsAr?: string;
}

export interface JobPosting {
  id: string;
  positionId: string;
  startDate: string;
  endDate?: string;
  requirementsEn?: string;
  requirementsAr?: string;
  status: 'open' | 'in_progress' | 'closed';
}