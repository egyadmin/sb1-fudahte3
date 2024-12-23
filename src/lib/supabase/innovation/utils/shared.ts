export const formatErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return 'An unexpected error occurred';
};

export const validateBilingual = (textEn?: string, textAr?: string): boolean => {
  return !!(textEn?.trim() && textAr?.trim());
};

export const validateNumber = (value: unknown): boolean => {
  return typeof value === 'number' && !isNaN(value);
};

export const validateDate = (dateString?: string): boolean => {
  if (!dateString) return true; // Optional dates are valid
  return !isNaN(Date.parse(dateString));
};