"use client"

import { SidebarMenu } from "@/components/sidebar-menu"
import { BillingManagement } from "@/components/billing-management"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { User, Bell, Shield, CreditCard } from "lucide-react"

export default function SettingsPage() {
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
              <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
              <p className="text-gray-600">Gerencie suas preferências e configurações da conta</p>
            </div>

            <div className="flex items-center space-x-4">
              <Button className="bg-primary hover:bg-primary/90">Salvar Alterações</Button>
            </div>
          </div>
        </motion.header>

        <main className="flex-1 overflow-auto p-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Perfil do Usuário */}
            <motion.div
              className="bg-white rounded-xl border border-gray-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <User size={24} className="text-primary" />
                <h2 className="text-xl font-semibold">Perfil do Usuário</h2>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">JS</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">João Silva</h3>
                  <p className="text-gray-600">Proprietário</p>
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                    Alterar Foto
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nome</Label>
                    <Input id="firstName" defaultValue="João" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <Input id="lastName" defaultValue="Silva" className="mt-1" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="joao@email.com" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" defaultValue="(11) 99999-9999" className="mt-1" />
                </div>
              </div>
            </motion.div>

            {/* Notificações */}
            <motion.div
              className="bg-white rounded-xl border border-gray-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <Bell size={24} className="text-primary" />
                <h2 className="text-xl font-semibold">Notificações</h2>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Novos pedidos", description: "Receber notificação de novos pedidos", enabled: true },
                  { label: "Email marketing", description: "Receber dicas e novidades por email", enabled: false },
                  { label: "SMS", description: "Notificações por SMS", enabled: true },
                  { label: "Push notifications", description: "Notificações no navegador", enabled: true },
                  { label: "Relatórios semanais", description: "Resumo semanal por email", enabled: true },
                ].map((notification) => (
                  <div key={notification.label} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{notification.label}</p>
                      <p className="text-sm text-gray-600">{notification.description}</p>
                    </div>
                    <Switch checked={notification.enabled} />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Segurança */}
            <motion.div
              className="bg-white rounded-xl border border-gray-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <Shield size={24} className="text-primary" />
                <h2 className="text-xl font-semibold">Segurança</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Senha Atual</Label>
                  <Input id="currentPassword" type="password" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <Input id="newPassword" type="password" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <Input id="confirmPassword" type="password" className="mt-1" />
                </div>

                <Button className="w-full">Alterar Senha</Button>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Autenticação de dois fatores</span>
                    <Badge className="bg-red-100 text-red-800">Desativado</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Adicione uma camada extra de segurança à sua conta</p>
                  <Button variant="outline" size="sm">
                    Ativar 2FA
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Plano e Faturamento */}
            <motion.div
              className="bg-white rounded-xl border border-gray-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <CreditCard size={24} className="text-primary" />
                <h2 className="text-xl font-semibold">Plano e Faturamento</h2>
              </div>

              <BillingManagement />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}