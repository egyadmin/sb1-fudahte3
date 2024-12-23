import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Lightbulb, Plus, TrendingUp } from 'lucide-react';
import { useOpportunities } from '../../../../hooks/useOpportunities';

interface OpportunityBoardProps {
  onAddOpportunity: () => void;
}

export const OpportunityBoard: React.FC<OpportunityBoardProps> = ({ onAddOpportunity }) => {
  const { language } = useLanguage();
  const { opportunities } = useOpportunities();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Lightbulb className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h2 className="text-xl font-semibold">
            {isRTL ? 'لوحة الفرص' : 'Opportunity Board'}
          </h2>
        </div>
        <button
          onClick={onAddOpportunity}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'إضافة فرصة' : 'Add Opportunity'}
        </button>
      </div>

      {/* Opportunity Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-blue-600">
            {isRTL ? 'الفرص النشطة' : 'Active Opportunities'}
          </div>
          <div className="text-2xl font-bold text-blue-700 mt-1">12</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm text-green-600">
            {isRTL ? 'معدل النجاح' : 'Success Rate'}
          </div>
          <div className="text-2xl font-bold text-green-700 mt-1">85%</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-sm text-purple-600">
            {isRTL ? 'العائد المتوقع' : 'Expected ROI'}
          </div>
          <div className="text-2xl font-bold text-purple-700 mt-1">3.2x</div>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {opportunities.map((opportunity, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-900">
                  {isRTL ? opportunity.titleAr : opportunity.titleEn}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {isRTL ? opportunity.descriptionAr : opportunity.descriptionEn}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                opportunity.impact === 'high' ? 'bg-green-100 text-green-800' :
                opportunity.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {opportunity.impact === 'high' ? (isRTL ? 'تأثير عالي' : 'High Impact') :
                 opportunity.impact === 'medium' ? (isRTL ? 'تأثير متوسط' : 'Medium Impact') :
                 (isRTL ? 'تأثير منخفض' : 'Low Impact')}
              </span>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 text-indigo-600 mr-1" />
                <span className="text-sm font-medium">{opportunity.score}%</span>
              </div>
              <span className={`text-sm ${
                opportunity.statusEn === 'Under Review' ? 'text-yellow-600' :
                opportunity.statusEn === 'In Progress' ? 'text-blue-600' :
                'text-green-600'
              }`}>
                {isRTL ? opportunity.statusAr : opportunity.statusEn}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};