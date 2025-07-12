"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Download, Mail, Phone, FileText, Users, TrendingUp, Globe, Calendar } from "lucide-react"
import Link from "next/link"

export default function ImprensaPage() {
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
              Sala de Imprensa
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Recursos, informações e contatos para jornalistas e veículos de comunicação. 
              Conecte-se com nossa equipe de comunicação.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sobre a Empresa */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sobre o Fomi
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Informações essenciais sobre nossa empresa
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Users,
              title: "Fundação",
              description: "2023",
              color: "from-blue-400 to-purple-500",
            },
            {
              icon: TrendingUp,
              title: "Lojas Ativas",
              description: "500+",
              color: "from-green-400 to-blue-500",
            },
            {
              icon: Globe,
              title: "Cobertura",
              description: "Todo Brasil",
              color: "from-yellow-400 to-orange-500",
            },
            {
              icon: Calendar,
              title: "Lançamento",
              description: "2024",
              color: "from-pink-400 to-red-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              className={`group text-center p-8 rounded-2xl shadow-xl border border-gray-100 bg-gradient-to-br ${stat.color} text-white relative overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:scale-105`}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.04 }}
              style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)' }}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-white/20 blur-lg opacity-70 animate-pulse" />
                <stat.icon size={32} className="text-white drop-shadow-lg z-10 group-hover:scale-110 transition-transform duration-200" />
              </div>
              <h3 className="text-2xl font-bold mb-2 drop-shadow-sm group-hover:underline underline-offset-4">{stat.title}</h3>
              <p className="text-white/90 text-base font-medium drop-shadow-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Releases */}
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
              Releases Recentes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Últimas notícias e comunicados oficiais
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Fomi Anuncia Expansão Nacional",
                date: "15 de Março, 2024",
                excerpt: "Plataforma de e-commerce para lanches expande operações para todo o Brasil, democratizando o acesso ao comércio digital.",
                category: "Expansão",
                isNew: true,
              },
              {
                title: "Nova Integração com WhatsApp Business",
                date: "8 de Março, 2024",
                excerpt: "Fomi lança integração nativa com WhatsApp Business, facilitando ainda mais a comunicação entre lojistas e clientes.",
                category: "Produto",
                isNew: false,
              },
              {
                title: "Parceria com Associações Comerciais",
                date: "1 de Março, 2024",
                excerpt: "Fomi estabelece parcerias estratégicas com associações comerciais para capacitar pequenos empreendedores.",
                category: "Parceria",
                isNew: false,
              },
              {
                title: "Investimento em Tecnologia",
                date: "22 de Fevereiro, 2024",
                excerpt: "Empresa anuncia investimento de R$ 2 milhões em desenvolvimento de novas funcionalidades e melhorias na plataforma.",
                category: "Investimento",
                isNew: false,
              },
              {
                title: "Programa de Mentoria para Lojistas",
                date: "15 de Fevereiro, 2024",
                excerpt: "Fomi lança programa gratuito de mentoria para ajudar pequenos empreendedores a crescerem no digital.",
                category: "Responsabilidade Social",
                isNew: false,
              },
              {
                title: "Reconhecimento em Prêmio de Inovação",
                date: "8 de Fevereiro, 2024",
                excerpt: "Fomi é reconhecida como uma das startups mais inovadoras do Brasil em premiação da Associação Brasileira de Startups.",
                category: "Reconhecimento",
                isNew: false,
              },
            ].map((release, index) => (
              <motion.div
                key={release.title}
                className="group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-gray-50 to-white">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {release.category}
                      </Badge>
                      {release.isNew && (
                        <Badge className="bg-green-500 text-white text-xs">
                          Novo
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {release.title}
                    </CardTitle>
                    <p className="text-sm text-gray-500">{release.date}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {release.excerpt}
                    </p>
                    <Button className="w-full bg-primary hover:bg-secondary transition-colors">
                      Ler Release Completo
                      <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Recursos para Mídia */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recursos para Mídia
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Materiais e informações para jornalistas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Download,
              title: "Kit de Imprensa",
              description: "Logos, fotos e informações essenciais sobre o Fomi em alta resolução.",
              action: "Download Kit",
              color: "from-blue-500 to-indigo-500",
            },
            {
              icon: FileText,
              title: "Fact Sheet",
              description: "Dados atualizados sobre a empresa, produtos e mercado de atuação.",
              action: "Baixar PDF",
              color: "from-green-500 to-emerald-500",
            },
            {
              icon: Users,
              title: "Executivos",
              description: "Biografias e fotos dos principais executivos da empresa.",
              action: "Ver Perfis",
              color: "from-purple-500 to-pink-500",
            },
            {
              icon: TrendingUp,
              title: "Dados de Mercado",
              description: "Estatísticas e pesquisas sobre e-commerce e delivery no Brasil.",
              action: "Acessar Dados",
              color: "from-orange-500 to-red-500",
            },
            {
              icon: Globe,
              title: "Cobertura de Mídia",
              description: "Links para matérias e reportagens sobre o Fomi.",
              action: "Ver Matérias",
              color: "from-teal-500 to-cyan-500",
            },
            {
              icon: Calendar,
              title: "Agenda de Eventos",
              description: "Próximos eventos, palestras e participações da empresa.",
              action: "Ver Agenda",
              color: "from-yellow-500 to-orange-500",
            },
          ].map((resource, index) => (
            <motion.div
              key={resource.title}
              className={`group text-center p-8 rounded-2xl shadow-xl border border-gray-100 bg-gradient-to-br ${resource.color} text-white relative overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:scale-105`}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.04 }}
              style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)' }}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-white/20 blur-lg opacity-70 animate-pulse" />
                <resource.icon size={32} className="text-white drop-shadow-lg z-10 group-hover:scale-110 transition-transform duration-200" />
              </div>
              <h3 className="text-2xl font-bold mb-2 drop-shadow-sm group-hover:underline underline-offset-4">{resource.title}</h3>
              <p className="text-white/90 text-base font-medium drop-shadow-sm mb-4">{resource.description}</p>
              <Button className="bg-white text-gray-900 hover:bg-gray-100 transition-colors">
                {resource.action}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contatos */}
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
              Contato com a Imprensa
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Nossa equipe de comunicação está à disposição
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Mail,
                title: "Email",
                contact: "imprensa@fomi.com.br",
                description: "Para releases e informações gerais",
              },
              {
                icon: Phone,
                title: "Telefone",
                contact: "+55 (11) 99999-9999",
                description: "Para entrevistas e emergências",
              },
              {
                icon: Users,
                title: "WhatsApp",
                contact: "+55 (11) 99999-9999",
                description: "Para contatos rápidos",
              },
            ].map((contact, index) => (
              <motion.div
                key={contact.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-white/20 rounded-full">
                  <contact.icon size={32} className="text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">{contact.title}</h3>
                <p className="text-white font-medium mb-2">{contact.contact}</p>
                <p className="text-white/80 text-sm">{contact.description}</p>
              </motion.div>
            ))}
          </div>
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
              Dúvidas comuns sobre contato com a imprensa
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "Como solicitar uma entrevista?",
                answer: "Entre em contato via email ou telefone com pelo menos 48h de antecedência. Inclua o tema da matéria e prazo de entrega.",
              },
              {
                question: "Vocês fornecem dados de mercado?",
                answer: "Sim! Temos pesquisas e dados sobre e-commerce que podem ser compartilhados com jornalistas credenciados.",
              },
              {
                question: "Posso usar as fotos do kit de imprensa?",
                answer: "Sim, as imagens do kit de imprensa são de uso livre para veículos de comunicação.",
              },
              {
                question: "Qual o prazo para resposta?",
                answer: "Respondemos em até 24h em dias úteis. Para urgências, use o WhatsApp ou telefone.",
              },
              {
                question: "Vocês fazem parcerias com mídia?",
                answer: "Sim! Estamos abertos a parcerias editoriais e projetos especiais com veículos de comunicação.",
              },
              {
                question: "Como acompanhar releases?",
                answer: "Cadastre-se em nossa newsletter de imprensa ou siga nossas redes sociais para receber releases automaticamente.",
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
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Precisa de Mais Informações?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Nossa equipe de comunicação está pronta para ajudar
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="mailto:imprensa@fomi.com.br">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 shadow-xl transition-transform duration-200 hover:scale-105 hover:shadow-2xl focus:ring-2 focus:ring-primary/50 focus:outline-none"
                >
                  Enviar Email
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                Agendar Entrevista
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 