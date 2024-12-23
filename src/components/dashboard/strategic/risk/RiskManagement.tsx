import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { AlertTriangle } from 'lucide-react';

export const RiskManagement = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center mb-4">
        <AlertTriangle className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold">
          {isRTL ? 'إدارة المخاطر' : 'Risk Management'}
        </h3>
      </div>
      {/* Risk management content will be added here */}
    </div>
  );
};