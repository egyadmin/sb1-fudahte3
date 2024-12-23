import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { CheckSquare, Plus, AlertTriangle } from 'lucide-react';
import { useComplianceItems } from '../../../../hooks/useComplianceItems';
import { ChecklistItem } from './ChecklistItem';

interface ComplianceChecklistProps {
  onAddChecklist: () => void;
  onAddTraining: () => void;
  onAddAudit: () => void;
}

export const ComplianceChecklist: React.FC<ComplianceChecklistProps> = ({
  onAddChecklist,
  onAddTraining,
  onAddAudit
}) => {
  const { language } = useLanguage();
  const { items } = useComplianceItems();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <CheckSquare className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'قائمة التحقق من الامتثال' : 'Compliance Checklist'}
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onAddChecklist}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {isRTL ? 'إضافة قائمة' : 'Add Checklist'}
          </button>
          <button
            onClick={onAddTraining}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {isRTL ? 'إضافة تدريب' : 'Add Training'}
          </button>
          <button
            onClick={onAddAudit}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {isRTL ? 'إضافة تدقيق' : 'Add Audit'}
          </button>
        </div>
      </div>

      {/* Compliance Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm text-green-600">
            {isRTL ? 'معدل الامتثال' : 'Compliance Rate'}
          </div>
          <div className="text-2xl font-bold text-green-700 mt-1">92%</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-sm text-yellow-600">
            {isRTL ? 'بنود قيد المراجعة' : 'Items Under Review'}
          </div>
          <div className="text-2xl font-bold text-yellow-700 mt-1">5</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <div className="text-sm text-red-600">
            {isRTL ? 'بنود متأخرة' : 'Overdue Items'}
          </div>
          <div className="text-2xl font-bold text-red-700 mt-1">2</div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <AlertTriangle className={`w-4 h-4 text-yellow-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h4 className="font-medium text-gray-900">
            {isRTL ? 'المواعيد النهائية القادمة' : 'Upcoming Deadlines'}
          </h4>
        </div>
        <div className="space-y-3">
          {items.map((item) => (
            <ChecklistItem key={item.id} {...item} />
          ))}
        </div>
      </div>

      {/* Training Status */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-4">
          {isRTL ? 'حالة التدريب' : 'Training Status'}
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {[
            { titleEn: 'Safety Training', titleAr: 'تدريب السلامة', completion: 85 },
            { titleEn: 'Compliance Training', titleAr: 'تدريب الامتثال', completion: 92 }
          ].map((training, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">
                  {isRTL ? training.titleAr : training.titleEn}
                </span>
                <span>{training.completion}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${training.completion}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Audits */}
      <div>
        <h4 className="font-medium text-gray-900 mb-4">
          {isRTL ? 'التدقيقات الأخيرة' : 'Recent Audits'}
        </h4>
        <div className="space-y-3">
          {[
            {
              titleEn: 'Q1 Compliance Audit',
              titleAr: 'تدقيق الامتثال للربع الأول',
              dateEn: 'March 15, 2024',
              dateAr: '١٥ مارس ٢٠٢٤',
              score: 95
            },
            {
              titleEn: 'Safety Standards Review',
              titleAr: 'مراجعة معايير السلامة',
              dateEn: 'March 1, 2024',
              dateAr: '١ مارس ٢٠٢٤',
              score: 88
            }
          ].map((audit, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h5 className="font-medium">
                  {isRTL ? audit.titleAr : audit.titleEn}
                </h5>
                <p className="text-sm text-gray-500 mt-1">
                  {isRTL ? audit.dateAr : audit.dateEn}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                audit.score >= 90 ? 'bg-green-100 text-green-800' :
                audit.score >= 80 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {audit.score}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};