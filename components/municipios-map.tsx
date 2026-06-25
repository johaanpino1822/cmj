"use client"

import { useState, useEffect } from "react"
import { Users, FolderOpen, MapPin, ExternalLink, X } from "lucide-react"
import dynamic from "next/dynamic"

// ============================================================
// INTERFACES
// ============================================================

interface Municipio {
  id: string
  nombre: string
  slug: string
  centro: [number, number]
  integrantes: number
  proyectos: number
  periodo: string
  representante: string
  fotoRepresentante: string
  poblacion: number
  area: string
}

// ============================================================
// DATOS DE MUNICIPIOS DEL NORTE DE ANTIOQUIA
// ============================================================

const municipiosData: Municipio[] = [
  {
    id: "santarosa",
    nombre: "Santa Rosa de Osos",
    slug: "santa-rosa-de-osos",
    centro: [-75.470, 6.760],
    integrantes: 13,
    proyectos: 6,
    periodo: "2024-2028",
    representante: "Laura Fernanda Duque",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Laura+Duque&background=0f6b2d&color=fff&size=80",
    poblacion: 32500,
    area: "780 km²"
  },
  {
    id: "yarumal",
    nombre: "Yarumal",
    slug: "yarumal",
    centro: [-75.450, 7.000],
    integrantes: 13,
    proyectos: 7,
    periodo: "2024-2028",
    representante: "Sofía Valencia",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Sofia+Valencia&background=0f6b2d&color=fff&size=80",
    poblacion: 28000,
    area: "650 km²"
  },
  {
    id: "donmatias",
    nombre: "Don Matías",
    slug: "don-matias",
    centro: [-75.385, 6.510],
    integrantes: 11,
    proyectos: 5,
    periodo: "2024-2028",
    representante: "Santiago Mesa",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Santiago+Mesa&background=0f6b2d&color=fff&size=80",
    poblacion: 15200,
    area: "312 km²"
  },
  {
    id: "entrerrios",
    nombre: "Entrerríos",
    slug: "entrerrios",
    centro: [-75.515, 6.565],
    integrantes: 9,
    proyectos: 3,
    periodo: "2024-2028",
    representante: "Ana María Giraldo",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Ana+Giraldo&background=0f6b2d&color=fff&size=80",
    poblacion: 8900,
    area: "295 km²"
  },
  {
    id: "belmira",
    nombre: "Belmira",
    slug: "belmira",
    centro: [-75.665, 6.605],
    integrantes: 9,
    proyectos: 3,
    periodo: "2024-2028",
    representante: "Juan Pablo Orozco",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Juan+Orozco&background=0f6b2d&color=fff&size=80",
    poblacion: 8600,
    area: "278 km²"
  },
  {
    id: "sanpedro",
    nombre: "San Pedro de los Milagros",
    slug: "san-pedro",
    centro: [-75.560, 6.460],
    integrantes: 9,
    proyectos: 4,
    periodo: "2024-2028",
    representante: "José David López",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Jose+Lopez&background=0f6b2d&color=fff&size=80",
    poblacion: 11800,
    area: "320 km²"
  },
  {
    id: "carolina",
    nombre: "Carolina del Príncipe",
    slug: "carolina-del-principe",
    centro: [-75.290, 6.725],
    integrantes: 9,
    proyectos: 3,
    periodo: "2024-2028",
    representante: "Laura Estrada",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Laura+Estrada&background=0f6b2d&color=fff&size=80",
    poblacion: 6400,
    area: "215 km²"
  },
  {
    id: "gomezplata",
    nombre: "Gómez Plata",
    slug: "gomez-plata",
    centro: [-75.355, 6.685],
    integrantes: 9,
    proyectos: 3,
    periodo: "2024-2028",
    representante: "Daniela Echavarría",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Daniela+Echavarria&background=0f6b2d&color=fff&size=80",
    poblacion: 10500,
    area: "340 km²"
  },
  {
    id: "guadalupe",
    nombre: "Guadalupe",
    slug: "guadalupe",
    centro: [-75.265, 6.815],
    integrantes: 9,
    proyectos: 4,
    periodo: "2024-2028",
    representante: "Felipe Gómez",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Felipe+Gomez&background=0f6b2d&color=fff&size=80",
    poblacion: 6800,
    area: "198 km²"
  },
  {
    id: "angostura",
    nombre: "Angostura",
    slug: "angostura",
    centro: [-75.335, 6.885],
    integrantes: 9,
    proyectos: 4,
    periodo: "2024-2028",
    representante: "Valentina Restrepo",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Valentina+Restrepo&background=0f6b2d&color=fff&size=80",
    poblacion: 12500,
    area: "365 km²"
  },
  {
    id: "briceno",
    nombre: "Briceño",
    slug: "briceno",
    centro: [-75.525, 7.110],
    integrantes: 9,
    proyectos: 3,
    periodo: "2024-2028",
    representante: "María José Puerta",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Maria+Puerta&background=0f6b2d&color=fff&size=80",
    poblacion: 9800,
    area: "420 km²"
  },
  {
    id: "campamento",
    nombre: "Campamento",
    slug: "campamento",
    centro: [-75.335, 6.980],
    integrantes: 9,
    proyectos: 3,
    periodo: "2024-2028",
    representante: "Carlos Mario Arango",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Carlos+Arango&background=0f6b2d&color=fff&size=80",
    poblacion: 7200,
    area: "235 km²"
  },
  {
    id: "toledo",
    nombre: "Toledo",
    slug: "toledo",
    centro: [-75.690, 7.015],
    integrantes: 9,
    proyectos: 3,
    periodo: "2024-2028",
    representante: "Miguel Ángel Naranjo",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Miguel+Naranjo&background=0f6b2d&color=fff&size=80",
    poblacion: 7800,
    area: "260 km²"
  },
  {
    id: "valdivia",
    nombre: "Valdivia",
    slug: "valdivia",
    centro: [-75.435, 7.160],
    integrantes: 9,
    proyectos: 4,
    periodo: "2024-2028",
    representante: "Andrea Cardona",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Andrea+Cardona&background=0f6b2d&color=fff&size=80",
    poblacion: 14500,
    area: "580 km²"
  },
  {
    id: "ituango",
    nombre: "Ituango",
    slug: "ituango",
    centro: [-75.765, 7.185],
    integrantes: 11,
    proyectos: 5,
    periodo: "2024-2028",
    representante: "Natalia Correa",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Natalia+Correa&background=0f6b2d&color=fff&size=80",
    poblacion: 23500,
    area: "1580 km²"
  },
  {
    id: "sanandres",
    nombre: "San Andrés de Cuerquia",
    slug: "san-andres",
    centro: [-75.675, 6.915],
    integrantes: 9,
    proyectos: 3,
    periodo: "2024-2028",
    representante: "Andrés Felipe Rojas",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Andres+Rojas&background=0f6b2d&color=fff&size=80",
    poblacion: 5400,
    area: "186 km²"
  },
  {
    id: "sanjose",
    nombre: "San José de la Montaña",
    slug: "san-jose-de-la-montana",
    centro: [-75.415, 6.800],
    integrantes: 9,
    proyectos: 3,
    periodo: "2024-2028",
    representante: "Carolina Uribe",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Carolina+Uribe&background=0f6b2d&color=fff&size=80",
    poblacion: 5200,
    area: "245 km²"
  }
]

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

