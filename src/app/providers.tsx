import type { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../auth/auth-context';

export const AppProviders = ({ children }: PropsWithChildren) => (
  <BrowserRouter>
    <AuthProvider>{children}</AuthProvider>
  </BrowserRouter>
);
