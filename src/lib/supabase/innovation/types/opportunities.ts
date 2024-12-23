import { BaseInnovationEntity, ImpactLevel } from './shared';

export interface OpportunityData extends BaseInnovationEntity {
  impact: ImpactLevel;
  expectedBenefitsEn?: string;
  expectedBenefitsAr?: string;
  resourcesRequired?: string;
  estimatedCost?: number;
  targetDate?: string;
}