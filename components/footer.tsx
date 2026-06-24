import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter } from "lucide-react"

const FOOTER_MUNICIPIOS = [
  { slug: "yarumal",              nombre: "Yarumal"             },
  { slug: "santa-rosa-de-osos",   nombre: "Santa Rosa de Osos"  },
  { slug: "ituango",              nombre: "Ituango"             },
  { slug: "san-pedro",            nombre: "San Pedro"           },
  { slug: "don-matias",           nombre: "Don Matías"          },
  { slug: "angostura",            nombre: "Angostura"           },
  { slug: "campamento",           nombre: "Campamento"          },
]

const ESCUDOS = [
  { slug: "yarumal",            src: "/images/escudos/yarumal.png",           nombre: "Yarumal"            },
  { slug: "santa-rosa-de-osos", src: "/images/escudos/santa-rosa-de-osos.png", nombre: "Santa Rosa"         },
  { slug: "ituango",            src: "/images/escudos/ituango.png",           nombre: "Ituango"            },
  { slug: "don-matias",         src: "/images/escudos/don-matias.png",        nombre: "Don Matías"         },
  { slug: "san-pedro",          src: "/images/escudos/san-pedro.png",         nombre: "San Pedro"          },
]

export function Footer() {
  return (
    <footer style={{ backgroundColor: "oklch(0.28 0.10 140)" }} className="text-white">
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* ── Col 1: Verde Altiplano (contact + nav) ── */}
          <div>
            <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.25em] text-white">
              Verde Altiplano
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-white/60">
              {[
                { href: "/",               label: "Inicio"        },
                { href: "/#quienes-somos", label: "Quiénes Somos" },
                { href: "/municipios",     label: "Municipios"    },
                { href: "/noticias",       label: "Noticias"      },
                { href: "/pqr",            label: "Canales PQR"   },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col gap-1.5 text-xs text-white/45">
              <span className="flex items-center gap-2">
                <Phone className="h-3 w-3 shrink-0" />
                +57 (604) 833 0000
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-3 w-3 shrink-0" />
                contacto@cmjnorte.gov.co
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-3 w-3 shrink-0" />
                Norte de Antioquia, Colombia
              </span>
            </div>
          </div>

          {/* ── Col 2: Social media ── */}
          <div>
            <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.25em] text-white">
              Social media
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-white/60">
              {[
                { href: "https://facebook.com",  label: "Facebook",  Icon: Facebook  },
                { href: "https://instagram.com", label: "Instagram",  Icon: Instagram },
                { href: "https://twitter.com",   label: "Twitter / X", Icon: Twitter  },
              ].map(({ href, label, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Legal ── */}
          <div>
            <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.25em] text-white">
              Legal
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-white/60">
              {[
                { href: "/",          label: "Inicio"               },
                { href: "/noticias",  label: "Publicaciones"        },
                { href: "/pqr",       label: "Canales PQR"          },
                { href: "/municipios",label: "Municipalidades"       },
                { href: "/",          label: "Política de Privacidad"},
                { href: "/",          label: "Contacto"             },
              ].map((l, i) => (
                <li key={i}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Municipios with escudo badges ── */}
          <div>
            <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.25em] text-white">
              Municipios
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-white/60 mb-5">
              {FOOTER_MUNICIPIOS.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/municipio/${m.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {m.nombre}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/municipios" className="font-semibold text-white/80 hover:text-white transition-colors">
                  Ver todos &rarr;
                </Link>
              </li>
            </ul>

            {/* Escudo badges row */}
            <div className="flex flex-wrap gap-2">
              {ESCUDOS.map((e) => (
                <Link
                  key={e.slug}
                  href={`/municipio/${e.slug}`}
                  className="group flex flex-col items-center gap-0.5"
                  title={e.nombre}
                >
                  <div className="h-9 w-9 rounded-full overflow-hidden bg-white/10 border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors">
                    <Image
                      src={e.src}
                      alt={`Escudo ${e.nombre}`}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-10 border-t border-white/15 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/35">
          <p>
            &copy; {new Date().getFullYear()} CMJ Norte de Antioquia. Todos los derechos reservados.
          </p>
          <p>
            Hecho con{" "}
            <span className="text-white/50" aria-hidden>♥</span>
            {" "}por y para la juventud del Norte
          </p>
        </div>
      </div>
    </footer>
  )
}
