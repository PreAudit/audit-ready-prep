-- Fix security vulnerability: Restrict access to error_logs and analytics_events tables
-- Only allow authenticated users with admin privileges to read these sensitive tables

-- First, let's add SELECT policies that deny access by default (most restrictive approach)
-- This ensures only system administrators can access error logs and analytics data

-- Error logs should only be accessible to system administrators
-- Using false for now - in a production system you'd want to create an admin role system
CREATE POLICY "Only system admins can view error logs"
ON public.error_logs
FOR SELECT
TO authenticated
USING (false); -- Deny all access for now - can be updated when admin system is implemented

-- Analytics events should only be accessible to system administrators  
CREATE POLICY "Only system admins can view analytics events"
ON public.analytics_events
FOR SELECT  
TO authenticated
USING (false); -- Deny all access for now - can be updated when admin system is implemented

-- Add a comment explaining the security decision
COMMENT ON POLICY "Only system admins can view error logs" ON public.error_logs IS 
'Restricts access to error logs to prevent exposure of sensitive user data, system vulnerabilities, and stack traces. Access should only be granted to system administrators.';

COMMENT ON POLICY "Only system admins can view analytics events" ON public.analytics_events IS 
'Restricts access to analytics data to prevent exposure of user behavior tracking data, session IDs, and user agents. Access should only be granted to system administrators.';