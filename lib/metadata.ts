import type { Metadata } from "next"

interface GenerateMetadataOptions {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  canonical?: string
  type?: "website" | "article" | "profile"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  section?: string
}

export function generateMetadata({
  title = "Fitness Social Media App",
  description = "Connect with fitness enthusiasts, track your workouts, and achieve your fitness goals.",
  keywords = ["fitness", "social media", "workout", "tracking", "community"],
  image = "/og-image.jpg",
  canonical,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
}: GenerateMetadataOptions = {}): Metadata {
  // Base URL from environment or default
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fitness-social.example.com"

  // Full image URL
  const imageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`

  // Canonical URL
  const canonicalUrl = canonical ? (canonical.startsWith("http") ? canonical : `${baseUrl}${canonical}`) : baseUrl

  const metadata: Metadata = {
    title,
    description,
    keywords,
    authors: authors?.map((author) => ({ name: author })),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Fitness Social Media App",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@fitnessapp",
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }

  // Add article specific metadata
  if (type === "article") {
    if (metadata.openGraph) {
      metadata.openGraph.publishedTime = publishedTime
      metadata.openGraph.modifiedTime = modifiedTime
      metadata.openGraph.section = section
    }
  }

  return metadata
}

