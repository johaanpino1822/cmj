"use client"

import Link from "next/link"
import {
  Mail,
  Phone,
  Calendar,
  Users,
  FolderOpen,
  Newspaper,
  DollarSign,
  Target,
  Eye,
  Scale,
  TrendingUp,
  Instagram,
  Facebook,
  Share2,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import type { Municipio, Integrante, Proyecto, Noticia, EstadoProyecto } from "@/lib/types"

interface Props {
  municipio: Municipio
}

const estadoBadge: Record<EstadoProyecto, string> = {
  Planificado: "bg-secondary text-secondary-foreground border border-border",
  "En curso": "bg-primary/10 text-primary border border-primary/20",
  Completado: "bg-success/10 text-success border border-success/20",
  Suspendido: "bg-destructive/10 text-destructive border border-destructive/20",
}

const cargoBadge: Record<string, string> = {
  Presidente: "bg-primary/10 text-primary border border-primary/20",
  Vicepresidente: "bg-accent/10 text-accent border border-accent/20",
  "Secretario/a": "bg-secondary text-secondary-foreground border border-border",
  "Tesorero/a": "bg-secondary text-secondary-foreground border border-border",
  Vocal: "bg-secondary text-secondary-foreground border border-border",
  "Delegado/a": "bg-secondary text-secondary-foreground border border-border",
}

export function MunicipioTabs({ municipio }: Props) {
  const { cmj } = municipio

  return (
    <section className="py-8 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="cmj">
          <TabsList className="mb-8 h-auto flex-wrap gap-1 bg-secondary/60 p-1 rounded-lg">
            <TabsTrigger value="cmj" className="flex items-center gap-1.5 text-sm rounded-md">
              <Scale className="h-3.5 w-3.5" />
              Sobre el CMJ
            </TabsTrigger>
            <TabsTrigger value="integrantes" className="flex items-center gap-1.5 text-sm rounded-md">
              <Users className="h-3.5 w-3.5" />
              Integrantes
              <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
                {municipio.integrantes.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="proyectos" className="flex items-center gap-1.5 text-sm rounded-md">
              <FolderOpen className="h-3.5 w-3.5" />
              Proyectos
              <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
                {municipio.proyectos.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="noticias" className="flex items-center gap-1.5 text-sm rounded-md">
              <Newspaper className="h-3.5 w-3.5" />
              Noticias
              <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
                {municipio.noticias.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* ── CMJ Info ─────────────────────────────────────── */}
          <TabsContent value="cmj">
            <div className="grid gap-5 lg:grid-cols-3">

              {/* Norma legal — full width */}
              <div className="lg:col-span-3 rounded-xl border border-border bg-card p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/15">
                    <Scale className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                      Acto de creación y posesión
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {cmj.normaLegal}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      Posesionado el <strong className="text-foreground">{cmj.fechaPosesion}</strong>.
                      Periodo <strong className="text-foreground">{cmj.periodo}</strong> con{" "}
                      <strong className="text-foreground">{cmj.numeroCurules} curules</strong>.
                      Regido por la Ley 1622 de 2013 (Estatuto de Ciudadanía Juvenil) y el Decreto 1885 de 2015.
                    </p>
                  </div>
                </div>
              </div>

              {/* Misión */}
              <Card className="border-border shadow-none">
                <CardHeader className="pb-2 pt-5 px-5">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
                      <Target className="h-3.5 w-3.5 text-primary" />
                    </div>
                    Misión
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                    {cmj.mision}
                  </p>
                </CardContent>
              </Card>

              {/* Visión */}
              <Card className="border-border shadow-none">
                <CardHeader className="pb-2 pt-5 px-5">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
                      <Eye className="h-3.5 w-3.5 text-primary" />
                    </div>
                    Visión
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                    {cmj.vision}
                  </p>
                </CardContent>
              </Card>

              {/* Objetivos */}
              <Card className="border-border shadow-none">
                <CardHeader className="pb-2 pt-5 px-5">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
                      <TrendingUp className="h-3.5 w-3.5 text-primary" />
                    </div>
                    Objetivos
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <ol className="flex flex-col gap-3">
                    {cmj.objetivos.map((obj, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold mt-0.5">
                          {i + 1}
                        </span>
                        {obj}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              {/* Redes sociales */}
              {cmj.redes && Object.keys(cmj.redes).length > 0 && (
                <div className="lg:col-span-3 rounded-xl border border-border bg-card p-5">
                  <p className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
                    <Share2 className="h-4 w-4 text-primary" />
                    Redes sociales
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {cmj.redes.instagram && (
                      <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground">
                        <Instagram className="h-4 w-4 text-primary" />
                        {cmj.redes.instagram}
                      </div>
                    )}
                    {cmj.redes.facebook && (
                      <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground">
                        <Facebook className="h-4 w-4 text-primary" />
                        {cmj.redes.facebook}
                      </div>
                    )}
                    {cmj.redes.tiktok && (
                      <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground">
                        <Share2 className="h-4 w-4 text-primary" />
                        {cmj.redes.tiktok}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* ── Integrantes ──────────────────────────────────── */}
          <TabsContent value="integrantes">
            {municipio.integrantes.length === 0 ? (
              <Empty>
                <EmptyHeader>
                  <EmptyTitle>Sin integrantes</EmptyTitle>
                  <EmptyDescription>No hay integrantes registrados aún.</EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {municipio.integrantes.map((integrante) => (
                  <IntegranteCard key={integrante.id} integrante={integrante} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* ── Proyectos ────────────────────────────────────── */}
          <TabsContent value="proyectos">
            {municipio.proyectos.length === 0 ? (
              <Empty>
                <EmptyHeader>
                  <EmptyTitle>Sin proyectos</EmptyTitle>
                  <EmptyDescription>No hay proyectos registrados aún.</EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {municipio.proyectos.map((proyecto) => (
                  <ProyectoCard key={proyecto.id} proyecto={proyecto} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* ── Noticias ─────────────────────────────────────── */}
          <TabsContent value="noticias">
            {municipio.noticias.length === 0 ? (
              <Empty>
                <EmptyHeader>
                  <EmptyTitle>Sin noticias</EmptyTitle>
                  <EmptyDescription>No hay noticias publicadas aún.</EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {municipio.noticias.map((noticia) => (
                  <NoticiaCard key={noticia.id} noticia={noticia} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

/* ── Sub-components ──────────────────────────────────────────────── */

function IntegranteCard({ integrante }: { integrante: Integrante }) {
  return (
    <Card className="border-border shadow-none hover:border-primary/25 hover:shadow-sm transition-all">
      <CardContent className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
            {integrante.nombre
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-foreground text-sm leading-snug">
              {integrante.nombre}
            </p>
            <Badge
              className={`mt-1 text-xs px-2 py-0 font-medium ${
                cargoBadge[integrante.cargo] ?? "bg-secondary text-secondary-foreground"
              }`}
            >
              {integrante.cargo}
            </Badge>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground mb-3 line-clamp-3">
          {integrante.bio}
        </p>
        <div className="flex flex-col gap-1.5 text-xs text-muted-foreground border-t border-border pt-3">
          <span className="flex items-center gap-1.5">
            <Mail className="h-3 w-3 shrink-0" />
            <span className="truncate">{integrante.email}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="h-3 w-3 shrink-0" />
            {integrante.telefono}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3 shrink-0" />
            {integrante.edad} años &mdash; hasta{" "}
            {new Date(integrante.periodoFin).toLocaleDateString("es-CO", {
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

function ProyectoCard({ proyecto }: { proyecto: Proyecto }) {
  return (
    <Card className="border-border shadow-none hover:border-primary/25 hover:shadow-sm transition-all">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-foreground text-sm leading-snug">
            {proyecto.titulo}
          </h3>
          <Badge
            className={`text-xs px-2 py-0 shrink-0 font-medium ${estadoBadge[proyecto.estado]}`}
          >
            {proyecto.estado}
          </Badge>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground mb-4 line-clamp-3">
          {proyecto.descripcion}
        </p>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 border-t border-border pt-3 text-xs">
          <div>
            <p className="text-muted-foreground">Categoría</p>
            <p className="font-medium text-foreground mt-0.5">{proyecto.categoria}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Beneficiarios</p>
            <p className="font-medium text-foreground mt-0.5 flex items-center gap-1">
              <Users className="h-3 w-3" />
              {proyecto.beneficiarios}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Presupuesto</p>
            <p className="font-medium text-foreground mt-0.5 flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              {proyecto.presupuesto.toLocaleString("es-CO")}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Inicio</p>
            <p className="font-medium text-foreground mt-0.5">
              {new Date(proyecto.fechaInicio).toLocaleDateString("es-CO", {
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function NoticiaCard({ noticia }: { noticia: Noticia }) {
  return (
    <Link
      href={`/noticias/${noticia.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card hover:border-primary/25 hover:shadow-sm transition-all"
    >
      <div className="h-36 bg-secondary relative">
        <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/8 transition-colors" />
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary/90 text-primary-foreground text-xs font-medium">
            {noticia.categoria}
          </Badge>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug text-balance">
          {noticia.titulo}
        </h3>
        <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed flex-1">
          {noticia.resumen}
        </p>
        <time
          dateTime={noticia.fecha}
          className="mt-3 text-xs text-muted-foreground border-t border-border pt-2.5 block"
        >
          {new Date(noticia.fecha).toLocaleDateString("es-CO", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </div>
    </Link>
  )
}
