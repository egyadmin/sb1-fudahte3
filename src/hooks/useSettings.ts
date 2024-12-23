import { useState, useCallback } from 'react';
import { settingsApi } from '../lib/supabase/settings/api';
import { useToast } from './useToast';
import { useLanguage } from '../contexts/LanguageContext';
import type { UserSettings } from '../lib/supabase/settings/types';

export const useSettings = () => {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const updateSettings = useCallback(async (newSettings: Partial<UserSettings>) => {
    try {
      setLoading(true);
      await settingsApi.updateSettings(newSettings);
      setSettings(prev => prev ? { ...prev, ...newSettings } : null);
      showToast(
        isRTL ? 'تم حفظ الإعدادات بنجاح' : 'Settings saved successfully',
        'success'
      );
    } catch (error) {
      console.error('Error updating settings:', error);
      showToast(
        isRTL ? 'حدث خطأ أثناء حفظ الإعدادات' : 'Error saving settings',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [isRTL, showToast]);

  return {
    settings,
    loading,
    updateSettings
  };
};