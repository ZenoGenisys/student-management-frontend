import React, { useState, useCallback, useEffect, useMemo } from 'react';
import storageService from '../services/storageService';
import { AuthContext } from './authContext.type';
import SessionService from '../services/SessionService';
import { register } from '../repositories';

type AuthState = {
  username: string | null;
  token: string | null;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<AuthState | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const logout = useCallback(() => {
    setAuth(null);
    storageService.removeItem('auth');
  }, []);

  const login = useCallback((username: string, token: string) => {
    const newAuth = { username, token };
    setAuth(newAuth);
    storageService.setItem('auth', newAuth);
  }, []);

  useEffect(() => {
    register();
    const savedAuth = storageService.getItem<AuthState>('auth');
    if (savedAuth) {
      setAuth(savedAuth);
    }
    setIsAuthLoading(false);
    SessionService.observe(() => {
      logout();
    });
  }, [logout]);

  const value = useMemo(
    () => ({
      ...auth,
      isAuthLoading,
      login,
      logout,
    }),
    [auth, isAuthLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
