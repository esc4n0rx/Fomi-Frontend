"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X, Image as ImageIcon, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CategoryImageSettings } from "@/types/auth"
import { useAuth } from "@/contexts/AuthContext"

interface CategoryImageUploadProps {
  currentImageUrl?: string
  onUpload: (file: File) => Promise<boolean>
  onRemove: () => Promise<boolean>
  imageSettings: CategoryImageSettings | null
  isLoading?: boolean
}

export function CategoryImageUpload({
  currentImageUrl,
  onUpload,
  onRemove,
  imageSettings,
  isLoading = false
}: CategoryImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [removing, setRemoving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { canUploadImages: authCanUploadImages } = useAuth()

  // Usar a verificação do AuthContext como fallback se a API não retornar as configurações
  const canUploadImages = imageSettings?.can_upload_images ?? authCanUploadImages

  const validateFile = (file: File): string | null => {
    // Verificar formato
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return "Formato não suportado. Use: JPEG, PNG ou WebP"
    }

    // Verificar tamanho (2MB)
    const maxSize = 2 * 1024 * 1024 // 2MB
    if (file.size > maxSize) {
      return "Arquivo muito grande. Máximo 2MB"
    }

    return null
  }

  const handleFileSelect = (file: File) => {
    setError(null)
    const validationError = validateFile(file)
    
    if (validationError) {
      setError(validationError)
      return
    }

    setSelectedFile(file)
    
    // Criar preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    setError(null)

    try {
      const success = await onUpload(selectedFile)
      if (success) {
        setSelectedFile(null)
        setPreviewUrl(null)
      }
    } catch (err) {
      setError("Erro ao fazer upload da imagem")
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = async () => {
    setRemoving(true)
    setError(null)

    try {
      const success = await onRemove()
      if (success) {
        setSelectedFile(null)
        setPreviewUrl(null)
      }
    } catch (err) {
      setError("Erro ao remover imagem")
    } finally {
      setRemoving(false)
    }
  }

  const handleCancel = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  if (!canUploadImages) {
    return (
      <Card className="border-dashed border-2 border-gray-200 bg-gray-50">
        <CardContent className="p-6 text-center">
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Upload de Imagens
          </h3>
          <p className="text-gray-600 mb-4">
            Faça upgrade do seu plano para adicionar imagens às categorias
          </p>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
            Disponível nos planos Fomi Duplo e Supremo
          </Badge>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Configurações de Imagem */}
      {imageSettings && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Especificações da Imagem</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>Dimensões:</strong> {imageSettings.specifications.dimensions}</p>
            <p><strong>Formatos:</strong> {imageSettings.specifications.formats.join(', ')}</p>
            <p><strong>Tamanho máximo:</strong> {imageSettings.specifications.max_size}</p>
            <p><strong>Proporção:</strong> {imageSettings.specifications.aspect_ratio}</p>
          </div>
        </div>
      )}

      {/* Imagem Atual */}
      {currentImageUrl && !selectedFile && (
        <div className="relative">
          <img
            src={currentImageUrl}
            alt="Imagem atual da categoria"
            className="w-full h-48 object-cover rounded-lg border"
          />
          <Button
            variant="destructive"
            size="sm"
            onClick={handleRemove}
            disabled={removing || isLoading}
            className="absolute top-2 right-2"
          >
            {removing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <X className="w-4 h-4" />
            )}
          </Button>
        </div>
      )}

      {/* Preview da Nova Imagem */}
      <AnimatePresence>
        {previewUrl && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="relative"
          >
            <img
              src={previewUrl}
              alt="Preview da nova imagem"
              className="w-full h-48 object-cover rounded-lg border"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="absolute top-2 right-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Área de Upload */}
      {!currentImageUrl && !selectedFile && (
        <Card
          className={`border-dashed border-2 transition-colors ${
            dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <CardContent className="p-6 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Adicionar Imagem da Categoria
            </h3>
            <p className="text-gray-600 mb-4">
              Arraste uma imagem aqui ou clique para selecionar
            </p>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              Selecionar Imagem
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileInput}
              className="hidden"
            />
          </CardContent>
        </Card>
      )}

      {/* Erro */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700 text-sm">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botões de Ação */}
      {selectedFile && (
        <div className="flex gap-2">
          <Button
            onClick={handleUpload}
            disabled={uploading || isLoading}
            className="flex-1"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Fazendo Upload...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Fazer Upload
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={uploading || isLoading}
          >
            Cancelar
          </Button>
        </div>
      )}
    </div>
  )
} 