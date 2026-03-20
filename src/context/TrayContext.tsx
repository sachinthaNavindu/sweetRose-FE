import React, { createContext, useContext, useState, useCallback } from 'react';
import { Cake, TrayItem } from '@/types';

interface TrayContextType {
  items: TrayItem[];
  addToTray: (cake: Cake) => void;
  removeFromTray: (cakeId: string) => void;
  updateQuantity: (cakeId: string, quantity: number) => void;
  clearTray: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const TrayContext = createContext<TrayContextType | undefined>(undefined);

export const TrayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<TrayItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToTray = useCallback((cake: Cake) => {
    setItems(prev => {
      const existing = prev.find(item => item.cake.id === cake.id);
      if (existing) {
        return prev.map(item =>
          item.cake.id === cake.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { cake, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeFromTray = useCallback((cakeId: string) => {
    setItems(prev => prev.filter(item => item.cake.id !== cakeId));
  }, []);

  const updateQuantity = useCallback((cakeId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.cake.id !== cakeId));
      return;
    }
    setItems(prev =>
      prev.map(item => (item.cake.id === cakeId ? { ...item, quantity } : item))
    );
  }, []);

  const clearTray = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.cake.price * item.quantity, 0);

  return (
    <TrayContext.Provider value={{ items, addToTray, removeFromTray, updateQuantity, clearTray, totalItems, totalPrice, isOpen, setIsOpen }}>
      {children}
    </TrayContext.Provider>
  );
};

export const useTray = () => {
  const context = useContext(TrayContext);
  if (!context) throw new Error('useTray must be used within TrayProvider');
  return context;
};
