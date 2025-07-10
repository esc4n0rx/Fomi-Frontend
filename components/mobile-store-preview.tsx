"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, MapPin, ShoppingCart, Plus, Minus } from "lucide-react"

const mockProducts = [
  {
    id: 1,
    name: "Hambúrguer Artesanal",
    price: "R$ 25,90",
    image: "/placeholder.svg?height=80&width=80",
    description: "Carne 180g, queijo, alface, tomate",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Pizza Margherita",
    price: "R$ 32,00",
    image: "/placeholder.svg?height=80&width=80",
    description: "Molho especial, mussarela, manjericão",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Batata Frita Grande",
    price: "R$ 8,90",
    image: "/placeholder.svg?height=80&width=80",
    description: "Batata crocante temperada",
    rating: 4.7,
  },
]

export function MobileStorePreview() {
  return (
    <motion.div
      className="w-80 h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-800 relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {/* Status Bar */}
      <div className="bg-gray-800 text-white text-xs px-4 py-1 flex justify-between items-center">
        <span>9:41</span>
        <div className="flex space-x-1">
          <div className="w-4 h-2 bg-white rounded-sm"></div>
          <div className="w-4 h-2 bg-white rounded-sm"></div>
          <div className="w-4 h-2 bg-white rounded-sm"></div>
        </div>
      </div>

      {/* Store Header */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>
        <div className="absolute -bottom-8 left-4">
          <div className="w-16 h-16 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <span className="text-2xl font-bold gradient-text">L</span>
          </div>
        </div>
      </div>

      <div className="px-4 pt-12 pb-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold text-gray-900">Lanchonete do João</h1>
          <Badge className="bg-green-100 text-green-800 text-xs">Aberto</Badge>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span>4.8</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>25-35 min</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin size={14} />
            <span>2.1 km</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">Os melhores lanches da região com ingredientes frescos! 🍔</p>
      </div>

      {/* Products */}
      <div className="flex-1 overflow-y-auto px-4">
        <h2 className="font-semibold text-gray-900 mb-3">Mais Pedidos</h2>
        <div className="space-y-3">
          {mockProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-12 h-12 rounded-lg object-cover bg-gray-200"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                <p className="text-xs text-gray-600 mb-1">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary text-sm">{product.price}</span>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" className="w-6 h-6 p-0 bg-transparent">
                      <Minus size={12} />
                    </Button>
                    <span className="text-sm font-medium">0</span>
                    <Button size="sm" className="w-6 h-6 p-0 bg-primary">
                      <Plus size={12} />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cart Button */}
      <div className="p-4 border-t border-gray-200">
        <Button className="w-full bg-primary hover:bg-primary/90 flex items-center justify-center space-x-2">
          <ShoppingCart size={18} />
          <span>Ver Carrinho • R$ 0,00</span>
        </Button>
      </div>
    </motion.div>
  )
}
