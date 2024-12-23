import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Activity } from 'lucide-react';

interface ERPActivity {
  id: string;
  moduleEn: string;
  moduleAr: string;
  actionEn: string;
  actionAr: string;
  userEn: string;
  userAr: string;
  timestamp: string;
}

interface ERPActivityLogProps {
  activities: ERPActivity[];
}

export const ERPActivityLog: React.FC<ERPActivityLogProps> = ({ activities }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString(
      language === 'ar' ? 'ar-SA' : 'en-US',
      { hour: '2-digit', minute: '2-digit' }
    );
  };

  return (
    <div className="mt-6">
      <div className="flex items-center mb-4">
        <Activity className={`w-4 h-4 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-sm font-medium text-gray-700">
          {isRTL ? 'سجل النشاط' : 'Activity Log'}
        </h3>
      </div>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="p-3 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm font-medium">
                  {isRTL ? activity.moduleAr : activity.moduleEn}
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  {isRTL ? activity.actionAr : activity.actionEn}
                </p>
              </div>
              <span className="text-xs text-gray-500">
                {formatTime(activity.timestamp)}
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              {isRTL ? activity.userAr : activity.userEn}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};