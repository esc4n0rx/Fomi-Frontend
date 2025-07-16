"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Coupon, CreateCouponRequest, UpdateCouponRequest } from "@/types/coupons"
import { toast } from "sonner"

interface CouponModalProps {
  isOpen: boolean
  onClose: () => void
  coupon?: Coupon | null
  onSubmit: (data: CreateCouponRequest | UpdateCouponRequest) => Promise<void>
  mode: 'create' | 'edit'
}

export function CouponModal({ isOpen, onClose, coupon, onSubmit, mode }: CouponModalProps) {
  const [formData, setFormData] = useState({
    codigo: '',
    nome: '',
    descricao: '',
    tipo: 'desconto_percentual' as 'desconto_percentual' | 'desconto_fixo' | 'frete_gratis',
    valor: '',
    valor_minimo_pedido: '',
    limite_uso: '',
    data_inicio: '',
    data_fim: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (coupon && mode === 'edit') {
      setFormData({
        codigo: coupon.codigo,
        nome: coupon.nome,
        descricao: coupon.descricao || '',
        tipo: coupon.tipo,
        valor: coupon.valor.toString(),
        valor_minimo_pedido: coupon.valor_minimo_pedido?.toString() || '',
        limite_uso: coupon.limite_uso?.toString() || '',
        data_inicio: coupon.data_inicio.split('T')[0],
        data_fim: coupon.data_fim.split('T')[0],
      })
    } else {
      setFormData({
        codigo: '',
        nome: '',
        descricao: '',
        tipo: 'desconto_percentual',
        valor: '',
        valor_minimo_pedido: '',
        limite_uso: '',
        data_inicio: '',
        data_fim: '',
      })
    }
  }, [coupon, mode, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const submitData = {
        ...formData,
        valor: parseFloat(formData.valor),
        valor_minimo_pedido: formData.valor_minimo_pedido ? parseFloat(formData.valor_minimo_pedido) : undefined,
        limite_uso: formData.limite_uso ? parseInt(formData.limite_uso) : undefined,
      }

      await onSubmit(submitData)
      toast.success(mode === 'create' ? 'Cupom criado com sucesso!' : 'Cupom atualizado com sucesso!')
      onClose()
    } catch (error: any) {
      toast.error(error.message || 'Erro ao salvar cupom')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const getTipoOptions = () => [
    { value: 'desconto_percentual', label: 'Desconto Percentual (%)' },
    { value: 'desconto_fixo', label: 'Desconto Fixo (R$)' },
    { value: 'frete_gratis', label: 'Frete Grátis' },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Criar Novo Cupom' : 'Editar Cupom'}
          </DialogTitle>
          {mode === 'create' && (
            <p className="text-sm text-gray-600">
              💡 Dica: Novos cupons são ativos por padrão e ficarão disponíveis imediatamente após a criação.
            </p>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="codigo">Código do Cupom *</Label>
              <Input
                id="codigo"
                value={formData.codigo}
                onChange={(e) => handleInputChange('codigo', e.target.value.toUpperCase())}
                placeholder="EX: BEMVINDO10"
                required
                disabled={mode === 'edit'}
                maxLength={50}
              />
              <p className="text-xs text-gray-500">
                Apenas letras maiúsculas e números
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Cupom *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                placeholder="Ex: Desconto de Boas-vindas"
                required
                maxLength={255}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleInputChange('descricao', e.target.value)}
              placeholder="Descrição detalhada do cupom..."
              maxLength={1000}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Desconto *</Label>
              <Select
                value={formData.tipo}
                onValueChange={(value) => handleInputChange('tipo', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getTipoOptions().map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="valor">Valor *</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                min="0.01"
                max="9999.99"
                value={formData.valor}
                onChange={(e) => handleInputChange('valor', e.target.value)}
                placeholder={formData.tipo === 'desconto_percentual' ? '10' : '5.00'}
                required
              />
              <p className="text-xs text-gray-500">
                {formData.tipo === 'desconto_percentual' ? 'Percentual (0-100)' : 'Valor em reais'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valor_minimo_pedido">Valor Mínimo do Pedido</Label>
              <Input
                id="valor_minimo_pedido"
                type="number"
                step="0.01"
                min="0"
                value={formData.valor_minimo_pedido}
                onChange={(e) => handleInputChange('valor_minimo_pedido', e.target.value)}
                placeholder="0.00"
              />
              <p className="text-xs text-gray-500">Deixe em branco para sem mínimo</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="limite_uso">Limite de Usos</Label>
              <Input
                id="limite_uso"
                type="number"
                min="1"
                value={formData.limite_uso}
                onChange={(e) => handleInputChange('limite_uso', e.target.value)}
                placeholder="100"
              />
              <p className="text-xs text-gray-500">Deixe em branco para sem limite</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="data_inicio">Data de Início *</Label>
              <Input
                id="data_inicio"
                type="date"
                value={formData.data_inicio}
                onChange={(e) => handleInputChange('data_inicio', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="data_fim">Data de Fim *</Label>
              <Input
                id="data_fim"
                type="date"
                value={formData.data_fim}
                onChange={(e) => handleInputChange('data_fim', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Salvando...
                </>
              ) : (
                mode === 'create' ? 'Criar Cupom' : 'Salvar Alterações'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 