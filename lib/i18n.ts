type Locale = "en" | "es" | "fr" | "de"

type Translations = {
  [key: string]: {
    [locale in Locale]?: string
  }
}

// Sample translations
const translations: Translations = {
  "common.welcome": {
    en: "Welcome to Fitness Social",
    es: "Bienvenido a Fitness Social",
    fr: "Bienvenue sur Fitness Social",
    de: "Willkommen bei Fitness Social",
  },
  "common.login": {
    en: "Log In",
    es: "Iniciar Sesión",
    fr: "Se Connecter",
    de: "Anmelden",
  },
  "common.signup": {
    en: "Sign Up",
    es: "Registrarse",
    fr: "S'inscrire",
    de: "Registrieren",
  },
  "common.logout": {
    en: "Log Out",
    es: "Cerrar Sesión",
    fr: "Se Déconnecter",
    de: "Abmelden",
  },
  // Add more translations as needed
}

// Get user's preferred locale
export function getUserLocale(): Locale {
  if (typeof window === "undefined") {
    return "en" // Default to English on server
  }

  // Check for stored preference
  const storedLocale = localStorage.getItem("userLocale") as Locale | null
  if (storedLocale && ["en", "es", "fr", "de"].includes(storedLocale)) {
    return storedLocale
  }

  // Check browser language
  const browserLocale = navigator.language.split("-")[0] as Locale
  if (["en", "es", "fr", "de"].includes(browserLocale)) {
    return browserLocale
  }

  return "en" // Default to English
}

// Set user's preferred locale
export function setUserLocale(locale: Locale): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("userLocale", locale)
  }
}

// Translate a key
export function translate(key: string, locale: Locale = getUserLocale()): string {
  const translation = translations[key]

  if (!translation) {
    console.warn(`Translation key not found: ${key}`)
    return key
  }

  return translation[locale] || translation.en || key
}

// Shorthand function for translate
export function t(key: string, locale?: Locale): string {
  return translate(key, locale)
}

