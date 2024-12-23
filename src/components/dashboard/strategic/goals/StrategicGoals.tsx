import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { useStrategicGoals } from '../../../../hooks/useStrategicGoals';
import { Target } from 'lucide-react';
import { GoalCard } from './GoalCard';
import { AddGoalButton } from './AddGoalButton';

export const StrategicGoals: React.FC = () => {
  const { language } = useLanguage();
  const { goals } = useStrategicGoals();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center mb-6">
        <Target className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h2 className="text-xl font-semibold">
          {isRTL ? 'الأهداف الاستراتيجية' : 'Strategic Goals'}
        </h2>
      </div>
      <div className="space-y-4">
        {goals.map((goal, index) => (
          <GoalCard key={index} {...goal} />
        ))}
        <AddGoalButton />
      </div>
    </div>
  );
};