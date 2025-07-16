"use client"

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, X, Eye, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

interface StoreImageUploadProps {
  type: 'logo' | 'banner';
  currentUrl?: string | null;
  onUpload: (file: File) => Promise<void>;
  onRemove: () => Promise<void>;
  uploading: boolean;
  hasPermission: boolean;
  upgradeMessage?: string;
  specifications: {
    dimensions: string;
    formats: string[];
    max_size: string;
  };
}

export const StoreImageUpload = ({
  type,
  currentUrl,
  onUpload,
  onRemove,
  uploading,
  hasPermission,
  upgradeMessage,
  specifications
}: StoreImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Formato inválido",
        description: "Use apenas: JPEG, PNG ou WebP",
        variant: "destructive",
      });
      return;
    }

    // Validate file size
    const maxSize = parseInt(specifications.max_size.replace('MB', '')) * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "Arquivo muito grande",
        description: `Máximo ${specifications.max_size} para ${type}`,
        variant: "destructive",
      });
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    onUpload(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    if (!hasPermission) {
      toast({
        title: "Funcionalidade não disponível",
        description: upgradeMessage || "Faça upgrade do seu plano",
        variant: "destructive",
      });
      return;
    }
    fileInputRef.current?.click();
  };

  const handleRemove = async () => {
    if (uploading) return;
    await onRemove();
    setPreview(null);
  };

  const displayUrl = preview || currentUrl;
  const isLogo = type === 'logo';

  if (!hasPermission) {
    return (
      <Card className="relative overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            {isLogo ? 'Logo da Loja' : 'Banner da Loja'}
            <Badge variant="secondary" className="ml-auto">
              Plano Superior
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className={`bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 ${
              isLogo ? 'w-32 h-32' : 'w-full h-32'
            }`}>
              <div className="text-center">
                <Camera size={32} className="text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  {isLogo ? 'Logo' : 'Banner'} não disponível
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {upgradeMessage}
                </p>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/5 rounded-lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          {isLogo ? 'Logo da Loja' : 'Banner da Loja'}
        </CardTitle>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Dimensões:</strong> {specifications.dimensions}</p>
          <p><strong>Formatos:</strong> {specifications.formats.join(', ')}</p>
          <p><strong>Tamanho máximo:</strong> {specifications.max_size}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current Image Display */}
          {displayUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className={`relative overflow-hidden rounded-lg border ${
                isLogo ? 'w-32 h-32' : 'w-full h-32'
              }`}>
                <img
                  src={displayUrl}
                  alt={isLogo ? 'Logo da loja' : 'Banner da loja'}
                  className={`object-cover ${isLogo ? 'w-full h-full' : 'w-full h-full'}`}
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
                
                {/* Remove button */}
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  onClick={handleRemove}
                  disabled={uploading}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Upload Area */}
          <AnimatePresence>
            {!displayUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative"
              >
                <div
                  className={`border-2 border-dashed rounded-lg transition-colors cursor-pointer ${
                    dragActive
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-300 hover:border-primary/50'
                  } ${isLogo ? 'w-32 h-32' : 'w-full h-32'}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={handleClick}
                >
                  <div className="flex flex-col items-center justify-center h-full p-4">
                    <AnimatePresence>
                      {uploading ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="text-center"
                        >
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Enviando...</p>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="text-center"
                        >
                          <Upload size={32} className="text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">
                            Clique ou arraste para {isLogo ? 'adicionar logo' : 'adicionar banner'}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {specifications.formats.join(', ')} • {specifications.max_size}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Upload Button */}
          {displayUrl && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={handleClick}
                disabled={uploading}
                className="flex-1"
              >
                <Upload className="h-4 w-4 mr-2" />
                Alterar {isLogo ? 'Logo' : 'Banner'}
              </Button>
            </motion.div>
          )}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileSelect(e.target.files[0]);
              }
            }}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
}; 