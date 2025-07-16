"use client"

import { useState, useEffect } from 'react';
import { SidebarMenu } from "@/components/sidebar-menu";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Store, 
  Palette, 
  Type, 
  Camera, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock,
  Save,
  RotateCcw,
  Eye,
  Sparkles,
  Crown,
  AlertCircle
} from "lucide-react";
import { useStoreCustomization } from "@/hooks/useStoreCustomization";
import { StoreImageUpload } from "@/components/store-image-upload";
import { StorePreview } from "@/components/store-preview";
import { ColorPicker } from "@/components/color-picker";
import { FontSelector } from "@/components/font-selector";
// import { CustomizationTemplates } from "@/components/customization-templates";
import { toast } from "@/hooks/use-toast";

export default function StorePage() {
  const {
    store,
    settings,
    templates,
    loading,
    loadingSettings,
    loadingTemplates,
    saving,
    uploading,
    basicInfo,
    customization,
    previewCustomization,
    loadStore,
    loadSettings,
    loadTemplates,
    updateBasicInfo,
    updateCustomization,
    uploadLogo,
    uploadBanner,
    removeLogo,
    removeBanner,
    applyTemplate,
    previewCustomizationChanges,
    resetCustomization,
    hasPermission,
    getUpgradeMessage,
  } = useStoreCustomization();

  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState(basicInfo);
  const [customizationData, setCustomizationData] = useState(customization);

  // Update form data when store data loads
  useEffect(() => {
    console.log('StorePage - Dados da loja carregados:', store);
    console.log('StorePage - Dados básicos:', basicInfo);
    console.log('StorePage - Dados de customização:', customization);
    
    if (store) {
      const newFormData = {
        nome: store.nome || '',
        descricao: store.descricao || '',
        whatsapp: store.whatsapp || '',
        instagram: store.instagram || '',
        facebook: store.facebook || '',
        endereco_cep: store.endereco_cep || '',
        endereco_rua: store.endereco_rua || '',
        endereco_numero: store.endereco_numero || '',
        endereco_complemento: store.endereco_complemento || '',
        endereco_bairro: store.endereco_bairro || '',
        endereco_cidade: store.endereco_cidade || '',
        endereco_estado: store.endereco_estado || '',
      };
      
      const newCustomizationData = {
        cor_primaria: store.cor_primaria || '#FF6B35',
        cor_secundaria: store.cor_secundaria || '#F7931E',
        cor_texto: store.cor_texto || '#333333',
        cor_fundo: store.cor_fundo || '#FFFFFF',
        fonte_titulo: store.fonte_titulo || 'Roboto',
        fonte_texto: store.fonte_texto || 'Arial',
      };
      
      console.log('StorePage - Atualizando formulário:', { newFormData, newCustomizationData });
      setFormData(newFormData);
      setCustomizationData(newCustomizationData);
    }
  }, [store]);

  // Update customization data when customization changes
  useEffect(() => {
    console.log('StorePage - Customização atualizada:', customization);
    setCustomizationData(customization);
  }, [customization]);

  const handleBasicInfoChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCustomizationChange = (field: string, value: string) => {
    const newCustomization = { ...customizationData, [field]: value };
    setCustomizationData(newCustomization);
    
    // Generate preview in real-time
    previewCustomizationChanges(newCustomization);
  };

  const handleSaveBasicInfo = async () => {
    await updateBasicInfo(formData);
  };

  const handleSaveCustomization = async () => {
    await updateCustomization(customizationData);
  };

  const handlePreviewTemplate = (templateCustomization: any) => {
    setCustomizationData(templateCustomization);
    previewCustomizationChanges(templateCustomization);
  };

  const handleResetCustomization = async () => {
    if (confirm('Tem certeza que deseja resetar a personalização para os padrões?')) {
      await resetCustomization();
    }
  };

  const currentCustomization = previewCustomization || customizationData;
  const displayStore = {
    nome: store?.nome || formData.nome || 'Minha Loja',
    descricao: store?.descricao || formData.descricao || '',
    logo_url: store?.logo_url || undefined,
    banner_url: store?.banner_url || undefined,
  };

  // Verificar permissões
  const canCustomizeColors = hasPermission('custom_colors');
  const canCustomizeFonts = hasPermission('custom_fonts');
  const canUploadLogo = hasPermission('logo_upload');
  const canUploadBanner = hasPermission('banner_upload');

  console.log('StorePage - Permissões:', {
    canCustomizeColors,
    canCustomizeFonts,
    canUploadLogo,
    canUploadBanner,
    settings: settings?.permissions,
    userPlan: settings?.user_plan
  });

  if (loading || loadingSettings) {
    return (
      <div className="flex h-screen bg-gray-50">
        <SidebarMenu />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-gray-600">Carregando configurações da loja...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarMenu />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.header
          className="bg-white border-b border-gray-200 px-6 py-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Personalização da Loja</h1>
              <p className="text-gray-600">Configure a aparência e informações da sua loja</p>
            </div>

            <div className="flex items-center space-x-4">
              {store?.plano && (
                <Badge 
                  variant={store.plano === 'fomi_simples' ? 'secondary' : 'default'}
                  className="flex items-center gap-1"
                >
                  {store.plano === 'fomi_simples' ? (
                    <>
                      <Crown className="h-3 w-3" />
                      Plano Simples
                    </>
                  ) : store.plano === 'fomi_duplo' ? (
                    <>
                      <Crown className="h-3 w-3" />
                      Plano Duplo
                    </>
                  ) : (
                    <>
                      <Crown className="h-3 w-3" />
                      Plano Supremo
                    </>
                  )}
                </Badge>
              )}
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleResetCustomization}
                  disabled={saving || !canCustomizeColors}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Resetar
                </Button>
                <Button
                  onClick={handleSaveCustomization}
                  disabled={saving || !canCustomizeColors}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </div>
          </div>
        </motion.header>

        <main className="flex-1 overflow-auto p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Configuration */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Informações</TabsTrigger>
                  <TabsTrigger value="visual">Visual</TabsTrigger>
                  <TabsTrigger value="images">Imagens</TabsTrigger>
                </TabsList>

                {/* Basic Information Tab */}
                <TabsContent value="basic" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Store className="h-5 w-5" />
                          Informações Básicas
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="nome">Nome da Loja *</Label>
                          <Input
                            id="nome"
                            value={formData.nome}
                            onChange={(e) => handleBasicInfoChange('nome', e.target.value)}
                            placeholder="Ex: Lanchonete do João"
                          />
                        </div>

                        <div>
                          <Label htmlFor="descricao">Descrição</Label>
                          <Textarea
                            id="descricao"
                            value={formData.descricao}
                            onChange={(e) => handleBasicInfoChange('descricao', e.target.value)}
                            placeholder="Descreva sua loja..."
                            rows={3}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="whatsapp">WhatsApp</Label>
                            <Input
                              id="whatsapp"
                              value={formData.whatsapp}
                              onChange={(e) => handleBasicInfoChange('whatsapp', e.target.value)}
                              placeholder="(11) 99999-9999"
                            />
                          </div>
                          <div>
                            <Label htmlFor="instagram">Instagram</Label>
                            <Input
                              id="instagram"
                              value={formData.instagram}
                              onChange={(e) => handleBasicInfoChange('instagram', e.target.value)}
                              placeholder="@minhaloja"
                            />
                          </div>
                          <div>
                            <Label htmlFor="facebook">Facebook</Label>
                            <Input
                              id="facebook"
                              value={formData.facebook}
                              onChange={(e) => handleBasicInfoChange('facebook', e.target.value)}
                              placeholder="minhaloja"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="h-5 w-5" />
                          Endereço
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="cep">CEP</Label>
                            <Input
                              id="cep"
                              value={formData.endereco_cep}
                              onChange={(e) => handleBasicInfoChange('endereco_cep', e.target.value)}
                              placeholder="00000-000"
                            />
                          </div>
                          <div>
                            <Label htmlFor="estado">Estado</Label>
                            <Input
                              id="estado"
                              value={formData.endereco_estado}
                              onChange={(e) => handleBasicInfoChange('endereco_estado', e.target.value)}
                              placeholder="SP"
                              maxLength={2}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="rua">Rua</Label>
                          <Input
                            id="rua"
                            value={formData.endereco_rua}
                            onChange={(e) => handleBasicInfoChange('endereco_rua', e.target.value)}
                            placeholder="Rua das Flores"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="numero">Número</Label>
                            <Input
                              id="numero"
                              value={formData.endereco_numero}
                              onChange={(e) => handleBasicInfoChange('endereco_numero', e.target.value)}
                              placeholder="123"
                            />
                          </div>
                          <div>
                            <Label htmlFor="complemento">Complemento</Label>
                            <Input
                              id="complemento"
                              value={formData.endereco_complemento}
                              onChange={(e) => handleBasicInfoChange('endereco_complemento', e.target.value)}
                              placeholder="Sala 1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="bairro">Bairro</Label>
                            <Input
                              id="bairro"
                              value={formData.endereco_bairro}
                              onChange={(e) => handleBasicInfoChange('endereco_bairro', e.target.value)}
                              placeholder="Centro"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="cidade">Cidade</Label>
                          <Input
                            id="cidade"
                            value={formData.endereco_cidade}
                            onChange={(e) => handleBasicInfoChange('endereco_cidade', e.target.value)}
                            placeholder="São Paulo"
                          />
                        </div>

                        <Button onClick={handleSaveBasicInfo} disabled={saving} className="w-full">
                          <Save className="h-4 w-4 mr-2" />
                          {saving ? 'Salvando...' : 'Salvar Informações'}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                {/* Visual Customization Tab */}
                <TabsContent value="visual" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {!canCustomizeColors && (
                      <Card className="border-orange-200 bg-orange-50">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-2 text-orange-800 mb-2">
                            <AlertCircle className="h-5 w-5" />
                            <span className="font-medium">Personalização não disponível</span>
                          </div>
                          <p className="text-orange-700 text-sm">
                            {getUpgradeMessage('custom_colors') || 'Faça upgrade do seu plano para personalizar as cores da sua loja'}
                          </p>
                        </CardContent>
                      </Card>
                    )}

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Palette className="h-5 w-5" />
                          Cores da Loja
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                          Personalize as cores principais da sua loja
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <ColorPicker
                            value={customizationData.cor_primaria}
                            onChange={(color) => handleCustomizationChange('cor_primaria', color)}
                            label="Cor Primária"
                            description="Cor principal da loja (botões, links, destaques)"
                            disabled={!canCustomizeColors}
                          />
                          
                          <ColorPicker
                            value={customizationData.cor_secundaria}
                            onChange={(color) => handleCustomizationChange('cor_secundaria', color)}
                            label="Cor Secundária"
                            description="Cor para elementos secundários e gradientes"
                            disabled={!canCustomizeColors}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <ColorPicker
                            value={customizationData.cor_texto}
                            onChange={(color) => handleCustomizationChange('cor_texto', color)}
                            label="Cor do Texto"
                            description="Cor principal dos textos da loja"
                            disabled={!canCustomizeColors}
                          />
                          
                          <ColorPicker
                            value={customizationData.cor_fundo}
                            onChange={(color) => handleCustomizationChange('cor_fundo', color)}
                            label="Cor de Fundo"
                            description="Cor de fundo principal da loja"
                            disabled={!canCustomizeColors}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Type className="h-5 w-5" />
                          Fontes da Loja
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                          Escolha as fontes para títulos e textos
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FontSelector
                            value={customizationData.fonte_titulo}
                            onChange={(font) => handleCustomizationChange('fonte_titulo', font)}
                            label="Fonte dos Títulos"
                            description="Fonte usada em títulos, cabeçalhos e destaques"
                            disabled={!canCustomizeFonts}
                          />
                          
                          <FontSelector
                            value={customizationData.fonte_texto}
                            onChange={(font) => handleCustomizationChange('fonte_texto', font)}
                            label="Fonte do Texto"
                            description="Fonte usada em textos, descrições e conteúdo"
                            disabled={!canCustomizeFonts}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                {/* Images Tab */}
                <TabsContent value="images" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="space-y-6"
                  >
                    <StoreImageUpload
                      type="logo"
                      currentUrl={store?.logo_url || undefined}
                      onUpload={uploadLogo}
                      onRemove={removeLogo}
                      uploading={uploading}
                      hasPermission={canUploadLogo}
                      upgradeMessage={getUpgradeMessage('logo_upload') || undefined}
                      specifications={{
                        dimensions: "100x100 até 512x512px",
                        formats: ["JPEG", "PNG", "WebP"],
                        max_size: "2MB"
                      }}
                    />

                    <StoreImageUpload
                      type="banner"
                      currentUrl={store?.banner_url || undefined}
                      onUpload={uploadBanner}
                      onRemove={removeBanner}
                      uploading={uploading}
                      hasPermission={canUploadBanner}
                      upgradeMessage={getUpgradeMessage('banner_upload') || undefined}
                      specifications={{
                        dimensions: "800x200 até 1920x600px",
                        formats: ["JPEG", "PNG", "WebP"],
                        max_size: "5MB"
                      }}
                    />
                  </motion.div>
                </TabsContent>

                {/* Templates Tab - Temporariamente desabilitado */}
                {/* <TabsContent value="templates" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <CustomizationTemplates
                      templates={templates}
                      onApplyTemplate={applyTemplate}
                      onPreviewTemplate={handlePreviewTemplate}
                      loading={saving}
                      hasPermission={canCustomizeColors}
                      upgradeMessage={getUpgradeMessage('custom_colors')}
                    />
                  </motion.div>
                </TabsContent> */}
              </Tabs>
            </div>

            {/* Right Column - Preview */}
            <div className="lg:col-span-1">
              <motion.div
                className="sticky top-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <StorePreview
                  storeName={displayStore.nome}
                  storeDescription={displayStore.descricao}
                  logoUrl={displayStore.logo_url || undefined}
                  bannerUrl={displayStore.banner_url || undefined}
                  customization={currentCustomization}
                  isPreview={!!previewCustomization}
                />
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
