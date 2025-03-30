/**
 * Type-safe local storage utilities
 */

/**
 * Get an item from local storage with type safety
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") {
    return defaultValue
  }

  try {
    const item = window.localStorage.getItem(key)
    if (item === null) {
      return defaultValue
    }
    return JSON.parse(item) as T
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error)
    return defaultValue
  }
}

/**
 * Set an item in local storage with type safety
 */
export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") {
    return
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage:`, error)
  }
}

/**
 * Remove an item from local storage
 */
export function removeStorageItem(key: string): void {
  if (typeof window === "undefined") {
    return
  }

  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage:`, error)
  }
}

/**
 * Clear all items from local storage
 */
export function clearStorage(): void {
  if (typeof window === "undefined") {
    return
  }

  try {
    window.localStorage.clear()
  } catch (error) {
    console.error("Error clearing localStorage:", error)
  }
}

/**
 * Create a typed storage object for a specific key
 */
export function createTypedStorage<T>(key: string, defaultValue: T) {
  return {
    get: () => getStorageItem<T>(key, defaultValue),
    set: (value: T) => setStorageItem<T>(key, value),
    remove: () => removeStorageItem(key),
  }
}

