import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Calendar, CheckCircle } from 'lucide-react';

interface Milestone {
  id: string;
  titleEn: string;
  titleAr: string;
  progressPercent: number;
  statusEn: string;
  statusAr: string;
  dueDateEn: string;
  dueDateAr: string;
}

interface MilestoneListProps {
  milestones: Milestone[];
}

export const MilestoneList: React.FC<MilestoneListProps> = ({ milestones }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="space-y-4">
      {milestones.map((milestone) => (
        <div key={milestone.id} className="p-3 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium">
              {isRTL ? milestone.titleAr : milestone.titleEn}
            </h4>
            <span className="text-sm text-indigo-600">
              {isRTL ? milestone.statusAr : milestone.statusEn}
            </span>
          </div>
          <div className="mb-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${milestone.progressPercent}%` }}
              />
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{isRTL ? milestone.dueDateAr : milestone.dueDateEn}</span>
          </div>
        </div>
      ))}
    </div>
  );
};