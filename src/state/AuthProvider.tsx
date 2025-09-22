import React, { useState, useCallback, useEffect, useMemo } from 'react';
import storageService from '../services/storageService';
import { AuthContext } from './authContext.type';
import SessionService from '../services/SessionService';
import { register, setUserSessionToken } from '../repositories';
import type { LoginResponse } from '../types';
import type { Role } from './authContext.type';

type AuthState = {
  email: string | null;
  token: string | null;
  role: Role | null;
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

  const login = useCallback((data: LoginResponse) => {
    setAuth(data);
    storageService.setItem('auth', data);
  }, []);

  useEffect(() => {
    if (auth?.token) {
      setUserSessionToken(auth.token);
    }
  }, [auth?.token]);

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
