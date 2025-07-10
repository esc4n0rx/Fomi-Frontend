"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown, Zap } from "lucide-react";
import { Plan } from "@/types/billing";
import { useBilling } from "@/hooks/useBilling";
import { useRouter } from "next/navigation";
import { useState } from "react";

const plans: Plan[] = [
  {
    id: 'fomi_simples',
    name: "Fomi Simples",
    price: 'free',
    description: "Comece sua loja sem pagar nada! Plano gratuito para sempre.",
    features: [
      "Até 50 produtos",
      "Pedidos ilimitados", 
      "Painel básico",
      "Suporte por email",
      "Domínio personalizado"
    ],
    isFree: true,
  },
  {
    id: 'fomi_duplo',
    name: "Fomi Duplo",
    price: 29.90,
    description: "Para lojas em crescimento",
    features: [
      "Até 200 produtos",
      "Pedidos ilimitados",
      "Relatórios avançados", 
      "Suporte prioritário",
      "Integração WhatsApp",
      "Múltiplas formas de pagamento",
    ],
    isPopular: true,
  },
  {
    id: 'fomi_supremo',
    name: "Fomi Supremo", 
    price: 39.90,
    description: "Solução completa para grandes operações",
    features: [
      "Produtos ilimitados",
      "Pedidos ilimitados",
      "Analytics completo",
      "Suporte 24/7",
      "API personalizada",
      "Multi-lojas",
      "Automações avançadas",
    ],
  },
];

export function PlanSelection() {
  const { createSubscription } = useBilling();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlanSelect = async (plan: Plan) => {
    if (plan.isFree) {
      // Para plano grátis, marcar como escolhido e redirecionar
      localStorage.setItem('has_chosen_plan', 'true');
      router.push('/dashboard');
      return;
    }

    setSelectedPlan(plan.id);
    setIsLoading(true);

    try {
      await createSubscription(plan.id as 'fomi_duplo' | 'fomi_supremo');
      // O sucesso será tratado na página de success
      localStorage.setItem('has_chosen_plan', 'true');
    } catch (error) {
      console.error('Erro ao criar assinatura:', error);
    } finally {
      setIsLoading(false);
      setSelectedPlan(null);
    }
  };

  const getPlanIcon = (plan: Plan) => {
    if (plan.isFree) return <Zap className="w-6 h-6" />;
    if (plan.isPopular) return <Star className="w-6 h-6" />;
    return <Crown className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">Escolha seu plano</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sua loja foi criada com sucesso! Agora escolha o plano que melhor se adapta ao seu negócio.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative group rounded-2xl shadow-lg border transition-all duration-300 bg-white p-8 flex flex-col ${
                plan.isFree 
                  ? 'border-green-400/60 hover:shadow-green-200' 
                  : plan.isPopular 
                    ? 'border-primary/60 ring-2 ring-primary/10 hover:shadow-primary/20 scale-105' 
                    : 'border-gray-200 hover:shadow-lg'
              } hover:-translate-y-2`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Selos */}
              {plan.isFree && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md border-2 border-white z-10">
                  Grátis para Sempre
                </span>
              )}
              {plan.isPopular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-4 py-1 rounded-full shadow-md border-2 border-white z-10">
                  Mais Popular
                </span>
              )}

              {/* Ícone e nome */}
              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  plan.isFree 
                    ? 'bg-green-100 text-green-600' 
                    : plan.isPopular 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-purple-100 text-purple-600'
                }`}>
                  {getPlanIcon(plan)}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-primary group-hover:text-secondary transition-colors">
                  {plan.name}
                </h3>
                
                {/* Preço */}
                <div className="mb-4 flex items-end justify-center">
                  <span className={`text-4xl font-extrabold ${
                    plan.isFree ? 'text-green-600' : 'text-primary'
                  }`}>
                    {plan.price === 'free' ? 'Grátis' : `R$ ${plan.price}`}
                  </span>
                  {plan.price !== 'free' && <span className="ml-1 text-base text-gray-500">/mês</span>}
                </div>
                
                {/* Descrição */}
                <p className="text-gray-600 text-center min-h-[48px]">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="mb-8 space-y-3 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Botão */}
              <Button
                onClick={() => handlePlanSelect(plan)}
                disabled={isLoading && selectedPlan === plan.id}
                className={`w-full font-semibold transition-transform duration-200 ${
                  plan.isFree 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-primary hover:bg-secondary'
                } text-white shadow-md hover:scale-105`}
              >
                {isLoading && selectedPlan === plan.id ? (
                  "Processando..."
                ) : plan.isFree ? (
                  'Continuar Grátis'
                ) : (
                  'Assinar Agora'
                )}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-gray-600">
            Todos os planos incluem suporte técnico e atualizações gratuitas.
            <br />
            Você pode alterar ou cancelar seu plano a qualquer momento.
          </p>
        </motion.div>
      </div>
    </div>
  );
}