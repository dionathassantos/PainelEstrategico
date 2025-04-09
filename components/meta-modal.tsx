"use client"

import { useEffect, useRef, useState } from "react"
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  BarChart3,
  MessageSquare,
  Clock,
  CheckCircle2,
} from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

interface StatusHistoryItem {
  date: string
  status: "satisfatorio" | "alerta" | "critico" | "concluido" | "naoMonitorado"
  parecer: string
}

interface MetaModalProps {
  isOpen: boolean
  onClose: () => void
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
    statusHistory?: StatusHistoryItem[]
    encaminhamentos: {
      id: string
      description: string
      prazo: string
      responsavel: string
    }[]
  } | null
}

export function MetaModal({ isOpen, onClose, meta }: MetaModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [historyIndex, setHistoryIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "actions">("overview")
  const [animateStatus, setAnimateStatus] = useState(false)

  // Reset history index when meta changes
  useEffect(() => {
    setHistoryIndex(0)
    setActiveTab("overview")
  }, [meta?.id])

  // Animate status indicator on mount
  useEffect(() => {
    if (isOpen && meta) {
      setTimeout(() => setAnimateStatus(true), 300)
    } else {
      setAnimateStatus(false)
    }
  }, [isOpen, meta])

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

  // Handle tab key navigation
  useEffect(() => {
    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (event.shiftKey && document.activeElement === firstElement) {
          lastElement.focus()
          event.preventDefault()
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          firstElement.focus()
          event.preventDefault()
        }
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleTabKey)
    }

    return () => {
      document.removeEventListener("keydown", handleTabKey)
    }
  }, [isOpen])

  if (!isOpen || !meta) return null

  // Combine current status with history for navigation
  const currentStatus = {
    date: meta.date,
    status: meta.status,
    parecer: meta.parecer,
  }

  const allStatusHistory = [currentStatus, ...(meta.statusHistory || [])]
  const currentHistoryItem = allStatusHistory[historyIndex]

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

  const navigatePrev = () => {
    if (historyIndex < allStatusHistory.length - 1) {
      setHistoryIndex(historyIndex + 1)
    }
  }

  const navigateNext = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
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
            aria-labelledby="meta-modal-title"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-[#04695E]/10 to-white">
              <div className="flex items-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: animateStatus ? 1 : 0.5, opacity: animateStatus ? 1 : 0 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.2 }}
                  className={`w-3 h-3 rounded-full ${getStatusColor(meta.status)} mr-3`}
                ></motion.div>
                <h2 id="meta-modal-title" className="text-xl font-semibold text-[#04695E]">
                  {meta.description}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#04695E] focus:ring-offset-2 rounded-full p-1 transition-colors"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex px-6" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`py-4 px-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "overview"
                      ? "border-[#04695E] text-[#04695E]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  aria-current={activeTab === "overview" ? "page" : undefined}
                >
                  Visão Geral
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`py-4 px-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "history"
                      ? "border-[#04695E] text-[#04695E]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  aria-current={activeTab === "history" ? "page" : undefined}
                >
                  Histórico de Status
                </button>
                <button
                  onClick={() => setActiveTab("actions")}
                  className={`py-4 px-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "actions"
                      ? "border-[#04695E] text-[#04695E]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  aria-current={activeTab === "actions" ? "page" : undefined}
                >
                  Encaminhamentos
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="p-6 overflow-auto max-h-[calc(90vh-140px)]">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Initiative & Result Card */}
                    <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-[#F4F4EF] flex items-center justify-center mr-2">
                            <BarChart3 size={16} className="text-[#04695E]" />
                          </div>
                          <label className="text-sm font-medium text-gray-500">Iniciativa</label>
                        </div>
                        <div className="text-[#04695E] font-medium pl-10">{meta.iniciativa}</div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-[#F4F4EF] flex items-center justify-center mr-2">
                            <CheckCircle2 size={16} className="text-[#04695E]" />
                          </div>
                          <label className="text-sm font-medium text-gray-500">Resultado</label>
                        </div>
                        <div className="text-[#505050] pl-10">{meta.resultado}</div>
                      </div>
                    </div>

                    {/* Responsible & Progress Card */}
                    <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-[#F4F4EF] flex items-center justify-center mr-2">
                            <User size={16} className="text-[#04695E]" />
                          </div>
                          <label className="text-sm font-medium text-gray-500">Responsável</label>
                        </div>
                        <div className="text-[#505050] font-medium pl-10">{meta.responsible}</div>
                      </div>

                      <div>
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-[#F4F4EF] flex items-center justify-center mr-2">
                            <BarChart3 size={16} className="text-[#04695E]" />
                          </div>
                          <label className="text-sm font-medium text-gray-500">Alcance</label>
                        </div>
                        <div className="flex items-center pl-10">
                          <div className="relative inline-flex items-center justify-center">
                            <svg width="60" height="60" viewBox="0 0 60 60">
                              <circle cx="30" cy="30" r="24" fill="transparent" stroke="#E5E5E5" strokeWidth="6" />
                              <motion.circle
                                cx="30"
                                cy="30"
                                r="24"
                                fill="transparent"
                                stroke={meta.alcance === 0 ? "#E5E5E5" : meta.alcance === 100 ? "#03B51A" : "#909090"}
                                strokeWidth="6"
                                strokeDasharray={2 * Math.PI * 24}
                                initial={{ strokeDashoffset: 2 * Math.PI * 24 }}
                                animate={{
                                  strokeDashoffset: 2 * Math.PI * 24 - (meta.alcance / 100) * (2 * Math.PI * 24),
                                }}
                                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                                strokeLinecap="round"
                                transform="rotate(-90 30 30)"
                              />
                            </svg>
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1 }}
                              className="absolute text-lg font-medium text-[#505050]"
                            >
                              {meta.alcance}%
                            </motion.span>
                          </div>
                          <span className="ml-3 text-[#505050]">de conclusão</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Current Status Card */}
                  <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow mb-6">
                    <h3 className="text-lg font-medium text-[#04695E] mb-4">Status Atual</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-[#F4F4EF] flex items-center justify-center mr-2">
                            <div
                              className={`w-6 h-6 rounded-full ${getStatusColor(meta.status)} flex items-center justify-center`}
                            >
                              <div className="w-3 h-3 rounded-full bg-white"></div>
                            </div>
                          </div>
                          <label className="text-sm font-medium text-gray-500">Status</label>
                        </div>
                        <div className="text-[#505050] font-medium pl-10">{getStatusText(meta.status)}</div>
                      </div>

                      <div>
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-[#F4F4EF] flex items-center justify-center mr-2">
                            <Calendar size={16} className="text-[#04695E]" />
                          </div>
                          <label className="text-sm font-medium text-gray-500">Data</label>
                        </div>
                        <div className="text-[#505050] pl-10">{meta.date}</div>
                      </div>

                      <div className="md:col-span-3">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-[#F4F4EF] flex items-center justify-center mr-2">
                            <MessageSquare size={16} className="text-[#04695E]" />
                          </div>
                          <label className="text-sm font-medium text-gray-500">Parecer</label>
                        </div>
                        <div className="p-4 bg-white rounded-md text-[#505050] border border-gray-200 min-h-[100px] pl-10">
                          {meta.parecer}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* History Tab */}
              {activeTab === "history" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-[#04695E]">Histórico de Status</h3>

                      {/* History Navigation Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={navigatePrev}
                          disabled={historyIndex >= allStatusHistory.length - 1}
                          className={`p-1 rounded-full ${
                            historyIndex >= allStatusHistory.length - 1
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-[#04695E] hover:bg-gray-200"
                          }`}
                          aria-label="Ver status anterior"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <span className="text-sm text-gray-500">
                          {historyIndex === 0 ? "Atual" : `Histórico ${historyIndex}/${allStatusHistory.length - 1}`}
                        </span>
                        <button
                          onClick={navigateNext}
                          disabled={historyIndex <= 0}
                          className={`p-1 rounded-full ${
                            historyIndex <= 0 ? "text-gray-300 cursor-not-allowed" : "text-[#04695E] hover:bg-gray-200"
                          }`}
                          aria-label="Ver status mais recente"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-[#F4F4EF] flex items-center justify-center mr-2">
                            <div
                              className={`w-6 h-6 rounded-full ${getStatusColor(
                                currentHistoryItem.status,
                              )} flex items-center justify-center`}
                            >
                              <div className="w-3 h-3 rounded-full bg-white"></div>
                            </div>
                          </div>
                          <label className="text-sm font-medium text-gray-500">Status</label>
                        </div>
                        <div className="text-[#505050] font-medium pl-10">
                          {getStatusText(currentHistoryItem.status)}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-[#F4F4EF] flex items-center justify-center mr-2">
                            <Calendar size={16} className="text-[#04695E]" />
                          </div>
                          <label className="text-sm font-medium text-gray-500">Data</label>
                        </div>
                        <div className="text-[#505050] pl-10">{currentHistoryItem.date}</div>
                      </div>

                      <div className="md:col-span-3">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-[#F4F4EF] flex items-center justify-center mr-2">
                            <MessageSquare size={16} className="text-[#04695E]" />
                          </div>
                          <label className="text-sm font-medium text-gray-500">Parecer</label>
                        </div>
                        <div className="p-4 bg-white rounded-md text-[#505050] border border-gray-200 min-h-[100px] pl-10">
                          {currentHistoryItem.parecer}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  {allStatusHistory.length > 1 && (
                    <div className="mt-8">
                      <h4 className="text-md font-medium text-gray-700 mb-4">Linha do Tempo</h4>
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                        {allStatusHistory.map((item, index) => (
                          <div
                            key={index}
                            className={`relative pl-10 pb-6 ${index === historyIndex ? "opacity-100" : "opacity-60"}`}
                          >
                            <div
                              className={`absolute left-0 w-8 h-8 rounded-full ${getStatusColor(
                                item.status,
                              )} flex items-center justify-center z-10 border-2 border-white`}
                            >
                              <div className="w-4 h-4 rounded-full bg-white"></div>
                            </div>
                            <div
                              className={`p-4 rounded-lg ${
                                index === historyIndex ? "bg-gray-50 border border-gray-200" : ""
                              }`}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-gray-700">
                                  {index === 0 ? "Status Atual" : `Status Anterior ${index}`}
                                </span>
                                <span className="text-sm text-gray-500">{item.date}</span>
                              </div>
                              <div className="flex items-center mb-2">
                                <span className="text-sm font-medium text-gray-600 mr-2">Status:</span>
                                <span className="text-sm">{getStatusText(item.status)}</span>
                              </div>
                              <p className="text-sm text-gray-600 line-clamp-2">{item.parecer}</p>
                              {index !== historyIndex && (
                                <button
                                  onClick={() => setHistoryIndex(index)}
                                  className="mt-2 text-xs text-[#04695E] hover:underline"
                                >
                                  Ver detalhes
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Actions Tab */}
              {activeTab === "actions" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
                    <h3 className="text-lg font-medium text-[#04695E] mb-4">Encaminhamentos</h3>
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="py-3 px-4 text-left font-medium text-[#505050]">Encaminhamento</th>
                            <th className="py-3 px-4 text-left font-medium text-[#505050] w-32">Prazo</th>
                            <th className="py-3 px-4 text-left font-medium text-[#505050] w-40">Responsável</th>
                          </tr>
                        </thead>
                        <tbody>
                          {meta.encaminhamentos.length > 0 ? (
                            meta.encaminhamentos.map((item, index) => (
                              <motion.tr
                                key={item.id}
                                className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                              >
                                <td className="py-3 px-4 text-[#505050]">{item.description}</td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center">
                                    <Clock size={14} className="text-gray-400 mr-1" />
                                    <span className="text-[#505050]">{item.prazo}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-[#04695E]/10 flex items-center justify-center mr-2 text-[#04695E] text-xs font-medium">
                                      {item.responsavel
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .substring(0, 2)
                                        .toUpperCase()}
                                    </div>
                                    <span className="text-[#505050]">{item.responsavel}</span>
                                  </div>
                                </td>
                              </motion.tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={3} className="py-6 text-center text-gray-500">
                                Nenhum encaminhamento cadastrado para esta meta.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-[#505050] rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
