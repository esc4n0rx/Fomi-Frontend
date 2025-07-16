"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X, Image as ImageIcon, Loader2, AlertCircle, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductImageSettings } from "@/types/auth"
import { useAuth } from "@/contexts/AuthContext"

interface ProductImageUploadProps {
  currentMainImage?: string
  currentExtraImages?: string[]
  onUploadMain: (file: File) => Promise<boolean>
  onUploadExtra: (file: File) => Promise<boolean>
  onRemoveMain: () => Promise<boolean>
  onRemoveExtra: (index: number) => Promise<boolean>
  imageSettings: ProductImageSettings | null
  isLoading?: boolean
  maxExtraImages?: number
}

export function ProductImageUpload({
  currentMainImage,
  currentExtraImages = [],
  onUploadMain,
  onUploadExtra,
  onRemoveMain,
  onRemoveExtra,
  imageSettings,
  isLoading = false,
  maxExtraImages = 5
}: ProductImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [removing, setRemoving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadType, setUploadType] = useState<'main' | 'extra'>('main')
  const mainFileInputRef = useRef<HTMLInputElement>(null)
  const extraFileInputRef = useRef<HTMLInputElement>(null)
  const { canUploadImages: authCanUploadImages } = useAuth()

  // Usar a verificação do AuthContext como fallback se a API não retornar as configurações
  const canUploadImages = imageSettings?.can_upload_images ?? authCanUploadImages
  const canAddExtraImages = currentExtraImages.length < maxExtraImages

  const validateFile = (file: File): string | null => {
    // Verificar formato
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return "Formato não suportado. Use: JPEG, PNG ou WebP"
    }

    // Verificar tamanho (3MB)
    const maxSize = 3 * 1024 * 1024 // 3MB
    if (file.size > maxSize) {
      return "Arquivo muito grande. Máximo 3MB"
    }

    return null
  }

  const handleFileSelect = (file: File, type: 'main' | 'extra') => {
    setError(null)
    const validationError = validateFile(file)
    
    if (validationError) {
      setError(validationError)
      return
    }

    setSelectedFile(file)
    setUploadType(type)
    
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

  const handleDrop = (e: React.DragEvent, type: 'main' | 'extra') => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0], type)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, type: 'main' | 'extra') => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0], type)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    setError(null)

    try {
      let success = false
      if (uploadType === 'main') {
        success = await onUploadMain(selectedFile)
      } else {
        success = await onUploadExtra(selectedFile)
      }
      
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

  const handleRemoveMain = async () => {
    setRemoving(true)
    setError(null)

    try {
      const success = await onRemoveMain()
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

  const handleRemoveExtra = async (index: number) => {
    setRemoving(true)
    setError(null)

    try {
      const success = await onRemoveExtra(index)
      if (!success) {
        setError("Erro ao remover imagem extra")
      }
    } catch (err) {
      setError("Erro ao remover imagem extra")
    } finally {
      setRemoving(false)
    }
  }

  const handleCancel = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setError(null)
    if (mainFileInputRef.current) {
      mainFileInputRef.current.value = ""
    }
    if (extraFileInputRef.current) {
      extraFileInputRef.current.value = ""
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
            Faça upgrade do seu plano para adicionar imagens aos produtos
          </p>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
            Disponível nos planos Fomi Duplo e Supremo
          </Badge>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Configurações de Imagem */}
      {imageSettings && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Especificações das Imagens</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>Imagem Principal:</strong> {imageSettings.specifications.main_image.dimensions}</p>
            <p><strong>Formatos:</strong> {imageSettings.specifications.main_image.formats.join(', ')}</p>
            <p><strong>Tamanho máximo:</strong> {imageSettings.specifications.main_image.max_size}</p>
            <p><strong>Proporção:</strong> {imageSettings.specifications.main_image.aspect_ratio}</p>
            <p><strong>Imagens Extras:</strong> Máximo {imageSettings.specifications.extra_images.max_count} imagens</p>
          </div>
        </div>
      )}

      {/* Imagem Principal */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Imagem Principal</h4>
        
        {currentMainImage && !selectedFile && (
          <div className="relative">
            <img
              src={currentMainImage}
              alt="Imagem principal do produto"
              className="w-full h-48 object-cover rounded-lg border"
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={handleRemoveMain}
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

        {/* Preview da Nova Imagem Principal */}
        {selectedFile && uploadType === 'main' && (
          <div className="relative">
            <img
              src={previewUrl!}
              alt="Preview da nova imagem"
              className="w-full h-48 object-cover rounded-lg border"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={uploading}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpload}
                disabled={uploading}
                size="sm"
              >
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Confirmar"
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Upload da Imagem Principal */}
        {!currentMainImage && !selectedFile && (
          <Card 
            className={`border-dashed border-2 transition-colors ${
              dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
            }`}
            onDragEnter={(e) => handleDrag(e)}
            onDragLeave={(e) => handleDrag(e)}
            onDragOver={(e) => handleDrag(e)}
            onDrop={(e) => handleDrop(e, 'main')}
          >
            <CardContent className="p-6 text-center">
              <input
                ref={mainFileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileInput(e, 'main')}
                className="hidden"
              />
              
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Clique para selecionar ou arraste uma imagem
              </p>
              <Button
                variant="outline"
                onClick={() => mainFileInputRef.current?.click()}
                disabled={isLoading}
              >
                Selecionar Imagem Principal
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Botão para trocar imagem principal */}
        {currentMainImage && !selectedFile && (
          <Button
            variant="outline"
            onClick={() => mainFileInputRef.current?.click()}
            disabled={isLoading}
            className="w-full"
          >
            <Upload className="w-4 h-4 mr-2" />
            Trocar Imagem Principal
          </Button>
        )}
      </div>

      {/* Imagens Extras */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Imagens Extras</h4>
          <Badge variant="outline">
            {currentExtraImages.length}/{maxExtraImages}
          </Badge>
        </div>

        {/* Grid de Imagens Extras */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {currentExtraImages.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Imagem extra ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border"
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveExtra(index)}
                disabled={removing || isLoading}
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}

          {/* Preview da Nova Imagem Extra */}
          {selectedFile && uploadType === 'extra' && (
            <div className="relative">
              <img
                src={previewUrl!}
                alt="Preview da nova imagem extra"
                className="w-full h-32 object-cover rounded-lg border"
              />
              <div className="absolute top-1 right-1 flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  disabled={uploading}
                >
                  <X className="w-3 h-3" />
                </Button>
                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  size="sm"
                >
                  {uploading ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Plus className="w-3 h-3" />
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Botão para adicionar imagem extra */}
          {canAddExtraImages && !selectedFile && (
            <Card 
              className={`border-dashed border-2 transition-colors cursor-pointer ${
                dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
              }`}
              onDragEnter={(e) => handleDrag(e)}
              onDragLeave={(e) => handleDrag(e)}
              onDragOver={(e) => handleDrag(e)}
              onDrop={(e) => handleDrop(e, 'extra')}
              onClick={() => extraFileInputRef.current?.click()}
            >
              <CardContent className="p-4 text-center h-32 flex items-center justify-center">
                <input
                  ref={extraFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileInput(e, 'extra')}
                  className="hidden"
                />
                
                <div>
                  <Plus className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Adicionar Imagem</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {!canAddExtraImages && (
          <p className="text-sm text-gray-500 text-center">
            Limite de {maxExtraImages} imagens extras atingido
          </p>
        )}
      </div>

      {/* Mensagem de Erro */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}
    </div>
  )
} 