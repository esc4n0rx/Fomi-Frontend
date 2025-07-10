"use client";

import { useState, useEffect } from 'react';
import { billingApi } from '@/lib/billing';
import { Subscription, Invoice } from '@/types/billing';

export function useBilling() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = async () => {
    try {
      setIsLoading(true);
      const response = await billingApi.getSubscription();
      setSubscription(response.data.subscription || null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await billingApi.getInvoices();
      setInvoices(response.data.invoices);
    } catch (err: any) {
      setError(err.message);
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
      setError(err.message);
      throw err;
    }
  };

  const cancelSubscription = async () => {
    try {
      await billingApi.cancelSubscription();
      await fetchSubscription(); // Atualizar dados
    } catch (err: any) {
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