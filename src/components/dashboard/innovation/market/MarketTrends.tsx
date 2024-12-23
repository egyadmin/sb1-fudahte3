import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { TrendingUp, Plus, BarChart2 } from 'lucide-react';
import { useMarketTrends } from '../../../../hooks/useMarketTrends';

interface MarketTrendsProps {
  onAddTrend: () => void;
}

export const MarketTrends: React.FC<MarketTrendsProps> = ({ onAddTrend }) => {
  const { language } = useLanguage();
  const { trends } = useMarketTrends();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <TrendingUp className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'اتجاهات السوق' : 'Market Trends'}
          </h3>
        </div>
        <button
          onClick={onAddTrend}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'إضافة اتجاه' : 'Add Trend'}
        </button>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-blue-600">
            {isRTL ? 'معدل النمو' : 'Growth Rate'}
          </div>
          <div className="text-2xl font-bold text-blue-700 mt-1">+15.5%</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm text-green-600">
            {isRTL ? 'فرص السوق' : 'Market Opportunities'}
          </div>
          <div className="text-2xl font-bold text-green-700 mt-1">8</div>
        </div>
      </div>

      {/* Trends List */}
      <div className="space-y-4">
        {trends.map((trend, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-900">
                  {isRTL ? trend.titleAr : trend.titleEn}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {isRTL ? trend.impactAr : trend.impactEn}
                </p>
              </div>
              <div className="flex items-center">
                <BarChart2 className="w-4 h-4 text-indigo-600 mr-1" />
                <span className={`text-sm font-medium ${
                  trend.growthRate > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {trend.growthRate > 0 ? '+' : ''}{trend.growthRate}%
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-gray-500">
                {isRTL ? trend.trendAr : trend.trendEn}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};