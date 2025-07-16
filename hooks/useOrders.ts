import { useState, useEffect, useCallback, useRef } from 'react';
import { ordersApi } from '@/lib/api';
import { Order, OrderFilters, OrderStatistics } from '@/types/orders';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export const useOrders = (filters?: OrderFilters) => {
  const { store } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [statistics, setStatistics] = useState<OrderStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchOrders = useCallback(async () => {
    if (!store?.id) {
      console.log('useOrders: Store ID não disponível, pulando busca de pedidos');
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      console.log('useOrders: Buscando pedidos para store:', store.id, 'filtros:', filters);
      const response = await ordersApi.getOrders(store.id, filters);
      console.log('useOrders: Resposta da API:', response);
      
      // Verificar se a resposta tem a estrutura esperada
      if (response.success && response.data) {
        setOrders(response.data.orders || []);
        setPagination(response.data.pagination);
      } else {
        console.error('useOrders: Estrutura de resposta inesperada:', response);
        setOrders([]);
        setError('Estrutura de resposta inesperada da API');
      }
    } catch (err: any) {
      console.error('useOrders: Erro ao buscar pedidos:', err);
      setError(err.message || 'Erro ao carregar pedidos');
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, [store?.id, filters]);

  const fetchStatistics = useCallback(async () => {
    if (!store?.id) {
      console.log('useOrders: Store ID não disponível, pulando busca de estatísticas');
      return;
    }
    
    try {
      console.log('useOrders: Buscando estatísticas para store:', store.id);
      const response = await ordersApi.getOrderStatistics(store.id, {
        data_inicio: filters?.data_inicio,
        data_fim: filters?.data_fim
      });
      console.log('useOrders: Estatísticas recebidas:', response);
      
      // Verificar se a resposta tem a estrutura esperada
      if (response.success && response.data) {
        setStatistics(response.data.statistics);
      } else {
        console.error('useOrders: Estrutura de estatísticas inesperada:', response);
        // Não definir erro para estatísticas, apenas log
      }
    } catch (err: any) {
      console.error('useOrders: Erro ao buscar estatísticas:', err);
      // Não definir erro para estatísticas, apenas log
    }
  }, [store?.id, filters?.data_inicio, filters?.data_fim]);

  const updateOrderStatus = async (orderId: string, status: string, motivo_cancelamento?: string) => {
    if (!store?.id) throw new Error('Loja não encontrada');
    
    try {
      const response = await ordersApi.updateOrderStatus(store.id, orderId, {
        status,
        motivo_cancelamento
      });
      
      // Atualizar o pedido na lista
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status: status as Order['status'] }
          : order
      ));
      
      // Recarregar estatísticas
      await fetchStatistics();
      
      return response.data.order;
    } catch (err: any) {
      throw err;
    }
  };

  const addOrderNote = async (orderId: string, observacao: string) => {
    if (!store?.id) throw new Error('Loja não encontrada');
    
    try {
      const response = await ordersApi.addOrderNote(store.id, orderId, { observacao });
      
      // Atualizar o pedido na lista
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, observacoes: response.data.order.observacoes }
          : order
      ));
      
      return response.data.order;
    } catch (err: any) {
      throw err;
    }
  };

  const getOrder = async (orderId: string) => {
    if (!store?.id) throw new Error('Loja não encontrada');
    
    try {
      const response = await ordersApi.getOrder(store.id, orderId);
      return response.data.order;
    } catch (err: any) {
      throw err;
    }
  };

  // Função para simular atualizações em tempo real
  const startRealTimeUpdates = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Atualizar a cada 30 segundos
    intervalRef.current = setInterval(() => {
      fetchOrders();
      fetchStatistics();
    }, 30000);
  }, [fetchOrders, fetchStatistics]);

  const stopRealTimeUpdates = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Função para atualização manual
  const refresh = useCallback(async () => {
    await Promise.all([fetchOrders(), fetchStatistics()]);
    toast.success('Pedidos atualizados!');
  }, [fetchOrders, fetchStatistics]);

  useEffect(() => {
    console.log('useOrders: useEffect - store mudou:', store?.id);
    if (store?.id) {
      fetchOrders();
      fetchStatistics();
    } else {
      // Se não há store, limpar dados e parar loading
      setOrders([]);
      setStatistics(null);
      setIsLoading(false);
      setError(null);
    }
  }, [store?.id]); // Removido fetchOrders e fetchStatistics das dependências

  useEffect(() => {
    // Iniciar atualizações em tempo real quando a página estiver ativa
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopRealTimeUpdates();
      } else {
        startRealTimeUpdates();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Só iniciar atualizações em tempo real se tiver store
    if (store?.id) {
      startRealTimeUpdates();
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopRealTimeUpdates();
    };
  }, [store?.id]); // Removido startRealTimeUpdates e stopRealTimeUpdates das dependências

  // Limpar intervalo quando o componente for desmontado
  useEffect(() => {
    return () => {
      stopRealTimeUpdates();
    };
  }, [stopRealTimeUpdates]);

  return {
    orders,
    statistics,
    isLoading,
    error,
    pagination,
    fetchOrders,
    fetchStatistics,
    updateOrderStatus,
    addOrderNote,
    getOrder,
    refresh,
    startRealTimeUpdates,
    stopRealTimeUpdates,
  };
}; 