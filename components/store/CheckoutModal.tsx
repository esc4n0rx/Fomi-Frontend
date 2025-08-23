"use client"

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeId: string;
  storeColors: {
    fundo: string;
    texto: string;
  };
}

export default function CheckoutModal({ isOpen, onClose, storeId, storeColors }: CheckoutModalProps) {
  const { state, dispatch } = useCart();
  const [customer, setCustomer] = useState({ nome: '', telefone: '' });
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [deliveryType, setDeliveryType] = useState('retirada');
  const [address, setAddress] = useState({ cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setState: Function) => {
    setState((prev: any) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Lógica para enviar o pedido para a API
    console.log({ 
      customer, 
      items: state.items, 
      paymentMethod, 
      deliveryType, 
      address 
    });
    // Simular chamada de API
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    dispatch({ type: 'CLEAR_CART' });
    onClose();
    // Exibir toast de sucesso
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Finalizar Pedido</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Seus Dados</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" value={customer.nome} onChange={(e) => handleInputChange(e, setCustomer)} />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" value={customer.telefone} onChange={(e) => handleInputChange(e, setCustomer)} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Entrega</h3>
            <RadioGroup value={deliveryType} onValueChange={setDeliveryType}>
              <div className="flex items-center space-x-2"><RadioGroupItem value="retirada" id="retirada" /><Label htmlFor="retirada">Retirar no local</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="entrega" id="entrega" /><Label htmlFor="entrega">Receber em casa</Label></div>
            </RadioGroup>
          </div>

          {deliveryType === 'entrega' && (
            <div className="space-y-2">
              <h4 className="font-semibold">Endereço de Entrega</h4>
              <div className="grid grid-cols-2 gap-4">
                <div><Label htmlFor="cep">CEP</Label><Input id="cep" value={address.cep} onChange={(e) => handleInputChange(e, setAddress)} /></div>
                <div><Label htmlFor="rua">Rua</Label><Input id="rua" value={address.rua} onChange={(e) => handleInputChange(e, setAddress)} /></div>
                <div><Label htmlFor="numero">Número</Label><Input id="numero" value={address.numero} onChange={(e) => handleInputChange(e, setAddress)} /></div>
                <div><Label htmlFor="bairro">Bairro</Label><Input id="bairro" value={address.bairro} onChange={(e) => handleInputChange(e, setAddress)} /></div>
                <div><Label htmlFor="cidade">Cidade</Label><Input id="cidade" value={address.cidade} onChange={(e) => handleInputChange(e, setAddress)} /></div>
                <div><Label htmlFor="estado">Estado</Label><Input id="estado" value={address.estado} onChange={(e) => handleInputChange(e, setAddress)} /></div>
              </div>
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-2">Pagamento</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2"><RadioGroupItem value="pix" id="pix" /><Label htmlFor="pix">Pix</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="cartao" id="cartao" /><Label htmlFor="cartao">Cartão</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="dinheiro" id="dinheiro" /><Label htmlFor="dinheiro">Dinheiro</Label></div>
            </RadioGroup>
          </div>

          <Button onClick={handleSubmit} disabled={isLoading} className="w-full" style={{ backgroundColor: storeColors.texto, color: storeColors.fundo }}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirmar Pedido
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
