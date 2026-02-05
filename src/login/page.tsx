// "use client"

// import type { FormEvent } from "react"
// import { useState, useEffect } from "react"
// import { useNavigate, Link } from "react-router-dom"
// import { useAuth } from "../components/Authcontext"

// export default function LoginPage() {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const { login, signup, isAuthenticated } = useAuth()
//   const navigate = useNavigate()

//   // Redirect if already logged in
//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/dashboard", { replace: true })
//     }
//   }, [isAuthenticated, navigate])

//   const resetForm = () => {
//     setUsername("")
//     setPassword("")
//     setError("")
//   }

//   const switchMode = (newMode: AuthMode) => {
//     resetForm()
//     setMode(newMode)
//   }

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault()
//     setError("")

//     if (mode === "signup" && password !== confirmPassword) {
//       setError("Passwords do not match")
//       return
//     }

//     setIsSubmitting(true)

//     try {
//       const result = mode === "login" 
//         ? login(username, password) 
//         : signup(username, password)

//       if (result.success) {
//         // Small delay to ensure state is updated
//         setTimeout(() => {
//           navigate("/dashboard")
//         }, 100)
//       } else {
//         setError(result.error || `${mode === "login" ? "Login" : "Signup"} failed`)
//         setIsSubmitting(false)
//       }
//     } catch {
//       setError("An unexpected error occurred")
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 mb-4">
//             <svg
//               className="w-6 h-6 text-white"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
//               />
//             </svg>
//           </div>
//           <h1 className="text-2xl font-semibold text-slate-900">Welcome back</h1>
//           <p className="text-slate-500 mt-2">Sign in to your IP Tracker account</p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
//                 {error}
//               </div>
//             )}

//             <div>
//               <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1.5">
//                 Username
//               </label>
//               <input
//                 id="username"
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Enter your username"
//                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-slate-900 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//             >
//               {isSubmitting ? "Signing in..." : "Sign in"}
//             </button>
//           </form>

//           <div className="relative my-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-slate-200" />
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-slate-500">New to IP Tracker?</span>
//             </div>
//           </div>

//           <Link
//             to="/signup"
//             className="block w-full text-center py-2.5 px-4 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-all"
//           >
//             Create an account
//           </Link>
//         </div>

//         <p className="text-center text-slate-500 text-sm mt-6">
//           Secure IP tracking and location analytics
//         </p>
//       </div>
//     </div>
//   )
// }

"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../components/Authcontext"

type AuthMode = "login" | "signup"

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, signup, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true })
    }
  }, [isAuthenticated, navigate])

  const resetForm = () => {
    setUsername("")
    setPassword("")
    setConfirmPassword("")
    setError("")
  }

  const switchMode = (newMode: AuthMode) => {
    resetForm()
    setMode(newMode)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsSubmitting(true)

    try {
      const result = mode === "login" 
        ? login(username, password) 
        : signup(username, password)

      if (result.success) {
        // Small delay to ensure state is updated
        setTimeout(() => {
          navigate("/dashboard")
        }, 100)
      } else {
        setError(result.error || `${mode === "login" ? "Login" : "Signup"} failed`)
        setIsSubmitting(false)
      }
    } catch {
      setError("An unexpected error occurred")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 mb-4">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">
            {mode === "login" ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-slate-500 mt-2">
            {mode === "login" 
              ? "Sign in to your IP Tracker account" 
              : "Start tracking IP addresses today"}
          </p>
        </div>

        {/* Auth Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {/* Tab Switcher */}
          <div className="flex mb-6 bg-slate-50 rounded-lg p-1 border border-slate-200">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-all ${
                mode === "login"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => switchMode("signup")}
              className={`flex-1 py-2.5 px-4 text-sm font-semibold rounded-md transition-all ${
                mode === "signup"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Alert */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1.5">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={mode === "login" ? "Enter your username" : "Choose a username"}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                required
                minLength={mode === "signup" ? 3 : undefined}
              />
              {mode === "signup" && (
                <p className="mt-1 text-xs text-slate-500">At least 3 characters</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === "login" ? "Enter your password" : "Create a password"}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                required
                minLength={mode === "signup" ? 6 : undefined}
              />
              {mode === "signup" && (
                <p className="mt-1 text-xs text-slate-500">At least 6 characters</p>
              )}
            </div>

            {/* Confirm Password Field (Signup only) */}
            {mode === "signup" && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  required
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting 
                ? (mode === "login" ? "Signing in..." : "Creating account...") 
                : (mode === "login" ? "Sign in" : "Create account")}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-slate-500 text-sm">
            {mode === "login" 
              ? "Secure IP tracking and location analytics" 
              : "By creating an account, you agree to use this tool ethically"}
          </p>
        </div>
      </div>
    </div>
  )
}
