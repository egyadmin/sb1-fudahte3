import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';

export const PrintPreviewSignatures: React.FC = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="print-signatures mt-12 pt-6 border-t-2 border-gray-200">
      <div className="grid grid-cols-2 gap-8">
        <div className="text-center">
          <div className="signature-line"></div>
          <div className="signature-title">
            {isRTL ? 'المدير التنفيذي للعمليات' : 'Operations Executive Director'}
            <div className="font-medium mt-1">
              {isRTL ? 'م. محمد دحيم الحربي' : 'Eng. Mohammed Duhim Alharbi'}
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="signature-line"></div>
          <div className="signature-title">
            {isRTL ? 'مدير التخطيط الاستراتيجي' : 'Strategic Planning Manager'}
          </div>
        </div>
      </div>
    </div>
  );
};