"use client"

import { useState, useCallback, useEffect } from "react"
import { useAuth } from "../components/Authcontext"

//Types for IP tracking
export interface TrackedIP {
  id: string
  ipAddress: string
  country: string
  city: string
  region: string
  timestamp: string
  trackedBy: string
}

interface IPLocationData {
  country: string
  city: string
  region: string
}

const TRACKED_IPS_KEY = "trackedIPs"

// Validate IP address format (IPv4)
export function validateIPAddress(ip: string): boolean {
  const ipv4Pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  return ipv4Pattern.test(ip.trim())
}

// Generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function useIPTracking() {
  const { user } = useAuth()
  const [trackedIPs, setTrackedIPs] = useState<TrackedIP[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load tracked IPs from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(TRACKED_IPS_KEY)
      if (stored) {
        setTrackedIPs(JSON.parse(stored))
      }
    } catch (err) {
      console.error("Error loading tracked IPs:", err)
    }
    setIsInitialized(true)
  }, [])

  // Save tracked IPs to localStorage
  const saveTrackedIPs = useCallback((ips: TrackedIP[]) => {
    localStorage.setItem(TRACKED_IPS_KEY, JSON.stringify(ips))
    setTrackedIPs(ips)
  }, [])

  // Fetch location data for an IP address
  const fetchIPLocation = useCallback(async (ip: string): Promise<IPLocationData> => {
    try {
      // Using ipapi.co as primary (supports HTTPS)
      const response = await fetch(`https://ipapi.co/${ip}/json/`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch IP location")
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.reason || "Unable to locate IP address")
      }

      return {
        country: data.country_name || "Unknown",
        city: data.city || "Unknown",
        region: data.region || "Unknown",
      }
    } catch {
      // Fallback to ipapi.is
      try {
        const fallbackResponse = await fetch(`https://ipapi.is/json/?ip=${ip}`)
        
        if (!fallbackResponse.ok) {
          throw new Error("Fallback API failed")
        }
        
        const fallbackData = await fallbackResponse.json()

        return {
          country: fallbackData.location?.country || "Unknown",
          city: fallbackData.location?.city || "Unknown",
          region: fallbackData.location?.state || "Unknown",
        }
      } catch {
        throw new Error("Unable to locate IP address. Please try again.")
      }
    }
  }, [])

  // Track a new IP address
  const trackIP = useCallback(
    async (ipAddress: string): Promise<{ success: boolean; error?: string; data?: TrackedIP }> => {
      setError(null)

      // Validate IP format
      if (!validateIPAddress(ipAddress)) {
        const errorMsg = "Invalid IP address format. Please enter a valid IPv4 address."
        setError(errorMsg)
        return { success: false, error: errorMsg }
      }

      // Check if user is logged in
      if (!user) {
        const errorMsg = "You must be logged in to track IPs"
        setError(errorMsg)
        return { success: false, error: errorMsg }
      }

      setIsLoading(true)

      try {
        // Fetch location data
        const locationData = await fetchIPLocation(ipAddress.trim())

        // Create new tracked IP entry
        const newTrackedIP: TrackedIP = {
          id: generateId(),
          ipAddress: ipAddress.trim(),
          country: locationData.country,
          city: locationData.city,
          region: locationData.region,
          timestamp: new Date().toISOString(),
          trackedBy: user.username,
        }

        // Save to localStorage
        const updatedIPs = [...trackedIPs, newTrackedIP]
        saveTrackedIPs(updatedIPs)

        setIsLoading(false)
        return { success: true, data: newTrackedIP }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Failed to track IP address"
        setError(errorMsg)
        setIsLoading(false)
        return { success: false, error: errorMsg }
      }
    },
    [user, trackedIPs, saveTrackedIPs, fetchIPLocation]
  )

  // Delete a tracked IP
  const deleteTrackedIP = useCallback(
    (id: string) => {
      const updatedIPs = trackedIPs.filter((ip) => ip.id !== id)
      saveTrackedIPs(updatedIPs)
    },
    [trackedIPs, saveTrackedIPs]
  )

  // Clear all tracked IPs
  const clearAllTrackedIPs = useCallback(() => {
    saveTrackedIPs([])
  }, [saveTrackedIPs])

  // Get IPs tracked by current user
  const getUserTrackedIPs = useCallback(() => {
    if (!user) return []
    return trackedIPs.filter((ip) => ip.trackedBy === user.username)
  }, [user, trackedIPs])

  // Get statistics
  const getStats = useCallback(() => {
    const totalIPs = trackedIPs.length
    const uniqueIPs = new Set(trackedIPs.map((ip) => ip.ipAddress)).size
    const uniqueCountries = new Set(trackedIPs.map((ip) => ip.country)).size
    const userTrackedCount = user ? trackedIPs.filter((ip) => ip.trackedBy === user.username).length : 0

    return {
      totalIPs,
      uniqueIPs,
      uniqueCountries,
      userTrackedCount,
    }
  }, [trackedIPs, user])

  return {
    trackedIPs,
    isLoading,
    error,
    isInitialized,
    trackIP,
    deleteTrackedIP,
    clearAllTrackedIPs,
    getUserTrackedIPs,
    getStats,
    setError,
  }
}

