import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Calendar, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useProjectTimeline } from '../../../../hooks/useProjectTimeline';

export const TimelineScheduling: React.FC = () => {
  const { language } = useLanguage();
  const { timeline } = useProjectTimeline();
  const isRTL = language === 'ar';

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'at-risk':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'bg-green-50 text-green-700';
      case 'at-risk':
        return 'bg-yellow-50 text-yellow-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="bg-purple-50 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <Calendar className={`w-5 h-5 text-purple-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold text-gray-900">
          {isRTL ? 'الجداول الزمنية' : 'Timeline Scheduling'}
        </h3>
      </div>
      <div className="space-y-4">
        {timeline.map((phase, index) => (
          <div key={index} className="bg-white p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                {getStatusIcon(phase.status)}
                <h4 className={`font-medium text-gray-900 ${isRTL ? 'mr-2' : 'ml-2'}`}>
                  {isRTL ? phase.titleAr : phase.titleEn}
                </h4>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(phase.status)}`}>
                {isRTL ? phase.statusAr : phase.statusEn}
              </span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <Clock className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
              <span>{isRTL ? phase.durationAr : phase.durationEn}</span>
            </div>

            {phase.progressPercent > 0 && (
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">
                    {isRTL ? 'التقدم' : 'Progress'}
                  </span>
                  <span className="font-medium">{phase.progressPercent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${phase.progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            <div className="mt-3">
              <h5 className="text-sm font-medium text-gray-700 mb-2">
                {isRTL ? 'المعالم الرئيسية' : 'Key Milestones'}
              </h5>
              <ul className="space-y-1">
                {(isRTL ? phase.milestonesAr : phase.milestonesEn).map((milestone: string, idx: number) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"></div>
                    {milestone}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};