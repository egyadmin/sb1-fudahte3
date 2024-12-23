import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { useContractStats } from '../../../../hooks/useContractStats';

export const ContractStatusSummary: React.FC = () => {
  const { language } = useLanguage();
  const { stats } = useContractStats();
  const isRTL = language === 'ar';

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-3 bg-green-50 rounded-lg">
        <p className="text-sm text-green-600">
          {isRTL ? 'نشط' : 'Active'}
        </p>
        <p className="text-xl font-bold text-green-700">{stats.active}</p>
      </div>
      <div className="p-3 bg-yellow-50 rounded-lg">
        <p className="text-sm text-yellow-600">
          {isRTL ? 'ينتهي قريباً' : 'Expiring Soon'}
        </p>
        <p className="text-xl font-bold text-yellow-700">{stats.expiring}</p>
      </div>
      <div className="p-3 bg-red-50 rounded-lg">
        <p className="text-sm text-red-600">
          {isRTL ? 'منتهي' : 'Expired'}
        </p>
        <p className="text-xl font-bold text-red-700">{stats.expired}</p>
      </div>
    </div>
  );
};