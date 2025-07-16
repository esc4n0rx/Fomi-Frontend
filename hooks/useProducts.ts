import { useState, useEffect } from 'react'
import { productsApi } from '@/lib/api'
import { Product, CreateProductRequest, UpdateProductRequest, ProductImageSettings, ProductLimits } from '@/types/auth'
import { useAuth } from './useAuth'
import { useToast } from './use-toast'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [imageSettings, setImageSettings] = useState<ProductImageSettings | null>(null)
  const [isLoadingImageSettings, setIsLoadingImageSettings] = useState(true)
  const [productLimits, setProductLimits] = useState<ProductLimits | null>(null)
  const { store, canUploadImages } = useAuth()
  const { toast } = useToast()

  const fetchProducts = async (filters?: {
    category_id?: string;
    disponivel?: boolean;
    destaque?: boolean;
  }) => {
    if (!store?.id) return

    try {
      setIsLoading(true)
      const response = await productsApi.getProducts(store.id, filters)
      
      if (response.success) {
        setProducts(response.data.products || [])
        
        // Calcular limites baseados no plano atual
        const currentCount = response.data.products?.length || 0
        const limits = calculateProductLimits(currentCount)
        setProductLimits(limits)
      } else {
        console.error('Erro na resposta da API:', response)
        setProducts([])
        toast({
          title: "Erro",
          description: "Erro ao carregar produtos",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      console.error('Erro ao buscar produtos:', error)
      setProducts([])
      toast({
        title: "Erro",
        description: error.message || "Erro ao carregar produtos",
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
      const response = await productsApi.getImageSettings(store.id)
      
      if (response.success) {
        setImageSettings(response.data)
      }
    } catch (error: any) {
      console.error('Erro ao buscar configurações de imagem:', error)
      // Se a API retornar erro, usar configurações padrão baseadas no plano do usuário
      setImageSettings(null)
    } finally {
      setIsLoadingImageSettings(false)
    }
  }

  const calculateProductLimits = (currentCount: number): ProductLimits => {
    // Determinar plano baseado no AuthContext
    const plan = canUploadImages ? 'fomi_duplo' : 'fomi_simples'
    
    const limits = {
      fomi_simples: { max: 10, canUpload: false, maxExtra: 0 },
      fomi_duplo: { max: 50, canUpload: true, maxExtra: 5 },
      fomi_supremo: { max: -1, canUpload: true, maxExtra: 5 }
    }
    
    const planLimits = limits[plan as keyof typeof limits] || limits.fomi_simples
    
    return {
      current: currentCount,
      limit: planLimits.max,
      plan,
      can_upload_images: planLimits.canUpload,
      max_extra_images: planLimits.maxExtra,
      upgrade_message: plan === 'fomi_simples' ? 'Faça upgrade para adicionar mais produtos e imagens' : undefined
    }
  }

  const createProduct = async (data: CreateProductRequest): Promise<boolean> => {
    if (!store?.id) return false

    // Verificar limite de produtos
    if (productLimits && productLimits.limit > 0 && productLimits.current >= productLimits.limit) {
      toast({
        title: "Limite Atingido",
        description: `Limite de ${productLimits.limit} produtos atingido para o plano ${productLimits.plan}. Faça upgrade para adicionar mais produtos.`,
        variant: "destructive",
      })
      return false
    }

    try {
      const response = await productsApi.createProduct(store.id, data)
      
      if (response.success) {
        setProducts(prev => [...prev, response.data.product])
        
        // Atualizar limites
        const newLimits = { ...productLimits! }
        newLimits.current += 1
        setProductLimits(newLimits)
        
        toast({
          title: "Sucesso",
          description: response.message || "Produto criado com sucesso",
        })
        return true
      } else {
        toast({
          title: "Erro",
          description: response.message || "Erro ao criar produto",
          variant: "destructive",
        })
        return false
      }
    } catch (error: any) {
      console.error('Erro ao criar produto:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar produto",
        variant: "destructive",
      })
      return false
    }
  }

  const updateProduct = async (productId: string, data: UpdateProductRequest): Promise<boolean> => {
    if (!store?.id) return false

    try {
      const response = await productsApi.updateProduct(store.id, productId, data)
      
      if (response.success) {
        setProducts(prev => prev.map(prod => 
          prod.id === productId ? response.data.product : prod
        ))
        toast({
          title: "Sucesso",
          description: response.message || "Produto atualizado com sucesso",
        })
        return true
      } else {
        toast({
          title: "Erro",
          description: response.message || "Erro ao atualizar produto",
          variant: "destructive",
        })
        return false
      }
    } catch (error: any) {
      console.error('Erro ao atualizar produto:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar produto",
        variant: "destructive",
      })
      return false
    }
  }

  const deleteProduct = async (productId: string): Promise<boolean> => {
    if (!store?.id) return false

    try {
      const response = await productsApi.deleteProduct(store.id, productId)
      
      if (response.success) {
        setProducts(prev => prev.filter(prod => prod.id !== productId))
        
        // Atualizar limites
        if (productLimits) {
          const newLimits = { ...productLimits }
          newLimits.current = Math.max(0, newLimits.current - 1)
          setProductLimits(newLimits)
        }
        
        toast({
          title: "Sucesso",
          description: response.message || "Produto excluído com sucesso",
        })
        return true
      } else {
        toast({
          title: "Erro",
          description: response.message || "Erro ao excluir produto",
          variant: "destructive",
        })
        return false
      }
    } catch (error: any) {
      console.error('Erro ao excluir produto:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao excluir produto",
        variant: "destructive",
      })
      return false
    }
  }

  const uploadMainImage = async (productId: string, imageFile: File): Promise<boolean> => {
    if (!store?.id) return false

    try {
      const response = await productsApi.uploadMainImage(store.id, productId, imageFile)
      
      if (response.success) {
        setProducts(prev => prev.map(prod => 
          prod.id === productId ? response.data.product : prod
        ))
        toast({
          title: "Sucesso",
          description: response.message || "Imagem principal do produto atualizada com sucesso",
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
      console.error('Erro ao fazer upload da imagem principal:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao fazer upload da imagem",
        variant: "destructive",
      })
      return false
    }
  }

  const uploadExtraImage = async (productId: string, imageFile: File): Promise<boolean> => {
    if (!store?.id) return false

    try {
      const response = await productsApi.uploadExtraImage(store.id, productId, imageFile)
      
      if (response.success) {
        setProducts(prev => prev.map(prod => 
          prod.id === productId ? response.data.product : prod
        ))
        toast({
          title: "Sucesso",
          description: response.message || "Imagem extra adicionada com sucesso",
        })
        return true
      } else {
        toast({
          title: "Erro",
          description: response.message || "Erro ao fazer upload da imagem extra",
          variant: "destructive",
        })
        return false
      }
    } catch (error: any) {
      console.error('Erro ao fazer upload da imagem extra:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao fazer upload da imagem extra",
        variant: "destructive",
      })
      return false
    }
  }

  const removeMainImage = async (productId: string): Promise<boolean> => {
    if (!store?.id) return false

    try {
      const response = await productsApi.removeMainImage(store.id, productId)
      
      if (response.success) {
        setProducts(prev => prev.map(prod => 
          prod.id === productId ? response.data.product : prod
        ))
        toast({
          title: "Sucesso",
          description: response.message || "Imagem principal do produto removida com sucesso",
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
      console.error('Erro ao remover imagem principal:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao remover imagem",
        variant: "destructive",
      })
      return false
    }
  }

  const removeExtraImage = async (productId: string, imageIndex: number): Promise<boolean> => {
    if (!store?.id) return false

    try {
      const response = await productsApi.removeExtraImage(store.id, productId, imageIndex)
      
      if (response.success) {
        setProducts(prev => prev.map(prod => 
          prod.id === productId ? response.data.product : prod
        ))
        toast({
          title: "Sucesso",
          description: response.message || "Imagem extra removida com sucesso",
        })
        return true
      } else {
        toast({
          title: "Erro",
          description: response.message || "Erro ao remover imagem extra",
          variant: "destructive",
        })
        return false
      }
    } catch (error: any) {
      console.error('Erro ao remover imagem extra:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao remover imagem extra",
        variant: "destructive",
      })
      return false
    }
  }

  useEffect(() => {
    if (store?.id) {
      fetchProducts()
      fetchImageSettings()
    } else {
      // Se não há store.id, parar os loadings
      setIsLoading(false)
      setIsLoadingImageSettings(false)
    }
  }, [store?.id])

  return {
    products,
    isLoading,
    imageSettings,
    isLoadingImageSettings,
    productLimits,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadMainImage,
    uploadExtraImage,
    removeMainImage,
    removeExtraImage,
  }
} 