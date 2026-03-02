import type { AuthCallbackResponse } from '@/lib/types/auth.type';
import { mockCurrentUser } from './users';

export const mockAuthResponse: AuthCallbackResponse = {
  access_token: 'mock-access-token-123456789',
  user: mockCurrentUser,
  has_pending_invites: true,
};

export const mockSessionResponse = {
  user: mockCurrentUser,
};

export const mockCryptlexSSOResponse = {
  loginUrl: 'https://mock-cryptlex-sso.example.com/login',
  state: 'mock-state-123',
};
