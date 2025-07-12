"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, ArrowLeft, ArrowRight, Star, Zap, Shield, Users, BarChart3 } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Fomi Simples",
    price: "Grátis",
    originalPrice: null,
    description: "Perfeito para começar sua loja online",
    features: [
      "Até 50 produtos",
      "Pedidos ilimitados",
      "Painel básico",
      "Suporte por email",
      "Domínio personalizado",
      "WhatsApp integrado",
    ],
    limitations: [
      "Sem relatórios avançados",
      "Sem integrações premium",
      "Sem automações",
    ],
    isFree: true,
    isPopular: false,
    buttonText: "Começar Grátis",
    buttonLink: "/register",
  },
  {
    name: "Fomi Duplo",
    price: "29,90",
    originalPrice: "39,90",
    description: "Ideal para lojas em crescimento",
    features: [
      "Até 200 produtos",
      "Pedidos ilimitados",
      "Relatórios avançados",
      "Suporte prioritário",
      "Integração WhatsApp",
      "Múltiplas formas de pagamento",
      "Cupons e promoções",
      "Backup automático",
    ],
    limitations: [
      "Sem multi-lojas",
      "Sem API personalizada",
    ],
    isFree: false,
    isPopular: true,
    buttonText: "Assinar Agora",
    buttonLink: "/register?plan=duplo",
  },
  {
    name: "Fomi Supremo",
    price: "39,90",
    originalPrice: "59,90",
    description: "Solução completa para grandes operações",
    features: [
      "Produtos ilimitados",
      "Pedidos ilimitados",
      "Analytics completo",
      "Suporte 24/7",
      "API personalizada",
      "Multi-lojas",
      "Automações avançadas",
      "Integrações premium",
      "White label",
      "Consultoria especializada",
    ],
    limitations: [],
    isFree: false,
    isPopular: false,
    buttonText: "Assinar Agora",
    buttonLink: "/register?plan=supremo",
  },
]

const features = [
  {
    name: "Produtos",
    free: "Até 50",
    duplo: "Até 200",
    supremo: "Ilimitados",
  },
  {
    name: "Pedidos",
    free: "Ilimitados",
    duplo: "Ilimitados",
    supremo: "Ilimitados",
  },
  {
    name: "Relatórios",
    free: "Básicos",
    duplo: "Avançados",
    supremo: "Completos",
  },
  {
    name: "Suporte",
    free: "Email",
    duplo: "Prioritário",
    supremo: "24/7",
  },
  {
    name: "Integrações",
    free: "WhatsApp",
    duplo: "Múltiplas",
    supremo: "Premium",
  },
  {
    name: "API",
    free: "Não",
    duplo: "Básica",
    supremo: "Personalizada",
  },
  {
    name: "Multi-lojas",
    free: "Não",
    duplo: "Não",
    supremo: "Sim",
  },
  {
    name: "Automações",
    free: "Não",
    duplo: "Básicas",
    supremo: "Avançadas",
  },
]

