import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MunicipiosGrid } from "@/components/municipios-grid"
import { municipios } from "@/lib/data"

export const metadata: Metadata = {
  title: "Municipios",
  description:
    "Conoce los 17 Consejos Municipales de Juventud del Norte de Antioquia, sus integrantes, proyectos y noticias.",
}

export default function MunicipiosPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page header */}
        <section className="bg-primary py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/60 mb-2">
              Subregión Norte
            </p>
            <h1 className="text-3xl font-black uppercase tracking-wide text-white sm:text-4xl">
              Nuestros Municipios
            </h1>
            <div className="mt-3 h-0.5 w-10 bg-white/50" />
            <p className="mt-4 text-white/70 max-w-2xl text-sm leading-relaxed">
              Los 17 municipios del Norte de Antioquia con Consejo Municipal de Juventud activo.
              Selecciona un municipio para conocer sus integrantes, proyectos y noticias.
            </p>
          </div>
        </section>

        <MunicipiosGrid municipios={municipios} />
      </main>
      <Footer />
    </>
  )
}
