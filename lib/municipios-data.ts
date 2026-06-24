// lib/municipios-data.ts
export interface Municipio {
  id: string
  nombre: string
  slug: string
  representante: string
  fotoRepresentante: string
  integrantes: number
  proyectos: number
  periodo: string
  centro: [number, number] // [lat, lng]
  poblacion: number
  area: string
}

export const municipiosData: Municipio[] = [
  {
    id: "angostura",
    nombre: "Angostura",
    slug: "angostura",
    representante: "Valentina Restrepo",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Valentina+Restrepo&background=2B5A14&color=fff&size=100",
    integrantes: 9,
    proyectos: 4,
    periodo: "2024-2028",
    centro: [6.885, -75.335],
    poblacion: 12500,
    area: "365 km²"
  },
  {
    id: "belmira",
    nombre: "Belmira",
    slug: "belmira",
    representante: "Juan Pablo Orozco",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Juan+Pablo+Orozco&background=2B5A14&color=fff&size=100",
    integrantes: 9,
    proyectos: 3,
    periodo: "2024-2028",
    centro: [6.605, -75.665],
    poblacion: 8600,
    area: "278 km²"
  },
  {
    id: "briceno",
    nombre: "Briceño",
    slug: "briceno",
    representante: "María José Puerta",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Maria+Jose+Puerta&background=2B5A14&color=fff&size=100",
    integrantes: 9,
    proyectos: 3,
    periodo: "2024-2028",
    centro: [7.110, -75.525],
    poblacion: 9800,
    area: "420 km²"
  },
  {
    id: "campamento",
    nombre: "Campamento",
    slug: "campamento",
    representante: "Carlos Mario Arango",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Carlos+Mario+Arango&background=2B5A14&color=fff&size=100",
    integrantes: 9,
    proyectos: 3,
    periodo: "2024-2028",
    centro: [6.980, -75.335],
    poblacion: 7200,
    area: "235 km²"
  },
  {
    id: "carolina",
    nombre: "Carolina del Príncipe",
    slug: "carolina-del-principe",
    representante: "Laura Estrada",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Laura+Estrada&background=2B5A14&color=fff&size=100",
    integrantes: 9,
    proyectos: 3,
    periodo: "2024-2028",
    centro: [6.725, -75.290],
    poblacion: 6400,
    area: "215 km²"
  },
  {
    id: "donmatias",
    nombre: "Don Matías",
    slug: "don-matias",
    representante: "Santiago Mesa",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Santiago+Mesa&background=2B5A14&color=fff&size=100",
    integrantes: 11,
    proyectos: 5,
    periodo: "2024-2028",
    centro: [6.510, -75.385],
    poblacion: 15200,
    area: "312 km²"
  },
  {
    id: "entrerrios",
    nombre: "Entrerríos",
    slug: "entrerrios",
    representante: "Ana María Giraldo",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Ana+Maria+Giraldo&background=2B5A14&color=fff&size=100",
    integrantes: 9,
    proyectos: 3,
    periodo: "2024-2028",
    centro: [6.565, -75.515],
    poblacion: 8900,
    area: "295 km²"
  },
  {
    id: "gomezplata",
    nombre: "Gómez Plata",
    slug: "gomez-plata",
    representante: "Daniela Echavarría",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Daniela+Echavarria&background=2B5A14&color=fff&size=100",
    integrantes: 9,
    proyectos: 3,
    periodo: "2024-2028",
    centro: [6.685, -75.355],
    poblacion: 10500,
    area: "340 km²"
  },
  {
    id: "guadalupe",
    nombre: "Guadalupe",
    slug: "guadalupe",
    representante: "Felipe Gómez",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Felipe+Gomez&background=2B5A14&color=fff&size=100",
    integrantes: 9,
    proyectos: 4,
    periodo: "2024-2028",
    centro: [6.815, -75.265],
    poblacion: 6800,
    area: "198 km²"
  },
  {
    id: "ituango",
    nombre: "Ituango",
    slug: "ituango",
    representante: "Natalia Correa",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Natalia+Correa&background=2B5A14&color=fff&size=100",
    integrantes: 11,
    proyectos: 5,
    periodo: "2024-2028",
    centro: [7.185, -75.765],
    poblacion: 23500,
    area: "1580 km²"
  },
  {
    id: "sanandres",
    nombre: "San Andrés de Cuerquia",
    slug: "san-andres",
    representante: "Andrés Felipe Rojas",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Andres+Felipe+Rojas&background=2B5A14&color=fff&size=100",
    integrantes: 9,
    proyectos: 3,
    periodo: "2024-2028",
    centro: [6.915, -75.675],
    poblacion: 5400,
    area: "186 km²"
  },
  {
    id: "sanjose",
    nombre: "San José de la Montaña",
    slug: "san-jose-de-la-montana",
    representante: "Carolina Uribe",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Carolina+Uribe&background=2B5A14&color=fff&size=100",
    integrantes: 9,
    proyectos: 3,
    periodo: "2024-2028",
    centro: [6.800, -75.415],
    poblacion: 5200,
    area: "245 km²"
  },
  {
    id: "sanpedro",
    nombre: "San Pedro de los Milagros",
    slug: "san-pedro",
    representante: "José David López",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Jose+David+Lopez&background=2B5A14&color=fff&size=100",
    integrantes: 9,
    proyectos: 4,
    periodo: "2024-2028",
    centro: [6.460, -75.560],
    poblacion: 11800,
    area: "320 km²"
  },
  {
    id: "santarosa",
    nombre: "Santa Rosa de Osos",
    slug: "santa-rosa-de-osos",
    representante: "Laura Fernanda Duque",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Laura+Fernanda+Duque&background=2B5A14&color=fff&size=100",
    integrantes: 13,
    proyectos: 6,
    periodo: "2024-2028",
    centro: [6.760, -75.470],
    poblacion: 32500,
    area: "780 km²"
  },
  {
    id: "toledo",
    nombre: "Toledo",
    slug: "toledo",
    representante: "Miguel Ángel Naranjo",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Miguel+Angel+Naranjo&background=2B5A14&color=fff&size=100",
    integrantes: 9,
    proyectos: 3,
    periodo: "2024-2028",
    centro: [7.015, -75.690],
    poblacion: 7800,
    area: "260 km²"
  },
  {
    id: "valdivia",
    nombre: "Valdivia",
    slug: "valdivia",
    representante: "Andrea Cardona",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Andrea+Cardona&background=2B5A14&color=fff&size=100",
    integrantes: 9,
    proyectos: 4,
    periodo: "2024-2028",
    centro: [7.160, -75.435],
    poblacion: 14500,
    area: "580 km²"
  },
  {
    id: "yarumal",
    nombre: "Yarumal",
    slug: "yarumal",
    representante: "Sofía Valencia",
    fotoRepresentante: "https://ui-avatars.com/api/?name=Sofia+Valencia&background=2B5A14&color=fff&size=100",
    integrantes: 13,
    proyectos: 7,
    periodo: "2024-2028",
    centro: [7.000, -75.450],
    poblacion: 28000,
    area: "650 km²"
  }
]