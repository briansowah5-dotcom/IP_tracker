// "use client"

// import React from "react"

// import { useState } from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { useAuth } from "../components/Authcontext"

// interface DashboardLayoutProps {
//   children: React.ReactNode
// }

// export default function DashboardLayout({ children }: DashboardLayoutProps) {
//   const { user, logout } = useAuth()
//   const pathname = usePathname()
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

//   const navigation = [
//     {
//       name: "Dashboard",
//       href: "/dashboard",
//       icon: (
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//         </svg>
//       ),
//     },
//     {
//       name: "Track IP",
//       href: "/track",
//       icon: (
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//         </svg>
//       ),
//     },
//     {
//       name: "History",
//       href: "/history",
//       icon: (
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//     },
//   ]

//   const handleLogout = () => {
//     logout()
//     window.location.href = "/login"
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Top Navigation */}
//       <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo */}
//             <div className="flex items-center gap-3">
//               <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-900">
//                 <svg
//                   className="w-5 h-5 text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
//                   />
//                 </svg>
//               </div>
//               <span className="font-semibold text-slate-900 hidden sm:block">IP Tracker</span>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex items-center gap-1">
//               {navigation.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                     pathname === item.href
//                       ? "bg-slate-100 text-slate-900"
//                       : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//                   }`}
//                 >
//                   {item.icon}
//                   {item.name}
//                 </Link>
//               ))}
//             </nav>

//             {/* User Menu */}
//             <div className="flex items-center gap-3">
//               <div className="hidden sm:flex items-center gap-2 text-sm">
//                 <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium">
//                   {user?.username?.charAt(0).toUpperCase()}
//                 </div>
//                 <span className="text-slate-700">{user?.username}</span>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors hidden sm:block"
//               >
//                 Log out
//               </button>

//               {/* Mobile Menu Button */}
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   {isMobileMenuOpen ? (
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   ) : (
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                   )}
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden border-t border-slate-200 bg-white">
//             <div className="px-4 py-3 space-y-1">
//               {navigation.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//                     pathname === item.href
//                       ? "bg-slate-100 text-slate-900"
//                       : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//                   }`}
//                 >
//                   {item.icon}
//                   {item.name}
//                 </Link>
//               ))}
//               <div className="border-t border-slate-200 pt-3 mt-3">
//                 <div className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600">
//                   <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium">
//                     {user?.username?.charAt(0).toUpperCase()}
//                   </div>
//                   <span>{user?.username}</span>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                 >
//                   Log out
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {children}
//       </main>
//     </div>
//   )
// }

"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./Authcontext"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: "History",
      href: "/history",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ]

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-900">
                <svg
                  className="w-5 h-5 text-white"
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
              <span className="font-semibold text-slate-900 hidden sm:block">IP Tracker</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-slate-900">{user?.username}</p>
                <p className="text-xs text-slate-500">User</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <nav className="px-4 py-3 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}