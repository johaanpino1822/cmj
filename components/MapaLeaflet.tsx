// components/MapaLeaflet.tsx
"use client"

import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Configurar íconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

// Componente para controlar el mapa
function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 })
  }, [center, zoom, map])
  return null
}

interface MapaLeafletProps {
  geoJSONData: any
  municipiosData: any[]
  selectedMunicipio: any
  setSelectedMunicipio: (municipio: any) => void
}

export default function MapaLeaflet({
  geoJSONData,
  municipiosData,
  selectedMunicipio,
  setSelectedMunicipio
}: MapaLeafletProps) {
  const mapRef = useRef<L.Map | null>(null)

  // Estilo para los municipios
  const geoJSONStyle = (feature: any) => {
    const isSelected = feature?.properties?.nombre === selectedMunicipio?.nombre
    return {
      fillColor: isSelected ? "#2E7D32" : "#66BB6A",
      fillOpacity: isSelected ? 0.8 : 0.6,
      color: isSelected ? "#1B5E20" : "#2E7D32",
      weight: isSelected ? 3 : 2,
      opacity: 1,
      smoothFactor: 1
    }
  }

  // Manejar clic en un municipio
  const handleFeatureClick = (feature: any) => {
    const nombre = feature.properties.nombre || feature.properties.dpto_cnmbr
    const municipio = municipiosData.find(m => 
      m.nombre === nombre || nombre?.includes(m.nombre)
    )
    if (municipio) {
      setSelectedMunicipio(selectedMunicipio?.id === municipio.id ? null : municipio)
    }
  }

  // Eventos para cada feature
  const onEachFeature = (feature: any, layer: L.Layer) => {
    layer.on({
      click: () => handleFeatureClick(feature)
    })

    const nombre = feature.properties.nombre || feature.properties.dpto_cnmbr || "Municipio"
    layer.bindTooltip(nombre, {
      permanent: false,
      direction: "center",
      className: "custom-tooltip",
      offset: [0, -10]
    })
  }

  const mapCenter: [number, number] = selectedMunicipio
    ? selectedMunicipio.centro
    : [6.85, -75.48]

  const mapZoom = selectedMunicipio ? 10 : 8.5

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      style={{ height: "100%", width: "100%", borderRadius: "12px" }}
      zoomControl={false}
      className="leaflet-container"
      ref={mapRef}
    >
      {/* Control de zoom personalizado */}
      <div className="leaflet-top leaflet-right" style={{ marginTop: "10px", marginRight: "10px" }}>
        <div className="leaflet-control-zoom leaflet-bar">
          <a
            className="leaflet-control-zoom-in"
            href="#"
            title="Zoom in"
            role="button"
            aria-label="Zoom in"
            onClick={(e) => {
              e.preventDefault()
              if (mapRef.current) mapRef.current.zoomIn()
            }}
          >+</a>
          <a
            className="leaflet-control-zoom-out"
            href="#"
            title="Zoom out"
            role="button"
            aria-label="Zoom out"
            onClick={(e) => {
              e.preventDefault()
              if (mapRef.current) mapRef.current.zoomOut()
            }}
          >-</a>
        </div>
      </div>

      <MapController center={mapCenter} zoom={mapZoom} />

      {/* Capa de mapa base */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        className="map-tiles"
      />

      {/* GeoJSON de Antioquia */}
      {geoJSONData && (
        <GeoJSON
          data={geoJSONData}
          style={geoJSONStyle}
          onEachFeature={onEachFeature}
        />
      )}

      {/* Marcadores de municipios */}
      {municipiosData.map((municipio) => {
        const isSelected = selectedMunicipio?.id === municipio.id
        return (
          <Marker
            key={municipio.id}
            position={municipio.centro}
            eventHandlers={{
              click: () => {
                setSelectedMunicipio(isSelected ? null : municipio)
              },
            }}
          >
            <Popup className="custom-popup">
              <div className="text-center p-2">
                <p className="font-bold text-green-800">{municipio.nombre}</p>
                <p className="text-xs text-gray-600">{municipio.integrantes} miembros</p>
                <p className="text-xs text-gray-500">CMJ {municipio.periodo}</p>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}