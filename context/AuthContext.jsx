'use client';

import { createContext, useContext, useState, useCallback, useMemo, useSyncExternalStore } from 'react';
import { VALID_USERS } from '@/data/constants';

const AUTH_STORAGE_KEY = 'opticfusion:auth-session';





const AuthContext = createContext(null);

const subscribe = (callback) => {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('opticfusion:auth-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('opticfusion:auth-change', callback);
  };
};

const getSnapshot = () => {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(AUTH_STORAGE_KEY);
  } catch {
    return null;
  }
};

const getServerSnapshot = () => null;

const emptySubscribe = () => () => {};

export function AuthProvider({ children }) {
  const [error, setError] = useState(null);

  const rawSession = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isHydrated = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const user = useMemo(() => {
    if (!rawSession) return null;
    try {
      const parsed = JSON.parse(rawSession);
      return parsed && parsed.email ? parsed : null;
    } catch {
      return null;
    }
  }, [rawSession]);

  const login = useCallback(async (email, password) => {
    setError(null);
    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanPassword = String(password || '').trim();

    const matched = VALID_USERS.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === cleanPassword
    );

    if (!matched) {
      const err = 'Credenciais inválidas. Verifique o e-mail e a senha cadastrados.';
      setError(err);
      return { success: false, error: err };
    }

    const sessionData = {
      email: matched.email,
      name: matched.email.includes('admin') ? 'Administrador JOVI' : 'Operador Optic Fusion',
      role: matched.email.includes('admin') ? 'Tech Lead / Admin' : 'Fotógrafo / Beta Tester',
      loginAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
      window.dispatchEvent(new Event('opticfusion:auth-change'));
    } catch (e) {
      console.warn('[AuthContext] Não foi possível persistir no localStorage:', e);
    }

    return { success: true };
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      window.dispatchEvent(new Event('opticfusion:auth-change'));
    } catch (e) {
      console.warn('[AuthContext] Erro ao remover do localStorage:', e);
    }
    setError(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading: !isHydrated,
      error,
      login,
      logout,
    }),
    [user, isHydrated, error, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um <AuthProvider>');
  }
  return context;
}
