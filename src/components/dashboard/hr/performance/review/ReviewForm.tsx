import React, { useState } from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import { useAuth } from '../../../../../contexts/AuthContext';
import { Star, Save } from 'lucide-react';
import { RatingInput } from './RatingInput';

export const ReviewForm = () => {
  const { language } = useLanguage();
  const { session } = useAuth();
  const isRTL = language === 'ar';
  
  const [formData, setFormData] = useState({
    feedbackEn: '',
    feedbackAr: '',
    rating: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Review submission logic will be implemented here
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">
        {isRTL ? 'نموذج المراجعة' : 'Review Form'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isRTL ? 'التقييم العام' : 'Overall Rating'}
            </label>
            <RatingInput
              value={formData.rating}
              onChange={(rating) => setFormData({ ...formData, rating })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isRTL ? 'الملاحظات (بالإنجليزية)' : 'Feedback (English)'}
            </label>
            <textarea
              value={formData.feedbackEn}
              onChange={(e) => setFormData({ ...formData, feedbackEn: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows={4}
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isRTL ? 'الملاحظات (بالعربية)' : 'Feedback (Arabic)'}
            </label>
            <textarea
              value={formData.feedbackAr}
              onChange={(e) => setFormData({ ...formData, feedbackAr: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows={4}
              dir="rtl"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Save className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'حفظ المراجعة' : 'Save Review'}
        </button>
      </form>
    </div>
  );
};