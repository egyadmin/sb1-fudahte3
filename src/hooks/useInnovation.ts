import { useState, useCallback } from 'react';
import { innovationApi } from '../lib/supabase/innovation';
import { useToast } from './useToast';
import { useLanguage } from '../contexts/LanguageContext';
import type { OpportunityData, SuggestionData, MarketTrendData } from '../lib/supabase/innovation/types';

export const useInnovation = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const addOpportunity = useCallback(async (data: OpportunityData) => {
    try {
      setLoading(true);
      await innovationApi.opportunities.addOpportunity(data);
      showToast(
        isRTL ? 'تم إضافة الفرصة بنجاح' : 'Opportunity added successfully',
        'success'
      );
    } catch (error) {
      console.error('Error adding opportunity:', error);
      showToast(
        isRTL ? 'حدث خطأ أثناء إضافة الفرصة' : 'Error adding opportunity',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [isRTL, showToast]);

  const addSuggestion = useCallback(async (data: SuggestionData) => {
    try {
      setLoading(true);
      await innovationApi.suggestions.addSuggestion(data);
      showToast(
        isRTL ? 'تم إضافة الاقتراح بنجاح' : 'Suggestion added successfully',
        'success'
      );
    } catch (error) {
      console.error('Error adding suggestion:', error);
      showToast(
        isRTL ? 'حدث خطأ أثناء إضافة الاقتراح' : 'Error adding suggestion',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [isRTL, showToast]);

  const addMarketTrend = useCallback(async (data: MarketTrendData) => {
    try {
      setLoading(true);
      await innovationApi.trends.addTrend(data);
      showToast(
        isRTL ? 'تم إضافة اتجاه السوق بنجاح' : 'Market trend added successfully',
        'success'
      );
    } catch (error) {
      console.error('Error adding market trend:', error);
      showToast(
        isRTL ? 'حدث خطأ أثناء إضافة اتجاه السوق' : 'Error adding market trend',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [isRTL, showToast]);

  return {
    loading,
    addOpportunity,
    addSuggestion,
    addMarketTrend
  };
};