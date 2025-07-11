"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Loader2, Store, Palette, MapPin, Share2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface CreateStoreRequest {
  nome: string
  descricao: string
  whatsapp: string
  instagram: string
  facebook: string
  endereco_cep: string
  endereco_rua: string
  endereco_numero: string
  endereco_complemento: string
  endereco_bairro: string
  endereco_cidade: string
  endereco_estado: string
  cor_primaria: string
  cor_secundaria: string
}

const steps = [
  {
    title: "Dados Básicos",
    icon: <Store className="w-6 h-6" />,
  },
  {
    title: "Contatos & Redes",
    icon: <Share2 className="w-6 h-6" />,
  },
  {
    title: "Endereço",
    icon: <MapPin className="w-6 h-6" />,
  },
  {
    title: "Cores & Revisão",
    icon: <Palette className="w-6 h-6" />,
  },
]

const initialForm: CreateStoreRequest = {
  nome: "",
  descricao: "",
  whatsapp: "",
  instagram: "",
  facebook: "",
  endereco_cep: "",
  endereco_rua: "",
  endereco_numero: "",
  endereco_complemento: "",
  endereco_bairro: "",
  endereco_cidade: "",
  endereco_estado: "",
  cor_primaria: "#E63946",
  cor_secundaria: "#FFC300",
}

