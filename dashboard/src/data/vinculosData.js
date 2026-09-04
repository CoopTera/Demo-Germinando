// ─── Programas y Áreas del Estado con los que articula Germinando ───

export const programasEstado = [
  {
    id: 1,
    nombre: "Santa Fe Más",
    area: "Ministerio de Desarrollo Social",
    nivel: "Provincial",
    responsable: "Lic. Andrea Ruiz",
    contacto: "aruiz@santafe.gob.ar",
    telefono: "342-4505000 int. 2340",
    color: "#3B82F6"
  },
  {
    id: 2,
    nombre: "Argentina Trabaja",
    area: "Ministerio de Trabajo, Empleo y Seguridad Social",
    nivel: "Nacional",
    responsable: "Dr. Julio Méndez",
    contacto: "jmendez@trabajo.gob.ar",
    telefono: "011-4310-5600",
    color: "#10B981"
  },
  {
    id: 3,
    nombre: "ProHuerta",
    area: "INTA",
    nivel: "Nacional",
    responsable: "Ing. Agr. Susana Berretta",
    contacto: "prohuerta@inta.gob.ar",
    telefono: "342-4860000",
    color: "#F59E0B"
  },
  {
    id: 4,
    nombre: "Potenciar Trabajo",
    area: "Ministerio de Economía Social",
    nivel: "Nacional",
    responsable: "Lic. Romina Altamirano",
    contacto: "raltamirano@economia.gob.ar",
    telefono: "011-4349-3000",
    color: "#8B5CF6"
  },
  {
    id: 5,
    nombre: "Nueva Oportunidad",
    area: "Secretaría de Inclusión Social",
    nivel: "Provincial",
    responsable: "Prof. Marcelo Vázquez",
    contacto: "mvazquez@santafe.gob.ar",
    telefono: "342-4573700",
    color: "#EF4444"
  },
  {
    id: 6,
    nombre: "Formación Continua",
    area: "Ministerio de Educación",
    nivel: "Provincial",
    responsable: "Lic. Beatriz Ferreyra",
    contacto: "bferreyra@santafe.gob.ar",
    telefono: "342-4506800",
    color: "#06B6D4"
  },
  {
    id: 7,
    nombre: "Red de Municipios Cooperativos",
    area: "Secretaría de Municipios y Comunas",
    nivel: "Provincial",
    responsable: "Cr. Diego Pellegrini",
    contacto: "dpellegrini@santafe.gob.ar",
    telefono: "342-4573100",
    color: "#F97316"
  },
  {
    id: 8,
    nombre: "Compre Santafesino",
    area: "Ministerio de Producción, Ciencia y Tecnología",
    nivel: "Provincial",
    responsable: "Ing. Laura Gómez",
    contacto: "lgomez@santafe.gob.ar",
    telefono: "342-4505300",
    color: "#EC4899"
  }
];

// ─── Vínculos / Articulaciones Institucionales ───

