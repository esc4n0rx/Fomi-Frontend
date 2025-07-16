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
import { Search, Plus, Edit, Trash2, Grid, Loader2, X, Palette, Image as ImageIcon, GripVertical } from "lucide-react"
import { Category, CreateCategoryRequest, UpdateCategoryRequest } from "@/types/auth"
import { useAuth } from "@/contexts/AuthContext"
import { useCategories } from "@/hooks/useCategories"
import { CategoryImageUpload } from "@/components/category-image-upload"

const colorOptions = [
  "#E63946", "#FFC300", "#06D6A0", "#F72585", "#7209B7",
  "#3A86FF", "#8338EC", "#FF006E", "#FB5607", "#FFBE0B",
  "#06FFA5", "#FF6B35", "#4ECDC4", "#45B7D1", "#96CEB4"
]

export default function CategoriesPage() {
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
  const { store } = useAuth()
  const { 
    categories, 
    isLoading, 
    imageSettings, 
    isLoadingImageSettings,
    createCategory, 
    updateCategory, 
    deleteCategory,
    uploadImage,
    removeImage,
    reorderCategories
  } = useCategories()

  // O hook useCategories já carrega as categorias automaticamente

  const filteredCategories = categories.filter(category =>
    category.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateCategory = async () => {
    if (!formData.nome.trim()) {
      return
    }

    setIsSubmitting(true)
    try {
      const success = await createCategory(formData)
      if (success) {
        setIsCreateModalOpen(false)
        resetForm()
      }
    } catch (error: any) {
      console.error('Erro ao criar categoria:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditCategory = async () => {
    if (!editingCategory) {
      return
    }

    if (!formData.nome.trim()) {
      return
    }

    setIsSubmitting(true)
    try {
      const success = await updateCategory(editingCategory.id, formData)
      if (success) {
        setIsEditModalOpen(false)
        setEditingCategory(null)
        resetForm()
      }
    } catch (error: any) {
      console.error('Erro ao atualizar categoria:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) return

    try {
      await deleteCategory(categoryId)
    } catch (error: any) {
      console.error('Erro ao excluir categoria:', error)
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
              <h1 className="text-2xl font-bold text-gray-900">Categorias</h1>
              <p className="text-gray-600">Organize seus produtos por categorias</p>
              {imageSettings && (
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {imageSettings.user_plan === 'fomi_simples' ? 'Plano Grátis' : 
                     imageSettings.user_plan === 'fomi_duplo' ? 'Fomi Duplo' : 'Fomi Supremo'}
                  </Badge>
                  {imageSettings.can_upload_images ? (
                    <span className="text-xs text-green-600">✓ Upload de imagens disponível</span>
                  ) : (
                    <span className="text-xs text-yellow-600">⚠ Faça upgrade para upload de imagens</span>
                  )}
                </div>
              )}
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
                    
                    {/* Upload de Imagem */}
                    <div className="grid gap-2">
                      <Label>Imagem da Categoria</Label>
                      <CategoryImageUpload
                        imageSettings={imageSettings}
                        isLoading={isLoadingImageSettings}
                        onUpload={async (file) => {
                          // Para criação, vamos salvar a imagem depois que a categoria for criada
                          return true
                        }}
                        onRemove={async () => {
                          return true
                        }}
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
          {isLoading ? (
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
                      {category.imagem_url ? (
                        <img
                          src={category.imagem_url}
                          alt={category.nome}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                          style={{ backgroundColor: `${category.cor}20` }}
                        >
                          🍽️
                        </div>
                      )}
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
                      {imageSettings?.can_upload_images && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-transparent"
                          onClick={() => openEditModal(category)}
                          title="Gerenciar imagem"
                        >
                          <ImageIcon size={16} />
                        </Button>
                      )}
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
            
            {/* Upload de Imagem */}
            <div className="grid gap-2">
              <Label>Imagem da Categoria</Label>
              <CategoryImageUpload
                currentImageUrl={editingCategory?.imagem_url}
                imageSettings={imageSettings}
                isLoading={isLoadingImageSettings}
                onUpload={async (file) => {
                  if (editingCategory) {
                    return await uploadImage(editingCategory.id, file)
                  }
                  return false
                }}
                onRemove={async () => {
                  if (editingCategory) {
                    return await removeImage(editingCategory.id)
                  }
                  return false
                }}
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
