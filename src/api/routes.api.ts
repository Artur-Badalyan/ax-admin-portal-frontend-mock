const API_PREFIX = '/api/v1';

export default {
  AUTH_MICROSOFT: `${API_PREFIX}/auth/microsoft`,
  AUTH_SIGNIN: `${API_PREFIX}/auth/signin`,
  REFRESH_TOKEN_ENDPOINT: `${API_PREFIX}/auth/refresh`,
  AUTH_SIGNOUT: `${API_PREFIX}/auth/signout`,
  SIGNUP_WITH_INVITE: `${API_PREFIX}/auth/signup-with-invite/:token`,
  AUTH_ME: `${API_PREFIX}/auth/me`,

  USERS: `${API_PREFIX}/users`,
  USER_ID: `${API_PREFIX}/users/:id`,

  ORGANIZATIONS: `${API_PREFIX}/organizations`,
  GET_USER_ORGANIZATIONS: `${API_PREFIX}/organizations/list`,

  CREATE_INVITE: `${API_PREFIX}/invitations`,
  GET_INVITED_ORGANIZATION: `${API_PREFIX}/invitations/:token`,
  GET_PENDING_INVITATIONS: `${API_PREFIX}/invitations/pendings`,

  // License management
  GET_LICENSES: `${API_PREFIX}/licenses`,
  GET_LICENSE: `${API_PREFIX}/licenses/:id`,
  ASSIGN_LICENSE: `${API_PREFIX}/licenses/assign`,
};
