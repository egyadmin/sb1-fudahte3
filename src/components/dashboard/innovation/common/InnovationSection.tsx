import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Plus } from 'lucide-react';

interface InnovationSectionProps {
  titleEn: string;
  titleAr: string;
  icon: React.ReactNode;
  onAdd?: () => void;
  addButtonTextEn?: string;
  addButtonTextAr?: string;
  children: React.ReactNode;
}

export const InnovationSection: React.FC<InnovationSectionProps> = ({
  titleEn,
  titleAr,
  icon,
  onAdd,
  addButtonTextEn = 'Add New',
  addButtonTextAr = 'إضافة جديد',
  children
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-2 bg-indigo-50 rounded-lg">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 ml-3">
            {isRTL ? titleAr : titleEn}
          </h3>
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <span>{isRTL ? addButtonTextAr : addButtonTextEn}</span>
          </button>
        )}
      </div>
      {children}
    </div>
  );
};