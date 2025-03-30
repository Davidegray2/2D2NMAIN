/**
 * Date utility functions
 */

/**
 * Format a date as a string in the format "Month Day, Year"
 */
export function formatDate(date: Date | string | number): string {
  const d = new Date(date)
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

/**
 * Format a date as a string in the format "Month Day, Year at Hour:Minute AM/PM"
 */
export function formatDateTime(date: Date | string | number): string {
  const d = new Date(date)
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

/**
 * Format a date as a relative time string (e.g., "2 hours ago", "yesterday")
 */
export function formatRelativeTime(date: Date | string | number): string {
  const d = new Date(date)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffSec = Math.round(diffMs / 1000)
  const diffMin = Math.round(diffSec / 60)
  const diffHour = Math.round(diffMin / 60)
  const diffDay = Math.round(diffHour / 24)
  const diffMonth = Math.round(diffDay / 30)
  const diffYear = Math.round(diffDay / 365)

  if (diffSec < 60) {
    return "just now"
  } else if (diffMin < 60) {
    return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`
  } else if (diffHour < 24) {
    return `${diffHour} hour${diffHour === 1 ? "" : "s"} ago`
  } else if (diffDay < 30) {
    return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`
  } else if (diffMonth < 12) {
    return `${diffMonth} month${diffMonth === 1 ? "" : "s"} ago`
  } else {
    return `${diffYear} year${diffYear === 1 ? "" : "s"} ago`
  }
}

/**
 * Check if a date is today
 */
export function isToday(date: Date | string | number): boolean {
  const d = new Date(date)
  const today = new Date()
  return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()
}

/**
 * Check if a date is in the past
 */
export function isPast(date: Date | string | number): boolean {
  const d = new Date(date)
  const now = new Date()
  return d.getTime() < now.getTime()
}

/**
 * Check if a date is in the future
 */
export function isFuture(date: Date | string | number): boolean {
  const d = new Date(date)
  const now = new Date()
  return d.getTime() > now.getTime()
}

/**
 * Add days to a date
 */
export function addDays(date: Date | string | number, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

/**
 * Add months to a date
 */
export function addMonths(date: Date | string | number, months: number): Date {
  const d = new Date(date)
  d.setMonth(d.getMonth() + months)
  return d
}

/**
 * Get the start of a day (midnight)
 */
export function startOfDay(date: Date | string | number): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

/**
 * Get the end of a day (23:59:59.999)
 */
export function endOfDay(date: Date | string | number): Date {
  const d = new Date(date)
  d.setHours(23, 59, 59, 999)
  return d
}

