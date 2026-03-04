import { tokenStore } from '../auth/token-store';

const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;
const configuredBaseUrl = viteEnv?.VITE_API_BASE_URL?.trim();
const browserOrigin = typeof window === 'undefined' ? undefined : window.location.origin;

const normalizeBaseUrl = (value: string): string => {
  const trimmed = value.trim().replace(/\/+$/, '');

  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith('/')) return trimmed;

  return `https://${trimmed}`;
};

const API_BASE_URL =
  normalizeBaseUrl(configuredBaseUrl || '') ||
  (viteEnv?.DEV ? 'http://localhost:3000' : browserOrigin ? `${browserOrigin}/api` : 'http://localhost:3000');

export const apiRequest = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
  const token = tokenStore.getAccessToken();
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const response = await fetch(`${API_BASE_URL}${normalizedPath}`, { ...init, headers });

  if (!response.ok) {
    throw new Error(`API request failed (${response.status})`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
};
