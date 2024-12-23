import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Building2, Calendar } from 'lucide-react';

interface PrintPreviewContentProps {
  children: React.ReactNode;
}

export const PrintPreviewContent: React.FC<PrintPreviewContentProps> = ({ children }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="print-content" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="border-b-2 border-gray-200 pb-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Building2 className="w-8 h-8 text-indigo-600" />
            </div>
            <div className={`${isRTL ? 'mr-4' : 'ml-4'}`}>
              <h1 className="text-2xl font-bold text-gray-900">
                {isRTL ? 'نظام إدارة العمليات' : 'Operations Management System'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {isRTL ? 'تقرير التخطيط الاستراتيجي' : 'Strategic Planning Report'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {new Date().toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {isRTL ? 'رقم التقرير:' : 'Report No:'} SP-{new Date().getFullYear()}-
              {String(new Date().getMonth() + 1).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="print-sections space-y-8">
        {children}
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t-2 border-gray-200">
        <div className="grid grid-cols-2 gap-8">
          <div className="text-center">
            <div className="w-48 mx-auto border-b-2 border-gray-300 pb-4 mb-2"></div>
            <p className="text-sm text-gray-600">
              {isRTL ? 'المدير التنفيذي للعمليات' : 'Operations Executive Director'}
            </p>
            <p className="text-sm font-medium mt-1">
              {isRTL ? 'م. محمد دحيم الحربي' : 'Eng. Mohammed Duhim Alharbi'}
            </p>
          </div>
          <div className="text-center">
            <div className="w-48 mx-auto border-b-2 border-gray-300 pb-4 mb-2"></div>
            <p className="text-sm text-gray-600">
              {isRTL ? 'مدير التخطيط الاستراتيجي' : 'Strategic Planning Manager'}
            </p>
          </div>
        </div>
      </div>

      {/* Page Number */}
      <div className="fixed bottom-4 w-full text-center text-sm text-gray-500 print:block hidden">
        <span className="print-page"></span>
      </div>
    </div>
  );
};