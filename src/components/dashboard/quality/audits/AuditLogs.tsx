import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { ClipboardCheck, Plus } from 'lucide-react';
import { useAudits } from '../../../../hooks/useAudits';

interface AuditLogsProps {
  onAddAudit: () => void;
}

export const AuditLogs: React.FC<AuditLogsProps> = ({ onAddAudit }) => {
  const { language } = useLanguage();
  const { audits } = useAudits();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ClipboardCheck className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'سجلات التدقيق' : 'Audit Logs'}
          </h3>
        </div>
        <button
          onClick={onAddAudit}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'إضافة تدقيق' : 'Add Audit'}
        </button>
      </div>

      {/* Audit Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm text-green-600">
            {isRTL ? 'متوسط درجة التدقيق' : 'Average Audit Score'}
          </div>
          <div className="text-2xl font-bold text-green-700 mt-1">92%</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-blue-600">
            {isRTL ? 'التدقيقات المكتملة' : 'Completed Audits'}
          </div>
          <div className="text-2xl font-bold text-blue-700 mt-1">15</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-sm text-yellow-600">
            {isRTL ? 'التدقيقات القادمة' : 'Upcoming Audits'}
          </div>
          <div className="text-2xl font-bold text-yellow-700 mt-1">5</div>
        </div>
      </div>

      {/* Audit List */}
      <div className="space-y-4">
        {audits.map((audit, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">
                  {isRTL ? audit.titleAr : audit.titleEn}
                </h4>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <span>{isRTL ? audit.dateAr : audit.dateEn}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  audit.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {isRTL ? audit.statusAr : audit.statusEn}
                </span>
                <div className="mt-2 text-lg font-semibold text-indigo-600">
                  {audit.score}%
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    audit.score >= 90 ? 'bg-green-600' :
                    audit.score >= 70 ? 'bg-yellow-600' :
                    'bg-red-600'
                  }`}
                  style={{ width: `${audit.score}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};