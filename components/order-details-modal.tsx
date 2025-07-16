"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Order } from "@/types/orders"
import { toast } from "sonner"
import { Phone, Mail, MapPin, Clock, CreditCard, Truck, Package, User, Calendar } from "lucide-react"

interface OrderDetailsModalProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
  onUpdateStatus: (orderId: string, status: string, motivo_cancelamento?: string) => Promise<void>
  onAddNote: (orderId: string, observacao: string) => Promise<void>
  onPrint: (order: Order) => void
}

export function OrderDetailsModal({ 
  order, 
  isOpen, 
  onClose, 
  onUpdateStatus, 
  onAddNote, 
  onPrint 
}: OrderDetailsModalProps) {
  const [newNote, setNewNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(order?.status || "")
  const [cancelReason, setCancelReason] = useState("")

  const handleStatusUpdate = async () => {
    if (!order) return
    
    setIsSubmitting(true)
    try {
      await onUpdateStatus(order.id, selectedStatus, cancelReason)
      toast.success("Status do pedido atualizado com sucesso!")
      onClose()
    } catch (error: any) {
      toast.error(error.message || "Erro ao atualizar status")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddNote = async () => {
    if (!order || !newNote.trim()) return
    
    setIsSubmitting(true)
    try {
      await onAddNote(order.id, newNote.trim())
      setNewNote("")
      toast.success("Observação adicionada com sucesso!")
    } catch (error: any) {
      toast.error(error.message || "Erro ao adicionar observação")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR')
  }

  const getStatusConfig = (status: string) => {
    const configs = {
      pendente: { label: "Pendente", color: "bg-blue-100 text-blue-800" },
      confirmado: { label: "Confirmado", color: "bg-yellow-100 text-yellow-800" },
      preparando: { label: "Preparando", color: "bg-orange-100 text-orange-800" },
      saiu_entrega: { label: "Saiu para Entrega", color: "bg-purple-100 text-purple-800" },
      entregue: { label: "Entregue", color: "bg-green-100 text-green-800" },
      cancelado: { label: "Cancelado", color: "bg-red-100 text-red-800" }
    }
    return configs[status as keyof typeof configs] || { label: status, color: "bg-gray-100 text-gray-800" }
  }

  const getPaymentMethodLabel = (method: string) => {
    const methods = {
      pix: "PIX",
      cartao_credito: "Cartão de Crédito",
      cartao_debito: "Cartão de Débito",
      dinheiro: "Dinheiro"
    }
    return methods[method as keyof typeof methods] || method
  }

  if (!order) return null

  const statusConfig = getStatusConfig(order.status)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Pedido #{order.numero_pedido}</span>
            <Badge className={statusConfig.color}>
              {statusConfig.label}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Cliente */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Dados do Cliente
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">{order.cliente_nome}</p>
                <p className="text-sm text-gray-600 flex items-center">
                  <Phone className="w-3 h-3 mr-1" />
                  {order.cliente_telefone}
                </p>
                {order.cliente_email && (
                  <p className="text-sm text-gray-600 flex items-center">
                    <Mail className="w-3 h-3 mr-1" />
                    {order.cliente_email}
                  </p>
                )}
              </div>
              {order.tipo_entrega === 'entrega' && (
                <div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {order.endereco_rua}, {order.endereco_numero}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.endereco_bairro} - {order.endereco_cidade}/{order.endereco_estado}
                  </p>
                  <p className="text-sm text-gray-600">CEP: {order.endereco_cep}</p>
                </div>
              )}
            </div>
          </div>

          {/* Informações do Pedido */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center">
              <Package className="w-4 h-4 mr-2" />
              Informações do Pedido
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  Data do Pedido
                </p>
                <p className="font-medium">{formatDate(order.pedido_em)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  Tempo Estimado
                </p>
                <p className="font-medium">{order.tempo_estimado_min} minutos</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 flex items-center">
                  {order.tipo_entrega === 'entrega' ? <Truck className="w-3 h-3 mr-1" /> : <Package className="w-3 h-3 mr-1" />}
                  Tipo de Entrega
                </p>
                <p className="font-medium">
                  {order.tipo_entrega === 'entrega' ? 'Entrega' : 'Retirada'}
                </p>
              </div>
            </div>
          </div>

          {/* Itens do Pedido */}
          <div>
            <h3 className="font-semibold mb-3">Itens do Pedido</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium">Qtd</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Item</th>
                    <th className="px-4 py-2 text-right text-sm font-medium">Preço Unit.</th>
                    <th className="px-4 py-2 text-right text-sm font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 text-sm">{item.quantidade}x</td>
                      <td className="px-4 py-2">
                        <div>
                          <p className="font-medium">{item.produto_nome}</p>
                          {item.observacoes && (
                            <p className="text-xs text-gray-600">Obs: {item.observacoes}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm text-right">{formatCurrency(item.preco_unitario)}</td>
                      <td className="px-4 py-2 text-sm text-right font-medium">{formatCurrency(item.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Resumo Financeiro */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Resumo Financeiro</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              {order.desconto > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Desconto:</span>
                  <span>-{formatCurrency(order.desconto)}</span>
                </div>
              )}
              {order.taxa_entrega > 0 && (
                <div className="flex justify-between">
                  <span>Taxa de Entrega:</span>
                  <span>{formatCurrency(order.taxa_entrega)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>TOTAL:</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Forma de Pagamento */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center">
              <CreditCard className="w-4 h-4 mr-2" />
              Forma de Pagamento
            </h3>
            <p className="font-medium">{getPaymentMethodLabel(order.metodo_pagamento)}</p>
            {order.cupom_codigo && (
              <p className="text-sm text-gray-600">
                Cupom utilizado: {order.cupom_codigo} (-{formatCurrency(order.cupom_desconto || 0)})
              </p>
            )}
          </div>

          {/* Observações */}
          {order.observacoes && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Observações</h3>
              <p className="whitespace-pre-wrap">{order.observacoes}</p>
            </div>
          )}

          {/* Atualizar Status */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Atualizar Status</h3>
            <div className="space-y-3">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="confirmado">Confirmado</SelectItem>
                  <SelectItem value="preparando">Preparando</SelectItem>
                  <SelectItem value="saiu_entrega">Saiu para Entrega</SelectItem>
                  <SelectItem value="entregue">Entregue</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
              
              {selectedStatus === 'cancelado' && (
                <Textarea
                  placeholder="Motivo do cancelamento..."
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  rows={3}
                />
              )}
              
              <Button 
                onClick={handleStatusUpdate} 
                disabled={isSubmitting || selectedStatus === order.status}
                className="w-full"
              >
                {isSubmitting ? "Atualizando..." : "Atualizar Status"}
              </Button>
            </div>
          </div>

          {/* Adicionar Observação */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Adicionar Observação</h3>
            <div className="space-y-3">
              <Textarea
                placeholder="Digite uma observação..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={3}
              />
              <Button 
                onClick={handleAddNote} 
                disabled={isSubmitting || !newNote.trim()}
                variant="outline"
                className="w-full"
              >
                {isSubmitting ? "Adicionando..." : "Adicionar Observação"}
              </Button>
            </div>
          </div>

          {/* Ações */}
          <div className="flex space-x-3 pt-4 border-t">
            <Button 
              onClick={() => onPrint(order)} 
              variant="outline" 
              className="flex-1"
            >
              Imprimir Pedido
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 