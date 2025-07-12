import axios from 'axios';
import { LoginRequest, RegisterRequest, AuthResponse, ErrorResponse, User } from '@/types/auth';

const API_BASE_URL = 'https://api.fomi-eats.shop/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async me(): Promise<{ success: boolean; data: { user: User } }> {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async checkCep(cep: string): Promise<any> {
    try {
      const cleanCep = cep.replace(/\D/g, '');
      const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);
      return response.data;
    } catch (error) {
      throw new Error('CEP não encontrado');
    }
  }
};

export const storeApi = {
  async createStore(data: {
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
  }): Promise<{ success: boolean; data: any }> {
    try {
      console.log('Criando loja com dados:', data);
      const response = await api.post('/stores', data);
      console.log('Resposta da criação da loja:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Erro na API ao criar loja:', error);
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async getStores(): Promise<{ success: boolean; data: { stores: any[] } }> {
    try {
      console.log('Buscando lojas do usuário...');
      const response = await api.get('/stores');
      console.log('Resposta da busca de lojas:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Erro na API ao buscar lojas:', error);
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async getStoreById(id: string): Promise<{ success: boolean; data: { store: any } }> {
    try {
      const response = await api.get(`/stores/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  }
};

export const categoriesApi = {
  async getCategories(storeId: string): Promise<{ success: boolean; data: { categories: any[] } }> {
    try {
      const response = await api.get(`/categories/${storeId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async createCategory(storeId: string, data: {
    nome: string;
    descricao?: string;
    cor?: string;
    ordem?: number;
  }): Promise<{ success: boolean; message: string; data: { category: any } }> {
    try {
      const response = await api.post(`/categories/${storeId}`, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async updateCategory(storeId: string, categoryId: string, data: {
    nome?: string;
    descricao?: string;
    cor?: string;
    ordem?: number;
  }): Promise<{ success: boolean; message: string; data: { category: any } }> {
    try {
      const response = await api.put(`/categories/${storeId}/${categoryId}`, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async deleteCategory(storeId: string, categoryId: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.delete(`/categories/${storeId}/${categoryId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  }
};

export default api;