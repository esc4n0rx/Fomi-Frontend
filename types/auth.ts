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
  store_id: string;
  nome: string;
  descricao?: string;
  cor?: string;
  imagem_url?: string;
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

export interface CategoryImageSettings {
  can_upload_images: boolean;
  user_plan: string;
  specifications: {
    dimensions: string;
    formats: string[];
    max_size: string;
    aspect_ratio: string;
  };
  upgrade_message?: string;
}

export interface ProductImageSettings {
  can_upload_images: boolean;
  user_plan: string;
  specifications: {
    main_image: {
      dimensions: string;
      formats: string[];
      max_size: string;
      aspect_ratio: string;
    };
    extra_images: {
      max_count: number;
      same_specs: string;
    };
  };
  upgrade_message?: string;
}

export interface ReorderCategoriesRequest {
  categories: Array<{
    id: string;
    ordem: number;
  }>;
}

export interface CategoryImageUploadResponse {
  success: boolean;
  message: string;
  data: {
    category: Category;
    imagem_url: string;
  };
}

export interface Product {
  id: string;
  store_id: string;
  category_id?: string;
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
  imagens_extras?: string[];
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

export interface ProductLimits {
  current: number;
  limit: number;
  plan: string;
  can_upload_images: boolean;
  max_extra_images?: number;
  upgrade_message?: string;
}