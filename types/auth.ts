export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface Category {
  id: string;
  nome: string;
  descricao?: string;
  cor?: string;
  ordem: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryRequest {
  nome: string;
  descricao?: string;
  cor?: string;
  ordem?: number;
}

export interface UpdateCategoryRequest {
  nome?: string;
  descricao?: string;
  cor?: string;
  ordem?: number;
}