export const vinculosInstitucionales = [
  {
    id: "vinc-1",
    programa_id: 1,
    titulo: "Articulación capacitación textil con Santa Fe Más",
    descripcion: "Derivación cruzada de beneficiarios para talleres textiles. Coordinación de cupos y seguimiento de asistencia conjunta.",
    tipo: "Convenio Marco",
    estado: "Vigente",
    fechaInicio: "2024-01-15",
    fechaFin: "2025-06-30",
    presupuestoAsignado: 4500000,
    presupuestoEjecutado: 2800000,
    organizaciones_ids: [1, 3],
    beneficiarios_derivados: 45,
    hitos: [
      { id: "h1-1", titulo: "Firma convenio marco", fecha: "2024-01-15", completado: true },
      { id: "h1-2", titulo: "1° cohorte derivada (22 beneficiarios)", fecha: "2024-04-01", completado: true },
      { id: "h1-3", titulo: "Evaluación intermedia conjunta", fecha: "2024-09-15", completado: true },
      { id: "h1-4", titulo: "2° cohorte derivada", fecha: "2025-02-01", completado: false },
      { id: "h1-5", titulo: "Informe final y rendición", fecha: "2025-06-30", completado: false }
    ],
    notas: "Reunión quincenal de seguimiento con equipo técnico de SF Más. Contacto directo: Andrea Ruiz."
  },
  {
    id: "vinc-2",
    programa_id: 1,
    titulo: "Derivación al servicio de salud y hábitat",
    descripcion: "Articulación para acceso a servicios de salud mental y mejoramiento habitacional para beneficiarios del programa.",
    tipo: "Acta Complementaria",
    estado: "Vigente",
    fechaInicio: "2024-06-01",
    fechaFin: "2025-12-31",
    presupuestoAsignado: 2200000,
    presupuestoEjecutado: 900000,
    organizaciones_ids: [2],
    beneficiarios_derivados: 18,
    hitos: [
      { id: "h2-1", titulo: "Firma acta complementaria", fecha: "2024-06-01", completado: true },
      { id: "h2-2", titulo: "Relevamiento de necesidades", fecha: "2024-08-15", completado: true },
      { id: "h2-3", titulo: "Inicio de intervenciones", fecha: "2024-11-01", completado: false },
      { id: "h2-4", titulo: "Evaluación de impacto", fecha: "2025-12-31", completado: false }
    ],
    notas: "Priorizar beneficiarios de zonas vulnerables de Rosario y Santa Fe capital."
  },
  {
    id: "vinc-3",
    programa_id: 2,
    titulo: "Inserción laboral cooperativa — Argentina Trabaja",
    descripcion: "Programa de entrenamiento laboral para beneficiarios egresados de talleres, con foco en cooperativas de trabajo.",
    tipo: "Convenio Marco",
    estado: "Vigente",
    fechaInicio: "2023-07-01",
    fechaFin: "2025-06-30",
    presupuestoAsignado: 8200000,
    presupuestoEjecutado: 6100000,
    organizaciones_ids: [1, 4, 5],
    beneficiarios_derivados: 72,
    hitos: [
      { id: "h3-1", titulo: "Firma convenio bilateral", fecha: "2023-07-01", completado: true },
      { id: "h3-2", titulo: "1° grupo de inserción (30 personas)", fecha: "2023-11-15", completado: true },
      { id: "h3-3", titulo: "Evaluación primer semestre", fecha: "2024-01-30", completado: true },
      { id: "h3-4", titulo: "2° grupo de inserción (42 personas)", fecha: "2024-07-01", completado: true },
      { id: "h3-5", titulo: "Informe de permanencia laboral", fecha: "2025-03-01", completado: false },
      { id: "h3-6", titulo: "Cierre y rendición final", fecha: "2025-06-30", completado: false }
    ],
    notas: "Coordinación con oficinas de empleo de Rosario, Rafaela y Reconquista."
  },
  {
    id: "vinc-4",
    programa_id: 3,
    titulo: "Huertas comunitarias en organizaciones productivas",
    descripcion: "Capacitación y provisión de insumos para huertas orgánicas en cooperativas y asociaciones vinculadas al programa.",
    tipo: "Cooperación Técnica",
    estado: "Vigente",
    fechaInicio: "2023-03-01",
    fechaFin: "2026-02-28",
    presupuestoAsignado: 3800000,
    presupuestoEjecutado: 2900000,
    organizaciones_ids: [7, 9],
    beneficiarios_derivados: 56,
    hitos: [
      { id: "h4-1", titulo: "Acuerdo INTA — Germinando", fecha: "2023-03-01", completado: true },
      { id: "h4-2", titulo: "Entrega semillas y herramientas", fecha: "2023-05-15", completado: true },
      { id: "h4-3", titulo: "Capacitación técnicos en campo", fecha: "2023-09-01", completado: true },
      { id: "h4-4", titulo: "Cosecha piloto y medición", fecha: "2024-03-01", completado: true },
      { id: "h4-5", titulo: "Ampliación a 5 nuevas sedes", fecha: "2025-03-01", completado: false },
      { id: "h4-6", titulo: "Sistematización de experiencia", fecha: "2026-02-28", completado: false }
    ],
    notas: "INTA provee asistencia técnica in situ. Germinando administra la logística y los cupos."
  },
  {
    id: "vinc-5",
    programa_id: 4,
    titulo: "Complemento salarial Potenciar Trabajo",
    descripcion: "Beneficiarios de Germinando que cobran complemento salarial a través de Potenciar Trabajo mientras se capacitan.",
    tipo: "Derivación",
    estado: "Vigente",
    fechaInicio: "2024-03-01",
    fechaFin: "2025-02-28",
    presupuestoAsignado: 12000000,
    presupuestoEjecutado: 8500000,
    organizaciones_ids: [1, 2, 3, 4],
    beneficiarios_derivados: 110,
    hitos: [
      { id: "h5-1", titulo: "Nómina de beneficiarios cruzada", fecha: "2024-03-01", completado: true },
      { id: "h5-2", titulo: "Alta en sistema Potenciar", fecha: "2024-04-15", completado: true },
      { id: "h5-3", titulo: "Auditoría AFIP cruzada", fecha: "2024-10-01", completado: true },
      { id: "h5-4", titulo: "Renovación anual de nómina", fecha: "2025-02-28", completado: false }
    ],
    notas: "Presupuesto mayoritariamente nacional. Germinando aporta seguimiento y contraprestación formativa."
  },
  {
    id: "vinc-6",
    programa_id: 5,
    titulo: "Talleres de oficio — Nueva Oportunidad",
    descripcion: "Coordinación para que jóvenes de 18-30 años de Nueva Oportunidad accedan a talleres productivos de Germinando.",
    tipo: "Acta Complementaria",
    estado: "Vigente",
    fechaInicio: "2024-08-01",
    fechaFin: "2025-07-31",
    presupuestoAsignado: 3200000,
    presupuestoEjecutado: 1100000,
    organizaciones_ids: [5, 6],
    beneficiarios_derivados: 35,
    hitos: [
      { id: "h6-1", titulo: "Firma acta de cooperación", fecha: "2024-08-01", completado: true },
      { id: "h6-2", titulo: "Convocatoria y selección", fecha: "2024-09-15", completado: true },
      { id: "h6-3", titulo: "Inicio 1° cuatrimestre", fecha: "2024-10-01", completado: false },
      { id: "h6-4", titulo: "Certificación conjunta", fecha: "2025-07-31", completado: false }
    ],
    notas: "Prioridad: jóvenes de barrios vulnerables de Rosario, Villa Gobernador Gálvez y Santa Fe."
  },
  {
    id: "vinc-7",
    programa_id: 6,
    titulo: "Certificación de competencias laborales",
    descripcion: "Reconocimiento formal de saberes adquiridos en talleres de Germinando mediante certificaciones del Ministerio de Educación.",
    tipo: "Convenio Marco",
    estado: "En Negociación",
    fechaInicio: "2025-03-01",
    fechaFin: "2026-12-31",
    presupuestoAsignado: 1800000,
    presupuestoEjecutado: 0,
    organizaciones_ids: [],
    beneficiarios_derivados: 0,
    hitos: [
      { id: "h7-1", titulo: "Reunión técnica inicial", fecha: "2025-01-15", completado: true },
      { id: "h7-2", titulo: "Diseño curricular conjunto", fecha: "2025-03-01", completado: false },
      { id: "h7-3", titulo: "Aprobación ministerial", fecha: "2025-06-01", completado: false },
      { id: "h7-4", titulo: "1° cohorte certificada", fecha: "2025-12-01", completado: false },
      { id: "h7-5", titulo: "Evaluación y ajuste", fecha: "2026-12-31", completado: false }
    ],
    notas: "En etapa de definición de contenidos mínimos. Contacto con Dirección de Educación Técnica."
  },
  {
    id: "vinc-8",
    programa_id: 7,
    titulo: "Red de municipios para compras cooperativas",
    descripcion: "Articulación con municipios para que cooperativas de Germinando provean bienes y servicios a gobiernos locales.",
    tipo: "Cooperación Técnica",
    estado: "Vigente",
    fechaInicio: "2023-11-01",
    fechaFin: "2025-10-31",
    presupuestoAsignado: 5600000,
    presupuestoEjecutado: 3200000,
    organizaciones_ids: [1, 6, 8],
    beneficiarios_derivados: 28,
    hitos: [
      { id: "h8-1", titulo: "Adhesión de 5 municipios", fecha: "2023-11-01", completado: true },
      { id: "h8-2", titulo: "Catálogo de productos cooperativos", fecha: "2024-02-01", completado: true },
      { id: "h8-3", titulo: "1° ronda de compras", fecha: "2024-05-15", completado: true },
      { id: "h8-4", titulo: "Adhesión de 3 municipios más", fecha: "2024-11-01", completado: true },
      { id: "h8-5", titulo: "2° ronda de compras", fecha: "2025-05-15", completado: false },
      { id: "h8-6", titulo: "Informe de impacto económico", fecha: "2025-10-31", completado: false }
    ],
    notas: "Municipios adheridos: Rosario, Santa Fe, Rafaela, Reconquista, Venado Tuerto, Casilda, Sunchales, Santo Tomé."
  },
  {
    id: "vinc-9",
    programa_id: 8,
    titulo: "Registro Compre Santafesino para cooperativas",
    descripcion: "Inscripción y acompañamiento de cooperativas del programa en el Registro Compre Santafesino para acceder a licitaciones provinciales.",
    tipo: "Derivación",
    estado: "Vigente",
    fechaInicio: "2024-04-01",
    fechaFin: "2025-03-31",
    presupuestoAsignado: 1500000,
    presupuestoEjecutado: 1200000,
    organizaciones_ids: [1, 3, 8, 10],
    beneficiarios_derivados: 15,
    hitos: [
      { id: "h9-1", titulo: "Capacitación en trámites", fecha: "2024-04-01", completado: true },
      { id: "h9-2", titulo: "Inscripción de 6 cooperativas", fecha: "2024-06-15", completado: true },
      { id: "h9-3", titulo: "1° adjudicación lograda", fecha: "2024-09-20", completado: true },
      { id: "h9-4", titulo: "Balance anual", fecha: "2025-03-31", completado: false }
    ],
    notas: "4 cooperativas ya adjudicadas en licitaciones menores. Objetivo: 8 cooperativas activas."
  },
  {
    id: "vinc-10",
    programa_id: 2,
    titulo: "Formación en economía social — Módulo CESS",
    descripcion: "Ciclo formativo en economía social y solidaria para referentes de organizaciones vinculadas a Germinando.",
    tipo: "Cooperación Técnica",
    estado: "Finalizado",
    fechaInicio: "2023-03-01",
    fechaFin: "2023-11-30",
    presupuestoAsignado: 2800000,
    presupuestoEjecutado: 2800000,
    organizaciones_ids: [1, 2, 3, 5, 7],
    beneficiarios_derivados: 40,
    hitos: [
      { id: "h10-1", titulo: "Diseño curricular", fecha: "2023-03-01", completado: true },
      { id: "h10-2", titulo: "Inicio de clases", fecha: "2023-04-15", completado: true },
      { id: "h10-3", titulo: "Evaluación parcial", fecha: "2023-07-15", completado: true },
      { id: "h10-4", titulo: "Acto de egreso", fecha: "2023-11-30", completado: true }
    ],
    notas: "Programa finalizado exitosamente. 38 de 40 referentes completaron la formación."
  },
  {
    id: "vinc-11",
    programa_id: 3,
    titulo: "Semillero provincial de agroecología",
    descripcion: "Banco de semillas nativas gestionado conjuntamente con ProHuerta para distribución en huertas del programa.",
    tipo: "Convenio Marco",
    estado: "En Negociación",
    fechaInicio: "2025-06-01",
    fechaFin: "2027-05-31",
    presupuestoAsignado: 2500000,
    presupuestoEjecutado: 0,
    organizaciones_ids: [7, 9],
    beneficiarios_derivados: 0,
    hitos: [
      { id: "h11-1", titulo: "Estudio de factibilidad", fecha: "2025-04-01", completado: false },
      { id: "h11-2", titulo: "Firma de convenio", fecha: "2025-06-01", completado: false },
      { id: "h11-3", titulo: "Instalación del banco", fecha: "2025-10-01", completado: false },
      { id: "h11-4", titulo: "1° distribución", fecha: "2026-03-01", completado: false }
    ],
    notas: "Pendiente aprobación de presupuesto por parte de INTA central."
  },
  {
    id: "vinc-12",
    programa_id: 5,
    titulo: "Acompañamiento psicosocial conjunto",
    descripcion: "Equipo interdisciplinario compartido con Nueva Oportunidad para seguimiento psicosocial de beneficiarios en situación de vulnerabilidad.",
    tipo: "Acta Complementaria",
    estado: "Suspendido",
    fechaInicio: "2024-01-01",
    fechaFin: "2024-12-31",
    presupuestoAsignado: 1900000,
    presupuestoEjecutado: 600000,
    organizaciones_ids: [2, 5],
    beneficiarios_derivados: 12,
    hitos: [
      { id: "h12-1", titulo: "Conformación equipo", fecha: "2024-01-01", completado: true },
      { id: "h12-2", titulo: "Protocolo de intervención", fecha: "2024-03-01", completado: true },
      { id: "h12-3", titulo: "Atención de 12 casos", fecha: "2024-06-30", completado: true },
      { id: "h12-4", titulo: "Evaluación y continuidad", fecha: "2024-12-31", completado: false }
    ],
    notas: "Suspendido por reasignación presupuestaria. Se busca retomar en 2025."
  }
];
