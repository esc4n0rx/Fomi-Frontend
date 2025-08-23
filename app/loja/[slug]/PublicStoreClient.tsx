"use client"

import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from '@/contexts/CartContext';
import StoreHeader from '@/components/store/StoreHeader';
import CategoryTabs from '@/components/store/CategoryTabs';
import ProductCard from '@/components/store/ProductCard';
import ProductModal from '@/components/store/ProductModal';
import ShoppingCart from '@/components/store/ShoppingCart';
import CheckoutModal from '@/components/store/CheckoutModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// Tipos
interface Store {
  id: string;
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

interface Category {
  id: string;
  nome: string;
}

interface Product {
  id: string;
  nome: string;
  descricao?: string | null;
  preco: number;
  preco_promocional?: number | null;
  imagem_url?: string | null;
  disponivel: boolean;
  destaque: boolean;
  category_id: string | null;
  ingredientes?: string[];
  alergicos?: string[];
}

interface PublicStoreClientProps {
  store: Store;
  initialCategories: Category[];
}

function StoreLayout({ store, initialCategories }: PublicStoreClientProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const res = await fetch(`https://api.fomi-eats.shop/api/v1/public/store/${store.id}/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data?.data?.products || []);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, [store.id]);

  const filteredProducts = products.filter(p => 
    p.disponivel && (!selectedCategory || p.category_id === selectedCategory)
  );

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleAddToCartFromModal = (product: Product, quantity: number, observations: string) => {
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: { ...product, quantidade: quantity, observacoes }
    });
    setIsProductModalOpen(false);
  };

  const storeColors = {
    fundo: store.cor_fundo || '#FFFFFF',
    texto: store.cor_texto || '#000000',
  };

  return (
    <div style={{ backgroundColor: storeColors.fundo, color: storeColors.texto }}>
      <StoreHeader store={store} />
      <CategoryTabs 
        categories={initialCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        storeColors={storeColors}
      />
      <main className="container mx-auto p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-16 w-16 animate-spin" style={{ color: storeColors.texto }} />
          </div>
        ) : (
          <AnimatePresence>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ProductCard 
                    product={product} 
                    onAddToCart={() => handleSelectProduct(product)}
                    storeColors={storeColors}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </main>
      <ProductModal 
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCartFromModal}
        storeColors={storeColors}
      />
      <ShoppingCart 
        onCheckout={() => setIsCheckoutModalOpen(true)}
        storeColors={storeColors}
      />
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        storeId={store.id}
        storeColors={storeColors}
      />
    </div>
  );
}

export default function PublicStoreClient(props: PublicStoreClientProps) {
  return (
    <CartProvider>
      <StoreLayout {...props} />
    </CartProvider>
  )
}
