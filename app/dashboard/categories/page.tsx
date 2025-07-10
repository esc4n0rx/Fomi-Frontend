"use client"

import { SidebarMenu } from "@/components/sidebar-menu"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Grid } from "lucide-react"

const categories = [
  {
    id: 1,
    name: "Hambúrgueres",
    description: "Hambúrgueres artesanais e tradicionais",
    products: 12,
    status: "active",
    color: "#E63946",
    icon: "🍔",
  },
  {
    id: 2,
    name: "Pizzas",
    description: "Pizzas tradicionais e especiais",
    products: 8,
    status: "active",
    color: "#FFC300",
    icon: "🍕",
  },
  {
    id: 3,
    name: "Bebidas",
    description: "Sucos, refrigerantes e bebidas especiais",
    products: 15,
    status: "active",
    color: "#06D6A0",
    icon: "🥤",
  },
  {
    id: 4,
    name: "Acompanhamentos",
    description: "Batatas, saladas e outros acompanhamentos",
    products: 6,
    status: "active",
    color: "#F72585",
    icon: "🍟",
  },
  {
    id: 5,
    name: "Sobremesas",
    description: "Doces e sobremesas especiais",
    products: 4,
    status: "inactive",
    color: "#7209B7",
    icon: "🍰",
  },
]

export default function CategoriesPage() {
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
              <h1 className="text-2xl font-bold text-gray-900">Categorias</h1>
              <p className="text-gray-600">Organize seus produtos por categorias</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input placeholder="Buscar categorias..." className="pl-10 w-64" />
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus size={20} className="mr-2" />
                Nova Categoria
              </Button>
            </div>
          </div>
        </motion.header>

        <main className="flex-1 overflow-auto p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    {category.icon}
                  </div>
                  <Badge
                    className={category.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                  >
                    {category.status === "active" ? "Ativa" : "Inativa"}
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{category.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Grid size={16} />
                    <span>{category.products} produtos</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Edit size={16} className="mr-2" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
