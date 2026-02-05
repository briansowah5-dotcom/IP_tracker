import { useNavigate } from "react-router-dom"
import { useAuth } from "../components/Authcontext"
import ProtectedRoute from "../components/protectedroute"

export default function DashboardPage() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
              </div>
              <nav className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/tracker")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Track IP
                </button>
                <button
                  onClick={() => navigate("/history")}
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-medium"
                >
                  History
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-medium"
                >
                  Logout
                </button>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Welcome to IP Tracker</h2>
            <p className="text-slate-600 mb-6">Start tracking IP addresses to see their location and details.</p>
            
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/tracker")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Start Tracking
              </button>
              <button
                onClick={() => navigate("/history")}
                className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-medium"
              >
                View History
              </button>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}