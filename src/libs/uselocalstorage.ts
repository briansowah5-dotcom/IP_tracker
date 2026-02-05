// "use client"

// import { useState, useEffect, useCallback } from "react"

// // Custom hook for localStorage with type safety
// export function useLocalStorage<T>(key: string, initialValue: T) {
//   // State to store our value
//   const [storedValue, setStoredValue] = useState<T>(initialValue)
//   const [isLoaded, setIsLoaded] = useState(false)

//   // Load initial value from localStorage
//   useEffect(() => {
//     try {
//       const item = window.localStorage.getItem(key)
//       if (item) {
//         setStoredValue(JSON.parse(item))
//       }
//     } catch (error) {
//       console.error(`Error reading localStorage key "${key}":`, error)
//     }
//     setIsLoaded(true)
//   }, [key])

//   // Return a wrapped version of useState's setter function that persists to localStorage
//   const setValue = useCallback(
//     (value: T | ((val: T) => T)) => {
//       try {
//         // Allow value to be a function so we have same API as useState
//         const valueToStore = value instanceof Function ? value(storedValue) : value
//         setStoredValue(valueToStore)
//         window.localStorage.setItem(key, JSON.stringify(valueToStore))
//       } catch (error) {
//         console.error(`Error setting localStorage key "${key}":`, error)
//       }
//     },
//     [key, storedValue]
//   )

//   // Remove item from localStorage
//   const removeValue = useCallback(() => {
//     try {
//       window.localStorage.removeItem(key)
//       setStoredValue(initialValue)
//     } catch (error) {
//       console.error(`Error removing localStorage key "${key}":`, error)
//     }
//   }, [key, initialValue])

//   return { storedValue, setValue, removeValue, isLoaded }
// }

"use client"

import { useState, useCallback } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  return { storedValue, setValue, removeValue, isLoaded: true }
}