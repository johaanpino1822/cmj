import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PQRForm } from "@/components/pqr-form"
import { Clock, ShieldCheck, MessageSquare, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Radicar PQR",
  description:
    "Radica tu Petición, Queja, Reclamo o Sugerencia ante el Consejo Municipal de Juventud de tu municipio.",
}

export default function PQRPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-primary py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/60 mb-2">
              Participación ciudadana
            </p>
            <h1 className="text-3xl font-black uppercase tracking-wide text-white sm:text-4xl">
              Canales de Atención PQR
            </h1>
            <div className="mt-3 h-0.5 w-10 bg-white/40" />
            <p className="mt-4 text-white/70 max-w-2xl text-sm leading-relaxed">
              Radica tu Petición, Queja, Reclamo o Sugerencia. Te responderemos en un máximo de 15
              días hábiles.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Form */}
            <PQRForm />

            {/* Info sidebar */}
            <aside className="flex flex-col gap-5">
              {/* Types */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  Tipos de solicitud
                </h2>
                <ul className="space-y-3 text-sm">
                  {[
                    {
                      tipo: "Peticion",
                      color: "bg-primary/10 text-primary",
                      desc: "Solicitud de información, documentos o actuaciones del CMJ.",
                    },
                    {
                      tipo: "Queja",
                      color: "bg-destructive/10 text-destructive",
                      desc: "Manifestación de inconformidad sobre el servicio o conducta del CMJ.",
                    },
                    {
                      tipo: "Reclamo",
                      color: "bg-warning/20 text-warning-foreground",
                      desc: "Exigencia de reconocimiento de un derecho o cumplimiento de una obligación.",
                    },
                    {
                      tipo: "Sugerencia",
                      color: "bg-success/10 text-success",
                      desc: "Propuesta para mejorar el servicio o las actividades del CMJ.",
                    },
                  ].map((item) => (
                    <li key={item.tipo} className="flex gap-2">
                      <span
                        className={`shrink-0 mt-0.5 rounded px-1.5 py-0.5 text-xs font-medium ${item.color}`}
                      >
                        {item.tipo}
                      </span>
                      <span className="text-muted-foreground leading-relaxed">{item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timing */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Tiempos de respuesta
                </h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    { label: "Petición", tiempo: "15 días hábiles" },
                    { label: "Queja", tiempo: "15 días hábiles" },
                    { label: "Reclamo", tiempo: "15 días hábiles" },
                    { label: "Sugerencia", tiempo: "30 días hábiles" },
                  ].map((item) => (
                    <li key={item.label} className="flex items-center justify-between">
                      <span>{item.label}</span>
                      <span className="font-medium text-foreground">{item.tiempo}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Privacy */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Privacidad
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tu información personal es tratada con confidencialidad conforme a la Ley 1581 de
                  2012 (Habeas Data). Solo será usada para dar respuesta a tu solicitud.
                </p>
              </div>

              {/* Steps */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Proceso
                </h2>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  {[
                    "Diligencia el formulario con tu información y descripción.",
                    "Tu solicitud queda registrada con un número único.",
                    "El CMJ del municipio recibe y revisa tu solicitud.",
                    "Recibes respuesta al correo electrónico registrado.",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
