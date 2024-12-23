import type { UserSettings } from './types';
import { THEME_MODES, NOTIFICATION_PREFERENCES, ACCESSIBILITY_MODES } from './constants';

export const validateSettings = (settings: Partial<UserSettings>): boolean => {
  if (settings.theme && !Object.values(THEME_MODES).includes(settings.theme)) {
    return false;
  }
  
  if (settings.notifications && !Object.values(NOTIFICATION_PREFERENCES).includes(settings.notifications)) {
    return false;
  }
  
  if (settings.accessibility && !Object.values(ACCESSIBILITY_MODES).includes(settings.accessibility)) {
    return false;
  }

  return true;
};

export const getDefaultSettings = (): UserSettings => ({
  theme: THEME_MODES.SYSTEM,
  notifications: NOTIFICATION_PREFERENCES.ALL,
  accessibility: ACCESSIBILITY_MODES.DEFAULT
});