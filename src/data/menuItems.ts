import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    titleEn: 'Dashboard',
    titleAr: 'لوحة القيادة',
    descriptionEn: 'Central hub displaying key metrics and summaries.',
    descriptionAr: 'مركز مركزي يعرض المؤشرات الرئيسية والملخصات.',
    icon: 'LayoutDashboard',
    features: {
      titleEn: 'Key Features',
      titleAr: 'الميزات الرئيسية',
      items: ['Interactive charts', 'Quick access to reports', 'Notifications']
    },
    elements: {
      titleEn: 'Main Elements',
      titleAr: 'العناصر الرئيسية',
      items: ['Navigation bar', 'Widgets for different modules', 'Alerts section']
    }
  },
  {
    id: 'strategic-planning',
    titleEn: 'Strategic Planning',
    titleAr: 'التخطيط الاستراتيجي',
    descriptionEn: 'Manage and track strategic goals and performance.',
    descriptionAr: 'إدارة وتتبع الأهداف الاستراتيجية والأداء.',
    icon: 'Target',
    features: {
      titleEn: 'Key Features',
      titleAr: 'الميزات الرئيسية',
      items: ['Add/edit strategies', 'Performance monitoring', 'Risk management']
    },
    elements: {
      titleEn: 'Main Elements',
      titleAr: 'العناصر الرئيسية',
      items: ['Strategy list', 'Performance graphs', 'Risk assessment tools']
    }
  },
  {
    id: 'hr',
    titleEn: 'HR Management',
    titleAr: 'إدارة الموارد البشرية',
    descriptionEn: 'Oversee recruitment, policy management, and performance.',
    descriptionAr: 'الإشراف على التوظيف، إدارة السياسات، ومراجعة الأداء.',
    icon: 'Users',
    features: {
      titleEn: 'Key Features',
      titleAr: 'الميزات الرئيسية',
      items: ['Employee directory', 'Recruitment status', 'Performance reviews']
    },
    elements: {
      titleEn: 'Main Elements',
      titleAr: 'العناصر الرئيسية',
      items: ['Employee profiles', 'Recruitment pipeline', 'Policy documents']
    }
  },
  {
    id: 'finance',
    titleEn: 'Financial Management',
    titleAr: 'الإدارة المالية',
    descriptionEn: 'Handle budgeting, cash flow, and financial reporting.',
    descriptionAr: 'إدارة الميزانية، التدفقات النقدية، والتقارير المالية.',
    icon: 'DollarSign',
    features: {
      titleEn: 'Key Features',
      titleAr: 'الميزات الرئيسية',
      items: ['Budget allocation', 'Expenditure tracking', 'Financial reports']
    },
    elements: {
      titleEn: 'Main Elements',
      titleAr: 'العناصر الرئيسية',
      items: ['Budget overview', 'Transaction history', 'Report generator']
    }
  },
  {
    id: 'procurement',
    titleEn: 'Procurement',
    titleAr: 'المشتريات',
    descriptionEn: 'Manage supplier contracts and supply chain.',
    descriptionAr: 'إدارة عقود الموردين وسلاسل التوريد.',
    icon: 'ShoppingCart',
    features: {
      titleEn: 'Key Features',
      titleAr: 'الميزات الرئيسية',
      items: ['Contract management', 'Price negotiation records', 'Supply tracking']
    },
    elements: {
      titleEn: 'Main Elements',
      titleAr: 'العناصر الرئيسية',
      items: ['Supplier list', 'Contract details', 'Supply chain status']
    }
  },
  {
    id: 'quality',
    titleEn: 'Quality and Safety',
    titleAr: 'الجودة والسلامة',
    descriptionEn: 'Ensure compliance with quality and safety standards.',
    descriptionAr: 'ضمان الامتثال لمعايير الجودة والسلامة.',
    icon: 'Shield',
    features: {
      titleEn: 'Key Features',
      titleAr: 'الميزات الرئيسية',
      items: ['Quality audits', 'Safety policy management', 'Compliance reports']
    },
    elements: {
      titleEn: 'Main Elements',
      titleAr: 'العناصر الرئيسية',
      items: ['Audit logs', 'Safety guidelines', 'Compliance dashboard']
    }
  },
  {
    id: 'tech',
    titleEn: 'Technological Operations',
    titleAr: 'العمليات التكنولوجية',
    descriptionEn: 'Oversee ERP systems and digital transformation efforts.',
    descriptionAr: 'الإشراف على أنظمة تخطيط الموارد المؤسسية وجهود التحول الرقمي.',
    icon: 'Cpu',
    features: {
      titleEn: 'Key Features',
      titleAr: 'الميزات الرئيسية',
      items: ['ERP usage tracking', 'Digital process updates', 'Data analysis']
    },
    elements: {
      titleEn: 'Main Elements',
      titleAr: 'العناصر الرئيسية',
      items: ['ERP activity logs', 'Transformation milestones', 'Analytics tools']
    }
  },
  {
    id: 'legal',
    titleEn: 'Legal Compliance',
    titleAr: 'الامتثال القانوني',
    descriptionEn: 'Track legal obligations and contract management.',
    descriptionAr: 'تتبع الالتزامات القانونية وإدارة العقود.',
    icon: 'Scale',
    features: {
      titleEn: 'Key Features',
      titleAr: 'الميزات الرئيسية',
      items: ['License reviews', 'Contract repository', 'Compliance tracking']
    },
    elements: {
      titleEn: 'Main Elements',
      titleAr: 'العناصر الرئيسية',
      items: ['Legal document library', 'Compliance checklist', 'Contract status']
    }
  },
  {
    id: 'innovation',
    titleEn: 'Innovation and Development',
    titleAr: 'الابتكار والتطوير',
    descriptionEn: 'Identify new business opportunities and process improvements.',
    descriptionAr: 'تحديد فرص عمل جديدة وتحسين العمليات.',
    icon: 'Lightbulb',
    features: {
      titleEn: 'Key Features',
      titleAr: 'الميزات الرئيسية',
      items: ['Opportunity tracking', 'Process improvement suggestions', 'Market analysis']
    },
    elements: {
      titleEn: 'Main Elements',
      titleAr: 'العناصر الرئيسية',
      items: ['Opportunity board', 'Suggestion box', 'Market trends']
    }
  },
  {
    id: 'reports',
    titleEn: 'Reports',
    titleAr: 'التقارير',
    descriptionEn: 'Generate and view reports for senior management.',
    descriptionAr: 'إنشاء وعرض التقارير للإدارة العليا.',
    icon: 'FileText',
    features: {
      titleEn: 'Key Features',
      titleAr: 'الميزات الرئيسية',
      items: ['Performance summaries', 'Problem analysis', 'Review schedules']
    },
    elements: {
      titleEn: 'Main Elements',
      titleAr: 'العناصر الرئيسية',
      items: ['Report templates', 'Analysis tools', 'Meeting logs']
    }
  }
];