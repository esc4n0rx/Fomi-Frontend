"use client";

import { useState, useEffect } from 'react';
import { billingApi } from '@/lib/billing';
import { Subscription, Invoice } from '@/types/billing';
import { isValid, parseISO } from 'date-fns';

export function useBilling() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para validar e sanitizar dados de subscription
  const validateSubscriptionData = (sub: Subscription): Subscription => {
    // Validar datas essenciais
    const validateDate = (dateString: string | undefined): string => {
      if (!dateString) return new Date().toISOString();
      
      try {
        const date = parseISO(dateString);
        if (!isValid(date)) {
          console.warn(`Data inválida detectada: ${dateString}, usando data atual como fallback`);
          return new Date().toISOString();
        }
        return dateString;
      } catch (error) {
        console.error(`Erro ao validar data: ${dateString}`, error);
        return new Date().toISOString();
      }
    };

    return {
      ...sub,
      current_period_start: validateDate(sub.current_period_start),
      current_period_end: validateDate(sub.current_period_end),
      trial_end: sub.trial_end ? validateDate(sub.trial_end) : undefined,
      canceled_at: sub.canceled_at ? validateDate(sub.canceled_at) : undefined,
    };
  };

  // Função para validar e sanitizar dados de invoices
  const validateInvoicesData = (invoiceList: Invoice[]): Invoice[] => {
    return invoiceList.map(invoice => {
      const validateDate = (dateString: string): string => {
        try {
          const date = parseISO(dateString);
          if (!isValid(date)) {
            console.warn(`Data de fatura inválida: ${dateString}, usando data atual como fallback`);
            return new Date().toISOString();
          }
          return dateString;
        } catch (error) {
          console.error(`Erro ao validar data da fatura: ${dateString}`, error);
          return new Date().toISOString();
        }
      };

      return {
        ...invoice,
        period_start: validateDate(invoice.period_start),
        period_end: validateDate(invoice.period_end),
        due_date: validateDate(invoice.due_date),
        paid_at: invoice.paid_at ? validateDate(invoice.paid_at) : undefined,
        created_at: validateDate(invoice.created_at),
      };
    });
  };

  const fetchSubscription = async () => {
    try {
      setIsLoading(true);
      const response = await billingApi.getSubscription();
      
      if (response.data.subscription) {
        const validatedSubscription = validateSubscriptionData(response.data.subscription);
        setSubscription(validatedSubscription);
      } else {
        setSubscription(null);
      }
    } catch (err: any) {
      console.error('Erro ao buscar subscription:', err);
      setError(err.message);
      setSubscription(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await billingApi.getInvoices();
      const validatedInvoices = validateInvoicesData(response.data.invoices);
      setInvoices(validatedInvoices);
    } catch (err: any) {
      console.error('Erro ao buscar invoices:', err);
      setError(err.message);
      setInvoices([]);
    }
  };

  const createSubscription = async (plan: 'fomi_duplo' | 'fomi_supremo') => {
    try {
      const response = await billingApi.createSubscription({
        plan,
        success_url: `${window.location.origin}/billing/success`,
        cancel_url: `${window.location.origin}/billing/cancel`,
      });
      
      // Redirecionar para o checkout
      window.location.href = response.data.checkout_url;
    } catch (err: any) {
      console.error('Erro ao criar subscription:', err);
      setError(err.message);
      throw err;
    }
  };

  const openBillingPortal = async () => {
    try {
      const response = await billingApi.createBillingPortal({
        return_url: `${window.location.origin}/dashboard/settings`,
      });
      
      window.open(response.data.portal_url, '_blank');
    } catch (err: any) {
      console.error('Erro ao abrir portal de billing:', err);
      setError(err.message);
      throw err;
    }
  };

  const cancelSubscription = async () => {
    try {
      await billingApi.cancelSubscription();
      await fetchSubscription(); // Atualizar dados
    } catch (err: any) {
      console.error('Erro ao cancelar subscription:', err);
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchSubscription();
    fetchInvoices();
  }, []);

  return {
    subscription,
    invoices,
    isLoading,
    error,
    createSubscription,
    openBillingPortal,
    cancelSubscription,
    refetch: () => {
      fetchSubscription();
      fetchInvoices();
    },
  };
}