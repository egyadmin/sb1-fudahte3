import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Building2 } from 'lucide-react';

interface PrintLayoutProps {
  children: React.ReactNode;
}

export const PrintLayout: React.FC<PrintLayoutProps> = ({ children }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="hidden print:block" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="print-header">
        <div className="logo">
          <Building2 className="w-full h-full text-indigo-600" />
        </div>
        <h1 className="text-2xl font-bold">
          {isRTL ? 'تقرير التخطيط الاستراتيجي' : 'Strategic Planning Report'}
        </h1>
        <div className="text-sm text-gray-600 mb-2">
          {new Date().toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        <div className="flex justify-center space-x-8 rtl:space-x-reverse text-sm text-gray-500">
          <div>
            <strong>{isRTL ? 'رقم التقرير:' : 'Report No:'}</strong>{' '}
            SP-{new Date().getFullYear()}-{String(new Date().getMonth() + 1).padStart(2, '0')}
          </div>
          <div>
            <strong>{isRTL ? 'تصنيف:' : 'Classification:'}</strong>{' '}
            {isRTL ? 'رسمي' : 'Official'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="print-content">
        {children}
      </div>

      {/* Signatures */}
      <div className="print-signatures">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="signature-line"></div>
            <div className="signature-title">
              {isRTL ? 'المدير التنفيذي للعمليات' : 'Operations Executive Director'}
              <div className="font-medium mt-1">
                {isRTL ? 'م. محمد دحيم الحربي' : 'Eng. Mohammed Duhim Alharbi'}
              </div>
            </div>
          </div>
          <div>
            <div className="signature-line"></div>
            <div className="signature-title">
              {isRTL ? 'مدير التخطيط الاستراتيجي' : 'Strategic Planning Manager'}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="print-footer">
        <div className="text-center">
          <div>
            {isRTL ? 'نظام إدارة العمليات' : 'Operations Management System'}
          </div>
          <div className="mt-1 text-xs">
            {isRTL 
              ? 'تحت إدارة ورعاية المدير التنفيذي للعمليات - م. محمد دحيم الحربي'
              : 'Under the Management of Operations Executive Director - Eng. Mohammed Duhim Alharbi'
            }
          </div>
          <div className="mt-1">
            <span className="page-number">
              {isRTL ? 'صفحة ' : 'Page '}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};