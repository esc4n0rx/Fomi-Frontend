"use client"

import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  nome: string;
  descricao?: string | null;
  preco: number;
  preco_promocional?: number | null;
  imagem_url?: string | null;
  disponivel: boolean;
  destaque: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  storeColors: {
    fundo: string;
    texto: string;
  };
}

export default function ProductCard({ product, onAddToCart, storeColors }: ProductCardProps) {
  const { 
    nome, 
    descricao, 
    preco, 
    preco_promocional, 
    imagem_url, 
    disponivel, 
    destaque 
  } = product;

  const hasPromo = preco_promocional && preco_promocional < preco;

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 ${!disponivel ? 'opacity-50' : ''}`}>
      <div className="relative">
        <img 
          src={imagem_url || '/placeholder.jpg'}
          alt={nome}
          className="w-full h-40 object-cover"
        />
        {destaque && (
          <Badge className="absolute top-2 right-2" style={{ backgroundColor: storeColors.texto, color: storeColors.fundo }}>
            Destaque
          </Badge>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{nome}</h3>
        <p className="text-sm text-gray-600 h-10 overflow-hidden">{descricao}</p>
        <div className="flex items-center justify-between mt-4">
          <div>
            {hasPromo ? (
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold" style={{ color: storeColors.texto }}>
                  R$ {preco_promocional?.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  R$ {preco.toFixed(2).replace('.', ',')}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold">
                R$ {preco.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
          {disponivel && (
            <button 
              onClick={() => onAddToCart(product)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-white transition-colors"
              style={{ backgroundColor: storeColors.texto }}
            >
              <PlusCircle size={20} />
              <span className="hidden md:inline">Adicionar</span>
            </button>
          )}
        </div>
        {!disponivel && (
          <div className="mt-4">
            <Badge variant="outline" className="w-full justify-center">Indisponível</Badge>
          </div>
        )}
      </div>
    </div>
  );
}
