/** Nestlong MVP - Base de Datos Simulada */

const PROPIEDADES = [
  {
    id: 1,
    titulo: "Apartamento Vanguardista en Salamanca",
    ciudad: "Madrid",
    zona: "Barrio de Salamanca",
    precioMensual: 1450,
    deposito: 2,
    habitaciones: 2,
    banos: 2,
    metrosCuadrados: 85,
    tipo: "apartamento",
    estanciaMinimaMeses: 12,
    servicios: ["Internet Fibra 1Gbps", "Conserje 24/7", "Calefacción Central", "Trastero"],
    imagenPrincipal: "https://picsum.photos/seed/nestlong-prop1/800/520",
    galeria: [
      "https://picsum.photos/seed/nestlong-prop1/800/520",
      "https://picsum.photos/seed/nestlong-int1a/800/520",
      "https://picsum.photos/seed/nestlong-int1b/800/520",
      "https://picsum.photos/seed/nestlong-int1c/800/520",
      "https://picsum.photos/seed/nestlong-int1d/800/520"
    ],
    descripcion: "Elegante piso reformado con acabados en roble natural y amplios ventanales. Orientación sur con luz natural todo el día. Diseñado específicamente para profesionales que buscan estabilidad residencial.",
    destacado: true,
    disponibilidad: "Inmediata"
  },
  {
    id: 2,
    titulo: "Ático con Terraza Panorámica en Eixample",
    ciudad: "Barcelona",
    zona: "Eixample Dret",
    precioMensual: 1750,
    deposito: 2,
    habitaciones: 3,
    banos: 2,
    metrosCuadrados: 110,
    tipo: "atico",
    estanciaMinimaMeses: 12,
    servicios: ["Terraza 25m²", "Fibra Óptica", "Climatización por Conductos", "Ascensor Directo"],
    imagenPrincipal: "https://picsum.photos/seed/nestlong-prop2/800/520",
    galeria: [
      "https://picsum.photos/seed/nestlong-prop2/800/520",
      "https://picsum.photos/seed/nestlong-int2a/800/520",
      "https://picsum.photos/seed/nestlong-int2b/800/520",
      "https://picsum.photos/seed/nestlong-int2c/800/520",
      "https://picsum.photos/seed/nestlong-int2d/800/520"
    ],
    descripcion: "Ático exclusivo con techos altos de bóveda catalana restaurada. Gran terraza privada con vistas despejadas. Contrato de larga duración con cláusulas blindadas para tu tranquilidad.",
    destacado: true,
    disponibilidad: "Desde 1 de Octubre"
  },
  {
    id: 3,
    titulo: "Estudio Nórdico Minimalista en Ruzafa",
    ciudad: "Valencia",
    zona: "Ruzafa Creativo",
    precioMensual: 820,
    deposito: 1,
    habitaciones: 1,
    banos: 1,
    metrosCuadrados: 48,
    tipo: "estudio",
    estanciaMinimaMeses: 12,
    servicios: ["Mobiliario Ergonómico", "Espacio Home Office", "Aire Acondicionado", "Bicicletero"],
    imagenPrincipal: "https://picsum.photos/seed/nestlong-prop3/800/520",
    galeria: [
      "https://picsum.photos/seed/nestlong-prop3/800/520",
      "https://picsum.photos/seed/nestlong-int3a/800/520",
      "https://picsum.photos/seed/nestlong-int3c/800/520",
      "https://picsum.photos/seed/nestlong-int3d/800/520"
    ],
    descripcion: "Espacio optimizado al milímetro con zona dedicada a teletrabajo y cocina integrada de diseño escandinavo. Perfecto para estancias prolongadas en el barrio más vibrante de la ciudad.",
    destacado: false,
    disponibilidad: "Inmediata"
  },
  {
    id: 4,
    titulo: "Dúplex Clásico Restaurado en Santa Cruz",
    ciudad: "Sevilla",
    zona: "Casco Histórico",
    precioMensual: 1150,
    deposito: 1,
    habitaciones: 2,
    banos: 2,
    metrosCuadrados: 92,
    tipo: "duplex",
    estanciaMinimaMeses: 12,
    servicios: ["Patio Privado", "Placas Solares", "Agua Incluida", "Cocina Equipada"],
    imagenPrincipal: "https://picsum.photos/seed/nestlong-prop4/800/520",
    galeria: [
      "https://picsum.photos/seed/nestlong-prop4/800/520",
      "https://picsum.photos/seed/nestlong-int4a/800/520",
      "https://picsum.photos/seed/nestlong-int4c/800/520",
      "https://picsum.photos/seed/nestlong-int4d/800/520"
    ],
    descripcion: "Vivienda en dos niveles con patio interior andaluz privado y solárium superior. Aislamiento térmico y acústico de última generación para un descanso absoluto en el corazón urbano.",
    destacado: false,
    disponibilidad: "Inmediata"
  },
  {
    id: 5,
    titulo: "Piso Contemporáneo Frente al Puerto",
    ciudad: "Málaga",
    zona: "Soho - Puerto",
    precioMensual: 1300,
    deposito: 2,
    habitaciones: 2,
    banos: 2,
    metrosCuadrados: 88,
    tipo: "apartamento",
    estanciaMinimaMeses: 12,
    servicios: ["Vistas al Mar", "Garaje Subterráneo", "Piscina Comunitaria", "Gimnasio"],
    imagenPrincipal: "https://picsum.photos/seed/nestlong-prop5/800/520",
    galeria: [
      "https://picsum.photos/seed/nestlong-prop5/800/520",
      "https://picsum.photos/seed/nestlong-int5a/800/520",
      "https://picsum.photos/seed/nestlong-int5c/800/520",
      "https://picsum.photos/seed/nestlong-int5d/800/520"
    ],
    descripcion: "Urbanización moderna con certificación energética A. Amplio salón con cristaleras panorámicas y cocina con isla central. Máxima solvencia y contrato plurianual garantizado.",
    destacado: true,
    disponibilidad: "Desde 15 de Octubre"
  },
  {
    id: 6,
    titulo: "Residencia Familiar Junto a Doña Casilda",
    ciudad: "Bilbao",
    zona: "Abandoibarra",
    precioMensual: 1600,
    deposito: 2,
    habitaciones: 4,
    banos: 2,
    metrosCuadrados: 135,
    tipo: "apartamento",
    estanciaMinimaMeses: 24,
    servicios: ["2 Plazas de Garaje", "Calefacción Radiante", "Conserjería", "Zona Infantil"],
    imagenPrincipal: "https://picsum.photos/seed/nestlong-prop6/800/520",
    galeria: [
      "https://picsum.photos/seed/nestlong-prop6/800/520",
      "https://picsum.photos/seed/nestlong-int6a/800/520",
      "https://picsum.photos/seed/nestlong-int6c/800/520",
      "https://picsum.photos/seed/nestlong-int6d/800/520"
    ],
    descripcion: "Hogar de amplias dimensiones ideal para familias que buscan arraigo. Situado a escasos pasos de zonas verdes y colegios de prestigio. Contrato de 2 a 5 años renovable.",
    destacado: false,
    disponibilidad: "Inmediata"
  }
];

