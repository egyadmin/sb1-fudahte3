import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Calendar, Clock, Download } from 'lucide-react';

interface DocumentCardProps {
  titleEn: string;
  titleAr: string;
  typeEn: string;
  typeAr: string;
  expiryDateEn: string;
  expiryDateAr: string;
  status: 'active' | 'review-needed' | 'expired';
  lastReviewEn: string;
  lastReviewAr: string;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  titleEn,
  titleAr,
  typeEn,
  typeAr,
  expiryDateEn,
  expiryDateAr,
  status,
  lastReviewEn,
  lastReviewAr
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    'review-needed': 'bg-yellow-100 text-yellow-800',
    expired: 'bg-red-100 text-red-800'
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-lg">{isRTL ? titleAr : titleEn}</h3>
          <p className="text-gray-600">{isRTL ? typeAr : typeEn}</p>
        </div>
        <button className="text-indigo-600 hover:text-indigo-700">
          <Download className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>
            {isRTL ? 'تاريخ الانتهاء: ' : 'Expires: '}
            {isRTL ? expiryDateAr : expiryDateEn}
          </span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>
            {isRTL ? 'آخر مراجعة: ' : 'Last Review: '}
            {isRTL ? lastReviewAr : lastReviewEn}
          </span>
        </div>
      </div>
      <div className="mt-3">
        <span className={`px-2 py-1 rounded-full text-sm ${statusColors[status]}`}>
          {status === 'active' ? (isRTL ? 'نشط' : 'Active') :
           status === 'review-needed' ? (isRTL ? 'يحتاج مراجعة' : 'Review Needed') :
           (isRTL ? 'منتهي الصلاحية' : 'Expired')}
        </span>
      </div>
    </div>
  );
};