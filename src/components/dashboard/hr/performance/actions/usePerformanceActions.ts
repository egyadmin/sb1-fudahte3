import { useState } from 'react';
import { performanceApi } from '../../../../../lib/supabase/performance';
import { useToast } from '../../../../../hooks/useToast';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import { useAuth } from '../../../../../contexts/AuthContext';

export const usePerformanceActions = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { language } = useLanguage();
  const { session } = useAuth();
  const isRTL = language === 'ar';

  const handleSetGoals = async (employeeId: string, data: {
    titleEn: string;
    titleAr: string;
    descriptionEn?: string;
    descriptionAr?: string;
    targetDate?: string;
  }) => {
    if (!session?.user) {
      showToast(
        isRTL ? 'يجب تسجيل الدخول أولاً' : 'Must be logged in',
        'error'
      );
      return;
    }

    try {
      setLoading(true);
      await performanceApi.addGoal({
        ...data,
        employeeId: session.user.id
      });
      showToast(
        isRTL ? 'تم تحديد الهدف بنجاح' : 'Goal set successfully',
        'success'
      );
    } catch (error) {
      console.error('Goal creation error:', error);
      showToast(
        isRTL ? 'حدث خطأ أثناء تحديد الهدف' : 'Error setting goal',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    // Review submission logic will be implemented here
    console.log('Review submission not yet implemented');
  };

  const handleTeamFeedback = async () => {
    // Team feedback logic will be implemented here
    console.log('Team feedback not yet implemented');
  };

  return {
    loading,
    handleSetGoals,
    handleSubmitReview,
    handleTeamFeedback
  };
};