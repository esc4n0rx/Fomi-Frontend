"use client"

import { SidebarMenu } from "@/components/sidebar-menu"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Store, Clock, MapPin, Phone, Mail, Globe, Camera } from "lucide-react"
import { MobileStorePreview } from "@/components/mobile-store-preview"

export default function StorePage() {
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
              <h1 className="text-2xl font-bold text-gray-900">Configurações da Loja</h1>
              <p className="text-gray-600">Personalize as informações da sua loja</p>
            </div>

            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800">Loja Online</Badge>
              <Button className="bg-primary hover:bg-primary/90">Salvar Alterações</Button>
            </div>
          </div>
        </motion.header>

        <main className="flex-1 overflow-auto p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Store Configuration */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informações Básicas */}
              <motion.div
                className="bg-white rounded-xl border border-gray-200 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center space-x-2 mb-6">
                  <Store size={24} className="text-primary" />
                  <h2 className="text-xl font-semibold">Informações Básicas</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="storeName">Nome da Loja</Label>
                    <Input id="storeName" defaultValue="Lanchonete do João" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="storeDescription">Descrição</Label>
                    <Textarea
                      id="storeDescription"
                      defaultValue="Os melhores lanches da região com ingredientes frescos e sabor incomparável!"
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="storeCategory">Categoria</Label>
                    <Input id="storeCategory" defaultValue="Lanchonete" className="mt-1" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="minOrder">Pedido Mínimo</Label>
                      <Input id="minOrder" defaultValue="R$ 15,00" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="deliveryFee">Taxa de Entrega</Label>
                      <Input id="deliveryFee" defaultValue="R$ 5,00" className="mt-1" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Logo e Imagens */}
              <motion.div
                className="bg-white rounded-xl border border-gray-200 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center space-x-2 mb-6">
                  <Camera size={24} className="text-primary" />
                  <h2 className="text-xl font-semibold">Logo e Imagens</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label>Logo da Loja</Label>
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">J</span>
                      </div>
                      <Button variant="outline">Alterar Logo</Button>
                    </div>
                  </div>

                  <div>
                    <Label>Banner da Loja</Label>
                    <div className="mt-2">
                      <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                        <div className="text-center">
                          <Camera size={32} className="text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Clique para adicionar banner</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contato e Localização */}
              <motion.div
                className="bg-white rounded-xl border border-gray-200 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-center space-x-2 mb-6">
                  <MapPin size={24} className="text-primary" />
                  <h2 className="text-xl font-semibold">Contato e Localização</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Endereço Completo</Label>
                    <Input id="address" defaultValue="Rua das Flores, 123 - Centro" className="mt-1" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <div className="relative mt-1">
                        <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input id="phone" defaultValue="(11) 99999-9999" className="pl-10" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <div className="relative mt-1">
                        <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input id="email" defaultValue="contato@loja.com" className="pl-10" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website">Website (opcional)</Label>
                    <div className="relative mt-1">
                      <Globe size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input id="website" placeholder="https://meusite.com" className="pl-10" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Horário de Funcionamento */}
              <motion.div
                className="bg-white rounded-xl border border-gray-200 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center space-x-2 mb-6">
                  <Clock size={24} className="text-primary" />
                  <h2 className="text-xl font-semibold">Horário de Funcionamento</h2>
                </div>

                <div className="space-y-4">
                  {[
                    { day: "Segunda-feira", open: "08:00", close: "22:00", active: true },
                    { day: "Terça-feira", open: "08:00", close: "22:00", active: true },
                    { day: "Quarta-feira", open: "08:00", close: "22:00", active: true },
                    { day: "Quinta-feira", open: "08:00", close: "22:00", active: true },
                    { day: "Sexta-feira", open: "08:00", close: "23:00", active: true },
                    { day: "Sábado", open: "09:00", close: "23:00", active: true },
                    { day: "Domingo", open: "10:00", close: "21:00", active: false },
                  ].map((schedule) => (
                    <div key={schedule.day} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Switch checked={schedule.active} />
                        <span className="font-medium w-24">{schedule.day}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input value={schedule.open} className="w-20 text-center" disabled={!schedule.active} />
                        <span>às</span>
                        <Input value={schedule.close} className="w-20 text-center" disabled={!schedule.active} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Mobile Preview */}
            <div className="lg:col-span-1">
              <motion.div
                className="sticky top-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Sua loja ficará assim</h2>
                  <p className="text-gray-600">Preview em tempo real no mobile</p>
                </div>
                <div className="flex justify-center">
                  <MobileStorePreview />
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
