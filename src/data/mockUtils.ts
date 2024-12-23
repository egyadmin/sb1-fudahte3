// Utility functions for working with mock data
import { departmentExamples, positionExamples, innovationExamples } from './mockData';
import type { Department, Position, InnovationOpportunity, InnovationSuggestion } from './mockTypes';

export const findDepartmentById = (id: string): Department | undefined => {
  return departmentExamples.find(dept => dept.id === id);
};

export const findPositionsByDepartment = (departmentId: string): Position[] => {
  return positionExamples.filter(pos => pos.departmentId === departmentId);
};

export const findOpportunityById = (id: string): InnovationOpportunity | undefined => {
  return innovationExamples.opportunities.find(opp => opp.id === id);
};

export const findSuggestionById = (id: string): InnovationSuggestion | undefined => {
  return innovationExamples.suggestions.find(sug => sug.id === id);
};