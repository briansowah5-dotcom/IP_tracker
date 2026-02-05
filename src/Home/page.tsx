import { useNavigate } from "react-router-dom"
import { useAuth } from "../components/Authcontext"

export default function HomePage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
      <div className="text-center text-white px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </div>
        
        <h1 className="text-5xl font-bold mb-4">IP Address Tracker</h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Track any IP address and discover detailed location information, ISP details, and more.
        </p>
        
        <div className="flex gap-4 justify-center">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => navigate("/tracker")}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                Start Tracking
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-all"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  )
}