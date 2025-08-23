"use client"

import React from 'react';
import { Clock, DollarSign, Info } from 'lucide-react';

interface Store {
  nome: string;
  descricao?: string | null;
  logo_url?: string | null;
  banner_url?: string | null;
  cor_texto: string;
  cor_fundo: string;
  configuracoes: {
    aceita_pedidos: boolean;
    valor_minimo_pedido?: number | null;
    taxa_entrega?: number | null;
    tempo_preparo_min: number;
  };
}

interface StoreHeaderProps {
  store: Store;
}

export default function StoreHeader({ store }: StoreHeaderProps) {
  const { 
    nome, 
    descricao, 
    logo_url, 
    banner_url, 
    cor_texto, 
    cor_fundo, 
    configuracoes 
  } = store;

  const headerStyle = {
    backgroundColor: cor_fundo || '#FFFFFF',
    color: cor_texto || '#000000',
  };

  const bannerStyle = banner_url ? {
    backgroundImage: `url(${banner_url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : { backgroundColor: '#E5E7EB' };

  return (
    <header className="shadow-md mb-6">
      <div style={bannerStyle} className="h-48 md:h-64 w-full relative">
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </div>
      <div style={headerStyle} className="p-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-4 -mt-16 md:-mt-20 relative z-10">
          <img 
            src={logo_url || '/placeholder-logo.svg'}
            alt={`Logo de ${nome}`}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg bg-white"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold" style={{ color: cor_texto }}>{nome}</h1>
            {descricao && <p className="text-sm mt-1" style={{ color: cor_texto }}>{descricao}</p>}
          </div>
        </div>
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-opacity-20 bg-white">
            <Clock size={20} />
            <span>Preparo: {configuracoes.tempo_preparo_min} min</span>
          </div>
          {configuracoes.taxa_entrega !== null && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-opacity-20 bg-white">
              <DollarSign size={20} />
              <span>Entrega: R$ {configuracoes.taxa_entrega?.toFixed(2).replace('.', ',')}</span>
            </div>
          )}
          {configuracoes.valor_minimo_pedido !== null && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-opacity-20 bg-white">
              <Info size={20} />
              <span>Pedido mínimo: R$ {configuracoes.valor_minimo_pedido?.toFixed(2).replace('.', ',')}</span>
            </div>
          )}
        </div>
        {!configuracoes.aceita_pedidos && (
          <div className="container mx-auto mt-4 p-3 rounded-md bg-red-500 text-white text-center font-semibold">
            Esta loja está fechada no momento e não aceita pedidos.
          </div>
        )}
      </div>
    </header>
  );
}
