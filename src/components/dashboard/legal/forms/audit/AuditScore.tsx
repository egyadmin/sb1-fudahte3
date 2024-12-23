import React from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';

interface AuditScoreProps {
  score: number;
  onChange: (score: number) => void;
}

export const AuditScore: React.FC<AuditScoreProps> = ({
  score,
  onChange
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const getScoreColor = (value: number) => {
    if (value >= 90) return 'text-green-600';
    if (value >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">
        {isRTL ? 'درجة التقييم' : 'Audit Score'}
      </h4>
      
      <div className="flex items-center gap-4">
        <input
          type="range"
          min="0"
          max="100"
          value={score}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className={`text-lg font-semibold ${getScoreColor(score)}`}>
          {score}%
        </span>
      </div>

      <div className="flex justify-between text-sm text-gray-500">
        <span>{isRTL ? 'غير مطابق' : 'Non-Compliant'}</span>
        <span>{isRTL ? 'مطابق جزئياً' : 'Partially Compliant'}</span>
        <span>{isRTL ? 'مطابق' : 'Compliant'}</span>
      </div>
    </div>
  );
};