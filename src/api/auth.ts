import type { PermissionKey } from '../access/permission-map';
import { apiRequest } from './client';

export type LoginRequest = { email: string; password: string };
export type LoginResponse = { accessToken: string; refreshToken?: string };

type LoginResponseWire = {
  accessToken?: string;
  access_token?: string;
  refreshToken?: string;
  refresh_token?: string;
  token?: string;
  data?: {
    accessToken?: string;
    access_token?: string;
    refreshToken?: string;
    refresh_token?: string;
    token?: string;
  };
};

export type AccessResponse = {
  user: {
    user_id: string;
    email: string;
    status: string;
  };
  role: {
    role_id: string;
    role_name: string;
  } | null;
  permissions: PermissionKey[];
};

export const login = async (body: LoginRequest): Promise<LoginResponse> => {
  const res = await apiRequest<LoginResponseWire>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  const accessToken =
    res.accessToken ?? res.access_token ?? res.token ?? res.data?.accessToken ?? res.data?.access_token ?? res.data?.token;
  const refreshToken =
    res.refreshToken ?? res.refresh_token ?? res.data?.refreshToken ?? res.data?.refresh_token;

  if (!accessToken) {
    throw new Error('Login response did not include an access token.');
  }

  return { accessToken, refreshToken };
};

export const refresh = (refreshToken: string) =>
  apiRequest<LoginResponse>('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });

export const getCurrentAccess = () => apiRequest<AccessResponse>('/auth/me/access');
