"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

export default function PendingApprovalPage() {
  const router = useRouter()

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-[#04695E] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <Image src="/placeholder.svg?height=60&width=120" alt="NCPI Logo" width={120} height={60} />
        </div>

        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">Solicitação em Análise</h1>

        <p className="text-gray-600 mb-8">
          Sua solicitação de acesso está sendo analisada por um administrador. Você receberá um e-mail quando sua conta
          for aprovada.
        </p>

        <button
          onClick={handleLogout}
          className="bg-[#0DBAAD] text-white py-2 px-6 rounded-full hover:bg-[#04695E] transition-colors"
        >
          Voltar para Login
        </button>
      </div>
    </div>
  )
}
