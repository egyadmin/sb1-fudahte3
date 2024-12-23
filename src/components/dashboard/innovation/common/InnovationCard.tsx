import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { TrendingUp } from 'lucide-react';

interface InnovationCardProps {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  status: string;
  statusEn: string;
  statusAr: string;
  progress?: number;
  icon?: React.ReactNode;
  className?: string;
}

export const InnovationCard: React.FC<InnovationCardProps> = ({
  titleEn,
  titleAr,
  descriptionEn,
  descriptionAr,
  status,
  statusEn,
  statusAr,
  progress,
  icon = <TrendingUp />,
  className = ''
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-indigo-50 rounded-lg">
            {icon}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">
              {isRTL ? titleAr : titleEn}
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              {isRTL ? descriptionAr : descriptionEn}
            </p>
          </div>
        </div>
        <span className={`px-2 py-1 text-sm rounded-full ${getStatusColor(status)}`}>
          {isRTL ? statusAr : statusEn}
        </span>
      </div>

      {progress !== undefined && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">
              {isRTL ? 'التقدم' : 'Progress'}
            </span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};