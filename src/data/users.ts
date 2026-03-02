import type {
  IUser,
  MemberItem,
  OrganizationMemberDetails,
} from '@/lib/types/user.type';

export const mockCurrentUser: IUser = {
  id: 'user-1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  globalRole: 'USER',
  organization: {
    id: 'org-1',
    invitationId: 'inv-1',
    name: 'Acme Corporation',
    role: 'ADMIN',
    status: 'ACTIVE',
    joinedAt: '2024-01-15T10:00:00Z',
  },
};

export const mockMembers: MemberItem[] = [
  {
    id: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'ADMIN',
    status: 'active',
    invitedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'user-2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    role: 'MEMBER',
    status: 'active',
    invitedAt: '2024-02-20T14:30:00Z',
  },
  {
    id: 'user-3',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    role: 'MEMBER',
    status: 'active',
    invitedAt: '2024-03-10T09:15:00Z',
  },
  {
    id: 'user-4',
    firstName: 'Alice',
    lastName: 'Williams',
    email: 'alice.williams@example.com',
    role: 'MEMBER',
    status: 'invited',
    invitedAt: '2024-03-25T16:45:00Z',
  },
  {
    id: 'user-5',
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie.brown@example.com',
    role: 'MEMBER',
    status: 'active',
    invitedAt: '2024-02-05T11:20:00Z',
  },
];

export const mockMemberDetails: Record<string, OrganizationMemberDetails> = {
  'user-1': {
    user: {
      id: 'user-1',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
    },
    organization: {
      id: 'org-1',
      name: 'Acme Corporation',
      role: 'ADMIN',
    },
    licenses: [
      {
        licenseId: 'lic-1',
        productName: 'PlantTools',
        licenseType: 'Starter',
        region: 'US',
        licenseKey: 'PT-STARTER-US-001',
        allowedActivations: 3,
        totalActivations: 2,
        expiresAt: '2025-12-31T23:59:59Z',
      },
      {
        licenseId: 'lic-2',
        productName: 'PlantTools',
        licenseType: 'Business',
        region: 'US',
        licenseKey: 'PT-BUSINESS-US-002',
        allowedActivations: 5,
        totalActivations: 3,
        expiresAt: '2025-12-31T23:59:59Z',
      },
    ],
  },
  'user-2': {
    user: {
      id: 'user-2',
      email: 'jane.smith@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
    },
    organization: {
      id: 'org-1',
      name: 'Acme Corporation',
      role: 'MEMBER',
    },
    licenses: [
      {
        licenseId: 'lic-1',
        productName: 'PlantTools',
        licenseType: 'Starter',
        region: 'US',
        licenseKey: 'PT-STARTER-US-001',
        allowedActivations: 3,
        totalActivations: 2,
        expiresAt: '2025-12-31T23:59:59Z',
      },
    ],
  },
  'user-3': {
    user: {
      id: 'user-3',
      email: 'bob.johnson@example.com',
      firstName: 'Bob',
      lastName: 'Johnson',
    },
    organization: {
      id: 'org-1',
      name: 'Acme Corporation',
      role: 'MEMBER',
    },
    licenses: [
      {
        licenseId: 'lic-3',
        productName: 'Revit ProjectBox',
        licenseType: 'Business',
        region: 'US',
        licenseKey: 'RPB-BUSINESS-US-003',
        allowedActivations: 10,
        totalActivations: 5,
        expiresAt: '2026-06-30T23:59:59Z',
      },
    ],
  },
  'user-4': {
    user: {
      id: 'user-4',
      email: 'alice.williams@example.com',
      firstName: 'Alice',
      lastName: 'Williams',
    },
    organization: {
      id: 'org-1',
      name: 'Acme Corporation',
      role: 'MEMBER',
    },
    licenses: [],
  },
  'user-5': {
    user: {
      id: 'user-5',
      email: 'charlie.brown@example.com',
      firstName: 'Charlie',
      lastName: 'Brown',
    },
    organization: {
      id: 'org-1',
      name: 'Acme Corporation',
      role: 'MEMBER',
    },
    licenses: [
      {
        licenseId: 'lic-2',
        productName: 'PlantTools',
        licenseType: 'Business',
        region: 'US',
        licenseKey: 'PT-BUSINESS-US-002',
        allowedActivations: 5,
        totalActivations: 3,
        expiresAt: '2025-12-31T23:59:59Z',
      },
    ],
  },
};
