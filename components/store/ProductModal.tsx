"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X, MinusCircle, PlusCircle } from 'lucide-react';

interface Product {
  id: string;
  nome: string;
  descricao?: string | null;
  preco: number;
  preco_promocional?: number | null;
  imagem_url?: string | null;
  ingredientes?: string[];
  alergicos?: string[];
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, observations: string) => void;
  storeColors: {
    fundo: string;
    texto: string;
  };
}

export default function ProductModal({ product, isOpen, onClose, onAddToCart, storeColors }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [observations, setObservations] = useState("");

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity, observations);
    onClose();
  };

  const hasPromo = product.preco_promocional && product.preco_promocional < product.preco;
  const displayPrice = hasPromo ? product.preco_promocional : product.preco;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{product.nome}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img 
              src={product.imagem_url || '/placeholder.jpg'}
              alt={product.nome}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div>
            <p className="text-gray-600 mb-4">{product.descricao}</p>
            {product.ingredientes && product.ingredientes.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Ingredientes:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.ingredientes.map((ing, i) => <Badge key={i} variant="secondary">{ing}</Badge>)}
                </div>
              </div>
            )}
            {product.alergicos && product.alergicos.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Alérgicos:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.alergicos.map((al, i) => <Badge key={i} variant="destructive">{al}</Badge>)}
                </div>
              </div>
            )}
            <div className="mb-4">
              <Textarea 
                placeholder="Observações (ex: sem cebola)"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><MinusCircle /></button>
                <span className="text-xl font-bold">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}><PlusCircle /></button>
              </div>
              <Button onClick={handleAddToCart} style={{ backgroundColor: storeColors.texto, color: storeColors.fundo }}>
                Adicionar R$ {(displayPrice! * quantity).toFixed(2).replace('.', ',')}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
