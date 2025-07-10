import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"

/*
 * The Google-hosted stylesheet was failing to load in Next.js.
 * next/font/google downloads and self-hosts the font at build-time,
 * so no network request is made in the browser.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata = {
  title: "Fomi - Lojas de Lanches Online",
  description: "Crie sua loja de lanches com uma experiência moderna, fluida e animada.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans bg-neutral-light text-neutral-dark">{children}</body>
    </html>
  )
}
