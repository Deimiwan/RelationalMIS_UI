import { tokenStore } from '../auth/token-store';

const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;
const configuredBaseUrl = viteEnv?.VITE_API_BASE_URL?.trim();
const browserOrigin = typeof window === 'undefined' ? undefined : window.location.origin;

const normalizeBaseUrl = (url: string): string => {
  if (!url) return url;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
    return url.replace(/\/$/, '');
  }

  return `https://${url}`.replace(/\/$/, '');
};

const API_BASE_URL =
  (configuredBaseUrl ? normalizeBaseUrl(configuredBaseUrl) : undefined) ||
  (viteEnv?.DEV ? 'http://localhost:3000' : browserOrigin ? `${browserOrigin}/api` : 'http://localhost:3000');

export const apiRequest = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
  const token = tokenStore.getAccessToken();
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });

  if (!response.ok) {
    throw new Error(`API request failed (${response.status})`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
};
