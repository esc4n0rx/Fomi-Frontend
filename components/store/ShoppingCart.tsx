"use client"

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Trash2, Minus, Plus } from 'lucide-react';

interface ShoppingCartProps {
  onCheckout: () => void;
  storeColors: {
    fundo: string;
    texto: string;
  };
}

export default function ShoppingCart({ onCheckout, storeColors }: ShoppingCartProps) {
  const { state, dispatch } = useCart();
  const { texto = '#000000', fundo = '#FFFFFF' } = storeColors || {};

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="fixed bottom-6 right-6">
          <Button className="rounded-full w-16 h-16 shadow-lg" style={{ backgroundColor: texto, color: fundo }}>
            <ShoppingCart size={28} />
            {state.items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
                {state.items.reduce((acc, item) => acc + item.quantidade, 0)}
              </span>
            )}
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Seu Carrinho</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
          {state.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Seu carrinho está vazio.</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto pr-4">
              {state.items.map(item => (
                <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                  <img src={item.imagem_url || '/placeholder.jpg'} alt={item.nome} className="w-16 h-16 rounded-md object-cover" />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.nome}</h4>
                    <p className="text-sm text-gray-500">R$ {item.preco.toFixed(2).replace('.', ',')}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, item.quantidade - 1)}><Minus size={16} /></Button>
                      <span>{item.quantidade}</span>
                      <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, item.quantidade + 1)}><Plus size={16} /></Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</p>
                    <Button size="icon" variant="ghost" className="text-red-500" onClick={() => removeItem(item.id)}><Trash2 size={16} /></Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>R$ {state.total.toFixed(2).replace('.', ',')}</span>
            </div>
            <Button 
              className="w-full" 
              disabled={state.items.length === 0}
              onClick={onCheckout}
              style={{ backgroundColor: texto, color: fundo }}
            >
              Finalizar Pedido
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
