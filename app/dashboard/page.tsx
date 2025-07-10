"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { SidebarMenu } from "@/components/sidebar-menu"
import { DashboardCard } from "@/components/dashboard-card"
import { motion } from "framer-motion"
import { ShoppingBag, DollarSign, Users, TrendingUp, Bell, Search, Loader2, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const dashboardData = [
  {
    title: "Pedidos Hoje",
    value: "24",
    change: "+12% vs ontem",
    changeType: "positive" as const,
    icon: ShoppingBag,
  },
  {
    title: "Faturamento",
    value: "R$ 1.247",
    change: "+8% vs ontem",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Clientes Ativos",
    value: "156",
    change: "+3 novos hoje",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Ticket Médio",
    value: "R$ 52",
    change: "-2% vs ontem",
    changeType: "negative" as const,
    icon: TrendingUp,
  },
]

const recentOrders = [
  {
    id: "#1234",
    customer: "Maria Silva",
    items: "2x Hambúrguer, 1x Batata",
    value: "R$ 45,90",
    status: "preparing",
    time: "há 5 min",
  },
  {
    id: "#1235",
    customer: "João Santos",
    items: "1x Pizza Margherita",
    value: "R$ 32,00",
    status: "delivered",
    time: "há 12 min",
  },
  {
    id: "#1236",
    customer: "Ana Costa",
    items: "3x Açaí, 2x Suco",
    value: "R$ 28,50",
    status: "new",
    time: "há 2 min",
  },
];

const statusConfig = {
  new: { label: "Novo", color: "bg-blue-100 text-blue-800" },
  preparing: { label: "Preparando", color: "bg-yellow-100 text-yellow-800" },
  delivered: { label: "Entregue", color: "bg-green-100 text-green-800" },
};

export default function DashboardPage() {
  const { user, store, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !store) {
      router.push('/dashboard/create-store');
    }
  }, [isLoading, store, router]);

  if (isLoading || !store) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarMenu />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.header
          className="bg-white border-b border-gray-200 px-6 py-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Bem-vindo de volta, {user?.nome}! Visualizando dados da {store?.nome}.</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input placeholder="Buscar..." className="pl-10 w-64" />
              </div>

              <Button variant="ghost" size="icon">
                <Bell size={20} />
              </Button>

              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">{user?.nome?.charAt(0)}</span>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardData.map((item, index) => (
              <DashboardCard key={item.title} {...item} delay={index * 0.1} />
            ))}
          </div>

          {/* Recent Orders */}
          <motion.div
            className="bg-white rounded-xl border border-gray-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Pedidos Recentes</h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/orders">Ver Todos</Link>
              </Button>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{order.items}</p>
                        <p className="text-xs text-gray-500">{order.time}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="font-semibold text-gray-900">{order.value}</span>
                    <Badge className={statusConfig[order.status as keyof typeof statusConfig].color}>
                      {statusConfig[order.status as keyof typeof statusConfig].label}
                    </Badge>
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