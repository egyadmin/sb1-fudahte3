import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Send } from 'lucide-react';

export const SuggestionInput: React.FC = () => {
  const { language } = useLanguage();
  const [suggestion, setSuggestion] = useState('');
  const isRTL = language === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestion.trim()) {
      // Handle suggestion submission
      setSuggestion('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          placeholder={isRTL ? 'اكتب اقتراحك هنا...' : 'Type your suggestion here...'}
          className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
        <button
          type="submit"
          className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};