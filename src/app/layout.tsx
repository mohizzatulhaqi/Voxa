import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Voxa - Portal Pelaporan dan Informasi Hukum",
  description: "Portal pelaporan dan pusat informasi hukum untuk penyandang disabilitas",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-blue-900`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
