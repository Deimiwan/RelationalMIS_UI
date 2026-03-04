import { createContext, useEffect, useMemo, useState } from 'react';
import { getCurrentAccess, login as loginApi } from '../api/auth';
import type { PermissionKey } from '../access/permission-map';
import { tokenStore } from './token-store';

type AuthUser = {
  userId: string;
  email: string;
  status: string;
  role: {
    roleId: string;
    roleName: string;
  } | null;
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
        const current = await getCurrentAccess();
        setUser({
          userId: current.user.user_id,
          email: current.user.email,
          status: current.user.status,
          role: current.role
            ? { roleId: current.role.role_id, roleName: current.role.role_name }
            : null,
          permissions: [...current.permissions].sort(),
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
        tokenStore.setAccessToken(res.accessToken);

        const current = await getCurrentAccess();
        setUser({
          userId: current.user.user_id,
          email: current.user.email,
          status: current.user.status,
          role: current.role
            ? { roleId: current.role.role_id, roleName: current.role.role_name }
            : null,
          permissions: [...current.permissions].sort(),
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