// Cargar el mapa dinámicamente solo en el cliente
const MapaLeaflet = dynamic(
  () => import("@/components/MapaLeaflet"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando mapa...</p>
        </div>
      </div>
    )
  }
)

export function MapaMunicipios() {
  const [selectedMunicipio, setSelectedMunicipio] = useState<Municipio | null>(null)
  const [antioquiaData, setAntioquiaData] = useState<any>(null)
  const [norteData, setNorteData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar los GeoJSON
  useEffect(() => {
    const loadGeoJSON = async () => {
      try {
        const [antioquiaRes, norteRes] = await Promise.all([
          fetch("/data/antioquia.geojson"),
          fetch("/data/norte_antioquia.geojson")
        ])

        if (!antioquiaRes.ok) {
          throw new Error("No se encontró antioquia.geojson")
        }

        if (!norteRes.ok) {
          throw new Error("No se encontró norte-antioquia.geojson")
        }

        const antioquia = await antioquiaRes.json()
        const norte = await norteRes.json()

        setAntioquiaData(antioquia)
        setNorteData(norte)
        setLoading(false)
      } catch (err) {
        console.error("Error cargando GeoJSON:", err)
        setError(err.message)
        setLoading(false)
      }
    }

    loadGeoJSON()
  }, [])

  if (loading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-50 rounded-2xl">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando mapa de Antioquia...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-50 rounded-2xl">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold">⚠️ Error</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
      {/* Título */}
      <div className="p-6 pb-0">
        <h2 className="text-2xl font-black uppercase tracking-wide text-gray-800 sm:text-3xl text-center">
          🏔️ Norte de Antioquia
        </h2>
        <div className="mx-auto mt-2 h-[3px] w-12 bg-green-600 rounded-full" />
        <p className="text-sm text-gray-500 text-center mt-2">
          {municipiosData.length} municipios · Consejos Municipales de Juventud
        </p>
      </div>

      {/* Mapa */}
      <div className="relative w-full h-[600px] p-4">
        <MapaLeaflet
          antioquiaData={antioquiaData}
          norteData={norteData}
          municipiosData={municipiosData}
          selectedMunicipio={selectedMunicipio}
          setSelectedMunicipio={setSelectedMunicipio}
        />

        {/* Tarjeta de información flotante */}
        {selectedMunicipio && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[1000] 
                          bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 
                          max-w-sm w-full mx-4 border border-green-100
                          animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-start gap-4">
              <img
                src={selectedMunicipio.fotoRepresentante}
                alt={selectedMunicipio.representante}
                className="w-16 h-16 rounded-full object-cover border-2 border-green-600"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                      CMJ
                    </span>
                    <h3 className="text-lg font-extrabold text-gray-900 mt-1">
                      {selectedMunicipio.nombre}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {selectedMunicipio.representante}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedMunicipio(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 my-3 py-3 border-t border-b border-gray-100">
              <div className="text-center">
                <Users className="w-4 h-4 text-green-600 mx-auto mb-1" />
                <p className="text-[10px] text-gray-500">Miembros</p>
                <p className="font-bold text-gray-900">{selectedMunicipio.integrantes}</p>
              </div>
              <div className="text-center">
                <FolderOpen className="w-4 h-4 text-green-600 mx-auto mb-1" />
                <p className="text-[10px] text-gray-500">Proyectos</p>
                <p className="font-bold text-gray-900">{selectedMunicipio.proyectos}</p>
              </div>
              <div className="text-center">
                <MapPin className="w-4 h-4 text-green-600 mx-auto mb-1" />
                <p className="text-[10px] text-gray-500">Población</p>
                <p className="font-bold text-gray-900">{selectedMunicipio.poblacion.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedMunicipio(null)}
                className="flex-1 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cerrar
              </button>
              <a
                href={`/municipio/${selectedMunicipio.slug}`}
                className="flex-1 text-center bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full transition-colors text-sm uppercase tracking-wider flex items-center justify-center gap-1"
              >
                Ver más
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-[10px] text-gray-400 text-center mt-2">
              Periodo {selectedMunicipio.periodo}
            </p>
          </div>
        )}

        {/* Instrucciones */}
        <div className="absolute bottom-4 right-4 z-[1000] text-white/60 text-xs text-right bg-black/50 px-3 py-2 rounded-lg backdrop-blur-sm">
          <p>🖱️ Haz clic en un municipio para ver su información</p>
        </div>
      </div>
    </div>
  )
}

export default MapaMunicipios