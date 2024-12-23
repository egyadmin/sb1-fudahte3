import React from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import { TrendingUp } from 'lucide-react';

interface TeamMemberCardProps {
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  score: number;
  trend: string;
  imageUrl: string;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  nameEn,
  nameAr,
  roleEn,
  roleAr,
  score,
  trend,
  imageUrl
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
      <div className="flex items-center space-x-4">
        <img
          src={imageUrl}
          alt={isRTL ? nameAr : nameEn}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-medium">
            {isRTL ? nameAr : nameEn}
          </h4>
          <p className="text-sm text-gray-600">
            {isRTL ? roleAr : roleEn}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            {isRTL ? 'درجة الأداء' : 'Performance Score'}
          </span>
          <div className="flex items-center text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">{trend}</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${score}%` }}
          />
        </div>
        <div className="mt-1 text-right">
          <span className="text-sm font-medium">{score}%</span>
        </div>
      </div>
    </div>
  );
};