"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false)

  const { login, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)
    try {
      await login(email, password)
      // Redirect is handled in the login function
    } catch (error) {
      console.error("Login error:", error)
      toast({
        variant: "destructive",
        title: "Erro de login",
        description: "Email ou senha inválidos. Tente novamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#04695E] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center">
        {/* Left illustration */}
        <div className="hidden md:block md:w-1/4">
          <Image
            src="/placeholder.svg?height=300&width=200"
            alt="Illustration"
            width={200}
            height={300}
            className="max-w-full"
          />
        </div>

        {/* Login form */}
        <div className="w-full max-w-md bg-white rounded-[40px] p-8 md:p-12 relative z-10">
          <div className="flex justify-center mb-8">
            <Image src="/placeholder.svg?height=60&width=120" alt="NCPI Logo" width={120} height={60} />
          </div>

          <h1 className="text-[#04695E] text-2xl font-medium text-center mb-8">Login</h1>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-600 mb-2">
                E-Mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#04695E]"
                required
              />
            </div>

            <div className="mb-8">
              <label htmlFor="password" className="block text-gray-600 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#04695E]"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0DBAAD] text-white py-3 px-4 rounded-full hover:bg-[#04695E] transition-colors disabled:opacity-70"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsRegistrationModalOpen(true)}
              className="text-[#04695E] hover:underline focus:outline-none"
            >
              Solicitar acesso
            </button>
          </div>
        </div>

        {/* Right content */}
        <div className="hidden md:flex md:w-2/5 md:flex-col md:items-center md:pl-12">
          <div className="text-white mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Olá! Bem-vindo ao
              <br />
              painel de indicadores
            </h2>
          </div>
          <Image
            src="/placeholder.svg?height=300&width=300"
            alt="Dashboard Illustration"
            width={300}
            height={300}
            className="max-w-full"
          />
        </div>
      </div>

      {/* Registration Modal */}
      {isRegistrationModalOpen && <RegistrationModal onClose={() => setIsRegistrationModalOpen(false)} />}
    </div>
  )
}

interface RegistrationModalProps {
  onClose: () => void
}

function RegistrationModal({ onClose }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nome completo é obrigatório"
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "E-mail inválido"
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória"
    } else if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, you would send this data to your backend
      // await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSubmitted(true)
    } catch (error) {
      console.error("Registration error:", error)
      setErrors({ submit: "Erro ao enviar solicitação. Tente novamente." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Fechar"
        >
          &times;
        </button>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-medium text-gray-800 mb-2">Solicitação Enviada</h2>
            <p className="text-gray-600 mb-6">
              Sua solicitação de acesso foi enviada com sucesso. Um administrador irá revisar e aprovar seu cadastro em
              breve.
            </p>
            <button
              onClick={onClose}
              className="bg-[#0DBAAD] text-white py-2 px-6 rounded-full hover:bg-[#04695E] transition-colors"
            >
              Fechar
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-medium text-[#04695E] mb-6 text-center">Solicitar Acesso</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-gray-600 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#04695E] ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="regEmail" className="block text-gray-600 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  id="regEmail"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#04695E] ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="regPassword" className="block text-gray-600 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  id="regPassword"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#04695E] ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-600 mb-1">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#04695E] ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              {errors.submit && <p className="text-red-500 text-sm mb-4">{errors.submit}</p>}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-600 mr-4 py-2 px-4 rounded-full hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0DBAAD] text-white py-2 px-6 rounded-full hover:bg-[#04695E] transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
