"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Bell, ChevronLeft, ChevronRight, Home, LogOut, Settings, Star, Calendar, MapPin, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [isAdmin, setIsAdmin] = useState(true) // For demo purposes, set to true
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([
    {
      id: "1",
      name: "Carlos Mendes",
      email: "carlos.mendes@example.com",
      date: "2023-06-15",
    },
    {
      id: "2",
      name: "Mariana Oliveira",
      email: "mariana.oliveira@example.com",
      date: "2023-06-14",
    },
  ])

  const { logout } = useAuth()
  const { toast } = useToast()

  // Handle initial state based on screen size
  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleLogout = async () => {
    try {
      // Show loading spinner or indicator if needed
      await logout()

      // Toast notification will appear on the login page
      toast({
        variant: "success",
        title: "Logout bem-sucedido",
        description: "Você foi desconectado com sucesso.",
      })
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        variant: "destructive",
        title: "Erro ao sair",
        description: "Ocorreu um erro ao tentar sair. Tente novamente.",
      })
    }
  }

  const handleApproveRequest = (id: string) => {
    setPendingRequests((prev) => prev.filter((request) => request.id !== id))
    // In a real app, you would send this to your backend
  }

  const handleRejectRequest = (id: string) => {
    setPendingRequests((prev) => prev.filter((request) => request.id !== id))
    // In a real app, you would send this to your backend
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#F4F4EF] flex">
      {/* Sidebar */}
      <div
        className={`relative bg-white h-screen transition-all duration-300 ease-in-out rounded-tl-[13px] flex flex-col items-center ${
          collapsed ? "w-[70px]" : "w-[200px]"
        }`}
      >
        {/* Toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 bg-white rounded-full p-1 shadow-md z-20"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* Logo */}
        <div className="mt-6 mb-8 flex justify-center">
          <Image
            src="/placeholder.svg?height=46&width=49"
            alt="NCPI Logo"
            width={collapsed ? 36 : 49}
            height={collapsed ? 34 : 46}
          />
        </div>

        {/* Menu Items */}
        <div className="flex flex-col items-center w-full">
          <div className={`w-full flex flex-col ${collapsed ? "items-center" : "items-start pl-6"} space-y-6`}>
            <MenuItem
              icon={<Home size={20} />}
              label="Painel"
              active={pathname === "/dashboard"}
              href="/dashboard"
              collapsed={collapsed}
            />
            <MenuItem
              icon={<Star size={20} />}
              label="Metas"
              active={pathname === "/metas"}
              href="/metas"
              collapsed={collapsed}
            />
            <MenuItem
              icon={<Calendar size={20} />}
              label="Cronograma"
              active={pathname === "/cronograma"}
              href="/cronograma"
              collapsed={collapsed}
            />
            <MenuItem
              icon={<MapPin size={20} />}
              label="Localização"
              active={pathname === "/localizacao"}
              href="/localizacao"
              collapsed={collapsed}
            />
            <MenuItem
              icon={<Settings size={20} />}
              label="Configurações"
              active={pathname === "/settings"}
              href="/settings"
              collapsed={collapsed}
            />
          </div>
        </div>

        {/* User Profile */}
        {!collapsed && (
          <div className="mt-auto mb-6 w-[85%] bg-gray-50 rounded-full p-2 flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#04695E] flex items-center justify-center text-white text-xs font-bold">
              AS
            </div>
            <div className="ml-2 text-xs">
              <div className="font-medium">Ana Silva</div>
              <div className="text-gray-500 text-[10px]">ana.silva@ncpi.org</div>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="mt-auto mb-6">
            <div className="w-8 h-8 rounded-full bg-[#04695E] flex items-center justify-center text-white text-xs font-bold">
              AS
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white p-4 flex justify-between items-center shadow-sm">
          <h1 className="text-[#04695E] text-xl font-bold">Painel Estratégico NCPI</h1>

          <div className="flex items-center space-x-4">
            {isAdmin && (
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="text-gray-600 hover:text-[#04695E] focus:outline-none relative"
                >
                  <Bell size={20} />
                  {pendingRequests.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {pendingRequests.length}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50">
                    <div className="p-3 border-b border-gray-200">
                      <h3 className="text-sm font-semibold">Notificações</h3>
                    </div>

                    {pendingRequests.length > 0 ? (
                      <div className="max-h-96 overflow-y-auto">
                        {pendingRequests.map((request) => (
                          <div key={request.id} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                            <div className="flex items-start">
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
                                <User size={16} />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{request.name}</p>
                                <p className="text-xs text-gray-500">{request.email}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                  Solicitação de acesso: {new Date(request.date).toLocaleDateString()}
                                </p>
                                <div className="flex mt-2 space-x-2">
                                  <button
                                    onClick={() => handleApproveRequest(request.id)}
                                    className="text-xs bg-[#0DBAAD] text-white px-2 py-1 rounded-md hover:bg-[#04695E]"
                                  >
                                    Aprovar
                                  </button>
                                  <button
                                    onClick={() => handleRejectRequest(request.id)}
                                    className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300"
                                  >
                                    Rejeitar
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500 text-sm">Não há notificações no momento.</div>
                    )}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-[#04695E] focus:outline-none flex items-center"
            >
              <LogOut size={20} />
              {!collapsed && <span className="ml-2 text-sm">Sair</span>}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

interface MenuItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  href: string
  collapsed: boolean
}

function MenuItem({ icon, label, active = false, href, collapsed }: MenuItemProps) {
  return (
    <Link href={href} className={`flex items-center ${active ? "relative" : ""}`}>
      {active && (
        <>
          <div className={`absolute ${collapsed ? "left-0" : "-left-6"} top-0 h-full w-1 bg-[#04695E]`}></div>
          <div
            className={`w-10 h-10 rounded-full ${active ? "bg-[#F4F4EF]" : "bg-transparent"} flex items-center justify-center relative`}
          >
            {active && !collapsed && (
              <>
                <div className="absolute w-full h-9 bg-[#F4F4EF] -right-[68px]"></div>
                <div className="absolute w-4 h-4 bg-[#F4F4EF] rotate-45 -right-2 top-3"></div>
              </>
            )}
            <span className={active ? "text-[#04695E]" : "text-gray-600"}>{icon}</span>
          </div>
        </>
      )}

      {!active && (
        <div className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center">
          <span className="text-gray-600">{icon}</span>
        </div>
      )}

      {!collapsed && (
        <span className={`ml-3 text-sm ${active ? "font-medium text-[#04695E]" : "text-gray-600"}`}>{label}</span>
      )}
    </Link>
  )
}

interface PendingRequest {
  id: string
  name: string
  email: string
  date: string
}
