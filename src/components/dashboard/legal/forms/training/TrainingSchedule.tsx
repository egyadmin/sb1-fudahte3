import React from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';

interface TrainingScheduleProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export const TrainingSchedule: React.FC<TrainingScheduleProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {isRTL ? 'تاريخ البداية' : 'Start Date'}
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {isRTL ? 'تاريخ النهاية' : 'End Date'}
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
          required
          min={startDate}
        />
      </div>
    </>
  );
};