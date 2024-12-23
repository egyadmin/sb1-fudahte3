import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Zap } from 'lucide-react';
import { useImprovementActions } from '../../../../hooks/useImprovementActions';

export const ImprovementActions: React.FC = () => {
  const { language } = useLanguage();
  const { actions } = useImprovementActions();
  const isRTL = language === 'ar';

  return (
    <div className="bg-yellow-50 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <Zap className={`w-5 h-5 text-yellow-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold text-gray-900">
          {isRTL ? 'إجراءات التحسين' : 'Improvement Actions'}
        </h3>
      </div>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <div key={index} className="bg-white p-3 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900">
                {isRTL ? action.titleAr : action.titleEn}
              </h4>
              <span className={`px-2 py-1 text-xs rounded-full ${
                action.status === 'implemented' ? 'bg-green-100 text-green-800' :
                action.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {isRTL ? action.statusAr : action.statusEn}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {isRTL ? action.descriptionAr : action.descriptionEn}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};