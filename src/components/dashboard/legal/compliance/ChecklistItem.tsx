import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Calendar, AlertCircle } from 'lucide-react';

interface ChecklistItemProps {
  titleEn: string;
  titleAr: string;
  dueDateEn: string;
  dueDateAr: string;
  status: 'pending' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
}

export const ChecklistItem: React.FC<ChecklistItemProps> = ({
  titleEn,
  titleAr,
  dueDateEn,
  dueDateAr,
  status,
  priority
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const priorityColors = {
    high: 'text-red-600',
    medium: 'text-yellow-600',
    low: 'text-green-600'
  };

  return (
    <div className="p-3 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{isRTL ? titleAr : titleEn}</h4>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{isRTL ? dueDateAr : dueDateEn}</span>
          </div>
        </div>
        <div className="flex items-center">
          <AlertCircle className={`w-4 h-4 mr-1 ${priorityColors[priority]}`} />
          <span className={`text-sm ${priorityColors[priority]}`}>
            {priority === 'high' ? (isRTL ? 'عالي' : 'High') :
             priority === 'medium' ? (isRTL ? 'متوسط' : 'Medium') :
             (isRTL ? 'منخفض' : 'Low')}
          </span>
        </div>
      </div>
    </div>
  );
};