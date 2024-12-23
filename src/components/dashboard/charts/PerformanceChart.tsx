import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { TrendingUp, Activity } from 'lucide-react';

export const PerformanceChart: React.FC = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  // Mock performance data
  const performanceData = {
    currentPeriod: [65, 78, 82, 75, 88, 95],
    previousPeriod: [60, 72, 75, 68, 82, 88],
    labels: isRTL 
      ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو']
      : ['January', 'February', 'March', 'April', 'May', 'June'],
    metrics: [
      {
        titleEn: 'Overall Performance',
        titleAr: 'الأداء العام',
        value: '92%',
        trend: '+8%',
        color: 'bg-indigo-600'
      },
      {
        titleEn: 'Efficiency Rate',
        titleAr: 'معدل الكفاءة',
        value: '88%',
        trend: '+5%',
        color: 'bg-green-600'
      },
      {
        titleEn: 'Quality Score',
        titleAr: 'درجة الجودة',
        value: '95%',
        trend: '+12%',
        color: 'bg-blue-600'
      }
    ]
  };

  // Calculate chart dimensions
  const chartHeight = 200;
  const maxValue = Math.max(...performanceData.currentPeriod, ...performanceData.previousPeriod);

  // Calculate points for SVG paths
  const getPoints = (data: number[]) => {
    return data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = chartHeight - (value / maxValue) * chartHeight;
      return `${x},${y}`;
    }).join(' ');
  };

  const currentPoints = getPoints(performanceData.currentPeriod);
  const previousPoints = getPoints(performanceData.previousPeriod);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Activity className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'تحليل الأداء' : 'Performance Analysis'}
          </h3>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span className="flex items-center">
            <div className="w-3 h-3 bg-indigo-600 rounded-full mr-2"></div>
            {isRTL ? 'الفترة الحالية' : 'Current Period'}
          </span>
          <span className="flex items-center ml-4">
            <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
            {isRTL ? 'الفترة السابقة' : 'Previous Period'}
          </span>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {performanceData.metrics.map((metric, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-600">
                {isRTL ? metric.titleAr : metric.titleEn}
              </span>
              <div className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">{metric.trend}</span>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">{metric.value}</span>
              <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
                <div 
                  className={`h-full rounded-full ${metric.color}`}
                  style={{ width: metric.value }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="relative" style={{ height: `${chartHeight}px` }}>
        <svg
          className="w-full h-full"
          viewBox={`0 0 100 ${chartHeight}`}
          preserveAspectRatio="none"
        >
          {/* Grid Lines */}
          {[0, 25, 50, 75, 100].map((value) => {
            const y = chartHeight - (value / 100) * chartHeight;
            return (
              <React.Fragment key={value}>
                <line
                  x1="0"
                  y1={y}
                  x2="100"
                  y2={y}
                  stroke="#E5E7EB"
                  strokeDasharray="2,2"
                />
                <text
                  x={isRTL ? "98" : "2"}
                  y={y - 5}
                  className="text-xs fill-gray-400"
                  textAnchor={isRTL ? "end" : "start"}
                >
                  {value}%
                </text>
              </React.Fragment>
            );
          })}

          {/* Previous Period Line */}
          <polyline
            points={previousPoints}
            fill="none"
            stroke="#D1D5DB"
            strokeWidth="2"
            className="transition-all duration-300"
          />

          {/* Current Period Line */}
          <polyline
            points={currentPoints}
            fill="none"
            stroke="#4F46E5"
            strokeWidth="2"
            className="transition-all duration-300"
          />

          {/* Data Points - Previous Period */}
          {performanceData.previousPeriod.map((value, index) => {
            const x = (index / (performanceData.previousPeriod.length - 1)) * 100;
            const y = chartHeight - (value / maxValue) * chartHeight;
            return (
              <circle
                key={`prev-${index}`}
                cx={x}
                cy={y}
                r="3"
                fill="#D1D5DB"
                className="transition-all duration-300"
              />
            );
          })}

          {/* Data Points - Current Period */}
          {performanceData.currentPeriod.map((value, index) => {
            const x = (index / (performanceData.currentPeriod.length - 1)) * 100;
            const y = chartHeight - (value / maxValue) * chartHeight;
            return (
              <circle
                key={`curr-${index}`}
                cx={x}
                cy={y}
                r="3"
                fill="#4F46E5"
                className="transition-all duration-300"
              />
            );
          })}
        </svg>
      </div>

      {/* X-Axis Labels */}
      <div className="flex justify-between mt-4">
        {performanceData.labels.map((label, index) => (
          <div key={index} className="text-sm text-gray-500">
            {label}
          </div>
        ))}
      </div>

      {/* Analysis Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">
          {isRTL ? 'ملخص التحليل' : 'Analysis Summary'}
        </h4>
        <p className="text-sm text-gray-600">
          {isRTL 
            ? 'يظهر تحليل الأداء تحسناً مستمراً عبر جميع المؤشرات الرئيسية. الاتجاه العام إيجابي مع زيادة في معدلات الكفاءة والجودة.'
            : 'Performance analysis shows consistent improvement across all key indicators. The overall trend is positive with increases in both efficiency and quality rates.'
          }
        </p>
      </div>
    </div>
  );
};