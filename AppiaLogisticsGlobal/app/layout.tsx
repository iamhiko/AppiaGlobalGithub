import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

// Using global CSS font-family: Newson, sans-serif via --font-sans

export const metadata: Metadata = {
  title: "Appia Global - Dünya Çapında Kargo Hizmetleri",
  description:
    "Güvenilir ve hızlı kargo çözümleri. 200+ ülkeye teslimat, anlık takip, rekabetçi fiyatlar. Appia Global ile paketleriniz güvende.",
  keywords: "kargo, lojistik, uluslararası kargo, hızlı teslimat, kargo takibi, appia global",
  authors: [{ name: "Appia Global" }],
  creator: "Appia Global",
  publisher: "Appia Global",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://appiaglobal.com",
    title: "Appia Global - Dünya Çapında Kargo Hizmetleri",
    description: "Güvenilir ve hızlı kargo çözümleri. 200+ ülkeye teslimat, anlık takip, rekabetçi fiyatlar.",
    siteName: "Appia Global",
  },
  twitter: {
    card: "summary_large_image",
    title: "Appia Global - Dünya Çapında Kargo Hizmetleri",
    description: "Güvenilir ve hızlı kargo çözümleri. 200+ ülkeye teslimat, anlık takip, rekabetçi fiyatlar.",
  },
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
