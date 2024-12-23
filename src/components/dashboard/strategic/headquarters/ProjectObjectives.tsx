import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Target, CheckCircle } from 'lucide-react';
import { useProjectObjectives } from '../../../../hooks/useProjectObjectives';

export const ProjectObjectives: React.FC = () => {
  const { language } = useLanguage();
  const { objectives } = useProjectObjectives();
  const isRTL = language === 'ar';

  return (
    <div className="bg-indigo-50 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <Target className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold text-gray-900">
          {isRTL ? 'أهداف المشروع' : 'Project Objectives'}
        </h3>
      </div>
      <div className="space-y-3">
        {objectives.map((objective, index) => (
          <div key={index} className="flex items-start bg-white p-3 rounded-lg">
            <CheckCircle className={`w-5 h-5 text-green-500 mt-0.5 ${isRTL ? 'ml-3' : 'mr-3'}`} />
            <div>
              <h4 className="font-medium text-gray-900">
                {isRTL ? objective.titleAr : objective.titleEn}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {isRTL ? objective.descriptionAr : objective.descriptionEn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};