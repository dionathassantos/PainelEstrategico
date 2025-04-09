"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { X, Plus, Trash2, Save, AlertCircle } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

interface EncaminhamentoItem {
  id: string
  description: string
  prazo: string
  responsavel: string
}

interface MetaEditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (updatedMeta: any) => void
  meta: {
    id: string
    status: "satisfatorio" | "alerta" | "critico" | "concluido" | "naoMonitorado"
    description: string
    responsible: string
    alcance: number
    date: string
    iniciativa: string
    resultado: string
    parecer: string
    encaminhamentos: EncaminhamentoItem[]
  } | null
}

export function MetaEditModal({ isOpen, onClose, onSave, meta }: MetaEditModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    id: "",
    iniciativa: "",
    resultado: "",
    description: "",
    responsible: "",
    alcance: 0,
    status: "satisfatorio" as "satisfatorio" | "alerta" | "critico" | "concluido" | "naoMonitorado",
    date: "",
    parecer: "",
    encaminhamentos: [] as EncaminhamentoItem[],
  })

  // Initialize form data when meta changes
  useEffect(() => {
    if (meta) {
      setFormData({
        id: meta.id,
        iniciativa: meta.iniciativa,
        resultado: meta.resultado,
        description: meta.description,
        responsible: meta.responsible,
        alcance: meta.alcance,
        status: meta.status,
        date: meta.date,
        parecer: meta.parecer,
        encaminhamentos: [...meta.encaminhamentos],
      })
      setFormErrors({})
    }
  }, [meta])

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen || !meta) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "alcance" ? Number.parseInt(value) || 0 : value,
    }))

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleStatusChange = (status: "satisfatorio" | "alerta" | "critico" | "concluido" | "naoMonitorado") => {
    setFormData((prev) => ({
      ...prev,
      status,
    }))
  }

  const handleEncaminhamentoChange = (index: number, field: string, value: string) => {
    const updatedEncaminhamentos = [...formData.encaminhamentos]
    updatedEncaminhamentos[index] = {
      ...updatedEncaminhamentos[index],
      [field]: value,
    }

    setFormData((prev) => ({
      ...prev,
      encaminhamentos: updatedEncaminhamentos,
    }))

    // Clear error for this encaminhamento if it exists
    if (formErrors[`encaminhamento-${index}-${field}`]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[`encaminhamento-${index}-${field}`]
        return newErrors
      })
    }
  }

  const addEncaminhamento = () => {
    const newEncaminhamento = {
      id: `new-${Date.now()}`,
      description: "",
      prazo: "",
      responsavel: "",
    }

    setFormData((prev) => ({
      ...prev,
      encaminhamentos: [...prev.encaminhamentos, newEncaminhamento],
    }))
  }

  const removeEncaminhamento = (index: number) => {
    const updatedEncaminhamentos = [...formData.encaminhamentos]
    updatedEncaminhamentos.splice(index, 1)

    setFormData((prev) => ({
      ...prev,
      encaminhamentos: updatedEncaminhamentos,
    }))
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    // Validate required fields
    if (!formData.description.trim()) {
      errors.description = "A descrição da meta é obrigatória"
    }

    if (!formData.responsible.trim()) {
      errors.responsible = "O responsável é obrigatório"
    }

    if (formData.alcance < 0 || formData.alcance > 100) {
      errors.alcance = "O alcance deve estar entre 0 e 100%"
    }

    // Validate encaminhamentos
    formData.encaminhamentos.forEach((item, index) => {
      if (!item.description.trim()) {
        errors[`encaminhamento-${index}-description`] = "A descrição é obrigatória"
      }
      if (!item.prazo.trim()) {
        errors[`encaminhamento-${index}-prazo`] = "O prazo é obrigatório"
      }
      if (!item.responsavel.trim()) {
        errors[`encaminhamento-${index}-responsavel`] = "O responsável é obrigatório"
      }
    })

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, you would send this data to your backend
      await new Promise((resolve) => setTimeout(resolve, 800))
      onSave(formData)
    } catch (error) {
      console.error("Error saving meta:", error)
      setFormErrors({
        submit: "Erro ao salvar. Tente novamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDateForInput = (dateString: string) => {
    // This is a simple conversion for the demo
    // In a real app, you'd want to properly parse and format the date
    const months: Record<string, string> = {
      Jan: "01",
      Fev: "02",
      Mar: "03",
      Abr: "04",
      Mai: "05",
      Jun: "06",
      Jul: "07",
      Ago: "08",
      Set: "09",
      Out: "10",
      Nov: "11",
      Dez: "12",
    }

    // Example: "Abr 2025" -> "2025-04"
    const parts = dateString.split(" ")
    if (parts.length === 2) {
      const month = months[parts[0]] || "01"
      const year = parts[1]
      return `${year}-${month}`
    }

    return dateString
  }

  const getStatusColor = (status: "satisfatorio" | "alerta" | "critico" | "concluido" | "naoMonitorado") => {
    switch (status) {
      case "satisfatorio":
        return "bg-[#03B51A]"
      case "alerta":
        return "bg-[#FFB001]"
      case "critico":
        return "bg-[#FF0028]"
      case "concluido":
        return "bg-[#04A2F3]"
      case "naoMonitorado":
        return "bg-[#CCCCCC]"
    }
  }

  const getStatusText = (status: "satisfatorio" | "alerta" | "critico" | "concluido" | "naoMonitorado") => {
    switch (status) {
      case "satisfatorio":
        return "Satisfatório"
      case "alerta":
        return "Alerta"
      case "critico":
        return "Crítico"
      case "concluido":
        return "Concluído"
      case "naoMonitorado":
        return "Não Monitorado"
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm"
        >
          <motion.div
            ref={modalRef}
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="meta-edit-modal-title"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-[#04695E]/10 to-white">
              <h2 id="meta-edit-modal-title" className="text-xl font-semibold text-[#04695E]">
                Editar Meta
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#04695E] focus:ring-offset-2 rounded-full p-1 transition-colors"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="overflow-auto max-h-[calc(90vh-140px)]">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Left Column */}
                  <div>
                    <div className="mb-4">
                      <label htmlFor="iniciativa" className="block text-sm font-medium text-gray-500 mb-1">
                        Iniciativa
                      </label>
                      <input
                        type="text"
                        id="iniciativa"
                        name="iniciativa"
                        value={formData.iniciativa}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#04695E]"
                      />
                      {formErrors.iniciativa && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {formErrors.iniciativa}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="resultado" className="block text-sm font-medium text-gray-500 mb-1">
                        Resultado
                      </label>
                      <input
                        type="text"
                        id="resultado"
                        name="resultado"
                        value={formData.resultado}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#04695E]"
                      />
                      {formErrors.resultado && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {formErrors.resultado}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-500 mb-1">
                        Meta <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#04695E] ${
                          formErrors.description ? "border-red-500" : "border-gray-300"
                        }`}
                        required
                      />
                      {formErrors.description && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {formErrors.description}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="responsible" className="block text-sm font-medium text-gray-500 mb-1">
                        Responsável <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="responsible"
                        name="responsible"
                        value={formData.responsible}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#04695E] ${
                          formErrors.responsible ? "border-red-500" : "border-gray-300"
                        }`}
                        required
                      />
                      {formErrors.responsible && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {formErrors.responsible}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Status <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {(["satisfatorio", "alerta", "critico", "concluido", "naoMonitorado"] as const).map(
                          (status) => (
                            <button
                              key={status}
                              type="button"
                              onClick={() => handleStatusChange(status)}
                              className={`flex items-center p-2 rounded-md border transition-all ${
                                formData.status === status
                                  ? "border-[#04695E] bg-[#04695E]/5 shadow-sm"
                                  : "border-gray-200 hover:bg-gray-50"
                              }`}
                            >
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
                                style={{ backgroundColor: "white", boxShadow: "0 0 0 2px #E5E5E5" }}
                              >
                                <div
                                  className={`w-6 h-6 rounded-full ${getStatusColor(status)} flex items-center justify-center`}
                                >
                                  <div className="w-3 h-3 rounded-full bg-white"></div>
                                </div>
                              </div>
                              <span className="text-sm">{getStatusText(status)}</span>
                            </button>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="date" className="block text-sm font-medium text-gray-500 mb-1">
                        Data <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="month"
                        id="date"
                        name="date"
                        value={formatDateForInput(formData.date)}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#04695E] ${
                          formErrors.date ? "border-red-500" : "border-gray-300"
                        }`}
                        required
                      />
                      {formErrors.date && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {formErrors.date}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="alcance" className="block text-sm font-medium text-gray-500 mb-1">
                        Alcance (%) <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center">
                        <input
                          type="range"
                          id="alcance-range"
                          name="alcance"
                          min="0"
                          max="100"
                          value={formData.alcance}
                          onChange={handleInputChange}
                          className="w-full mr-3"
                        />
                        <input
                          type="number"
                          id="alcance"
                          name="alcance"
                          min="0"
                          max="100"
                          value={formData.alcance}
                          onChange={handleInputChange}
                          className={`w-20 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#04695E] ${
                            formErrors.alcance ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                      </div>
                      {formErrors.alcance && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {formErrors.alcance}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Parecer */}
                <div className="mb-6">
                  <label htmlFor="parecer" className="block text-sm font-medium text-gray-500 mb-1">
                    Parecer
                  </label>
                  <textarea
                    id="parecer"
                    name="parecer"
                    value={formData.parecer}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#04695E]"
                  ></textarea>
                </div>

                {/* Encaminhamentos Table */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium text-[#04695E]">Encaminhamentos</h3>
                    <button
                      type="button"
                      onClick={addEncaminhamento}
                      className="flex items-center text-sm text-white bg-[#0DBAAD] hover:bg-[#04695E] px-3 py-1.5 rounded-md transition-colors"
                    >
                      <Plus size={16} className="mr-1" />
                      Adicionar
                    </button>
                  </div>

                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-3 px-4 text-left font-medium text-[#505050]">Encaminhamento</th>
                          <th className="py-3 px-4 text-left font-medium text-[#505050] w-32">Prazo</th>
                          <th className="py-3 px-4 text-left font-medium text-[#505050] w-40">Responsável</th>
                          <th className="py-3 px-4 text-center font-medium text-[#505050] w-20">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.encaminhamentos.map((item, index) => (
                          <tr key={item.id} className="border-t border-gray-200">
                            <td className="py-2 px-4">
                              <input
                                type="text"
                                value={item.description}
                                onChange={(e) => handleEncaminhamentoChange(index, "description", e.target.value)}
                                className={`w-full p-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#04695E] ${
                                  formErrors[`encaminhamento-${index}-description`]
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                                placeholder="Descrição do encaminhamento"
                              />
                              {formErrors[`encaminhamento-${index}-description`] && (
                                <p className="text-red-500 text-xs mt-1">
                                  {formErrors[`encaminhamento-${index}-description`]}
                                </p>
                              )}
                            </td>
                            <td className="py-2 px-4">
                              <input
                                type="text"
                                value={item.prazo}
                                onChange={(e) => handleEncaminhamentoChange(index, "prazo", e.target.value)}
                                className={`w-full p-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#04695E] ${
                                  formErrors[`encaminhamento-${index}-prazo`] ? "border-red-500" : "border-gray-300"
                                }`}
                                placeholder="DD/MM/AAAA"
                              />
                              {formErrors[`encaminhamento-${index}-prazo`] && (
                                <p className="text-red-500 text-xs mt-1">
                                  {formErrors[`encaminhamento-${index}-prazo`]}
                                </p>
                              )}
                            </td>
                            <td className="py-2 px-4">
                              <input
                                type="text"
                                value={item.responsavel}
                                onChange={(e) => handleEncaminhamentoChange(index, "responsavel", e.target.value)}
                                className={`w-full p-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#04695E] ${
                                  formErrors[`encaminhamento-${index}-responsavel`]
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                                placeholder="Nome do responsável"
                              />
                              {formErrors[`encaminhamento-${index}-responsavel`] && (
                                <p className="text-red-500 text-xs mt-1">
                                  {formErrors[`encaminhamento-${index}-responsavel`]}
                                </p>
                              )}
                            </td>
                            <td className="py-2 px-4 text-center">
                              <button
                                type="button"
                                onClick={() => removeEncaminhamento(index)}
                                className="text-red-500 hover:text-red-700 focus:outline-none transition-colors"
                                aria-label="Remover encaminhamento"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {formData.encaminhamentos.length === 0 && (
                          <tr>
                            <td colSpan={4} className="py-4 text-center text-gray-500">
                              Nenhum encaminhamento cadastrado. Clique em "Adicionar" para incluir.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {formErrors.submit && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm flex items-start">
                    <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                    <span>{formErrors.submit}</span>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-[#505050] rounded-md hover:bg-gray-300 focus:outline-none transition-colors mr-3"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#04695E] text-white rounded-md hover:bg-[#035a50] focus:outline-none transition-colors flex items-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Salvar Alterações
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
