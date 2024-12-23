import { BaseInnovationEntity } from './shared';

export interface MarketTrendData extends BaseInnovationEntity {
  impactEn: string;
  impactAr: string;
  growthRate: number;
  category: 'technology' | 'market' | 'consumer' | 'industry';
}