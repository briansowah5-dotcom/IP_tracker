"use client"

import { useState, useMemo } from "react"
import ProtectedRoute from "../components/protectedroute"
import DashboardLayout from "../components/dashboardlayout"
import { useIPTracking } from "../libs/useIPtracking"
import type { TrackedIP } from "../libs/useIPtracking"

type SortField = "timestamp" | "ipAddress" | "country" | "city" | "trackedBy"
type SortOrder = "asc" | "desc"

// Move SortIcon OUTSIDE the component
function SortIcon({ field, sortField, sortOrder }: { field: SortField; sortField: SortField; sortOrder: SortOrder }) {
  if (sortField !== field) {
    return (
      <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    )
  }
  return sortOrder === "asc" ? (
    <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  ) : (
    <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function HistoryContent() {
  const { trackedIPs, deleteTrackedIP, clearAllTrackedIPs, isInitialized } = useIPTracking()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<SortField>("timestamp")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [ipToDelete, setIpToDelete] = useState<TrackedIP | null>(null)
  const [showClearAllModal, setShowClearAllModal] = useState(false)

  const filteredAndSortedIPs = useMemo(() => {
    let result = [...trackedIPs]

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (ip) =>
          ip.ipAddress.toLowerCase().includes(query) ||
          ip.country.toLowerCase().includes(query) ||
          ip.city.toLowerCase().includes(query) ||
          ip.region.toLowerCase().includes(query) ||
          ip.trackedBy.toLowerCase().includes(query)
      )
    }

    result.sort((a, b) => {
      let aVal: string | number = a[sortField]
      let bVal: string | number = b[sortField]

      if (sortField === "timestamp") {
        aVal = new Date(a.timestamp).getTime()
        bVal = new Date(b.timestamp).getTime()
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }

      return sortOrder === "asc" ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number)
    })

    return result
  }, [trackedIPs, searchQuery, sortField, sortOrder])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("desc")
    }
  }

  const handleDeleteClick = (ip: TrackedIP) => {
    setIpToDelete(ip)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (ipToDelete) {
      deleteTrackedIP(ipToDelete.id)
      setShowDeleteModal(false)
      setIpToDelete(null)
    }
  }

  const confirmClearAll = () => {
    clearAllTrackedIPs()
    setShowClearAllModal(false)
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Tracking History</h1>
          <p className="text-slate-500 mt-1">View and manage all tracked IP addresses</p>
        </div>
        {trackedIPs.length > 0 && (
          <button
            onClick={() => setShowClearAllModal(true)}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by IP, country, city, or username..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {filteredAndSortedIPs.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-1">
              {searchQuery ? "No results found" : "No tracking history"}
            </h3>
            <p className="text-slate-500 text-sm">
              {searchQuery
                ? "Try adjusting your search query"
                : "Start tracking IP addresses to see them here"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => handleSort("ipAddress")}
                      className="flex items-center gap-1 text-xs font-medium text-slate-600 uppercase tracking-wider hover:text-slate-900"
                    >
                      IP Address
                      <SortIcon field="ipAddress" sortField={sortField} sortOrder={sortOrder} />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => handleSort("country")}
                      className="flex items-center gap-1 text-xs font-medium text-slate-600 uppercase tracking-wider hover:text-slate-900"
                    >
                      Country
                      <SortIcon field="country" sortField={sortField} sortOrder={sortOrder} />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">
                    <button
                      onClick={() => handleSort("city")}
                      className="flex items-center gap-1 text-xs font-medium text-slate-600 uppercase tracking-wider hover:text-slate-900"
                    >
                      City
                      <SortIcon field="city" sortField={sortField} sortOrder={sortOrder} />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">
                    <button
                      onClick={() => handleSort("trackedBy")}
                      className="flex items-center gap-1 text-xs font-medium text-slate-600 uppercase tracking-wider hover:text-slate-900"
                    >
                      Tracked By
                      <SortIcon field="trackedBy" sortField={sortField} sortOrder={sortOrder} />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => handleSort("timestamp")}
                      className="flex items-center gap-1 text-xs font-medium text-slate-600 uppercase tracking-wider hover:text-slate-900"
                    >
                      Date
                      <SortIcon field="timestamp" sortField={sortField} sortOrder={sortOrder} />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Actions
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAndSortedIPs.map((ip) => (
                  <tr key={ip.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm text-slate-900">{ip.ipAddress}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-slate-700">{ip.country}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-sm text-slate-700">{ip.city}</span>
                      <span className="text-slate-400 text-xs ml-1">({ip.region})</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-sm text-slate-700">{ip.trackedBy}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-slate-500">{formatDate(ip.timestamp)}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDeleteClick(ip)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredAndSortedIPs.length > 0 && (
          <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 text-sm text-slate-500">
            Showing {filteredAndSortedIPs.length} of {trackedIPs.length} entries
          </div>
        )}
      </div>

      {showDeleteModal && ipToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Delete Entry</h3>
            </div>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete the entry for <span className="font-mono font-medium">{ipToDelete.ipAddress}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showClearAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Clear All History</h3>
            </div>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete all {trackedIPs.length} tracked IPs? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowClearAllModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearAll}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function HistoryPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <HistoryContent />
      </DashboardLayout>
    </ProtectedRoute>
  )
}