const TESTIMONIOS = [
  {
    id: 1,
    nombre: "Laura Mendez Ruiz",
    ciudad: "Madrid",
    texto: "Llevamos 3 anos en nuestro piso de Salamanca gracias a Nestlong. La gestion de la fianza fue impecable y el contrato nos dio la tranquilidad que necesitabamos para planificar a largo plazo.",
    puntuacion: 5,
    avatarSeed: "nestlong-avatar1",
    ocupacion: "Directora de Marketing"
  },
  {
    id: 2,
    nombre: "Carlos Fernandez Vega",
    ciudad: "Barcelona",
    texto: "Como propietario, Nestlong me conecto con un inquilino verificado en menos de una semana. Sin rotacion estacional, sin sorpresas. La renta llega puntual cada mes desde hace 18 meses.",
    puntuacion: 5,
    avatarSeed: "nestlong-avatar2",
    ocupacion: "Arquitecto"
  },
  {
    id: 3,
    nombre: "Ana Belen Torres",
    ciudad: "Valencia",
    texto: "Me mude a Valencia por teletrabajo y encontre un estudio perfecto en Ruzafa. El proceso fue transparente, sin comisiones ocultas y con un contrato que realmente protege al inquilino.",
    puntuacion: 4,
    avatarSeed: "nestlong-avatar3",
    ocupacion: "Desarrolladora de Software"
  },
  {
    id: 4,
    nombre: "Miguel Angel Diaz",
    ciudad: "Sevilla",
    texto: "Nuestra familia necesitaba estabilidad despues del traslado laboral. Nestlong nos ofrecio un duplex con contrato de 3 anos y fianza custodiada oficialmente. Ahora es nuestro hogar.",
    puntuacion: 5,
    avatarSeed: "nestlong-avatar4",
    ocupacion: "Ingeniero Industrial"
  }
];

