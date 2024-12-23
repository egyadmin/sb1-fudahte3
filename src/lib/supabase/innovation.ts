import { opportunitiesApi } from './innovation/opportunities';
import { suggestionsApi } from './innovation/suggestions';
import { trendsApi } from './innovation/trends';

export const innovationApi = {
  ...opportunitiesApi,
  ...suggestionsApi,
  ...trendsApi
};