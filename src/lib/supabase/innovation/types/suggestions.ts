import { BaseInnovationEntity, Category, Priority } from './shared';

export interface SuggestionData extends BaseInnovationEntity {
  category: Category;
  priority: Priority;
  votesCount: number;
}