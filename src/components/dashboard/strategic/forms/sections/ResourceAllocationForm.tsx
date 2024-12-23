import React, { useState } from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import { DollarSign } from 'lucide-react';

export const ResourceAllocationForm: React.FC = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [formData, setFormData] = useState({
    resourceTypeEn: '',
    resourceTypeAr: '',
    quantity: '',
    budget: '',
    allocationPeriod: ''
  });

  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center">
        <DollarSign className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold">
          {isRTL ? 'تخصيص الموارد' : 'Resource Allocation'}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? 'نوع المورد (بالإنجليزية)' : 'Resource Type (English)'}
          </label>
          <input
            type="text"
            value={formData.resourceTypeEn}
            onChange={(e) => setFormData({ ...formData, resourceTypeEn: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? 'نوع المورد (بالعربية)' : 'Resource Type (Arabic)'}
          </label>
          <input
            type="text"
            value={formData.resourceTypeAr}
            onChange={(e) => setFormData({ ...formData, resourceTypeAr: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? 'الكمية' : 'Quantity'}
          </label>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? 'الميزانية' : 'Budget'}
          </label>
          <input
            type="number"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};