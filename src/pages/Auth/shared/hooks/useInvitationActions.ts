import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

import { acceptInvitation, declineInvitation } from '@/api/organization.api';
import { useAuthStore } from '@/store/auth.store';
import APP_ROUTES from '@/lib/app.routes';

interface UseInvitationActionsOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

/**
 * Custom hook that encapsulates invitation action logic
 * Handles accept/decline with proper error handling and navigation
 */
export const useInvitationActions = (options?: UseInvitationActionsOptions) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loading, setLoading] = useState(false);

  /**
   * Accept invitation by ID or token
   */
  const handleAccept = async (invitationIdOrToken?: string) => {
    if (!invitationIdOrToken) {
      toast.error(t('auth.invitation.missingIdentifier'));
      return;
    }

    try {
      setLoading(true);
      const res = await acceptInvitation(invitationIdOrToken);
      setUser(res.user);
      toast.success(t('auth.invitation.acceptedInvitation'));
      navigate(APP_ROUTES.dashboard.path, { replace: true });
      options?.onSuccess?.();
    } catch (error: any) {
      toast.error(
        error?.message || t('auth.invitation.failedToAcceptInvitation'),
      );
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Decline invitation by ID or token
   */
  const handleDecline = async (
    invitationIdOrToken?: string,
    shouldReload = false,
  ) => {
    if (!invitationIdOrToken) {
      toast.error(t('auth.invitation.missingIdentifier'));
      return;
    }

    try {
      setLoading(true);
      await declineInvitation(invitationIdOrToken);

      toast.success(t('auth.invitation.declinedInvitation'));

      // Navigate based on authentication status
      if (shouldReload) {
        options?.onSuccess?.();
      } else {
        navigate(
          isAuthenticated
            ? APP_ROUTES.organizationSelection.path
            : APP_ROUTES.signIn.path,
          { replace: true },
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || t('auth.invitation.failedToDeclineInvitation'),
      );
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleAccept,
    handleDecline,
    loading,
  };
};
