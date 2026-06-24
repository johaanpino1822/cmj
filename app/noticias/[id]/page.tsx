import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getNoticiaById, getAllNoticias } from "@/lib/data"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return getAllNoticias().map((n) => ({ id: n.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const noticia = getNoticiaById(id)
  if (!noticia) return {}
  return {
    title: noticia.titulo,
    description: noticia.resumen,
  }
}

export default async function NoticiaDetailPage({ params }: Props) {
  const { id } = await params
  const noticia = getNoticiaById(id)
  if (!noticia) notFound()

  const todas = getAllNoticias()
  const relacionadas = todas
    .filter((n) => n.id !== noticia.id && n.categoria === noticia.categoria)
    .slice(0, 3)

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[300px] flex items-end overflow-hidden">
          <div className="absolute inset-0 bg-muted" />
          <div className="absolute inset-0 hero-gradient opacity-75" />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 pt-20 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-primary text-primary-foreground">{noticia.categoria}</Badge>
              {noticia.destacada && (
                <Badge className="bg-accent text-accent-foreground">Destacada</Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl max-w-3xl text-balance">
              {noticia.titulo}
            </h1>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {noticia.autor}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={noticia.fecha}>
                  {new Date(noticia.fecha).toLocaleDateString("es-CO", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="bg-background py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
              {/* Main */}
              <article>
                <Button asChild variant="ghost" size="sm" className="-ml-2 mb-6 text-muted-foreground">
                  <Link href="/noticias">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a noticias
                  </Link>
                </Button>

                <div className="rounded-xl bg-secondary/30 p-6 mb-6">
                  <p className="text-base font-medium text-foreground leading-relaxed">
                    {noticia.resumen}
                  </p>
                </div>

                <div className="prose prose-sm max-w-none text-foreground">
                  {noticia.contenido.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="mb-4 leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Tags */}
                {noticia.tags.length > 0 && (
                  <div className="mt-8 flex flex-wrap items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    {noticia.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </article>

              {/* Sidebar: related news */}
              <aside>
                <h2 className="text-base font-semibold text-foreground mb-4">
                  Noticias relacionadas
                </h2>
                {relacionadas.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No hay noticias relacionadas.</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {relacionadas.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/noticias/${rel.id}`}
                        className="group flex gap-3 rounded-lg border border-border bg-card p-3 hover:shadow-sm transition-shadow"
                      >
                        <div className="w-16 h-16 shrink-0 rounded-md bg-muted overflow-hidden">
                          <div className="w-full h-full hero-gradient opacity-40 group-hover:opacity-60 transition-opacity" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 text-balance">
                            {rel.titulo}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(rel.fecha).toLocaleDateString("es-CO", {
                              day: "numeric",
                              month: "short",
                            })}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
