import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';

export const AppShell = () => (
  <div className="app-shell">
    <Sidebar />
    <div className="content">
      <Topbar />
      <Outlet />
    </div>
  </div>
);
