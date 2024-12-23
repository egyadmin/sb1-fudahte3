import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { FileText, Plus, Calendar, DollarSign } from 'lucide-react';
import { useContracts } from '../../../../hooks/useContracts';

interface ContractOverviewProps {
  onAddContract: () => void;
}

export const ContractOverview: React.FC<ContractOverviewProps> = ({ onAddContract }) => {
  const { language } = useLanguage();
  const { contracts } = useContracts();
  const isRTL = language === 'ar';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FileText className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'نظرة عامة على العقود' : 'Contract Overview'}
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
          <div className="text-2xl font-bold text-green-700 mt-1">15</div>
          <div className="text-sm text-green-600 mt-1">
            {formatCurrency(2500000)}
          </div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-sm text-yellow-600">
            {isRTL ? 'العقود القادمة للتجديد' : 'Up for Renewal'}
          </div>
          <div className="text-2xl font-bold text-yellow-700 mt-1">3</div>
          <div className="text-sm text-yellow-600 mt-1">
            {formatCurrency(750000)}
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-blue-600">
            {isRTL ? 'العقود قيد التفاوض' : 'In Negotiation'}
          </div>
          <div className="text-2xl font-bold text-blue-700 mt-1">5</div>
          <div className="text-sm text-blue-600 mt-1">
            {formatCurrency(1200000)}
          </div>
        </div>
      </div>

      {/* Contract List */}
      <div className="space-y-4">
        {contracts.map((contract) => (
          <div key={contract.id} className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">
                  {isRTL ? contract.titleAr : contract.titleEn}
                </h4>
                <p className="text-sm text-gray-500">
                  {isRTL ? contract.supplierIdAr : contract.supplierIdEn}
                </p>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>
                    {isRTL ? contract.startDateAr : contract.startDateEn} - {isRTL ? contract.endDateAr : contract.endDateEn}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center text-indigo-600">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span className="font-medium">{formatCurrency(contract.value)}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm mt-2 ${
                  contract.status === 'active' ? 'bg-green-100 text-green-800' :
                  contract.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {contract.status === 'active' ? (isRTL ? 'نشط' : 'Active') :
                   contract.status === 'pending' ? (isRTL ? 'قيد الانتظار' : 'Pending') :
                   (isRTL ? 'منتهي' : 'Expired')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};