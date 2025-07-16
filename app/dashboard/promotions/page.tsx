"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Filter, Calendar, Tag, DollarSign, Gift, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarMenu } from "@/components/sidebar-menu"
import { PromotionModal } from "@/components/promotion-modal"
import { useAuth } from "@/hooks/useAuth"
import { usePromotions } from "@/hooks/usePromotions"
import { Promotion, CreatePromotionRequest } from "@/types/promotions"

export default function PromotionsPage() {
  const { store } = useAuth()
  const { promotions, isLoading, createPromotion, updatePromotion, deletePromotion } = usePromotions()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterActive, setFilterActive] = useState<boolean | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null)

  const filteredPromotions = promotions?.filter((promotion: Promotion) => {
    const matchesSearch = promotion.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promotion.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterActive === null || promotion.ativo === filterActive
    return matchesSearch && matchesFilter
  }) || []

  const handleCreatePromotion = () => {
    setEditingPromotion(null)
    setIsModalOpen(true)
  }

  const handleEditPromotion = (promotion: Promotion) => {
    setEditingPromotion(promotion)
    setIsModalOpen(true)
  }

  const handleDeletePromotion = async (promotionId: string) => {
    if (confirm("Tem certeza que deseja excluir esta promoção?")) {
      await deletePromotion(promotionId)
    }
  }

  const getPromotionTypeIcon = (tipo: string) => {
    switch (tipo) {
      case 'desconto_percentual':
        return <Tag className="w-4 h-4" />
      case 'desconto_fixo':
        return <DollarSign className="w-4 h-4" />
      case 'produto_gratis':
        return <Gift className="w-4 h-4" />
      default:
        return <Tag className="w-4 h-4" />
    }
  }

  const getPromotionTypeLabel = (tipo: string) => {
    switch (tipo) {
      case 'desconto_percentual':
        return "Desconto %"
      case 'desconto_fixo':
        return "Desconto Fixo"
      case 'produto_gratis':
        return "Produto Grátis"
      default:
        return tipo
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const isPromotionActive = (promotion: Promotion) => {
    const now = new Date()
    const startDate = new Date(promotion.data_inicio)
    const endDate = new Date(promotion.data_fim)
    return promotion.ativo && now >= startDate && now <= endDate
  }

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <SidebarMenu />
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <p className="text-gray-600 font-medium">Carregando promoções...</p>
          </motion.div>
        </div>
      </div>
    )
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
              <h1 className="text-2xl font-bold text-gray-900">Promoções</h1>
              <p className="text-gray-600">Gerencie as promoções da sua loja {store?.nome}</p>
            </div>

            <Button onClick={handleCreatePromotion} className="bg-primary hover:bg-secondary">
              <Plus className="w-4 h-4 mr-2" />
              Nova Promoção
            </Button>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Filters */}
          <motion.div
            className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Buscar promoções..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant={filterActive === null ? "default" : "outline"}
                  onClick={() => setFilterActive(null)}
                  size="sm"
                >
                  Todas
                </Button>
                <Button
                  variant={filterActive === true ? "default" : "outline"}
                  onClick={() => setFilterActive(true)}
                  size="sm"
                >
                  Ativas
                </Button>
                <Button
                  variant={filterActive === false ? "default" : "outline"}
                  onClick={() => setFilterActive(false)}
                  size="sm"
                >
                  Inativas
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Promotions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPromotions.map((promotion: Promotion, index: number) => (
              <motion.div
                key={promotion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getPromotionTypeIcon(promotion.tipo)}
                        <Badge variant="outline" className="text-xs">
                          {getPromotionTypeLabel(promotion.tipo)}
                        </Badge>
                      </div>
                      <Badge 
                        variant={isPromotionActive(promotion) ? "default" : "secondary"}
                        className={isPromotionActive(promotion) ? "bg-green-100 text-green-800" : ""}
                      >
                        {isPromotionActive(promotion) ? "Ativa" : "Inativa"}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{promotion.nome}</CardTitle>
                    {promotion.descricao && (
                      <p className="text-sm text-gray-600">{promotion.descricao}</p>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Valor:</span>
                      <span className="font-semibold">
                        {promotion.tipo === 'desconto_percentual' 
                          ? `${promotion.valor}%` 
                          : formatCurrency(promotion.valor)
                        }
                      </span>
                    </div>

                    {promotion.valor_minimo_pedido && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Pedido mínimo:</span>
                        <span className="font-semibold">{formatCurrency(promotion.valor_minimo_pedido)}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(promotion.data_inicio)} - {formatDate(promotion.data_fim)}</span>
                    </div>

                    <div className="flex gap-2 pt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditPromotion(promotion)}
                        className="flex-1"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePromotion(promotion.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Excluir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPromotions.length === 0 && !isLoading && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchTerm || filterActive !== null ? "Nenhuma promoção encontrada" : "Nenhuma promoção criada"}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterActive !== null 
                  ? "Tente ajustar os filtros ou termos de busca"
                  : "Crie sua primeira promoção para começar a atrair mais clientes"
                }
              </p>
              {!searchTerm && filterActive === null && (
                <Button onClick={handleCreatePromotion} className="bg-primary hover:bg-secondary">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeira Promoção
                </Button>
              )}
            </motion.div>
          )}
        </main>
      </div>

      {/* Promotion Modal */}
      <PromotionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        promotion={editingPromotion}
        onSubmit={async (data: CreatePromotionRequest) => {
          if (editingPromotion) {
            await updatePromotion(editingPromotion.id, data)
          } else {
            await createPromotion(data)
          }
          setIsModalOpen(false)
        }}
      />
    </div>
  )
} 