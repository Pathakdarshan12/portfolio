
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * Listens to route changes and sends page_view events to Google Analytics.
 * Essential for HashRouter or Single Page Applications where the browser
 * doesn't reload on navigation.
 */
export const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      // Send a page_view event with the new path
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search + location.hash,
        page_title: document.title
      });
    }
  }, [location]);

  return null;
};
