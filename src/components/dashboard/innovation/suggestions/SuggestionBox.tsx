import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { MessageSquarePlus, Plus, ThumbsUp } from 'lucide-react';
import { useSuggestions } from '../../../../hooks/useSuggestions';
import { SuggestionList } from './SuggestionList';

export const SuggestionBox = () => {
  const { language } = useLanguage();
  const { suggestions } = useSuggestions();
  const [showForm, setShowForm] = useState(false);
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <MessageSquarePlus className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'صندوق الاقتراحات' : 'Suggestion Box'}
          </h3>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'إضافة اقتراح' : 'Add Suggestion'}
        </button>
      </div>

      {/* Suggestion Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-blue-600">
            {isRTL ? 'الاقتراحات النشطة' : 'Active Suggestions'}
          </div>
          <div className="text-2xl font-bold text-blue-700 mt-1">24</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm text-green-600">
            {isRTL ? 'معدل التنفيذ' : 'Implementation Rate'}
          </div>
          <div className="text-2xl font-bold text-green-700 mt-1">75%</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-sm text-purple-600">
            {isRTL ? 'معدل المشاركة' : 'Engagement Rate'}
          </div>
          <div className="text-2xl font-bold text-purple-700 mt-1">92%</div>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-900">
                  {isRTL ? suggestion.titleAr : suggestion.titleEn}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {isRTL ? suggestion.authorAr : suggestion.authorEn}
                </p>
              </div>
              <span className="text-sm text-gray-500">
                {isRTL ? suggestion.dateAr : suggestion.dateEn}
              </span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-gray-500 hover:text-indigo-600">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  <span>{suggestion.likes}</span>
                </button>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                suggestion.priority === 'high' ? 'bg-red-100 text-red-800' :
                suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {isRTL ? 'أولوية عالية' : 'High Priority'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};