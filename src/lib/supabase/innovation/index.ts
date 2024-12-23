import { opportunitiesApi } from './modules/opportunities/api';
import { suggestionsApi } from './modules/suggestions/api';
import { trendsApi } from './modules/trends/api';

export const innovationApi = {
  opportunities: opportunitiesApi,
  suggestions: suggestionsApi,
  trends: trendsApi
};

export * from './types';
export * from './constants';
export * from './utils';