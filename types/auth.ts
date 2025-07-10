export interface User {
    id: string;
    nome: string;
    email: string;
    cpf: string;
    endereco_completo?: {
      cep: string;
      rua: string;
      numero: string;
      complemento?: string;
      bairro: string;
      cidade: string;
      estado: string;
    };
    created_at: string;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface RegisterRequest {
    nome: string;
    email: string;
    data_nascimento: string;
    cpf: string;
    endereco_cep: string;
    endereco_rua: string;
    endereco_numero: string;
    endereco_complemento?: string;
    endereco_bairro: string;
    endereco_cidade: string;
    endereco_estado: string;
    password: string;
    codigo_convite?: string;
  }
  
  export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
      user: User;
      token: string;
    };
  }
  
  export interface ErrorResponse {
    success: false;
    message: string;
    errors?: Array<{
      field: string;
      message: string;
    }>;
  }