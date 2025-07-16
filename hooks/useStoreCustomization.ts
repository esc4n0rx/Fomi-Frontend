import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { storeCustomizationAPI } from '@/lib/api';
import { 
  StoreData, 
  StoreCustomization, 
  StoreBasicInfo, 
  CustomizationSettings,
  CustomizationTemplate 
} from '@/types/store';
import { toast } from '@/hooks/use-toast';

interface UseStoreCustomizationReturn {
  // Data
  store: StoreData | null;
  settings: CustomizationSettings | null;
  templates: CustomizationTemplate[];
  
  // Loading states
  loading: boolean;
  loadingSettings: boolean;
  loadingTemplates: boolean;
  saving: boolean;
  uploading: boolean;
  
  // Form data
  basicInfo: StoreBasicInfo;
  customization: StoreCustomization;
  previewCustomization: StoreCustomization | null;
  
  // Actions
  loadStore: () => Promise<void>;
  loadSettings: () => Promise<void>;
  loadTemplates: () => Promise<void>;
  updateBasicInfo: (data: StoreBasicInfo) => Promise<void>;
  updateCustomization: (data: StoreCustomization) => Promise<void>;
  uploadLogo: (file: File) => Promise<void>;
  uploadBanner: (file: File) => Promise<void>;
  removeLogo: () => Promise<void>;
  removeBanner: () => Promise<void>;
  applyTemplate: (templateId: string) => Promise<void>;
  previewCustomizationChanges: (data: Partial<StoreCustomization>) => Promise<void>;
  resetCustomization: () => Promise<void>;
  
  // Utilities
  hasPermission: (feature: keyof CustomizationSettings['permissions']) => boolean;
  getUpgradeMessage: (feature: string) => string | null;
}

