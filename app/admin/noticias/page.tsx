"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ExternalLink, TrendingUp } from "lucide-react"
import { AdminShell } from "@/components/admin-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllNoticias } from "@/lib/data"

export default function AdminNoticiasPage() {
  const allNoticias = getAllNoticias()
  const categorias = [...new Set(allNoticias.map((n) => n.categoria))]

  const [query, setQuery] = useState("")
  const [categoriaFilter, setCategoriaFilter] = useState("all")

  const filtered = allNoticias.filter((n) => {
    const matchQuery =
      n.titulo.toLowerCase().includes(query.toLowerCase()) ||
      n.autor.toLowerCase().includes(query.toLowerCase())
    const matchCategoria = categoriaFilter === "all" || n.categoria === categoriaFilter
    return matchQuery && matchCategoria
  })

  return (
    <AdminShell title="Noticias">
      <div className="space-y-5">
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            {allNoticias.length} noticias publicadas
          </h2>
          <p className="text-sm text-muted-foreground">
            Noticias regionales y de los 17 municipios.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título o autor..."
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categorias.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="text-xs text-muted-foreground">
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="py-3 pl-4 text-left font-semibold text-muted-foreground">
                      Título
                    </th>
                    <th className="py-3 px-3 text-left font-semibold text-muted-foreground hidden md:table-cell">
                      Autor
                    </th>
                    <th className="py-3 px-3 text-center font-semibold text-muted-foreground">
                      Categoría
                    </th>
                    <th className="py-3 px-3 text-center font-semibold text-muted-foreground hidden sm:table-cell">
                      Fecha
                    </th>
                    <th className="py-3 pr-4 text-right font-semibold text-muted-foreground">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((n) => (
                    <tr
                      key={n.id}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-3 pl-4">
                        <div className="flex items-start gap-2">
                          <div className="min-w-0">
                            <p className="font-medium text-foreground line-clamp-1">{n.titulo}</p>
                            {n.destacada && (
                              <span className="flex items-center gap-0.5 text-xs text-accent">
                                <TrendingUp className="h-3 w-3" />
                                Destacada
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-muted-foreground hidden md:table-cell text-xs">
                        {n.autor}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <Badge variant="outline" className="text-xs">
                          {n.categoria}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-center text-muted-foreground text-xs hidden sm:table-cell">
                        {new Date(n.fecha).toLocaleDateString("es-CO", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3 pr-4 text-right">
                        <Button asChild size="sm" variant="ghost">
                          <Link href={`/noticias/${n.id}`} target="_blank">
                            <ExternalLink className="h-3.5 w-3.5" />
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
