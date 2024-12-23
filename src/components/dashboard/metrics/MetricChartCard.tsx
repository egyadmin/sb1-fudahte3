import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { LucideIcon, TrendingUp, TrendingDown, BarChart } from 'lucide-react';

interface MetricChartCardProps {
  icon: LucideIcon;
  titleEn: string;
  titleAr: string;
  value: string;
  trend: string;
  color: string;
  data: number[];
  labels: string[];
}

export const MetricChartCard: React.FC<MetricChartCardProps> = ({
  icon: Icon,
  titleEn,
  titleAr,
  value,
  trend,
  color,
  data,
  labels
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const isPositive = trend.startsWith('+');

  // Calculate sparkline points
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;
  const height = 40;
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = height - ((value - minValue) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className={`${color} p-6 rounded-xl shadow-soft transition-all duration-300 transform hover:scale-105`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-white bg-opacity-20 rounded-lg">
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
      <p className="text-3xl font-bold text-white mb-4">{value}</p>

      {/* Sparkline Chart */}
      <div className="relative h-10 mt-4">
        <svg className="w-full h-full" viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
          {/* Gradient definition */}
          <defs>
            <linearGradient id={`sparkline-gradient-${titleEn}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path
            d={`M0,${height} ${points} 100,${height} Z`}
            fill={`url(#sparkline-gradient-${titleEn})`}
            className="transition-all duration-300"
          />

          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="2"
            className="transition-all duration-300"
          />

          {/* Data points */}
          {data.map((value, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = height - ((value - minValue) / range) * height;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                fill="white"
                className="transition-all duration-300"
              />
            );
          })}
        </svg>
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-2 text-xs text-white text-opacity-70">
        {labels.map((label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>
    </div>
  );
};