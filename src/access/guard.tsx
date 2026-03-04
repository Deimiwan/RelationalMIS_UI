import { Navigate, Outlet } from 'react-router-dom';
import { usePermissions } from './use-permissions';
import type { PermissionKey } from './permission-map';

type GuardProps = {
  required?: PermissionKey;
};

export const PermissionGuard = ({ required }: GuardProps) => {
  const { can } = usePermissions();

  if (!can(required)) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <Outlet />;
};
