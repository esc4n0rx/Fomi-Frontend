import { useState, useEffect } from 'react';
import { couponsApi } from '@/lib/api';
import { Coupon, CreateCouponRequest, UpdateCouponRequest, CouponFilters } from '@/types/coupons';
import { useAuth } from './useAuth';

export const useCoupons = (filters?: CouponFilters) => {
  const { store } = useAuth();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCoupons = async () => {
    if (!store?.id) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const response = await couponsApi.getCoupons(store.id, filters);
      setCoupons(response.data.coupons);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar cupons');
      console.error('Erro ao buscar cupons:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createCoupon = async (data: CreateCouponRequest) => {
    if (!store?.id) throw new Error('Loja não encontrada');
    
    try {
      const response = await couponsApi.createCoupon(store.id, data);
      await fetchCoupons(); // Recarregar lista
      return response.data.coupon;
    } catch (err: any) {
      throw err;
    }
  };

  const updateCoupon = async (couponId: string, data: UpdateCouponRequest) => {
    if (!store?.id) throw new Error('Loja não encontrada');
    
    try {
      const response = await couponsApi.updateCoupon(store.id, couponId, data);
      await fetchCoupons(); // Recarregar lista
      return response.data.coupon;
    } catch (err: any) {
      throw err;
    }
  };

  const deleteCoupon = async (couponId: string) => {
    if (!store?.id) throw new Error('Loja não encontrada');
    
    try {
      await couponsApi.deleteCoupon(store.id, couponId);
      await fetchCoupons(); // Recarregar lista
    } catch (err: any) {
      throw err;
    }
  };

  const toggleCouponStatus = async (couponId: string, ativo: boolean) => {
    return updateCoupon(couponId, { ativo });
  };

  useEffect(() => {
    fetchCoupons();
  }, [store?.id, filters]);

  return {
    coupons,
    isLoading,
    error,
    fetchCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    toggleCouponStatus,
  };
}; 