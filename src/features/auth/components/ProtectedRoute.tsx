import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth.hooks';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, initializing } = useAuth();

  if (initializing) return null;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
