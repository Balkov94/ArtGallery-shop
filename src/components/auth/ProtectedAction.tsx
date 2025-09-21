import React, { ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useAuthAction } from '../../hooks/useAuthRedirect';

interface ProtectedActionProps {
  children: ReactNode;
  fallback?: ReactNode;
  actionName?: string;
  showLoginPrompt?: boolean;
}

/**
 * Component that wraps actions requiring authentication
 * Shows children for authenticated users, fallback for unauthenticated
 */
export function ProtectedAction({ 
  children, 
  fallback, 
  actionName,
  showLoginPrompt = true 
}: ProtectedActionProps) {
  const { user } = useAuth();
  const { requireAuthForAction } = useAuthAction();

  if (user) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (showLoginPrompt) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800 mb-3">
          Please log in to {actionName || 'perform this action'}.
        </p>
        <button 
          onClick={() => requireAuthForAction(actionName)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  return null;
}

/**
 * Higher-order component for protecting entire components
 */
export function withAuthProtection<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    fallback?: ReactNode;
    redirectToLogin?: boolean;
  } = {}
) {
  return function ProtectedComponent(props: P) {
    const { user, initialized } = useAuth();
    const { requireAuthForAction } = useAuthAction();

    if (!initialized) {
      return (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (!user) {
      if (options.redirectToLogin) {
        requireAuthForAction();
        return null;
      }

      if (options.fallback) {
        return <>{options.fallback}</>;
      }

      return (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Please log in to access this content.</p>
          <button 
            onClick={() => requireAuthForAction()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      );
    }

    return <Component {...props} />;
  };
}