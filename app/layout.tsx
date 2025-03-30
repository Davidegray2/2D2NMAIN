import type React from "react"
import type { Metadata } from "next"
import ClientRootLayout from "./client-layout"
import "./globals.css"

const fontSans = {
  variable: "--font-sans",
}

export const metadata: Metadata = {
  title: "2ND2NONE - Elite Fitness Community",
  description: "The Ultimate Fitness Community Platform for serious athletes and fitness enthusiasts",
  generator: "v0.dev",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "32x32",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://js.stripe.com/v3/" async></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  )
}

import "./globals.css"

import "./globals.css"

import "./globals.css"

import "./globals.css"



import './globals.css'