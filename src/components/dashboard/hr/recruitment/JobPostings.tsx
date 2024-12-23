import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Briefcase, Users, Calendar } from 'lucide-react';
import { useRecruitment } from '../../../../hooks/useRecruitment';

export const JobPostings = () => {
  const { language } = useLanguage();
  const { positions } = useRecruitment();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">
        {isRTL ? 'الوظائف المفتوحة' : 'Open Positions'}
      </h3>
      <div className="space-y-4">
        {positions.map((position, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-200 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-lg">
                  {isRTL ? position.titleAr : position.titleEn}
                </h4>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{position.applicants} {isRTL ? 'متقدم' : 'applicants'}</span>
                  <span className="mx-2">•</span>
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{isRTL ? position.statusAr : position.statusEn}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                position.status === 'Interview Phase' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {isRTL ? position.statusAr : position.statusEn}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};