export const useStoreCustomization = (): UseStoreCustomizationReturn => {
  const { user } = useAuth();
  const [store, setStore] = useState<StoreData | null>(null);
  const [settings, setSettings] = useState<CustomizationSettings | null>(null);
  const [templates, setTemplates] = useState<CustomizationTemplate[]>([]);
  
  // Loading states
  const [loading, setLoading] = useState(false);
  const [loadingSettings, setLoadingSettings] = useState(false);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Form data
  const [basicInfo, setBasicInfo] = useState<StoreBasicInfo>({
    nome: '',
    descricao: '',
    whatsapp: '',
    instagram: '',
    facebook: '',
    endereco_cep: '',
    endereco_rua: '',
    endereco_numero: '',
    endereco_complemento: '',
    endereco_bairro: '',
    endereco_cidade: '',
    endereco_estado: '',
  });
  
  const [customization, setCustomization] = useState<StoreCustomization>({
    cor_primaria: '#FF6B35',
    cor_secundaria: '#F7931E',
    cor_texto: '#333333',
    cor_fundo: '#FFFFFF',
    fonte_titulo: 'Roboto',
    fonte_texto: 'Arial',
  });
  
  const [previewCustomization, setPreviewCustomization] = useState<StoreCustomization | null>(null);

  // Load store data
  const loadStore = useCallback(async () => {
    if (!user?.store_id) return;
    
    setLoading(true);
    try {
      const response = await storeCustomizationAPI.getStoreData(user.store_id);
      if (response.success) {
        const storeData = response.data.store;
        setStore(storeData);
        
        // Update form data
        setBasicInfo({
          nome: storeData.nome || '',
          descricao: storeData.descricao || '',
          whatsapp: storeData.whatsapp || '',
          instagram: storeData.instagram || '',
          facebook: storeData.facebook || '',
          endereco_cep: storeData.endereco_cep || '',
          endereco_rua: storeData.endereco_rua || '',
          endereco_numero: storeData.endereco_numero || '',
          endereco_complemento: storeData.endereco_complemento || '',
          endereco_bairro: storeData.endereco_bairro || '',
          endereco_cidade: storeData.endereco_cidade || '',
          endereco_estado: storeData.endereco_estado || '',
        });
        
        setCustomization({
          cor_primaria: storeData.cor_primaria || '#FF6B35',
          cor_secundaria: storeData.cor_secundaria || '#F7931E',
          cor_texto: storeData.cor_texto || '#333333',
          cor_fundo: storeData.cor_fundo || '#FFFFFF',
          fonte_titulo: storeData.fonte_titulo || 'Roboto',
          fonte_texto: storeData.fonte_texto || 'Arial',
        });
      }
    } catch (error: any) {
      console.error('Erro ao carregar dados da loja:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao carregar dados da loja",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user?.store_id]);

  // Load customization settings
  const loadSettings = useCallback(async () => {
    if (!user?.store_id) return;
    
    setLoadingSettings(true);
    try {
      const response = await storeCustomizationAPI.getCustomizationSettings(user.store_id);
      if (response.success) {
        setSettings(response.data);
      }
    } catch (error: any) {
      console.error('Erro ao carregar configurações:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao carregar configurações",
        variant: "destructive",
      });
    } finally {
      setLoadingSettings(false);
    }
  }, [user?.store_id]);

  // Load templates
  const loadTemplates = useCallback(async () => {
    if (!user?.store_id) return;
    
    setLoadingTemplates(true);
    try {
      const response = await storeCustomizationAPI.getTemplates(user.store_id);
      if (response.success) {
        setTemplates(response.data.templates || []);
      }
    } catch (error: any) {
      console.error('Erro ao carregar templates:', error);
      // Não mostrar toast para templates, pois pode não estar disponível
    } finally {
      setLoadingTemplates(false);
    }
  }, [user?.store_id]);

  // Update basic info
  const updateBasicInfo = useCallback(async (data: StoreBasicInfo) => {
    if (!user?.store_id) return;
    
    setSaving(true);
    try {
      const response = await storeCustomizationAPI.updateBasicInfo(user.store_id, data);
      if (response.success) {
        setStore(response.data.store);
        setBasicInfo(data);
        toast({
          title: "Sucesso",
          description: "Informações básicas atualizadas com sucesso",
        });
      }
    } catch (error: any) {
      console.error('Erro ao atualizar informações básicas:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar informações básicas",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }, [user?.store_id]);

  // Update customization
  const updateCustomization = useCallback(async (data: StoreCustomization) => {
    if (!user?.store_id) return;
    
    setSaving(true);
    try {
      const response = await storeCustomizationAPI.updateCustomization(user.store_id, data);
      if (response.success) {
        setStore(response.data.store);
        setCustomization(data);
        setPreviewCustomization(null);
        toast({
          title: "Sucesso",
          description: "Personalização atualizada com sucesso",
        });
      }
    } catch (error: any) {
      console.error('Erro ao atualizar personalização:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar personalização",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }, [user?.store_id]);

  // Upload logo
  const uploadLogo = useCallback(async (file: File) => {
    if (!user?.store_id) return;
    
    setUploading(true);
    try {
      const response = await storeCustomizationAPI.uploadLogo(user.store_id, file);
      if (response.success) {
        setStore(response.data.store);
        toast({
          title: "Sucesso",
          description: "Logo atualizado com sucesso",
        });
      }
    } catch (error: any) {
      console.error('Erro ao fazer upload do logo:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao fazer upload do logo",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }, [user?.store_id]);

  // Upload banner
  const uploadBanner = useCallback(async (file: File) => {
    if (!user?.store_id) return;
    
    setUploading(true);
    try {
      const response = await storeCustomizationAPI.uploadBanner(user.store_id, file);
      if (response.success) {
        setStore(response.data.store);
        toast({
          title: "Sucesso",
          description: "Banner atualizado com sucesso",
        });
      }
    } catch (error: any) {
      console.error('Erro ao fazer upload do banner:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao fazer upload do banner",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }, [user?.store_id]);

  // Remove logo
  const removeLogo = useCallback(async () => {
    if (!user?.store_id) return;
    
    setUploading(true);
    try {
      const response = await storeCustomizationAPI.removeLogo(user.store_id);
      if (response.success) {
        setStore(response.data.store);
        toast({
          title: "Sucesso",
          description: "Logo removido com sucesso",
        });
      }
    } catch (error: any) {
      console.error('Erro ao remover logo:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao remover logo",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }, [user?.store_id]);

  // Remove banner
  const removeBanner = useCallback(async () => {
    if (!user?.store_id) return;
    
    setUploading(true);
    try {
      const response = await storeCustomizationAPI.removeBanner(user.store_id);
      if (response.success) {
        setStore(response.data.store);
        toast({
          title: "Sucesso",
          description: "Banner removido com sucesso",
        });
      }
    } catch (error: any) {
      console.error('Erro ao remover banner:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao remover banner",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }, [user?.store_id]);

  // Apply template
  const applyTemplate = useCallback(async (templateId: string) => {
    if (!user?.store_id) return;
    
    setSaving(true);
    try {
      const response = await storeCustomizationAPI.applyTemplate(user.store_id, templateId);
      if (response.success) {
        const storeData = response.data.store;
        setStore(storeData);
        setCustomization({
          cor_primaria: storeData.cor_primaria,
          cor_secundaria: storeData.cor_secundaria,
          cor_texto: storeData.cor_texto,
          cor_fundo: storeData.cor_fundo,
          fonte_titulo: storeData.fonte_titulo,
          fonte_texto: storeData.fonte_texto,
        });
        setPreviewCustomization(null);
        toast({
          title: "Sucesso",
          description: "Template aplicado com sucesso",
        });
      }
    } catch (error: any) {
      console.error('Erro ao aplicar template:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao aplicar template",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }, [user?.store_id]);

  // Preview customization
  const previewCustomizationChanges = useCallback(async (data: Partial<StoreCustomization>) => {
    if (!user?.store_id) return;
    
    try {
      const response = await storeCustomizationAPI.previewCustomization(user.store_id, data);
      if (response.success) {
        setPreviewCustomization(response.data.preview);
      }
    } catch (error: any) {
      console.error('Erro ao gerar preview:', error);
      // Não mostrar toast para preview
    }
  }, [user?.store_id]);

  // Reset customization
  const resetCustomization = useCallback(async () => {
    if (!user?.store_id) return;
    
    setSaving(true);
    try {
      const response = await storeCustomizationAPI.resetCustomization(user.store_id);
      if (response.success) {
        const storeData = response.data.store;
        setStore(storeData);
        setCustomization({
          cor_primaria: storeData.cor_primaria,
          cor_secundaria: storeData.cor_secundaria,
          cor_texto: storeData.cor_texto,
          cor_fundo: storeData.cor_fundo,
          fonte_titulo: storeData.fonte_titulo,
          fonte_texto: storeData.fonte_texto,
        });
        setPreviewCustomization(null);
        toast({
          title: "Sucesso",
          description: "Personalização resetada para padrões",
        });
      }
    } catch (error: any) {
      console.error('Erro ao resetar personalização:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao resetar personalização",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }, [user?.store_id]);

  // Check permissions
  const hasPermission = useCallback((feature: keyof CustomizationSettings['permissions']): boolean => {
    return settings?.permissions?.[feature] || false;
  }, [settings]);

  // Get upgrade message
  const getUpgradeMessage = useCallback((feature: string): string | null => {
    return settings?.upgrade_messages?.[feature as keyof typeof settings.upgrade_messages] || null;
  }, [settings]);

  // Load data on mount
  useEffect(() => {
    if (user?.store_id) {
      loadStore();
      loadSettings();
      loadTemplates();
    }
  }, [user?.store_id, loadStore, loadSettings, loadTemplates]);

  return {
    // Data
    store,
    settings,
    templates,
    
    // Loading states
    loading,
    loadingSettings,
    loadingTemplates,
    saving,
    uploading,
    
    // Form data
    basicInfo,
    customization,
    previewCustomization,
    
    // Actions
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
    
    // Utilities
    hasPermission,
    getUpgradeMessage,
  };
}; 