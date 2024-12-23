import React from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';

interface AuditFindingsProps {
  findingsEn: string;
  findingsAr: string;
  onChange: (findingsEn: string, findingsAr: string) => void;
}

export const AuditFindings: React.FC<AuditFindingsProps> = ({
  findingsEn,
  findingsAr,
  onChange
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">
        {isRTL ? 'نتائج التدقيق' : 'Audit Findings'}
      </h4>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'النتائج (بالإنجليزية)' : 'Findings (English)'}
          </label>
          <textarea
            value={findingsEn}
            onChange={(e) => onChange(e.target.value, findingsAr)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            rows={4}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'النتائج (بالعربية)' : 'Findings (Arabic)'}
          </label>
          <textarea
            value={findingsAr}
            onChange={(e) => onChange(findingsEn, e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            rows={4}
            required
          />
        </div>
      </div>
    </div>
  );
};