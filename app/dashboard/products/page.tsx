"use client"

import { useState, useEffect } from "react"
import { SidebarMenu } from "@/components/sidebar-menu"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Eye, Loader2, X, Tag, Clock, Star, Image as ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { productsApi, categoriesApi } from "@/lib/api"
import { Product, CreateProductRequest, UpdateProductRequest, Category } from "@/types/auth"
import { useAuth } from "@/contexts/AuthContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [showOnlyAvailable, setShowOnlyAvailable] = useState<boolean | undefined>(undefined)
  const [showOnlyFeatured, setShowOnlyFeatured] = useState<boolean | undefined>(undefined)
  
  // Estados dos modais
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Estados do formulário
  const [formData, setFormData] = useState<CreateProductRequest>({
    nome: "",
    descricao: "",
    preco: 0,
    preco_promocional: 0,
    category_id: "",
    ingredientes: [],
    alergicos: [],
    tempo_preparo_min: 0,
    disponivel: true,
    destaque: false,
    imagem_url: "",
    ordem: 0,
  })
  
  const [ingredienteInput, setIngredienteInput] = useState("")
  const [alergicoInput, setAlergicoInput] = useState("")
  
  const { toast } = useToast()
  const { store } = useAuth()

  // Carregar produtos da API
  useEffect(() => {
    const loadProducts = async () => {
      if (!store?.id) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const filters: any = {}
        if (selectedCategory) filters.category_id = selectedCategory
        if (showOnlyAvailable !== undefined) filters.disponivel = showOnlyAvailable
        if (showOnlyFeatured !== undefined) filters.destaque = showOnlyFeatured

        const response = await productsApi.getProducts(store.id, filters)
        setProducts(response.data.products || [])
      } catch (error: any) {
        console.error('Erro ao carregar produtos:', error)
        toast({
          title: "Erro",
          description: error.message || "Erro ao carregar produtos",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [store?.id, selectedCategory, showOnlyAvailable, showOnlyFeatured, toast])

  // Carregar categorias
  useEffect(() => {
    const loadCategories = async () => {
      if (!store?.id) return

      try {
        const response = await categoriesApi.getCategories(store.id)
        setCategories(response.data.categories || [])
      } catch (error: any) {
        console.error('Erro ao carregar categorias:', error)
      }
    }

    loadCategories()
  }, [store?.id])

  const filteredProducts = products.filter(product =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateProduct = async () => {
    if (!store?.id) {
      toast({
        title: "Erro",
        description: "Loja não encontrada",
        variant: "destructive",
      })
      return
    }

    if (!formData.nome.trim() || formData.preco <= 0) {
      toast({
        title: "Erro",
        description: "Nome e preço são obrigatórios",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await productsApi.createProduct(store.id, formData)
      setProducts(prev => [...prev, response.data.product])
      setIsCreateModalOpen(false)
      resetForm()
      
      toast({
        title: "Sucesso",
        description: response.message || "Produto criado com sucesso",
      })
    } catch (error: any) {
      console.error('Erro ao criar produto:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar produto",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditProduct = async () => {
    if (!store?.id || !editingProduct) {
      toast({
        title: "Erro",
        description: "Loja não encontrada",
        variant: "destructive",
      })
      return
    }

    if (!formData.nome.trim() || formData.preco <= 0) {
      toast({
        title: "Erro",
        description: "Nome e preço são obrigatórios",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await productsApi.updateProduct(store.id, editingProduct.id, formData)
      setProducts(prev => prev.map(prod => 
        prod.id === editingProduct.id ? response.data.product : prod
      ))
      setIsEditModalOpen(false)
      setEditingProduct(null)
      resetForm()
      
      toast({
        title: "Sucesso",
        description: response.message || "Produto atualizado com sucesso",
      })
    } catch (error: any) {
      console.error('Erro ao atualizar produto:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar produto",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!store?.id) {
      toast({
        title: "Erro",
        description: "Loja não encontrada",
        variant: "destructive",
      })
      return
    }

    if (!confirm("Tem certeza que deseja excluir este produto?")) return

    try {
      await productsApi.deleteProduct(store.id, productId)
      setProducts(prev => prev.filter(prod => prod.id !== productId))
      
      toast({
        title: "Sucesso",
        description: "Produto excluído com sucesso",
      })
    } catch (error: any) {
      console.error('Erro ao excluir produto:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao excluir produto",
        variant: "destructive",
      })
    }
  }

  const openEditModal = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      nome: product.nome,
      descricao: product.descricao || "",
      preco: product.preco,
      preco_promocional: product.preco_promocional || 0,
      category_id: product.category?.id || "",
      ingredientes: product.ingredientes || [],
      alergicos: product.alergicos || [],
      tempo_preparo_min: product.tempo_preparo_min || 0,
      disponivel: product.disponivel,
      destaque: product.destaque,
      imagem_url: product.imagem_url || "",
      ordem: product.ordem || 0,
    })
    setIsEditModalOpen(true)
  }

  const resetForm = () => {
    setFormData({
      nome: "",
      descricao: "",
      preco: 0,
      preco_promocional: 0,
      category_id: "",
      ingredientes: [],
      alergicos: [],
      tempo_preparo_min: 0,
      disponivel: true,
      destaque: false,
      imagem_url: "",
      ordem: 0,
    })
    setIngredienteInput("")
    setAlergicoInput("")
  }

  const openCreateModal = () => {
    resetForm()
    setIsCreateModalOpen(true)
  }

  const addIngrediente = () => {
    if (ingredienteInput.trim()) {
      setFormData(prev => ({
        ...prev,
        ingredientes: [...(prev.ingredientes || []), ingredienteInput.trim()]
      }))
      setIngredienteInput("")
    }
  }

  const removeIngrediente = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredientes: prev.ingredientes?.filter((_, i) => i !== index) || []
    }))
  }

  const addAlergico = () => {
    if (alergicoInput.trim()) {
      setFormData(prev => ({
        ...prev,
        alergicos: [...(prev.alergicos || []), alergicoInput.trim()]
      }))
      setAlergicoInput("")
    }
  }

  const removeAlergico = (index: number) => {
    setFormData(prev => ({
      ...prev,
      alergicos: prev.alergicos?.filter((_, i) => i !== index) || []
    }))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const getStatusBadge = (product: Product) => {
    if (!product.disponivel) {
      return <Badge className="bg-red-100 text-red-800">Indisponível</Badge>
    }
    if (product.destaque) {
      return <Badge className="bg-yellow-100 text-yellow-800">Destaque</Badge>
    }
    return <Badge className="bg-green-100 text-green-800">Disponível</Badge>
  }

  if (!store?.id) {
    return (
      <div className="flex h-screen bg-gray-50">
        <SidebarMenu />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-gray-600">Carregando informações da loja...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
              <p className="text-gray-600">Gerencie o cardápio da sua loja</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  placeholder="Buscar produtos..." 
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90" onClick={openCreateModal}>
                    <Plus size={20} className="mr-2" />
                    Novo Produto
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Criar Novo Produto</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    {/* Informações Básicas */}
                    <div className="grid gap-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Tag size={20} />
                        Informações Básicas
                      </h3>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="nome">Nome do Produto *</Label>
                        <Input
                          id="nome"
                          value={formData.nome}
                          onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                          placeholder="Ex: Hambúrguer Artesanal"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="descricao">Descrição</Label>
                        <Textarea
                          id="descricao"
                          value={formData.descricao}
                          onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                          placeholder="Descreva o produto..."
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="preco">Preço *</Label>
                          <Input
                            id="preco"
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={formData.preco}
                            onChange={(e) => setFormData(prev => ({ ...prev, preco: parseFloat(e.target.value) || 0 }))}
                            placeholder="0,00"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="preco_promocional">Preço Promocional</Label>
                          <Input
                            id="preco_promocional"
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={formData.preco_promocional}
                            onChange={(e) => setFormData(prev => ({ ...prev, preco_promocional: parseFloat(e.target.value) || 0 }))}
                            placeholder="0,00"
                          />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="category">Categoria</Label>
                        <Select value={formData.category_id} onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.nome}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Configurações */}
                    <div className="grid gap-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Clock size={20} />
                        Configurações
                      </h3>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="tempo_preparo">Tempo de Preparo (minutos)</Label>
                        <Input
                          id="tempo_preparo"
                          type="number"
                          min="1"
                          max="180"
                          value={formData.tempo_preparo_min}
                          onChange={(e) => setFormData(prev => ({ ...prev, tempo_preparo_min: parseInt(e.target.value) || 0 }))}
                          placeholder="15"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="ordem">Ordem de Exibição</Label>
                        <Input
                          id="ordem"
                          type="number"
                          min="0"
                          value={formData.ordem}
                          onChange={(e) => setFormData(prev => ({ ...prev, ordem: parseInt(e.target.value) || 0 }))}
                          placeholder="0"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="imagem_url">URL da Imagem</Label>
                        <Input
                          id="imagem_url"
                          type="url"
                          value={formData.imagem_url}
                          onChange={(e) => setFormData(prev => ({ ...prev, imagem_url: e.target.value }))}
                          placeholder="https://exemplo.com/imagem.jpg"
                        />
                      </div>
                    </div>

                    {/* Status */}
                    <div className="grid gap-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Star size={20} />
                        Status
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Disponível</Label>
                          <p className="text-sm text-gray-500">Produto está disponível para pedidos</p>
                        </div>
                        <Switch
                          checked={formData.disponivel}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, disponivel: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Destaque</Label>
                          <p className="text-sm text-gray-500">Produto aparece em destaque</p>
                        </div>
                        <Switch
                          checked={formData.destaque}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, destaque: checked }))}
                        />
                      </div>
                    </div>

                    {/* Ingredientes */}
                    <div className="grid gap-4">
                      <h3 className="text-lg font-semibold">Ingredientes</h3>
                      
                      <div className="flex gap-2">
                        <Input
                          placeholder="Adicionar ingrediente..."
                          value={ingredienteInput}
                          onChange={(e) => setIngredienteInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addIngrediente()}
                        />
                        <Button type="button" onClick={addIngrediente} size="sm">
                          Adicionar
                        </Button>
                      </div>

                      {formData.ingredientes && formData.ingredientes.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.ingredientes.map((ingrediente, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              {ingrediente}
                              <button
                                type="button"
                                onClick={() => removeIngrediente(index)}
                                className="ml-1 hover:text-red-500"
                              >
                                <X size={12} />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Alergênicos */}
                    <div className="grid gap-4">
                      <h3 className="text-lg font-semibold">Alergênicos</h3>
                      
                      <div className="flex gap-2">
                        <Input
                          placeholder="Adicionar alergênico..."
                          value={alergicoInput}
                          onChange={(e) => setAlergicoInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addAlergico()}
                        />
                        <Button type="button" onClick={addAlergico} size="sm">
                          Adicionar
                        </Button>
                      </div>

                      {formData.alergicos && formData.alergicos.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.alergicos.map((alergico, index) => (
                            <Badge key={index} variant="destructive" className="flex items-center gap-1">
                              {alergico}
                              <button
                                type="button"
                                onClick={() => removeAlergico(index)}
                                className="ml-1 hover:text-red-300"
                              >
                                <X size={12} />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateProduct} disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Criando...
                        </>
                      ) : (
                        "Criar Produto"
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
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
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Todos os Produtos</h2>
                <div className="flex items-center space-x-4">
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Todas as categorias</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.nome}
                      </option>
                    ))}
                  </select>
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    value={showOnlyAvailable === undefined ? "" : showOnlyAvailable.toString()}
                    onChange={(e) => setShowOnlyAvailable(e.target.value === "" ? undefined : e.target.value === "true")}
                  >
                    <option value="">Todos os status</option>
                    <option value="true">Apenas disponíveis</option>
                    <option value="false">Apenas indisponíveis</option>
                  </select>
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    value={showOnlyFeatured === undefined ? "" : showOnlyFeatured.toString()}
                    onChange={(e) => setShowOnlyFeatured(e.target.value === "" ? undefined : e.target.value === "true")}
                  >
                    <option value="">Todos os produtos</option>
                    <option value="true">Apenas destaque</option>
                  </select>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  {searchTerm ? "Nenhum produto encontrado" : "Nenhum produto cadastrado"}
                </h3>
                <p className="text-sm text-gray-500">
                  {searchTerm ? "Tente ajustar sua busca." : "Comece criando seu primeiro produto."}
                </p>
                {!searchTerm && (
                  <div className="mt-6">
                    <Button onClick={openCreateModal}>
                      <Plus className="mr-2 h-4 w-4" />
                      Criar Primeiro Produto
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      className="p-6 hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.imagem_url || "/placeholder.svg"}
                          alt={product.nome}
                          className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                        />

                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="font-semibold text-gray-900">{product.nome}</h3>
                            {product.category && (
                              <Badge variant="secondary" className="text-xs">
                                {product.category.nome}
                              </Badge>
                            )}
                            {getStatusBadge(product)}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{product.descricao}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            {product.tempo_preparo_min && (
                              <span>Tempo: {product.tempo_preparo_min} min</span>
                            )}
                            <span className="text-lg font-bold text-primary">
                              {product.preco_promocional ? (
                                <span>
                                  <span className="line-through text-gray-400 mr-2">
                                    {formatPrice(product.preco)}
                                  </span>
                                  {formatPrice(product.preco_promocional)}
                                </span>
                              ) : (
                                formatPrice(product.preco)
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye size={16} className="mr-2" />
                            Ver
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openEditModal(product)}
                          >
                            <Edit size={16} className="mr-2" />
                            Editar
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700 bg-transparent"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </main>
      </div>

      {/* Modal de Edição */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {/* Informações Básicas */}
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Tag size={20} />
                Informações Básicas
              </h3>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-nome">Nome do Produto *</Label>
                <Input
                  id="edit-nome"
                  value={formData.nome}
                  onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  placeholder="Ex: Hambúrguer Artesanal"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-descricao">Descrição</Label>
                <Textarea
                  id="edit-descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                  placeholder="Descreva o produto..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-preco">Preço *</Label>
                  <Input
                    id="edit-preco"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={formData.preco}
                    onChange={(e) => setFormData(prev => ({ ...prev, preco: parseFloat(e.target.value) || 0 }))}
                    placeholder="0,00"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-preco_promocional">Preço Promocional</Label>
                  <Input
                    id="edit-preco_promocional"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={formData.preco_promocional}
                    onChange={(e) => setFormData(prev => ({ ...prev, preco_promocional: parseFloat(e.target.value) || 0 }))}
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-category">Categoria</Label>
                <Select value={formData.category_id} onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Configurações */}
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Clock size={20} />
                Configurações
              </h3>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-tempo_preparo">Tempo de Preparo (minutos)</Label>
                <Input
                  id="edit-tempo_preparo"
                  type="number"
                  min="1"
                  max="180"
                  value={formData.tempo_preparo_min}
                  onChange={(e) => setFormData(prev => ({ ...prev, tempo_preparo_min: parseInt(e.target.value) || 0 }))}
                  placeholder="15"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-ordem">Ordem de Exibição</Label>
                <Input
                  id="edit-ordem"
                  type="number"
                  min="0"
                  value={formData.ordem}
                  onChange={(e) => setFormData(prev => ({ ...prev, ordem: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-imagem_url">URL da Imagem</Label>
                <Input
                  id="edit-imagem_url"
                  type="url"
                  value={formData.imagem_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, imagem_url: e.target.value }))}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
            </div>

            {/* Status */}
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Star size={20} />
                Status
              </h3>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Disponível</Label>
                  <p className="text-sm text-gray-500">Produto está disponível para pedidos</p>
                </div>
                <Switch
                  checked={formData.disponivel}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, disponivel: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Destaque</Label>
                  <p className="text-sm text-gray-500">Produto aparece em destaque</p>
                </div>
                <Switch
                  checked={formData.destaque}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, destaque: checked }))}
                />
              </div>
            </div>

            {/* Ingredientes */}
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Ingredientes</h3>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Adicionar ingrediente..."
                  value={ingredienteInput}
                  onChange={(e) => setIngredienteInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addIngrediente()}
                />
                <Button type="button" onClick={addIngrediente} size="sm">
                  Adicionar
                </Button>
              </div>

              {formData.ingredientes && formData.ingredientes.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.ingredientes.map((ingrediente, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {ingrediente}
                      <button
                        type="button"
                        onClick={() => removeIngrediente(index)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Alergênicos */}
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Alergênicos</h3>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Adicionar alergênico..."
                  value={alergicoInput}
                  onChange={(e) => setAlergicoInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addAlergico()}
                />
                <Button type="button" onClick={addAlergico} size="sm">
                  Adicionar
                </Button>
              </div>

              {formData.alergicos && formData.alergicos.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.alergicos.map((alergico, index) => (
                    <Badge key={index} variant="destructive" className="flex items-center gap-1">
                      {alergico}
                      <button
                        type="button"
                        onClick={() => removeAlergico(index)}
                        className="ml-1 hover:text-red-300"
                      >
                        <X size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditProduct} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar Alterações"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
