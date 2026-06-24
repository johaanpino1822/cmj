import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Panel Admin",
    template: "%s | Admin CMJ",
  },
  description: "Panel de administración CMJ Norte de Antioquia",
  robots: "noindex, nofollow",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
