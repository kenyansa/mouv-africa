import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import { getStoredSession } from '../../lib/token';
import { login, logout } from './auth.service';
import type { AuthContextValue, AuthUser } from './auth.types';

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredSession());

  const signIn: AuthContextValue['signIn'] = async (email, password) => {
    const session = await login(email, password);
    setUser(session);
    return session;
  };

  const signOut: AuthContextValue['signOut'] = async () => {
    await logout();
    setUser(null);
  };

  const value: AuthContextValue = {
    user,
    initializing: false,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
