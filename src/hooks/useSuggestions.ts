import { useMemo } from 'react';

export const useSuggestions = () => {
  const suggestions = useMemo(() => [
    {
      titleEn: 'Implement AI-powered customer support',
      titleAr: 'تنفيذ دعم العملاء المدعوم بالذكاء الاصطناعي',
      authorEn: 'Sarah Johnson',
      authorAr: 'سارة جونسون',
      likes: 15,
      comments: 3,
      dateEn: 'March 15, 2024',
      dateAr: '١٥ مارس ٢٠٢٤'
    },
    {
      titleEn: 'Mobile app for field workers',
      titleAr: 'تطبيق جوال للعاملين الميدانيين',
      authorEn: 'Mohammed Ali',
      authorAr: 'محمد علي',
      likes: 12,
      comments: 5,
      dateEn: 'March 14, 2024',
      dateAr: '١٤ مارس ٢٠٢٤'
    }
  ], []);

  return { suggestions };
};