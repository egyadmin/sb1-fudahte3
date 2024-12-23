import { useMemo } from 'react';

export const useRecruitment = () => {
  const positions = useMemo(() => [
    {
      titleEn: 'Senior Software Engineer',
      titleAr: 'مهندس برمجيات أول',
      statusEn: 'Interview Phase',
      statusAr: 'مرحلة المقابلات',
      applicants: 12
    },
    {
      titleEn: 'UX Designer',
      titleAr: 'مصمم تجربة المستخدم',
      statusEn: 'Screening',
      statusAr: 'الفرز الأولي',
      applicants: 8
    }
  ], []);

  return { positions };
};