export default function PrecosPage() {
  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Botão Voltar */}
      <div className="container mx-auto px-4 pt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <Button
              variant="outline"
              className="flex items-center gap-2 hover:bg-primary/10 transition-colors"
            >
              <ArrowLeft size={16} />
              Voltar ao Início
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-16 pb-20 px-4 overflow-hidden">
        {/* Fundo gradiente animado sutil */}
        <div className="absolute inset-0 -z-10 animate-gradient-x bg-gradient-to-br from-primary/30 via-secondary/20 to-white" />
        <div className="container mx-auto text-center">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-6 drop-shadow-lg">
              Planos que Cabem no Seu Bolso
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Escolha o plano ideal para o seu negócio. Sem taxas por transação. 
              Sem surpresas. Cancele quando quiser.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Planos */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative group rounded-2xl shadow-lg border transition-all duration-300 bg-white p-8 flex flex-col items-center ${
                plan.isFree 
                  ? 'border-green-400/60 hover:shadow-green-200' 
                  : plan.isPopular 
                    ? 'border-primary/60 ring-2 ring-primary/10 hover:shadow-primary/20' 
                    : 'border-gray-200 hover:shadow-lg'
              } hover:-translate-y-2`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Selo Grátis */}
              {plan.isFree && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md border-2 border-white z-10">
                  Grátis
                </span>
              )}
              {/* Selo Popular */}
              {plan.isPopular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-4 py-1 rounded-full shadow-md border-2 border-white z-10">
                  Mais Popular
                </span>
              )}
              
              {/* Nome do plano */}
              <h3 className="text-2xl font-bold mb-2 text-primary group-hover:text-secondary transition-colors">
                {plan.name}
              </h3>
              
              {/* Preço */}
              <div className="mb-4 flex items-end justify-center">
                <span className={`text-4xl font-extrabold ${plan.isFree ? 'text-green-600' : 'text-primary'}`}>
                  {plan.price}
                </span>
                {!plan.isFree && <span className="ml-1 text-base text-gray-500">/mês</span>}
                {plan.originalPrice && (
                  <span className="ml-2 text-lg text-gray-400 line-through">
                    R$ {plan.originalPrice}
                  </span>
                )}
              </div>
              
              {/* Descrição */}
              <p className="text-gray-600 mb-6 text-center min-h-[48px]">{plan.description}</p>
              
              {/* Lista de features */}
              <ul className="mb-8 space-y-3 w-full">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 text-sm">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
                {plan.limitations.map((limitation, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-400 text-sm">
                    <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                    {limitation}
                  </li>
                ))}
              </ul>
              
              {/* Botão de ação */}
              <Link href={plan.buttonLink} className="w-full">
                <Button
                  size="lg"
                  className={`w-full font-semibold transition-transform duration-200 ${
                    plan.isFree 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-primary hover:bg-secondary'
                  } text-white shadow-md hover:scale-105`}
                >
                  {plan.buttonText}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Comparativo Detalhado */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comparativo Detalhado
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Veja exatamente o que cada plano oferece
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Recurso</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Simples</th>
                  <th className="text-center py-4 px-4 font-semibold text-primary">Duplo</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Supremo</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <motion.tr
                    key={feature.name}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <td className="py-4 px-4 font-medium text-gray-900">{feature.name}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{feature.free}</td>
                    <td className="py-4 px-4 text-center text-primary font-medium">{feature.duplo}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{feature.supremo}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Por que escolher o Fomi */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Por que Escolher o Fomi?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vantagens exclusivas que fazem a diferença
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Zap,
              title: "Setup Rápido",
              description: "Sua loja online pronta em menos de 5 minutos",
              color: "from-yellow-400 to-orange-500",
            },
            {
              icon: Shield,
              title: "Sem Taxas",
              description: "Sem taxas por transação ou comissões ocultas",
              color: "from-green-400 to-blue-500",
            },
            {
              icon: Users,
              title: "Suporte Real",
              description: "Equipe brasileira para te ajudar quando precisar",
              color: "from-purple-500 to-indigo-500",
            },
            {
              icon: BarChart3,
              title: "Crescimento Garantido",
              description: "Ferramentas para escalar seu negócio",
              color: "from-pink-500 to-red-500",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`group text-center p-8 rounded-2xl shadow-xl border border-gray-100 bg-gradient-to-br ${feature.color} text-white relative overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:scale-105`}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.04 }}
              style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)' }}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-white/20 blur-lg opacity-70 animate-pulse" />
                <feature.icon size={32} className="text-white drop-shadow-lg z-10 group-hover:scale-110 transition-transform duration-200" />
              </div>
              <h3 className="text-2xl font-bold mb-2 drop-shadow-sm group-hover:underline underline-offset-4">{feature.title}</h3>
              <p className="text-white/90 text-base font-medium drop-shadow-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tire suas dúvidas sobre nossos planos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "Posso cancelar a qualquer momento?",
                answer: "Sim! Você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas adicionais.",
              },
              {
                question: "Há taxa por transação?",
                answer: "Não! O Fomi não cobra taxas por transação. Você paga apenas a mensalidade do plano escolhido.",
              },
              {
                question: "Posso mudar de plano?",
                answer: "Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.",
              },
              {
                question: "O plano grátis tem limite de tempo?",
                answer: "Não! O plano Fomi Simples é gratuito para sempre, sem limitação de tempo.",
              },
              {
                question: "Oferecem suporte técnico?",
                answer: "Sim! Todos os planos incluem suporte. O Duplo tem suporte prioritário e o Supremo tem suporte 24/7.",
              },
              {
                question: "Posso usar meu próprio domínio?",
                answer: "Sim! Todos os planos incluem domínio personalizado para sua loja.",
              },
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                className="bg-gray-50 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pronto para Começar?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Escolha seu plano e comece a vender online hoje mesmo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-white text-primary px-8 py-4 shadow-xl transition-transform duration-200 hover:scale-105 hover:shadow-2xl focus:ring-2 focus:ring-white/50 focus:outline-none"
                >
                  Começar Grátis
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary transition-all duration-300"
              >
                Falar com Especialista
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 