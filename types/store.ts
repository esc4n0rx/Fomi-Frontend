export interface StoreCustomization {
  cor_primaria: string;
  cor_secundaria: string;
  cor_texto: string;
  cor_fundo: string;
  fonte_titulo: string;
  fonte_texto: string;
}

export interface StoreBasicInfo {
  nome: string;
  descricao?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  endereco_cep?: string;
  endereco_rua?: string;
  endereco_numero?: string;
  endereco_complemento?: string;
  endereco_bairro?: string;
  endereco_cidade?: string;
  endereco_estado?: string;
}

export interface StoreData {
  id: string;
  nome: string;
  slug: string;
  descricao?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  endereco_cep?: string;
  endereco_rua?: string;
  endereco_numero?: string;
  endereco_complemento?: string;
  endereco_bairro?: string;
  endereco_cidade?: string;
  endereco_estado?: string;
  logo_url?: string | null;
  banner_url?: string | null;
  cor_primaria: string;
  cor_secundaria: string;
  cor_texto: string;
  cor_fundo: string;
  fonte_titulo: string;
  fonte_texto: string;
  plano: string;
  created_at: string;
  updated_at: string;
}

export interface CustomizationPermissions {
  logo_upload: boolean;
  banner_upload: boolean;
  custom_colors: boolean;
  custom_fonts: boolean;
  product_images: boolean;
  category_images: boolean;
}

export interface CustomizationLimits {
  stores: number;
  products_per_store: number;
  categories_per_store: number;
  promotions_active: number;
}

export interface ColorOption {
  name: string;
  key: string;
  description: string;
}

export interface ImageSpecifications {
  dimensions: string;
  formats: string[];
  max_size: string;
}

export interface ImageCustomization {
  available: boolean;
  current_url?: string;
  specifications: ImageSpecifications;
}

export interface AvailableCustomizations {
  colors: {
    available: boolean;
    current: {
      cor_primaria: string;
      cor_secundaria: string;
      cor_texto: string;
      cor_fundo: string;
    };
    options: ColorOption[];
  };
  fonts: {
    available: boolean;
    current: {
      fonte_titulo: string;
      fonte_texto: string;
    };
    options: string[];
  };
  images: {
    logo: ImageCustomization;
    banner: ImageCustomization;
  };
}

export interface CustomizationSettings {
  store: StoreData;
  user_plan: string;
  permissions: CustomizationPermissions;
  limits: CustomizationLimits;
  allowed_uploads: string[];
  available_customizations: AvailableCustomizations;
  upgrade_required: boolean;
  upgrade_messages: {
    banner_upload?: string;
    custom_colors?: string;
    custom_fonts?: string;
  };
}

export interface CustomizationTemplate {
  id: string;
  name: string;
  description: string;
  preview_image: string;
  available: boolean;
  customization: StoreCustomization;
}

export interface TemplatesResponse {
  templates: CustomizationTemplate[];
  user_plan: string;
  templates_available: boolean;
  upgrade_message?: string;
}

export interface ImageUploadSpecs {
  dimensions: {
    min_width: number;
    max_width: number;
    min_height: number;
    max_height: number;
    aspect_ratio: string;
  };
  file: {
    max_size: string;
    formats: string[];
    mime_types: string[];
  };
  cloudinary_transformations: {
    width: number;
    height: number;
    crop: string;
    quality: string;
    gravity?: string;
  };
}

export interface PlanPermissions {
  features: {
    logo_upload: boolean;
    banner_upload: boolean;
    custom_colors: boolean;
    custom_fonts: boolean;
    product_images: boolean;
    category_images: boolean;
  };
  allowed_uploads: string[];
  restrictions: Record<string, string>;
} 