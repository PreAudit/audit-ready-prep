import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ErrorMonitorProps {
  enableErrorTracking?: boolean;
  enableUnhandledRejections?: boolean;
}

export const ErrorMonitor = ({ 
  enableErrorTracking = true,
  enableUnhandledRejections = true 
}: ErrorMonitorProps) => {
  
  // Generate session ID
  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  };

  // Log error to database
  const logError = async (
    errorMessage: string,
    errorStack?: string,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium',
    metadata?: Record<string, any>
  ) => {
    try {
      await supabase
        .from('error_logs')
        .insert({
          error_message: errorMessage,
          error_stack: errorStack || null,
          user_agent: navigator.userAgent,
          url: window.location.href,
          session_id: getSessionId(),
          severity,
          metadata: {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            viewport: {
              width: window.innerWidth,
              height: window.innerHeight
            },
            ...metadata
          }
        });
    } catch (error) {
      // Fallback to console if database logging fails
      console.error('Failed to log error to database:', error);
      console.error('Original error:', errorMessage, errorStack);
    }
  };

  // Handle JavaScript errors
  useEffect(() => {
    if (!enableErrorTracking) return;

    const handleError = (event: ErrorEvent) => {
      const severity = event.error?.name === 'ChunkLoadError' ? 'high' : 'medium';
      
      logError(
        event.message || 'Unknown error',
        event.error?.stack || event.error?.toString(),
        severity,
        {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          type: 'javascript_error'
        }
      );
    };

    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, [enableErrorTracking]);

  // Handle unhandled promise rejections
  useEffect(() => {
    if (!enableUnhandledRejections) return;

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason;
      const errorMessage = error?.message || error?.toString() || 'Unhandled promise rejection';
      const errorStack = error?.stack || '';

      logError(
        errorMessage,
        errorStack,
        'high',
        {
          type: 'unhandled_promise_rejection',
          reason: error
        }
      );
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [enableUnhandledRejections]);

  // Expose error logging function globally
  useEffect(() => {
    (window as any).logError = logError;
  }, []);

  return null;
};

// Hook for manual error reporting
export const useErrorReporting = () => {
  const reportError = async (
    error: Error | string,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium',
    metadata?: Record<string, any>
  ) => {
    const errorMessage = typeof error === 'string' ? error : error.message;
    const errorStack = typeof error === 'string' ? undefined : error.stack;
    const sessionId = sessionStorage.getItem('analytics_session_id') || 'unknown';
    
    try {
      await supabase
        .from('error_logs')
        .insert({
          error_message: errorMessage,
          error_stack: errorStack || null,
          user_agent: navigator.userAgent,
          url: window.location.href,
          session_id: sessionId,
          severity,
          metadata: {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            manual_report: true,
            ...metadata
          }
        });
    } catch (dbError) {
      console.error('Failed to report error:', dbError);
    }
  };

  return { reportError };
};