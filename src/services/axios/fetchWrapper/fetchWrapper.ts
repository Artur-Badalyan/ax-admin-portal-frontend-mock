import type { ApiError } from '@/lib/types/common.type';

import { API_URL } from '@/lib/constants';
import API_ROUTES from '@/api/routes.api';

import { useAuthStore } from '@/store/auth.store';
import { safeJson } from '@/lib/utils';

// Constants
const AUTHORIZATION_HEADER = 'Authorization';
const CONTENT_TYPE_HEADER = 'Content-Type';
const CONTENT_TYPE_JSON = 'application/json';

// Types
interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
  body?: any;
}

// Helper functions
function buildHeaders(
  options: FetchOptions,
  accessToken: string | null,
): HeadersInit {
  const headers = options?.headers as Record<string, any> | undefined;
  const hasContentType = headers && CONTENT_TYPE_HEADER in headers;
  const hasFormData = options.body instanceof FormData;

  return {
    ...headers,
    ...(accessToken && {
      [AUTHORIZATION_HEADER]: `Bearer ${accessToken}`,
    }),
    ...(!hasContentType &&
      !hasFormData && {
        [CONTENT_TYPE_HEADER]: CONTENT_TYPE_JSON,
      }),
  };
}

async function handleErrorResponse(response: Response): Promise<never> {
  const errorBody = await safeJson(response);
  const error = new Error(errorBody?.message || 'Request failed') as ApiError;
  error.status = response.status;
  error.details = errorBody;
  throw error;
}

export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const response = await fetch(
      `${API_URL}${API_ROUTES.REFRESH_TOKEN_ENDPOINT}`,
      {
        method: 'POST',
        credentials: 'include',
      },
    );
    if (!response.ok) {
      useAuthStore.getState().logout();
      return false;
    }

    const data = await response.json();
    useAuthStore.getState().setAccessToken(data.access_token);
    // Sync user data after token refresh to ensure consistency
    try {
      await useAuthStore.getState().fetchMe();
    } catch (error) {
      // Log but don't fail - the token refresh succeeded
      console.warn('Failed to sync user data after token refresh:', error);
    }

    return true;
  } catch {
    return false;
  }
};

// Main fetch wrapper
export async function fetchWrapper<T = any>(
  url: string,
  options: FetchOptions = {},
  notJson?: boolean,
): Promise<T> {
  const accessToken = useAuthStore.getState().accessToken;

  const requestOptions: RequestInit = {
    credentials: 'include',
    ...options,
    body:
      options.body && !(options.body instanceof FormData)
        ? JSON.stringify(options.body)
        : options.body,
    headers: buildHeaders(options, accessToken),
  };

  let response = await fetch(API_URL + url, requestOptions);
  if (response.status === 401) {
    const refreshed = await refreshAccessToken();
    if (!refreshed) {
      useAuthStore.getState().logout();
      throw Object.assign(new Error('Unauthorized'), { status: 401 });
    }

    const newToken = useAuthStore.getState().accessToken;
    response = await fetch(API_URL + url, {
      ...requestOptions,
      headers: buildHeaders(options, newToken),
    });
  }

  if (!response.ok) {
    await handleErrorResponse(response);
  }

  return (notJson ? response : await safeJson(response)) as T;
}
