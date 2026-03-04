import type { PermissionKey } from './permission-map';

export const hasPermission = (permissions: PermissionKey[], required?: PermissionKey) => {
  if (!required) return true;
  return permissions.includes(required);
};
