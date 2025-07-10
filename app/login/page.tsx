"use client"

import { AnimatedForm } from "@/components/animated-form"
import Link from "next/link"
import { motion } from "framer-motion"

const loginFields = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "seu@email.com",
    validation: (value: string) => {
      if (!value) return "Email é obrigatório"
      if (!/\S+@\S+\.\S+/.test(value)) return "Email inválido"
      return null
    },
  },
  {
    name: "password",
    label: "Senha",
    type: "password",
    placeholder: "Sua senha",
    validation: (value: string) => {
      if (!value) return "Senha é obrigatória"
      if (value.length < 6) return "Senha deve ter pelo menos 6 caracteres"
      return null
    },
  },
]

export default function LoginPage() {
  const handleLogin = async (data: Record<string, string>) => {
    console.log("Login data:", data)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // Redirect to dashboard
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-3xl font-bold gradient-text">Fomi</span>
          </Link>
        </motion.div>

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <AnimatedForm title="Entrar na sua conta" fields={loginFields} onSubmit={handleLogin} submitText="Entrar" />

          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-gray-600">
              Não tem uma conta?{" "}
              <Link href="/register" className="text-primary hover:text-primary/80 font-medium">
                Cadastre-se grátis
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
