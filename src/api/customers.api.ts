import { mockMembers, mockMemberDetails } from '@/data/users';
import type {
  MemberItem,
  OrganizationMemberDetails,
} from '@/lib/types/user.type';

// Mock API calls - no actual network requests
export const getOrgUsers = async (): Promise<MemberItem[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockMembers;
};

export const getOrgUser = async (
  userId: string,
): Promise<OrganizationMemberDetails> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  const user = mockMemberDetails[userId];
  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }
  return user;
};

export const removeUserFromOrg = async (userId: string): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  // In a real implementation, this would remove the user from the organization
  console.log(`Removed user ${userId} from organization`);
};
