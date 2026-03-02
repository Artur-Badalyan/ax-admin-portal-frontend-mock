import type { IUser } from './user.type';

export type InviteSignupFormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
};

export type InviteMeta = {
  email?: string;
  organizationName?: string;
  inviterName?: string;
  status?: string;
  expiresAt?: string;
  isExpired?: boolean;
};

export type InvitationDetails = {
  id?: string;
  token?: string;
  email?: string;
  organizationId?: string;
  organizationName?: string;
  inviterName?: string;
  inviterEmail?: string;
  status?: string;
  expiresAt?: string;
  invitedAt?: string;
  createdAt?: string;
  isExpired?: boolean;
};

export type PendingInvitation = InvitationDetails & {
  invitationId?: string;
};

export type AuthCallbackResponse = {
  access_token: string;
  user: IUser;
  has_pending_invites?: boolean;
};

export interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  organizationDetails: InvitationDetails | null;
  organizationLoading: boolean;

  userOrganizations: import('@/lib/types/user.type').IUserOrganization[] | null;
  userOrganizationsLoading: boolean;

  isSuperAdmin: () => boolean;
  isOrgAdmin: () => boolean;

  fetchMe: () => Promise<IUser | null>;
  fetchUserOrganizations: () => Promise<void>;

  setUser: (user: IUser | null) => void;
  updateUser: (data: Partial<IUser>) => void;
  setAccessToken: (token: string | null) => void;
  setIsAuthenticated: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  logout: () => void;

  getOrganizationByToken: (token: string) => Promise<InvitationDetails>;
  handleOrganizationCallback: (
    code: string,
  ) => Promise<
    | { status: 'success'; user: IUser; has_pending_invites: boolean }
    | { status: 'error'; message: string }
    | { status: 'no-access' }
  >;
  hydrate: (user: IUser | null, accessToken: string | null) => void;
}
