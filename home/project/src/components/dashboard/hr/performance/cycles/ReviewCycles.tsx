import React from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import { Calendar, Clock } from 'lucide-react';

export const ReviewCycles = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const cycles = [
    {
      titleEn: 'Annual Review',
      titleAr: 'المراجعة السنوية',
      dateEn: 'December 2024',
      dateAr: 'ديسمبر ٢٠٢٤',
      status: 'upcoming'
    },
    {
      titleEn: 'Q2 Review',
      titleAr: 'مراجعة الربع الثاني',
      dateEn: 'June 2024',
      dateAr: 'يونيو ٢٠٢٤',
      status: 'upcoming'
    },
    {
      titleEn: 'Q1 Review',
      titleAr: 'مراجعة الربع الأول',
      dateEn: 'March 2024',
      dateAr: 'مارس ٢٠٢٤',
      status: 'completed'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-4">
        {isRTL ? 'دورات المراجعة' : 'Review Cycles'}
      </h3>
      <div className="space-y-3">
        {cycles.map((cycle, index) => (
          <div key={index} className="p-3 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">
                  {isRTL ? cycle.titleAr : cycle.titleEn}
                </h4>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{isRTL ? cycle.dateAr : cycle.dateEn}</span>
                </div>
              </div>
              <span className={`px-2 py-1 text-sm rounded-full ${
                cycle.status === 'completed' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {cycle.status === 'completed' 
                  ? (isRTL ? 'مكتمل' : 'Completed')
                  : (isRTL ? 'قادم' : 'Upcoming')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );