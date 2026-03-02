import { create } from 'zustand';
import { getLicenses, getLicenseDetails } from '@/api/licenses.api';
import type { License } from '@/lib/types/license.type';

import { useAuthStore } from './auth.store';

interface LicensesState {
  licenses: License[];
  listLoading: boolean;
  licenseDetails: License | null;
  detailsLoading: boolean;
  hasFetchedLicenses: boolean;

  getLicenses: (options?: { force?: boolean }) => Promise<void>;
  getLicenseDetails: (licenseId: string) => Promise<void>;
}

export const useLicensesStore = create<LicensesState>((set, get) => ({
  licenses: [],
  listLoading: false,
  licenseDetails: null,
  detailsLoading: false,
  hasFetchedLicenses: false,

  getLicenses: async (options) => {
    const force = options?.force ?? false;
    const { hasFetchedLicenses } = get();
    if (!force && hasFetchedLicenses) {
      return;
    }
    set({ listLoading: true });
    try {
      const data = await getLicenses();
      set({ licenses: data, listLoading: false, hasFetchedLicenses: true });
    } catch (error) {
      set({ listLoading: false });
    }
  },

  getLicenseDetails: async (id: string) => {
    set({ detailsLoading: true });
    try {
      const organizationId = useAuthStore.getState().user?.organization?.id;
      if (!organizationId) throw new Error('Organization ID is missing');
      const data = await getLicenseDetails(id);
      set({ licenseDetails: data, detailsLoading: false });
    } catch (error) {
      set({ detailsLoading: false });
    }
  },
}));
