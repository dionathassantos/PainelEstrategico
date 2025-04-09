"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronRight, Plus, Edit2 } from "lucide-react"
import { MetaModal } from "./meta-modal"
import { MetaEditModal } from "./meta-edit-modal"

interface InitiativeCardProps {
  id: string
  title: string
  description: string
  responsible: string
  metasCount: number
  statusCounts: {
    satisfatorio: number
    alerta: number
    critico: number
    concluido: number
    naoMonitorado: number
  }
  resultados?: ResultadoProps[]
  defaultOpen?: boolean
}

interface ResultadoProps {
  id: string
  title: string
  metas: MetaProps[]
  defaultOpen?: boolean
}

interface MetaProps {
  id: string
  status: "satisfatorio" | "alerta" | "critico" | "concluido" | "naoMonitorado"
  description: string
  responsible: string
  alcance: number
  date: string
  iniciativa?: string
  resultado?: string
  parecer?: string
  statusHistory?: {
    date: string
    status: "satisfatorio" | "alerta" | "critico" | "concluido" | "naoMonitorado"
    parecer: string
  }[]
  encaminhamentos?: {
    id: string
    description: string
    prazo: string
    responsavel: string
  }[]
}

export function InitiativeCard({
  id,
  title,
  description,
  responsible,
  metasCount,
  statusCounts,
  resultados = [],
  defaultOpen = false,
}: InitiativeCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [selectedMeta, setSelectedMeta] = useState<MetaProps | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleMetaClick = (meta: MetaProps, resultado: ResultadoProps) => {
    // Prepare the meta with additional information
    const enrichedMeta = {
      ...meta,
      iniciativa: title,
      resultado: resultado.title,
      parecer: meta.parecer || "Sem parecer disponível.",
      encaminhamentos: meta.encaminhamentos || [
        {
          id: "1",
          description: "Revisar estratégia de SEO para melhorar posicionamento",
          prazo: "30/06/2025",
          responsavel: "Ana Silva",
        },
        {
          id: "2",
          description: "Implementar novas palavras-chave no site",
          prazo: "15/07/2025",
          responsavel: "Carlos Mendes",
        },
      ],
    }

    setSelectedMeta(enrichedMeta)
    setIsModalOpen(true)
  }

  const handleEditClick = (meta: MetaProps, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the row click
    console.log("Edit button clicked")

    // Prepare the meta with additional information
    const enrichedMeta = {
      ...meta,
      iniciativa: title,
      resultado: meta.resultado || "Resultado não especificado",
      parecer: meta.parecer || "Sem parecer disponível.",
      encaminhamentos: meta.encaminhamentos || [
        {
          id: "1",
          description: "Revisar estratégia de SEO para melhorar posicionamento",
          prazo: "30/06/2025",
          responsavel: "Ana Silva",
        },
        {
          id: "2",
          description: "Implementar novas palavras-chave no site",
          prazo: "15/07/2025",
          responsavel: "Carlos Mendes",
        },
      ],
    }

    setSelectedMeta(enrichedMeta)
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = (updatedMeta: MetaProps) => {
    // In a real application, you would save the updated meta to your database
    console.log("Meta updated:", updatedMeta)

    // Close the edit modal
    setIsEditModalOpen(false)

    // You might want to update the local state to reflect the changes
    // This would require restructuring the data flow in a real application
    alert("Meta atualizada com sucesso!")
  }

  return (
    <>
      <div className="bg-white rounded-br-[30px] relative mb-4 border border-[#E5E5E5]">
        <div className="absolute left-0 top-0 h-full w-1 bg-[#A6CE39]"></div>
        <div className="absolute right-0 top-0 h-full w-1/4 bg-[rgba(9,69,62,0.03)] rounded-br-[30px]"></div>

        {/* Header */}
        <div className="p-4 relative">
          <div className="flex justify-between items-start">
            <div className="flex items-start">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#04695E] mt-1 mr-2 focus:outline-none"
                aria-expanded={isOpen}
              >
                {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
              <div>
                <h3 className="text-[#04695E] font-medium text-base">{title}</h3>
                {!isOpen && <p className="text-[#505050] text-sm mt-2 pr-4 max-w-3xl">{description}</p>}
              </div>
            </div>

            <div className="text-right">
              <div className="text-[#606060] text-sm font-bold uppercase">{metasCount} METAS</div>
              <div className="flex space-x-2 mt-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-[#03B51A] flex items-center justify-center text-white text-[10px]">
                    {statusCounts.satisfatorio}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-[#FFB001] flex items-center justify-center text-white text-[10px]">
                    {statusCounts.alerta}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-[#FF0028] flex items-center justify-center text-white text-[10px]">
                    {statusCounts.critico}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-[#04A2F3] flex items-center justify-center text-white text-[10px]">
                    {statusCounts.concluido}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-[#CCCCCC] flex items-center justify-center text-white text-[10px]">
                    {statusCounts.naoMonitorado}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute right-4 top-0 bg-[#EFEFEF] px-4 py-1 rounded-b-[15px]">
              <span className="text-[#505050] text-sm">{responsible}</span>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        {isOpen && (
          <div className="px-4 pb-4 pt-0">
            <p className="text-[#505050] text-sm ml-6 mb-6 max-w-3xl">{description}</p>

            {/* Action Buttons */}
            <div className="flex space-x-3 ml-6 mb-6">
              <button className="bg-[#0DBAAD] text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center">
                Novo Resultado
                <Plus size={16} className="ml-1" />
              </button>
              <button className="bg-[#E5E5E5] text-[#505050] px-3 py-1.5 rounded-full text-xs font-medium flex items-center">
                Nova Meta
                <Plus size={16} className="ml-1" />
              </button>
            </div>

            {/* Resultados Section */}
            {resultados.length > 0 && (
              <div className="ml-6">
                <h4 className="text-[#04695E] font-medium text-sm mb-4">Resultados</h4>

                {resultados.map((resultado) => (
                  <ResultadoAccordion
                    key={resultado.id}
                    {...resultado}
                    onMetaClick={(meta) => handleMetaClick(meta, resultado)}
                    onEditClick={handleEditClick}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Meta Modal */}
      <MetaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} meta={selectedMeta} />

      {/* Meta Edit Modal */}
      <MetaEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        meta={selectedMeta}
      />
    </>
  )
}

interface ResultadoAccordionProps extends ResultadoProps {
  onMetaClick: (meta: MetaProps) => void
  onEditClick: (meta: MetaProps, e: React.MouseEvent) => void
}

function ResultadoAccordion({
  id,
  title,
  metas,
  defaultOpen = false,
  onMetaClick,
  onEditClick,
}: ResultadoAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="mb-4 border-l-2 border-[#A6CE39]">
      <div className="flex items-center ml-2">
        <button onClick={() => setIsOpen(!isOpen)} className="text-[#04695E] focus:outline-none" aria-expanded={isOpen}>
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
        <h5 className="text-[#04695E] font-medium text-sm ml-2">{title}</h5>
      </div>

      {isOpen && (
        <div className="mt-4 ml-2">
          <div className="bg-white rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E5E5E5]">
                  <th className="py-2 px-4 text-left font-medium text-[#505050] w-24">Status</th>
                  <th className="py-2 px-4 text-left font-medium text-[#505050]">Meta</th>
                  <th className="py-2 px-4 text-left font-medium text-[#505050] w-32">Responsável</th>
                  <th className="py-2 px-4 text-center font-medium text-[#505050] w-24">Alcance</th>
                  <th className="py-2 px-4 text-center font-medium text-[#505050] w-20">Editar</th>
                </tr>
              </thead>
              <tbody>
                {metas.map((meta) => (
                  <tr
                    key={meta.id}
                    className="border-b border-[#E5E5E5] cursor-pointer hover:bg-gray-50"
                    onClick={() => onMetaClick(meta)}
                  >
                    <td className="py-3 px-4">
                      <StatusIndicator status={meta.status} />
                      <div className="text-xs text-[#909090] mt-1">{meta.date}</div>
                    </td>
                    <td className="py-3 px-4 text-[#505050]">{meta.description}</td>
                    <td className="py-3 px-4 text-[#505050]">{meta.responsible}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <ProgressCircle percentage={meta.alcance} />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <button
                          className="text-[#909090] hover:text-[#04695E] focus:outline-none"
                          onClick={(e) => {
                            e.stopPropagation()
                            onEditClick(meta, e)
                          }}
                          aria-label="Editar meta"
                        >
                          <Edit2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

function StatusIndicator({ status }: { status: MetaProps["status"] }) {
  const getStatusColor = () => {
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

  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center"
      style={{ backgroundColor: "white", boxShadow: "0 0 0 2px #E5E5E5" }}
    >
      <div className={`w-8 h-8 rounded-full ${getStatusColor()} flex items-center justify-center`}>
        <div className="w-4 h-4 rounded-full bg-white"></div>
      </div>
    </div>
  )
}

function ProgressCircle({ percentage }: { percentage: number }) {
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={radius} fill="transparent" stroke="#E5E5E5" strokeWidth="4" />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="transparent"
          stroke={percentage === 0 ? "#E5E5E5" : percentage === 100 ? "#03B51A" : "#909090"}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 24 24)"
        />
      </svg>
      <span className="absolute text-xs font-medium text-[#505050]">{percentage}%</span>
    </div>
  )
}
