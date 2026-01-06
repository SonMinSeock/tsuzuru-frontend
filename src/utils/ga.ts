import { logEvent } from 'firebase/analytics';
import { analytics } from './firebase';

export function trackTestClick() {
  if (!analytics) {
    console.warn('GA not initialized');
    return;
  }

  logEvent(analytics, 'test_button_click', {
    location: 'App.tsx',
  });
}
