import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Hook to handle authentication redirects
 * Redirects to login page if user is not authenticated
 * Stores the intended destination for post-login redirect
 */
export function useAuthRedirect(requireAuth: boolean = false) {
  const { user, initialized } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!initialized) return; // Wait for auth to initialize

    if (requireAuth && !user) {
      // Store the current location for redirect after login
      const redirectTo = location.pathname + location.search;
      navigate('/auth', { 
        state: { from: redirectTo },
        replace: true 
      });
    }
  }, [user, initialized, requireAuth, navigate, location]);

  return { user, initialized };
}

/**
 * Hook to handle post-authentication redirects
 * Redirects user to intended destination or home page after successful auth
 */
export function usePostAuthRedirect() {
  const { user, initialized } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!initialized) return;

    if (user) {
      // Get the intended destination from location state
      const from = location.state?.from || '/';
      
      // Only redirect if we're currently on the auth page
      if (location.pathname === '/auth') {
        navigate(from, { replace: true });
      }
    }
  }, [user, initialized, navigate, location]);

  return { user, initialized };
}

/**
 * Function to check if user can perform an action
 * Returns true if authenticated, false otherwise
 */
export function useAuthAction() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const requireAuthForAction = (actionName?: string) => {
    if (!user) {
      // Store current location for redirect after login
      const redirectTo = location.pathname + location.search;
      navigate('/auth', { 
        state: { 
          from: redirectTo,
          action: actionName 
        },
        replace: false 
      });
      return false;
    }
    return true;
  };

  return { requireAuthForAction, isAuthenticated: !!user };
}