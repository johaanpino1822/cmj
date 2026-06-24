export interface CMJInfo {
  /** Periodo del mandato actual, ej. "2024 – 2028" */
  periodo: string
  /** Fecha de posesión oficial */
  fechaPosesion: string
  /** Norma o acto administrativo que avala la elección */
  normaLegal: string
  /** Número de escaños / curules */
  numeroCurules: number
  /** Misión del CMJ local */
  mision: string
  /** Visión del CMJ local */
  vision: string
  /** Objetivos principales */
  objetivos: string[]
  /** Redes sociales */
  redes?: { facebook?: string; instagram?: string; tiktok?: string }
}

export interface Municipio {
  id: string
  slug: string
  nombre: string
  descripcion: string
  poblacion: number
  altitud: number
  fundacion: number
  imagen: string
  escudo: string
  alcalde: string
  website?: string
  region: string
  /** Información específica del CMJ del municipio */
  cmj: CMJInfo
  integrantes: Integrante[]
  proyectos: Proyecto[]
  noticias: Noticia[]
}

export interface Integrante {
  id: string
  municipioId: string
  nombre: string
  cargo: CargoIntegrante
  foto: string
  email: string
  telefono: string
  edad: number
  periodoInicio: string
  periodoFin: string
  bio: string
}

export type CargoIntegrante =
  | "Presidente"
  | "Vicepresidente"
  | "Secretario/a"
  | "Tesorero/a"
  | "Vocal"
  | "Delegado/a"

export interface Proyecto {
  id: string
  municipioId: string
  titulo: string
  descripcion: string
  estado: EstadoProyecto
  fechaInicio: string
  fechaFin?: string
  presupuesto: number
  beneficiarios: number
  categoria: CategoriaProyecto
  imagen: string
}

export type EstadoProyecto = "Planificado" | "En curso" | "Completado" | "Suspendido"

export type CategoriaProyecto =
  | "Educacion"
  | "Salud"
  | "Cultura"
  | "Deporte"
  | "Medio Ambiente"
  | "Emprendimiento"
  | "Participacion"

export interface Noticia {
  id: string
  municipioId?: string
  titulo: string
  resumen: string
  contenido: string
  imagen: string
  autor: string
  fecha: string
  categoria: string
  destacada: boolean
  tags: string[]
}

export interface PQR {
  id: string
  tipo: TipoPQR
  municipioId: string
  nombre: string
  email: string
  telefono: string
  cedula: string
  asunto: string
  descripcion: string
  estado: EstadoPQR
  fechaCreacion: string
  fechaRespuesta?: string
  respuesta?: string
}

export type TipoPQR = "Peticion" | "Queja" | "Reclamo" | "Sugerencia"
export type EstadoPQR = "Pendiente" | "En revision" | "Respondida" | "Cerrada"

export interface AdminUser {
  id: string
  nombre: string
  email: string
  municipioId?: string
  rol: "Super Admin" | "Admin Municipal"
}
