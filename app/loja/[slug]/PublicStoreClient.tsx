"use client"

import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Loader2, AlertCircle, Store, Tag, Clock, Phone, MapPin, Minus, Plus, 
  Trash2, ShoppingCart, X, Star, Info, ChefHat, Heart, Share2,
  CreditCard, Smartphone, Banknote, MapPinIcon, User, Phone as PhoneIcon,
  Mail, Home, MessageCircle, CheckCircle, ArrowLeft, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

// Tipos baseados na estrutura real da API
interface Store {
  id: string;
  nome: string;
  slug: string;
  descricao?: string | null;
  logo_url?: string | null;
  banner_url?: string | null;
  cor_primaria: string;
  cor_secundaria: string;
  cor_texto: string;
  cor_fundo: string;
  fonte_titulo: string;
  fonte_texto: string;
  whatsapp?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  endereco_cep?: string | null;
  endereco_rua?: string | null;
  endereco_numero?: string | null;
  endereco_complemento?: string | null;
  endereco_bairro?: string | null;
  endereco_cidade?: string | null;
  endereco_estado?: string | null;
  horario_funcionamento?: any;
  configuracoes: {
    aceita_pedidos: boolean;
    valor_minimo_pedido?: number | null;
    taxa_entrega?: number | null;
    tempo_preparo_min: number;
    raio_entrega_km?: number | null;
  };
}

interface Category {
  id: string;
  nome: string;
  descricao?: string | null;
  imagem_url?: string | null;
  ordem: number;
  store_id: string;
}

interface Product {
  id: string;
  nome: string;
  descricao?: string | null;
  preco: number;
  preco_promocional?: number | null;
  imagem_url?: string | null;
  imagens_extras?: string[];
  category_id: string | null;
  ingredientes?: string[];
  alergicos?: string[];
  tempo_preparo_min?: number | null;
  disponivel: boolean;
  destaque: boolean;
  ordem: number;
  store_id: string;
}

interface PublicStoreClientProps {
  store: Store;
  initialCategories: Category[];
  initialProducts?: Product[];
}

