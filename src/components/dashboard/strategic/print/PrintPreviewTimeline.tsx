import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Calendar, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface TimelinePhase {
  titleEn: string;
  titleAr: string;
  durationEn: string;
  durationAr: string;
  statusEn: string;
  statusAr: string;
  status: string;
  progressPercent: number;
  milestonesEn: string[];
  milestonesAr: string[];
}

interface PrintPreviewTimelineProps {
  timeline: TimelinePhase[];
}

export const PrintPreviewTimeline: React.FC<PrintPreviewTimelineProps> = ({ timeline }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'at-risk':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="print-section print-avoid-break">
      <div className="flex items-center mb-4">
        <Calendar className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h2 className="text-xl font-bold">
          {isRTL ? 'الجدول الزمني للمشروع' : 'Project Timeline'}
        </h2>
      </div>

      <table className="w-full border-collapse print-table">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-3 border text-start w-1/4">
              {isRTL ? 'المرحلة' : 'Phase'}
            </th>
            <th className="p-3 border text-start w-1/4">
              {isRTL ? 'المدة' : 'Duration'}
            </th>
            <th className="p-3 border text-start w-1/4">
              {isRTL ? 'المعالم الرئيسية' : 'Key Milestones'}
            </th>
            <th className="p-3 border text-start w-1/4">
              {isRTL ? 'الحالة والتقدم' : 'Status & Progress'}
            </th>
          </tr>
        </thead>
        <tbody>
          {timeline.map((phase, index) => (
            <tr key={index}>
              <td className="p-3 border">
                <div className="font-medium">
                  {isRTL ? phase.titleAr : phase.titleEn}
                </div>
              </td>
              <td className="p-3 border">
                <div className="flex items-center">
                  <Clock className={`w-4 h-4 text-gray-400 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {isRTL ? phase.durationAr : phase.durationEn}
                </div>
              </td>
              <td className="p-3 border">
                <ul className="list-disc list-inside space-y-1">
                  {(isRTL ? phase.milestonesAr : phase.milestonesEn).map((milestone, idx) => (
                    <li key={idx} className="text-sm">
                      {milestone}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="p-3 border">
                <div className="flex items-center gap-2 mb-2">
                  {getStatusIcon(phase.status)}
                  <span className="text-sm">
                    {isRTL ? phase.statusAr : phase.statusEn}
                  </span>
                </div>
                {phase.progressPercent > 0 && (
                  <div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${phase.progressPercent}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {phase.progressPercent}% {isRTL ? 'مكتمل' : 'Complete'}
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};