```tsx
import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { BarChart2, TrendingUp, PieChart } from 'lucide-react';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor?: string[];
    borderWidth?: number;
  }[];
}

interface DashboardChartProps {
  type: 'bar' | 'line' | 'pie';
  data: ChartData;
  title: string;
  height?: number;
}

export const DashboardChart: React.FC<DashboardChartProps> = ({
  type,
  data,
  title,
  height = 300
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  // Professional color palette
  const colors = {
    primary: ['#4F46E5', '#818CF8', '#A5B4FC', '#C7D2FE', '#E0E7FF'],
    success: ['#059669', '#34D399', '#6EE7B7', '#A7F3D0', '#D1FAE5'],
    warning: ['#D97706', '#FBBF24', '#FCD34D', '#FDE68A', '#FEF3C7'],
    danger: ['#DC2626', '#F87171', '#FCA5A5', '#FECACA', '#FEE2E2'],
    info: ['#0891B2', '#22D3EE', '#67E8F9', '#A5F3FC', '#CFFAFE']
  };

  // Chart configuration
  const chartConfig = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isRTL ? 'left' : 'right',
        rtl: isRTL,
        labels: {
          font: {
            family: isRTL ? 'Cairo' : 'Inter'
          }
        }
      },
      tooltip: {
        rtl: isRTL,
        titleFont: {
          family: isRTL ? 'Cairo' : 'Inter'
        },
        bodyFont: {
          family: isRTL ? 'Cairo' : 'Inter'
        }
      }
    },
    scales: type !== 'pie' ? {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: isRTL ? 'Cairo' : 'Inter'
          }
        }
      },
      y: {
        grid: {
          borderDash: [2],
          color: '#E5E7EB'
        },
        ticks: {
          font: {
            family: isRTL ? 'Cairo' : 'Inter'
          }
        }
      }
    } : undefined
  };

  const ChartIcon = type === 'bar' ? BarChart2 : type === 'line' ? TrendingUp : PieChart;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <ChartIcon className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      </div>
      <div style={{ height: `${height}px` }}>
        {/* Chart will be rendered here */}
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          Chart visualization will be implemented here
        </div>
      </div>
    </div>
  );
};
```