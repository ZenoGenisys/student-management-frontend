import { createContext, useContext } from 'react';
import type { LoginResponse } from '../types';

export type Role = 'ADMIN' | 'STAFF';

export type AuthContextType = {
  email?: string | null;
  token?: string | null;
  role?: Role | null;
  name?: string | null;
  isAuthLoading: boolean;
  login: (data: LoginResponse) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  email: null,
  token: null,
  role: null,
  name: null,
  isAuthLoading: true,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);
