"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Tag, DollarSign, Gift, Calendar, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Promotion, CreatePromotionRequest } from "@/types/promotions"
import { useProducts } from "@/hooks/useProducts"

interface PromotionModalProps {
  isOpen: boolean
  onClose: () => void
  promotion?: Promotion | null
  onSubmit: (data: CreatePromotionRequest) => Promise<void>
}

export function PromotionModal({ isOpen, onClose, promotion, onSubmit }: PromotionModalProps) {
  const { products } = useProducts()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<CreatePromotionRequest>({
    nome: "",
    descricao: "",
    tipo: "desconto_percentual",
    valor: 0,
    produto_gratis_id: "",
    valor_minimo_pedido: 0,
    data_inicio: "",
    data_fim: "",
  })

  useEffect(() => {
    if (promotion) {
      setFormData({
        nome: promotion.nome,
        descricao: promotion.descricao || "",
        tipo: promotion.tipo,
        valor: promotion.valor,
        produto_gratis_id: promotion.produto_gratis?.id || "",
        valor_minimo_pedido: promotion.valor_minimo_pedido || 0,
        data_inicio: promotion.data_inicio.split('T')[0],
        data_fim: promotion.data_fim.split('T')[0],
      })
    } else {
      setFormData({
        nome: "",
        descricao: "",
        tipo: "desconto_percentual",
        valor: 0,
        produto_gratis_id: "",
        valor_minimo_pedido: 0,
        data_inicio: "",
        data_fim: "",
      })
    }
  }, [promotion])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await onSubmit(formData)
      onClose()
    } catch (error) {
      console.error('Erro ao salvar promoção:', error)
    } finally {
      setIsLoading(false)
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
        return "Desconto Percentual"
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {getPromotionTypeIcon(formData.tipo)}
                <h2 className="text-xl font-semibold text-gray-900">
                  {promotion ? "Editar Promoção" : "Nova Promoção"}
                </h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Promoção *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Ex: Desconto de 20%"
                  required
                />
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Descreva os detalhes da promoção..."
                  rows={3}
                />
              </div>

              {/* Tipo de Promoção */}
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Promoção *</Label>
                <Select
                  value={formData.tipo}
                  onValueChange={(value: any) => setFormData({ ...formData, tipo: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desconto_percentual">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Desconto Percentual
                      </div>
                    </SelectItem>
                    <SelectItem value="desconto_fixo">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Desconto Fixo
                      </div>
                    </SelectItem>
                    <SelectItem value="produto_gratis">
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4" />
                        Produto Grátis
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Valor */}
              <div className="space-y-2">
                <Label htmlFor="valor">
                  {formData.tipo === 'desconto_percentual' ? 'Percentual de Desconto (%)' :
                   formData.tipo === 'desconto_fixo' ? 'Valor do Desconto (R$)' :
                   'Valor'}
                  *
                </Label>
                <Input
                  id="valor"
                  type="number"
                  step={formData.tipo === 'desconto_percentual' ? '1' : '0.01'}
                  min="0"
                  max={formData.tipo === 'desconto_percentual' ? '100' : '9999.99'}
                  value={formData.valor}
                  onChange={(e) => setFormData({ ...formData, valor: parseFloat(e.target.value) || 0 })}
                  placeholder={formData.tipo === 'desconto_percentual' ? '20' : '10.00'}
                  required
                />
              </div>

              {/* Produto Grátis */}
              {formData.tipo === 'produto_gratis' && (
                <div className="space-y-2">
                  <Label htmlFor="produto_gratis_id">Produto Grátis *</Label>
                  <Select
                    value={formData.produto_gratis_id}
                    onValueChange={(value) => setFormData({ ...formData, produto_gratis_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um produto" />
                    </SelectTrigger>
                    <SelectContent>
                      {products?.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            {product.nome} - {formatCurrency(product.preco)}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Valor Mínimo do Pedido */}
              <div className="space-y-2">
                <Label htmlFor="valor_minimo_pedido">Valor Mínimo do Pedido (R$)</Label>
                <Input
                  id="valor_minimo_pedido"
                  type="number"
                  step="0.01"
                  min="0"
                  max="9999.99"
                  value={formData.valor_minimo_pedido}
                  onChange={(e) => setFormData({ ...formData, valor_minimo_pedido: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00 (opcional)"
                />
              </div>

              {/* Datas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="data_inicio">Data de Início *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="data_inicio"
                      type="date"
                      value={formData.data_inicio}
                      onChange={(e) => setFormData({ ...formData, data_inicio: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data_fim">Data de Fim *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="data_fim"
                      type="date"
                      value={formData.data_fim}
                      onChange={(e) => setFormData({ ...formData, data_fim: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <h4 className="font-medium text-gray-900">Preview da Promoção</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Nome:</strong> {formData.nome || "Nome da promoção"}</p>
                  <p><strong>Tipo:</strong> {getPromotionTypeLabel(formData.tipo)}</p>
                  <p><strong>Valor:</strong> {
                    formData.tipo === 'desconto_percentual' 
                      ? `${formData.valor}%` 
                      : formatCurrency(formData.valor)
                  }</p>
                  {formData.valor_minimo_pedido > 0 && (
                    <p><strong>Pedido mínimo:</strong> {formatCurrency(formData.valor_minimo_pedido)}</p>
                  )}
                  {formData.data_inicio && formData.data_fim && (
                    <p><strong>Período:</strong> {formData.data_inicio} até {formData.data_fim}</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-secondary"
                  disabled={isLoading}
                >
                  {isLoading ? "Salvando..." : promotion ? "Atualizar" : "Criar"} Promoção
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 