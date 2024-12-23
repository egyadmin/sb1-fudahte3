import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { TrendingUp } from 'lucide-react';

interface MetricChartProps {
  data: number[];
  labels: string[];
  height?: number;
}

export const MetricChart: React.FC<MetricChartProps> = ({
  data,
  labels,
  height = 60
}) => {
  const maxValue = Math.max(...data);
  
  return (
    <div className="relative" style={{ height: `${height}px` }}>
      <div className="absolute inset-0 flex items-end justify-between">
        {data.map((value, index) => {
          const percentage = (value / maxValue) * 100;
          return (
            <div
              key={index}
              className="w-2 bg-indigo-200 rounded-t transition-all duration-500 ease-in-out hover:bg-indigo-300"
              style={{ height: `${percentage}%` }}
              title={`${labels[index]}: ${value}`}
            />
          );
        })}
      </div>
    </div>
  );
};