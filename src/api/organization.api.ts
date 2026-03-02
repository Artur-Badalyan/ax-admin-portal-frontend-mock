import {
  mockUserOrganizations,
  mockInvitationDetails,
  mockPendingInvitations,
} from '@/data/organizations';
import { mockCurrentUser } from '@/data/users';
import type { IOrganization } from '@/lib/types/user.type';
import type {
  InvitationDetails,
  PendingInvitation,
} from '@/lib/types/auth.type';

// Mock API calls - no actual network requests
export const createOrganization = async (
  organizationName: string,
): Promise<IOrganization> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id: `org-${Date.now()}`,
    name: organizationName,
    role: 'ADMIN',
    status: 'ACTIVE',
  };
};

export const getOrganizationByToken = async (
  _token: string,
): Promise<InvitationDetails> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockInvitationDetails;
};

export const getPendingInvitations = async (): Promise<PendingInvitation[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockPendingInvitations;
};

export const inviteOrganizationMember = async (
  organizationId: string,
  email: string,
): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(`Invited ${email} to organization ${organizationId}`);
};

export const switchOrganization = async (
  organizationId: string,
): Promise<any> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  const org = mockUserOrganizations.find((o) => o.id === organizationId);
  return {
    user: {
      ...mockCurrentUser,
      organization: org || mockUserOrganizations[0],
    },
  };
};

export const getUserOrganizations = async (): Promise<
  import('@/lib/types/user.type').IUserOrganization[]
> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockUserOrganizations;
};

export const acceptInvitation = async (
  _invitationId?: string,
  _token?: string,
): Promise<any> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { success: true, message: 'Invitation accepted' };
};

export const declineInvitation = async (
  _invitationId?: string,
  _token?: string,
): Promise<any> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { success: true, message: 'Invitation declined' };
};
