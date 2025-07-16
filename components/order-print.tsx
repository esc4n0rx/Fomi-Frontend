"use client"

import { Order } from '@/types/orders';
import { useEffect, useRef } from 'react';

interface OrderPrintProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderPrint({ order, isOpen, onClose }: OrderPrintProps) {
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && printRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Pedido ${order.numero_pedido}</title>
              <style>
                @media print {
                  @page {
                    margin: 0.5in;
                    size: A4;
                  }
                }
                
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }
                
                body {
                  font-family: 'Courier New', monospace;
                  font-size: 12px;
                  line-height: 1.4;
                  color: #000;
                  background: white;
                }
                
                .print-container {
                  max-width: 100%;
                  margin: 0 auto;
                }
                
                .header {
                  text-align: center;
                  border-bottom: 2px solid #000;
                  padding-bottom: 10px;
                  margin-bottom: 20px;
                }
                
                .store-name {
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 5px;
                }
                
                .order-info {
                  margin-bottom: 20px;
                }
                
                .order-number {
                  font-size: 16px;
                  font-weight: bold;
                  margin-bottom: 10px;
                }
                
                .info-row {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 5px;
                }
                
                .customer-info {
                  margin-bottom: 20px;
                  border: 1px solid #000;
                  padding: 10px;
                }
                
                .customer-title {
                  font-weight: bold;
                  margin-bottom: 10px;
                  text-align: center;
                  background: #f0f0f0;
                  padding: 5px;
                }
                
                .items-table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-bottom: 20px;
                }
                
                .items-table th,
                .items-table td {
                  border: 1px solid #000;
                  padding: 8px;
                  text-align: left;
                }
                
                .items-table th {
                  background: #f0f0f0;
                  font-weight: bold;
                }
                
                .item-qty {
                  text-align: center;
                  width: 60px;
                }
                
                .item-name {
                  width: 200px;
                }
                
                .item-price {
                  text-align: right;
                  width: 80px;
                }
                
                .item-total {
                  text-align: right;
                  width: 80px;
                }
                
                .totals {
                  margin-left: auto;
                  width: 200px;
                }
                
                .total-row {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 5px;
                }
                
                .total-final {
                  font-weight: bold;
                  font-size: 14px;
                  border-top: 2px solid #000;
                  padding-top: 5px;
                  margin-top: 5px;
                }
                
                .payment-info {
                  margin-top: 20px;
                  border: 1px solid #000;
                  padding: 10px;
                }
                
                .observations {
                  margin-top: 20px;
                  border: 1px solid #000;
                  padding: 10px;
                }
                
                .observations h4 {
                  margin-bottom: 10px;
                  text-align: center;
                  background: #f0f0f0;
                  padding: 5px;
                }
                
                .footer {
                  margin-top: 30px;
                  text-align: center;
                  font-size: 10px;
                  border-top: 1px solid #000;
                  padding-top: 10px;
                }
                
                .status-badge {
                  display: inline-block;
                  padding: 5px 10px;
                  border: 2px solid #000;
                  font-weight: bold;
                  text-transform: uppercase;
                  margin-bottom: 10px;
                }
                
                @media print {
                  .no-print {
                    display: none;
                  }
                }
              </style>
            </head>
            <body>
              ${printRef.current?.innerHTML || ''}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
        onClose();
      }
    }
  }, [isOpen, order, onClose]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      pendente: 'PENDENTE',
      confirmado: 'CONFIRMADO',
      preparando: 'PREPARANDO',
      saiu_entrega: 'SAIU PARA ENTREGA',
      entregue: 'ENTREGUE',
      cancelado: 'CANCELADO'
    };
    return statusMap[status] || status.toUpperCase();
  };

  const getPaymentMethodLabel = (method: string) => {
    const methodMap: Record<string, string> = {
      pix: 'PIX',
      cartao_credito: 'Cartão de Crédito',
      cartao_debito: 'Cartão de Débito',
      dinheiro: 'Dinheiro'
    };
    return methodMap[method] || method;
  };

  if (!isOpen) return null;

  return (
    <div className="hidden">
      <div ref={printRef} className="print-container">
        <div className="header">
          <div className="store-name">{order.store?.nome || 'Minha Loja'}</div>
          <div>Pedido Impresso em {formatDate(new Date().toISOString())}</div>
        </div>

        <div className="order-info">
          <div className="order-number">PEDIDO #{order.numero_pedido}</div>
          <div className="status-badge">{getStatusLabel(order.status)}</div>
          <div className="info-row">
            <span>Data do Pedido:</span>
            <span>{formatDate(order.pedido_em)}</span>
          </div>
          <div className="info-row">
            <span>Tempo Estimado:</span>
            <span>{order.tempo_estimado_min} minutos</span>
          </div>
          <div className="info-row">
            <span>Tipo de Entrega:</span>
            <span>{order.tipo_entrega === 'entrega' ? 'Entrega' : 'Retirada'}</span>
          </div>
        </div>

        <div className="customer-info">
          <div className="customer-title">DADOS DO CLIENTE</div>
          <div className="info-row">
            <span>Nome:</span>
            <span>{order.cliente_nome}</span>
          </div>
          <div className="info-row">
            <span>Telefone:</span>
            <span>{order.cliente_telefone}</span>
          </div>
          {order.cliente_email && (
            <div className="info-row">
              <span>Email:</span>
              <span>{order.cliente_email}</span>
            </div>
          )}
          {order.tipo_entrega === 'entrega' && (
            <>
              <div className="info-row">
                <span>Endereço:</span>
                <span>{order.endereco_rua}, {order.endereco_numero}</span>
              </div>
              <div className="info-row">
                <span>Bairro:</span>
                <span>{order.endereco_bairro}</span>
              </div>
              <div className="info-row">
                <span>Cidade/Estado:</span>
                <span>{order.endereco_cidade} - {order.endereco_estado}</span>
              </div>
              <div className="info-row">
                <span>CEP:</span>
                <span>{order.endereco_cep}</span>
              </div>
            </>
          )}
        </div>

        <table className="items-table">
          <thead>
            <tr>
              <th className="item-qty">Qtd</th>
              <th className="item-name">Item</th>
              <th className="item-price">Preço Unit.</th>
              <th className="item-total">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items?.map((item, index) => (
              <tr key={index}>
                <td className="item-qty">{item.quantidade}x</td>
                <td className="item-name">
                  {item.produto_nome}
                  {item.observacoes && (
                    <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
                      Obs: {item.observacoes}
                    </div>
                  )}
                </td>
                <td className="item-price">{formatCurrency(item.preco_unitario)}</td>
                <td className="item-total">{formatCurrency(item.subtotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="totals">
          <div className="total-row">
            <span>Subtotal:</span>
            <span>{formatCurrency(order.subtotal)}</span>
          </div>
          {order.desconto > 0 && (
            <div className="total-row">
              <span>Desconto:</span>
              <span>-{formatCurrency(order.desconto)}</span>
            </div>
          )}
          {order.taxa_entrega > 0 && (
            <div className="total-row">
              <span>Taxa de Entrega:</span>
              <span>{formatCurrency(order.taxa_entrega)}</span>
            </div>
          )}
          <div className="total-row total-final">
            <span>TOTAL:</span>
            <span>{formatCurrency(order.total)}</span>
          </div>
        </div>

        <div className="payment-info">
          <div className="customer-title">FORMA DE PAGAMENTO</div>
          <div className="info-row">
            <span>Método:</span>
            <span>{getPaymentMethodLabel(order.metodo_pagamento)}</span>
          </div>
          {order.cupom_codigo && (
            <div className="info-row">
              <span>Cupom Utilizado:</span>
              <span>{order.cupom_codigo} (-{formatCurrency(order.cupom_desconto || 0)})</span>
            </div>
          )}
        </div>

        {order.observacoes && (
          <div className="observations">
            <h4>OBSERVAÇÕES</h4>
            <div style={{ whiteSpace: 'pre-wrap' }}>{order.observacoes}</div>
          </div>
        )}

        <div className="footer">
          <div>Obrigado pela preferência!</div>
          <div>Pedido #{order.numero_pedido} - {order.store?.nome}</div>
          <div>Telefone: {order.store?.telefone} | WhatsApp: {order.store?.whatsapp}</div>
        </div>
      </div>
    </div>
  );
} 