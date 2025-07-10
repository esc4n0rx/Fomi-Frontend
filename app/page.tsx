"use client"

import { motion } from "framer-motion"
import { AnimatedNavbar } from "@/components/animated-navbar"
import { PlanCard } from "@/components/plan-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, BarChart3, Smartphone } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Fomi Simples",
    price: "19,90",
    description: "Perfeito para começar sua loja de lanches",
    features: ["Até 50 produtos", "Pedidos ilimitados", "Painel básico", "Suporte por email", "Domínio personalizado"],
  },
  {
    name: "Fomi Duplo",
    price: "29,90",
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
    name: "Fomi Supremo",
    price: "39,90",
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
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-light">
      <AnimatedNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Crie sua loja de <span className="gradient-text">lanches online</span> em minutos
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transforme seu negócio com a plataforma mais moderna para delivery de lanches. Sem complicação, sem
            mensalidades abusivas.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/register">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-4">
                Começar Grátis
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-transparent">
              Ver Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Por que escolher o Fomi?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Desenvolvido especialmente para o mercado brasileiro de delivery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: "Setup Rápido",
                description: "Sua loja online em menos de 5 minutos",
              },
              {
                icon: Smartphone,
                title: "Mobile First",
                description: "Otimizado para pedidos pelo celular",
              },
              {
                icon: BarChart3,
                title: "Analytics Completo",
                description: "Relatórios detalhados do seu negócio",
              },
              {
                icon: Shield,
                title: "Pagamentos Seguros",
                description: "Integração com principais gateways",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="preços" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Planos que cabem no seu bolso</h2>
            <p className="text-xl text-gray-600">Sem taxas por transação. Sem surpresas.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <PlanCard key={plan.name} {...plan} delay={index * 0.2} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-dark text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-2xl font-bold">Fomi</span>
              </div>
              <p className="text-gray-400">A plataforma mais moderna para criar sua loja de lanches online.</p>
            </div>

            {[
              {
                title: "Produto",
                links: ["Recursos", "Preços", "Integrações", "API"],
              },
              {
                title: "Suporte",
                links: ["Central de Ajuda", "Contato", "Status", "Comunidade"],
              },
              {
                title: "Empresa",
                links: ["Sobre", "Blog", "Carreiras", "Imprensa"],
              },
            ].map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Fomi. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
