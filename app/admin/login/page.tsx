"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Users, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const DEMO_CREDENTIALS = {
  email: "admin@cmjnorte.gov.co",
  password: "cmj2025",
}

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Mock auth with setTimeout
    setTimeout(() => {
      if (
        email === DEMO_CREDENTIALS.email &&
        password === DEMO_CREDENTIALS.password
      ) {
        localStorage.setItem(
          "cmj_admin_token",
          JSON.stringify({
            id: "admin-1",
            nombre: "Super Administrador",
            email,
            rol: "Super Admin",
          })
        )
        router.push("/admin")
      } else {
        setError("Credenciales incorrectas. Intenta con las credenciales de demo.")
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sidebar px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent mb-3">
            <Users className="h-7 w-7 text-accent-foreground" />
          </div>
          <h1 className="text-xl font-bold text-sidebar-foreground">Panel de Administración</h1>
          <p className="text-sm text-sidebar-foreground/60 mt-1">CMJ Norte de Antioquia</p>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-sidebar-border bg-sidebar-accent p-6 shadow-xl">
          <h2 className="text-base font-semibold text-sidebar-foreground mb-5">Iniciar sesión</h2>

          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-lg bg-destructive/15 border border-destructive/30 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sidebar-foreground/80 text-xs font-medium">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cmjnorte.gov.co"
                className="bg-sidebar border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/40"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sidebar-foreground/80 text-xs font-medium">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-sidebar border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/40 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sidebar-foreground/50 hover:text-sidebar-foreground"
                  aria-label={showPw ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 font-semibold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Ingresando...
                </>
              ) : (
                "Ingresar"
              )}
            </Button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-4 rounded-lg bg-sidebar/60 border border-sidebar-border p-3 text-xs text-sidebar-foreground/60 space-y-0.5">
            <p className="font-medium text-sidebar-foreground/80">Credenciales de demo:</p>
            <p>Email: admin@cmjnorte.gov.co</p>
            <p>Password: cmj2025</p>
          </div>
        </div>
      </div>
    </div>
  )
}
