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

// Valores padrão para customização
const DEFAULT_CUSTOMIZATION: StoreCustomization = {
  cor_primaria: '#FF6B35',
  cor_secundaria: '#F7931E',
  cor_texto: '#333333',
  cor_fundo: '#FFFFFF',
  fonte_titulo: 'Roboto',
  fonte_texto: 'Arial',
};

// Valores padrão para informações básicas
const DEFAULT_BASIC_INFO: StoreBasicInfo = {
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
};

export const useStoreCustomization = (): UseStoreCustomizationReturn => {
  const { user, store: authStore } = useAuth();
  const [store, setStore] = useState<StoreData | null>(null);
  const [settings, setSettings] = useState<CustomizationSettings | null>(null);
  const [templates, setTemplates] = useState<CustomizationTemplate[]>([]);
  
  // Loading states
  const [loading, setLoading] = useState(false);
  const [loadingSettings, setLoadingSettings] = useState(false);
  const [loadingTemplates, setLoadingTemplates] = useState(false); // Mantido para compatibilidade
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Form data
  const [basicInfo, setBasicInfo] = useState<StoreBasicInfo>(DEFAULT_BASIC_INFO);
  const [customization, setCustomization] = useState<StoreCustomization>(DEFAULT_CUSTOMIZATION);
  const [previewCustomization, setPreviewCustomization] = useState<StoreCustomization | null>(null);

  // Load store data
  const loadStore = useCallback(async () => {
    if (!authStore?.id) return;
    
    setLoading(true);
    try {
      console.log('Carregando dados da loja:', authStore.id);
      const response = await storeCustomizationAPI.getStoreData(authStore.id);
      console.log('Resposta da API - dados da loja:', response);
      
      if (response.success && response.data?.store) {
        const storeData = response.data.store;
        setStore(storeData);
        
        // Atualizar dados do formulário com os dados da loja
        const newBasicInfo: StoreBasicInfo = {
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
        };
        
        const newCustomization: StoreCustomization = {
          cor_primaria: storeData.cor_primaria || DEFAULT_CUSTOMIZATION.cor_primaria,
          cor_secundaria: storeData.cor_secundaria || DEFAULT_CUSTOMIZATION.cor_secundaria,
          cor_texto: storeData.cor_texto || DEFAULT_CUSTOMIZATION.cor_texto,
          cor_fundo: storeData.cor_fundo || DEFAULT_CUSTOMIZATION.cor_fundo,
          fonte_titulo: storeData.fonte_titulo || DEFAULT_CUSTOMIZATION.fonte_titulo,
          fonte_texto: storeData.fonte_texto || DEFAULT_CUSTOMIZATION.fonte_texto,
        };
        
        console.log('Atualizando dados do formulário:', { newBasicInfo, newCustomization });
        setBasicInfo(newBasicInfo);
        setCustomization(newCustomization);
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
  }, [authStore?.id]);

  // Load customization settings
  const loadSettings = useCallback(async () => {
    if (!authStore?.id) return;
    
    setLoadingSettings(true);
    try {
      console.log('Carregando configurações de customização:', authStore.id);
      const response = await storeCustomizationAPI.getCustomizationSettings(authStore.id);
      console.log('Resposta da API - configurações:', response);
      
      if (response.success && response.data) {
        setSettings(response.data);
        
        // Se não temos dados da loja ainda, usar os dados das configurações
        if (!store && response.data.store) {
          const storeData = response.data.store;
          setStore(storeData);
          
          // Atualizar dados do formulário
          const newBasicInfo: StoreBasicInfo = {
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
          };
          
          const newCustomization: StoreCustomization = {
            cor_primaria: storeData.cor_primaria || DEFAULT_CUSTOMIZATION.cor_primaria,
            cor_secundaria: storeData.cor_secundaria || DEFAULT_CUSTOMIZATION.cor_secundaria,
            cor_texto: storeData.cor_texto || DEFAULT_CUSTOMIZATION.cor_texto,
            cor_fundo: storeData.cor_fundo || DEFAULT_CUSTOMIZATION.cor_fundo,
            fonte_titulo: storeData.fonte_titulo || DEFAULT_CUSTOMIZATION.fonte_titulo,
            fonte_texto: storeData.fonte_texto || DEFAULT_CUSTOMIZATION.fonte_texto,
          };
          
          console.log('Atualizando dados do formulário via configurações:', { newBasicInfo, newCustomization });
          setBasicInfo(newBasicInfo);
          setCustomization(newCustomization);
        }
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
  }, [authStore?.id, store]);

  // Load templates - Removido temporariamente para evitar erro 404
  const loadTemplates = useCallback(async () => {
    // Função vazia para manter compatibilidade
    // Templates serão implementados posteriormente
  }, []);

  // Update basic info
  const updateBasicInfo = useCallback(async (data: StoreBasicInfo) => {
    if (!authStore?.id) return;
    
    setSaving(true);
    try {
      const response = await storeCustomizationAPI.updateBasicInfo(authStore.id, data);
      if (response.success && response.data?.store) {
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
  }, [authStore?.id]);

  // Update customization
  const updateCustomization = useCallback(async (data: StoreCustomization) => {
    if (!authStore?.id) return;
    
    setSaving(true);
    try {
      const response = await storeCustomizationAPI.updateCustomization(authStore.id, data);
      if (response.success && response.data?.store) {
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
  }, [authStore?.id]);

  // Upload logo
  const uploadLogo = useCallback(async (file: File) => {
    if (!authStore?.id) return;
    
    setUploading(true);
    try {
      const response = await storeCustomizationAPI.uploadLogo(authStore.id, file);
      if (response.success && response.data?.store) {
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
  }, [authStore?.id]);

  // Upload banner
  const uploadBanner = useCallback(async (file: File) => {
    if (!authStore?.id) return;
    
    setUploading(true);
    try {
      const response = await storeCustomizationAPI.uploadBanner(authStore.id, file);
      if (response.success && response.data?.store) {
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
  }, [authStore?.id]);

  // Remove logo
  const removeLogo = useCallback(async () => {
    if (!authStore?.id) return;
    
    setUploading(true);
    try {
      const response = await storeCustomizationAPI.removeLogo(authStore.id);
      if (response.success && response.data?.store) {
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
  }, [authStore?.id]);

  // Remove banner
  const removeBanner = useCallback(async () => {
    if (!authStore?.id) return;
    
    setUploading(true);
    try {
      const response = await storeCustomizationAPI.removeBanner(authStore.id);
      if (response.success && response.data?.store) {
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
  }, [authStore?.id]);

  // Apply template - Removido temporariamente para evitar erro 404
  const applyTemplate = useCallback(async (templateId: string) => {
    // Função vazia para manter compatibilidade
    // Templates serão implementados posteriormente
    console.log('Templates temporariamente desabilitados');
  }, []);

  // Preview customization - Simplificado para evitar chamadas à API
  const previewCustomizationChanges = useCallback(async (data: Partial<StoreCustomization>) => {
    // Preview local sem chamada à API
    setPreviewCustomization(data as StoreCustomization);
  }, []);

  // Reset customization - Simplificado para usar valores padrão locais
  const resetCustomization = useCallback(async () => {
    setSaving(true);
    try {
      // Reset para valores padrão locais
      setCustomization(DEFAULT_CUSTOMIZATION);
      setPreviewCustomization(null);
      toast({
        title: "Sucesso",
        description: "Personalização resetada para padrões",
      });
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
  }, []);

  // Check permissions - Melhorada para verificar corretamente as permissões
  const hasPermission = useCallback((feature: keyof CustomizationSettings['permissions']): boolean => {
    // Se não temos configurações carregadas, assumir que tem permissão (carregamento inicial)
    if (!settings) {
      console.log(`Permissão ${feature}: Configurações não carregadas, assumindo true`);
      return true;
    }
    
    const hasPermission = settings.permissions?.[feature] || false;
    console.log(`Permissão ${feature}:`, hasPermission, 'Plano:', settings.user_plan);
    return hasPermission;
  }, [settings]);

  // Get upgrade message
  const getUpgradeMessage = useCallback((feature: string): string | null => {
    return settings?.upgrade_messages?.[feature as keyof typeof settings.upgrade_messages] || null;
  }, [settings]);

  // Load data on mount
  useEffect(() => {
    if (authStore?.id) {
      console.log('Iniciando carregamento de dados da loja:', authStore.id);
      loadStore();
      loadSettings();
      // Removido loadTemplates() para evitar erro 404
    }
  }, [authStore?.id, loadStore, loadSettings]);

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