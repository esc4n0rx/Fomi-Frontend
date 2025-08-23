"use client"

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Tipos
interface CartItem {
  id: string;
  nome: string;
  preco: number;
  imagem_url?: string;
  quantidade: number;
  observacoes?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<any>;
}

type Action =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantidade: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      let newItems;
      if (existingItemIndex > -1) {
        newItems = [...state.items];
        const existingItem = newItems[existingItemIndex];
        newItems[existingItemIndex] = { ...existingItem, quantidade: existingItem.quantidade + action.payload.quantidade };
      } else {
        newItems = [...state.items, action.payload];
      }
      const newTotal = newItems.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
      return { ...state, items: newItems, total: newTotal };
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload.id);
      const newTotal = newItems.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
      return { ...state, items: newItems, total: newTotal };
    }
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id ? { ...item, quantidade: action.payload.quantidade } : item
      ).filter(item => item.quantidade > 0);
      const newTotal = newItems.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
      return { ...state, items: newItems, total: newTotal };
    }
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
