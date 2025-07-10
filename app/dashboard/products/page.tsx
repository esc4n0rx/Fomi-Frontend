"use client"

import { SidebarMenu } from "@/components/sidebar-menu"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Hambúrguer Artesanal",
    category: "Hambúrgueres",
    price: "R$ 25,90",
    stock: 45,
    status: "active",
    image: "/placeholder.svg?height=60&width=60",
    description: "Hambúrguer artesanal com carne 180g, queijo, alface e tomate",
  },
  {
    id: 2,
    name: "Pizza Margherita",
    category: "Pizzas",
    price: "R$ 32,00",
    stock: 0,
    status: "inactive",
    image: "/placeholder.svg?height=60&width=60",
    description: "Pizza tradicional com molho de tomate, mussarela e manjericão",
  },
  {
    id: 3,
    name: "Açaí 500ml",
    category: "Bebidas",
    price: "R$ 12,50",
    stock: 23,
    status: "active",
    image: "/placeholder.svg?height=60&width=60",
    description: "Açaí cremoso com granola, banana e mel",
  },
  {
    id: 4,
    name: "Batata Frita Grande",
    category: "Acompanhamentos",
    price: "R$ 8,90",
    stock: 67,
    status: "active",
    image: "/placeholder.svg?height=60&width=60",
    description: "Batata frita crocante temperada com sal especial",
  },
]

export default function ProductsPage() {
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
              <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
              <p className="text-gray-600">Gerencie o cardápio da sua loja</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input placeholder="Buscar produtos..." className="pl-10 w-64" />
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus size={20} className="mr-2" />
                Novo Produto
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
              <h2 className="text-lg font-semibold">Todos os Produtos</h2>
            </div>

            <div className="divide-y divide-gray-200">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                    />

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {product.category}
                        </Badge>
                        <Badge
                          className={
                            product.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }
                        >
                          {product.status === "active" ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Estoque: {product.stock} unidades</span>
                        <span className="text-lg font-bold text-primary">{product.price}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye size={16} className="mr-2" />
                        Ver
                      </Button>
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
