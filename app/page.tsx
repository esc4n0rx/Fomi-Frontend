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
    price: "Grátis",
    description: "Comece sua loja sem pagar nada! Plano gratuito para sempre.",
    features: ["Até 50 produtos", "Pedidos ilimitados", "Painel básico", "Suporte por email", "Domínio personalizado"],
    isFree: true,
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
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Fundo gradiente animado sutil */}
        <div className="absolute inset-0 -z-10 animate-gradient-x bg-gradient-to-br from-primary/30 via-secondary/20 to-white" />
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Crie sua loja de <span className="gradient-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">lanches online</span> em minutos
          </motion.h1>

          <motion.p
            className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transforme seu negócio com a plataforma mais moderna para delivery de lanches. Sem complicação, sem mensalidades abusivas.
          </motion.p>

          {/* Botão principal com microinteração profissional */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary text-lg px-8 py-4 shadow-xl transition-transform duration-200 hover:scale-105 hover:shadow-2xl focus:ring-2 focus:ring-primary/50 focus:outline-none"
              >
                Começar Grátis
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 bg-white/80 border-primary/30 hover:bg-primary/10 transition-all duration-300"
            >
              Ver Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION MODERNA E ANIMADA */}
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

          {/* Cards de recursos com gradiente, tilt e animações modernas */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
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
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className={
                  `group text-center p-8 rounded-2xl shadow-xl border border-gray-100 bg-gradient-to-br ${feature.color} text-white relative overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:scale-105` +
                  ' feature-tilt'
                }
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.04 }}
                style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)' }}
              >
                {/* Efeito de brilho animado no ícone */}
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

      {/* SESSÃO DE COMENTÁRIOS/DEPOIMENTOS */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">O que dizem nossos clientes</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Veja como o Fomi está transformando negócios reais:</p>
          </motion.div>
          {/* Cards de depoimentos animados */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Ana Souza",
                role: "Dona da Lanchonete Sabor & Cia",
                comment: "O Fomi facilitou demais minha vida! Em poucos minutos minha loja estava online e já comecei a receber pedidos pelo WhatsApp.",
                img: "/public/placeholder-user.jpg",
              },
              {
                name: "Carlos Lima",
                role: "Proprietário do Burger do Carlão",
                comment: "A plataforma é super intuitiva, meus clientes adoram pedir pelo celular e o suporte é excelente.",
                img: "/public/placeholder-user.jpg",
              },
              {
                name: "Juliana Alves",
                role: "Empreendedora",
                comment: "O plano grátis já resolve tudo que eu preciso para começar. Recomendo muito para quem está começando!",
                img: "/public/placeholder-user.jpg",
              },
            ].map((depo, idx) => (
              <motion.div
                key={depo.name}
                className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                viewport={{ once: true }}
              >
                <img src={depo.img} alt={depo.name} className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-primary/40 shadow" />
                <h4 className="font-bold text-lg mb-1 text-primary">{depo.name}</h4>
                <span className="text-sm text-gray-500 mb-3">{depo.role}</span>
                <p className="text-gray-700 font-medium">“{depo.comment}”</p>
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

          {/* Cards de planos modernos */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`relative group rounded-2xl shadow-lg border transition-all duration-300 bg-white p-8 flex flex-col items-center ${plan.isFree ? 'border-green-400/60 hover:shadow-green-200' : plan.isPopular ? 'border-primary/60 ring-2 ring-primary/10 hover:shadow-primary/20' : 'border-gray-200 hover:shadow-lg'} hover:-translate-y-2`}
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
                <h3 className="text-2xl font-bold mb-2 text-primary group-hover:text-secondary transition-colors">{plan.name}</h3>
                {/* Preço */}
                <div className="mb-4 flex items-end justify-center">
                  <span className={`text-4xl font-extrabold ${plan.isFree ? 'text-green-600' : 'text-primary'}`}>{plan.price}</span>
                  {!plan.isFree && <span className="ml-1 text-base text-gray-500">/mês</span>}
                </div>
                {/* Descrição */}
                <p className="text-gray-600 mb-6 text-center min-h-[48px]">{plan.description}</p>
                {/* Lista de features */}
                <ul className="mb-8 space-y-2 w-full">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 rounded-full bg-primary/60 inline-block" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {/* Botão de ação */}
                <Link href={plan.isFree ? "/register" : "/register?plan=" + encodeURIComponent(plan.name)}>
                  <Button
                    size="lg"
                    className={`w-full font-semibold transition-transform duration-200 ${plan.isFree ? 'bg-green-500 hover:bg-green-600' : 'bg-primary hover:bg-secondary'} text-white shadow-md hover:scale-105`}
                  >
                    {plan.isFree ? 'Começar Grátis' : 'Assinar'}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Moderno */}
      <footer className="bg-neutral-dark text-white py-12 px-4 mt-12">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo e descrição */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-2xl font-bold">Fomi</span>
              </div>
              <p className="text-gray-400">A plataforma mais moderna para criar sua loja de lanches online.</p>
              {/* Redes sociais */}
              <div className="flex gap-3 mt-4">
                <a href="#" aria-label="Instagram" className="hover:text-primary transition-colors"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg></a>
                <a href="#" aria-label="WhatsApp" className="hover:text-green-400 transition-colors"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.19-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.23-1.44l-.37-.22-3.68.97.98-3.59-.24-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43s1.02 2.82 1.16 3.02c.14.2 2.01 3.08 4.88 4.2.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg></a>
                <a href="#" aria-label="Facebook" className="hover:text-blue-400 transition-colors"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg></a>
              </div>
            </div>
            {/* Links úteis */}
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
