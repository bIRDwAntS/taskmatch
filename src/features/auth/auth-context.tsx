// src/features/auth/auth-context.tsx
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { authApi } from './auth-api';
import { useLocalStorage } from '@/hooks/use-local-storage';

// Types
export interface TUser {
  id: string;
  email: string;
  displayName: string;
  role: 'admin' | 'user';
}

export interface TAuthError {
  code: string;
  message: string;
}

interface TAuthContext {
  user: TUser | null;
  isLoading: boolean;
  error: TAuthError | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

// Context
const AuthContext = createContext<TAuthContext | null>(null);

// Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<TAuthError | null>(null);
  const [token, setToken] = useLocalStorage<string | null>('auth-token', null);

  // Verify token and load user data on mount
  useEffect(() => {
    const validateSession = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const userData = await authApi.validateToken(token);
        setUser(userData);
      } catch (err) {
        setToken(null);
        setError({
          code: 'auth/session-expired',
          message: 'Votre session a expiré. Veuillez vous reconnecter.'
        });
      } finally {
        setIsLoading(false);
      }
    };

    validateSession();
  }, [token, setToken]);

  // Auth methods
  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const { user, token } = await authApi.login(email, password);
      setToken(token);
      setUser(user);
    } catch (err: any) {
      setError({
        code: err.code || 'auth/unknown',
        message: err.message || 'Une erreur est survenue lors de la connexion'
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setToken]);

  const register = useCallback(async (email: string, password: string, displayName: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const { user, token } = await authApi.register(email, password, displayName);
      setToken(token);
      setUser(user);
    } catch (err: any) {
      setError({
        code: err.code || 'auth/unknown',
        message: err.message || 'Une erreur est survenue lors de l\'inscription'
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setToken]);

  const logout = useCallback(async () => {
    try {
      if (token) {
        await authApi.logout(token);
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setToken(null);
      setUser(null);
    }
  }, [token, setToken]);

  const resetPassword = useCallback(async (email: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await authApi.resetPassword(email);
    } catch (err: any) {
      setError({
        code: err.code || 'auth/unknown',
        message: err.message || 'Une erreur est survenue lors de la réinitialisation'
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  
  return context;
}