import { useMemo } from 'react';

export const useLegalDocuments = () => {
  const documents = useMemo(() => [
    {
      id: '1',
      titleEn: 'Operating License',
      titleAr: 'رخصة التشغيل',
      typeEn: 'License',
      typeAr: 'رخصة',
      expiryDateEn: 'December 31, 2024',
      expiryDateAr: '٣١ ديسمبر ٢٠٢٤',
      status: 'active',
      lastReviewEn: 'March 1, 2024',
      lastReviewAr: '١ مارس ٢٠٢٤'
    },
    {
      id: '2',
      titleEn: 'Data Protection Policy',
      titleAr: 'سياسة حماية البيانات',
      typeEn: 'Policy',
      typeAr: 'سياسة',
      expiryDateEn: 'June 30, 2024',
      expiryDateAr: '٣٠ يونيو ٢٠٢٤',
      status: 'review-needed',
      lastReviewEn: 'January 15, 2024',
      lastReviewAr: '١٥ يناير ٢٠٢٤'
    }
  ], []);

  return { documents };
};