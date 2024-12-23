import { useState, useCallback } from 'react';
import { opportunitiesApi } from '../../../lib/supabase/innovation/modules';
import { useInnovationError } from '../utils/error';
import type { OpportunityData } from '../../../lib/supabase/innovation/types';

export const useOpportunities = () => {
  const [loading, setLoading] = useState(false);
  const { handleError, handleSuccess } = useInnovationError();

  const addOpportunity = useCallback(async (data: OpportunityData) => {
    try {
      setLoading(true);
      await opportunitiesApi.addOpportunity(data);
      handleSuccess(
        'Opportunity added successfully',
        'تم إضافة الفرصة بنجاح'
      );
    } catch (error) {
      handleError(
        error,
        'Error adding opportunity',
        'حدث خطأ أثناء إضافة الفرصة'
      );
    } finally {
      setLoading(false);
    }
  }, [handleError, handleSuccess]);

  return { loading, addOpportunity };
};