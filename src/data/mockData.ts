// Mock data for demonstration purposes only
// This file contains example data structures but does not affect the database

export const departmentExamples = [
  {
    id: 'dept-001',
    nameEn: 'Technology',
    nameAr: 'التكنولوجيا',
    descriptionEn: 'Technology and Development Department',
    descriptionAr: 'قسم التكنولوجيا والتطوير'
  },
  {
    id: 'dept-002',
    nameEn: 'Human Resources',
    nameAr: 'الموارد البشرية',
    descriptionEn: 'HR Management Department',
    descriptionAr: 'قسم إدارة الموارد البشرية'
  }
];

export const positionExamples = [
  {
    id: 'pos-001',
    titleEn: 'Senior Developer',
    titleAr: 'مطور أول',
    departmentId: 'dept-001'
  },
  {
    id: 'pos-002',
    titleEn: 'HR Manager',
    titleAr: 'مدير الموارد البشرية',
    departmentId: 'dept-002'
  }
];

export const innovationExamples = {
  opportunities: [
    {
      id: 'opp-001',
      titleEn: 'AI Customer Service',
      titleAr: 'خدمة العملاء بالذكاء الاصطناعي',
      descriptionEn: 'Implement AI-powered customer service',
      descriptionAr: 'تنفيذ خدمة عملاء مدعومة بالذكاء الاصطناعي',
      impact: 'high',
      status: 'in_progress'
    },
    {
      id: 'opp-002',
      titleEn: 'Process Automation',
      titleAr: 'أتمتة العمليات',
      descriptionEn: 'Automate manual processes',
      descriptionAr: 'أتمتة العمليات اليدوية',
      impact: 'medium',
      status: 'under_review'
    }
  ],
  suggestions: [
    {
      id: 'sug-001',
      titleEn: 'Mobile App Development',
      titleAr: 'تطوير تطبيق الجوال',
      descriptionEn: 'Develop mobile app for field operations',
      descriptionAr: 'تطوير تطبيق جوال للعمليات الميدانية',
      category: 'technology',
      priority: 'high'
    },
    {
      id: 'sug-002',
      titleEn: 'Employee Training Program',
      titleAr: 'برنامج تدريب الموظفين',
      descriptionEn: 'Implement new training program',
      descriptionAr: 'تنفيذ برنامج تدريبي جديد',
      category: 'process',
      priority: 'medium'
    }
  ]
};