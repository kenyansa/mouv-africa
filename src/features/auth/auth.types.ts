export interface AuthUser {
  email?: string;
  id?: string;
  token: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  initializing: boolean;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signOut: () => Promise<void>;
}
