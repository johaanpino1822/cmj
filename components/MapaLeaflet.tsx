"use client"

import { useEffect } from "react"
import {
  MapContainer,
  GeoJSON,
  useMap
} from "react-leaflet"

import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface Props {
  antioquiaData: any
  norteData: any
  municipiosData: any[]
  selectedMunicipio: any
  setSelectedMunicipio: (municipio: any) => void
}

function FitBounds({ data }: { data: any }) {
  const map = useMap()

  useEffect(() => {
    if (!data) return

    try {
      const bounds = L.geoJSON(data).getBounds()
      
      if (bounds.isValid()) {
        map.fitBounds(bounds, {
          padding: [20, 20]
        })
      }
    } catch (error) {
      console.error("Error ajustando límites:", error)
    }
  }, [data, map])

  return null
}

export default function MapaLeaflet({
  antioquiaData,
  norteData,
  municipiosData,
  selectedMunicipio,
  setSelectedMunicipio
}: Props) {

  // Estilo para la silueta de Antioquia (fondo)
  const antioquiaStyle = {
    fillColor: "#e5e7eb",
    fillOpacity: 0.25,
    color: "#64748b",
    weight: 1,
    dashArray: "3, 3"
  }

  // Estilo para los municipios del Norte (interactivos)
  const norteStyle = (feature: any) => {
    const isSelected = selectedMunicipio?.nombre === feature?.properties?.nombre

    return {
      fillColor: isSelected ? "#14532d" : "#4CAF50",
      fillOpacity: isSelected ? 0.9 : 0.75,
      color: "#ffffff",
      weight: isSelected ? 3 : 1.2
    }
  }

  const onEachFeature = (
    feature: any,
    layer: any
  ) => {
    const municipio = municipiosData.find(
      (m) => m.nombre === feature?.properties?.nombre
    )

    if (!municipio) return

    // Tooltip con el nombre del municipio
    layer.bindTooltip(municipio.nombre, {
      sticky: true,
      className: "custom-tooltip"
    })

    // Eventos de interacción
    layer.on({
      click: () => {
        setSelectedMunicipio(municipio)
      },

      mouseover: (e: any) => {
        e.target.setStyle({
          fillOpacity: 1,
          weight: 3,
          color: "#ffffff"
        })
        
        // Mostrar tooltip
        layer.openTooltip()
      },

      mouseout: (e: any) => {
        const isSelected = selectedMunicipio?.nombre === municipio.nombre
        
        e.target.setStyle({
          fillOpacity: isSelected ? 0.9 : 0.75,
          weight: isSelected ? 3 : 1.2,
          color: "#ffffff"
        })
        
        // Cerrar tooltip
        layer.closeTooltip()
      }
    })
  }

  return (
    <MapContainer
      zoom={9}
      center={[6.9, -75.4]}
      style={{
        width: "100%",
        height: "100%",
        background: "#f8fafc"
      }}
      zoomControl={true}
    >
      {/* Ajustar límites al área del Norte */}
      <FitBounds data={norteData} />

      {/* Capa 1: Silueta completa de Antioquia (fondo) */}
      {antioquiaData && (
        <GeoJSON
          data={antioquiaData}
          style={antioquiaStyle}
        />
      )}

      {/* Capa 2: Municipios del Norte (interactivos) */}
      {norteData && (
        <GeoJSON
          data={norteData}
          style={norteStyle}
          onEachFeature={onEachFeature}
        />
      )}
    </MapContainer>
  )
}