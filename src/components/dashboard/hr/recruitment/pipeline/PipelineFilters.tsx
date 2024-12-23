import React from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import { Filter, Search } from 'lucide-react';

export const PipelineFilters = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="flex gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder={isRTL ? 'البحث عن مرشح...' : 'Search candidates...'}
          className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white">
        <option value="all">{isRTL ? 'جميع المراحل' : 'All Stages'}</option>
        <option value="review">{isRTL ? 'مراجعة الطلب' : 'Application Review'}</option>
        <option value="initial">{isRTL ? 'المقابلة الأولية' : 'Initial Interview'}</option>
        <option value="technical">{isRTL ? 'التقييم التقني' : 'Technical Assessment'}</option>
        <option value="final">{isRTL ? 'المقابلة النهائية' : 'Final Interview'}</option>
      </select>
    </div>
  );
};