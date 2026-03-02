export type UserRole = 'ADMIN' | 'USER';

interface RouteDefinition {
  path: string;
  access?: UserRole[];
  navLabel?: string;
}

interface Routes {
  signIn: RouteDefinition;
  microsoftCallback: RouteDefinition;
  authInvitation: RouteDefinition;
  organizationSelection: RouteDefinition;

  dashboard: RouteDefinition;

  organizationDetails: RouteDefinition;

  requests: RouteDefinition;
  requestDetails: RouteDefinition;

  members: RouteDefinition;
  memberLicenses: RouteDefinition;
  licenseDetails: RouteDefinition;

  billing: RouteDefinition;
  organizations: RouteDefinition;
}

const routes: Routes = {
  signIn: {
    path: '/sign-in',
  },
  microsoftCallback: {
    path: '/auth/microsoft/callback',
  },
  authInvitation: {
    path: '/invitations/:token',
  },
  organizationSelection: {
    path: '/choose-organization',
  },

  dashboard: {
    path: '/',
    navLabel: 'nav.dashboard',
    access: ['ADMIN', 'MEMBER'],
  },

  requests: {
    path: '/requests',
    navLabel: 'nav.requests',
    access: ['ADMIN'],
  },
  requestDetails: {
    path: '/requests/:id',
    access: ['ADMIN'],
  },

  members: {
    path: '/members',
    navLabel: 'nav.members',
    access: ['ADMIN'],
  },
  memberLicenses: {
    path: '/members/:id',
    access: ['ADMIN'],
  },
  licenseDetails: {
    path: '/licenses/:licenseId',
    access: ['ADMIN', 'MEMBER'],
  },

  billing: {
    path: '/billing',
    navLabel: 'nav.billing',
    access: ['ADMIN'],
  },

  organizations: {
    path: '/organizations',
    navLabel: 'nav.organization',
    access: ['ADMIN', 'MEMBER'],
  },
  organizationDetails: {
    path: '/organizations/:id',
    access: ['ADMIN', 'MEMBER'],
  },
} as Routes;

/**
 * Helper function to check if a user has access to a route
 */
export const hasRouteAccess = (
  route: RouteDefinition,
  userRole?: string,
): boolean => {
  // If no access control is defined, allow access
  if (!route.access || route.access.length === 0) {
    return true;
  }
  // If no user role, deny access to protected routes
  if (!userRole) {
    return false;
  }

  // Check if user's role is in the allowed roles
  return route.access.includes(userRole.toUpperCase() as UserRole);
};

export default routes;
