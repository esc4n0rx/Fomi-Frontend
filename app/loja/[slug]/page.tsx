import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Head from 'next/head';

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

async function getPromotions(storeId: string) {
  const res = await fetch(`${API_BASE}/public/store/${storeId}/promotions`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data?.data?.promotions || [];
}

export default async function PublicStorePage({ params }: { params: { slug: string } }) {
  const store = await getStoreData(params.slug);
  if (!store) return notFound();

  // Personalização básica
  const styleVars = {
    '--cor-primaria': store.cor_primaria,
    '--cor-secundaria': store.cor_secundaria,
    '--cor-texto': store.cor_texto,
    '--cor-fundo': store.cor_fundo,
    '--fonte-titulo': store.fonte_titulo,
    '--fonte-texto': store.fonte_texto,
  } as React.CSSProperties;

  // Link público da loja
  const publicUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://fomi-eats.shop'}/loja/${store.slug}`;

  // Componente de botão copiar (Client Component)
  function CopyButton() {
    const [copied, setCopied] = useState(false);
    return (
      <button
        className="px-3 py-1 rounded bg-[var(--cor-primaria)] text-white text-sm hover:bg-[var(--cor-secundaria)] transition-colors"
        onClick={async () => {
          await navigator.clipboard.writeText(publicUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
      >
        {copied ? 'Link copiado!' : 'Copiar link da loja'}
      </button>
    );
  }

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    if (!store?.id) return;
    getCategories(store.id).then(setCategories);
    getPromotions(store.id).then(setPromotions);
    getProducts(store.id).then(setProducts);
  }, [store?.id]);

  useEffect(() => {
    if (!store?.id) return;
    getProducts(store.id, selectedCategory || undefined).then(setProducts);
  }, [selectedCategory]);

  // Registrar service worker PWA
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
    }
  }, []);

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
      <main
        className="min-h-screen flex flex-col items-center w-full"
        style={styleVars}
      >
        <div className="w-full max-w-2xl p-4" style={{ background: 'var(--cor-fundo)' }}>
          {store.banner_url && (
            <img src={store.banner_url} alt="Banner da loja" className="w-full rounded-lg mb-4" />
          )}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={store.logo_url || '/placeholder-logo.png'}
              alt="Logo da loja"
              className="w-16 h-16 rounded-full border"
            />
            <div className="flex-1">
              <h1
                className="text-2xl font-bold"
                style={{ color: 'var(--cor-primaria)', fontFamily: 'var(--fonte-titulo)' }}
              >
                {store.nome}
              </h1>
              <p className="text-sm" style={{ color: 'var(--cor-texto)', fontFamily: 'var(--fonte-texto)' }}>
                {store.descricao}
              </p>
            </div>
            <CopyButton />
          </div>

          {/* PROMOÇÕES */}
          {promotions.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--cor-primaria)' }}>Promoções</h2>
              <div className="flex flex-col gap-2">
                {promotions.map((promo: any) => (
                  <div key={promo.id} className="rounded bg-orange-100 p-2 text-sm">
                    <span className="font-semibold">{promo.nome}</span> - {promo.descricao}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CATEGORIAS */}
          {categories.length > 0 && (
            <div className="mb-4 flex gap-2 overflow-x-auto">
              <button
                className={`px-3 py-1 rounded ${!selectedCategory ? 'bg-[var(--cor-primaria)] text-white' : 'bg-gray-200'}`}
                onClick={() => setSelectedCategory(null)}
              >
                Todos
              </button>
              {categories.map((cat: any) => (
                <button
                  key={cat.id}
                  className={`px-3 py-1 rounded ${selectedCategory === cat.id ? 'bg-[var(--cor-primaria)] text-white' : 'bg-gray-200'}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.nome}
                </button>
              ))}
            </div>
          )}

          {/* PRODUTOS */}
          <div className="grid gap-4">
            {products.length === 0 && <div className="text-center text-gray-500">Nenhum produto encontrado.</div>}
            {products.map((prod: any) => (
              <div key={prod.id} className="rounded border p-4 flex gap-4 items-center bg-white">
                <img src={prod.imagem_url || '/placeholder.jpg'} alt={prod.nome} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-bold text-lg" style={{ color: 'var(--cor-primaria)' }}>{prod.nome}</div>
                  <div className="text-sm text-gray-600">{prod.descricao}</div>
                  <div className="mt-1 font-bold text-base">R$ {prod.preco.toFixed(2)}</div>
                  {prod.preco_promocional && (
                    <div className="text-sm text-green-600 font-semibold">Promo: R$ {prod.preco_promocional.toFixed(2)}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
} 