import Link from "next/link"
import Image from "next/image"
import { Users, Newspaper, FolderOpen, MapPin, ChevronRight, Mail } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {MapaMunicipios} from "@/components/municipios-map"
import { municipios, noticiasRegionales, stats } from "@/lib/data"
import ImageCarousel from "@/components/ImageCarousel"

/* ─── Section heading: uppercase bold + green underline bar ─── */
function SectionHeading({ title }: { title: string }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-2xl font-black uppercase tracking-wide text-foreground sm:text-3xl">
        {title}
      </h2>
      <div className="mx-auto mt-2 h-[3px] w-10 bg-primary rounded-full" />
    </div>
  )
}

const NEWS_IMAGES = [
  "/images/noticias/encuentro-subregional.png",
  "/images/noticias/foro-ambiente.png",
  "/images/noticias/encuentro-cmj.png",
  "/images/noticias/foro-juventud.png",
]

export default function HomePage() {
  const featuredNoticias = noticiasRegionales.filter((n) => n.destacada).slice(0, 4)

  return (
    <>
      <Navbar />
      <main>

        {/* ══════════════════════════════════════════════
            CARRUSEL DE IMÁGENES — 4 imágenes juventud/CMJ
        ══════════════════════════════════════════════ */}
        <section className="relative h-[520px] sm:h-[580px] lg:h-[640px] overflow-hidden">
          <ImageCarousel />
          
          {/* Texto superpuesto sobre el carrusel */}
          <div className="absolute inset-0 z-20 flex items-end">
            <div className="w-full max-w-7xl mx-auto px-6 pb-14 sm:px-10 lg:px-14">
              <h1 className="text-5xl font-black uppercase leading-[0.9] text-white drop-shadow-sm sm:text-6xl lg:text-7xl max-w-2xl text-balance">
                Juventud en red,<br />
                territorio en movimiento
              </h1>
              <p className="mt-4 text-base text-white/85 max-w-md leading-relaxed font-light drop-shadow-md">
                Portal de los Consejos Municipales de Juventud de la Subregión Norte
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/municipios"
                  className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-white shadow hover:bg-primary-hover transition-colors"
                >
                  Conoce tu consejo
                </Link>
                <Link
                  href="/pqr"
                  className="inline-flex items-center rounded-md border border-white/50 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
                >
                  Radicar PQR
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            STATS BAR — 4 numbers on white
        ══════════════════════════════════════════════ */}
        <section className="bg-white border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-2 divide-x divide-y divide-border lg:grid-cols-4 lg:divide-y-0">
              {([
                { label: "Municipios",        value: stats.municipios,    Icon: MapPin     },
                { label: "Jóvenes líderes",   value: `${stats.jovenes}+`, Icon: Users      },
                { label: "Proyectos activos", value: stats.proyectos,     Icon: FolderOpen },
                { label: "Publicaciones",     value: stats.noticias,      Icon: Newspaper  },
              ] as const).map(({ label, value, Icon }) => (
                <div key={label} className="flex items-center gap-4 px-6 py-7">
                  <Icon className="h-7 w-7 text-primary/50 shrink-0" />
                  <div>
                    <dd className="text-2xl font-black text-foreground leading-none">{value}</dd>
                    <dt className="text-xs font-medium text-muted-foreground mt-1 uppercase tracking-wide">{label}</dt>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            NUESTROS MUNICIPIOS — SVG map + list
        ══════════════════════════════════════════════ */}
        <section className="bg-white py-16" id="municipios">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Nuestros Municipios" />

            <div className="grid gap-10 lg:grid-cols-2 items-start">

              {/* Left: interactive SVG map */}
              <div className="rounded-2xl border border-border bg-[#f4f9f2] p-6 shadow-sm">
                <MapaMunicipios/>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Haz clic en un punto para ver el CMJ del municipio
                </p>
              </div>

              {/* Right: municipality grid list */}
              <div className="flex flex-col gap-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Los <strong className="text-foreground">17 municipios</strong> del Norte de
                  Antioquia cuentan con un Consejo Municipal de Juventud activo, conformado por
                  jóvenes de 14 a 28 años elegidos democráticamente.
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {municipios.map((m) => (
                    <Link
                      key={m.slug}
                      href={`/municipio/${m.slug}`}
                      className="group flex items-center justify-between rounded-lg border border-border bg-white px-3 py-2.5 text-sm font-medium text-foreground hover:border-primary hover:bg-[#f4f9f2] transition-all"
                    >
                      <span className="truncate text-sm group-hover:text-primary transition-colors">
                        {m.nombre}
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary shrink-0 ml-1 transition-colors" />
                    </Link>
                  ))}
                </div>
                <Link
                  href="/municipios"
                  className="self-start inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-primary-hover transition-colors"
                >
                  Ver todos
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            QUIÉNES SOMOS — green band
        ══════════════════════════════════════════════ */}
        <section className="py-14" id="quienes-somos" style={{ backgroundColor: "oklch(0.38 0.13 140)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 mb-1">
                  Sobre nosotros
                </p>
                <h2 className="text-2xl font-black uppercase text-white sm:text-3xl leading-tight">
                  ¿Quiénes Somos?
                </h2>
                <div className="mt-2 h-[3px] w-10 bg-white/35 rounded-full" />
                <p className="mt-5 text-sm leading-relaxed text-white/75 max-w-lg">
                  Los Consejos Municipales de Juventud (CMJ) son organismos de representación
                  política juvenil creados por la Ley 1622 de 2013 y la Ley 1885 de 2018.
                  Somos el canal oficial de participación juvenil en cada uno de los 17 municipios
                  del Norte de Antioquia.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/75 max-w-lg">
                  Nuestra misión es representar a jóvenes entre 14 y 28 años, promover sus
                  derechos e impulsar proyectos que transformen el territorio desde la
                  participación democrática.
                </p>
                <Link
                  href="/municipios"
                  className="mt-6 inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors uppercase tracking-wider"
                >
                  Conoce los CMJ <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Representación", desc: "Voz oficial de jóvenes de 14 a 28 años ante los gobiernos municipales." },
                  { label: "Participación",  desc: "Espacios democráticos para incidir en políticas públicas de juventud." },
                  { label: "Proyectos",      desc: "Iniciativas locales en educación, medio ambiente, cultura y deporte." },
                  { label: "Territorio",     desc: "17 municipios articulados en una red subregional de liderazgo juvenil." },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-white/10 border border-white/12 p-4">
                    <p className="text-xs font-black uppercase tracking-widest text-white mb-1.5">{item.label}</p>
                    <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            NOTICIAS Y EVENTOS — 4 photo cards
        ══════════════════════════════════════════════ */}
        <section className="bg-white py-16" id="noticias">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div className="text-left">
                <h2 className="text-2xl font-black uppercase tracking-wide text-foreground sm:text-3xl">
                  Noticias y Eventos
                </h2>
                <div className="mt-2 h-[3px] w-10 bg-primary rounded-full" />
              </div>
              <Link
                href="/noticias"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                Ver todas <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featuredNoticias.map((noticia, i) => (
                <Link
                  key={noticia.id}
                  href={`/noticias/${noticia.id}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative h-44 overflow-hidden bg-[#f4f9f2]">
                    <Image
                      src={NEWS_IMAGES[i % NEWS_IMAGES.length]}
                      alt={noticia.titulo}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-4">
                    <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug text-balance">
                      {noticia.titulo}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed flex-1">
                      {noticia.resumen}
                    </p>
                    <span className="mt-3 text-xs font-bold uppercase tracking-wide text-primary">
                      Leer Más &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link href="/noticias" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                Ver todas las noticias <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            PQR + ÚNETE — deep green, 2 columns
        ══════════════════════════════════════════════ */}
        <section className="py-14" style={{ backgroundColor: "oklch(0.28 0.10 140)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2">

              {/* ── Canales PQR ── */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">
                  Ciudadanía
                </p>
                <h2 className="text-xl font-black uppercase tracking-wide text-white">
                  Canales de Atención
                </h2>
                <p className="text-sm text-white/55 mt-0.5 mb-5">
                  PQR (Peticiones, Quejas, Reclamos)
                </p>
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      className="rounded border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/40 [&>option]:bg-white [&>option]:text-foreground"
                      defaultValue=""
                    >
                      <option value="" disabled>Tipo de Solicitud</option>
                      <option>Petición</option>
                      <option>Queja</option>
                      <option>Reclamo</option>
                      <option>Sugerencia</option>
                    </select>
                    <select
                      className="rounded border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/40 [&>option]:bg-white [&>option]:text-foreground"
                      defaultValue=""
                    >
                      <option value="" disabled>Municipio</option>
                      {municipios.map((m) => (
                        <option key={m.slug} value={m.slug}>{m.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Asunto"
                    className="rounded border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:ring-1 focus:ring-white/40"
                  />
                  <textarea
                    placeholder="Mensaje"
                    rows={3}
                    className="rounded border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:ring-1 focus:ring-white/40 resize-none"
                  />
                  <Link
                    href="/pqr"
                    className="flex items-center justify-center rounded bg-white px-5 py-2.5 text-sm font-black uppercase tracking-widest hover:bg-white/90 transition-colors"
                    style={{ color: "oklch(0.38 0.13 140)" }}
                  >
                    Enviar PQR
                  </Link>
                </div>
              </div>

              {/* ── Únete a la Red ── */}
              <div className="lg:pl-10 lg:border-l lg:border-white/15">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">
                  Red juvenil
                </p>
                <h2 className="text-xl font-black uppercase tracking-wide text-white mb-1">
                  Únete a la Red
                </h2>
                <p className="text-sm text-white/55 mb-6">
                  Participa en el cambio de tu municipio
                </p>
                <p className="text-sm text-white/65 leading-relaxed mb-6">
                  Inscríbete para recibir información, convocatorias y novedades de los CMJ
                  de la Subregión Norte de Antioquia.
                </p>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    className="rounded border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:ring-1 focus:ring-white/40"
                  />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="rounded border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:ring-1 focus:ring-white/40"
                  />
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded bg-white px-5 py-2.5 text-sm font-black uppercase tracking-widest hover:bg-white/90 transition-colors"
                    style={{ color: "oklch(0.38 0.13 140)" }}
                  >
                    <Mail className="h-4 w-4" />
                    Inscribirme
                  </button>
                </div>
                <p className="mt-4 text-[10px] text-white/35 leading-relaxed">
                  Al inscribirte aceptas recibir comunicaciones del CMJ Norte de Antioquia.
                  Puedes cancelar en cualquier momento.
                </p>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}