import type { PermissionKey } from '../access/permission-map';
import { apiRequest } from './client';

export type LoginRequest = { email: string; password: string };
export type LoginResponse = { accessToken: string; refreshToken?: string };

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

export const login = (body: LoginRequest) =>
  apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const refresh = (refreshToken: string) =>
  apiRequest<LoginResponse>('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });

export const getCurrentAccess = () => apiRequest<AccessResponse>('/auth/me/access');
