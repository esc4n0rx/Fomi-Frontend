"use client"

import { SidebarMenu } from "@/components/sidebar-menu"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Copy, Percent, Calendar } from "lucide-react"

const coupons = [
  {
    id: 1,
    code: "BEMVINDO10",
    description: "10% de desconto para novos clientes",
    type: "percentage",
    value: 10,
    minOrder: "R$ 30,00",
    uses: 45,
    maxUses: 100,
    status: "active",
    expiresAt: "2024-12-31",
  },
  {
    id: 2,
    code: "FRETE5",
    description: "R$ 5 de desconto no frete",
    type: "fixed",
    value: 5,
    minOrder: "R$ 25,00",
    uses: 23,
    maxUses: 50,
    status: "active",
    expiresAt: "2024-11-30",
  },
  {
    id: 3,
    code: "PIZZA20",
    description: "20% off em pizzas",
    type: "percentage",
    value: 20,
    minOrder: "R$ 40,00",
    uses: 12,
    maxUses: 30,
    status: "active",
    expiresAt: "2024-10-15",
  },
  {
    id: 4,
    code: "COMBO15",
    description: "15% em combos familiares",
    type: "percentage",
    value: 15,
    minOrder: "R$ 50,00",
    uses: 8,
    maxUses: 25,
    status: "expired",
    expiresAt: "2024-09-30",
  },
]

export default function CouponsPage() {
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
              <h1 className="text-2xl font-bold text-gray-900">Cupons</h1>
              <p className="text-gray-600">Gerencie cupons de desconto e promoções</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input placeholder="Buscar cupons..." className="pl-10 w-64" />
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus size={20} className="mr-2" />
                Novo Cupom
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
              <h2 className="text-lg font-semibold">Todos os Cupons</h2>
            </div>

            <div className="divide-y divide-gray-200">
              {coupons.map((coupon, index) => (
                <motion.div
                  key={coupon.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Percent size={20} className="text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                              <span>{coupon.code}</span>
                              <Button variant="ghost" size="sm" className="p-1 h-auto">
                                <Copy size={14} />
                              </Button>
                            </h3>
                            <p className="text-sm text-gray-600">{coupon.description}</p>
                          </div>
                        </div>
                        <Badge
                          className={
                            coupon.status === "active"
                              ? "bg-green-100 text-green-800"
                              : coupon.status === "expired"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                          }
                        >
                          {coupon.status === "active" ? "Ativo" : coupon.status === "expired" ? "Expirado" : "Inativo"}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Desconto</p>
                          <p className="font-medium">
                            {coupon.type === "percentage" ? `${coupon.value}%` : `R$ ${coupon.value}`}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Pedido mínimo</p>
                          <p className="font-medium">{coupon.minOrder}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Usos</p>
                          <p className="font-medium">
                            {coupon.uses}/{coupon.maxUses}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>Expira em</span>
                          </p>
                          <p className="font-medium">{new Date(coupon.expiresAt).toLocaleDateString("pt-BR")}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit size={16} className="mr-2" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                        <Trash2 size={16} />
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
