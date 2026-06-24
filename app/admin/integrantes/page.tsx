"use client"

import { useState } from "react"
import { Search, Mail, Phone } from "lucide-react"
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
import type { Integrante } from "@/lib/types"

const cargoColors: Record<string, string> = {
  Presidente: "bg-primary text-primary-foreground",
  Vicepresidente: "bg-primary/70 text-primary-foreground",
  "Secretario/a": "bg-secondary text-secondary-foreground",
  "Tesorero/a": "bg-accent/30 text-accent-foreground",
  Vocal: "bg-muted text-muted-foreground",
  "Delegado/a": "bg-muted text-muted-foreground",
}

interface IntegranteWithMunicipio extends Integrante {
  municipioNombre: string
}

export default function AdminIntegrantesPage() {
  const allIntegrantes: IntegranteWithMunicipio[] = municipios.flatMap((m) =>
    m.integrantes.map((i) => ({ ...i, municipioNombre: m.nombre }))
  )

  const [query, setQuery] = useState("")
  const [municipioFilter, setMunicipioFilter] = useState("all")
  const [cargoFilter, setCargoFilter] = useState("all")

  const filtered = allIntegrantes.filter((i) => {
    const matchQuery = i.nombre.toLowerCase().includes(query.toLowerCase())
    const matchMunicipio = municipioFilter === "all" || i.municipioId === municipioFilter
    const matchCargo = cargoFilter === "all" || i.cargo === cargoFilter
    return matchQuery && matchMunicipio && matchCargo
  })

  return (
    <AdminShell title="Integrantes">
      <div className="space-y-5">
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            {allIntegrantes.length} integrantes registrados
          </h2>
          <p className="text-sm text-muted-foreground">
            Listado de todos los integrantes de los CMJ.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre..."
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Select value={municipioFilter} onValueChange={setMunicipioFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Municipio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los municipios</SelectItem>
              {municipios.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={cargoFilter} onValueChange={setCargoFilter}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Cargo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los cargos</SelectItem>
              {["Presidente", "Vicepresidente", "Secretario/a", "Tesorero/a", "Vocal", "Delegado/a"].map(
                (c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <p className="text-xs text-muted-foreground">
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((integrante) => (
            <Card key={integrante.id} className="overflow-hidden">
              <div className="h-1.5 bg-primary" />
              <CardContent className="pt-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                    {integrante.nombre.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">
                      {integrante.nombre}
                    </p>
                    <Badge className={`mt-0.5 text-xs ${cargoColors[integrante.cargo]}`}>
                      {integrante.cargo}
                    </Badge>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs mb-2">
                  {integrante.municipioNombre}
                </Badge>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{integrante.email}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    {integrante.telefono}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminShell>
  )
}
