import { useAuth } from '../auth/use-auth';
import { hasPermission } from './has-permission';
import type { PermissionKey } from './permission-map';

export const usePermissions = () => {
  const { user } = useAuth();
  const permissions = user?.permissions ?? [];

  return {
    permissions,
    can: (required?: PermissionKey) => hasPermission(permissions, required),
  };
};
