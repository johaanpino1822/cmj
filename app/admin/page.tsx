"use client"

import Link from "next/link"
import {
  MapPin,
  Users,
  FolderOpen,
  Newspaper,
  MessageSquare,
  TrendingUp,
  Clock,
  ChevronRight,
} from "lucide-react"
import { AdminShell } from "@/components/admin-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { municipios, pqrsMock, getAllNoticias, stats } from "@/lib/data"

export default function AdminDashboardPage() {
  const allNoticias = getAllNoticias()
  const recentPqrs = pqrsMock.slice(0, 4)
  const recentNoticias = allNoticias.slice(0, 4)

  const statCards = [
    {
      label: "Municipios",
      value: stats.municipios,
      icon: MapPin,
      href: "/admin/municipios",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Integrantes",
      value: municipios.reduce((a, m) => a + m.integrantes.length, 0),
      icon: Users,
      href: "/admin/integrantes",
      color: "text-accent-foreground",
      bg: "bg-accent/20",
    },
    {
      label: "Proyectos",
      value: stats.proyectos,
      icon: FolderOpen,
      href: "/admin/proyectos",
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "PQRs activas",
      value: pqrsMock.filter((p) => p.estado !== "Cerrada").length,
      icon: MessageSquare,
      href: "/admin/pqr",
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
  ]

  const estadoColors: Record<string, string> = {
    Pendiente: "bg-warning/20 text-warning-foreground",
    "En revision": "bg-primary/20 text-primary",
    Respondida: "bg-success/20 text-success",
    Cerrada: "bg-muted text-muted-foreground",
  }

  return (
    <AdminShell title="Dashboard">
      <div className="space-y-6">
        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Link key={stat.label} href={stat.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="flex items-center gap-4 pt-5">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent PQRs */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  PQRs recientes
                </CardTitle>
                <Link href="/admin/pqr" className="text-xs text-primary hover:underline">
                  Ver todas
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentPqrs.map((pqr) => (
                  <div
                    key={pqr.id}
                    className="flex items-start justify-between gap-2 rounded-lg border border-border p-3"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{pqr.asunto}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {pqr.nombre} &middot; {pqr.tipo}
                      </p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {pqr.fechaCreacion}
                      </div>
                    </div>
                    <Badge className={`shrink-0 text-xs ${estadoColors[pqr.estado]}`}>
                      {pqr.estado}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent news */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Newspaper className="h-4 w-4 text-primary" />
                  Noticias recientes
                </CardTitle>
                <Link href="/admin/noticias" className="text-xs text-primary hover:underline">
                  Ver todas
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentNoticias.map((noticia) => (
                  <div
                    key={noticia.id}
                    className="flex items-start gap-3 rounded-lg border border-border p-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                      <Newspaper className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-foreground line-clamp-1">
                        {noticia.titulo}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{noticia.autor}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <Badge variant="outline" className="text-xs">
                        {noticia.categoria}
                      </Badge>
                      {noticia.destacada && (
                        <div className="flex items-center gap-0.5 text-xs text-accent-foreground">
                          <TrendingUp className="h-3 w-3 text-accent" />
                          <span className="text-accent text-xs">Dest.</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Municipios overview */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Resumen por municipio
              </CardTitle>
              <Link href="/admin/municipios" className="text-xs text-primary hover:underline">
                Gestionar
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="pb-2 text-left font-medium">Municipio</th>
                    <th className="pb-2 text-center font-medium">Integrantes</th>
                    <th className="pb-2 text-center font-medium">Proyectos</th>
                    <th className="pb-2 text-center font-medium">Noticias</th>
                  </tr>
                </thead>
                <tbody>
                  {municipios.map((m) => (
                    <tr key={m.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                      <td className="py-2 font-medium text-foreground">{m.nombre}</td>
                      <td className="py-2 text-center text-muted-foreground">{m.integrantes.length}</td>
                      <td className="py-2 text-center text-muted-foreground">{m.proyectos.length}</td>
                      <td className="py-2 text-center text-muted-foreground">{m.noticias.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  )
}
