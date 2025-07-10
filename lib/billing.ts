import api from './api';
import {
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
  CreatePortalRequest,
  CreatePortalResponse,
  Subscription,
  Invoice,
} from '@/types/billing';

export const billingApi = {
  async createSubscription(data: CreateSubscriptionRequest): Promise<CreateSubscriptionResponse> {
    try {
      const response = await api.post<CreateSubscriptionResponse>('/billing/subscription', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async getSubscription(): Promise<{ success: boolean; data: { subscription?: Subscription } }> {
    try {
      const response = await api.get('/billing/subscription');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async createBillingPortal(data: CreatePortalRequest): Promise<CreatePortalResponse> {
    try {
      const response = await api.post<CreatePortalResponse>('/billing/portal', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async getInvoices(): Promise<{ success: boolean; data: { invoices: Invoice[] } }> {
    try {
      const response = await api.get('/billing/invoices');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },

  async cancelSubscription(): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.delete('/billing/subscription');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Erro de conexão' };
    }
  },
};