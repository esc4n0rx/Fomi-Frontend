"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginRequest, RegisterRequest } from '@/types/auth';
import { authApi } from '@/lib/api';
import { authStorage } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await authApi.login(credentials);
      const { user, token } = response.data;
      
      authStorage.setToken(token);
      authStorage.setUser(user);
      setUser(user);
    } catch (error: any) {
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      const response = await authApi.register(data);
      const { user, token } = response.data;
      
      authStorage.setToken(token);
      authStorage.setUser(user);
      setUser(user);
    } catch (error: any) {
      throw error;
    }
  };

  const logout = () => {
    authStorage.clear();
    setUser(null);
  };

  const checkAuth = async () => {
    try {
      const token = authStorage.getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await authApi.me();
      const userData = response.data.user;
      
      authStorage.setUser(userData);
      setUser(userData);
    } catch (error) {
      authStorage.clear();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};