import React from 'react';
import { AlertCard } from './AlertCard';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Bell } from 'lucide-react';

export const DashboardAlerts = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const alerts = [
    {
      titleEn: 'System Update',
      titleAr: 'تحديث النظام',
      messageEn: 'Scheduled maintenance in 2 hours',
      messageAr: 'صيانة مجدولة خلال ساعتين',
      type: 'info'
    },
    {
      titleEn: 'Performance Alert',
      titleAr: 'تنبيه الأداء',
      messageEn: 'Server load exceeding threshold',
      messageAr: 'تجاوز حمل الخادم للحد المسموح',
      type: 'warning'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center mb-4">
        <Bell className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h2 className="text-xl font-semibold">
          {isRTL ? 'التنبيهات' : 'Alerts'}
        </h2>
      </div>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <AlertCard key={index} {...alert} />
        ))}
      </div>
    </div>
  );
};