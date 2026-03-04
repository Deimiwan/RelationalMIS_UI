import type { PermissionKey } from '../access/permission-map';

export type DashboardWidget = {
  title: string;
  description: string;
  required: PermissionKey | PermissionKey[];
};

export const DASHBOARD_WIDGETS: DashboardWidget[] = [
  { title: 'Submission Drafts / New Submission', description: 'Create and edit drafts.', required: 'submission.write' },
  { title: 'Submit Queue / Finalize Submission', description: 'Submit completed drafts.', required: 'submission.submit' },
  { title: 'Records Explorer', description: 'Browse records and details.', required: 'object.read' },
  { title: 'Form Builder', description: 'Build and version forms.', required: 'form.write' },
  { title: 'Form Publish Console', description: 'Publish form versions.', required: 'form.publish' },
  {
    title: 'Metadata Authoring',
    description: 'Manage objects, attributes, and relationships.',
    required: ['object.write', 'attribute.write', 'relationship.write'],
  },
  { title: 'Schema Publish', description: 'Publish schema versions.', required: 'schema.publish' },
];
