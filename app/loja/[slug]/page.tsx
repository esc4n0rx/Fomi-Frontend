import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PublicStoreClient from './PublicStoreClient';

const API_BASE = 'https://api.fomi-eats.shop/api/v1';

async function getStoreData(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/public/store/${slug}`, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!res.ok) {
      console.error(`Erro ao buscar loja ${slug}:`, res.status, res.statusText);
      return null;
    }
    
    const data = await res.json();
    console.log('Store data received:', data);
    // A API retorna os dados em data.data.store
    return data?.data?.store || null;
  } catch (error) {
    console.error('Erro na requisição da loja:', error);
    return null;
  }
}

async function getCategories(storeId: string) {
  try {
    const res = await fetch(`${API_BASE}/public/store/${storeId}/categories`, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!res.ok) {
      console.error(`Erro ao buscar categorias da loja ${storeId}:`, res.status, res.statusText);
      return [];
    }
    
    const data = await res.json();
    console.log('Categories data received:', data);
    // A API retorna as categorias em data.data.categories
    return data?.data?.categories || [];
  } catch (error) {
    console.error('Erro na requisição de categorias:', error);
    return [];
  }
}

async function getProducts(storeId: string, categoryId?: string) {
  try {
    let url = `${API_BASE}/public/store/${storeId}/products`;
    if (categoryId) url += `?category_id=${categoryId}`;
    
    const res = await fetch(url, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!res.ok) {
      console.error(`Erro ao buscar produtos da loja ${storeId}:`, res.status, res.statusText);
      return [];
    }
    
    const data = await res.json();
    console.log('Products data received:', data);
    // A API retorna os produtos em data.data.products
    return data?.data?.products || [];
  } catch (error) {
    console.error('Erro na requisição de produtos:', error);
    return [];
  }
}

// Função para gerar metadata dinamicamente
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // Await params antes de usar
  const resolvedParams = await params;
  const store = await getStoreData(resolvedParams.slug);
  
  if (!store) {
    return {
      title: 'Loja não encontrada | Fomi Eats',
      description: 'A loja que você procura não foi encontrada.',
    };
  }

  return {
    title: `${store.nome} | Loja Fomi Eats`,
    description: store.descricao || `Faça seus pedidos na ${store.nome} através do Fomi Eats`,
    // Removido themeColor e viewport - serão movidos para generateViewport
  };
}

// Nova função para gerar viewport (Next.js 15+)
export async function generateViewport({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const store = await getStoreData(resolvedParams.slug);
  
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: store?.cor_primaria || '#FF6B35',
  };
}

// Componente Server
export default async function PublicStorePage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params antes de usar
  const resolvedParams = await params;
  console.log('PublicStorePage iniciado para slug:', resolvedParams.slug);
  
  const store = await getStoreData(resolvedParams.slug);
  
  if (!store) {
    console.log('Store não encontrada para slug:', resolvedParams.slug);
    return notFound();
  }
  
  console.log('Store encontrada:', store.id, store.nome);
  
  // Buscar categorias e produtos em paralelo para melhor performance
  const [categories, products] = await Promise.all([
    getCategories(store.id),
    getProducts(store.id)
  ]);
  
  console.log('Dados carregados - Categories:', categories.length, 'Products:', products.length);

  return (
    <PublicStoreClient
      store={store}
      initialCategories={categories}
      initialProducts={products}
    />
  );
}