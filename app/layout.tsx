import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "CMJ Norte de Antioquia",
    template: "%s | CMJ Norte de Antioquia",
  },
  description:
    "Portal oficial de los Consejos Municipales de Juventud del Norte de Antioquia. Conoce a tus representantes, proyectos, noticias y accede a los canales de atención ciudadana.",
  keywords: [
    "Consejos Municipales de Juventud",
    "CMJ",
    "Norte de Antioquia",
    "juventud",
    "participación juvenil",
  ],
  authors: [{ name: "CMJ Norte de Antioquia" }],
  creator: "CMJ Norte de Antioquia",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#2d5c1a",
  width: "device-width",
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="bg-background">
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
