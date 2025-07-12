"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Users, Heart, Zap, Globe, BookOpen, Coffee, Gift } from "lucide-react"
import Link from "next/link"

export default function CarreirasPage() {
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
              Junte-se ao Time Fomi
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Faça parte de uma equipe que está transformando o e-commerce no Brasil. 
              Trabalhe em projetos desafiadores e cresça junto conosco.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Cultura da Empresa */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossa Cultura
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Valores que nos unem e nos fazem crescer juntos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Users,
              title: "Colaboração",
              description: "Trabalhamos em equipe, compartilhando conhecimento e apoiando uns aos outros.",
              color: "from-blue-400 to-purple-500",
            },
            {
              icon: Heart,
              title: "Paixão",
              description: "Amamos o que fazemos e isso se reflete na qualidade do nosso trabalho.",
              color: "from-pink-400 to-red-500",
            },
            {
              icon: Zap,
              title: "Inovação",
              description: "Sempre buscamos novas soluções e melhorias para nossos produtos.",
              color: "from-yellow-400 to-orange-500",
            },
            {
              icon: Globe,
              title: "Impacto",
              description: "Nossa missão é democratizar o e-commerce para pequenos negócios.",
              color: "from-green-400 to-blue-500",
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
                <value.icon size={32} className="text-white drop-shadow-lg z-10 group-hover:scale-110 transition-transform duration-200" />
              </div>
              <h3 className="text-2xl font-bold mb-2 drop-shadow-sm group-hover:underline underline-offset-4">{value.title}</h3>
              <p className="text-white/90 text-base font-medium drop-shadow-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Vagas Disponíveis */}
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
              Vagas Disponíveis
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encontre a oportunidade perfeita para você
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Desenvolvedor Full Stack",
                type: "Remoto",
                level: "Pleno/Sênior",
                description: "Desenvolva soluções inovadoras para nossa plataforma de e-commerce.",
                skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
                isUrgent: true,
              },
              {
                title: "Product Manager",
                type: "Híbrido",
                level: "Sênior",
                description: "Lidere o desenvolvimento de produtos que impactam milhares de usuários.",
                skills: ["Product Strategy", "Analytics", "User Research", "Agile"],
                isUrgent: false,
              },
              {
                title: "UX/UI Designer",
                type: "Remoto",
                level: "Pleno",
                description: "Crie experiências incríveis para nossos usuários.",
                skills: ["Figma", "Prototyping", "User Testing", "Design Systems"],
                isUrgent: false,
              },
              {
                title: "Customer Success",
                type: "Presencial",
                level: "Júnior/Pleno",
                description: "Ajude nossos clientes a terem sucesso com a plataforma.",
                skills: ["Comunicação", "Análise", "Suporte", "Onboarding"],
                isUrgent: true,
              },
              {
                title: "Marketing Digital",
                type: "Remoto",
                level: "Pleno",
                description: "Desenvolva estratégias de marketing que gerem crescimento.",
                skills: ["Google Ads", "Facebook Ads", "Analytics", "Content"],
                isUrgent: false,
              },
              {
                title: "DevOps Engineer",
                type: "Remoto",
                level: "Sênior",
                description: "Mantenha nossa infraestrutura escalável e segura.",
                skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
                isUrgent: false,
              },
            ].map((job, index) => (
              <motion.div
                key={job.title}
                className="group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-gray-50 to-white">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {job.title}
                      </CardTitle>
                      {job.isUrgent && (
                        <Badge className="bg-red-500 text-white text-xs">
                          Urgente
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {job.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {job.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {job.description}
                    </p>
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2 font-medium">Habilidades:</p>
                      <div className="flex flex-wrap gap-1">
                        {job.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-secondary transition-colors">
                      Candidatar-se
                      <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefícios */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Benefícios e Vantagens
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Por que trabalhar conosco?
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Coffee,
              title: "Horário Flexível",
              description: "Trabalhe no horário que funciona melhor para você, com foco em resultados.",
            },
            {
              icon: Globe,
              title: "Trabalho Remoto",
              description: "Trabalhe de onde quiser, mantendo a produtividade e qualidade.",
            },
            {
              icon: BookOpen,
              title: "Desenvolvimento",
              description: "Acesso a cursos, conferências e mentoria para seu crescimento profissional.",
            },
            {
              icon: Gift,
              title: "PLR e Bônus",
              description: "Participação nos lucros e bônus por performance e resultados.",
            },
            {
              icon: Heart,
              title: "Plano de Saúde",
              description: "Cobertura completa para você e sua família.",
            },
            {
              icon: Users,
              title: "Cultura Inclusiva",
              description: "Ambiente diverso e inclusivo, onde todos têm voz e são respeitados.",
            },
          ].map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-primary/10 rounded-full">
                    <benefit.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Processo de Candidatura */}
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
              Como se Candidatar
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Processo simples e transparente
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Candidatura", description: "Envie seu currículo e portfólio" },
              { step: "2", title: "Triagem", description: "Nossa equipe analisa seu perfil" },
              { step: "3", title: "Entrevista", description: "Conversa sobre experiência e expectativas" },
              { step: "4", title: "Contratação", description: "Seja bem-vindo ao time Fomi!" },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-white/20 rounded-full text-white font-bold text-xl">
                  {step.step}
                </div>
                <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                <p className="text-white/80 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pronto para Fazer Parte do Time?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Junte-se a nós e ajude a transformar o e-commerce no Brasil
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="mailto:carreiras@fomi.com.br">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 shadow-xl transition-transform duration-200 hover:scale-105 hover:shadow-2xl focus:ring-2 focus:ring-primary/50 focus:outline-none"
                >
                  Enviar Currículo
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                Falar com RH
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 