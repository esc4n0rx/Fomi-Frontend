"use client"

import { AnimatedForm } from "@/components/animated-form"
import Link from "next/link"
import { motion } from "framer-motion"

const registerFields = [
  {
    name: "username",
    label: "Nome de usuário",
    type: "text",
    placeholder: "seu_usuario",
    validation: (value: string) => {
      if (!value) return "Nome de usuário é obrigatório"
      if (value.length < 3) return "Deve ter pelo menos 3 caracteres"
      if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Apenas letras, números e underscore"
      return null
    },
  },
  {
    name: "name",
    label: "Nome completo",
    type: "text",
    placeholder: "Seu nome completo",
    validation: (value: string) => {
      if (!value) return "Nome é obrigatório"
      if (value.length < 2) return "Nome muito curto"
      return null
    },
  },
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
    placeholder: "Crie uma senha forte",
    validation: (value: string) => {
      if (!value) return "Senha é obrigatória"
      if (value.length < 8) return "Senha deve ter pelo menos 8 caracteres"
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) return "Deve conter maiúscula, minúscula e número"
      return null
    },
  },
  {
    name: "cpf",
    label: "CPF",
    type: "text",
    placeholder: "000.000.000-00",
    validation: (value: string) => {
      if (!value) return "CPF é obrigatório"
      const cpf = value.replace(/\D/g, "")
      if (cpf.length !== 11) return "CPF deve ter 11 dígitos"
      return null
    },
  },
  {
    name: "birthdate",
    label: "Data de nascimento",
    type: "date",
    placeholder: "",
    validation: (value: string) => {
      if (!value) return "Data de nascimento é obrigatória"
      const birthDate = new Date(value)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      if (age < 18) return "Você deve ter pelo menos 18 anos"
      return null
    },
  },
  {
    name: "cep",
    label: "CEP",
    type: "text",
    placeholder: "00000-000",
    validation: (value: string) => {
      if (!value) return "CEP é obrigatório"
      const cep = value.replace(/\D/g, "")
      if (cep.length !== 8) return "CEP deve ter 8 dígitos"
      return null
    },
  },
  {
    name: "inviteCode",
    label: "Código de convite (opcional)",
    type: "text",
    placeholder: "Código de convite",
    validation: () => null,
  },
]

export default function RegisterPage() {
  const handleRegister = async (data: Record<string, string>) => {
    console.log("Register data:", data)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
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
          <AnimatedForm
            title="Criar sua conta"
            fields={registerFields}
            onSubmit={handleRegister}
            submitText="Criar Conta"
          />

          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-gray-600">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-primary hover:text-primary/80 font-medium">
                Faça login
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
