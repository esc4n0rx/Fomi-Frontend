"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginRequest, RegisterRequest, Store } from '@/types/auth';
import { authApi, storeApi } from '@/lib/api';
import { billingApi } from '@/lib/billing';
import { authStorage } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  store: Store | null;
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
  refreshStoreStatus: () => Promise<void>;
  checkSubscriptionStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [store, setStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStore, setHasStore] = useState(false);
  const [hasChosenPlan, setHasChosenPlan] = useState(false);

  const isAuthenticated = !!user;

  const checkSubscriptionStatus = async () => {
    try {
      const response = await billingApi.getSubscription();
      const subscription = response.data?.subscription;
      
      // Verifica se existe uma assinatura ativa
      const hasActiveSubscription = !!(subscription && subscription.active && subscription.status === 'active');
      
      setHasChosenPlan(hasActiveSubscription);
      
      if (hasActiveSubscription) {
        localStorage.setItem('has_chosen_plan', 'true');
      } else {
        localStorage.removeItem('has_chosen_plan');
      }
      
      console.log('Status da assinatura:', {
        subscription,
        hasActiveSubscription,
        status: subscription?.status,
        active: subscription?.active
      });
      
    } catch (error) {
      console.error('Erro ao verificar assinatura:', error);
      // Se der erro, assumir que não tem plano ativo
      setHasChosenPlan(false);
      localStorage.removeItem('has_chosen_plan');
    }
  };

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await authApi.login(credentials);
      const { user, token } = response.data;
      
      authStorage.setToken(token);
      authStorage.setUser(user);
      setUser(user);

      // Verificar loja e assinatura após login
      await checkStoreStatus();
      await checkSubscriptionStatus();
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
      await checkStoreStatus();
      await checkSubscriptionStatus();
    } catch (error: any) {
      throw error;
    }
  };

  const logout = () => {
    authStorage.clear();
    localStorage.removeItem('has_chosen_plan');
    localStorage.removeItem('has_store');
    setUser(null);
    setStore(null);
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
      await storeApi.createStore(storeData);
      await refreshStoreStatus();
    } catch (error: any) {
      console.error('Erro ao criar loja:', error);
      throw error;
    }
  };

  const checkStoreStatus = async () => {
    try {
      
      const response = await storeApi.getStores();
      
      const stores = response.data?.stores || [];
      const hasStores = stores.length > 0;
      const firstStore = hasStores ? stores[0] : null;
      
      setHasStore(hasStores);
      setStore(firstStore);
      
      if (hasStores && firstStore) {
        localStorage.setItem('has_store', 'true');
        authStorage.setStore(firstStore);
        
        if (user) {
          const updatedUser = { ...user, store: firstStore };
          setUser(updatedUser);
          authStorage.setUser(updatedUser);
        }
      } else {
        localStorage.removeItem('has_store');
        authStorage.removeStore();
      }
      
    } catch (error) {
      console.error('Erro ao verificar status da loja:', error);
      // Se der erro ao buscar lojas, assumir que não tem loja
      setHasStore(false);
      setStore(null);
      localStorage.removeItem('has_store');
      authStorage.removeStore();
    }
  };

  const refreshStoreStatus = async () => {
    await checkStoreStatus();
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

      // Verificar status da loja e assinatura
      await checkStoreStatus();
      await checkSubscriptionStatus();
    } catch (error) {
      console.error('Erro na autenticação:', error);
      authStorage.clear();
      localStorage.removeItem('has_store');
      localStorage.removeItem('has_chosen_plan');
      setUser(null);
      setStore(null);
      setHasStore(false);
      setHasChosenPlan(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const currentPath = window.location.pathname;
      const excludedPaths = ['/plans', '/billing/success', '/billing/cancel', '/dashboard/create-store'];
      const isExcludedPath = excludedPaths.some(path => currentPath.startsWith(path));
      
      if (isExcludedPath) {
        return;
      }
      
      if (!hasStore) {
        window.location.href = '/dashboard/create-store';
        return;
      }
    
      if (hasStore && !hasChosenPlan) {
        window.location.href = '/plans';
        return;
      }
      
      if (currentPath === '/' && hasStore && hasChosenPlan) {
        window.location.href = '/dashboard';
      }
    }
  }, [isLoading, isAuthenticated, hasStore, hasChosenPlan]);

  return (
    <AuthContext.Provider
      value={{
        user,
        store,
        isLoading,
        isAuthenticated,
        hasStore,
        hasChosenPlan,
        login,
        register,
        logout,
        checkAuth,
        createStore,
        refreshStoreStatus,
        checkSubscriptionStatus,
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