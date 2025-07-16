"use client"

import { useState } from "react"
import { SidebarMenu } from "@/components/sidebar-menu"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, Printer, MoreHorizontal, RefreshCw, Loader2, AlertCircle, Calendar, Clock, Package } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useOrders } from "@/hooks/useOrders"
import { Order } from "@/types/orders"
import { toast, Toaster } from "sonner"
import { OrderDetailsModal } from "@/components/order-details-modal"
import { OrderPrint } from "@/components/order-print"

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("todos")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false)
  
  const { orders, statistics, isLoading, error, updateOrderStatus, addOrderNote, refresh } = useOrders({
    status: selectedStatus === "todos" ? undefined : selectedStatus || undefined
  })
  
  console.log('OrdersPage - Estado atual:', {
    orders: orders?.length,
    statistics,
    isLoading,
    error
  })

  const statusConfig = {
    pendente: { label: "Pendente", color: "bg-blue-100 text-blue-800" },
    confirmado: { label: "Confirmado", color: "bg-yellow-100 text-yellow-800" },
    preparando: { label: "Preparando", color: "bg-orange-100 text-orange-800" },
    saiu_entrega: { label: "Saiu para Entrega", color: "bg-purple-100 text-purple-800" },
    entregue: { label: "Entregue", color: "bg-green-100 text-green-800" },
    cancelado: { label: "Cancelado", color: "bg-red-100 text-red-800" },
  }

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailsModalOpen(true)
  }

  const handlePrintOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsPrintModalOpen(true)
  }

  const handleUpdateStatus = async (orderId: string, status: string, motivo_cancelamento?: string) => {
    try {
      await updateOrderStatus(orderId, status, motivo_cancelamento)
    } catch (error: any) {
      throw error
    }
  }

  const handleAddNote = async (orderId: string, observacao: string) => {
    try {
      await addOrderNote(orderId, observacao)
    } catch (error: any) {
      throw error
    }
  }

  const filteredOrders = orders.filter(order =>
    order.numero_pedido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.cliente_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.cliente_telefone.includes(searchTerm)
  )

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR')
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

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <SidebarMenu />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-gray-600">Carregando pedidos...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-50">
        <SidebarMenu />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-500" />
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarMenu />

      <div className="flex-1 flex flex-col overflow-hidden">
        <motion.header
          className="bg-white border-b border-gray-200 px-6 py-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
                      <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
                <p className="text-gray-600">
                  Gerencie todos os pedidos da sua loja
                  {statistics && (
                    <span className="ml-2 text-sm text-gray-500">
                      • {statistics.total_pedidos || 0} pedidos • {statistics.total_vendas ? formatCurrency(statistics.total_vendas) : 'R$ 0,00'} em vendas
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input 
                    placeholder="Buscar pedidos..." 
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filtrar status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os status</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="confirmado">Confirmado</SelectItem>
                    <SelectItem value="preparando">Preparando</SelectItem>
                    <SelectItem value="saiu_entrega">Saiu para Entrega</SelectItem>
                    <SelectItem value="entregue">Entregue</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" onClick={refresh}>
                  <RefreshCw size={20} />
                </Button>
              </div>
            </div>
        </motion.header>

        <main className="flex-1 overflow-auto p-6">
          <motion.div
            className="bg-white rounded-xl border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Pedidos {selectedStatus && selectedStatus !== "todos" ? `- ${statusConfig[selectedStatus as keyof typeof statusConfig]?.label}` : ''}
                </h2>
                <div className="flex space-x-2">
                  {statistics?.pedidos_por_status && Object.entries(statistics.pedidos_por_status).map(([status, count]) => (
                    <Badge key={status} variant="secondary" className={statusConfig[status as keyof typeof statusConfig]?.color}>
                      {statusConfig[status as keyof typeof statusConfig]?.label}: {count || 0}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {searchTerm ? "Nenhum pedido encontrado" : "Nenhum pedido realizado"}
                  </h3>
                  <p className="text-gray-600">
                    {searchTerm 
                      ? "Tente ajustar os termos de busca" 
                      : "Quando os clientes fizerem pedidos, eles aparecerão aqui"
                    }
                  </p>
                </div>
              ) : (
                filteredOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h3 className="font-semibold text-gray-900">#{order.numero_pedido}</h3>
                          <Badge className={statusConfig[order.status as keyof typeof statusConfig].color}>
                            {statusConfig[order.status as keyof typeof statusConfig].label}
                          </Badge>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatDate(order.pedido_em)}
                          </span>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <p className="font-medium text-gray-900">{order.cliente_nome}</p>
                            <p className="text-sm text-gray-600">{order.cliente_telefone}</p>
                            {order.tipo_entrega === 'entrega' && (
                              <p className="text-sm text-gray-600">
                                {order.endereco_rua}, {order.endereco_numero}
                              </p>
                            )}
                          </div>

                          <div>
                            <p className="text-sm text-gray-600 mb-1">Itens:</p>
                            {order.items?.slice(0, 3).map((item, i) => (
                              <p key={i} className="text-sm text-gray-900">
                                {item.quantidade}x {item.produto_nome}
                              </p>
                            ))}
                            {order.items && order.items.length > 3 && (
                              <p className="text-sm text-gray-500">
                                +{order.items.length - 3} mais itens
                              </p>
                            )}
                          </div>

                          <div>
                            <p className="text-sm text-gray-600">
                              Pagamento: {getPaymentMethodLabel(order.metodo_pagamento)}
                            </p>
                            <p className="text-lg font-bold text-primary mt-1">
                              {formatCurrency(order.total)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewOrder(order)}
                        >
                          <Eye size={16} className="mr-2" />
                          Ver
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handlePrintOrder(order)}
                        >
                          <Printer size={16} className="mr-2" />
                          Imprimir
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleViewOrder(order)}>
                              Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePrintOrder(order)}>
                              Imprimir Pedido
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => refresh()}>
                              Atualizar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </main>
      </div>
      <Toaster />
      
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onUpdateStatus={handleUpdateStatus}
        onAddNote={handleAddNote}
        onPrint={handlePrintOrder}
      />
      
      <OrderPrint
        order={selectedOrder!}
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
      />
    </div>
  )
}
