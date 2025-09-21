import React, { ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  showLoading?: boolean;
}

/**
 * Component that shows loading state while authentication is initializing
 * Useful for preventing flash of unauthenticated content
 */
export function AuthGuard({ 
  children, 
  fallback,
  showLoading = true 
}: AuthGuardProps) {
  const { initialized, loading } = useAuth();

  if (!initialized || loading) {
    if (showLoading) {
      return (
        <div className="flex justify-center items-center min-h-[200px]">
          <LoadingSpinner size="large" />
        </div>
      );
    }
    return null;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}