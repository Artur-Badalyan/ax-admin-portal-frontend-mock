export const API_URL: string | undefined = import.meta.env.VITE_API_URL;

export const GLOBAL_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  USER: 'USER',
} as const;

export const ORGANIZATION_ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  MEMBER: 'MEMBER',
} as const;
