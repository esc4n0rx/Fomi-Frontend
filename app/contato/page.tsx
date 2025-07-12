"use client"

import { useState } from "react"
import { AnimatedNavbar } from "@/components/animated-navbar"
import { motion } from "framer-motion"
import { Mail, MessageCircle, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export default function ContatoPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulação de envio (substitua por integração real)
    setTimeout(() => {
      setLoading(false)
      setForm({ nome: "", email: "", mensagem: "" })
      toast({
        title: "Mensagem enviada!",
        description: "Recebemos seu contato e responderemos em breve.",
      })
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-neutral-light">
      <AnimatedNavbar />

      {/* HERO */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10 animate-gradient-x bg-gradient-to-br from-primary/30 via-secondary/20 to-white" />
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Fale com o <span className="gradient-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Suporte</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tire dúvidas, envie sugestões ou solicite suporte. Nosso time está pronto para ajudar você!
          </motion.p>
        </div>
      </section>

      {/* FORMULÁRIO DE CONTATO */}
      <section className="py-8 px-4 bg-white">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-2 text-primary flex items-center gap-2">
              <Mail className="w-6 h-6" /> Envie uma mensagem
            </h2>
            <p className="text-gray-600 mb-6">Preencha o formulário e nossa equipe responderá por email.</p>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <Input id="nome" name="nome" value={form.nome} onChange={handleChange} required placeholder="Seu nome" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="seu@email.com" />
              </div>
              <div>
                <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                <Textarea id="mensagem" name="mensagem" value={form.mensagem} onChange={handleChange} required placeholder="Como podemos ajudar?" rows={5} />
              </div>
              <Button type="submit" size="lg" className="w-full font-bold flex items-center justify-center gap-2" disabled={loading}>
                <Send className="w-5 h-5" /> {loading ? "Enviando..." : "Enviar mensagem"}
              </Button>
            </form>
          </motion.div>

          {/* OUTROS CANAIS DE SUPORTE */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <a
              href="https://wa.me/5599999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button size="lg" variant="outline" className="w-full flex items-center gap-2 border-green-400 text-green-600 hover:bg-green-50">
                <MessageCircle className="w-5 h-5" /> WhatsApp
                <Badge variant="secondary" className="ml-2 bg-green-400/20 text-green-700">Rápido</Badge>
              </Button>
            </a>
            <a
              href="mailto:suporte@fomi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button size="lg" variant="outline" className="w-full flex items-center gap-2 border-primary text-primary hover:bg-primary/10">
                <Mail className="w-5 h-5" /> Email
                <Badge variant="secondary" className="ml-2 bg-primary/20 text-primary">24h</Badge>
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 