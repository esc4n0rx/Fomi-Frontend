"use client"

import { SidebarMenu } from "@/components/sidebar-menu"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MessageCircle, Eye, Star } from "lucide-react"

const customers = [
  {
    id: 1,
    name: "Maria Silva",
    email: "maria@email.com",
    phone: "(11) 99999-9999",
    orders: 23,
    totalSpent: "R$ 1.247,50",
    lastOrder: "2024-01-15",
    status: "vip",
    rating: 5,
    address: "Rua das Flores, 123 - São Paulo",
  },
  {
    id: 2,
    name: "João Santos",
    email: "joao@email.com",
    phone: "(11) 88888-8888",
    orders: 12,
    totalSpent: "R$ 567,80",
    lastOrder: "2024-01-14",
    status: "regular",
    rating: 4,
    address: "Av. Principal, 456 - São Paulo",
  },
  {
    id: 3,
    name: "Ana Costa",
    email: "ana@email.com",
    phone: "(11) 77777-7777",
    orders: 8,
    totalSpent: "R$ 234,90",
    lastOrder: "2024-01-13",
    status: "new",
    rating: 5,
    address: "Rua do Comércio, 789 - São Paulo",
  },
  {
    id: 4,
    name: "Carlos Oliveira",
    email: "carlos@email.com",
    phone: "(11) 66666-6666",
    orders: 45,
    totalSpent: "R$ 2.890,30",
    lastOrder: "2024-01-15",
    status: "vip",
    rating: 5,
    address: "Rua Nova, 321 - São Paulo",
  },
]

const statusConfig = {
  new: { label: "Novo", color: "bg-blue-100 text-blue-800" },
  regular: { label: "Regular", color: "bg-green-100 text-green-800" },
  vip: { label: "VIP", color: "bg-purple-100 text-purple-800" },
  inactive: { label: "Inativo", color: "bg-gray-100 text-gray-800" },
}

export default function CustomersPage() {
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
              <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
              <p className="text-gray-600">Gerencie seus clientes e relacionamentos</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input placeholder="Buscar clientes..." className="pl-10 w-64" />
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
                <h2 className="text-lg font-semibold">Todos os Clientes</h2>
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
              {customers.map((customer, index) => (
                <motion.div
                  key={customer.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                          <Badge className={statusConfig[customer.status as keyof typeof statusConfig].color}>
                            {statusConfig[customer.status as keyof typeof statusConfig].label}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < customer.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <p>{customer.email}</p>
                            <p>{customer.phone}</p>
                          </div>
                          <div>
                            <p>{customer.orders} pedidos</p>
                            <p>Último: {new Date(customer.lastOrder).toLocaleDateString("pt-BR")}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-primary">{customer.totalSpent}</p>
                            <p className="text-xs">{customer.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye size={16} className="mr-2" />
                        Ver
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle size={16} className="mr-2" />
                        Contato
                      </Button>
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
