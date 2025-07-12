"use client"

import { AnimatedNavbar } from "@/components/animated-navbar"
import { motion } from "framer-motion"
import { HelpCircle, Mail, MessageCircle, BookOpen, Zap, User } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const topicos = [
  {
    icon: HelpCircle,
    title: "Dúvidas Frequentes",
    description: "Encontre respostas para as perguntas mais comuns sobre o Fomi.",
    badge: "FAQ",
    color: "from-primary/80 to-secondary/80",
  },
  {
    icon: BookOpen,
    title: "Documentação",
    description: "Acesse guias e tutoriais detalhados para usar todos os recursos.",
    badge: "Guia",
    color: "from-green-400 to-blue-400",
  },
  {
    icon: MessageCircle,
    title: "Suporte via Chat",
    description: "Fale com nosso time em tempo real e resolva dúvidas rapidamente.",
    badge: "Chat",
    color: "from-yellow-400 to-orange-400",
  },
  {
    icon: Mail,
    title: "Contato por Email",
    description: "Envie sua dúvida ou solicitação e receba retorno em até 24h.",
    badge: "Email",
    color: "from-pink-400 to-red-400",
  },
]

const faqs = [
  {
    question: "Como acesso o suporte do Fomi?",
    answer: "Você pode acessar o suporte via chat, email ou consultar nossa documentação e FAQ nesta página.",
  },
  {
    question: "Qual o horário de atendimento?",
    answer: "Nosso suporte via chat funciona das 8h às 22h, todos os dias. Por email, respondemos em até 24h úteis.",
  },
  {
    question: "Onde encontro tutoriais para usar a plataforma?",
    answer: "Na seção de Documentação você encontra guias completos e vídeos passo a passo.",
  },
]

export default function CentralAjudaPage() {
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
            Central de <span className="gradient-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Ajuda</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tire suas dúvidas, acesse tutoriais e fale com nosso suporte sempre que precisar.
          </motion.p>
        </div>
      </section>

      {/* TÓPICOS DE SUPORTE */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Como podemos ajudar você?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Selecione um dos tópicos abaixo ou entre em contato com nosso time.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topicos.map((topico, index) => (
              <motion.div
                key={topico.title}
                className={`group p-0 rounded-2xl shadow-xl border border-gray-100 bg-gradient-to-br ${topico.color} text-white relative overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:scale-105`}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.04 }}
                style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)' }}
              >
                <Card className="bg-transparent border-none shadow-none">
                  <CardHeader className="flex flex-col items-center justify-center space-y-3 p-8">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 mb-2 animate-pulse">
                      <topico.icon size={32} className="text-white drop-shadow-lg" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white mb-1">{topico.title}</CardTitle>
                    <Badge variant="secondary" className="bg-white/80 text-primary font-semibold px-3 py-1 text-xs mb-2">{topico.badge}</Badge>
                  </CardHeader>
                  <CardContent className="text-white/90 text-base font-medium text-center pb-8">
                    {topico.description}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-neutral-light">
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
              Encontre respostas rápidas para dúvidas comuns sobre o suporte.
            </p>
          </motion.div>
          <Accordion type="single" collapsible className="rounded-2xl border bg-white shadow-lg">
            {faqs.map((faq, i) => (
              <AccordionItem value={faq.question} key={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CALL TO ACTION SUPORTE */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/80 to-secondary/80">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-white mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Precisa de atendimento humano?
          </motion.h2>
          <motion.p
            className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Nosso time está pronto para ajudar você por chat ou email. Clique abaixo e fale conosco!
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contato">
              <Button size="lg" className="bg-white text-primary font-bold text-lg px-10 py-5 shadow-xl hover:bg-primary/10 transition-transform duration-200 hover:scale-105">
                Falar com o Suporte
              </Button>
            </Link>
            <a href="mailto:suporte@fomi.com" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="text-white border-white/60 hover:bg-white/10">
                suporte@fomi.com
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 