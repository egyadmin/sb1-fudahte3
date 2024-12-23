export const OPPORTUNITY_STATUS = {
  DRAFT: 'draft',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;

export const SUGGESTION_CATEGORIES = {
  PROCESS: 'process',
  PRODUCT: 'product',
  SERVICE: 'service',
  TECHNOLOGY: 'technology'
} as const;

export const PRIORITY_LEVELS = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
} as const;

export const MARKET_TREND_CATEGORIES = {
  TECHNOLOGY: 'technology',
  MARKET: 'market',
  CONSUMER: 'consumer',
  INDUSTRY: 'industry'
} as const;