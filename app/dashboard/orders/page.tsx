"use client"

import { SidebarMenu } from "@/components/sidebar-menu"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Eye, Printer, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const orders = [
  {
    id: "#1234",
    customer: "Maria Silva",
    items: ["2x Hambúrguer Artesanal", "1x Batata Frita Grande", "1x Coca-Cola"],
    total: "R$ 45,90",
    status: "preparing",
    time: "14:30",
    address: "Rua das Flores, 123",
    payment: "Cartão de Crédito",
  },
  {
    id: "#1235",
    customer: "João Santos",
    items: ["1x Pizza Margherita G", "1x Guaraná"],
    total: "R$ 32,00",
    status: "delivered",
    time: "14:15",
    address: "Av. Principal, 456",
    payment: "PIX",
  },
  {
    id: "#1236",
    customer: "Ana Costa",
    items: ["3x Açaí 500ml", "2x Suco Natural"],
    total: "R$ 28,50",
    status: "new",
    time: "14:45",
    address: "Rua do Comércio, 789",
    payment: "Dinheiro",
  },
  {
    id: "#1237",
    customer: "Carlos Oliveira",
    items: ["1x Combo Família", "2x Refrigerante"],
    total: "R$ 67,90",
    status: "preparing",
    time: "14:20",
    address: "Rua Nova, 321",
    payment: "Cartão de Débito",
  },
]

const statusConfig = {
  new: { label: "Novo", color: "bg-blue-100 text-blue-800" },
  preparing: { label: "Preparando", color: "bg-yellow-100 text-yellow-800" },
  ready: { label: "Pronto", color: "bg-green-100 text-green-800" },
  delivered: { label: "Entregue", color: "bg-gray-100 text-gray-800" },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800" },
}

export default function OrdersPage() {
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
              <p className="text-gray-600">Gerencie todos os pedidos da sua loja</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input placeholder="Buscar pedidos..." className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="icon">
                <Filter size={20} />
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
                <h2 className="text-lg font-semibold">Pedidos de Hoje</h2>
                <div className="flex space-x-2">
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <Badge key={key} variant="secondary" className={config.color}>
                      {config.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {orders.map((order, index) => (
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
                        <h3 className="font-semibold text-gray-900">{order.id}</h3>
                        <Badge className={statusConfig[order.status as keyof typeof statusConfig].color}>
                          {statusConfig[order.status as keyof typeof statusConfig].label}
                        </Badge>
                        <span className="text-sm text-gray-500">{order.time}</span>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <p className="font-medium text-gray-900">{order.customer}</p>
                          <p className="text-sm text-gray-600">{order.address}</p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600 mb-1">Itens:</p>
                          {order.items.map((item, i) => (
                            <p key={i} className="text-sm text-gray-900">
                              {item}
                            </p>
                          ))}
                        </div>

                        <div>
                          <p className="text-sm text-gray-600">Pagamento: {order.payment}</p>
                          <p className="text-lg font-bold text-primary mt-1">{order.total}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye size={16} className="mr-2" />
                        Ver
                      </Button>
                      <Button variant="outline" size="sm">
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
                          <DropdownMenuItem>Editar Status</DropdownMenuItem>
                          <DropdownMenuItem>Cancelar Pedido</DropdownMenuItem>
                          <DropdownMenuItem>Reenviar Notificação</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
