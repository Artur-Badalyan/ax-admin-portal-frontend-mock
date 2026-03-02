import { useState, useEffect } from 'react';

import { getPendingInvitations } from '@/api/organization.api';
import type { PendingInvitation } from '@/lib/types/auth.type';

/**
 * Custom hook to fetch and manage pending invitations
 * Provides loading state and error handling
 */
export const usePendingInvitations = () => {
  const [invitations, setInvitations] = useState<PendingInvitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadInvitations = async () => {
    try {
      setLoading(true);
      setError(null);
      const invites = await getPendingInvitations();
      setInvitations(invites || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to load invitations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvitations();
  }, []);

  return {
    invitations,
    loading,
    error,
    reload: loadInvitations,
  };
};
