import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Plausible Analytics Integration
declare global {
  interface Window {
    plausible?: (event: string, options?: { props: Record<string, any> }) => void;
  }
}

interface AnalyticsProps {
  plausibleDomain?: string;
  enablePlausible?: boolean;
}

export const Analytics = ({ 
  plausibleDomain = 'preaudit.lovable.app',
  enablePlausible = true 
}: AnalyticsProps) => {
  const location = useLocation();

  // Generate session ID
  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  };

  // Track page view
  const trackPageView = async () => {
    const sessionId = getSessionId();
    
    // Track in our database
    try {
      await supabase
        .from('analytics_events')
        .insert({
          event_name: 'page_view',
          page_url: window.location.href,
          session_id: sessionId,
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
          properties: {
            pathname: location.pathname,
            search: location.search,
            timestamp: new Date().toISOString()
          }
        });
    } catch (error) {
      console.warn('Failed to track page view:', error);
    }

    // Track with Plausible if enabled
    if (enablePlausible && window.plausible) {
      window.plausible('pageview');
    }
  };

  // Track custom event
  const trackEvent = async (eventName: string, properties?: Record<string, any>) => {
    const sessionId = getSessionId();
    
    try {
      await supabase
        .from('analytics_events')
        .insert({
          event_name: eventName,
          page_url: window.location.href,
          session_id: sessionId,
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
          properties: {
            ...properties,
            timestamp: new Date().toISOString()
          }
        });
    } catch (error) {
      console.warn('Failed to track event:', error);
    }

    // Track with Plausible if enabled
    if (enablePlausible && window.plausible) {
      window.plausible(eventName, { props: properties });
    }
  };

  // Load Plausible script
  useEffect(() => {
    if (!enablePlausible) return;

    const script = document.createElement('script');
    script.defer = true;
    script.src = 'https://plausible.io/js/script.js';
    script.setAttribute('data-domain', plausibleDomain);
    
    const existingScript = document.querySelector('script[data-domain]');
    if (!existingScript) {
      document.head.appendChild(script);
    }

    return () => {
      const scriptToRemove = document.querySelector('script[data-domain]');
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, [plausibleDomain, enablePlausible]);

  // Track page views on route change
  useEffect(() => {
    trackPageView();
  }, [location.pathname, location.search]);

  // Expose track function globally
  useEffect(() => {
    (window as any).trackEvent = trackEvent;
  }, []);

  return null;
};

// Hook for easy event tracking
export const useAnalytics = () => {
  const trackEvent = async (eventName: string, properties?: Record<string, any>) => {
    const sessionId = sessionStorage.getItem('analytics_session_id') || 'unknown';
    
    try {
      await supabase
        .from('analytics_events')
        .insert({
          event_name: eventName,
          page_url: window.location.href,
          session_id: sessionId,
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
          properties: {
            ...properties,
            timestamp: new Date().toISOString()
          }
        });
    } catch (error) {
      console.warn('Failed to track event:', error);
    }

    // Also track with Plausible if available
    if (window.plausible) {
      window.plausible(eventName, { props: properties });
    }
  };

  return { trackEvent };
};