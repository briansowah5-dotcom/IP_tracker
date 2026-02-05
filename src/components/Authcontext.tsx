import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

interface User {
  username: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => { success: boolean; error?: string }
  signup: (username: string, password: string) => { success: boolean; error?: string }
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize state from localStorage
    const storedUser = localStorage.getItem("currentUser")
    return storedUser ? JSON.parse(storedUser) : null
  })
  const [isLoading] = useState(false)

  const login = (username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "{}")
    
    if (users[username] && users[username] === password) {
      const userData = { username }
      setUser(userData)
      localStorage.setItem("currentUser", JSON.stringify(userData))
      return { success: true }
    }
    
    return { success: false, error: "Invalid username or password" }
  }

  const signup = (username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "{}")
    
    if (users[username]) {
      return { success: false, error: "Username already exists" }
    }
    
    users[username] = password
    localStorage.setItem("users", JSON.stringify(users))
    
    const userData = { username }
    setUser(userData)
    localStorage.setItem("currentUser", JSON.stringify(userData))
    
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}