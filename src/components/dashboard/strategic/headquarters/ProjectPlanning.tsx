import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { ClipboardList, ArrowRight } from 'lucide-react';
import { useProjectPlans } from '../../../../hooks/useProjectPlans';

export const ProjectPlanning: React.FC = () => {
  const { language } = useLanguage();
  const { plans } = useProjectPlans();
  const isRTL = language === 'ar';

  return (
    <div className="bg-blue-50 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <ClipboardList className={`w-5 h-5 text-blue-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold text-gray-900">
          {isRTL ? 'إعداد خطة المشروع' : 'Project Planning'}
        </h3>
      </div>
      <div className="space-y-3">
        {plans.map((plan, index) => (
          <div key={index} className="bg-white p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">
                {isRTL ? plan.phaseAr : plan.phaseEn}
              </h4>
              <span className={`px-2 py-1 text-sm rounded-full ${
                plan.status === 'completed' ? 'bg-green-100 text-green-800' :
                plan.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {isRTL ? plan.statusAr : plan.statusEn}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
              <span>{isRTL ? plan.nextStepAr : plan.nextStepEn}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};