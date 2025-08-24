import { useEffect, useRef, useState } from 'react';

export interface SSEEvent {
  type: string;
  event?: string;
  data?: any;
  message?: string;
  level?: string;
  timestamp?: string;
}

export function useSSE(storeId?: string, token?: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [events, setEvents] = useState<SSEEvent[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!storeId || !token) return;

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const url = `https://api.fomi-eats.shop/api/v1/sse/connect/${storeId}?token=${token}`;
    eventSourceRef.current = new EventSource(url);

    eventSourceRef.current.onmessage = (event) => {
      try {
        const data: SSEEvent = JSON.parse(event.data);
        if (data.type === 'connection_established') {
          setIsConnected(true);
        }
        setEvents((prev) => [...prev.slice(-49), data]); // Mantém últimos 50 eventos
      } catch (e) {
        // Ignora eventos malformados
      }
    };

    eventSourceRef.current.onerror = () => {
      setIsConnected(false);
    };

    return () => {
      eventSourceRef.current?.close();
    };
  }, [storeId, token]);

  return { isConnected, events };
} 