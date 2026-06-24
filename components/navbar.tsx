"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/#quienes-somos", label: "Quiénes Somos" },
  { href: "/municipios", label: "Municipios" },
  { href: "/noticias", label: "Noticias" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/images/cmj-logo.png"
            alt="CMJ Logo"
            width={58}
            height={58}
            className="object-contain"
            priority
          />
          <div className="leading-tight">
            <p className="text-[15px] font-black uppercase tracking-tight text-foreground leading-none">
              Consejo Municipal
            </p>
            <p className="text-[15px] font-black uppercase tracking-tight text-foreground leading-none">
              de Juventud
            </p>
            <p className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-primary mt-[3px]">
              Subregión Norte
            </p>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3.5 py-2 text-[13.5px] font-medium transition-colors",
                pathname === link.href
                  ? "text-primary font-semibold"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          {/* PARTICIPA — solid green rounded pill */}
          <Link
            href="/pqr"
            className="ml-2 inline-flex items-center rounded-full bg-primary px-5 py-[9px] text-[12.5px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary-hover"
          >
            Participa
          </Link>
          {/* Admin — discreet icon */}
          <Link
            href="/admin"
            className="ml-2 rounded p-2 text-foreground/40 hover:text-primary hover:bg-secondary transition-colors"
            title="Panel Administrador"
            aria-label="Panel Administrador"
          >
            <Settings className="h-4 w-4" />
          </Link>
        </nav>

        {/* ── Mobile toggle ── */}
        <button
          className="md:hidden rounded p-2 text-foreground/70 hover:bg-secondary transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* ── Mobile nav ── */}
      {open && (
        <div className="md:hidden border-t border-border bg-white px-4 pb-5 pt-2">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-secondary text-primary font-semibold"
                    : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/pqr"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center rounded-full bg-primary py-2.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-primary-hover transition-colors"
            >
              Participa
            </Link>
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center gap-2 rounded px-3 py-2.5 text-sm text-foreground/50 hover:bg-secondary hover:text-foreground transition-colors"
            >
              <Settings className="h-4 w-4" />
              Panel Administrador
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
