import React, { useState } from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import { Target, FileText, Users } from 'lucide-react';
import { ActionButton } from './ActionButton';
import { ReviewForm } from '../review/ReviewForm';
import { TeamFeedbackForm } from '../team/TeamFeedbackForm';
import { usePerformanceActions } from './usePerformanceActions';

export const PerformanceActions = () => {
  const { language } = useLanguage();
  const { loading, handleSetGoals } = usePerformanceActions();
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const isRTL = language === 'ar';

  const actions = [
    {
      id: 'goals',
      icon: Target,
      titleEn: 'Set Goals',
      titleAr: 'تحديد الأهداف',
      color: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
      onClick: () => handleSetGoals()
    },
    {
      id: 'review',
      icon: FileText,
      titleEn: 'Review Form',
      titleAr: 'نموذج المراجعة',
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
      onClick: () => setActiveAction('review')
    },
    {
      id: 'feedback',
      icon: Users,
      titleEn: 'Team Feedback',
      titleAr: 'تقييم الفريق',
      color: 'bg-green-50 text-green-600 hover:bg-green-100',
      onClick: () => setActiveAction('feedback')
    }
  ];

  const renderActiveForm = () => {
    switch (activeAction) {
      case 'review':
        return <ReviewForm />;
      case 'feedback':
        return <TeamFeedbackForm />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {actions.map((action) => (
              <ActionButton
                key={action.id}
                {...action}
                loading={loading && activeAction === action.id}
                disabled={loading}
              />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          {isRTL ? 'إجراءات الأداء' : 'Performance Actions'}
        </h3>
        {activeAction && (
          <button
            onClick={() => setActiveAction(null)}
            className="text-sm text-gray-600 hover:text-indigo-600"
          >
            {isRTL ? 'رجوع' : 'Back'}
          </button>
        )}
      </div>
      {renderActiveForm()}
    </div>
  );
};