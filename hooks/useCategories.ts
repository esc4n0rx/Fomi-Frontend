import { useState, useEffect } from 'react'
import { categoriesApi } from '@/lib/api'
import { Category, CreateCategoryRequest, UpdateCategoryRequest, CategoryImageSettings } from '@/types/auth'
import { useAuth } from './useAuth'
import { useToast } from './use-toast'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [imageSettings, setImageSettings] = useState<CategoryImageSettings | null>(null)
  const [isLoadingImageSettings, setIsLoadingImageSettings] = useState(true)
  const { store } = useAuth()
  const { toast } = useToast()

  const fetchCategories = async () => {
    if (!store?.id) return

    try {
      setIsLoading(true)
      const response = await categoriesApi.getCategories(store.id)
      
      if (response.success) {
        setCategories(response.data.categories || [])
      } else {
        console.error('Erro na resposta da API:', response)
        setCategories([])
        toast({
          title: "Erro",
          description: "Erro ao carregar categorias",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      console.error('Erro ao buscar categorias:', error)
      setCategories([])
      toast({
        title: "Erro",
        description: error.message || "Erro ao carregar categorias",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchImageSettings = async () => {
    if (!store?.id) return

    try {
      setIsLoadingImageSettings(true)
      const response = await categoriesApi.getImageSettings(store.id)
      
      if (response.success) {
        setImageSettings(response.data)
      }
    } catch (error: any) {
      console.error('Erro ao buscar configurações de imagem:', error)
      // Se a API retornar erro, usar configurações padrão baseadas no plano do usuário
      // Isso será tratado pelo componente CategoryImageUpload usando o AuthContext
      setImageSettings(null)
    } finally {
      setIsLoadingImageSettings(false)
    }
  }

  const createCategory = async (data: CreateCategoryRequest): Promise<boolean> => {
    if (!store?.id) return false

    try {
      const response = await categoriesApi.createCategory(store.id, data)
      
      if (response.success) {
        setCategories(prev => [...prev, response.data.category])
        toast({
          title: "Sucesso",
          description: response.message || "Categoria criada com sucesso",
        })
        return true
      } else {
        toast({
          title: "Erro",
          description: response.message || "Erro ao criar categoria",
          variant: "destructive",
        })
        return false
      }
    } catch (error: any) {
      console.error('Erro ao criar categoria:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar categoria",
        variant: "destructive",
      })
      return false
    }
  }

  const updateCategory = async (categoryId: string, data: UpdateCategoryRequest): Promise<boolean> => {
    if (!store?.id) return false

    try {
      const response = await categoriesApi.updateCategory(store.id, categoryId, data)
      
      if (response.success) {
        setCategories(prev => prev.map(cat => 
          cat.id === categoryId ? response.data.category : cat
        ))
        toast({
          title: "Sucesso",
          description: response.message || "Categoria atualizada com sucesso",
        })
        return true
      } else {
        toast({
          title: "Erro",
          description: response.message || "Erro ao atualizar categoria",
          variant: "destructive",
        })
        return false
      }
    } catch (error: any) {
      console.error('Erro ao atualizar categoria:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar categoria",
        variant: "destructive",
      })
      return false
    }
  }

  const deleteCategory = async (categoryId: string): Promise<boolean> => {
    if (!store?.id) return false

    try {
      const response = await categoriesApi.deleteCategory(store.id, categoryId)
      
      if (response.success) {
        setCategories(prev => prev.filter(cat => cat.id !== categoryId))
        toast({
          title: "Sucesso",
          description: response.message || "Categoria excluída com sucesso",
        })
        return true
      } else {
        toast({
          title: "Erro",
          description: response.message || "Erro ao excluir categoria",
          variant: "destructive",
        })
        return false
      }
    } catch (error: any) {
      console.error('Erro ao excluir categoria:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao excluir categoria",
        variant: "destructive",
      })
      return false
    }
  }

  const uploadImage = async (categoryId: string, imageFile: File): Promise<boolean> => {
    if (!store?.id) return false

    try {
      const response = await categoriesApi.uploadImage(store.id, categoryId, imageFile)
      
      if (response.success) {
        setCategories(prev => prev.map(cat => 
          cat.id === categoryId ? response.data.category : cat
        ))
        toast({
          title: "Sucesso",
          description: response.message || "Imagem da categoria atualizada com sucesso",
        })
        return true
      } else {
        toast({
          title: "Erro",
          description: response.message || "Erro ao fazer upload da imagem",
          variant: "destructive",
        })
        return false
      }
    } catch (error: any) {
      console.error('Erro ao fazer upload da imagem:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao fazer upload da imagem",
        variant: "destructive",
      })
      return false
    }
  }

  const removeImage = async (categoryId: string): Promise<boolean> => {
    if (!store?.id) return false

    try {
      const response = await categoriesApi.removeImage(store.id, categoryId)
      
      if (response.success) {
        setCategories(prev => prev.map(cat => 
          cat.id === categoryId ? response.data.category : cat
        ))
        toast({
          title: "Sucesso",
          description: response.message || "Imagem da categoria removida com sucesso",
        })
        return true
      } else {
        toast({
          title: "Erro",
          description: response.message || "Erro ao remover imagem",
          variant: "destructive",
        })
        return false
      }
    } catch (error: any) {
      console.error('Erro ao remover imagem:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao remover imagem",
        variant: "destructive",
      })
      return false
    }
  }

  const reorderCategories = async (categories: Array<{ id: string; ordem: number }>): Promise<boolean> => {
    if (!store?.id) return false

    try {
      const response = await categoriesApi.reorderCategories(store.id, categories)
      
      if (response.success) {
        setCategories(response.data.categories)
        toast({
          title: "Sucesso",
          description: response.message || "Categorias reordenadas com sucesso",
        })
        return true
      } else {
        toast({
          title: "Erro",
          description: response.message || "Erro ao reordenar categorias",
          variant: "destructive",
        })
        return false
      }
    } catch (error: any) {
      console.error('Erro ao reordenar categorias:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao reordenar categorias",
        variant: "destructive",
      })
      return false
    }
  }

  useEffect(() => {
    if (store?.id) {
      fetchCategories()
      fetchImageSettings()
    } else {
      // Se não há store.id, parar os loadings
      setIsLoading(false)
      setIsLoadingImageSettings(false)
    }
  }, [store?.id])

  return {
    categories,
    isLoading,
    imageSettings,
    isLoadingImageSettings,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    uploadImage,
    removeImage,
    reorderCategories,
  }
} 