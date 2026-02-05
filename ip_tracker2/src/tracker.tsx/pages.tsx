"use client"

import { useState,  } from "react"
import { useNavigate } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import InfoPanel from "../components/InfoPanel"
import Map from "../components/Map"
import ProtectedRoute from "../components/protectedroute"
import { useAuth } from "../components/Authcontext"
import { useIPTracking } from "../libs/useIPtracking"
import type { LocationData } from "../types"

interface IpApiCoResponse {
  ip: string
  city: string
  region: string
  postal: string
  utc_offset: string
  org: string
  latitude: string
  longitude: string
  error?: boolean
  reason?: string
}

interface IpApiComResponse {
  status: string
  message?: string
  query: string
  city: string
  regionName: string
  zip: string
  timezone: string
  isp: string
  lat: number
  lon: number
}

export default function TrackerPage() {
  const [locationData, setLocationData] = useState<LocationData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { trackIP } = useIPTracking()

  const fetchLocationData = async (ipAddress?: string) => {
    setLoading(true)
    setError(null)

    try {
      // Validate if it's a private IP
      if (ipAddress) {
        const privateIPPattern = /^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.|127\.|169\.254\.)/
        if (privateIPPattern.test(ipAddress)) {
          throw new Error('Private IP addresses cannot be geolocated. Please use a public IP address.')
        }
      }

      let url: string
      let response: Response
      let data: IpApiCoResponse | IpApiComResponse

      if (ipAddress) {
        // Use ip-api.com (no rate limit for reasonable usage, no API key needed)
        url = `http://ip-api.com/json/${ipAddress}?fields=status,message,query,city,regionName,zip,lat,lon,timezone,isp`
        response = await fetch(url)
        data = await response.json() as IpApiComResponse

        if (data.status === 'fail') {
          throw new Error(data.message || 'Invalid IP address')
        }

        const newLocationData = {
          ip: data.query,
          location: `${data.city}, ${data.regionName} ${data.zip || ""}`,
          timezone: data.timezone,
          isp: data.isp,
          lat: data.lat,
          lng: data.lon,
        }

        setLocationData(newLocationData)

        // Save to history
        await trackIP(data.query)
      } else {
        // Get user's own IP using ipify + ip-api
        const ipResponse = await fetch('https://api.ipify.org?format=json')
        const ipData = await ipResponse.json()
        const userIp = ipData.ip

        url = `http://ip-api.com/json/${userIp}?fields=status,message,query,city,regionName,zip,lat,lon,timezone,isp`
        response = await fetch(url)
        data = await response.json() as IpApiComResponse

        if (data.status === 'fail') {
          throw new Error('Failed to fetch location data')
        }

        setLocationData({
          ip: data.query,
          location: `${data.city}, ${data.regionName} ${data.zip || ""}`,
          timezone: data.timezone,
          isp: data.isp,
          lat: data.lat,
          lng: data.lon,
        })

        // Save to history
        await trackIP(data.query)
      }
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch IP data. Please try again.')
      setLocationData(null)
    } finally {
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   fetchLocationData()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const handleSearch = (ipAddress: string) => {
    const trimmedIp = ipAddress.trim()
    
    // Validate IP address format (basic validation)
    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/
    
    if (trimmedIp && !ipPattern.test(trimmedIp)) {
      setError('Please enter a valid IP address (e.g., 8.8.8.8)')
      return
    }

    // Validate IP octets are within range
    if (trimmedIp) {
      const octets = trimmedIp.split('.').map(Number)
      if (octets.some(octet => octet < 0 || octet > 255)) {
        setError('Invalid IP address. Each number must be between 0 and 255.')
        return
      }
    }

    fetchLocationData(trimmedIp || undefined)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-slate-900">IP Tracker</h1>
              </div>
              <nav className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-medium"
                >
                  Dashboard
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

        {/* Main Content */}
        <main className="relative">
          {/* Hero Section with Search */}
          <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-4">
                  IP Address Tracker
                </h2>
                <p className="text-slate-300 text-lg">
                  Track any IP address and get detailed location information
                </p>
              </div>
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>

          {/* Info Panel */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
            {error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl text-center">
                {error}
              </div>
            ) : locationData ? (
              <InfoPanel data={locationData} loading={loading} />
            ) : (
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center text-slate-500">
                  Enter an IP address to track
                </div>
              </div>
            )}
          </div>

          {/* Map Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-16">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-[500px]">
              {locationData ? (
                <Map center={[locationData.lat, locationData.lng]} zoom={13} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500">
                  Map will appear after searching
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
