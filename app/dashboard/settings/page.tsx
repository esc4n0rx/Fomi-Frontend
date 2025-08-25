"use client"

import { SidebarMenu } from "@/components/sidebar-menu";
import { BillingManagement } from "@/components/billing-management";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Bell, CreditCard, Info } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SettingsPage() {
  const { user, isLoading } = useAuth();

  const getInitials = (name: string = '') => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

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
              <Button disabled title="Funcionalidade em desenvolvimento" className="bg-primary hover:bg-primary/90">Salvar Alterações</Button>
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

              {isLoading ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : user ? (
                <>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">{getInitials(user.nome)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{user.nome}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent" disabled title="Funcionalidade em desenvolvimento">
                        Alterar Foto
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                        <Label htmlFor="fullName">Nome Completo</Label>
                        <Input id="fullName" value={user.nome} className="mt-1" disabled />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={user.email} className="mt-1" disabled />
                    </div>

                    <div>
                      <Label htmlFor="cpf">CPF</Label>
                      <Input id="cpf" value={user.cpf} className="mt-1" disabled />
                    </div>
                    
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Edição de Perfil</AlertTitle>
                      <AlertDescription>
                        A funcionalidade para editar os dados do perfil será implementada em breve.
                      </AlertDescription>
                    </Alert>
                  </div>
                </>
              ) : (
                 <p className="text-red-500">Não foi possível carregar os dados do usuário.</p>
              )}
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
                    <Switch defaultChecked={notification.enabled} />
                  </div>
                ))}
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