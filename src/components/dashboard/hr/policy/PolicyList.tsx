import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { FileText, Plus, Download, Eye } from 'lucide-react';
import { PolicySearch } from './PolicySearch';
import { PolicyFilters } from './PolicyFilters';
import { PolicyViewer } from './viewer/PolicyViewer';

interface PolicyListProps {
  onAddNew: () => void;
}

export const PolicyList: React.FC<PolicyListProps> = ({ onAddNew }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);

  const policies = [
    {
      titleEn: 'Employee Code of Conduct',
      titleAr: 'مدونة سلوك الموظفين',
      categoryEn: 'General',
      categoryAr: 'عام',
      versionEn: 'v2.1',
      versionAr: 'نسخة ٢.١',
      dateEn: 'March 15, 2024',
      dateAr: '١٥ مارس ٢٠٢٤',
      status: 'active',
      contentEn: `<h2>Employee Code of Conduct</h2>
        <p>This code of conduct outlines our expectations regarding employees' behavior towards their colleagues, supervisors, and overall organization.</p>
        <h3>Basic Principles</h3>
        <ul>
          <li>Respect for colleagues</li>
          <li>Professional behavior</li>
          <li>Ethical conduct</li>
        </ul>`,
      contentAr: `<h2>مدونة سلوك الموظفين</h2>
        <p>تحدد مدونة السلوك هذه توقعاتنا بشأن سلوك الموظفين تجاه زملائهم ومشرفيهم والمؤسسة ككل.</p>
        <h3>المبادئ الأساسية</h3>
        <ul>
          <li>احترام الزملاء</li>
          <li>السلوك المهني</li>
          <li>السلوك الأخلاقي</li>
        </ul>`
    },
    {
      titleEn: 'Leave Policy',
      titleAr: 'سياسة الإجازات',
      categoryEn: 'HR',
      categoryAr: 'الموارد البشرية',
      versionEn: 'v1.5',
      versionAr: 'نسخة ١.٥',
      dateEn: 'March 10, 2024',
      dateAr: '١٠ مارس ٢٠٢٤',
      status: 'review',
      contentEn: `<h2>Leave Policy</h2>
        <p>This policy outlines the types of leave available to employees and the procedures for requesting time off.</p>
        <h3>Types of Leave</h3>
        <ul>
          <li>Annual Leave</li>
          <li>Sick Leave</li>
          <li>Emergency Leave</li>
        </ul>`,
      contentAr: `<h2>سياسة الإجازات</h2>
        <p>توضح هذه السياسة أنواع الإجازات المتاحة للموظفين وإجراءات طلب الإجازة.</p>
        <h3>أنواع الإجازات</h3>
        <ul>
          <li>الإجازة السنوية</li>
          <li>الإجازة المرضية</li>
          <li>إجازة الطوارئ</li>
        </ul>`
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FileText className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'وثائق السياسات' : 'Policy Documents'}
          </h3>
        </div>
        <button
          onClick={onAddNew}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'إضافة سياسة' : 'Add Policy'}
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <PolicySearch />
        <PolicyFilters />
      </div>

      <div className="space-y-4">
        {policies.map((policy, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
            <div>
              <h4 className="font-medium">
                {isRTL ? policy.titleAr : policy.titleEn}
              </h4>
              <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                <span>{isRTL ? policy.categoryAr : policy.categoryEn}</span>
                <span>•</span>
                <span>{isRTL ? policy.versionAr : policy.versionEn}</span>
                <span>•</span>
                <span>{isRTL ? policy.dateAr : policy.dateEn}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSelectedPolicy(policy)}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                title={isRTL ? 'عرض' : 'View'}
              >
                <Eye className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                title={isRTL ? 'تحميل' : 'Download'}
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <PolicyViewer
              titleEn={selectedPolicy.titleEn}
              titleAr={selectedPolicy.titleAr}
              contentEn={selectedPolicy.contentEn}
              contentAr={selectedPolicy.contentAr}
              effectiveDate={isRTL ? selectedPolicy.dateAr : selectedPolicy.dateEn}
              version={isRTL ? selectedPolicy.versionAr : selectedPolicy.versionEn}
              onClose={() => setSelectedPolicy(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};