"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"

interface PlanCardProps {
  name: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
  delay?: number
}

export function PlanCard({ name, price, description, features, isPopular = false, delay = 0 }: PlanCardProps) {
  return (
    <motion.div
      className={`relative p-8 rounded-2xl border-2 transition-all duration-300 ${
        isPopular
          ? "border-primary bg-gradient-to-br from-primary/5 to-secondary/5 shadow-xl scale-105"
          : "border-gray-200 bg-white hover:border-primary/30 hover:shadow-lg"
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      viewport={{ once: true }}
    >
      {isPopular && (
        <motion.div
          className="absolute -top-4 left-1/2 transform -translate-x-1/2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.3, type: "spring", stiffness: 500 }}
        >
          <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
            <Star size={16} fill="currentColor" />
            <span>Mais Popular</span>
          </div>
        </motion.div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold gradient-text">R$ {price}</span>
          <span className="text-gray-600 ml-2">/mês</span>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <motion.li
            key={index}
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.1 * index }}
            viewport={{ once: true }}
          >
            <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
              <Check size={12} className="text-primary" />
            </div>
            <span className="text-gray-700">{feature}</span>
          </motion.li>
        ))}
      </ul>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          className={`w-full py-3 font-semibold ${
            isPopular ? "bg-primary hover:bg-primary/90 text-white" : "bg-gray-900 hover:bg-gray-800 text-white"
          }`}
        >
          Começar Agora
        </Button>
      </motion.div>
    </motion.div>
  )
}
