"use client"

import { SidebarMenu } from "@/components/sidebar-menu"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { CreditCard, Smartphone, DollarSign, PiggyBank, TrendingUp, Calendar } from "lucide-react"

const paymentMethods = [
  {
    id: 1,
    name: "Cartão de Crédito",
    icon: CreditCard,
    enabled: true,
    fee: "3.5%",
    description: "Visa, Mastercard, Elo",
  },
  {
    id: 2,
    name: "Cartão de Débito",
    icon: CreditCard,
    enabled: true,
    fee: "2.5%",
    description: "Débito online",
  },
  {
    id: 3,
    name: "PIX",
    icon: Smartphone,
    enabled: true,
    fee: "0.5%",
    description: "Pagamento instantâneo",
  },
  {
    id: 4,
    name: "Dinheiro",
    icon: DollarSign,
    enabled: true,
    fee: "0%",
    description: "Pagamento na entrega",
  },
]

const transactions = [
  {
    id: "#PAY001",
    amount: "R$ 45,90",
    method: "PIX",
    status: "completed",
    date: "2024-01-15 14:30",
    customer: "Maria Silva",
  },
  {
    id: "#PAY002",
    amount: "R$ 32,00",
    method: "Cartão de Crédito",
    status: "completed",
    date: "2024-01-15 14:15",
    customer: "João Santos",
  },
  {
    id: "#PAY003",
    amount: "R$ 28,50",
    method: "Dinheiro",
    status: "pending",
    date: "2024-01-15 14:45",
    customer: "Ana Costa",
  },
]

export default function PaymentsPage() {
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
              <h1 className="text-2xl font-bold text-gray-900">Pagamentos</h1>
              <p className="text-gray-600">Gerencie métodos de pagamento e transações</p>
            </div>

            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800">Conta Ativa</Badge>
              <Button className="bg-primary hover:bg-primary/90">Configurar Gateway</Button>
            </div>
          </div>
        </motion.header>

        <main className="flex-1 overflow-auto p-6">
          {/* Resumo Financeiro */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Faturamento Hoje",
                value: "R$ 1.247,50",
                change: "+12%",
                icon: TrendingUp,
                color: "text-green-600",
              },
              {
                title: "Saldo Disponível",
                value: "R$ 3.456,80",
                change: "Disponível",
                icon: PiggyBank,
                color: "text-blue-600",
              },
              {
                title: "Próximo Repasse",
                value: "R$ 890,30",
                change: "Em 2 dias",
                icon: Calendar,
                color: "text-orange-600",
              },
              {
                title: "Taxa Média",
                value: "2.1%",
                change: "-0.3%",
                icon: CreditCard,
                color: "text-purple-600",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-white p-6 rounded-xl border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <item.icon size={24} className="text-primary" />
                  </div>
                  <span className={`text-sm font-medium ${item.color}`}>{item.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{item.value}</h3>
                <p className="text-gray-600 text-sm">{item.title}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Métodos de Pagamento */}
            <motion.div
              className="bg-white rounded-xl border border-gray-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-6">Métodos de Pagamento</h2>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <method.icon size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium text-gray-900">Taxa: {method.fee}</p>
                      </div>
                      <Switch checked={method.enabled} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Transações Recentes */}
            <motion.div
              className="bg-white rounded-xl border border-gray-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Transações Recentes</h2>
                <Button variant="outline" size="sm">
                  Ver Todas
                </Button>
              </div>

              <div className="space-y-4">
                {transactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900">{transaction.id}</h3>
                        <Badge
                          className={
                            transaction.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {transaction.status === "completed" ? "Concluído" : "Pendente"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{transaction.customer}</p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-primary">{transaction.amount}</p>
                      <p className="text-sm text-gray-600">{transaction.method}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
