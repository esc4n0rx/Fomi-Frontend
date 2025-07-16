"use client"

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Eye, Palette, Type } from 'lucide-react';
import { StoreCustomization } from '@/types/store';

interface StorePreviewProps {
  storeName: string;
  storeDescription?: string;
  logoUrl?: string | null;
  bannerUrl?: string | null;
  customization: StoreCustomization;
  isPreview?: boolean;
  className?: string;
}

export const StorePreview = ({
  storeName,
  storeDescription,
  logoUrl,
  bannerUrl,
  customization,
  isPreview = false,
  className = ""
}: StorePreviewProps) => {
  const {
    cor_primaria,
    cor_secundaria,
    cor_texto,
    cor_fundo,
    fonte_titulo,
    fonte_texto
  } = customization;

  const previewStyle = {
    '--primary-color': cor_primaria,
    '--secondary-color': cor_secundaria,
    '--text-color': cor_texto,
    '--bg-color': cor_fundo,
    '--title-font': fonte_titulo,
    '--text-font': fonte_texto,
  } as React.CSSProperties;

  return (
    <Card className={`${className} overflow-hidden`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Smartphone className="h-5 w-5" />
          Preview da Loja
          {isPreview && (
            <Badge variant="secondary" className="ml-auto">
              Preview
            </Badge>
          )}
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Palette className="h-4 w-4" />
            <span>Cores</span>
          </div>
          <div className="flex items-center gap-1">
            <Type className="h-4 w-4" />
            <span>Fontes</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          {/* Mobile Frame */}
          <div className="mx-auto w-64 h-[500px] bg-gray-900 rounded-3xl p-2 shadow-2xl">
            <div 
              className="w-full h-full bg-white rounded-2xl overflow-hidden relative"
              style={previewStyle}
            >
              {/* Status Bar */}
              <div className="h-6 bg-black text-white text-xs flex items-center justify-between px-4">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-2 border border-white rounded-sm">
                    <div className="w-3 h-1 bg-white rounded-sm m-0.5" />
                  </div>
                  <div className="w-1 h-1 bg-white rounded-full" />
                  <div className="w-1 h-1 bg-white rounded-full" />
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>
              </div>

              {/* Header */}
              <div 
                className="relative h-32 overflow-hidden"
                style={{ backgroundColor: cor_primaria }}
              >
                {/* Banner */}
                {bannerUrl ? (
                  <img
                    src={bannerUrl}
                    alt="Banner da loja"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: cor_secundaria }}
                  >
                    <div className="text-center text-white">
                      <div className="text-2xl font-bold mb-1">🍕</div>
                      <div className="text-xs opacity-80">Banner da Loja</div>
                    </div>
                  </div>
                )}

                {/* Logo */}
                <div className="absolute bottom-2 left-2">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt="Logo da loja"
                      className="w-12 h-12 rounded-lg object-cover border-2 border-white shadow-lg"
                    />
                  ) : (
                    <div 
                      className="w-12 h-12 rounded-lg border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: cor_secundaria }}
                    >
                      {storeName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Store Info */}
                <div className="absolute bottom-2 right-2 text-right text-white">
                  <div 
                    className="font-bold text-sm"
                    style={{ fontFamily: fonte_titulo }}
                  >
                    {storeName}
                  </div>
                  {storeDescription && (
                    <div 
                      className="text-xs opacity-90"
                      style={{ fontFamily: fonte_texto }}
                    >
                      {storeDescription.length > 30 
                        ? `${storeDescription.substring(0, 30)}...` 
                        : storeDescription
                      }
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex border-b border-gray-200">
                <div 
                  className="flex-1 py-3 text-center text-sm font-medium"
                  style={{ 
                    color: cor_primaria,
                    fontFamily: fonte_titulo
                  }}
                >
                  Cardápio
                </div>
                <div 
                  className="flex-1 py-3 text-center text-sm text-gray-500"
                  style={{ fontFamily: fonte_texto }}
                >
                  Sobre
                </div>
                <div 
                  className="flex-1 py-3 text-center text-sm text-gray-500"
                  style={{ fontFamily: fonte_texto }}
                >
                  Contato
                </div>
              </div>

              {/* Content Area */}
              <div 
                className="p-4"
                style={{ 
                  backgroundColor: cor_fundo,
                  color: cor_texto,
                  fontFamily: fonte_texto
                }}
              >
                {/* Category Card */}
                <div className="mb-4">
                  <div 
                    className="text-lg font-bold mb-2"
                    style={{ 
                      color: cor_primaria,
                      fontFamily: fonte_titulo
                    }}
                  >
                    Categorias
                  </div>
                  <div className="space-y-2">
                    <div 
                      className="p-3 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors cursor-pointer"
                      style={{ backgroundColor: cor_fundo }}
                    >
                      <div 
                        className="font-medium"
                        style={{ fontFamily: fonte_titulo }}
                      >
                        🍕 Pizzas
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        12 produtos disponíveis
                      </div>
                    </div>
                    <div 
                      className="p-3 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors cursor-pointer"
                      style={{ backgroundColor: cor_fundo }}
                    >
                      <div 
                        className="font-medium"
                        style={{ fontFamily: fonte_titulo }}
                      >
                        🥤 Bebidas
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        8 produtos disponíveis
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Card */}
                <div>
                  <div 
                    className="text-lg font-bold mb-2"
                    style={{ 
                      color: cor_primaria,
                      fontFamily: fonte_titulo
                    }}
                  >
                    Destaques
                  </div>
                  <div 
                    className="p-3 rounded-lg border border-gray-200"
                    style={{ backgroundColor: cor_fundo }}
                  >
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🍕</span>
                      </div>
                      <div className="flex-1">
                        <div 
                          className="font-medium"
                          style={{ fontFamily: fonte_titulo }}
                        >
                          Pizza Margherita
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Molho de tomate, mussarela, manjericão
                        </div>
                        <div 
                          className="text-lg font-bold mt-2"
                          style={{ color: cor_primaria }}
                        >
                          R$ 35,90
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-16 border-t border-gray-200 flex items-center justify-around"
                style={{ backgroundColor: cor_fundo }}
              >
                <div 
                  className="flex flex-col items-center"
                  style={{ color: cor_primaria }}
                >
                  <div className="text-xl">🏠</div>
                  <div 
                    className="text-xs mt-1"
                    style={{ fontFamily: fonte_texto }}
                  >
                    Início
                  </div>
                </div>
                <div 
                  className="flex flex-col items-center text-gray-500"
                  style={{ fontFamily: fonte_texto }}
                >
                  <div className="text-xl">📋</div>
                  <div className="text-xs mt-1">Cardápio</div>
                </div>
                <div 
                  className="flex flex-col items-center text-gray-500"
                  style={{ fontFamily: fonte_texto }}
                >
                  <div className="text-xl">🛒</div>
                  <div className="text-xs mt-1">Carrinho</div>
                </div>
                <div 
                  className="flex flex-col items-center text-gray-500"
                  style={{ fontFamily: fonte_texto }}
                >
                  <div className="text-xl">👤</div>
                  <div className="text-xs mt-1">Perfil</div>
                </div>
              </div>
            </div>
          </div>

          {/* Color Palette Preview */}
          <div className="mt-4 flex justify-center gap-2">
            <div 
              className="w-6 h-6 rounded-full border border-gray-300"
              style={{ backgroundColor: cor_primaria }}
              title="Cor Primária"
            />
            <div 
              className="w-6 h-6 rounded-full border border-gray-300"
              style={{ backgroundColor: cor_secundaria }}
              title="Cor Secundária"
            />
            <div 
              className="w-6 h-6 rounded-full border border-gray-300"
              style={{ backgroundColor: cor_texto }}
              title="Cor do Texto"
            />
            <div 
              className="w-6 h-6 rounded-full border border-gray-300"
              style={{ backgroundColor: cor_fundo }}
              title="Cor de Fundo"
            />
          </div>

          {/* Font Preview */}
          <div className="mt-3 text-center text-sm text-gray-600">
            <div className="flex justify-center gap-4">
              <span style={{ fontFamily: fonte_titulo }}>
                {fonte_titulo}
              </span>
              <span style={{ fontFamily: fonte_texto }}>
                {fonte_texto}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 