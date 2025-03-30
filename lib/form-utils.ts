"use client"

import { useState, type FormEvent } from "react"

interface FormSubmitOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  resetForm?: boolean
}

export function createFormSubmitHandler<T>(
  submitFn: (formData: FormData) => Promise<T>,
  options: FormSubmitOptions<T> = {},
) {
  const { onSuccess, onError, resetForm = true } = options

  return async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const data = await submitFn(formData)
      if (resetForm) {
        form.reset()
      }
      onSuccess?.(data)
      return data
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error(String(error)))
      throw error
    }
  }
}

export function useFormSubmit<T>(submitFn: (formData: FormData) => Promise<T>, options: FormSubmitOptions<T> = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<T | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const result = await submitFn(formData)
      setData(result)
      if (options.resetForm !== false) {
        form.reset()
      }
      options.onSuccess?.(result)
      return result
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      setError(err)
      options.onError?.(err)
      throw err
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    handleSubmit,
    isSubmitting,
    error,
    data,
  }
}

