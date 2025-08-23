import React from 'react';
import { notFound } from 'next/navigation';
import Head from 'next/head';
import PublicStoreClient from './PublicStoreClient';

const API_BASE = 'https://api.fomi-eats.shop/api/v1';

async function getStoreData(slug: string) {
  const res = await fetch(`${API_BASE}/public/store/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.data?.store || null;
}

async function getCategories(storeId: string) {
  const res = await fetch(`${API_BASE}/public/store/${storeId}/categories`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data?.data?.categories || [];
}

async function getProducts(storeId: string, categoryId?: string) {
  let url = `${API_BASE}/public/store/${storeId}/products`;
  if (categoryId) url += `?category_id=${categoryId}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data?.data?.products || [];
}

// Componente Server
export default async function PublicStorePage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const store = await getStoreData(slug);
  if (!store) return notFound();
  const categories = await getCategories(store.id);

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content={store.cor_primaria || '#FF6B35'} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/logo/logo.png" />
        <title>{store.nome} | Loja Fomi Eats</title>
        <meta name="description" content={store.descricao || 'Loja Fomi Eats'} />
      </Head>
      <PublicStoreClient
        store={store}
        initialCategories={categories}
      />
    </>
  );
} 