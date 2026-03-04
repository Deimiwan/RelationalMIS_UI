import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './use-auth';

export const LoginPage = () => {
  const { user, login } = useAuth();
  const [email, setEmail] = useState('manager@example.com');
  const [password, setPassword] = useState('StrongPassword123');
  const [error, setError] = useState<string | null>(null);

  if (user) return <Navigate to="/app/dashboard" replace />;

  return (
    <main className="auth-card">
      <h2>Relational MIS Login</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          try {
            await login(email, password);
          } catch {
            setError('Login failed. Check credentials and backend availability.');
          }
        }}
      >
        <label>Email</label>
        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error ? <p>{error}</p> : null}
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </main>
  );
};
