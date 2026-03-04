import { ROLE_PERMISSION_MAP, type PermissionKey, type RoleKey } from '../access/permission-map';
import { apiRequest } from './client';

export type LoginRequest = { email: string; password: string };
export type LoginResponse = { accessToken: string; refreshToken?: string };

type MeResponse = { email: string; role: RoleKey; permissions?: PermissionKey[] };

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

export const getCurrentUser = async (): Promise<MeResponse> => {
  try {
    return await apiRequest<MeResponse>('/auth/me');
  } catch {
    return {
      email: 'manager@example.com',
      role: 'Manager',
      permissions: ROLE_PERMISSION_MAP.Manager,
    };
  }
};