export default function CreateStorePage() {
  const [formData, setFormData] = useState<CreateStoreRequest>(initialForm)
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)
  const { createStore } = useAuth()
  const router = useRouter()

  // Validação por etapa
  const validateStep = () => {
    let err: any = {}
    if (step === 0) {
      if (!formData.nome.trim()) err.nome = "O nome da loja é obrigatório."
    }
    if (step === 2) {
      if (formData.endereco_cep && !/^\d{5}-?\d{3}$/.test(formData.endereco_cep)) err.endereco_cep = "CEP inválido."
      if (formData.endereco_estado && formData.endereco_estado.length !== 2) err.endereco_estado = "Use a sigla do estado (ex: SP)"
    }
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleNext = () => {
    if (validateStep()) setStep((s) => s + 1)
  }

  const handleBack = () => setStep((s) => s - 1)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep()) return
    
    setIsLoading(true)
    setErrors({})
    
    try {
      // Preparar dados para envio (remover campos vazios opcionais)
      const storeData: any = {
        nome: formData.nome.trim(),
      }

      // Adicionar campos opcionais apenas se preenchidos
      if (formData.descricao.trim()) storeData.descricao = formData.descricao.trim()
      if (formData.whatsapp.trim()) storeData.whatsapp = formData.whatsapp.trim()
      if (formData.instagram.trim()) storeData.instagram = formData.instagram.trim()
      if (formData.facebook.trim()) storeData.facebook = formData.facebook.trim()
      if (formData.endereco_cep.trim()) storeData.endereco_cep = formData.endereco_cep.trim()
      if (formData.endereco_rua.trim()) storeData.endereco_rua = formData.endereco_rua.trim()
      if (formData.endereco_numero.trim()) storeData.endereco_numero = formData.endereco_numero.trim()
      if (formData.endereco_complemento.trim()) storeData.endereco_complemento = formData.endereco_complemento.trim()
      if (formData.endereco_bairro.trim()) storeData.endereco_bairro = formData.endereco_bairro.trim()
      if (formData.endereco_cidade.trim()) storeData.endereco_cidade = formData.endereco_cidade.trim()
      if (formData.endereco_estado.trim()) storeData.endereco_estado = formData.endereco_estado.trim().toUpperCase()
      if (formData.cor_primaria) storeData.cor_primaria = formData.cor_primaria
      if (formData.cor_secundaria) storeData.cor_secundaria = formData.cor_secundaria

      await createStore(storeData)
      router.push("/plans")
    } catch (error: any) {
      console.error('Erro ao criar loja:', error)
      
      if (error.errors) {
        // Se a API retornou erros de validação específicos
        const apiErrors: any = {}
        error.errors.forEach((err: any) => {
          apiErrors[err.field] = err.message
        })
        setErrors(apiErrors)
      } else {
        setErrors({ general: error.message || "Ocorreu um erro ao criar a loja." })
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Stepper visual
  const Stepper = () => (
    <div className="flex items-center justify-center gap-4 mb-8">
      {steps.map((s, i) => (
        <div key={i} className="flex flex-col items-center flex-1">
          <motion.div
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${i <= step ? 'border-primary bg-primary text-white' : 'border-gray-200 bg-white text-gray-400'} transition-colors`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            {s.icon}
          </motion.div>
          <span className={`mt-2 text-xs font-medium ${i === step ? 'text-primary' : 'text-gray-400'}`}>{s.title}</span>
        </div>
      ))}
    </div>
  )

  // Etapas do formulário
  const stepsContent = [
    (
      <div className="space-y-6" key="step-0">
        <div>
          <Label htmlFor="nome">Nome da Loja *</Label>
          <Input
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Ex: Lanchonete do Bairro"
            className={errors.nome ? 'border-red-500' : ''}
            required
          />
          {errors.nome && <p className="text-xs text-red-500 mt-1">{errors.nome}</p>}
        </div>
        <div>
          <Label htmlFor="descricao">Descrição (opcional)</Label>
          <Textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Conte um pouco sobre sua loja, seus produtos e diferenciais."
            rows={3}
          />
        </div>
      </div>
    ),
    (
      <div className="space-y-6" key="step-1">
        <div>
          <Label htmlFor="whatsapp">WhatsApp (opcional)</Label>
          <Input
            id="whatsapp"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            placeholder="(11) 90000-0000"
          />
        </div>
        <div>
          <Label htmlFor="instagram">Instagram (opcional)</Label>
          <Input
            id="instagram"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            placeholder="@sualoja"
          />
        </div>
        <div>
          <Label htmlFor="facebook">Facebook (opcional)</Label>
          <Input
            id="facebook"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            placeholder="facebook.com/sualoja"
          />
        </div>
      </div>
    ),
    (
      <div className="space-y-4" key="step-2">
        <div>
          <Label htmlFor="endereco_cep">CEP</Label>
          <Input
            id="endereco_cep"
            name="endereco_cep"
            value={formData.endereco_cep}
            onChange={handleChange}
            placeholder="00000-000"
            className={errors.endereco_cep ? 'border-red-500' : ''}
            maxLength={9}
          />
          {errors.endereco_cep && <p className="text-xs text-red-500 mt-1">{errors.endereco_cep}</p>}
        </div>
        <div>
          <Label htmlFor="endereco_rua">Rua</Label>
          <Input
            id="endereco_rua"
            name="endereco_rua"
            value={formData.endereco_rua}
            onChange={handleChange}
            placeholder="Rua Exemplo"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="endereco_numero">Número</Label>
            <Input
              id="endereco_numero"
              name="endereco_numero"
              value={formData.endereco_numero}
              onChange={handleChange}
              placeholder="123"
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="endereco_complemento">Complemento</Label>
            <Input
              id="endereco_complemento"
              name="endereco_complemento"
              value={formData.endereco_complemento}
              onChange={handleChange}
              placeholder="Apto, sala, etc."
            />
          </div>
        </div>
        <div>
          <Label htmlFor="endereco_bairro">Bairro</Label>
          <Input
            id="endereco_bairro"
            name="endereco_bairro"
            value={formData.endereco_bairro}
            onChange={handleChange}
            placeholder="Centro"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="endereco_cidade">Cidade</Label>
            <Input
              id="endereco_cidade"
              name="endereco_cidade"
              value={formData.endereco_cidade}
              onChange={handleChange}
              placeholder="São Paulo"
            />
          </div>
          <div className="w-24">
            <Label htmlFor="endereco_estado">Estado</Label>
            <Input
              id="endereco_estado"
              name="endereco_estado"
              value={formData.endereco_estado}
              onChange={handleChange}
              placeholder="SP"
              maxLength={2}
              className={errors.endereco_estado ? 'border-red-500' : ''}
            />
            {errors.endereco_estado && <p className="text-xs text-red-500 mt-1">{errors.endereco_estado}</p>}
          </div>
        </div>
      </div>
    ),
    (
      <div className="space-y-6" key="step-3">
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="cor_primaria">Cor Primária</Label>
            <Input
              id="cor_primaria"
              name="cor_primaria"
              type="color"
              value={formData.cor_primaria || "#E63946"}
              onChange={handleChange}
              className="h-12 p-1 w-full"
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="cor_secundaria">Cor Secundária</Label>
            <Input
              id="cor_secundaria"
              name="cor_secundaria"
              type="color"
              value={formData.cor_secundaria || "#FFC300"}
              onChange={handleChange}
              className="h-12 p-1 w-full"
            />
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 border text-sm">
          <div className="font-semibold mb-2">Revisão dos dados principais</div>
          <ul className="space-y-1">
            <li><b>Nome:</b> {formData.nome}</li>
            {formData.descricao && <li><b>Descrição:</b> {formData.descricao}</li>}
            {formData.whatsapp && <li><b>WhatsApp:</b> {formData.whatsapp}</li>}
            {formData.instagram && <li><b>Instagram:</b> {formData.instagram}</li>}
            {formData.facebook && <li><b>Facebook:</b> {formData.facebook}</li>}
            {(formData.endereco_cep || formData.endereco_rua) && (
              <li><b>Endereço:</b> {formData.endereco_rua || ''} {formData.endereco_numero || ''}, {formData.endereco_bairro || ''}, {formData.endereco_cidade || ''} {formData.endereco_estado || ''} {formData.endereco_cep || ''} {formData.endereco_complemento && `(${formData.endereco_complemento})`}</li>
            )}
            <li><b>Cor Primária:</b> <span className="inline-block w-4 h-4 rounded-full align-middle" style={{background: formData.cor_primaria}} /></li>
            <li><b>Cor Secundária:</b> <span className="inline-block w-4 h-4 rounded-full align-middle" style={{background: formData.cor_secundaria}} /></li>
          </ul>
        </div>
      </div>
    ),
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl p-0 overflow-hidden shadow-xl">
        <CardHeader className="bg-gradient-to-br from-primary/90 to-secondary/80 text-white rounded-b-none rounded-t-2xl">
          <CardTitle className="flex items-center gap-2 text-white">
            <Store className="w-7 h-7" /> Nova Loja
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <Stepper />
          <Progress value={((step + 1) / steps.length) * 100} className="mb-6" />
          
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
              <AlertCircle size={16} />
              <span className="text-sm">{errors.general}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              >
                {stepsContent[step]}
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-between mt-8 gap-2">
              {step > 0 && (
                <Button type="button" variant="secondary" onClick={handleBack} disabled={isLoading}>
                  Voltar
                </Button>
              )}
              
              {step < steps.length - 1 && (
                <Button type="button" onClick={handleNext} className="ml-auto" disabled={isLoading}>
                  Próximo
                </Button>
              )}
              
              {step === steps.length - 1 && (
                <Button type="submit" className="ml-auto bg-primary hover:bg-primary/90 py-3 font-semibold" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando loja...
                    </>
                  ) : (
                    "Criar Minha Loja"
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}