import { mockCurrentUser } from '@/data/users';
import {
  mockAuthResponse,
  mockSessionResponse,
  mockCryptlexSSOResponse,
} from '@/data/auth';

// Mock API calls - no actual network requests
export const signupWithInviteToken = async (_token: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { id: 'org-1', name: 'Acme Corporation' };
};

export const signIn = async (_credentials: {
  email: string;
  password: string;
}) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockAuthResponse;
};

export const startCryptlexSSO = async (_accountAlias: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockCryptlexSSOResponse;
};

export const getSession = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockSessionResponse;
};

export const logout = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  return { success: true };
};

export const fetchMe = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockCurrentUser;
};
