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

export interface Store {
  id: string;
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

export interface Product {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  preco_promocional?: number;
  disponivel: boolean;
  destaque: boolean;
  category?: {
    id: string;
    nome: string;
    cor: string;
  };
  ingredientes?: string[];
  alergicos?: string[];
  tempo_preparo_min?: number;
  imagem_url?: string;
  ordem?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProductRequest {
  nome: string;
  descricao?: string;
  preco: number;
  preco_promocional?: number;
  category_id?: string;
  ingredientes?: string[];
  alergicos?: string[];
  tempo_preparo_min?: number;
  disponivel?: boolean;
  destaque?: boolean;
  imagem_url?: string;
  ordem?: number;
}

export interface UpdateProductRequest {
  nome?: string;
  descricao?: string;
  preco?: number;
  preco_promocional?: number;
  category_id?: string;
  ingredientes?: string[];
  alergicos?: string[];
  tempo_preparo_min?: number;
  disponivel?: boolean;
  destaque?: boolean;
  imagem_url?: string;
  ordem?: number;
}