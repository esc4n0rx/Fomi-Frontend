export interface Coupon {
  id: string;
  codigo: string;
  nome: string;
  descricao?: string;
  tipo: 'desconto_percentual' | 'desconto_fixo' | 'frete_gratis';
  valor: number;
  valor_minimo_pedido?: number;
  limite_uso?: number;
  total_usado: number;
  data_inicio: string;
  data_fim: string;
  ativo: boolean;
  created_at: string;
}

export interface CreateCouponRequest {
  codigo: string;
  nome: string;
  descricao?: string;
  tipo: 'desconto_percentual' | 'desconto_fixo' | 'frete_gratis';
  valor: number;
  valor_minimo_pedido?: number;
  limite_uso?: number;
  data_inicio: string;
  data_fim: string;
}

export interface UpdateCouponRequest {
  nome?: string;
  descricao?: string;
  valor?: number;
  valor_minimo_pedido?: number;
  limite_uso?: number;
  data_inicio?: string;
  data_fim?: string;
  ativo?: boolean;
}

export interface ValidateCouponRequest {
  codigo: string;
  valor_pedido: number;
}

export interface CouponFilters {
  ativo?: boolean;
} 