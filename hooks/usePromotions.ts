import { useState, useEffect } from 'react'
import { Promotion, CreatePromotionRequest, UpdatePromotionRequest, PromotionsResponse, PromotionResponse } from '@/types/promotions'
import api from '@/lib/api'
import { useAuth } from './useAuth'

export function usePromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { store } = useAuth()

  const fetchPromotions = async () => {
    if (!store?.id) return

    try {
      setIsLoading(true)
      setError(null)
      
      const response = await api.get<PromotionsResponse>(`/promotions/${store.id}`)
      
      if (response.data.success) {
        setPromotions(response.data.data.promotions)
      } else {
        setError('Erro ao carregar promoções')
      }
    } catch (err: any) {
      console.error('Erro ao buscar promoções:', err)
      setError(err.response?.data?.message || 'Erro ao carregar promoções')
    } finally {
      setIsLoading(false)
    }
  }

  const createPromotion = async (data: CreatePromotionRequest): Promise<boolean> => {
    if (!store?.id) return false

    try {
      setError(null)
      
      const response = await api.post<PromotionResponse>(`/promotions/${store.id}`, data)
      
      if (response.data.success) {
        // Recarregar a lista de promoções
        await fetchPromotions()
        return true
      } else {
        setError(response.data.message || 'Erro ao criar promoção')
        return false
      }
    } catch (err: any) {
      console.error('Erro ao criar promoção:', err)
      setError(err.response?.data?.message || 'Erro ao criar promoção')
      return false
    }
  }

  const updatePromotion = async (promotionId: string, data: UpdatePromotionRequest): Promise<boolean> => {
    if (!store?.id) return false

    try {
      setError(null)
      
      const response = await api.put<PromotionResponse>(`/promotions/${store.id}/${promotionId}`, data)
      
      if (response.data.success) {
        // Recarregar a lista de promoções
        await fetchPromotions()
        return true
      } else {
        setError(response.data.message || 'Erro ao atualizar promoção')
        return false
      }
    } catch (err: any) {
      console.error('Erro ao atualizar promoção:', err)
      setError(err.response?.data?.message || 'Erro ao atualizar promoção')
      return false
    }
  }

  const deletePromotion = async (promotionId: string): Promise<boolean> => {
    if (!store?.id) return false

    try {
      setError(null)
      
      const response = await api.delete(`/promotions/${store.id}/${promotionId}`)
      
      if (response.status === 200 || response.status === 204) {
        // Recarregar a lista de promoções
        await fetchPromotions()
        return true
      } else {
        setError('Erro ao excluir promoção')
        return false
      }
    } catch (err: any) {
      console.error('Erro ao excluir promoção:', err)
      setError(err.response?.data?.message || 'Erro ao excluir promoção')
      return false
    }
  }

  const togglePromotionStatus = async (promotionId: string, ativo: boolean): Promise<boolean> => {
    return await updatePromotion(promotionId, { ativo })
  }

  useEffect(() => {
    if (store?.id) {
      fetchPromotions()
    }
  }, [store?.id])

  return {
    promotions,
    isLoading,
    error,
    fetchPromotions,
    createPromotion,
    updatePromotion,
    deletePromotion,
    togglePromotionStatus,
  }
} 