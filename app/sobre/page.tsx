"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Rocket, Feather, Shield as ShieldIcon, Target, Eye } from "lucide-react"
import Link from "next/link"

const valores = [
  {
    icon: Rocket,
    title: "Inovação Contínua",
    description: "Buscamos constantemente novas formas de resolver problemas e melhorar a experiência dos nossos usuários.",
  },
  {
    icon: Feather,
    title: "Simplicidade Radical",
    description: "Acreditamos que a melhor tecnologia é aquela que é fácil de usar e compreender, sem jargões técnicos.",
  },
  {
    icon: ShieldIcon,
    title: "Confiança e Transparência",
    description: "Construímos relacionamentos duradouros baseados em clareza, honestidade e resultados concretos.",
  },
]

const historyTimeline = [
    {
        date: "Início de 2025",
        title: "A Semente da Inconformidade",
        description: "Um desenvolvedor, frustrado com as altas taxas e a complexidade das plataformas de e-commerce existentes, decide criar uma alternativa justa e acessível. A missão: capacitar pequenos lojistas a competir no mundo digital sem sacrificar suas margens de lucro."
    },
    {
        date: "3 Meses de Imersão",
        title: "Do Código à Realidade",
        description: "Em um sprint de desenvolvimento de três meses, trabalhando incansavelmente, a primeira versão do Fomi foi construída. Cada linha de código foi escrita com o objetivo de criar uma plataforma robusta, intuitiva e, acima de tudo, centrada no sucesso do lojista."
    },
    {
        date: "Meados de 2025",
        title: "O Lançamento",
        description: "O Fomi é lançado oficialmente, oferecendo um plano gratuito generoso e planos pagos transparentes. A resposta da comunidade é imediata e positiva, validando a necessidade de uma solução como a nossa no mercado."
    },
    {
        date: "Hoje",
        title: "Um Ecossistema em Crescimento",
        description: "O que começou como o projeto de um único desenvolvedor agora é uma plataforma em constante evolução, impulsionada pelo feedback de uma comunidade crescente de lojistas. Continuamos comprometidos com nossa missão original de democratizar o comércio eletrônico."
    }
];


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
      <header className="relative pt-16 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10 animate-gradient-x bg-gradient-to-br from-primary/10 via-secondary/5 to-white" />
        <div className="container mx-auto text-center">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 drop-shadow-sm">
              Nascemos para <span className="gradient-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">democratizar</span> o delivery
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              O Fomi não é apenas uma plataforma. É um movimento para dar poder a pequenos e médios negócios, permitindo que prosperem no ambiente digital com ferramentas justas e poderosas.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Missão e Visão */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-primary/10 transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Target size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Nossa Missão</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Capacitar empreendedores do setor alimentício com uma plataforma de e-commerce que seja radicalmente simples, acessível e livre de taxas abusivas, permitindo que foquem no que fazem de melhor: criar lanches incríveis.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-secondary/20 transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                    <Eye size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Nossa Visão</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Ser a força motriz por trás de uma nova geração de negócios de delivery de sucesso no Brasil, construindo um ecossistema onde a tecnologia trabalha como uma parceira, e não como uma barreira.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* História */}
      <section className="py-20 px-4 bg-neutral-light">
        <div className="container mx-auto">
            <motion.div
                className="text-center mb-16 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Nossa História</h2>
                <p className="text-lg text-gray-600">Uma jornada de paixão, código e um desejo de mudança.</p>
            </motion.div>

            <div className="relative max-w-2xl mx-auto">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary/20 via-secondary/20 to-primary/20"></div>
                {historyTimeline.map((item, index) => (
                    <motion.div
                        key={item.title}
                        className="relative mb-12 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <p className="text-sm font-semibold text-primary mb-1">{item.date}</p>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </motion.div>
                        </div>
                        <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full border-2 ${index % 2 === 0 ? 'border-primary' : 'border-secondary'}`}></div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
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
              Os pilares que sustentam cada linha de código e cada decisão que tomamos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {valores.map((value, index) => (
              <motion.div
                key={value.title}
                className="group relative text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-primary/20 transition-all duration-300 overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                    <value.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-dark py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Faça parte da nossa história
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de empreendedores que estão construindo o futuro do delivery no Brasil.
            </p>
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary text-lg px-8 py-4 shadow-xl transition-transform duration-200 hover:scale-105 hover:shadow-2xl focus:ring-2 focus:ring-primary/50 focus:outline-none"
              >
                Criar Minha Loja Gratuitamente
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}