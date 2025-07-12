"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SobrePage() {
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
              Sobre o Fomi
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transformando a forma como pequenos negócios gerenciam suas vendas online. 
              Simplificamos o e-commerce para que você foque no que realmente importa: 
              seu negócio.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Missão e Visão */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
                  🎯 Nossa Missão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Democratizar o e-commerce para pequenos empreendedores, fornecendo 
                  ferramentas intuitivas e acessíveis que permitam que qualquer pessoa 
                  possa criar e gerenciar sua loja online com facilidade e profissionalismo.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-secondary/5 to-primary/5">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
                  🔮 Nossa Visão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Ser a plataforma líder em soluções de e-commerce para pequenos negócios 
                  no Brasil, reconhecida pela simplicidade, inovação e pelo sucesso dos 
                  nossos clientes.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Valores */}
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
              Nossos Valores
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Princípios que guiam cada decisão e ação em nossa empresa
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "🚀",
                title: "Inovação",
                description: "Buscamos constantemente novas formas de resolver problemas e melhorar a experiência dos nossos usuários.",
                color: "from-yellow-400 to-orange-500",
              },
              {
                icon: "🤝",
                title: "Simplicidade",
                description: "Acreditamos que a melhor tecnologia é aquela que é fácil de usar e compreender.",
                color: "from-green-400 to-blue-500",
              },
              {
                icon: "💪",
                title: "Confiança",
                description: "Construímos relacionamentos duradouros baseados em transparência e resultados.",
                color: "from-purple-500 to-indigo-500",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className={`group text-center p-8 rounded-2xl shadow-xl border border-gray-100 bg-gradient-to-br ${value.color} text-white relative overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:scale-105`}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.04 }}
                style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)' }}
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full bg-white/20 blur-lg opacity-70 animate-pulse" />
                  <div className="text-4xl z-10 group-hover:scale-110 transition-transform duration-200">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 drop-shadow-sm group-hover:underline underline-offset-4">{value.title}</h3>
                <p className="text-white/90 text-base font-medium drop-shadow-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* História */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossa História
            </h2>
            <p className="text-lg text-gray-600">
              Uma jornada de inovação e crescimento
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                year: "2023",
                title: "Nascimento da Ideia",
                description: "Identificamos a necessidade de uma solução mais simples e acessível para pequenos empreendedores que queriam vender online.",
              },
              {
                year: "2024",
                title: "Lançamento da Plataforma",
                description: "Desenvolvemos e lançamos a primeira versão do Fomi, com foco em simplicidade e usabilidade.",
              },
              {
                year: "2025",
                title: "Crescimento e Expansão",
                description: "Milhares de empreendedores já confiam no Fomi para suas vendas online, e continuamos evoluindo com base no feedback dos nossos clientes.",
              },
            ].map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className="flex gap-6 items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
                  {milestone.year}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Números que Inspiram
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "500+", label: "Lojas Ativas" },
              { number: "10k+", label: "Produtos Vendidos" },
              { number: "98%", label: "Satisfação" },
              { number: "24/7", label: "Suporte" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tecnologia */}
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
              Tecnologia de Ponta
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Utilizamos as melhores tecnologias para garantir performance, 
              segurança e escalabilidade
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: "⚡", title: "Performance", description: "Carregamento rápido e experiência fluida" },
              { icon: "🔒", title: "Segurança", description: "Proteção de dados e transações seguras" },
              { icon: "📱", title: "Responsivo", description: "Funciona perfeitamente em qualquer dispositivo" },
              { icon: "🔄", title: "Integração", description: "Conecta com suas ferramentas favoritas" },
            ].map((tech, index) => (
              <motion.div
                key={tech.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="pt-6">
                    <div className="text-3xl mb-3">{tech.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{tech.title}</h3>
                    <p className="text-sm text-gray-600">
                      {tech.description}
                    </p>
                  </CardContent>
                </Card>
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
              Junte-se a milhares de empreendedores que já transformaram 
              seus negócios com o Fomi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-white text-primary px-8 py-4 shadow-xl transition-transform duration-200 hover:scale-105 hover:shadow-2xl focus:ring-2 focus:ring-white/50 focus:outline-none"
                >
                  Criar Minha Loja
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