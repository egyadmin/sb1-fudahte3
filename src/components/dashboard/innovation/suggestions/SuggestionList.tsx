import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { useSuggestions } from '../../../../hooks/useSuggestions';
import { useInnovation } from '../../../../hooks/useInnovation';
import { SuggestionItem } from './SuggestionItem';
import type { Suggestion } from '../../../../types/innovation';

export const SuggestionList: React.FC = () => {
  const { language } = useLanguage();
  const { suggestions } = useSuggestions();
  const { loading, voteSuggestion } = useInnovation();
  const isRTL = language === 'ar';

  if (!suggestions.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        {isRTL ? 'لا توجد اقتراحات حالياً' : 'No suggestions yet'}
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      {suggestions.map((suggestion: Suggestion) => (
        <SuggestionItem
          key={suggestion.id} // Add unique key prop using suggestion.id
          suggestion={suggestion}
          onVote={voteSuggestion}
          loading={loading}
        />
      ))}
    </div>
  );
};