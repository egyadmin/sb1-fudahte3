import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Plus } from 'lucide-react';

export const AddGoalButton: React.FC = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <button
      className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg 
        hover:border-indigo-300 hover:bg-indigo-50 transition-colors
        flex items-center justify-center text-gray-600 hover:text-indigo-600"
    >
      <Plus className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
      <span>{isRTL ? 'إضافة هدف جديد' : 'Add New Goal'}</span>
    </button>
  );
};