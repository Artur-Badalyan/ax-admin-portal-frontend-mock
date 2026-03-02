import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import APP_ROUTES from '@/lib/app.routes';

import { logout as apiLogout, fetchMe } from '@/api/auth.api';
import {
  getOrganizationByToken,
  getUserOrganizations,
} from '@/api/organization.api';
import type { AuthState } from '@/lib/types/auth.type';
import { GLOBAL_ROLES, ORGANIZATION_ROLES } from '@/lib/constants';
import { mockAuthResponse } from '@/data/auth';

const STORAGE_KEY = 'auth_store';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,

      organizationDetails: null,
      organizationLoading: false,

      userOrganizations: null,
      userOrganizationsLoading: false,

      isSuperAdmin: (): boolean => {
        const user = useAuthStore.getState().user;
        return user?.globalRole === GLOBAL_ROLES.SUPER_ADMIN;
      },
      isOrgAdmin: (): boolean => {
        const user = useAuthStore.getState().user;
        return user?.organization?.role === ORGANIZATION_ROLES.ADMIN;
      },

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          isLoading: false,
        }),

      updateUser: (data) =>
        set((state) => {
          if (!state.user) return state;

          return {
            user: {
              ...state.user,
              ...data,
            },
          };
        }),

      setAccessToken: (token) => set({ accessToken: token }),
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      setIsLoading: (value) => set({ isLoading: value }),

      fetchMe: async () => {
        set({ isLoading: true });
        try {
          const response = await fetchMe();
          set({
            user: response,
            isAuthenticated: !!response,
            isLoading: false,
          });
          return response;
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          await apiLogout();
        } finally {
          set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
          });
          clearAuthData();
          location.href = APP_ROUTES.signIn.path;
        }
      },

      fetchUserOrganizations: async () => {
        set({ userOrganizationsLoading: true });
        try {
          const orgs = await getUserOrganizations();
          set({ userOrganizations: orgs, userOrganizationsLoading: false });
        } catch (error) {
          set({ userOrganizations: [], userOrganizationsLoading: false });
        }
      },

      getOrganizationByToken: async (token: string) => {
        set({ organizationLoading: true });
        try {
          const response = await getOrganizationByToken(token);
          set({
            organizationDetails: response,
            organizationLoading: false,
          });
          return response;
        } catch (error) {
          set({ organizationDetails: null, organizationLoading: false });
          throw error;
        }
      },

      handleOrganizationCallback: async (_code: string) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const response = mockAuthResponse;

        if (!response) {
          return { status: 'error', message: 'Failed to authenticate' };
        }

        const { access_token, user, has_pending_invites } = response;
        if (!access_token || !user) {
          return { status: 'no-access' };
        }

        set({
          user,
          accessToken: access_token,
          isAuthenticated: !!access_token,
        });
        return {
          status: 'success',
          user,
          has_pending_invites: !!has_pending_invites,
        };
      },

      hydrate: (user, accessToken) =>
        set({
          user,
          accessToken,
          isAuthenticated: !!accessToken,
          isLoading: false,
        }),
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export const clearAuthData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
