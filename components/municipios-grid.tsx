"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Users, FolderOpen, Newspaper, MapPin, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import type { Municipio } from "@/lib/types"

interface Props {
  municipios: Municipio[]
}

export function MunicipiosGrid({ municipios }: Props) {
  const [query, setQuery] = useState("")

  const filtered = municipios.filter((m) =>
    m.nombre.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <section className="py-10 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar municipio..."
            className="pl-9 bg-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <p className="mb-6 text-sm text-muted-foreground">
          {filtered.length} de {municipios.length} municipio{municipios.length !== 1 ? "s" : ""}
        </p>

        {filtered.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>Sin resultados</EmptyTitle>
              <EmptyDescription>
                No se encontraron municipios que coincidan con &ldquo;{query}&rdquo;.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((municipio) => (
              <MunicipioCard key={municipio.id} municipio={municipio} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function MunicipioCard({ municipio }: { municipio: Municipio }) {
  return (
    <Link
      href={`/municipio/${municipio.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      {/* Top green accent band */}
      <div className="h-1.5 w-full bg-primary group-hover:bg-accent transition-colors" />

      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Avatar + Name */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-primary font-black text-sm group-hover:bg-primary group-hover:text-white transition-colors">
            {municipio.nombre.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors leading-tight">
              {municipio.nombre}
            </h3>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
              <MapPin className="h-2.5 w-2.5" />
              <span>{municipio.poblacion.toLocaleString("es-CO")} hab.</span>
            </div>
          </div>
        </div>

        {/* CMJ mission snippet */}
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {municipio.cmj.mision}
        </p>

        {/* Stats footer */}
        <div className="flex items-center gap-3 pt-2 border-t border-border text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3 text-primary" />
            {municipio.integrantes.length}
          </span>
          <span className="flex items-center gap-1">
            <FolderOpen className="h-3 w-3 text-primary" />
            {municipio.proyectos.length}
          </span>
          <span className="flex items-center gap-1">
            <Newspaper className="h-3 w-3 text-primary" />
            {municipio.noticias.length}
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-primary ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </Link>
  )
}
