import { createContext, useContext } from 'react';

export type AuthContextType = {
  username?: string | null;
  token?: string | null;
  isAuthLoading: boolean;
  login: (username: string, token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  username: null,
  token: null,
  isAuthLoading: true,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);
