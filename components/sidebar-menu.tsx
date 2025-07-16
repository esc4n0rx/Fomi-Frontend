"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, ShoppingBag, Users, Settings, ChevronLeft, Store, Package, CreditCard, Tag } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { useBilling } from "@/hooks/useBilling"
import { useAuth } from "@/hooks/useAuth"

export function SidebarMenu() {
  const [isExpanded, setIsExpanded] = useState(true)
  const pathname = usePathname()
  const { subscription, isLoading } = useBilling()
  const { user } = useAuth()

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: ShoppingBag, label: "Pedidos", href: "/dashboard/orders" },
    { icon: Package, label: "Produtos", href: "/dashboard/products" },
    { icon: Store, label: "Categorias", href: "/dashboard/categories" },
    { icon: Tag, label: "Promoções", href: "/dashboard/promotions" },
    { icon: CreditCard, label: "Cupons", href: "/dashboard/coupons" },
    { icon: Users, label: "Clientes", href: "/dashboard/customers" },
    { icon: Store, label: "Loja", href: "/dashboard/store" },
    { icon: CreditCard, label: "Pagamentos", href: "/dashboard/payments" },
    { icon: Settings, label: "Configurações", href: "/dashboard/settings" },
  ]

  const getPlanInfo = () => {
    if (isLoading) return { name: "Carregando...", color: "bg-gray-100 text-gray-800" };
    
    if (!subscription) {
      return { name: "Plano Grátis", color: "bg-green-100 text-green-800" };
    }

    switch (subscription.plano) {
      case 'fomi_duplo':
        return { name: "Fomi Duplo", color: "bg-blue-100 text-blue-800" };
      case 'fomi_supremo':
        return { name: "Fomi Supremo", color: "bg-purple-100 text-purple-800" };
      default:
        return { name: "Plano Grátis", color: "bg-green-100 text-green-800" };
    }
  };

  const planInfo = getPlanInfo();

  return (
    <motion.div
      className={`bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300 ${
        isExpanded ? "w-64" : "w-16"
      }`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-xl font-bold gradient-text">Fomi</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div animate={{ rotate: isExpanded ? 0 : 180 }} transition={{ duration: 0.3 }}>
              <ChevronLeft size={20} />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 + 0.2 }}
            >
              <Link href={item.href}>
                <motion.div
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-primary/10 text-primary border-r-2 border-primary"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon size={20} />
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        className="font-medium"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <motion.div
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">{user?.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}</span>
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1"
              >
                <p className="font-medium text-gray-900">{user?.name || 'Usuário'}</p>
                <Badge className={`text-xs ${planInfo.color}`}>
                  {planInfo.name}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}