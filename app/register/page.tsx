"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import React, { useState } from "react"
import { authApi } from "@/lib/api"

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

// Função para calcular força da senha
function getPasswordStrength(password: string) {
  let score = 0
  if (!password) return 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return score
}

// Função para formatar CPF
function formatCPF(value: string) {
  const cpf = value.replace(/\D/g, "").slice(0, 11)
  return cpf
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
}

// Função para formatar CEP
function formatCEP(value: string) {
  const cep = value.replace(/\D/g, "").slice(0, 8)
  return cep.replace(/(\d{5})(\d{1,3})$/, "$1-$2")
}

export default function RegisterPage() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string | null>>({})
  const [loadingCep, setLoadingCep] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
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
    // Formatação automática de CPF e CEP
    if (name === "cpf") {
      value = formatCPF(value)
    }
    if (name === "cep") {
      value = formatCEP(value)
    }
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
    setIsLoading(true)
    setApiError(null)
    try {
      // Ajuste os nomes dos campos conforme esperado pela API
      const payload = {
        username: formData.username,
        nome: formData.name,
        email: formData.email,
        password: formData.password,
        cpf: formData.cpf,
        data_nascimento: formData.birthdate,
        endereco_cep: formData.cep,
        endereco_rua: formData.rua,
        endereco_numero: formData.numero,
        endereco_complemento: formData.complemento,
        endereco_bairro: formData.bairro,
        endereco_cidade: formData.cidade,
        endereco_estado: formData.estado,
        codigo_convite: formData.inviteCode,
      }
      await authApi.register(payload)
      window.location.href = "/login"
    } catch (error: any) {
      if (error.errors) {
        const apiErrors: Record<string, string | null> = {}
        error.errors.forEach((err: any) => {
          apiErrors[err.field] = String(err.message || 'Erro')
        })
        setErrors(apiErrors)
      } else {
        setApiError(error.message || 'Erro ao registrar')
      }
    } finally {
      setIsLoading(false)
    }
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
          {apiError && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{apiError}</div>}
          <form
            onSubmit={e => {
              e.preventDefault()
              if (step === steps.length - 1) handleRegister()
              else handleNext()
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
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
                      disabled={isLoading || (field.name === 'cep' && loadingCep)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 ${errors[field.name] ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {/* Barra de força da senha */}
                    {field.name === 'password' && (
                      <PasswordStrengthBar password={formData.password || ''} />
                    )}
                    {errors[field.name] && <span className="text-xs text-red-500">{errors[field.name]}</span>}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-between mt-6">
              {step > 0 && (
                <button type="button" onClick={handleBack} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Voltar</button>
              )}
              <button type="submit" className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90 ml-auto" disabled={isLoading}>
                {isLoading ? 'Enviando...' : (step === steps.length - 1 ? "Criar Conta" : "Próximo")}
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

// Componente de barra de força de senha
function PasswordStrengthBar({ password }: { password: string }) {
  const strength = getPasswordStrength(password)
  const levels = [
    { color: 'bg-red-400', label: 'Muito fraca' },
    { color: 'bg-orange-400', label: 'Fraca' },
    { color: 'bg-yellow-400', label: 'Média' },
    { color: 'bg-blue-400', label: 'Boa' },
    { color: 'bg-green-500', label: 'Forte' },
  ]
  return (
    <div className="mt-2">
      <div className="w-full h-2 bg-gray-200 rounded">
        <div
          className={`h-2 rounded transition-all duration-300 ${levels[strength - 1]?.color || ''}`}
          style={{ width: `${(strength / 5) * 100}%` }}
        />
      </div>
      {password && (
        <span className={`text-xs mt-1 block ${levels[strength - 1]?.color || 'text-gray-400'}`}>{levels[strength - 1]?.label || 'Muito fraca'}</span>
      )}
    </div>
  )
}