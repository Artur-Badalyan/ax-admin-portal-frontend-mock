import type { IOrganization, IUserOrganization } from '@/lib/types/user.type';
import type {
  InvitationDetails,
  PendingInvitation,
} from '@/lib/types/auth.type';

export const mockOrganizations: IOrganization[] = [
  {
    id: 'org-1',
    name: 'Acme Corporation',
    role: 'ADMIN',
    status: 'ACTIVE',
  },
  {
    id: 'org-2',
    name: 'Tech Solutions Inc',
    role: 'MEMBER',
    status: 'ACTIVE',
  },
];

export const mockUserOrganizations: IUserOrganization[] = [
  {
    id: 'org-1',
    invitationId: 'inv-1',
    name: 'Acme Corporation',
    role: 'ADMIN',
    status: 'ACTIVE',
    joinedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'org-2',
    invitationId: 'inv-2',
    name: 'Tech Solutions Inc',
    role: 'MEMBER',
    status: 'ACTIVE',
    joinedAt: '2024-02-20T14:30:00Z',
  },
];

export const mockInvitationDetails: InvitationDetails = {
  id: 'inv-3',
  token: 'invitation-token-123',
  email: 'newuser@example.com',
  organizationId: 'org-1',
  organizationName: 'Acme Corporation',
  inviterName: 'John Doe',
  inviterEmail: 'john.doe@example.com',
  status: 'PENDING',
  expiresAt: '2026-04-01T23:59:59Z',
  invitedAt: '2026-03-01T10:00:00Z',
  createdAt: '2026-03-01T10:00:00Z',
  isExpired: false,
};

export const mockPendingInvitations: PendingInvitation[] = [
  {
    id: 'inv-4',
    invitationId: 'inv-4',
    token: 'invitation-token-456',
    email: 'pending1@example.com',
    organizationId: 'org-3',
    organizationName: 'Global Enterprises',
    inviterName: 'Jane Smith',
    inviterEmail: 'jane.smith@global.com',
    status: 'PENDING',
    expiresAt: '2026-04-15T23:59:59Z',
    invitedAt: '2026-03-15T10:00:00Z',
    createdAt: '2026-03-15T10:00:00Z',
    isExpired: false,
  },
  {
    id: 'inv-5',
    invitationId: 'inv-5',
    token: 'invitation-token-789',
    email: 'pending2@example.com',
    organizationId: 'org-4',
    organizationName: 'Innovation Labs',
    inviterName: 'Bob Johnson',
    inviterEmail: 'bob.johnson@innovation.com',
    status: 'PENDING',
    expiresAt: '2026-04-20T23:59:59Z',
    invitedAt: '2026-03-20T10:00:00Z',
    createdAt: '2026-03-20T10:00:00Z',
    isExpired: false,
  },
];
