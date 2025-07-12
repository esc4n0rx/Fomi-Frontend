"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { SidebarMenu } from "@/components/sidebar-menu"
import { DashboardCard } from "@/components/dashboard-card"
import { motion } from "framer-motion"
import { ShoppingBag, DollarSign, Users, TrendingUp, Bell, Search, Loader2, Link, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState, useRef } from "react"

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
  const { user, store, isLoading, hasStore, hasChosenPlan, refreshStoreStatus, logout } = useAuth()
  const router = useRouter()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [userMenuOpen])

  useEffect(() => {
    console.log('Dashboard - Estado atual:');
    console.log('- isLoading:', isLoading);
    console.log('- hasStore:', hasStore);
    console.log('- hasChosenPlan:', hasChosenPlan);
    console.log('- store:', store);
    console.log('- user:', user);
    
    if (!isLoading) {
      if (!hasStore) {
        console.log('Dashboard - Redirecionando para create-store: não tem loja');
        router.push('/dashboard/create-store');
        return;
      }
      
      if (!hasChosenPlan) {
        console.log('Dashboard - Redirecionando para plans: não escolheu plano');
        router.push('/plans');
        return;
      }
    }
  }, [isLoading, hasStore, hasChosenPlan, router]);

  // Tentar recarregar o status da loja se necessário
  useEffect(() => {
    const hasStoreInStorage = localStorage.getItem('has_store') === 'true';
    const hasChosenPlanInStorage = localStorage.getItem('has_chosen_plan') === 'true';
    
    console.log('Dashboard - Verificando storage:');
    console.log('- hasStoreInStorage:', hasStoreInStorage);
    console.log('- hasChosenPlanInStorage:', hasChosenPlanInStorage);
    console.log('- hasStore (state):', hasStore);
    console.log('- hasChosenPlan (state):', hasChosenPlan);
    
    // Se o localStorage indica que tem loja mas o estado não, recarregar
    if (hasStoreInStorage && !hasStore && !isLoading) {
      console.log('Dashboard - Inconsistência detectada, recarregando status da loja...');
      refreshStoreStatus();
    }
  }, [hasStore, hasChosenPlan, isLoading, refreshStoreStatus]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <p className="text-gray-600 font-medium">Carregando dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (!hasStore || !store) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <p className="text-gray-600 font-medium">Verificando sua loja...</p>
        </motion.div>
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

              {/* Avatar, nome e menu do usuário */}
              <div className="relative" ref={userMenuRef}>
                <button
                  className="flex items-center gap-2 bg-gradient-to-br from-primary to-secondary rounded-full px-3 py-1.5 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30"
                  onClick={() => setUserMenuOpen((v) => !v)}
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white font-bold text-lg">
                    {user?.nome?.charAt(0) || "U"}
                  </span>
                  <span className="hidden md:block text-white font-medium">{user?.nome}</span>
                  <Menu size={18} className="ml-1 text-white/80" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border z-50 animate-fade-in">
                    <div className="px-4 py-3 border-b">
                      <span className="block text-gray-900 font-semibold">{user?.nome}</span>
                      <span className="block text-xs text-gray-500">{user?.email}</span>
                    </div>
                    <button
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={logout}
                    >
                      Sair
                    </button>
                  </div>
                )}
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