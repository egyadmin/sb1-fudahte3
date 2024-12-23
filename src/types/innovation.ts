export interface Suggestion {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  priority: 'high' | 'medium' | 'low';
  priorityEn: string;
  priorityAr: string;
  votesCount: number;
  commentsCount: number;
  authorEn: string;
  authorAr: string;
}

export interface SuggestionVote {
  id: string;
  suggestionId: string;
  userId: string;
  createdAt: string;
}