const PREGUNTAS_FRECUENTES = [
  {
    id: 1,
    pregunta: "Cual es la estancia minima en Nestlong?",
    respuesta: "Todos nuestros contratos tienen una duracion minima de 12 meses, con opcion de prorroga hasta 5 anos segun la Ley de Arrendamientos Urbanos (LAU). Esto garantiza estabilidad tanto para el inquilino como para el propietario."
  },
  {
    id: 2,
    pregunta: "Como funciona la custodia de la fianza?",
    respuesta: "El 100% de las fianzas se deposita en el organismo autonomico oficial correspondiente (IVIMA en Madrid, INCASOL en Cataluna, etc.). Te entregamos un resguardo oficial en un plazo maximo de 20 dias habiles tras la firma del contrato."
  },
  {
    id: 3,
    pregunta: "Hay comisiones o costes ocultos para el inquilino?",
    respuesta: "Nestlong no cobra honorarios de agencia al inquilino. Recibes un desglose economico completo antes de la firma: renta mensual, fianza legal y suministros estimados. Sin sorpresas."
  },
  {
    id: 4,
    pregunta: "Que sucede si necesito rescindir el contrato anticipadamente?",
    respuesta: "Segun la LAU, el inquilino puede desistir del contrato una vez transcurridos los primeros 6 meses, notificandolo con 30 dias de antelacion. Las condiciones exactas se especifican en cada contrato."
  },
  {
    id: 5,
    pregunta: "Como se verifican las propiedades publicadas?",
    respuesta: "Cada inmueble pasa por un protocolo de inspeccion que incluye comprobacion de titularidad registral, cedula de habitabilidad vigente, certificado de eficiencia energetica y verificacion de estado real de suministros e instalaciones."
  },
  {
    id: 6,
    pregunta: "Puedo negociar las condiciones del contrato?",
    respuesta: "Si. Cada contrato se personaliza segun las necesidades del inquilino y propietario dentro del marco legal de la LAU. Nuestro equipo juridico asesora a ambas partes para alcanzar condiciones equilibradas."
  }
];

const BARRIOS_DESTACADOS = [
  {
    id: 1,
    nombre: "Salamanca",
    ciudad: "Madrid",
    imagenSeed: "nestlong-barrio-madrid",
    propiedadesDisponibles: 12,
    descripcionCorta: "Elegancia clasica, boutiques de autor y gastronomia de nivel en el corazon de la capital."
  },
  {
    id: 2,
    nombre: "Eixample",
    ciudad: "Barcelona",
    imagenSeed: "nestlong-barrio-barcelona",
    propiedadesDisponibles: 9,
    descripcionCorta: "Arquitectura modernista, avenidas amplias y la mejor conectividad de la ciudad condal."
  },
  {
    id: 3,
    nombre: "Ruzafa",
    ciudad: "Valencia",
    imagenSeed: "nestlong-barrio-valencia",
    propiedadesDisponibles: 7,
    descripcionCorta: "Creatividad, mercados de proximidad y vida de barrio con caracter mediterraneo."
  },
  {
    id: 4,
    nombre: "Santa Cruz",
    ciudad: "Sevilla",
    imagenSeed: "nestlong-barrio-sevilla",
    propiedadesDisponibles: 5,
    descripcionCorta: "Callejuelas con historia, patios interiores y la esencia del casco antiguo andaluz."
  },
  {
    id: 5,
    nombre: "Soho",
    ciudad: "Malaga",
    imagenSeed: "nestlong-barrio-malaga",
    propiedadesDisponibles: 6,
    descripcionCorta: "Arte urbano, brisa de puerto y la transformacion cultural de la Costa del Sol."
  },
  {
    id: 6,
    nombre: "Abandoibarra",
    ciudad: "Bilbao",
    imagenSeed: "nestlong-barrio-bilbao",
    propiedadesDisponibles: 4,
    descripcionCorta: "Vanguardia junto a la ria, museos y gastronomia vasca de primer nivel."
  }
];

// Exportar al scope global
if (typeof window !== "undefined") {
  window.PROPIEDADES = PROPIEDADES;
  window.TESTIMONIOS = TESTIMONIOS;
  window.PREGUNTAS_FRECUENTES = PREGUNTAS_FRECUENTES;
  window.BARRIOS_DESTACADOS = BARRIOS_DESTACADOS;
}
