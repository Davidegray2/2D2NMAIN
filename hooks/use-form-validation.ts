"use client"

import type React from "react"

import { useState, useCallback } from "react"

type ValidationRule<T> = {
  validate: (value: T, formValues?: Record<string, any>) => boolean
  message: string
}

type FieldValidation<T> = {
  [key: string]: ValidationRule<T>[]
}

type ValidationErrors = {
  [key: string]: string[]
}

/**
 * Custom hook for form validation
 */
export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: FieldValidation<any>,
) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  /**
   * Handle input change
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setValues((prev) => ({ ...prev, [name]: value }))

      // Validate field on change if it's been touched
      if (touched[name]) {
        validateField(name, value)
      }
    },
    [touched],
  )

  /**
   * Handle input blur
   */
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    validateField(name, value)
  }, [])

  /**
   * Validate a single field
   */
  const validateField = useCallback(
    (name: string, value: any) => {
      const fieldRules = validationRules[name]

      if (!fieldRules) {
        return
      }

      const fieldErrors: string[] = []

      for (const rule of fieldRules) {
        if (!rule.validate(value, values)) {
          fieldErrors.push(rule.message)
        }
      }

      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors,
      }))

      return fieldErrors.length === 0
    },
    [validationRules, values],
  )

  /**
   * Validate all form fields
   */
  const validateForm = useCallback(() => {
    let isValid = true
    const newErrors: ValidationErrors = {}
    const newTouched: Record<string, boolean> = {}

    // Mark all fields as touched
    Object.keys(validationRules).forEach((field) => {
      newTouched[field] = true
    })

    setTouched(newTouched)

    // Validate each field
    Object.entries(validationRules).forEach(([field, rules]) => {
      const fieldErrors: string[] = []
      const value = values[field]

      for (const rule of rules) {
        if (!rule.validate(value, values)) {
          fieldErrors.push(rule.message)
        }
      }

      if (fieldErrors.length > 0) {
        isValid = false
      }

      newErrors[field] = fieldErrors
    })

    setErrors(newErrors)
    return isValid
  }, [validationRules, values])

  /**
   * Reset form to initial values
   */
  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  /**
   * Set form values programmatically
   */
  const setFormValues = useCallback((newValues: Partial<T>) => {
    setValues((prev) => ({ ...prev, ...newValues }))
  }, [])

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setFormValues,
  }
}

/**
 * Common validation rules
 */
export const validationRules = {
  required: (message = "This field is required"): ValidationRule<any> => ({
    validate: (value) => {
      if (typeof value === "string") {
        return value.trim().length > 0
      }
      return value !== null && value !== undefined
    },
    message,
  }),

  email: (message = "Please enter a valid email address"): ValidationRule<string> => ({
    validate: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(value)
    },
    message,
  }),

  minLength: (length: number, message = `Must be at least ${length} characters`): ValidationRule<string> => ({
    validate: (value) => value.length >= length,
    message,
  }),

  maxLength: (length: number, message = `Must be no more than ${length} characters`): ValidationRule<string> => ({
    validate: (value) => value.length <= length,
    message,
  }),

  pattern: (regex: RegExp, message = "Invalid format"): ValidationRule<string> => ({
    validate: (value) => regex.test(value),
    message,
  }),

  match: (fieldName: string, message = "Fields do not match"): ValidationRule<string> => ({
    validate: (value, formValues) => formValues && value === formValues[fieldName],
    message,
  }),
}