// Componente Header moderno estilo iFood
function ModernStoreHeader({ store, storeColors }: { store: Store; storeColors: any }) {
  return (
    <div className="relative">
      {/* Banner com gradiente */}
      <div 
        className="h-56 sm:h-64 lg:h-72 relative overflow-hidden"
        style={{ 
          background: store.banner_url 
            ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${store.banner_url})` 
            : `linear-gradient(135deg, ${storeColors.primaria} 0%, ${storeColors.secundaria} 100%)`
        }}
      >
        {store.banner_url && (
          <img 
            src={store.banner_url} 
            alt={`Banner ${store.nome}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        
        {/* Overlay escuro para melhor legibilidade */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Conteúdo do header */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 lg:p-8 text-white">
          <div className="flex items-end gap-4">
            {/* Logo */}
            {store.logo_url && (
              <motion.div 
                className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl p-2 shadow-2xl shrink-0"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                <img 
                  src={store.logo_url} 
                  alt={`Logo ${store.nome}`}
                  className="w-full h-full object-cover rounded-xl"
                />
              </motion.div>
            )}
            
            {/* Informações principais */}
            <div className="flex-1">
              <motion.h1 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2"
                style={{ fontFamily: store.fonte_titulo }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {store.nome}
              </motion.h1>
              
              {store.descricao && (
                <motion.p 
                  className="text-sm sm:text-base opacity-90 mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {store.descricao}
                </motion.p>
              )}
              
              {/* Status e tempo */}
              <motion.div 
                className="flex items-center gap-3 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Badge 
                  className={`${store.configuracoes?.aceita_pedidos ? 'bg-green-500' : 'bg-red-500'} text-white border-0`}
                >
                  <Clock className="w-3 h-3 mr-1" />
                  {store.configuracoes?.aceita_pedidos ? 'Aberto' : 'Fechado'}
                </Badge>
                
                {store.configuracoes?.tempo_preparo_min && (
                  <Badge className="bg-black/30 text-white border-0">
                    <ChefHat className="w-3 h-3 mr-1" />
                    {store.configuracoes.tempo_preparo_min} min
                  </Badge>
                )}
                
                <Badge className="bg-black/30 text-white border-0">
                  <Star className="w-3 h-3 mr-1" />
                  4.8
                </Badge>
              </motion.div>
              
              {/* Localização e contato */}
              <motion.div 
                className="flex flex-wrap items-center gap-4 text-xs sm:text-sm opacity-90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {store.endereco_cidade && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {store.endereco_bairro}, {store.endereco_cidade}
                  </div>
                )}
                {store.whatsapp && (
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {store.whatsapp}
                  </div>
                )}
              </motion.div>
            </div>
            
            {/* Ações rápidas */}
            <motion.div 
              className="flex flex-col gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button size="sm" variant="secondary" className="bg-white/20 text-white border-0 hover:bg-white/30">
                <Heart className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="secondary" className="bg-white/20 text-white border-0 hover:bg-white/30">
                <Share2 className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
          
         {(store.configuracoes?.valor_minimo_pedido || store.configuracoes?.taxa_entrega !== undefined) && (
          <motion.div 
            className="flex flex-wrap gap-4 mt-4 text-xs bg-black/20 rounded-lg p-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {store.configuracoes.valor_minimo_pedido !== null && store.configuracoes.valor_minimo_pedido !== undefined && store.configuracoes.valor_minimo_pedido > 0 && (
              <div className="flex items-center gap-1">
                <Info className="w-3 h-3" />
                <span>Pedido mínimo: R$ {store.configuracoes.valor_minimo_pedido.toFixed(2).replace('.', ',')}</span>
              </div>
            )}
            {store.configuracoes?.taxa_entrega !== null && store.configuracoes?.taxa_entrega !== undefined && (
              <div className="flex items-center gap-1">
                <MapPinIcon className="w-3 h-3" />
                <span>
                  {store.configuracoes.taxa_entrega > 0 
                    ? `Taxa de entrega: R$ ${store.configuracoes.taxa_entrega.toFixed(2).replace('.', ',')}`
                    : 'Entrega grátis'
                  }
                </span>
              </div>
            )}
          </motion.div>
        )}
        </div>
      </div>
      
      {/* Mensagem se fechado */}
      <AnimatePresence>
        {!store.configuracoes?.aceita_pedidos && (
          <motion.div 
            className="bg-red-500 text-white text-center py-4 px-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              <p className="font-semibold">Esta loja está fechada no momento e não aceita pedidos.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Componente de navegação por categorias moderno
function ModernCategoryTabs({ 
  categories, 
  selectedCategory, 
  onSelectCategory, 
  storeColors 
}: {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  storeColors: { primaria: string; texto: string; fundo: string; };
}) {
  return (
    <div className="sticky top-0 bg-white/95 backdrop-blur-sm shadow-sm z-30 py-3 border-b">
      <div className="container mx-auto">
        <ScrollArea className="w-full">
          <div className="flex gap-2 px-4 pb-2">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button 
                variant={!selectedCategory ? "default" : "outline"}
                size="sm"
                onClick={() => onSelectCategory(null)}
                className="whitespace-nowrap rounded-full font-medium"
                style={!selectedCategory ? { 
                  backgroundColor: storeColors.primaria, 
                  borderColor: storeColors.primaria,
                  color: 'white'
                } : { borderColor: storeColors.primaria, color: storeColors.primaria }}
              >
                <Tag className="w-3 h-3 mr-1" />
                Todos
              </Button>
            </motion.div>
            
            {categories.map((category) => (
              <motion.div key={category.id} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => onSelectCategory(category.id)}
                  className="whitespace-nowrap rounded-full font-medium"
                  style={selectedCategory === category.id ? { 
                    backgroundColor: storeColors.primaria, 
                    borderColor: storeColors.primaria,
                    color: 'white'
                  } : { borderColor: storeColors.primaria, color: storeColors.primaria }}
                >
                  {category.nome}
                </Button>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

function ModernProductCard({ 
  product, 
  onAddToCart, 
  storeColors,
  store 
}: {
  product: Product;
  onAddToCart: () => void;
  storeColors: { primaria: string; texto: string; fundo: string; };
  store: Store;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const discount = product.preco_promocional 
    ? Math.round(((product.preco - product.preco_promocional) / product.preco) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-white" onClick={onAddToCart}>
        {/* Container da imagem */}
        <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
          {product.imagem_url ? (
            <>
              <motion.img 
                src={product.imagem_url} 
                alt={product.nome}
                className={`w-full h-full object-cover transition-all duration-300 ${imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <ChefHat className="w-12 h-12 text-gray-400" />
            </div>
          )}
          
          {/* Badges sobrepostos */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.destaque && (
              <Badge 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg"
              >
                <Star className="w-3 h-3 mr-1" />
                Destaque
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-red-500 text-white border-0 shadow-lg">
                -{discount}%
              </Badge>
            )}
          </div>
          
          {/* Gradiente inferior */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        <CardContent className="p-4">
          {/* Nome e descrição */}
          <div className="mb-3">
            <h3 className="font-bold text-lg leading-tight mb-1 text-gray-900" style={{ fontFamily: store.fonte_titulo || 'inherit' }}>
              {product.nome}
            </h3>
            {product.descricao && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.descricao}
              </p>
            )}
          </div>
          
          {/* Ingredientes */}
          {product.ingredientes && product.ingredientes.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">Ingredientes:</p>
              <p className="text-xs text-gray-600 line-clamp-1">
                {product.ingredientes.slice(0, 3).join(', ')}
                {product.ingredientes.length > 3 && '...'}
              </p>
            </div>
          )}
          
          {/* Informações extras */}
          <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
            {product.tempo_preparo_min && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {product.tempo_preparo_min} min
              </div>
            )}
            {product.alergicos && product.alergicos.length > 0 && (
              <div className="flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Contém alérgenos
              </div>
            )}
          </div>
          
          {/* Preços e botão */}
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              {product.preco_promocional ? (
                <>
                  <span className="text-xl font-bold text-gray-900">
                    R$ {product.preco_promocional.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-sm line-through text-gray-400">
                    R$ {product.preco.toFixed(2).replace('.', ',')}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-gray-900">
                  R$ {product.preco.toFixed(2).replace('.', ',')}
                </span>
              )}
            </div>
            
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button 
                size="sm"
                className="rounded-full px-4 font-semibold shadow-lg hover:shadow-xl transition-all"
                style={{ 
                  backgroundColor: storeColors.primaria,
                  borderColor: storeColors.primaria 
                }}
              >
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Modal de produto com detalhes completos
function ProductModal({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart, 
  storeColors 
}: {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, observations: string) => void;
  storeColors: any;
}) {
  const [quantity, setQuantity] = useState(1);
  const [observations, setObservations] = useState('');

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product, quantity, observations);
      setQuantity(1);
      setObservations('');
    }
  };

  if (!product) return null;

  const discount = product.preco_promocional 
    ? Math.round(((product.preco - product.preco_promocional) / product.preco) * 100)
    : 0;

  const finalPrice = product.preco_promocional || product.preco;
  const totalPrice = finalPrice * quantity;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0">
        <div className="relative">
          {/* Imagem do produto */}
          {product.imagem_url && (
            <div className="relative h-64 sm:h-80 overflow-hidden">
              <img 
                src={product.imagem_url} 
                alt={product.nome}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {product.destaque && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                    <Star className="w-3 h-3 mr-1" />
                    Destaque
                  </Badge>
                )}
                {discount > 0 && (
                  <Badge className="bg-red-500 text-white border-0">
                    -{discount}%
                  </Badge>
                )}
              </div>
              <Button 
                variant="secondary" 
                size="icon"
                className="absolute top-4 right-4 rounded-full bg-white/90"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
          
          <div className="p-6">
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">{product.nome}</h2>
              {product.descricao && (
                <p className="text-gray-600">{product.descricao}</p>
              )}
            </div>
            
            {/* Ingredientes e alérgenos */}
            {(product.ingredientes?.length || product.alergicos?.length) && (
              <div className="mb-6">
                {product.ingredientes && product.ingredientes.length > 0 && (
                  <div className="mb-3">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <ChefHat className="w-4 h-4" />
                      Ingredientes
                    </h4>
                    <p className="text-sm text-gray-600">
                      {product.ingredientes.join(', ')}
                    </p>
                  </div>
                )}
                {product.alergicos && product.alergicos.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-orange-600">
                      <AlertCircle className="w-4 h-4" />
                      Contém alérgenos
                    </h4>
                    <p className="text-sm text-orange-600">
                      {product.alergicos.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Observações */}
            <div className="mb-6">
              <Label htmlFor="observations" className="text-sm font-semibold mb-2 block">
                Observações (opcional)
              </Label>
              <Textarea
                id="observations"
                placeholder="Alguma observação sobre o preparo? Ex: sem cebola, ponto da carne..."
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                className="min-h-[80px] resize-none"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">{observations.length}/500 caracteres</p>
            </div>
            
            {/* Footer com preço e controles */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                {product.preco_promocional ? (
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      R$ {product.preco_promocional.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-sm line-through text-gray-400 ml-2">
                      R$ {product.preco.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">
                    R$ {product.preco.toFixed(2).replace('.', ',')}
                  </span>
                )}
                {product.tempo_preparo_min && (
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Tempo de preparo: {product.tempo_preparo_min} min
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                {/* Controle de quantidade */}
                <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-8 w-8 rounded-full"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center font-semibold">{quantity}</span>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8 rounded-full"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Botão adicionar */}
                <Button 
                  onClick={handleAddToCart}
                  className="rounded-full px-6 font-semibold"
                  style={{ 
                    backgroundColor: storeColors.primaria,
                    borderColor: storeColors.primaria 
                  }}
                >
                  Adicionar R$ {totalPrice.toFixed(2).replace('.', ',')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Carrinho lateral moderno
function ModernShoppingCart({ 
  onCheckout, 
  storeColors,
  store 
}: {
  onCheckout: () => void;
  storeColors: { primaria: string; texto: string; fundo: string; };
  store: Store;
}) {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantidade: quantity } });
    }
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const canProceedToCheckout = store.configuracoes?.valor_minimo_pedido 
    ? state.total >= store.configuracoes.valor_minimo_pedido 
    : state.total > 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.div 
          className="fixed bottom-6 right-6 z-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            className="rounded-full w-16 h-16 shadow-2xl border-2 border-white"
            style={{ 
              backgroundColor: storeColors.primaria,
              borderColor: 'white'
            }}
          >
            <ShoppingCart size={28} className="text-white" />
            <AnimatePresence>
              {state.items.length > 0 && (
                <motion.span 
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {state.items.reduce((acc, item) => acc + item.quantidade, 0)}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b bg-gray-50">
            <SheetHeader>
              <SheetTitle className="text-xl font-bold flex items-center gap-2">
               <ShoppingCart className="w-5 h-5" />
               Seu Carrinho
             </SheetTitle>
           </SheetHeader>
           <p className="text-sm text-gray-600 mt-1">
             {state.items.length} {state.items.length === 1 ? 'item' : 'itens'}
           </p>
         </div>

         {/* Conteúdo */}
         {state.items.length === 0 ? (
           <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
               <ShoppingCart className="w-12 h-12 text-gray-400" />
             </div>
             <h3 className="text-lg font-semibold text-gray-900 mb-2">Carrinho vazio</h3>
             <p className="text-gray-500 mb-4">Adicione produtos deliciosos do cardápio!</p>
           </div>
         ) : (
           <>
             {/* Lista de itens */}
             <ScrollArea className="flex-1 p-4">
               <div className="space-y-4">
                 <AnimatePresence>
                   {state.items.map((item, index) => (
                     <motion.div
                       key={item.id}
                       initial={{ opacity: 0, x: -20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: 20 }}
                       transition={{ delay: index * 0.1 }}
                       className="bg-white rounded-lg p-4 shadow-sm border"
                     >
                       <div className="flex gap-3">
                         {/* Imagem */}
                         {item.imagem_url && (
                           <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                             <img 
                               src={item.imagem_url} 
                               alt={item.nome}
                               className="w-full h-full object-cover"
                             />
                           </div>
                         )}
                         
                         {/* Detalhes */}
                         <div className="flex-1 min-w-0">
                           <h4 className="font-semibold text-gray-900 mb-1 truncate">{item.nome}</h4>
                           <p className="text-sm text-gray-600 mb-2">
                             R$ {item.preco.toFixed(2).replace('.', ',')} cada
                           </p>
                           
                           {/* Observações */}
                           {item.observacoes && (
                             <div className="mb-2">
                               <p className="text-xs text-gray-500">Observações:</p>
                               <p className="text-xs text-gray-600 bg-gray-50 rounded p-2 mt-1">
                                 {item.observacoes}
                               </p>
                             </div>
                           )}
                           
                           {/* Controles */}
                           <div className="flex items-center justify-between">
                             <div className="flex items-center gap-2">
                               <Button 
                                 size="icon" 
                                 variant="outline"
                                 onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                                 className="h-8 w-8 rounded-full"
                               >
                                 <Minus className="w-3 h-3" />
                               </Button>
                               <span className="w-8 text-center font-semibold">{item.quantidade}</span>
                               <Button 
                                 size="icon" 
                                 variant="outline"
                                 onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                                 className="h-8 w-8 rounded-full"
                               >
                                 <Plus className="w-3 h-3" />
                               </Button>
                             </div>
                             
                             <div className="text-right">
                               <p className="font-bold text-gray-900">
                                 R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
                               </p>
                               <Button 
                                 size="sm" 
                                 variant="ghost" 
                                 onClick={() => removeItem(item.id)}
                                 className="text-red-500 hover:text-red-700 p-0 h-auto"
                               >
                                 <Trash2 className="w-3 h-3 mr-1" />
                                 Remover
                               </Button>
                             </div>
                           </div>
                         </div>
                       </div>
                     </motion.div>
                   ))}
                 </AnimatePresence>
               </div>
             </ScrollArea>
             
             {/* Footer com resumo */}
             <div className="p-4 border-t bg-gray-50">
               {/* Resumo de valores */}
               <div className="space-y-2 mb-4">
                 <div className="flex justify-between text-sm">
                   <span>Subtotal</span>
                   <span>R$ {state.total.toFixed(2).replace('.', ',')}</span>
                 </div>
                 
                 {store.configuracoes?.taxa_entrega !== null && store.configuracoes?.taxa_entrega !== undefined && store.configuracoes.taxa_entrega > 0 && (
                   <div className="flex justify-between text-sm">
                     <span>Taxa de entrega</span>
                     <span>R$ {store.configuracoes.taxa_entrega.toFixed(2).replace('.', ',')}</span>
                   </div>
                 )}
                 
                 <Separator />
                 
                 <div className="flex justify-between font-bold text-lg">
                   <span>Total</span>
                   <span>
                     R$ {((store.configuracoes?.taxa_entrega || 0) + state.total).toFixed(2).replace('.', ',')}
                   </span>
                 </div>
               </div>
               
               {/* Validação de pedido mínimo */}
               {store.configuracoes?.valor_minimo_pedido && store.configuracoes.valor_minimo_pedido > state.total && (
                 <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                   <p className="text-sm text-yellow-800 flex items-center gap-2">
                     <Info className="w-4 h-4" />
                     Adicione mais R$ {(store.configuracoes.valor_minimo_pedido - state.total).toFixed(2).replace('.', ',')} para atingir o pedido mínimo
                   </p>
                 </div>
               )}
               
               {/* Botão finalizar */}
               <Button 
                 onClick={onCheckout} 
                 className="w-full rounded-full font-semibold py-3"
                 style={{ 
                   backgroundColor: storeColors.primaria,
                   borderColor: storeColors.primaria
                 }}
                 disabled={!canProceedToCheckout}
               >
                 {canProceedToCheckout ? 'Finalizar Pedido' : 'Pedido Mínimo Não Atingido'}
               </Button>
             </div>
           </>
         )}
       </div>
     </SheetContent>
   </Sheet>
 );
}

// Modal de checkout completo
function CheckoutModal({ 
 isOpen, 
 onClose, 
 storeId, 
 storeColors,
 store 
}: {
 isOpen: boolean;
 onClose: () => void;
 storeId: string;
 storeColors: any;
 store: Store;
}) {
 const { state, dispatch } = useCart();
 const [step, setStep] = useState<'info' | 'payment' | 'confirm' | 'success'>('info');
 const [isLoading, setIsLoading] = useState(false);
 const [orderNumber, setOrderNumber] = useState('');
 
 // Dados do cliente
 const [customer, setCustomer] = useState({
   nome: '',
   telefone: '',
   email: '',
   endereco_cep: '',
   endereco_rua: '',
   endereco_numero: '',
   endereco_complemento: '',
   endereco_bairro: '',
   endereco_cidade: '',
   endereco_estado: '',
   endereco_referencia: ''
 });
 
 // Dados do pedido
 const [orderData, setOrderData] = useState({
   metodo_pagamento: 'pix' as 'dinheiro' | 'cartao' | 'pix',
   troco_para: 0,
   tipo_entrega: 'entrega' as 'entrega' | 'retirada',
   observacoes: ''
 });

 const subtotal = state.total;
 const taxaEntrega = orderData.tipo_entrega === 'entrega' ? (store.configuracoes?.taxa_entrega || 0) : 0;
 const total = subtotal + taxaEntrega;

 const handleCustomerChange = (field: string, value: string) => {
   setCustomer(prev => ({ ...prev, [field]: value }));
 };

 const handleOrderChange = (field: string, value: any) => {
   setOrderData(prev => ({ ...prev, [field]: value }));
 };


const cleanPayload = (obj: any) => {
  const cleaned: any = {};
  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined && obj[key] !== '') {
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        const cleanedNested = cleanPayload(obj[key]);
        if (Object.keys(cleanedNested).length > 0) {
          cleaned[key] = cleanedNested;
        }
      } else {
        cleaned[key] = obj[key];
      }
    }
  });
  return cleaned;
};

const handleSubmitOrder = async () => {
  setIsLoading(true);
  
  try {
    const orderPayload = cleanPayload({
    customer: {
      nome: customer.nome,
      telefone: customer.telefone,
      email: customer.email,
      endereco_cep: customer.endereco_cep,
      endereco_rua: customer.endereco_rua,
      endereco_numero: customer.endereco_numero,
      endereco_complemento: customer.endereco_complemento,
      endereco_bairro: customer.endereco_bairro,
      endereco_cidade: customer.endereco_cidade,
      endereco_estado: customer.endereco_estado,
      endereco_referencia: customer.endereco_referencia
    },
    items: state.items.map(item => ({
      product_id: item.id,
      quantidade: item.quantidade,
      observacoes: item.observacoes
    })),
    metodo_pagamento: orderData.metodo_pagamento,
    troco_para: orderData.metodo_pagamento === 'dinheiro' ? orderData.troco_para : null,
    tipo_entrega: orderData.tipo_entrega,
    observacoes: orderData.observacoes
  });


    const response = await fetch(`https://api.fomi-eats.shop/api/v1/public/orders/${storeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderPayload)
    });

    const data = await response.json();
    console.log('Resposta da API:', data);

    if (response.ok && data.success) {
      setOrderNumber(data.data.numero_pedido);
      setStep('success');
      dispatch({ type: 'CLEAR_CART' });
    } else {
      // Mostrar erros específicos da validação
      if (data.errors) {
        const errorMessages = data.errors.map((error: any) => error.message || error).join(', ');
        throw new Error(errorMessages);
      } else {
        throw new Error(data.message || 'Erro ao criar pedido');
      }
    }
  } catch (error) {
    console.error('Erro ao enviar pedido:', error);
    alert(`Erro ao finalizar pedido: ${error instanceof Error ? error.message : 'Tente novamente.'}`);
  } finally {
    setIsLoading(false);
  }
};

const validateStep = () => {
  if (step === 'info') {
    // Validações básicas obrigatórias
    const nomeValid = customer.nome.length >= 2 && customer.nome.length <= 255;
    const telefoneValid = customer.telefone.length >= 10; // Validação básica
    
    // Se for entrega, validar endereço
    if (orderData.tipo_entrega === 'entrega') {
      const enderecoValid = customer.endereco_rua && customer.endereco_numero && customer.endereco_bairro;
      return nomeValid && telefoneValid && enderecoValid;
    }
    
    return nomeValid && telefoneValid;
  }
  return true;
};
 const renderStep = () => {
   switch (step) {
     case 'info':
       return (
         <div className="space-y-6">
           {/* Dados pessoais */}
           <div>
             <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
               <User className="w-5 h-5" />
               Seus dados
             </h3>
             <div className="space-y-4">
               <div>
                 <Label htmlFor="nome">Nome completo *</Label>
                 <Input
                   id="nome"
                   value={customer.nome}
                   onChange={(e) => handleCustomerChange('nome', e.target.value)}
                   placeholder="Seu nome completo"
                 />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <Label htmlFor="telefone">Telefone *</Label>
                   <Input
                     id="telefone"
                     value={customer.telefone}
                      onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 11) {
                              if (value.length <= 10) {
                                value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                              } else {
                                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                              }
                            }
                            handleCustomerChange('telefone', value);
                          }}
                          placeholder="(11) 99999-9999"
                          maxLength={15}
                   />
                 </div>
                 <div>
                   <Label htmlFor="email">E-mail</Label>
                   <Input
                     id="email"
                     type="email"
                     value={customer.email}
                     onChange={(e) => handleCustomerChange('email', e.target.value)}
                     placeholder="seu@email.com"
                   />
                 </div>
               </div>
             </div>
           </div>

           {/* Tipo de entrega */}
           <div>
             <Label className="text-base font-semibold mb-3 block">Tipo de entrega</Label>
             <RadioGroup 
               value={orderData.tipo_entrega} 
               onValueChange={(value) => handleOrderChange('tipo_entrega', value)}
             >
               <div className="flex items-center space-x-2 p-3 border rounded-lg">
                 <RadioGroupItem value="entrega" id="entrega" />
                 <Label htmlFor="entrega" className="flex-1 cursor-pointer">
                   <div className="flex items-center gap-2">
                     <MapPinIcon className="w-4 h-4" />
                     Entrega no endereço
                     {store.configuracoes?.taxa_entrega && store.configuracoes.taxa_entrega > 0 && (
                       <span className="text-sm text-gray-500">
                         (+R$ {store.configuracoes.taxa_entrega.toFixed(2).replace('.', ',')})
                       </span>
                     )}
                   </div>
                 </Label>
               </div>
               <div className="flex items-center space-x-2 p-3 border rounded-lg">
                 <RadioGroupItem value="retirada" id="retirada" />
                 <Label htmlFor="retirada" className="flex-1 cursor-pointer">
                   <div className="flex items-center gap-2">
                     <Store className="w-4 h-4" />
                     Retirar na loja
                     <span className="text-sm text-green-600">(Grátis)</span>
                   </div>
                 </Label>
               </div>
             </RadioGroup>
           </div>

           {/* Endereço (se entrega) */}
           {orderData.tipo_entrega === 'entrega' && (
             <div>
               <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                 <Home className="w-5 h-5" />
                 Endereço de entrega
               </h3>
               <div className="space-y-4">
                 <div className="grid grid-cols-3 gap-4">
                   <div>
                     <Label htmlFor="cep">CEP</Label>
                     <Input
                       id="cep"
                       value={customer.endereco_cep}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 8) {
                          value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
                        }
                        handleCustomerChange('endereco_cep', value);
                      }}
                       placeholder="00000-000"
                     />
                   </div>
                   <div className="col-span-2">
                     <Label htmlFor="rua">Rua *</Label>
                     <Input
                       id="rua"
                       value={customer.endereco_rua}
                       onChange={(e) => handleCustomerChange('endereco_rua', e.target.value)}
                       placeholder="Nome da rua"
                     />
                   </div>
                 </div>
                 <div className="grid grid-cols-3 gap-4">
                   <div>
                     <Label htmlFor="numero">Número *</Label>
                     <Input
                       id="numero"
                       value={customer.endereco_numero}
                       onChange={(e) => handleCustomerChange('endereco_numero', e.target.value)}
                       placeholder="123"
                     />
                   </div>
                   <div className="col-span-2">
                     <Label htmlFor="complemento">Complemento</Label>
                     <Input
                       id="complemento"
                       value={customer.endereco_complemento}
                       onChange={(e) => handleCustomerChange('endereco_complemento', e.target.value)}
                       placeholder="Apto, bloco, casa..."
                     />
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <Label htmlFor="bairro">Bairro *</Label>
                     <Input
                       id="bairro"
                       value={customer.endereco_bairro}
                       onChange={(e) => handleCustomerChange('endereco_bairro', e.target.value)}
                       placeholder="Nome do bairro"
                     />
                   </div>
                   <div>
                     <Label htmlFor="cidade">Cidade</Label>
                     <Input
                       id="cidade"
                       value={customer.endereco_cidade}
                       onChange={(e) => handleCustomerChange('endereco_cidade', e.target.value)}
                       placeholder="Nome da cidade"
                     />
                   </div>
                 </div>
                 <div>
                   <Label htmlFor="referencia">Ponto de referência</Label>
                   <Input
                     id="referencia"
                     value={customer.endereco_referencia}
                     onChange={(e) => handleCustomerChange('endereco_referencia', e.target.value)}
                     placeholder="Próximo ao supermercado..."
                   />
                 </div>
               </div>
             </div>
           )}
         </div>
       );

     case 'payment':
       return (
         <div className="space-y-6">
           <h3 className="text-lg font-semibold mb-4">Forma de pagamento</h3>
           <RadioGroup 
             value={orderData.metodo_pagamento} 
             onValueChange={(value) => handleOrderChange('metodo_pagamento', value)}
           >
             <div className="flex items-center space-x-2 p-4 border rounded-lg">
               <RadioGroupItem value="pix" id="pix" />
               <Label htmlFor="pix" className="flex-1 cursor-pointer">
                 <div className="flex items-center gap-3">
                   <Smartphone className="w-5 h-5 text-green-600" />
                   <div>
                     <div className="font-medium">PIX</div>
                     <div className="text-sm text-gray-500">Pagamento instantâneo</div>
                   </div>
                 </div>
               </Label>
             </div>
             
             <div className="flex items-center space-x-2 p-4 border rounded-lg">
               <RadioGroupItem value="cartao" id="cartao" />
               <Label htmlFor="cartao" className="flex-1 cursor-pointer">
                 <div className="flex items-center gap-3">
                   <CreditCard className="w-5 h-5 text-blue-600" />
                   <div>
                     <div className="font-medium">Cartão na entrega</div>
                     <div className="text-sm text-gray-500">Débito ou crédito</div>
                   </div>
                 </div>
               </Label>
             </div>
             
             <div className="flex items-center space-x-2 p-4 border rounded-lg">
               <RadioGroupItem value="dinheiro" id="dinheiro" />
               <Label htmlFor="dinheiro" className="flex-1 cursor-pointer">
                 <div className="flex items-center gap-3">
                   <Banknote className="w-5 h-5 text-green-600" />
                   <div>
                     <div className="font-medium">Dinheiro</div>
                     <div className="text-sm text-gray-500">Pagamento na entrega</div>
                   </div>
                 </div>
               </Label>
             </div>
           </RadioGroup>

           {orderData.metodo_pagamento === 'dinheiro' && (
             <div>
               <Label htmlFor="troco">Troco para (opcional)</Label>
               <Input
                 id="troco"
                 type="number"
                 min="0"
                 step="0.01"
                 value={orderData.troco_para}
                 onChange={(e) => handleOrderChange('troco_para', parseFloat(e.target.value) || 0)}
                 placeholder="0.00"
               />
             </div>
           )}

           <div>
             <Label htmlFor="observacoes">Observações do pedido</Label>
             <Textarea
               id="observacoes"
               value={orderData.observacoes}
               onChange={(e) => handleOrderChange('observacoes', e.target.value)}
               placeholder="Alguma observação especial para o pedido..."
               maxLength={1000}
             />
           </div>
         </div>
       );

     case 'confirm':
       return (
         <div className="space-y-6">
           <h3 className="text-lg font-semibold mb-4">Confirme seu pedido</h3>
           
           {/* Resumo do cliente */}
           <Card className="p-4">
             <h4 className="font-semibold mb-3 flex items-center gap-2">
               <User className="w-4 h-4" />
               Dados do cliente
             </h4>
             <div className="text-sm space-y-1">
               <p><strong>Nome:</strong> {customer.nome}</p>
               <p><strong>Telefone:</strong> {customer.telefone}</p>
               {customer.email && <p><strong>E-mail:</strong> {customer.email}</p>}
             </div>
           </Card>

           {/* Resumo da entrega */}
           <Card className="p-4">
             <h4 className="font-semibold mb-3 flex items-center gap-2">
               {orderData.tipo_entrega === 'entrega' ? <MapPinIcon className="w-4 h-4" /> : <Store className="w-4 h-4" />}
               {orderData.tipo_entrega === 'entrega' ? 'Endereço de entrega' : 'Retirada na loja'}
             </h4>
             {orderData.tipo_entrega === 'entrega' ? (
               <div className="text-sm">
                 <p>{customer.endereco_rua}, {customer.endereco_numero}</p>
                 {customer.endereco_complemento && <p>{customer.endereco_complemento}</p>}
                 <p>{customer.endereco_bairro}</p>
                 {customer.endereco_cidade && <p>{customer.endereco_cidade} - {customer.endereco_estado}</p>}
               </div>
             ) : (
               <div className="text-sm">
                 <p>{store.endereco_rua}, {store.endereco_numero}</p>
                 <p>{store.endereco_bairro} - {store.endereco_cidade}</p>
               </div>
             )}
           </Card>

           {/* Resumo do pagamento */}
           <Card className="p-4">
             <h4 className="font-semibold mb-3 flex items-center gap-2">
               <CreditCard className="w-4 h-4" />
               Pagamento
             </h4>
             <div className="text-sm">
               <p>
                 <strong>Método:</strong>{' '}
                 {orderData.metodo_pagamento === 'pix' && 'PIX'}
                 {orderData.metodo_pagamento === 'cartao' && 'Cartão na entrega'}
                 {orderData.metodo_pagamento === 'dinheiro' && 'Dinheiro'}
               </p>
               {orderData.metodo_pagamento === 'dinheiro' && orderData.troco_para > 0 && (
                 <p><strong>Troco para:</strong> R$ {orderData.troco_para.toFixed(2).replace('.', ',')}</p>
               )}
             </div>
           </Card>

           {/* Resumo financeiro */}
           <Card className="p-4">
             <h4 className="font-semibold mb-3">Resumo do pedido</h4>
             <div className="space-y-2 text-sm">
               <div className="flex justify-between">
                 <span>Subtotal ({state.items.length} itens)</span>
                 <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
               </div>
               {taxaEntrega > 0 && (
                 <div className="flex justify-between">
                   <span>Taxa de entrega</span>
                   <span>R$ {taxaEntrega.toFixed(2).replace('.', ',')}</span>
                 </div>
               )}
               <Separator />
               <div className="flex justify-between font-bold text-base">
                 <span>Total</span>
                 <span>R$ {total.toFixed(2).replace('.', ',')}</span>
               </div>
             </div>
           </Card>

           <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
             <p className="text-sm text-yellow-800 flex items-start gap-2">
               <Info className="w-4 h-4 mt-0.5" />
               <span>
                 Tempo estimado de {orderData.tipo_entrega === 'entrega' ? 'entrega' : 'preparo'}:{' '}
                 <strong>{store.configuracoes.tempo_preparo_min} minutos</strong>
               </span>
             </p>
           </div>
         </div>
       );

     case 'success':
       return (
         <div className="text-center space-y-6">
           <motion.div
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ type: "spring", duration: 0.6 }}
           >
             <div 
               className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
               style={{ backgroundColor: `${storeColors.primaria}20` }}
             >
               <CheckCircle className="w-12 h-12" style={{ color: storeColors.primaria }} />
             </div>
           </motion.div>
           
           <div>
             <h3 className="text-2xl font-bold text-gray-900 mb-2">Pedido confirmado!</h3>
             <p className="text-gray-600 mb-4">
               Seu pedido foi recebido e está sendo preparado
             </p>
             
             <div className="bg-gray-50 rounded-lg p-4 mb-6">
               <p className="text-sm text-gray-600 mb-1">Número do pedido</p>
               <p className="text-2xl font-bold" style={{ color: storeColors.primaria }}>
                 #{orderNumber}
               </p>
             </div>
             
             <div className="space-y-3 text-sm text-gray-600">
               <div className="flex items-center justify-center gap-2">
                 <Clock className="w-4 h-4" />
                 <span>Tempo estimado: {store.configuracoes.tempo_preparo_min} minutos</span>
               </div>
               
               {store.whatsapp && (
                 <div className="flex items-center justify-center gap-2">
                   <PhoneIcon className="w-4 h-4" />
                   <span>Acompanhe pelo WhatsApp: {store.whatsapp}</span>
                 </div>
               )}
             </div>
           </div>
           
           <div className="flex gap-3">
             <Button 
               variant="outline" 
               onClick={() => {
                 navigator.clipboard.writeText(orderNumber);
                 alert('Número do pedido copiado!');
               }}
               className="flex-1"
             >
               Copiar número
             </Button>
             
             {store.whatsapp && (
               <Button
                 onClick={() => {
                   const message = `Olá! Acabei de fazer o pedido #${orderNumber} na loja ${store.nome}. Gostaria de acompanhar o status.`;
                   const whatsappUrl = `https://wa.me/${store.whatsapp?.replace(/\D/g, '') || ''}?text=${encodeURIComponent(message)}`;
                   window.open(whatsappUrl, '_blank');
                 }}
                 className="flex-1"
                 style={{ backgroundColor: storeColors.primaria }}
               >
                 <MessageCircle className="w-4 h-4 mr-2" />
                 WhatsApp
               </Button>
             )}
           </div>
         </div>
       );

     default:
       return null;
   }
 };

 const getStepTitle = () => {
   switch (step) {
     case 'info': return 'Informações de entrega';
     case 'payment': return 'Pagamento';
     case 'confirm': return 'Confirmação';
     case 'success': return 'Pedido confirmado';
     default: return '';
   }
 };

 return (
   <Dialog open={isOpen} onOpenChange={onClose}>
     <DialogContent className="max-w-2xl max-h-[90vh] p-0">
       <div className="flex flex-col h-full">
         {/* Header */}
         <div className="p-6 border-b">
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
               {step !== 'success' && step !== 'info' && (
                 <Button 
                   variant="ghost" 
                   size="icon"
                   onClick={() => {
                     if (step === 'payment') setStep('info');
                     if (step === 'confirm') setStep('payment');
                   }}
                 >
                   <ArrowLeft className="w-4 h-4" />
                 </Button>
               )}
               <div>
                 <DialogTitle className="text-xl font-bold">{getStepTitle()}</DialogTitle>
                 {step !== 'success' && (
                   <p className="text-sm text-gray-500">
                     Passo {step === 'info' ? '1' : step === 'payment' ? '2' : '3'} de 3
                   </p>
                 )}
               </div>
             </div>
             
             {step !== 'success' && (
               <Button variant="ghost" size="icon" onClick={onClose}>
                 <X className="w-4 h-4" />
               </Button>
             )}
           </div>
           
           {/* Progress bar */}
           {step !== 'success' && (
             <div className="flex mt-4 gap-2">
               {['info', 'payment', 'confirm'].map((stepName, index) => (
                 <div 
                   key={stepName}
                   className="h-1 flex-1 rounded-full transition-colors"
                   style={{ 
                     backgroundColor: 
                       (step === 'info' && index === 0) ||
                       (step === 'payment' && index <= 1) ||
                       (step === 'confirm' && index <= 2)
                         ? storeColors.primaria 
                         : '#e5e7eb'
                   }}
                 />
               ))}
             </div>
           )}
         </div>

         {/* Content */}
         <ScrollArea className="flex-1 p-6">
           {renderStep()}
         </ScrollArea>

         {/* Footer */}
         {step !== 'success' && (
           <div className="p-6 border-t bg-gray-50">
             <div className="flex items-center justify-between">
               {/* Resumo do valor (exceto no primeiro step) */}
               {step !== 'info' && (
                 <div className="text-left">
                   <p className="text-sm text-gray-600">Total do pedido</p>
                   <p className="text-xl font-bold" style={{ color: storeColors.primaria }}>
                     R$ {total.toFixed(2).replace('.', ',')}
                   </p>
                 </div>
               )}
               
               <div className="flex gap-3 ml-auto">
                 <Button 
                   onClick={() => {
                     if (step === 'info') setStep('payment');
                     else if (step === 'payment') setStep('confirm');
                     else if (step === 'confirm') handleSubmitOrder();
                   }}
                   disabled={!validateStep() || isLoading}
                   className="px-8"
                   style={{ 
                     backgroundColor: storeColors.primaria,
                     borderColor: storeColors.primaria 
                   }}
                 >
                   {isLoading ? (
                     <>
                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                       Processando...
                     </>
                   ) : (
                     <>
                       {step === 'info' && 'Continuar'}
                       {step === 'payment' && 'Revisar pedido'}
                       {step === 'confirm' && 'Finalizar pedido'}
                       <ArrowRight className="w-4 h-4 ml-2" />
                     </>
                   )}
                 </Button>
               </div>
             </div>
           </div>
         )}
       </div>
     </DialogContent>
   </Dialog>
 );
}

