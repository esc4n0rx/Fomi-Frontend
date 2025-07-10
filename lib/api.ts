import axios from 'axios';
import { LoginRequest, RegisterRequest, AuthResponse, ErrorResponse, User } from '@/types/auth';

const API_BASE_URL = 'http://localhost:3000/api/v1';

// Criar instância do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para lidar com respostas de erro
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

export default api;