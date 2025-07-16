"use client"

import { useState } from "react"
import { SidebarMenu } from "@/components/sidebar-menu"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Copy, Percent, Calendar, Loader2, AlertCircle } from "lucide-react"
import { useCoupons } from "@/hooks/useCoupons"
import { Coupon, CreateCouponRequest, UpdateCouponRequest } from "@/types/coupons"
import { toast, Toaster } from "sonner"
import { CouponModal } from "@/components/coupon-modal"

export default function CouponsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const { coupons, isLoading, error, deleteCoupon, toggleCouponStatus, createCoupon, updateCoupon } = useCoupons()

  const handleDeleteCoupon = async (couponId: string) => {
    if (!confirm("Tem certeza que deseja excluir este cupom? Esta ação não pode ser desfeita.")) {
      return
    }
    
    try {
      await deleteCoupon(couponId)
      toast.success("Cupom excluído com sucesso!")
    } catch (error: any) {
      toast.error(error.message || "Erro ao excluir cupom")
    }
  }

  const handleToggleStatus = async (couponId: string, currentStatus: boolean) => {
    try {
      await toggleCouponStatus(couponId, !currentStatus)
      toast.success(`Cupom ${!currentStatus ? 'ativado' : 'desativado'} com sucesso!`)
    } catch (error: any) {
      toast.error(error.message || "Erro ao alterar status do cupom")
    }
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast.success("Código copiado para a área de transferência!")
  }

  const handleCreateCoupon = () => {
    setModalMode('create')
    setEditingCoupon(null)
    setIsModalOpen(true)
  }

  const handleEditCoupon = (coupon: Coupon) => {
    setModalMode('edit')
    setEditingCoupon(coupon)
    setIsModalOpen(true)
  }

  const handleModalSubmit = async (data: CreateCouponRequest | UpdateCouponRequest) => {
    if (modalMode === 'create') {
      await createCoupon(data as CreateCouponRequest)
    } else {
      if (editingCoupon) {
        await updateCoupon(editingCoupon.id, data as UpdateCouponRequest)
      }
    }
  }

  const filteredCoupons = coupons.filter(coupon =>
    coupon.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCouponTypeLabel = (tipo: string) => {
    switch (tipo) {
      case 'desconto_percentual':
        return 'Desconto %'
      case 'desconto_fixo':
        return 'Desconto Fixo'
      case 'frete_gratis':
        return 'Frete Grátis'
      default:
        return tipo
    }
  }

  const getCouponValueDisplay = (coupon: Coupon) => {
    switch (coupon.tipo) {
      case 'desconto_percentual':
        return `${coupon.valor}%`
      case 'desconto_fixo':
        return `R$ ${coupon.valor.toFixed(2)}`
      case 'frete_gratis':
        return 'Frete Grátis'
      default:
        return coupon.valor
    }
  }

  const isExpired = (dataFim: string) => {
    return new Date(dataFim) < new Date()
  }

  const getCouponStatus = (coupon: Coupon) => {
    const expired = isExpired(coupon.data_fim)
    const isActive = coupon.ativo && !expired
    
    if (expired) {
      return { label: "Expirado", color: "bg-red-100 text-red-800" }
    }
    
    if (isActive) {
      return { label: "Ativo", color: "bg-green-100 text-green-800" }
    }
    
    return { label: "Inativo", color: "bg-gray-100 text-gray-800" }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <SidebarMenu />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-gray-600">Carregando cupons...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-50">
        <SidebarMenu />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-500" />
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
          </div>
        </div>
      </div>
    )
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
              <h1 className="text-2xl font-bold text-gray-900">Cupons</h1>
              <p className="text-gray-600">Gerencie cupons de desconto e promoções</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  placeholder="Buscar cupons..." 
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90" onClick={handleCreateCoupon}>
                <Plus size={20} className="mr-2" />
                Novo Cupom
              </Button>
            </div>
          </div>
        </motion.header>

        <main className="flex-1 overflow-auto p-6">
          <motion.div
            className="bg-white rounded-xl border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Todos os Cupons</h2>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredCoupons.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Percent className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {searchTerm ? "Nenhum cupom encontrado" : "Nenhum cupom criado"}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm 
                      ? "Tente ajustar os termos de busca" 
                      : "Crie seu primeiro cupom para começar a oferecer descontos aos clientes. Novos cupons são ativos por padrão!"
                    }
                  </p>
                  {!searchTerm && (
                    <Button className="bg-primary hover:bg-primary/90" onClick={handleCreateCoupon}>
                      <Plus size={20} className="mr-2" />
                      Criar Primeiro Cupom
                    </Button>
                  )}
                </div>
              ) : (
                filteredCoupons.map((coupon, index) => (
                  <motion.div
                    key={coupon.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex items-center space-x-2">
                                                      <div className={`p-2 rounded-lg ${
                            getCouponStatus(coupon).label === "Ativo" 
                              ? "bg-green-100" 
                              : getCouponStatus(coupon).label === "Expirado"
                                ? "bg-red-100"
                                : "bg-primary/10"
                          }`}>
                            <Percent size={20} className={
                              getCouponStatus(coupon).label === "Ativo" 
                                ? "text-green-600" 
                                : getCouponStatus(coupon).label === "Expirado"
                                  ? "text-red-600"
                                  : "text-primary"
                            } />
                          </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                                <span>{coupon.codigo}</span>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="p-1 h-auto"
                                  onClick={() => handleCopyCode(coupon.codigo)}
                                >
                                  <Copy size={14} />
                                </Button>
                              </h3>
                              <p className="text-sm text-gray-600">{coupon.descricao || coupon.nome}</p>
                            <p className="text-xs text-gray-500">
                              Criado em {new Date(coupon.created_at).toLocaleDateString("pt-BR")}
                            </p>
                            </div>
                          </div>
                                                  <Badge className={getCouponStatus(coupon).color}>
                          {getCouponStatus(coupon).label}
                        </Badge>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">{getCouponTypeLabel(coupon.tipo)}</p>
                            <p className="font-medium">
                              {getCouponValueDisplay(coupon)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Pedido mínimo</p>
                            <p className="font-medium">
                              {coupon.valor_minimo_pedido ? `R$ ${coupon.valor_minimo_pedido.toFixed(2)}` : "Sem mínimo"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Usos</p>
                            <p className="font-medium">
                              {coupon.total_usado}/{coupon.limite_uso || "∞"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 flex items-center space-x-1">
                              <Calendar size={14} />
                              <span>Expira em</span>
                            </p>
                            <p className="font-medium">{new Date(coupon.data_fim).toLocaleDateString("pt-BR")}</p>
                            {getCouponStatus(coupon).label === "Ativo" && (
                              <p className="text-xs text-green-600 font-medium">✓ Pronto para uso</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditCoupon(coupon)}
                        >
                          <Edit size={16} className="mr-2" />
                          Editar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleToggleStatus(coupon.id, coupon.ativo)}
                          disabled={isExpired(coupon.data_fim)}
                          title={isExpired(coupon.data_fim) ? "Cupom expirado não pode ser ativado" : ""}
                        >
                          {coupon.ativo ? "Desativar" : "Ativar"}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700 bg-transparent"
                          onClick={() => handleDeleteCoupon(coupon.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </main>
      </div>
      <Toaster />
      
      <CouponModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        coupon={editingCoupon}
        onSubmit={handleModalSubmit}
        mode={modalMode}
      />
    </div>
  )
}
