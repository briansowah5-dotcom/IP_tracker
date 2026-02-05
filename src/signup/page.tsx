// "use client"

// import type { FormEvent } from "react"
// import { useState, useEffect } from "react"
// import { useNavigate, Link } from "react-router-dom"
// import { useAuth } from "../components/Authcontext"

// export default function SignupPage() {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [error, setError] = useState("")
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const { signup, isAuthenticated } = useAuth()
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/dashboard", { replace: true })
//     }
//   }, [isAuthenticated, navigate])

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault()
//     setError("")

//     if (password !== confirmPassword) {
//       setError("Passwords do not match")
//       return
//     }

//     setIsSubmitting(true)

//     const result = signup(username, password)

//     if (result.success) {
//       navigate("/dashboard")
//     } else {
//       setError(result.error || "Signup failed")
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
//           <h1 className="text-2xl font-semibold text-slate-900">Create an account</h1>
//           <p className="text-slate-500 mt-2">Start tracking IP addresses today</p>
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
//                 placeholder="Choose a username"
//                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
//                 required
//                 minLength={3}
//               />
//               <p className="mt-1 text-xs text-slate-500">At least 3 characters</p>
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
//                 placeholder="Create a password"
//                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
//                 required
//                 minLength={6}
//               />
//               <p className="mt-1 text-xs text-slate-500">At least 6 characters</p>
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1.5">
//                 Confirm Password
//               </label>
//               <input
//                 id="confirmPassword"
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 placeholder="Confirm your password"
//                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-slate-900 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//             >
//               {isSubmitting ? "Creating account..." : "Create account"}
//             </button>
//           </form>

//           <div className="relative my-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-slate-200" />
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-slate-500">Already have an account?</span>
//             </div>
//           </div>

//           <Link
//             to="/login"
//             className="block w-full text-center py-2.5 px-4 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-all"
//           >
//             Sign in
//           </Link>
//         </div>

//         <p className="text-center text-slate-500 text-sm mt-6">
//           By signing up, you agree to our Terms of Service
//         </p>
//       </div>
//     </div>
//   )
// }

import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '../components/Authcontext'
import HomePage from '../Home/page'  // Changed from './home/page' to './Home/page'
import LoginPage from '../login/page'
import SignupPage from '../signup/page'
import DashboardPage from '../Dashboard/page'
import HistoryPage from '../history/page'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}