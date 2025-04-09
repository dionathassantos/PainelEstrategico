"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Eye, EyeOff, Save, Trash2 } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "Ana Silva",
    email: "ana.silva@ncpi.org",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

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

    // Only validate password fields if any of them are filled
    if (formData.currentPassword || formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = "Senha atual é obrigatória para alterar a senha"
      }

      if (formData.newPassword && formData.newPassword.length < 6) {
        newErrors.newPassword = "A nova senha deve ter pelo menos 6 caracteres"
      }

      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "As senhas não coincidem"
      }
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
    setSuccessMessage("")

    try {
      // In a real app, you would send this data to your backend
      // await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccessMessage("Perfil atualizado com sucesso!")

      // Reset password fields
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))
    } catch (error) {
      console.error("Update error:", error)
      setErrors({ submit: "Erro ao atualizar perfil. Tente novamente." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      // In a real app, you would send this request to your backend
      // await fetch('/api/user/account', {
      //   method: 'DELETE',
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsDeleteModalOpen(false)
      router.push("/login")
    } catch (error) {
      console.error("Delete account error:", error)
      setIsDeleteModalOpen(false)
      setErrors({ submit: "Erro ao excluir conta. Tente novamente." })
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-bold text-[#04695E] mb-6">Configurações</h1>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {successMessage}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Informações do Perfil</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="fullName" className="block text-gray-600 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#04695E] ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-600 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#04695E] ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <h3 className="text-lg font-medium text-gray-700 mb-4">Alterar Senha</h3>

            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="currentPassword" className="block text-gray-600 mb-2">
                  Senha Atual
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#04695E] ${
                      errors.currentPassword ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>}
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-gray-600 mb-2">
                  Nova Senha
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#04695E] ${
                      errors.newPassword ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-gray-600 mb-2">
                  Confirmar Nova Senha
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#04695E] ${
                      errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            {errors.submit && <p className="text-red-500 text-sm mb-4">{errors.submit}</p>}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#0DBAAD] text-white py-2 px-6 rounded-full hover:bg-[#04695E] transition-colors disabled:opacity-70 flex items-center"
              >
                <Save size={18} className="mr-2" />
                {isSubmitting ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Excluir Conta</h2>
          <p className="text-gray-600 mb-6">
            Ao excluir sua conta, todos os seus dados serão permanentemente removidos. Esta ação não pode ser desfeita.
          </p>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="bg-white border border-red-500 text-red-500 py-2 px-6 rounded-full hover:bg-red-50 transition-colors flex items-center"
          >
            <Trash2 size={18} className="mr-2" />
            Excluir Minha Conta
          </button>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirmar Exclusão</h2>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita e todos os seus dados serão
              permanentemente removidos.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-gray-600 py-2 px-4 rounded-full hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition-colors"
              >
                Excluir Conta
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
