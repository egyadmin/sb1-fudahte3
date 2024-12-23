import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Scale, Plus, Calendar, AlertTriangle } from 'lucide-react';
import { useContractStats } from '../../../../hooks/useContractStats';

interface ContractStatusProps {
  onAddContract: () => void;
}

export const ContractStatus: React.FC<ContractStatusProps> = ({ onAddContract }) => {
  const { language } = useLanguage();
  const { stats } = useContractStats();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Scale className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'حالة العقود' : 'Contract Status'}
          </h3>
        </div>
        <button
          onClick={onAddContract}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'إضافة عقد' : 'Add Contract'}
        </button>
      </div>

      {/* Contract Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm text-green-600">
            {isRTL ? 'العقود النشطة' : 'Active Contracts'}
          </div>
          <div className="text-2xl font-bold text-green-700 mt-1">{stats.active}</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-sm text-yellow-600">
            {isRTL ? 'تنتهي قريباً' : 'Expiring Soon'}
          </div>
          <div className="text-2xl font-bold text-yellow-700 mt-1">{stats.expiring}</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <div className="text-sm text-red-600">
            {isRTL ? 'منتهية' : 'Expired'}
          </div>
          <div className="text-2xl font-bold text-red-700 mt-1">{stats.expired}</div>
        </div>
      </div>

      {/* Expiring Contracts */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <AlertTriangle className={`w-4 h-4 text-yellow-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h4 className="font-medium text-gray-900">
            {isRTL ? 'العقود التي تنتهي قريباً' : 'Contracts Expiring Soon'}
          </h4>
        </div>
        <div className="space-y-3">
          {[
            {
              titleEn: 'IT Services Agreement',
              titleAr: 'اتفاقية خدمات تقنية المعلومات',
              expiryEn: '30 days remaining',
              expiryAr: '٣٠ يوم متبقي',
              value: 250000
            },
            {
              titleEn: 'Office Lease Contract',
              titleAr: 'عقد إيجار المكتب',
              expiryEn: '45 days remaining',
              expiryAr: '٤٥ يوم متبقي',
              value: 180000
            }
          ].map((contract, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h5 className="font-medium">
                  {isRTL ? contract.titleAr : contract.titleEn}
                </h5>
                <div className="flex items-center mt-1">
                  <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500">
                    {isRTL ? contract.expiryAr : contract.expiryEn}
                  </span>
                </div>
              </div>
              <div className="text-sm font-medium text-indigo-600">
                {new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-US', {
                  style: 'currency',
                  currency: 'SAR'
                }).format(contract.value)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contract Types Distribution */}
      <div>
        <h4 className="font-medium text-gray-900 mb-4">
          {isRTL ? 'توزيع أنواع العقود' : 'Contract Types Distribution'}
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {[
            { typeEn: 'Service Contracts', typeAr: 'عقود الخدمات', count: 15, percentage: 45 },
            { typeEn: 'Purchase Agreements', typeAr: 'اتفاقيات الشراء', count: 8, percentage: 25 },
            { typeEn: 'Lease Agreements', typeAr: 'عقود الإيجار', count: 6, percentage: 18 },
            { typeEn: 'Other Contracts', typeAr: 'عقود أخرى', count: 4, percentage: 12 }
          ].map((type, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">
                  {isRTL ? type.typeAr : type.typeEn}
                </span>
                <span className="text-sm text-gray-500">{type.count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${type.percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 mt-1">{type.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};