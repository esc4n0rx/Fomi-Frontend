export interface Promotion {
  id: string
  nome: string
  descricao?: string
  tipo: 'desconto_percentual' | 'desconto_fixo' | 'produto_gratis'
  valor: number
  produto_gratis?: {
    id: string
    nome: string
    preco: number
  }
  valor_minimo_pedido?: number
  data_inicio: string
  data_fim: string
  ativo: boolean
  created_at: string
}

export interface CreatePromotionRequest {
  nome: string
  descricao?: string
  tipo: 'desconto_percentual' | 'desconto_fixo' | 'produto_gratis'
  valor: number
  produto_gratis_id?: string
  valor_minimo_pedido?: number
  data_inicio: string
  data_fim: string
}

export interface UpdatePromotionRequest extends Partial<CreatePromotionRequest> {
  ativo?: boolean
}

export interface PromotionsResponse {
  success: boolean
  data: {
    promotions: Promotion[]
  }
}

export interface PromotionResponse {
  success: boolean
  message: string
  data: {
    promotion: Promotion
  }
} 