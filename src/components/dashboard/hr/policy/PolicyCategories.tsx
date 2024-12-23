import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Folder } from 'lucide-react';

export const PolicyCategories = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const categories = [
    {
      titleEn: 'General Policies',
      titleAr: 'السياسات العامة',
      count: 12,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      titleEn: 'HR Policies',
      titleAr: 'سياسات الموارد البشرية',
      count: 8,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      titleEn: 'Safety Guidelines',
      titleAr: 'إرشادات السلامة',
      count: 6,
      color: 'bg-green-50 text-green-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center mb-4">
        <Folder className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold">
          {isRTL ? 'فئات السياسات' : 'Policy Categories'}
        </h3>
      </div>
      <div className="space-y-3">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${category.color} flex justify-between items-center`}
          >
            <span className="font-medium">
              {isRTL ? category.titleAr : category.titleEn}
            </span>
            <span className="text-sm">{category.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};