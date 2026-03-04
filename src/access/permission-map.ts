export const ALL_PERMISSIONS = [
  'submission.write',
  'submission.submit',
  'object.read',
  'object.write',
  'attribute.write',
  'relationship.write',
  'schema.publish',
  'form.write',
  'form.publish',
] as const;

export type PermissionKey = (typeof ALL_PERMISSIONS)[number];
export type RoleKey = 'Architect' | 'Manager' | 'User';

export const ROLE_PERMISSION_MAP: Record<RoleKey, PermissionKey[]> = {
  Architect: [...ALL_PERMISSIONS],
  Manager: ['submission.write', 'submission.submit', 'object.read', 'form.write', 'form.publish'],
  User: ['form.publish', 'submission.write', 'submission.submit'],
};

export type PermissionRoute = {
  label: string;
  path: string;
  required?: PermissionKey;
};

export const APP_ROUTES: PermissionRoute[] = [
  { label: 'Dashboard', path: '/app/dashboard' },
  { label: 'Submissions', path: '/app/submissions', required: 'submission.write' },
  { label: 'Submit Queue', path: '/app/submissions/submit', required: 'submission.submit' },
  { label: 'Records', path: '/app/records', required: 'object.read' },
  { label: 'Forms', path: '/app/forms', required: 'form.write' },
  { label: 'Form Publish', path: '/app/forms/publish', required: 'form.publish' },
  { label: 'Metadata: Objects', path: '/app/metadata/objects', required: 'object.write' },
  { label: 'Metadata: Attributes', path: '/app/metadata/attributes', required: 'attribute.write' },
  { label: 'Metadata: Relationships', path: '/app/metadata/relationships', required: 'relationship.write' },
  { label: 'Schema Publish', path: '/app/metadata/schema-publish', required: 'schema.publish' },
];
