"use client"

import { AnimatedForm } from "@/components/animated-form"
import Link from "next/link"
import { motion } from "framer-motion"

// 1. Dividir os campos em steps
const steps = [
  {
    title: "Dados Pessoais",
    fields: [
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
    ],
  },
  {
    title: "Endereço",
    fields: [
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
        name: "rua",
        label: "Rua",
        type: "text",
        placeholder: "Rua",
        validation: (value: string) => {
          if (!value) return "Rua é obrigatória"
          return null
        },
      },
      {
        name: "numero",
        label: "Número",
        type: "text",
        placeholder: "Número",
        validation: (value: string) => {
          if (!value) return "Número é obrigatório"
          return null
        },
      },
      {
        name: "complemento",
        label: "Complemento",
        type: "text",
        placeholder: "Complemento (opcional)",
        validation: () => null,
      },
      {
        name: "bairro",
        label: "Bairro",
        type: "text",
        placeholder: "Bairro",
        validation: (value: string) => {
          if (!value) return "Bairro é obrigatório"
          return null
        },
      },
      {
        name: "cidade",
        label: "Cidade",
        type: "text",
        placeholder: "Cidade",
        validation: (value: string) => {
          if (!value) return "Cidade é obrigatória"
          return null
        },
      },
      {
        name: "estado",
        label: "Estado",
        type: "text",
        placeholder: "Estado",
        validation: (value: string) => {
          if (!value) return "Estado é obrigatório"
          return null
        },
      },
    ],
  },
  {
    title: "Confirmação",
    fields: [
      {
        name: "inviteCode",
        label: "Código de convite (opcional)",
        type: "text",
        placeholder: "Código de convite",
        validation: () => null,
      },
    ],
  },
]

import React, { useState } from "react"

export default function RegisterPage() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string | null>>({})
  const [loadingCep, setLoadingCep] = useState(false)
  const currentStep = steps[step]

  const validateStep = () => {
    const newErrors: Record<string, string | null> = {}
    currentStep.fields.forEach((field) => {
      const value = formData[field.name] || ""
      const error = field.validation(value)
      if (error) newErrors[field.name] = error
    })
    setErrors(newErrors)
    return Object.values(newErrors).every((e) => !e)
  }

  const handleChange = async (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: null }))

    // Busca CEP automático
    if (name === "cep") {
      const cep = value.replace(/\D/g, "")
      if (cep.length === 8) {
        setLoadingCep(true)
        try {
          const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
          const data = await res.json()
          if (data.erro) {
            setErrors((prev) => ({ ...prev, cep: "CEP não encontrado" }))
            setFormData((prev) => ({ ...prev, rua: "", bairro: "", cidade: "", estado: "" }))
          } else {
            setFormData((prev) => ({
              ...prev,
              rua: data.logradouro || "",
              bairro: data.bairro || "",
              cidade: data.localidade || "",
              estado: data.uf || "",
            }))
          }
        } catch (e) {
          setErrors((prev) => ({ ...prev, cep: "Erro ao buscar CEP" }))
        } finally {
          setLoadingCep(false)
        }
      }
    }
  }

  const handleNext = () => {
    if (validateStep()) setStep((s) => s + 1)
  }

  const handleBack = () => {
    setStep((s) => s - 1)
  }

  const handleRegister = async () => {
    if (!validateStep()) return
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
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
          <h2 className="text-xl font-bold mb-4 text-center">{currentStep.title}</h2>
          <form
            onSubmit={e => {
              e.preventDefault()
              if (step === steps.length - 1) handleRegister()
              else handleNext()
            }}
          >
            {currentStep.fields.map(field => (
              <div className="mb-4" key={field.name}>
                <label className="block text-sm font-medium mb-1" htmlFor={field.name}>{field.label}</label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={e => handleChange(field.name, e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 ${errors[field.name] ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors[field.name] && <span className="text-xs text-red-500">{errors[field.name]}</span>}
              </div>
            ))}
            <div className="flex justify-between mt-6">
              {step > 0 && (
                <button type="button" onClick={handleBack} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Voltar</button>
              )}
              <button type="submit" className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90 ml-auto">
                {step === steps.length - 1 ? "Criar Conta" : "Próximo"}
              </button>
            </div>
          </form>
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
