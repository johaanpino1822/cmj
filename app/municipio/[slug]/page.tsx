import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Users, CalendarDays, Scale, MapPin } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MunicipioTabs } from "@/components/municipio-tabs"
import { getMunicipioBySlug, municipios } from "@/lib/data"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return municipios.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const municipio = getMunicipioBySlug(slug)
  if (!municipio) return {}
  return {
    title: `CMJ ${municipio.nombre} — Norte de Antioquia`,
    description: municipio.cmj.mision,
  }
}

export default async function MunicipioPage({ params }: Props) {
  const { slug } = await params
  const municipio = getMunicipioBySlug(slug)
  if (!municipio) notFound()

  return (
    <>
      <Navbar />
      <main>
        {/* ── Breadcrumb ──────────────────────────────────────── */}
        <div className="border-b border-border bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/municipios" className="hover:text-foreground transition-colors">Municipios</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground font-medium">{municipio.nombre}</span>
            </nav>
          </div>
        </div>

        {/* ── CMJ Header — green band ──────────────────────────── */}
        <section className="bg-primary">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              {/* Left — identity */}
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/60 mb-2">
                  Consejo Municipal de Juventud
                </p>
                <h1 className="text-3xl font-black uppercase tracking-wide text-white sm:text-4xl text-balance">
                  CMJ {municipio.nombre}
                </h1>
                <div className="mt-3 h-0.5 w-10 bg-white/40" />
                <p className="mt-4 text-sm leading-relaxed text-white/70 max-w-2xl text-pretty">
                  {municipio.cmj.mision}
                </p>
              </div>

              {/* Right — key facts */}
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:w-60 shrink-0">
                <div className="flex items-start gap-3 rounded-lg bg-white/10 border border-white/20 p-3">
                  <CalendarDays className="h-4 w-4 text-white/70 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-white/55">Periodo</p>
                    <p className="text-sm font-semibold text-white">{municipio.cmj.periodo}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-white/10 border border-white/20 p-3">
                  <Users className="h-4 w-4 text-white/70 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-white/55">Curules</p>
                    <p className="text-sm font-semibold text-white">{municipio.cmj.numeroCurules} escaños</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-white/10 border border-white/20 p-3">
                  <Scale className="h-4 w-4 text-white/70 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-white/55">Posesión</p>
                    <p className="text-sm font-semibold text-white">{municipio.cmj.fechaPosesion}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-white/10 border border-white/20 p-3">
                  <MapPin className="h-4 w-4 text-white/70 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-white/55">Municipio</p>
                    <p className="text-sm font-semibold text-white">{municipio.poblacion.toLocaleString("es-CO")} hab.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Tabs: CMJ info / integrantes / proyectos / noticias */}
        <MunicipioTabs municipio={municipio} />
      </main>
      <Footer />
    </>
  )
}