// Componente interno com acesso ao contexto do carrinho
function StoreLayout({ store, initialCategories, initialProducts = [] }: PublicStoreClientProps) {
 const [products, setProducts] = useState<Product[]>(initialProducts);
 const [isLoading, setIsLoading] = useState(!initialProducts.length);
 const [error, setError] = useState<string | null>(null);
 const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
 const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
 const [isProductModalOpen, setIsProductModalOpen] = useState(false);
 const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
 
 // Context do carrinho
 const { dispatch } = useCart();

 // Fetch produtos se não foram passados inicialmente
 useEffect(() => {
   const fetchProducts = async () => {
     if (initialProducts.length > 0) {
       console.log('Produtos já carregados, pulando fetch');
       setIsLoading(false);
       return;
     }

     console.log('Fetching products for store:', store.id);
     setIsLoading(true);
     setError(null);

     try {
       const res = await fetch(`https://api.fomi-eats.shop/api/v1/public/store/${store.id}/products`, {
         cache: 'no-store'
       });
       
       console.log('Products API response status:', res.status);
       
       if (!res.ok) {
         throw new Error(`Erro ${res.status}: ${res.statusText}`);
       }
       
       const data = await res.json();
       console.log('Products data received:', data);
       
       const productsData = data?.data?.products || [];
       setProducts(productsData);
       console.log('Products set to state:', productsData.length, 'items');
     } catch (err) {
       console.error('Error fetching products:', err);
       setError(err instanceof Error ? err.message : 'Erro ao carregar produtos');
     } finally {
       setIsLoading(false);
     }
   };
   
   fetchProducts();
 }, [store.id, initialProducts.length]);

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
     payload: { ...product, quantidade: quantity, observacoes: observations }
   });
   setIsProductModalOpen(false);
 };

 // Mapeamento de cores baseado na estrutura real da API
 const storeColors = {
   fundo: store.cor_fundo || '#FFFFFF',
   texto: store.cor_texto || '#333333',
   primaria: store.cor_primaria || '#42A5F5',
   secundaria: store.cor_secundaria || '#66BB6A',
 };

 console.log('=== RENDER DEBUG ===');
 console.log('Store colors:', storeColors);
 console.log('Current loading state:', isLoading);
 console.log('Current error:', error);
 console.log('Products count:', products.length);
 console.log('Filtered products count:', filteredProducts.length);
 console.log('Store configuration:', store.configuracoes);
 console.log('===================');

 if (error) {
   return (
     <div className="min-h-screen flex items-center justify-center bg-gray-50">
       <div className="text-center p-8">
         <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
         <h2 className="text-xl font-semibold text-gray-900 mb-2">Erro ao carregar loja</h2>
         <p className="text-gray-600 mb-4">{error}</p>
         <Button onClick={() => window.location.reload()}>
           Tentar novamente
         </Button>
       </div>
     </div>
   );
 }

 return (
   <div 
     style={{ 
       backgroundColor: storeColors.fundo, 
       color: storeColors.texto,
       fontFamily: store.fonte_texto || 'Roboto, sans-serif'
     }}
     className="min-h-screen"
   >
     <ModernStoreHeader store={store} storeColors={storeColors} />
     
     <ModernCategoryTabs 
       categories={initialCategories}
       selectedCategory={selectedCategory}
       onSelectCategory={setSelectedCategory}
       storeColors={storeColors}
     />

     <main className="container mx-auto px-4 py-6">
       {isLoading ? (
         <div className="flex justify-center items-center h-64">
           <motion.div 
             className="text-center"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
           >
             <Loader2 className="h-16 w-16 animate-spin mb-4 mx-auto" style={{ color: storeColors.primaria }} />
             <p style={{ color: storeColors.texto }}>Carregando delícias...</p>
           </motion.div>
         </div>
       ) : filteredProducts.length === 0 ? (
         <motion.div 
           className="text-center py-16"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
         >
           <div 
             className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
             style={{ backgroundColor: `${storeColors.primaria}10` }}
           >
             <Tag className="h-12 w-12 text-gray-400" />
           </div>
           <h3 className="text-2xl font-bold mb-4" style={{ color: storeColors.texto }}>
             {selectedCategory ? 'Nenhum produto nesta categoria' : 'Em breve, novos sabores!'}
           </h3>
           <p className="text-gray-500 mb-6 max-w-md mx-auto">
             {selectedCategory ? 
               'Que tal dar uma olhada nos outros itens do nosso delicioso cardápio?' :
               'Estamos preparando produtos incríveis para você. Volte em breve!'
             }
           </p>
           {selectedCategory && (
             <Button 
               onClick={() => setSelectedCategory(null)}
               variant="outline"
               size="lg"
               className="rounded-full"
               style={{ borderColor: storeColors.primaria, color: storeColors.primaria }}
             >
               <Tag className="w-4 h-4 mr-2" />
               Ver todos os produtos
             </Button>
           )}
         </motion.div>
       ) : (
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.4 }}
         >
           {/* Seção de destaques */}
           {!selectedCategory && filteredProducts.some(p => p.destaque) && (
             <motion.div 
               className="mb-8"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
             >
               <div className="flex items-center gap-3 mb-4">
                 <Star className="w-6 h-6" style={{ color: storeColors.primaria }} />
                 <h2 className="text-2xl font-bold" style={{ color: storeColors.texto, fontFamily: store.fonte_titulo }}>
                   Destaques da casa
                 </h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {filteredProducts
                   .filter(p => p.destaque)
                   .slice(0, 4)
                   .map((product, i) => (
                     <motion.div
                       key={product.id}
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.3 + i * 0.1 }}
                     >
                      <ModernProductCard 
                        product={product} 
                        onAddToCart={() => handleSelectProduct(product)}
                        storeColors={storeColors}
                        store={store}
                      />
                     </motion.div>
                   ))}
               </div>
               {filteredProducts.filter(p => !p.destaque).length > 0 && (
                 <Separator className="my-8" />
               )}
             </motion.div>
           )}

           {/* Todos os produtos ou produtos da categoria */}
           <div className="space-y-6">
             {(!selectedCategory || filteredProducts.filter(p => !p.destaque).length > 0) && (
               <div className="flex items-center gap-3 mb-4">
                 <ChefHat className="w-6 h-6" style={{ color: storeColors.primaria }} />
                 <h2 className="text-2xl font-bold" style={{ color: storeColors.texto, fontFamily: store.fonte_titulo }}>
                   {selectedCategory 
                     ? initialCategories.find(c => c.id === selectedCategory)?.nome || 'Produtos'
                     : (filteredProducts.some(p => p.destaque) ? 'Todos os produtos' : 'Nosso cardápio')
                   }
                 </h2>
               </div>
             )}
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               <AnimatePresence>
                 {filteredProducts
                   .filter(p => selectedCategory || !p.destaque) // Se não tem categoria selecionada, mostra apenas não-destaques
                   .map((product, i) => (
                     <motion.div
                       key={product.id}
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -20 }}
                       transition={{ delay: i * 0.05 }}
                       layout
                     >
                       <ModernProductCard 
                        product={product} 
                        onAddToCart={() => handleSelectProduct(product)}
                        storeColors={storeColors}
                        store={store}
                      />
                     </motion.div>
                   ))}
               </AnimatePresence>
             </div>
           </div>
         </motion.div>
       )}
     </main>

     {/* Modais e componentes flutuantes */}
     <ProductModal
       product={selectedProduct}
       isOpen={isProductModalOpen}
       onClose={() => setIsProductModalOpen(false)}
       onAddToCart={handleAddToCartFromModal}
       storeColors={storeColors}
     />

     <ModernShoppingCart 
       onCheckout={() => setIsCheckoutModalOpen(true)}
       storeColors={storeColors}
       store={store}
     />

     <CheckoutModal
       isOpen={isCheckoutModalOpen}
       onClose={() => {
         setIsCheckoutModalOpen(false);
       }}
       storeId={store.id}
       storeColors={storeColors}
       store={store}
     />

     {/* Footer da loja */}
     <motion.footer 
       className="mt-16 border-t bg-gray-50 py-8"
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       transition={{ delay: 1 }}
     >
       <div className="container mx-auto px-4">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Informações da loja */}
           <div>
             <h3 className="font-bold text-lg mb-4" style={{ color: storeColors.primaria }}>
               {store.nome}
             </h3>
             {store.descricao && (
               <p className="text-gray-600 mb-4">{store.descricao}</p>
             )}
             <div className="space-y-2 text-sm text-gray-600">
               {store.endereco_rua && (
                 <div className="flex items-start gap-2">
                   <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                   <div>
                     <p>{store.endereco_rua}, {store.endereco_numero}</p>
                     <p>{store.endereco_bairro} - {store.endereco_cidade}</p>
                   </div>
                 </div>
               )}
               {store.whatsapp && (
                 <div className="flex items-center gap-2">
                   <Phone className="w-4 h-4" />
                   <p>{store.whatsapp}</p>
                 </div>
               )}
             </div>
           </div>

           {/* Horário de funcionamento */}
           <div>
             <h4 className="font-semibold mb-4">Horário de funcionamento</h4>
             <div className="space-y-2 text-sm text-gray-600">
               {store.horario_funcionamento && Object.entries(store.horario_funcionamento).map(([dia, info]: [string, any]) => (
                 <div key={dia} className="flex justify-between">
                   <span className="capitalize">{dia.replace('_', '-')}:</span>
                   <span>
                     {info.aberto ? `${info.abertura} - ${info.fechamento}` : 'Fechado'}
                   </span>
                 </div>
               ))}
             </div>
           </div>

           {/* Redes sociais */}
           <div>
             <h4 className="font-semibold mb-4">Siga-nos</h4>
             <div className="flex gap-3">
               {store.whatsapp && (
                 <Button
                   size="icon"
                   variant="outline"
                   className="rounded-full"
                   onClick={() => {
                     const whatsappUrl = `https://wa.me/${store.whatsapp?.replace(/\D/g, '')}`;
                     window.open(whatsappUrl, '_blank');
                   }}
                 >
                   <MessageCircle className="w-4 h-4" />
                 </Button>
               )}
               {store.instagram && (
                 <Button
                   size="icon"
                   variant="outline"
                   className="rounded-full"
                   onClick={() => {
                     const instagramHandle = store.instagram ? store.instagram.replace('@', '') : '';
                     const instagramUrl = `https://instagram.com/${instagramHandle}`;
                     window.open(instagramUrl, '_blank');
                   }}
                 >
                   <Share2 className="w-4 h-4" />
                 </Button>
               )}
             </div>
           </div>
         </div>

         <Separator className="my-6" />
         
         <div className="text-center text-sm text-gray-500">
           <p>© 2024 {store.nome}. Todos os direitos reservados.</p>
           <p className="mt-1">Powered by Fomi Eats</p>
         </div>
       </div>
     </motion.footer>
   </div>
 );
}

export default function PublicStoreClient(props: PublicStoreClientProps) {
 console.log('=== PUBLIC STORE CLIENT START ===');
 console.log('PublicStoreClient renderizado com store:', props.store.id);
 console.log('Store completa:', props.store);
 console.log('Categories recebidas:', props.initialCategories.length);
 console.log('Products recebidos:', props.initialProducts?.length || 0);
 console.log('================================');
 
 return (
   <CartProvider>
     <StoreLayout {...props} />
   </CartProvider>
 );
}