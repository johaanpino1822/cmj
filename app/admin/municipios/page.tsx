"use client"

import Link from "next/link"
import { MapPin, ExternalLink, Users, FolderOpen, Newspaper } from "lucide-react"
import { AdminShell } from "@/components/admin-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { municipios } from "@/lib/data"

export default function AdminMunicipiosPage() {
  return (
    <AdminShell title="Municipios">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {municipios.length} municipios registrados
            </h2>
            <p className="text-sm text-muted-foreground">
              Gestiona los municipios del Norte de Antioquia.
            </p>
          </div>
        </div>

        {/* Table card */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="py-3 pl-4 text-left font-semibold text-muted-foreground">
                      Municipio
                    </th>
                    <th className="py-3 px-3 text-center font-semibold text-muted-foreground hidden sm:table-cell">
                      Población
                    </th>
                    <th className="py-3 px-3 text-center font-semibold text-muted-foreground">
                      <Users className="h-4 w-4 mx-auto" />
                    </th>
                    <th className="py-3 px-3 text-center font-semibold text-muted-foreground">
                      <FolderOpen className="h-4 w-4 mx-auto" />
                    </th>
                    <th className="py-3 px-3 text-center font-semibold text-muted-foreground">
                      <Newspaper className="h-4 w-4 mx-auto" />
                    </th>
                    <th className="py-3 pr-4 text-right font-semibold text-muted-foreground">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {municipios.map((m) => (
                    <tr
                      key={m.id}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-3 pl-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <MapPin className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{m.nombre}</p>
                            <p className="text-xs text-muted-foreground">
                              Alcalde: {m.alcalde}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center text-muted-foreground hidden sm:table-cell">
                        {m.poblacion.toLocaleString("es-CO")}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <Badge variant="secondary">{m.integrantes.length}</Badge>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <Badge variant="secondary">{m.proyectos.length}</Badge>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <Badge variant="secondary">{m.noticias.length}</Badge>
                      </td>
                      <td className="py-3 pr-4 text-right">
                        <Button asChild size="sm" variant="ghost">
                          <Link
                            href={`/municipio/${m.slug}`}
                            target="_blank"
                            className="flex items-center gap-1"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Ver
                          </Link>
                        </Button>
                      </td>
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
