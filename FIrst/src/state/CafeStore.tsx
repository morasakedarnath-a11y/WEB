import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CartLine } from '../domain/types';
import type { CafeService, CafeSnapshot } from '../services/contracts';

interface CafeContextValue {
  snapshot: CafeSnapshot | null;
  loading: boolean;
  cart: CartLine[];
  service: CafeService | null;
  addToCart: (line: CartLine) => void;
  updateCartQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  refresh: () => Promise<void>;
}

const emptyValue: CafeContextValue = {
  snapshot: null,
  loading: false,
  cart: [],
  service: null,
  addToCart: () => undefined,
  updateCartQuantity: () => undefined,
  clearCart: () => undefined,
  refresh: async () => undefined,
};

const CafeContext = createContext<CafeContextValue>(emptyValue);

export function CafeProvider({ children, service }: { children: ReactNode; service?: CafeService }) {
  const [snapshot, setSnapshot] = useState<CafeSnapshot | null>(null);
  const [loading, setLoading] = useState(Boolean(service));
  const [cart, setCart] = useState<CartLine[]>([]);

  const refresh = useCallback(async () => {
    if (!service) return;
    setSnapshot(await service.getSnapshot());
    setLoading(false);
  }, [service]);

  useEffect(() => {
    void refresh();
    if (!service) return;
    return service.subscribe(setSnapshot);
  }, [refresh, service]);

  const addToCart = useCallback((line: CartLine) => {
    setCart((current) => {
      const match = current.find((item) => item.id === line.id);
      if (!match) return [...current, structuredClone(line)];
      return current.map((item) => item.id === line.id ? { ...item, quantity: item.quantity + line.quantity } : item);
    });
  }, []);

  const updateCartQuantity = useCallback((lineId: string, quantity: number) => {
    setCart((current) => current
      .map((item) => item.id === lineId ? { ...item, quantity: Math.max(0, Math.floor(quantity)) } : item)
      .filter((item) => item.quantity > 0));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);
  const value = useMemo<CafeContextValue>(() => ({
    snapshot,
    loading,
    cart,
    service: service ?? null,
    addToCart,
    updateCartQuantity,
    clearCart,
    refresh,
  }), [snapshot, loading, cart, service, addToCart, updateCartQuantity, refresh]);

  return <CafeContext.Provider value={value}>{children}</CafeContext.Provider>;
}

export const useCafe = () => useContext(CafeContext);
