import { useAuth } from '../auth/use-auth';

export const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <div>{user ? `${user.email} (${user.role?.roleName ?? 'No Role'})` : 'Guest'}</div>
      <button className="btn" onClick={logout}>Logout</button>
    </header>
  );
};
