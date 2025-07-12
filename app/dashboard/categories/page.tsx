"use client"

import { useState, useEffect } from "react"
import { SidebarMenu } from "@/components/sidebar-menu"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Search, Plus, Edit, Trash2, Grid, Loader2, X, Palette } from "lucide-react"
import { categoriesApi } from "@/lib/api"
import { Category, CreateCategoryRequest, UpdateCategoryRequest } from "@/types/auth"

// Dados mockados para demonstração (serão substituídos pela API)
const mockCategories: Category[] = [
  {
    id: "1",
    nome: "Hambúrgueres",
    descricao: "Hambúrgueres artesanais e tradicionais",
    cor: "#E63946",
    ordem: 1,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    nome: "Pizzas",
    descricao: "Pizzas tradicionais e especiais",
    cor: "#FFC300",
    ordem: 2,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    nome: "Bebidas",
    descricao: "Sucos, refrigerantes e bebidas especiais",
    cor: "#06D6A0",
    ordem: 3,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    nome: "Acompanhamentos",
    descricao: "Batatas, saladas e outros acompanhamentos",
    cor: "#F72585",
    ordem: 4,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "5",
    nome: "Sobremesas",
    descricao: "Doces e sobremesas especiais",
    cor: "#7209B7",
    ordem: 5,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
]

const colorOptions = [
  "#E63946", "#FFC300", "#06D6A0", "#F72585", "#7209B7",
  "#3A86FF", "#8338EC", "#FF006E", "#FB5607", "#FFBE0B",
  "#8338EC", "#3A86FF", "#06FFA5", "#FF006E", "#8338EC"
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState<CreateCategoryRequest>({
    nome: "",
    descricao: "",
    cor: "#E63946",
    ordem: 0,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Simular carregamento de dados da API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true)
        // Simular delay da API
        await new Promise(resolve => setTimeout(resolve, 1000))
        setCategories(mockCategories)
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao carregar categorias",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [toast])

  const filteredCategories = categories.filter(category =>
    category.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateCategory = async () => {
    if (!formData.nome.trim()) {
      toast({
        title: "Erro",
        description: "Nome da categoria é obrigatório",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      // Simular criação na API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
             const newCategory: Category = {
         id: Date.now().toString(),
         nome: formData.nome,
         descricao: formData.descricao,
         cor: formData.cor,
         ordem: formData.ordem || 0,
         created_at: new Date().toISOString(),
         updated_at: new Date().toISOString(),
       }

      setCategories(prev => [...prev, newCategory])
      setIsCreateModalOpen(false)
      resetForm()
      
      toast({
        title: "Sucesso",
        description: "Categoria criada com sucesso",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao criar categoria",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditCategory = async () => {
    if (!editingCategory || !formData.nome.trim()) {
      toast({
        title: "Erro",
        description: "Nome da categoria é obrigatório",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      // Simular atualização na API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
             const updatedCategory: Category = {
         ...editingCategory,
         nome: formData.nome,
         descricao: formData.descricao,
         cor: formData.cor,
         ordem: formData.ordem || 0,
         updated_at: new Date().toISOString(),
       }

      setCategories(prev => prev.map(cat => 
        cat.id === editingCategory.id ? updatedCategory : cat
      ))
      setIsEditModalOpen(false)
      setEditingCategory(null)
      resetForm()
      
      toast({
        title: "Sucesso",
        description: "Categoria atualizada com sucesso",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar categoria",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) return

    try {
      // Simular exclusão na API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setCategories(prev => prev.filter(cat => cat.id !== categoryId))
      
      toast({
        title: "Sucesso",
        description: "Categoria excluída com sucesso",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir categoria",
        variant: "destructive",
      })
    }
  }

  const openEditModal = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      nome: category.nome,
      descricao: category.descricao || "",
      cor: category.cor || "#E63946",
      ordem: category.ordem,
    })
    setIsEditModalOpen(true)
  }

  const resetForm = () => {
    setFormData({
      nome: "",
      descricao: "",
      cor: "#E63946",
      ordem: 0,
    })
  }

  const openCreateModal = () => {
    resetForm()
    setIsCreateModalOpen(true)
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
              <h1 className="text-2xl font-bold text-gray-900">Categorias</h1>
              <p className="text-gray-600">Organize seus produtos por categorias</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  placeholder="Buscar categorias..." 
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90" onClick={openCreateModal}>
                    <Plus size={20} className="mr-2" />
                    Nova Categoria
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Criar Nova Categoria</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="nome">Nome *</Label>
                      <Input
                        id="nome"
                        value={formData.nome}
                        onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                        placeholder="Ex: Hambúrgueres"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="descricao">Descrição</Label>
                      <Textarea
                        id="descricao"
                        value={formData.descricao}
                        onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                        placeholder="Descrição da categoria"
                        rows={3}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cor">Cor</Label>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded border"
                          style={{ backgroundColor: formData.cor }}
                        />
                        <Input
                          id="cor"
                          value={formData.cor}
                          onChange={(e) => setFormData(prev => ({ ...prev, cor: e.target.value }))}
                          placeholder="#E63946"
                        />
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {colorOptions.map((color) => (
                          <button
                            key={color}
                            type="button"
                            className="w-6 h-6 rounded border-2 border-gray-300 hover:border-gray-400"
                            style={{ backgroundColor: color }}
                            onClick={() => setFormData(prev => ({ ...prev, cor: color }))}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="ordem">Ordem</Label>
                      <Input
                        id="ordem"
                        type="number"
                        value={formData.ordem}
                        onChange={(e) => setFormData(prev => ({ ...prev, ordem: parseInt(e.target.value) || 0 }))}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateCategory} disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Criando...
                        </>
                      ) : (
                        "Criar Categoria"
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </motion.header>

        <main className="flex-1 overflow-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <Grid className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma categoria encontrada</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? "Tente ajustar sua busca." : "Comece criando sua primeira categoria."}
              </p>
              {!searchTerm && (
                <div className="mt-6">
                  <Button onClick={openCreateModal}>
                    <Plus className="mr-2 h-4 w-4" />
                    Criar Primeira Categoria
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    whileHover={{ y: -2 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                        style={{ backgroundColor: `${category.cor}20` }}
                      >
                        🍽️
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        Ativa
                      </Badge>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.nome}</h3>
                    <p className="text-sm text-gray-600 mb-4">{category.descricao}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Grid size={16} />
                        <span>0 produtos</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Palette size={16} />
                        <span>Ordem: {category.ordem}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 bg-transparent"
                        onClick={() => openEditModal(category)}
                      >
                        <Edit size={16} className="mr-2" />
                        Editar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700 bg-transparent"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </main>
      </div>

      {/* Modal de Edição */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Categoria</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-nome">Nome *</Label>
              <Input
                id="edit-nome"
                value={formData.nome}
                onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                placeholder="Ex: Hambúrgueres"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-descricao">Descrição</Label>
              <Textarea
                id="edit-descricao"
                value={formData.descricao}
                onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                placeholder="Descrição da categoria"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-cor">Cor</Label>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: formData.cor }}
                />
                <Input
                  id="edit-cor"
                  value={formData.cor}
                  onChange={(e) => setFormData(prev => ({ ...prev, cor: e.target.value }))}
                  placeholder="#E63946"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="w-6 h-6 rounded border-2 border-gray-300 hover:border-gray-400"
                    style={{ backgroundColor: color }}
                    onClick={() => setFormData(prev => ({ ...prev, cor: color }))}
                  />
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-ordem">Ordem</Label>
              <Input
                id="edit-ordem"
                type="number"
                value={formData.ordem}
                onChange={(e) => setFormData(prev => ({ ...prev, ordem: parseInt(e.target.value) || 0 }))}
                placeholder="0"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditCategory} disabled={isSubmitting}>
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
