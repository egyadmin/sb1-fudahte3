import { useOpportunities } from './modules/opportunities';
import { useSuggestions } from './modules/suggestions';
import { useMarketTrends } from './modules/trends';

export const useInnovation = () => {
  const opportunities = useOpportunities();
  const suggestions = useSuggestions();
  const trends = useMarketTrends();

  return {
    loading: opportunities.loading || suggestions.loading || trends.loading,
    addOpportunity: opportunities.addOpportunity,
    addSuggestion: suggestions.addSuggestion,
    addMarketTrend: trends.addMarketTrend
  };
};