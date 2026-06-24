"use client"

import { useState } from "react"
import { Search, Users, DollarSign } from "lucide-react"
import { AdminShell } from "@/components/admin-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { municipios } from "@/lib/data"
import type { Proyecto, EstadoProyecto } from "@/lib/types"

const estadoColors: Record<EstadoProyecto, string> = {
  Planificado: "bg-secondary text-secondary-foreground",
  "En curso": "bg-primary/20 text-primary",
  Completado: "bg-success/20 text-success",
  Suspendido: "bg-destructive/20 text-destructive",
}

interface ProyectoWithMunicipio extends Proyecto {
  municipioNombre: string
}

export default function AdminProyectosPage() {
  const allProyectos: ProyectoWithMunicipio[] = municipios.flatMap((m) =>
    m.proyectos.map((p) => ({ ...p, municipioNombre: m.nombre }))
  )

  const [query, setQuery] = useState("")
  const [estadoFilter, setEstadoFilter] = useState("all")
  const [municipioFilter, setMunicipioFilter] = useState("all")

  const filtered = allProyectos.filter((p) => {
    const matchQuery = p.titulo.toLowerCase().includes(query.toLowerCase())
    const matchEstado = estadoFilter === "all" || p.estado === estadoFilter
    const matchMunicipio = municipioFilter === "all" || p.municipioId === municipioFilter
    return matchQuery && matchEstado && matchMunicipio
  })

  const totalPresupuesto = filtered.reduce((a, p) => a + p.presupuesto, 0)
  const totalBeneficiarios = filtered.reduce((a, p) => a + p.beneficiarios, 0)

  return (
    <AdminShell title="Proyectos">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {allProyectos.length} proyectos registrados
            </h2>
            <p className="text-sm text-muted-foreground">
              Todos los proyectos de los CMJ del Norte de Antioquia.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título..."
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Select value={estadoFilter} onValueChange={setEstadoFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {["Planificado", "En curso", "Completado", "Suspendido"].map((e) => (
                <SelectItem key={e} value={e}>
                  {e}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={municipioFilter} onValueChange={setMunicipioFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Municipio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {municipios.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Proyectos", value: filtered.length },
            {
              label: "Presupuesto total",
              value: `$${(totalPresupuesto / 1_000_000).toFixed(1)}M`,
            },
            { label: "Beneficiarios", value: totalBeneficiarios.toLocaleString("es-CO") },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-border bg-card p-3 text-center"
            >
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="py-3 pl-4 text-left font-semibold text-muted-foreground">
                      Proyecto
                    </th>
                    <th className="py-3 px-3 text-left font-semibold text-muted-foreground hidden md:table-cell">
                      Municipio
                    </th>
                    <th className="py-3 px-3 text-center font-semibold text-muted-foreground">
                      Estado
                    </th>
                    <th className="py-3 px-3 text-right font-semibold text-muted-foreground hidden sm:table-cell">
                      Presupuesto
                    </th>
                    <th className="py-3 pr-4 text-right font-semibold text-muted-foreground hidden sm:table-cell">
                      Benef.
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-3 pl-4">
                        <p className="font-medium text-foreground line-clamp-1">{p.titulo}</p>
                        <Badge variant="outline" className="mt-0.5 text-xs">
                          {p.categoria}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-muted-foreground hidden md:table-cell text-xs">
                        {p.municipioNombre}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <Badge className={`text-xs ${estadoColors[p.estado]}`}>{p.estado}</Badge>
                      </td>
                      <td className="py-3 px-3 text-right text-muted-foreground text-xs hidden sm:table-cell">
                        <span className="flex items-center justify-end gap-1">
                          <DollarSign className="h-3 w-3" />
                          {(p.presupuesto / 1_000_000).toFixed(1)}M
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-right text-muted-foreground text-xs hidden sm:table-cell">
                        <span className="flex items-center justify-end gap-1">
                          <Users className="h-3 w-3" />
                          {p.beneficiarios}
                        </span>
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
