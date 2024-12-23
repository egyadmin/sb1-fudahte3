import { useState, useCallback } from 'react';
import { trendsApi } from '../../../lib/supabase/innovation/modules';
import { useInnovationError } from '../utils/error';
import type { MarketTrendData } from '../../../lib/supabase/innovation/types';

export const useMarketTrends = () => {
  const [loading, setLoading] = useState(false);
  const { handleError, handleSuccess } = useInnovationError();

  const addMarketTrend = useCallback(async (data: MarketTrendData) => {
    try {
      setLoading(true);
      await trendsApi.addTrend(data);
      handleSuccess(
        'Market trend added successfully',
        'تم إضافة اتجاه السوق بنجاح'
      );
    } catch (error) {
      handleError(
        error,
        'Error adding market trend',
        'حدث خطأ أثناء إضافة اتجاه السوق'
      );
    } finally {
      setLoading(false);
    }
  }, [handleError, handleSuccess]);

  return { loading, addMarketTrend };
};