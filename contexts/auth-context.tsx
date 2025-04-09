"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initAuth = async () => {
      await checkAuth()
      setIsLoading(false)
    }
    initAuth()
  }, [])

  // Protect routes
  useEffect(() => {
    const protectRoutes = async () => {
      // Skip protection for login and pending-approval pages
      if (pathname === "/login" || pathname === "/pending-approval") {
        return
      }

      const isAuthed = await checkAuth()

      if (!isAuthed && pathname !== "/login") {
        router.push("/login")
      }
    }

    if (!isLoading) {
      protectRoutes()
    }
  }, [pathname, isLoading, router])

  const checkAuth = async (): Promise<boolean> => {
    try {
      // In a real app, you would verify the token with your backend
      const storedUser = localStorage.getItem("user")
      const token = localStorage.getItem("token")

      if (storedUser && token) {
        setUser(JSON.parse(storedUser))
        return true
      }

      return false
    } catch (error) {
      console.error("Auth check failed:", error)
      return false
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, you would make an API call to authenticate
      // For demo purposes, we'll simulate a successful login

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const userData: User = {
        id: "1",
        name: "Ana Silva",
        email: email,
        role: email.includes("admin") ? "admin" : "user",
      }

      // Store auth data
      localStorage.setItem("user", JSON.stringify(userData))
      localStorage.setItem("token", "mock-jwt-token")

      setUser(userData)
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
      throw new Error("Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      // In a real app, you might want to invalidate the token on the server

      // Clear local storage
      localStorage.removeItem("user")
      localStorage.removeItem("token")

      // Clear state
      setUser(null)

      // Redirect to login
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
