import { GLOBAL_ROLES, ORGANIZATION_ROLES } from '../constants';

export interface IOrganization {
  id: string;
  name: string;
  role?: keyof typeof ORGANIZATION_ROLES;
  status?: string;
}

export interface IUserOrganization {
  id: string;
  invitationId: string;
  name: string;
  role: keyof typeof ORGANIZATION_ROLES;
  status: 'ACTIVE' | 'INVITED' | 'INACTIVE';
  joinedAt: string;
  token?: string;
  inviterEmail?: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  globalRole: keyof typeof GLOBAL_ROLES;
  organization: IUserOrganization;
}

export type MemberItem = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  invitedAt: string;
};

export type MemberListDto = Array<
  Omit<MemberItem, 'firstName' | 'lastName' | 'invitedAt'> & {
    name: string;
  }
>;

export type OrganizationMemberDetails = {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  organization: {
    id: string;
    name: string;
    role: keyof typeof ORGANIZATION_ROLES;
  };
  licenses: Array<{
    licenseId: string;
    productName: string;
    licenseType: string;
    region: string;
    licenseKey: string;
    allowedActivations: number;
    totalActivations: number;
    expiresAt: string;
  }>;
};
