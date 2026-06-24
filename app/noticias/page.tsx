import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { getAllNoticias } from "@/lib/data"
import { TrendingUp, Newspaper } from "lucide-react"

export const metadata: Metadata = {
  title: "Noticias",
  description:
    "Todas las noticias y novedades de los Consejos Municipales de Juventud del Norte de Antioquia.",
}

export default function NoticiasPage() {
  const noticias = getAllNoticias()
  const destacadas = noticias.filter((n) => n.destacada)
  const resto = noticias.filter((n) => !n.destacada)

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-primary py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/60 mb-2">
              Actualidad
            </p>
            <h1 className="text-3xl font-black uppercase tracking-wide text-white sm:text-4xl">
              Noticias y Eventos
            </h1>
            <div className="mt-3 h-0.5 w-10 bg-white/40" />
            <p className="mt-4 text-white/70 max-w-2xl text-sm leading-relaxed">
              Noticias y novedades de los CMJ de los 17 municipios del Norte de Antioquia.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Destacadas */}
          {destacadas.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Destacadas
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {destacadas.map((noticia) => (
                  <NoticiaCard key={noticia.id} noticia={noticia} featured />
                ))}
              </div>
            </div>
          )}

          {/* Todas las demás */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-5">Todas las noticias</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {resto.map((noticia) => (
                <NoticiaCard key={noticia.id} noticia={noticia} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function NoticiaCard({
  noticia,
  featured = false,
}: {
  noticia: { id: string; titulo: string; resumen: string; autor: string; fecha: string; categoria: string; tags: string[]; destacada: boolean }
  featured?: boolean
}) {
  return (
    <Link
      href={`/noticias/${noticia.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-white shadow-sm hover:shadow-md transition-all"
    >
      <div className="relative h-40 bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-primary/6 group-hover:bg-primary/10 transition-colors flex items-center justify-center">
          <Newspaper className="h-10 w-10 text-primary/20" />
        </div>
        <div className="absolute top-2 left-2 flex gap-1.5">
          <span className="inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-primary text-white">
            {noticia.categoria}
          </span>
          {featured && (
            <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-white border border-border text-primary">
              <TrendingUp className="h-2.5 w-2.5" />
              Destacada
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 text-balance leading-snug">
          {noticia.titulo}
        </h3>
        <p className="mt-2 text-xs text-muted-foreground line-clamp-3 leading-relaxed flex-1">
          {noticia.resumen}
        </p>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <time dateTime={noticia.fecha} className="text-xs text-muted-foreground">
            {new Date(noticia.fecha).toLocaleDateString("es-CO", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
          <span className="text-xs font-semibold text-primary">Leer Más &rarr;</span>
        </div>
      </div>
    </Link>
  )
}
