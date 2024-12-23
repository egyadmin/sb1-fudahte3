export type ThemeMode = 'system' | 'light' | 'dark';
export type NotificationPreference = 'all' | 'important' | 'none';
export type AccessibilityMode = 'default' | 'large' | 'high-contrast';

export interface UserSettings {
  theme: ThemeMode;
  notifications: NotificationPreference;
  accessibility: AccessibilityMode;
}

export interface SettingsError extends Error {
  code?: string;
}