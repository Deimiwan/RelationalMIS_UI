import { Navigate, Route, Routes } from 'react-router-dom';
import { PermissionGuard } from '../access/guard';
import { LoginPage } from '../auth/login-page';
import { useAuth } from '../auth/use-auth';
import { DashboardPage } from '../dashboard/dashboard-page';
import { FormsPage, FormsPublishPage } from '../features/forms/forms-page';
import {
  MetadataAttributesPage,
  MetadataObjectsPage,
  MetadataRelationshipsPage,
  SchemaPublishPage,
} from '../features/metadata/metadata-page';
import { RecordsPage } from '../features/records/records-page';
import { SubmissionsPage, SubmitQueuePage } from '../features/submissions/submissions-page';
import { AppShell } from '../layout/app-shell';
import { NotFoundPage } from '../pages/not-found';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user, isBootstrapping } = useAuth();
  if (isBootstrapping) return <main className="page">Loading...</main>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route
      path="/app"
      element={
        <RequireAuth>
          <AppShell />
        </RequireAuth>
      }
    >
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<DashboardPage />} />

      <Route element={<PermissionGuard required="submission.write" />}>
        <Route path="submissions" element={<SubmissionsPage />} />
      </Route>
      <Route element={<PermissionGuard required="submission.submit" />}>
        <Route path="submissions/submit" element={<SubmitQueuePage />} />
      </Route>
      <Route element={<PermissionGuard required="object.read" />}>
        <Route path="records" element={<RecordsPage />} />
      </Route>
      <Route element={<PermissionGuard required="form.write" />}>
        <Route path="forms" element={<FormsPage />} />
      </Route>
      <Route element={<PermissionGuard required="form.publish" />}>
        <Route path="forms/publish" element={<FormsPublishPage />} />
      </Route>
      <Route element={<PermissionGuard required="object.write" />}>
        <Route path="metadata/objects" element={<MetadataObjectsPage />} />
      </Route>
      <Route element={<PermissionGuard required="attribute.write" />}>
        <Route path="metadata/attributes" element={<MetadataAttributesPage />} />
      </Route>
      <Route element={<PermissionGuard required="relationship.write" />}>
        <Route path="metadata/relationships" element={<MetadataRelationshipsPage />} />
      </Route>
      <Route element={<PermissionGuard required="schema.publish" />}>
        <Route path="metadata/schema-publish" element={<SchemaPublishPage />} />
      </Route>
    </Route>

    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
