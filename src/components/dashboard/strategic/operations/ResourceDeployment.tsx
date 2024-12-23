import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Users, Truck } from 'lucide-react';
import { useResourceDeployment } from '../../../../hooks/useResourceDeployment';

export const ResourceDeployment: React.FC = () => {
  const { language } = useLanguage();
  const { resources } = useResourceDeployment();
  const isRTL = language === 'ar';

  return (
    <div className="bg-blue-50 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <Truck className={`w-5 h-5 text-blue-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold text-gray-900">
          {isRTL ? 'إرسال الموارد' : 'Resource Deployment'}
        </h3>
      </div>
      <div className="space-y-4">
        {resources.map((resource, index) => (
          <div key={index} className="bg-white p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">
                {isRTL ? resource.titleAr : resource.titleEn}
              </h4>
              <span className={`px-2 py-1 text-sm rounded-full ${
                resource.status === 'deployed' ? 'bg-green-100 text-green-800' :
                resource.status === 'in-transit' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {isRTL ? resource.statusAr : resource.statusEn}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-1" />
              <span>{resource.quantity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};