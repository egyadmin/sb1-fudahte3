import { useState, useCallback } from 'react';
import { suggestionsApi } from '../../../lib/supabase/innovation/modules';
import { useInnovationError } from '../utils/error';
import type { SuggestionData } from '../../../lib/supabase/innovation/types';

export const useSuggestions = () => {
  const [loading, setLoading] = useState(false);
  const { handleError, handleSuccess } = useInnovationError();

  const addSuggestion = useCallback(async (data: SuggestionData) => {
    try {
      setLoading(true);
      await suggestionsApi.addSuggestion(data);
      handleSuccess(
        'Suggestion added successfully',
        'تم إضافة الاقتراح بنجاح'
      );
    } catch (error) {
      handleError(
        error,
        'Error adding suggestion',
        'حدث خطأ أثناء إضافة الاقتراح'
      );
    } finally {
      setLoading(false);
    }
  }, [handleError, handleSuccess]);

  return { loading, addSuggestion };
};