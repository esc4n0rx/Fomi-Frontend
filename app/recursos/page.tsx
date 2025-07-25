"use client"

import { AnimatedNavbar } from "@/components/animated-navbar"
import { motion } from "framer-motion"
import { Zap, Smartphone, BarChart3, Shield, CheckCircle, Star, Rocket } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const recursos = [
  {
    icon: Zap,
    title: "Setup Rápido",
    description: "Sua loja online pronta para vender em menos de 5 minutos, sem complicações técnicas.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Experiência otimizada para pedidos pelo celular, garantindo mais conversão.",
    color: "from-green-400 to-blue-500",
  },
  {
    icon: BarChart3,
    title: "Analytics Completo",
    description: "Acompanhe vendas, clientes e produtos com relatórios detalhados e fáceis de entender.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: Shield,
    title: "Pagamentos Seguros",
    description: "Integração com os principais gateways do Brasil, com máxima segurança para você e seus clientes.",
    color: "from-pink-500 to-red-500",
  },
]

const diferenciais = [
  { icon: CheckCircle, text: "Pedidos ilimitados" },
  { icon: Star, text: "Suporte premiado" },
  { icon: Rocket, text: "Atualizações constantes" },
]

const faqs = [
  {
    question: "Preciso de cartão de crédito para começar?",
    answer: "Não! Você pode criar sua loja e usar o plano gratuito sem precisar de cartão de crédito.",
  },
  {
    question: "Posso migrar de plano a qualquer momento?",
    answer: "Sim, você pode mudar de plano quando quiser, sem burocracia.",
  },
  {
    question: "O Fomi funciona em qualquer cidade?",
    answer: "Sim! Nossa plataforma é 100% online e funciona em todo o Brasil.",
  },
]

export default function RecursosPage() {
  return (
    <div className="min-h-screen bg-neutral-light">
      <AnimatedNavbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10 animate-gradient-x bg-gradient-to-br from-primary/30 via-secondary/20 to-white" />
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Recursos que <span className="gradient-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">impulsionam</span> seu delivery
          </motion.h1>
          <motion.p
            className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Descubra todas as funcionalidades que tornam o Fomi a plataforma mais moderna para delivery de lanches.
          </motion.p>
        </div>
      </section>

      {/* CARDS DE RECURSOS */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Funcionalidades principais</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa para vender mais e gerenciar seu negócio com facilidade.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recursos.map((feature, index) => (
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
                  <feature.icon size={38} className="text-white drop-shadow-lg z-10 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <h3 className="text-2xl font-bold mb-2 drop-shadow-sm group-hover:underline underline-offset-4">{feature.title}</h3>
                <p className="text-white/90 text-base font-medium drop-shadow-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-12 px-4 bg-neutral-light">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Por que escolher o Fomi?</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Plataforma feita para o sucesso do seu delivery, com tecnologia de ponta e suporte humano.
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-6">
            {diferenciais.map((item, i) => (
              <motion.div
                key={item.text}
                className="flex items-center gap-3 bg-white rounded-full shadow px-6 py-3 mb-2 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <item.icon className="text-primary w-6 h-6" />
                <span className="font-medium text-gray-700">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Perguntas frequentes</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Tire suas dúvidas sobre a plataforma e nossos recursos.
            </p>
          </motion.div>
          <Accordion type="single" collapsible className="rounded-2xl border bg-neutral-50 shadow-lg">
            {faqs.map((faq, i) => (
              <AccordionItem value={faq.question} key={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/80 to-secondary/80">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Pronto para transformar seu delivery?
          </motion.h2>
          <motion.p
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Crie sua loja grátis agora mesmo e experimente todos os recursos do Fomi.
          </motion.p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-primary font-bold text-lg px-10 py-5 shadow-xl hover:bg-primary/10 transition-transform duration-200 hover:scale-105">
              Começar Grátis
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
} 