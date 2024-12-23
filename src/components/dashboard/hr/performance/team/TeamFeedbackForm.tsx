import React, { useState } from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import { useAuth } from '../../../../../contexts/AuthContext';
import { MessageSquare } from 'lucide-react';
import { RatingInput } from '../review/RatingInput';

export const TeamFeedbackForm = () => {
  const { language } = useLanguage();
  const { session } = useAuth();
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState({
    feedbackEn: '',
    feedbackAr: '',
    rating: 0,
    category: 'collaboration'
  });

  const categories = [
    { value: 'collaboration', labelEn: 'Collaboration', labelAr: 'التعاون' },
    { value: 'leadership', labelEn: 'Leadership', labelAr: 'القيادة' },
    { value: 'technical', labelEn: 'Technical Skills', labelAr: 'المهارات التقنية' },
    { value: 'communication', labelEn: 'Communication', labelAr: 'التواصل' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Team feedback submission logic will be implemented here
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">
        {isRTL ? 'تقييم الفريق' : 'Team Feedback'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isRTL ? 'الفئة' : 'Category'}
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {isRTL ? category.labelAr : category.labelEn}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isRTL ? 'التقييم' : 'Rating'}
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
          <MessageSquare className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'إرسال التقييم' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
};