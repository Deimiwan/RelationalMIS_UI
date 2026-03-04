import { createContext, useEffect, useMemo, useState } from 'react';
import { getCurrentUser, login as loginApi } from '../api/auth';
import { ROLE_PERMISSION_MAP, type PermissionKey, type RoleKey } from '../access/permission-map';
import { tokenStore } from './token-store';

type AuthUser = {
  email: string;
  role: RoleKey;
  permissions: PermissionKey[];
};

type AuthContextValue = {
  user: AuthUser | null;
  isBootstrapping: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const token = tokenStore.getAccessToken();
      if (!token) {
        setIsBootstrapping(false);
        return;
      }

      try {
        const current = await getCurrentUser();
        setUser({
          email: current.email,
          role: current.role,
          permissions: current.permissions ?? ROLE_PERMISSION_MAP[current.role],
        });
      } finally {
        setIsBootstrapping(false);
      }
    };

    void bootstrap();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isBootstrapping,
      login: async (email, password) => {
        const res = await loginApi({ email, password });
        tokenStore.setAccessToken(res.accessToken || `dev-token-${Date.now()}`);

        const role: RoleKey =
          email.includes('architect') ? 'Architect' : email.includes('user') ? 'User' : 'Manager';

        setUser({
          email,
          role,
          permissions: ROLE_PERMISSION_MAP[role],
        });
      },
      logout: () => {
        tokenStore.setAccessToken(null);
        setUser(null);
      },
    }),
    [isBootstrapping, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
