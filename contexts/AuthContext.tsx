"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginRequest, RegisterRequest } from '@/types/auth';
import { authApi, storeApi } from '@/lib/api';
import { authStorage } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasStore: boolean;
  hasChosenPlan: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  createStore: (storeData: {
    nome: string;
    descricao?: string;
    whatsapp?: string;
    instagram?: string;
    facebook?: string;
    endereco_cep?: string;
    endereco_rua?: string;
    endereco_numero?: string;
    endereco_complemento?: string;
    endereco_bairro?: string;
    endereco_cidade?: string;
    endereco_estado?: string;
    cor_primaria?: string;
    cor_secundaria?: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStore, setHasStore] = useState(false);
  const [hasChosenPlan, setHasChosenPlan] = useState(false);

  const isAuthenticated = !!user;

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await authApi.login(credentials);
      const { user, token } = response.data;
      
      authStorage.setToken(token);
      authStorage.setUser(user);
      setUser(user);

      // Verificar loja após login
      await checkStoreStatus();
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

      // Após registro, verificar se já tem loja
      await checkStoreStatus();
    } catch (error: any) {
      throw error;
    }
  };

  const logout = () => {
    authStorage.clear();
    localStorage.removeItem('has_chosen_plan');
    setUser(null);
    setHasStore(false);
    setHasChosenPlan(false);
  };

  const createStore = async (storeData: {
    nome: string;
    descricao?: string;
    whatsapp?: string;
    instagram?: string;
    facebook?: string;
    endereco_cep?: string;
    endereco_rua?: string;
    endereco_numero?: string;
    endereco_complemento?: string;
    endereco_bairro?: string;
    endereco_cidade?: string;
    endereco_estado?: string;
    cor_primaria?: string;
    cor_secundaria?: string;
  }) => {
    try {
      const response = await storeApi.createStore(storeData);
      
      // Loja criada com sucesso
      setHasStore(true);
      setHasChosenPlan(false); // Reset para mostrar tela de planos
      
      // Salvar no localStorage para persistir o estado
      localStorage.setItem('has_store', 'true');
      
      return response;
    } catch (error: any) {
      console.error('Erro ao criar loja:', error);
      throw error;
    }
  };

  const checkStoreStatus = async () => {
    try {
      const response = await storeApi.getStores();
      const hasStores = response.data.stores && response.data.stores.length > 0;
      
      setHasStore(hasStores);
      
      if (hasStores) {
        localStorage.setItem('has_store', 'true');
      } else {
        localStorage.removeItem('has_store');
      }
      
      // Verificar se já escolheu um plano
      const hasChosenPlan = localStorage.getItem('has_chosen_plan') === 'true';
      setHasChosenPlan(hasChosenPlan);
    } catch (error) {
      // Se der erro ao buscar lojas, assumir que não tem loja
      setHasStore(false);
      localStorage.removeItem('has_store');
    }
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

      // Verificar status da loja
      await checkStoreStatus();
    } catch (error) {
      authStorage.clear();
      localStorage.removeItem('has_store');
      localStorage.removeItem('has_chosen_plan');
      setUser(null);
      setHasStore(false);
      setHasChosenPlan(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Lógica de redirecionamento baseada no estado do usuário
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const currentPath = window.location.pathname;
      
      // Evitar redirecionamentos em páginas específicas
      const excludedPaths = ['/plans', '/billing/success', '/billing/cancel', '/dashboard/create-store'];
      const isExcludedPath = excludedPaths.some(path => currentPath.startsWith(path));
      
      if (isExcludedPath) return;
      
      // Se não tem loja, redirecionar para criar loja
      if (!hasStore) {
        window.location.href = '/dashboard/create-store';
        return;
      }
      
      // Se tem loja mas não escolheu plano, redirecionar para planos
      if (hasStore && !hasChosenPlan) {
        window.location.href = '/plans';
        return;
      }
      
      // Se está na home e já tem tudo configurado, ir para dashboard
      if (currentPath === '/' && hasStore && hasChosenPlan) {
        window.location.href = '/dashboard';
      }
    }
  }, [isLoading, isAuthenticated, hasStore, hasChosenPlan]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        hasStore,
        hasChosenPlan,
        login,
        register,
        logout,
        checkAuth,
        createStore,
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