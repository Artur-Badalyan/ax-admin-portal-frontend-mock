import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import APP_ROUTES, { hasRouteAccess, type UserRole } from '@/lib/app.routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /**
   * Array of roles that can access this route
   */
  allowedRoles?: UserRole[];
  /**
   * Path to redirect to if user doesn't have access
   */
  redirectTo?: string;
}

/**
 * Component to protect routes based on user roles
 * @example
 * ```tsx
 * <ProtectedRoute allowedRoles={['ADMIN']}>
 *   <MembersPage />
 * </ProtectedRoute>
 * ```
 */
export const ProtectedRoute = ({
  children,
  allowedRoles,
  redirectTo = APP_ROUTES.dashboard.path,
}: ProtectedRouteProps) => {
  const user = useAuthStore((s) => s.user);
  const userRole = user?.organization?.role;

  // If no roles specified, allow access (open route)
  if (!allowedRoles || allowedRoles.length === 0) {
    return <>{children}</>;
  }

  // Check if user has access
  const hasAccess = hasRouteAccess(
    { path: '', access: allowedRoles },
    userRole,
  );

  if (!hasAccess) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
