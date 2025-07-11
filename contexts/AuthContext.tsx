"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginRequest, RegisterRequest, Store } from '@/types/auth';
import { authApi, storeApi } from '@/lib/api';
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [store, setStore] = useState<Store | null>(null);
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
      const response = await storeApi.createStore(storeData);
      
      console.log('Loja criada com sucesso:', response);
      
      // Após criar a loja, recarregar o status
      await refreshStoreStatus();
      
      return response;
    } catch (error: any) {
      console.error('Erro ao criar loja:', error);
      throw error;
    }
  };

  const checkStoreStatus = async () => {
    try {
      console.log('Verificando status da loja...');
      
      const response = await storeApi.getStores();
      console.log('Resposta da API stores:', response);
      
      const stores = response.data?.stores || [];
      const hasStores = stores.length > 0;
      const firstStore = hasStores ? stores[0] : null;
      
      console.log('Lojas encontradas:', stores.length);
      console.log('Primeira loja:', firstStore);
      
      setHasStore(hasStores);
      setStore(firstStore);
      
      if (hasStores && firstStore) {
        localStorage.setItem('has_store', 'true');
        authStorage.setStore(firstStore);
        
        // Atualizar o usuário com os dados da loja
        if (user) {
          const updatedUser = { ...user, store: firstStore };
          setUser(updatedUser);
          authStorage.setUser(updatedUser);
        }
      } else {
        localStorage.removeItem('has_store');
        authStorage.removeStore();
      }
      
      // Verificar se já escolheu um plano
      const hasChosenPlan = localStorage.getItem('has_chosen_plan') === 'true';
      setHasChosenPlan(hasChosenPlan);
      
      console.log('Status final - hasStore:', hasStores, 'hasChosenPlan:', hasChosenPlan);
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

      console.log('Verificando autenticação...');
      
      const response = await authApi.me();
      const userData = response.data.user;
      
      console.log('Dados do usuário autenticado:', userData);
      
      authStorage.setUser(userData);
      setUser(userData);

      // Verificar status da loja
      await checkStoreStatus();
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

  // Lógica de redirecionamento baseada no estado do usuário
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const currentPath = window.location.pathname;
      
      console.log('Verificando redirecionamento - Path atual:', currentPath);
      console.log('Estado atual - hasStore:', hasStore, 'hasChosenPlan:', hasChosenPlan);
      
      // Evitar redirecionamentos em páginas específicas
      const excludedPaths = ['/plans', '/billing/success', '/billing/cancel', '/dashboard/create-store'];
      const isExcludedPath = excludedPaths.some(path => currentPath.startsWith(path));
      
      if (isExcludedPath) {
        console.log('Página excluída do redirecionamento:', currentPath);
        return;
      }
      
      // Se não tem loja, redirecionar para criar loja
      if (!hasStore) {
        console.log('Redirecionando para criar loja - não tem loja');
        window.location.href = '/dashboard/create-store';
        return;
      }
      
      // Se tem loja mas não escolheu plano, redirecionar para planos
      if (hasStore && !hasChosenPlan) {
        console.log('Redirecionando para planos - tem loja mas não escolheu plano');
        window.location.href = '/plans';
        return;
      }
      
      // Se está na home e já tem tudo configurado, ir para dashboard
      if (currentPath === '/' && hasStore && hasChosenPlan) {
        console.log('Redirecionando para dashboard - tudo configurado');
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