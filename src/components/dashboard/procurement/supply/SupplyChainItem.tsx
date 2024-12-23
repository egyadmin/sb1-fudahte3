import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Package, Clock } from 'lucide-react';

interface SupplyChainItemProps {
  titleEn: string;
  titleAr: string;
  statusEn: string;
  statusAr: string;
  eta: string;
}

export const SupplyChainItem: React.FC<SupplyChainItemProps> = ({
  titleEn,
  titleAr,
  statusEn,
  statusAr,
  eta
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="p-3 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <Package className={`w-4 h-4 text-indigo-600 mt-1 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <div>
            <h4 className="font-medium">
              {isRTL ? titleAr : titleEn}
            </h4>
            <p className="text-sm text-gray-600">
              {isRTL ? statusAr : statusEn}
            </p>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          <span>ETA: {eta}</span>
        </div>
      </div>
    </div>
  );
};