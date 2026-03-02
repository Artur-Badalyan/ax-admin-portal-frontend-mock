import { create } from 'zustand';

import type {
  MemberListDto,
  OrganizationMemberDetails,
} from '@/lib/types/user.type';
import type { QueryParams, SortObj } from '@/lib/types/table.type';
import {
  getOrgUsers,
  getOrgUser,
  removeUserFromOrg,
} from '@/api/customers.api';
import { memberListDto } from '@/lib/dto';

interface MembersState {
  selectedMembers: string[];
  members: MemberListDto;
  listLoading: boolean;
  memberDetails: OrganizationMemberDetails | null;
  detailsLoading: boolean;
  filteredParams: QueryParams;

  setSelectedMembers: (members: string[]) => void;
  setMembers: (members: MemberListDto) => void;
  setMemberDetails: (memberDetails: OrganizationMemberDetails | null) => void;
  setFilteredParams: (params: QueryParams) => void;

  fetchMembers: (organizationId: string) => Promise<void>;
  fetchMemberDetails: (userId: string) => Promise<void>;
  removeCustomerFromOrg: (customerId: string) => Promise<void>;
}

export const useMembersStore = create<MembersState>((set) => ({
  selectedMembers: [],
  members: [],
  listLoading: false,
  memberDetails: null,
  detailsLoading: false,
  filteredParams: {
    sort: { field: 'name', order: 'asc' } as SortObj,
    filter: {},
    limit: 10,
    offset: 0,
    search: { value: '' },
  },

  setSelectedMembers: (members) => set({ selectedMembers: members }),
  setMembers: (members) => set({ members }),
  setMemberDetails: (memberDetails: OrganizationMemberDetails | null) =>
    set({ memberDetails }),
  setFilteredParams: (params) => set({ filteredParams: params }),

  fetchMembers: async () => {
    set({ listLoading: true });

    try {
      const response = await getOrgUsers();
      const mappedMembers = memberListDto(response);

      set({ members: mappedMembers, listLoading: false });
      return;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to fetch organization members';
      set({ listLoading: false });
      throw new Error(errorMessage);
    }
  },
  fetchMemberDetails: async (customerId: string) => {
    set({ detailsLoading: true });

    try {
      const response = await getOrgUser(customerId);
      set({ memberDetails: response, detailsLoading: false });
      return;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to fetch organization member details';
      set({ detailsLoading: false });
      throw new Error(errorMessage);
    }
  },
  removeCustomerFromOrg: async (customerId: string) => {
    try {
      return await removeUserFromOrg(customerId);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to remove customer from organization';
      throw new Error(errorMessage);
    }
  },
}));
