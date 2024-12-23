import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import type { Suggestion } from '../../../../types/innovation';

interface SuggestionItemProps {
  suggestion: Suggestion;
  onVote: (id: string) => void;
  loading?: boolean;
}

export const SuggestionItem: React.FC<SuggestionItemProps> = ({
  suggestion,
  onVote,
  loading
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-200 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-medium text-gray-900">
            {isRTL ? suggestion.titleAr : suggestion.titleEn}
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            {isRTL ? suggestion.descriptionAr : suggestion.descriptionEn}
          </p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(suggestion.priority)}`}>
          {isRTL ? suggestion.priorityAr : suggestion.priorityEn}
        </span>
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onVote(suggestion.id)}
            disabled={loading}
            className="flex items-center space-x-1 text-gray-500 hover:text-primary-600 disabled:opacity-50"
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{suggestion.votesCount}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-primary-600">
            <MessageCircle className="w-4 h-4" />
            <span>{suggestion.commentsCount}</span>
          </button>
        </div>
        <div className="text-sm text-gray-500">
          {isRTL ? suggestion.authorAr : suggestion.authorEn}
        </div>
      </div>
    </div>
  );
};