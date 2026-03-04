import { NavLink } from 'react-router-dom';
import { APP_ROUTES } from '../access/permission-map';
import { usePermissions } from '../access/use-permissions';

export const Sidebar = () => {
  const { can } = usePermissions();
  const visibleItems = APP_ROUTES.filter((route) => can(route.required));

  return (
    <aside className="sidebar">
      <h3>Relational MIS</h3>
      {visibleItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
        >
          {item.label}
        </NavLink>
      ))}
    </aside>
  );
};
