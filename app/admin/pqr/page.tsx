"use client"

import { useState, useEffect } from "react"
import { Search, Clock, CheckCircle, ChevronDown, ChevronUp } from "lucide-react"
import { AdminShell } from "@/components/admin-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { pqrsMock, municipios } from "@/lib/data"
import type { PQR, EstadoPQR } from "@/lib/types"

const estadoColors: Record<EstadoPQR, string> = {
  Pendiente: "bg-warning/20 text-warning-foreground",
  "En revision": "bg-primary/20 text-primary",
  Respondida: "bg-success/20 text-success",
  Cerrada: "bg-muted text-muted-foreground",
}

export default function AdminPQRPage() {
  const [pqrs, setPqrs] = useState<PQR[]>([...pqrsMock])
  const [query, setQuery] = useState("")
  const [estadoFilter, setEstadoFilter] = useState("all")
  const [tipoFilter, setTipoFilter] = useState("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [respuestaText, setRespuestaText] = useState<Record<string, string>>({})

  // Merge any PQRs submitted via the public form from localStorage
  useEffect(() => {
    try {
      const local = JSON.parse(localStorage.getItem("pqrs") ?? "[]") as PQR[]
      if (local.length > 0) {
        setPqrs((prev) => {
          const ids = new Set(prev.map((p) => p.id))
          return [...prev, ...local.filter((l) => !ids.has(l.id))]
        })
      }
    } catch {
      // ignore
    }
  }, [])

  const filtered = pqrs.filter((p) => {
    const matchQuery =
      p.nombre.toLowerCase().includes(query.toLowerCase()) ||
      p.asunto.toLowerCase().includes(query.toLowerCase()) ||
      p.id.toLowerCase().includes(query.toLowerCase())
    const matchEstado = estadoFilter === "all" || p.estado === estadoFilter
    const matchTipo = tipoFilter === "all" || p.tipo === tipoFilter
    return matchQuery && matchEstado && matchTipo
  })

  function updateEstado(id: string, estado: EstadoPQR) {
    setPqrs((prev) => prev.map((p) => (p.id === id ? { ...p, estado } : p)))
  }

  function responder(id: string) {
    const texto = respuestaText[id]
    if (!texto?.trim()) return
    setPqrs((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              estado: "Respondida",
              respuesta: texto,
              fechaRespuesta: new Date().toISOString().split("T")[0],
            }
          : p
      )
    )
    setExpandedId(null)
  }

  const getMunicipioNombre = (id: string) =>
    municipios.find((m) => m.id === id)?.nombre ?? id

  const statsByEstado: Record<string, number> = {
    Pendiente: pqrs.filter((p) => p.estado === "Pendiente").length,
    "En revision": pqrs.filter((p) => p.estado === "En revision").length,
    Respondida: pqrs.filter((p) => p.estado === "Respondida").length,
    Cerrada: pqrs.filter((p) => p.estado === "Cerrada").length,
  }

  return (
    <AdminShell title="Gestión de PQRs">
      <div className="space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Object.entries(statsByEstado).map(([estado, count]) => (
            <div
              key={estado}
              className="rounded-lg border border-border bg-card p-3 text-center cursor-pointer hover:bg-muted/40 transition-colors"
              onClick={() => setEstadoFilter(estado === estadoFilter ? "all" : estado)}
            >
              <p className="text-xl font-bold text-foreground">{count}</p>
              <Badge className={`text-xs mt-1 ${estadoColors[estado as EstadoPQR]}`}>
                {estado}
              </Badge>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, asunto o radicado..."
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
              {["Pendiente", "En revision", "Respondida", "Cerrada"].map((e) => (
                <SelectItem key={e} value={e}>{e}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={tipoFilter} onValueChange={setTipoFilter}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {["Peticion", "Queja", "Reclamo", "Sugerencia"].map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="text-xs text-muted-foreground">
          {filtered.length} PQR{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* PQR list */}
        <div className="space-y-3">
          {filtered.map((pqr) => {
            const isExpanded = expandedId === pqr.id
            return (
              <Card key={pqr.id} className="overflow-hidden">
                <CardHeader
                  className="pb-2 cursor-pointer select-none"
                  onClick={() => setExpandedId(isExpanded ? null : pqr.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-muted-foreground">{pqr.id}</span>
                        <Badge variant="outline" className="text-xs">{pqr.tipo}</Badge>
                        <Badge className={`text-xs ${estadoColors[pqr.estado]}`}>{pqr.estado}</Badge>
                      </div>
                      <CardTitle className="text-sm font-semibold text-foreground">
                        {pqr.asunto}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {pqr.nombre} &middot; {getMunicipioNombre(pqr.municipioId)} &middot;{" "}
                        <Clock className="inline h-3 w-3" /> {pqr.fechaCreacion}
                      </p>
                    </div>
                    <button className="shrink-0 text-muted-foreground hover:text-foreground">
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="border-t border-border pt-4 space-y-4">
                    {/* Contact info */}
                    <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
                      <div>
                        <p className="text-muted-foreground">Email</p>
                        <p className="font-medium text-foreground">{pqr.email}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Teléfono</p>
                        <p className="font-medium text-foreground">{pqr.telefono}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Cédula</p>
                        <p className="font-medium text-foreground">{pqr.cedula}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Descripción</p>
                      <p className="text-sm text-foreground leading-relaxed rounded-lg bg-muted p-3">
                        {pqr.descripcion}
                      </p>
                    </div>

                    {/* Existing response */}
                    {pqr.respuesta && (
                      <div>
                        <p className="text-xs font-semibold text-success mb-1 flex items-center gap-1">
                          <CheckCircle className="h-3.5 w-3.5" />
                          Respuesta enviada el {pqr.fechaRespuesta}
                        </p>
                        <p className="text-sm text-foreground leading-relaxed rounded-lg bg-success/10 border border-success/20 p-3">
                          {pqr.respuesta}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                      {/* Estado change */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-muted-foreground">Cambiar estado:</span>
                        {(["Pendiente", "En revision", "Respondida", "Cerrada"] as EstadoPQR[]).map(
                          (e) => (
                            <button
                              key={e}
                              onClick={() => updateEstado(pqr.id, e)}
                              className={`text-xs rounded-full px-2.5 py-0.5 font-medium transition-opacity ${
                                estadoColors[e]
                              } ${pqr.estado === e ? "opacity-100 ring-2 ring-offset-1 ring-current" : "opacity-60 hover:opacity-100"}`}
                            >
                              {e}
                            </button>
                          )
                        )}
                      </div>

                      {/* Reply box */}
                      {pqr.estado !== "Cerrada" && (
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground">
                            Responder al ciudadano
                          </p>
                          <Textarea
                            rows={3}
                            placeholder="Escribe la respuesta oficial..."
                            value={respuestaText[pqr.id] ?? pqr.respuesta ?? ""}
                            onChange={(e) =>
                              setRespuestaText((prev) => ({
                                ...prev,
                                [pqr.id]: e.target.value,
                              }))
                            }
                          />
                          <Button
                            size="sm"
                            onClick={() => responder(pqr.id)}
                            disabled={!respuestaText[pqr.id]?.trim()}
                          >
                            <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
                            Enviar respuesta
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </AdminShell>
  )
}
