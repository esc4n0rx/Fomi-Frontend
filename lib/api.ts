import axios from 'axios';
import { LoginRequest, RegisterRequest, AuthResponse, ErrorResponse, User, CategoryImageSettings, ProductImageSettings } from '@/types/auth';
import { Coupon, CreateCouponRequest, UpdateCouponRequest, ValidateCouponRequest, CouponFilters } from '@/types/coupons';
import { Order, OrderFilters, OrderStatistics, UpdateOrderStatusRequest, AddOrderNoteRequest } from '@/types/orders';

const API_BASE_URL = 'https://api.fomi-eats.shop/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async me(): Promise<{ success: boolean; data: { user: User } }> {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async checkCep(cep: string): Promise<any> {
    try {
      const cleanCep = cep.replace(/\D/g, '');
      const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);
      return response.data;
    } catch (error) {
      throw new Error('CEP não encontrado');
    }
  }
};

export const storeApi = {
  async createStore(data: {
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
    cor_primaria?: string;
    cor_secundaria?: string;
  }): Promise<{ success: boolean; data: any }> {
    try {
      console.log('Criando loja com dados:', data);
      const response = await api.post('/stores', data);
      console.log('Resposta da criação da loja:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Erro na API ao criar loja:', error);
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async getStores(): Promise<{ success: boolean; data: { stores: any[] } }> {
    try {
      console.log('Buscando lojas do usuário...');
      const response = await api.get('/stores');
      console.log('Resposta da busca de lojas:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Erro na API ao buscar lojas:', error);
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async getStoreById(id: string): Promise<{ success: boolean; data: { store: any } }> {
    try {
      const response = await api.get(`/stores/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  }
};

export const categoriesApi = {
  async getCategories(storeId: string): Promise<{ success: boolean; data: { categories: any[] } }> {
    try {
      const response = await api.get(`/categories/${storeId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async createCategory(storeId: string, data: {
    nome: string;
    descricao?: string;
    cor?: string;
    ordem?: number;
  }): Promise<{ success: boolean; message: string; data: { category: any } }> {
    try {
      const response = await api.post(`/categories/${storeId}`, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async updateCategory(storeId: string, categoryId: string, data: {
    nome?: string;
    descricao?: string;
    cor?: string;
    ordem?: number;
  }): Promise<{ success: boolean; message: string; data: { category: any } }> {
    try {
      const response = await api.put(`/categories/${storeId}/${categoryId}`, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async deleteCategory(storeId: string, categoryId: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.delete(`/categories/${storeId}/${categoryId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async getCategory(storeId: string, categoryId: string): Promise<{ success: boolean; data: { category: any } }> {
    try {
      const response = await api.get(`/categories/${storeId}/${categoryId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async getImageSettings(storeId: string): Promise<{ success: boolean; data: CategoryImageSettings }> {
    try {
      const response = await api.get(`/categories/${storeId}/image-settings`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async uploadImage(storeId: string, categoryId: string, imageFile: File): Promise<{ success: boolean; message: string; data: { category: any; imagem_url: string } }> {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await api.post(`/categories/${storeId}/${categoryId}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async removeImage(storeId: string, categoryId: string): Promise<{ success: boolean; message: string; data: { category: any } }> {
    try {
      const response = await api.delete(`/categories/${storeId}/${categoryId}/image`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async reorderCategories(storeId: string, categories: Array<{ id: string; ordem: number }>): Promise<{ success: boolean; message: string; data: { categories: any[] } }> {
    try {
      const response = await api.patch(`/categories/${storeId}/reorder`, { categories });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  }
};

export const productsApi = {
  async getProducts(storeId: string, filters?: {
    category_id?: string;
    disponivel?: boolean;
    destaque?: boolean;
  }): Promise<{ success: boolean; data: { products: any[] } }> {
    try {
      const params = new URLSearchParams();
      if (filters?.category_id) params.append('category_id', filters.category_id);
      if (filters?.disponivel !== undefined) params.append('disponivel', filters.disponivel.toString());
      if (filters?.destaque !== undefined) params.append('destaque', filters.destaque.toString());
      
      const response = await api.get(`/products/${storeId}?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async createProduct(storeId: string, data: {
    nome: string;
    descricao?: string;
    preco: number;
    preco_promocional?: number;
    category_id?: string;
    ingredientes?: string[];
    alergicos?: string[];
    tempo_preparo_min?: number;
    disponivel?: boolean;
    destaque?: boolean;
    imagem_url?: string;
    ordem?: number;
  }): Promise<{ success: boolean; message: string; data: { product: any } }> {
    try {
      const response = await api.post(`/products/${storeId}`, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async updateProduct(storeId: string, productId: string, data: {
    nome?: string;
    descricao?: string;
    preco?: number;
    preco_promocional?: number;
    category_id?: string;
    ingredientes?: string[];
    alergicos?: string[];
    tempo_preparo_min?: number;
    disponivel?: boolean;
    destaque?: boolean;
    imagem_url?: string;
    ordem?: number;
  }): Promise<{ success: boolean; message: string; data: { product: any } }> {
    try {
      const response = await api.put(`/products/${storeId}/${productId}`, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async deleteProduct(storeId: string, productId: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.delete(`/products/${storeId}/${productId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async getProduct(storeId: string, productId: string): Promise<{ success: boolean; data: { product: any } }> {
    try {
      const response = await api.get(`/products/${storeId}/${productId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async getImageSettings(storeId: string): Promise<{ success: boolean; data: ProductImageSettings }> {
    try {
      const response = await api.get(`/products/${storeId}/image-settings`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async uploadMainImage(storeId: string, productId: string, imageFile: File): Promise<{ success: boolean; message: string; data: { product: any; imagem_url: string } }> {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await api.post(`/products/${storeId}/${productId}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async uploadExtraImage(storeId: string, productId: string, imageFile: File): Promise<{ success: boolean; message: string; data: { product: any; imagens_extras: string[] } }> {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await api.post(`/products/${storeId}/${productId}/extra-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async removeMainImage(storeId: string, productId: string): Promise<{ success: boolean; message: string; data: { product: any } }> {
    try {
      const response = await api.delete(`/products/${storeId}/${productId}/image`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async removeExtraImage(storeId: string, productId: string, imageIndex: number): Promise<{ success: boolean; message: string; data: { product: any } }> {
    try {
      const response = await api.delete(`/products/${storeId}/${productId}/extra-image/${imageIndex}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  }
};

export const couponsApi = {
  async getCoupons(storeId: string, filters?: CouponFilters): Promise<{ success: boolean; data: { coupons: Coupon[] } }> {
    try {
      const params = new URLSearchParams();
      if (filters?.ativo !== undefined) params.append('ativo', filters.ativo.toString());
      
      const response = await api.get(`/coupons/${storeId}?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async createCoupon(storeId: string, data: CreateCouponRequest): Promise<{ success: boolean; message: string; data: { coupon: Coupon } }> {
    try {
      const response = await api.post(`/coupons/${storeId}`, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async updateCoupon(storeId: string, couponId: string, data: UpdateCouponRequest): Promise<{ success: boolean; message: string; data: { coupon: Coupon } }> {
    try {
      const response = await api.put(`/coupons/${storeId}/${couponId}`, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async deleteCoupon(storeId: string, couponId: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.delete(`/coupons/${storeId}/${couponId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async validateCoupon(storeId: string, data: ValidateCouponRequest): Promise<{ success: boolean; message: string; data: { coupon: Coupon } }> {
    try {
      const response = await api.post(`/coupons/${storeId}/validate`, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  }
};

export const ordersApi = {
  async getOrders(storeId: string, filters?: OrderFilters): Promise<{ success: boolean; data: { orders: Order[]; pagination: any } }> {
    try {
      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status);
      if (filters?.data_inicio) params.append('data_inicio', filters.data_inicio);
      if (filters?.data_fim) params.append('data_fim', filters.data_fim);
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());
      
      const response = await api.get(`/orders/${storeId}?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async getOrder(storeId: string, orderId: string): Promise<{ success: boolean; data: { order: Order } }> {
    try {
      const response = await api.get(`/orders/${storeId}/${orderId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async updateOrderStatus(storeId: string, orderId: string, data: UpdateOrderStatusRequest): Promise<{ success: boolean; message: string; data: { order: Order } }> {
    try {
      const response = await api.patch(`/orders/${storeId}/${orderId}/status`, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async addOrderNote(storeId: string, orderId: string, data: AddOrderNoteRequest): Promise<{ success: boolean; message: string; data: { order: Order } }> {
    try {
      const response = await api.post(`/orders/${storeId}/${orderId}/notes`, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async getOrderStatistics(storeId: string, filters?: {
    data_inicio?: string;
    data_fim?: string;
  }): Promise<{ success: boolean; data: { statistics: OrderStatistics } }> {
    try {
      const params = new URLSearchParams();
      if (filters?.data_inicio) params.append('data_inicio', filters.data_inicio);
      if (filters?.data_fim) params.append('data_fim', filters.data_fim);
      
      const response = await api.get(`/orders/${storeId}/statistics?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  }
};

// Store Customization API functions
export const storeCustomizationAPI = {
  // Get store data
  async getStoreData(storeId: string): Promise<{ success: boolean; data: { store: any } }> {
    try {
      const response = await api.get(`/stores/${storeId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  // Get customization settings
  async getCustomizationSettings(storeId: string): Promise<{ success: boolean; data: any }> {
    try {
      const response = await api.get(`/stores/${storeId}/customization-settings`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  // Update basic info
  async updateBasicInfo(storeId: string, data: any): Promise<{ success: boolean; data: { store: any } }> {
    try {
      const response = await api.put(`/stores/${storeId}`, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  // Update customization
  async updateCustomization(storeId: string, data: any): Promise<{ success: boolean; data: { store: any } }> {
    try {
      const response = await api.patch(`/stores/${storeId}/customization`, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  // Upload logo
  async uploadLogo(storeId: string, file: File): Promise<{ success: boolean; data: { store: any; logo_url: string } }> {
    try {
      const formData = new FormData();
      formData.append('logo', file);

      const response = await api.post(`/stores/${storeId}/logo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  // Upload banner
  async uploadBanner(storeId: string, file: File): Promise<{ success: boolean; data: { store: any; banner_url: string } }> {
    try {
      const formData = new FormData();
      formData.append('banner', file);

      const response = await api.post(`/stores/${storeId}/banner`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  // Remove logo
  async removeLogo(storeId: string): Promise<{ success: boolean; data: { store: any } }> {
    try {
      const response = await api.delete(`/stores/${storeId}/logo`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  // Remove banner
  async removeBanner(storeId: string): Promise<{ success: boolean; data: { store: any } }> {
    try {
      const response = await api.delete(`/stores/${storeId}/banner`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  // Get templates
  async getTemplates(storeId: string): Promise<{ success: boolean; data: any }> {
    try {
      const response = await api.get(`/stores/${storeId}/customization-templates`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  // Apply template
  async applyTemplate(storeId: string, templateId: string): Promise<{ success: boolean; data: { store: any } }> {
    try {
      const response = await api.post(`/stores/${storeId}/apply-template`, { templateId });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  // Preview customization
  async previewCustomization(storeId: string, data: any): Promise<{ success: boolean; data: { preview: any } }> {
    try {
      const response = await api.post(`/stores/${storeId}/preview-customization`, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  // Reset customization
  async resetCustomization(storeId: string): Promise<{ success: boolean; data: { store: any } }> {
    try {
      const response = await api.post(`/stores/${storeId}/reset-customization`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },
};

export default api;