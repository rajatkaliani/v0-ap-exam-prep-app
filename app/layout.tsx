import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "AP Study App - Master AP Exams Smarter",
  description: "Study with TikTok-style question cards and get personalized help from expert tutors",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          {children}
          <BottomNavigation />
        </Suspense>
        <div className="pb-20" /> {/* Space for bottom navigation */}
        <Analytics />
      </body>
    </html>
  )
}
