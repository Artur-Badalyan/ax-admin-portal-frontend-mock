import axios, { AxiosError } from 'axios';
import { refreshAccessToken } from '@/services/axios/fetchWrapper/fetchWrapper';
import { useAuthStore } from '@/store/auth.store';

const AUTHORIZATION_HEADER = 'Authorization';
const RETRY_MARKER = '_retry';

export const configureAxios = (): void => {
  axios.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as any;

      if (error.response?.status === 401 && !originalRequest?.[RETRY_MARKER]) {
        originalRequest[RETRY_MARKER] = true;

        try {
          const refreshSuccess = await refreshAccessToken();

          if (!refreshSuccess) {
            useAuthStore.getState().logout();
            return Promise.reject(error);
          }

          const newAccessToken = useAuthStore.getState().accessToken;
          if (newAccessToken) {
            axios.defaults.headers.common[AUTHORIZATION_HEADER] =
              `Bearer ${newAccessToken}`;
            originalRequest.headers[AUTHORIZATION_HEADER] =
              `Bearer ${newAccessToken}`;

            return axios(originalRequest);
          }
        } catch (err) {
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    },
  );
};
