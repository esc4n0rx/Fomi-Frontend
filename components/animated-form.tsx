"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, AlertCircle } from "lucide-react"

interface FormField {
  name: string
  label: string
  type: string
  placeholder: string
  validation?: (value: string) => string | null
}

interface AnimatedFormProps {
  title: string
  fields: FormField[]
  onSubmit: (data: Record<string, string>) => void
  submitText: string
}

export function AnimatedForm({ title, fields, onSubmit, submitText }: AnimatedFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateField = (field: FormField, value: string) => {
    if (field.validation) {
      return field.validation(value)
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate all fields
    const newErrors: Record<string, string> = {}
    fields.forEach((field) => {
      const error = validateField(field, formData[field.name] || "")
      if (error) {
        newErrors[field.name] = error
      }
    })

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      await onSubmit(formData)
    }

    setIsSubmitting(false)
  }

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-3xl font-bold text-center mb-8 gradient-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map((field, index) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index + 0.3 }}
          >
            <Label htmlFor={field.name} className="text-sm font-medium text-gray-700">
              {field.label}
            </Label>
            <div className="relative mt-1">
              <Input
                id={field.name}
                type={field.type === "password" && showPassword[field.name] ? "text" : field.type}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className={`transition-all duration-200 ${
                  errors[field.name]
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "focus:border-primary focus:ring-primary"
                }`}
              />

              {field.type === "password" && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword((prev) => ({ ...prev, [field.name]: !prev[field.name] }))}
                >
                  {showPassword[field.name] ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </div>

            <AnimatePresence>
              {errors[field.name] && (
                <motion.div
                  className="flex items-center space-x-2 mt-2 text-red-600 text-sm"
                  initial={{ opacity: 0, y: -10, x: -10 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <AlertCircle size={16} />
                  <span>{errors[field.name]}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * fields.length + 0.3 }}
        >
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 py-3 font-semibold"
            disabled={isSubmitting}
          >
            <motion.span animate={isSubmitting ? { opacity: 0.7 } : { opacity: 1 }}>
              {isSubmitting ? "Processando..." : submitText}
            </motion.span>
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}
