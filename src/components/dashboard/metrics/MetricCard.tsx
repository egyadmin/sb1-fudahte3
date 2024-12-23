import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  titleEn: string;
  titleAr: string;
  value: string;
  trend: string;
  color: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  titleEn,
  titleAr,
  value,
  trend,
  color,
  onClick
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const isPositive = trend.startsWith('+');

  return (
    <div
      onClick={onClick}
      className={`${color} p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer relative overflow-hidden group`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)"/>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 bg-white bg-opacity-20 rounded-lg transform transition-transform group-hover:scale-110 ${
            isRTL ? 'ml-2' : 'mr-2'
          }`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className={`flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            <span className="font-medium">{trend}</span>
          </div>
        </div>
        <h3 className="text-lg font-medium text-white mb-1">
          {isRTL ? titleAr : titleEn}
        </h3>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
};