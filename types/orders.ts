export interface OrderItem {
  id: string;
  product_id: string;
  produto_nome: string;
  produto_descricao?: string;
  produto_preco: number;
  quantidade: number;
  preco_unitario: number;
  subtotal: number;
  observacoes?: string;
  product?: {
    id: string;
    nome: string;
  };
}

export interface Customer {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
}

export interface Store {
  id: string;
  nome: string;
  telefone: string;
  whatsapp: string;
}

export interface Order {
  id: string;
  numero_pedido: string;
  status: 'pendente' | 'confirmado' | 'preparando' | 'saiu_entrega' | 'entregue' | 'cancelado';
  cliente_nome: string;
  cliente_telefone: string;
  cliente_email?: string;
  endereco_cep?: string;
  endereco_rua?: string;
  endereco_numero?: string;
  endereco_bairro?: string;
  endereco_cidade?: string;
  endereco_estado?: string;
  subtotal: number;
  desconto: number;
  taxa_entrega: number;
  total: number;
  cupom_codigo?: string;
  cupom_desconto?: number;
  metodo_pagamento: 'pix' | 'cartao_credito' | 'cartao_debito' | 'dinheiro';
  tipo_entrega: 'entrega' | 'retirada';
  observacoes?: string;
  tempo_estimado_min: number;
  pedido_em: string;
  confirmado_em?: string;
  preparando_em?: string;
  saiu_entrega_em?: string;
  entregue_em?: string;
  cancelado_em?: string;
  customer?: Customer;
  store?: Store;
  items?: OrderItem[];
}

export interface OrderFilters {
  status?: string;
  data_inicio?: string;
  data_fim?: string;
  page?: number;
  limit?: number;
}

export interface OrderStatistics {
  total_pedidos: number;
  total_vendas: number;
  ticket_medio: number;
  pedidos_por_status: {
    pendente: number;
    confirmado: number;
    preparando: number;
    saiu_entrega: number;
    entregue: number;
    cancelado: number;
  };
}

export interface UpdateOrderStatusRequest {
  status: string;
  motivo_cancelamento?: string;
}

export interface AddOrderNoteRequest {
  observacao: string;
} 