"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SidebarProps {
  children?: React.ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

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

  if (!mounted) return null

  return (
    <div
      className={`relative bg-white h-full transition-all duration-300 ease-in-out rounded-tl-[13px] flex flex-col items-center ${
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
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 1.5L10 5.5L14.5 6.25L11.25 9.375L12.125 13.875L8 11.75L3.875 13.875L4.75 9.375L1.5 6.25L6 5.5L8 1.5Z"
                  fill="#04695E"
                />
              </svg>
            }
            label="Painel"
            active={true}
            collapsed={collapsed}
          />
          <MenuItem
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z"
                  stroke="#696969"
                  strokeWidth="1.5"
                />
              </svg>
            }
            label="Metas"
            collapsed={collapsed}
          />
          <MenuItem
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 2.5H2.5V13.5H13.5V2.5Z" stroke="#04695E" strokeWidth="1.5" />
              </svg>
            }
            label="Resultados"
            collapsed={collapsed}
          />
          <MenuItem
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5Z"
                  stroke="#04695E"
                  strokeWidth="1.5"
                />
                <path d="M8 4.5V8.5H12" stroke="#04695E" strokeWidth="1.5" />
              </svg>
            }
            label="Cronograma"
            collapsed={collapsed}
          />
          <MenuItem
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13 6.5C13 9.53757 8 14.5 8 14.5C8 14.5 3 9.53757 3 6.5C3 3.46243 5.23858 1 8 1C10.7614 1 13 3.46243 13 6.5Z"
                  stroke="#04695E"
                  strokeWidth="1.5"
                />
                <circle cx="8" cy="6.5" r="2" stroke="#04695E" strokeWidth="1.5" />
              </svg>
            }
            label="Localização"
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
  )
}

interface MenuItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  collapsed: boolean
}

function MenuItem({ icon, label, active = false, collapsed }: MenuItemProps) {
  return (
    <div className={`flex items-center ${active ? "relative" : ""}`}>
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
            {icon}
          </div>
        </>
      )}

      {!active && <div className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center">{icon}</div>}

      {!collapsed && (
        <span className={`ml-3 text-sm ${active ? "font-medium text-[#04695E]" : "text-gray-600"}`}>{label}</span>
      )}
    </div>
  )
}
