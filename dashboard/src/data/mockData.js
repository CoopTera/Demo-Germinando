// Datos mock realistas para la demo del Dashboard Germinando

export const kpiData = {
  beneficiarios: {
    total: 3500,
    variacion: 12.3,
    periodo: "vs. mes anterior",
    tendencia: "positiva",
  },
  convenios: {
    total: 8,
    variacion: 5.9,
    periodo: "vs. mes anterior",
    tendencia: "positiva",
  },
  unidadesProductivas: {
    total: 12,
    variacion: -2.1,
    periodo: "vs. mes anterior",
    tendencia: "negativa",
  },
  talleres: {
    total: 10,
    variacion: 8.4,
    periodo: "vs. mes anterior",
    tendencia: "positiva",
  },
};

export const alertas = [
  { id: 1, tipo: "convenio_vencimiento", icono: "calendar", mensaje: "Convenio #2024-089 — Asoc. Manos Unidas vence en 15 días", fecha: "2026-09-10", prioridad: "critica" },
  { id: 2, tipo: "oportunidad", icono: "tag", mensaje: "Compra Pública: Alimentos", fecha: "2026-08-26", prioridad: "alta" },
  { id: 3, tipo: "sin_actualizacion", icono: "clock", mensaje: "Taller Gestión de Residuos sin inscriptos", fecha: "2026-08-25", prioridad: "media" }
];

export const topOrganizaciones = [
  {
    "id": 1,
    "nombre": "Cooperativa Manos Solidarias",
    "localizacion": "Rosario, Santa Fe",
    "especializacion": "Textil e Indumentaria",
    "convenios": 2,
    "talleres": 2,
    "presupuesto": 4000000,
    "beneficiarios": 45
  },
  {
    "id": 2,
    "nombre": "Asociación Raíces del Norte",
    "localizacion": "Reconquista, Santa Fe",
    "especializacion": "Producción Alimentaria",
    "convenios": 1,
    "talleres": 1,
    "presupuesto": 2000000,
    "beneficiarios": 48
  },
  {
    "id": 3,
    "nombre": "Cooperativa Trabajo Digno",
    "localizacion": "Santa Fe Capital",
    "especializacion": "Construcción y Hábitat",
    "convenios": 2,
    "talleres": 1,
    "presupuesto": 7700000,
    "beneficiarios": 35
  },
  {
    "id": 4,
    "nombre": "Fundación Sembrando Futuro",
    "localizacion": "Rafaela, Santa Fe",
    "especializacion": "Agricultura Familiar",
    "convenios": 1,
    "talleres": 1,
    "presupuesto": 1200000,
    "beneficiarios": 12
  },
  {
    "id": 5,
    "nombre": "Asociación Manos Unidas",
    "localizacion": "Venado Tuerto, Santa Fe",
    "especializacion": "Artesanías y Manufactura",
    "convenios": 0,
    "talleres": 0,
    "presupuesto": 0,
    "beneficiarios": 6
  }
];
export const organizacionesData = [
  {
    "id": 1,
    "nombre": "Cooperativa Manos Solidarias",
    "localizacion": "Rosario, Santa Fe",
    "especializacion": "Textil e Indumentaria",
    "convenios": 2,
    "talleres": 2,
    "presupuesto": 4000000,
    "beneficiarios": 45
  },
  {
    "id": 2,
    "nombre": "Asociación Raíces del Norte",
    "localizacion": "Reconquista, Santa Fe",
    "especializacion": "Producción Alimentaria",
    "convenios": 1,
    "talleres": 1,
    "presupuesto": 2000000,
    "beneficiarios": 48
  },
  {
    "id": 3,
    "nombre": "Cooperativa Trabajo Digno",
    "localizacion": "Santa Fe Capital",
    "especializacion": "Construcción y Hábitat",
    "convenios": 2,
    "talleres": 1,
    "presupuesto": 7700000,
    "beneficiarios": 35
  },
  {
    "id": 4,
    "nombre": "Fundación Sembrando Futuro",
    "localizacion": "Rafaela, Santa Fe",
    "especializacion": "Agricultura Familiar",
    "convenios": 1,
    "talleres": 1,
    "presupuesto": 1200000,
    "beneficiarios": 12
  },
  {
    "id": 5,
    "nombre": "Asociación Manos Unidas",
    "localizacion": "Venado Tuerto, Santa Fe",
    "especializacion": "Artesanías y Manufactura",
    "convenios": 0,
    "talleres": 0,
    "presupuesto": 0,
    "beneficiarios": 6
  },
  {
    "id": 6,
    "nombre": "Cooperativa Sol Naciente",
    "localizacion": "Rosario, Santa Fe",
    "especializacion": "Reciclado y Economía Circular",
    "convenios": 1,
    "talleres": 1,
    "presupuesto": 800000,
    "beneficiarios": 15
  },
  {
    "id": 7,
    "nombre": "Taller Textil Esperanza",
    "localizacion": "Esperanza, Santa Fe",
    "especializacion": "Textil e Indumentaria",
    "convenios": 0,
    "talleres": 1,
    "presupuesto": 0,
    "beneficiarios": 18
  },
  {
    "id": 8,
    "nombre": "Asociación Tierra Fértil",
    "localizacion": "Santa Fe Capital",
    "especializacion": "Agricultura Familiar",
    "convenios": 1,
    "talleres": 1,
    "presupuesto": 1700000,
    "beneficiarios": 25
  },
  {
    "id": 9,
    "nombre": "Cooperativa Nuevo Horizonte",
    "localizacion": "Rosario, Santa Fe",
    "especializacion": "Servicios y Logística",
    "convenios": 0,
    "talleres": 0,
    "presupuesto": 0,
    "beneficiarios": 8
  },
  {
    "id": 10,
    "nombre": "Fundación Puente Social",
    "localizacion": "Rafaela, Santa Fe",
    "especializacion": "Capacitación y Formación",
    "convenios": 0,
    "talleres": 1,
    "presupuesto": 0,
    "beneficiarios": 15
  },
  {
    "id": 11,
    "nombre": "Asociación Construyendo",
    "localizacion": "Reconquista, Santa Fe",
    "especializacion": "Construcción y Hábitat",
    "convenios": 0,
    "talleres": 0,
    "presupuesto": 0,
    "beneficiarios": 12
  },
  {
    "id": 12,
    "nombre": "Cooperativa Sabores Nuestros",
    "localizacion": "Venado Tuerto, Santa Fe",
    "especializacion": "Producción Alimentaria",
    "convenios": 0,
    "talleres": 1,
    "presupuesto": 0,
    "beneficiarios": 28
  }
];
export const beneficiariosData = [
  {
    "id": 1,
    "dni": "20.433.858",
    "nombre": "Juan López",
    "programas": "Asociación Raíces del Norte",
    "inicioBeca": "2022-01-22",
    "estado": "Egresado",
    "asistencia": "92%"
  },
  {
    "id": 2,
    "dni": "25.295.178",
    "nombre": "Carlos Sánchez",
    "programas": "Cooperativa Sol Naciente",
    "inicioBeca": "2022-11-04",
    "estado": "Activo",
    "asistencia": "76%"
  },
  {
    "id": 3,
    "dni": "23.114.961",
    "nombre": "Diego Ruiz",
    "programas": "Cooperativa Trabajo Digno",
    "inicioBeca": "2024-12-03",
    "estado": "Activo",
    "asistencia": "78%"
  },
  {
    "id": 4,
    "dni": "25.906.937",
    "nombre": "Juan Torres",
    "programas": "Taller Textil Esperanza",
    "inicioBeca": "2025-08-22",
    "estado": "Activo",
    "asistencia": "85%"
  },
  {
    "id": 5,
    "dni": "36.614.962",
    "nombre": "Juan Torres",
    "programas": "Asociación Tierra Fértil",
    "inicioBeca": "2025-11-27",
    "estado": "Activo",
    "asistencia": "81%"
  },
  {
    "id": 6,
    "dni": "41.618.354",
    "nombre": "Carlos Pérez",
    "programas": "Asociación Raíces del Norte",
    "inicioBeca": "2023-03-11",
    "estado": "Suspendido",
    "asistencia": "91%"
  },
  {
    "id": 7,
    "dni": "43.224.576",
    "nombre": "Roberto García",
    "programas": "Cooperativa Manos Solidarias",
    "inicioBeca": "2023-11-03",
    "estado": "Suspendido",
    "asistencia": "85%"
  },
  {
    "id": 8,
    "dni": "25.827.759",
    "nombre": "Juan Gómez",
    "programas": "Cooperativa Nuevo Horizonte",
    "inicioBeca": "2023-08-16",
    "estado": "Activo",
    "asistencia": "74%"
  },
  {
    "id": 9,
    "dni": "32.201.437",
    "nombre": "Diego López",
    "programas": "Asociación Construyendo",
    "inicioBeca": "2025-11-12",
    "estado": "Activo",
    "asistencia": "70%"
  },
  {
    "id": 10,
    "dni": "23.472.535",
    "nombre": "Diego Torres",
    "programas": "Cooperativa Trabajo Digno",
    "inicioBeca": "2025-05-25",
    "estado": "Activo",
    "asistencia": "77%"
  },
  {
    "id": 11,
    "dni": "27.789.997",
    "nombre": "Carlos García",
    "programas": "Cooperativa Nuevo Horizonte",
    "inicioBeca": "2024-07-16",
    "estado": "Activo",
    "asistencia": "81%"
  },
  {
    "id": 12,
    "dni": "42.473.590",
    "nombre": "Juan García",
    "programas": "Fundación Puente Social",
    "inicioBeca": "2024-05-17",
    "estado": "Egresado",
    "asistencia": "93%"
  },
  {
    "id": 13,
    "dni": "33.855.999",
    "nombre": "Marta González",
    "programas": "Asociación Raíces del Norte",
    "inicioBeca": "2024-03-19",
    "estado": "Activo",
    "asistencia": "74%"
  },
  {
    "id": 14,
    "dni": "33.328.687",
    "nombre": "Laura Torres",
    "programas": "Cooperativa Nuevo Horizonte",
    "inicioBeca": "2024-06-14",
    "estado": "Activo",
    "asistencia": "89%"
  },
  {
    "id": 15,
    "dni": "35.690.857",
    "nombre": "Martina Díaz",
    "programas": "Fundación Puente Social",
    "inicioBeca": "2025-07-18",
    "estado": "Activo",
    "asistencia": "77%"
  },
  {
    "id": 16,
    "dni": "28.184.205",
    "nombre": "Laura Díaz",
    "programas": "Cooperativa Sabores Nuestros",
    "inicioBeca": "2022-11-25",
    "estado": "Activo",
    "asistencia": "72%"
  },
  {
    "id": 17,
    "dni": "42.145.954",
    "nombre": "Pedro Gómez",
    "programas": "Cooperativa Nuevo Horizonte",
    "inicioBeca": "2024-11-16",
    "estado": "Suspendido",
    "asistencia": "76%"
  },
  {
    "id": 18,
    "dni": "40.143.489",
    "nombre": "Diego Sánchez",
    "programas": "Asociación Manos Unidas",
    "inicioBeca": "2022-05-27",
    "estado": "Activo",
    "asistencia": "96%"
  },
  {
    "id": 19,
    "dni": "41.672.869",
    "nombre": "Juan Torres",
    "programas": "Fundación Sembrando Futuro",
    "inicioBeca": "2025-02-20",
    "estado": "Activo",
    "asistencia": "76%"
  },
  {
    "id": 20,
    "dni": "22.102.396",
    "nombre": "Laura Pérez",
    "programas": "Asociación Tierra Fértil",
    "inicioBeca": "2022-11-07",
    "estado": "Activo",
    "asistencia": "72%"
  },
  {
    "id": 21,
    "dni": "40.492.560",
    "nombre": "Jorge Sánchez",
    "programas": "Asociación Manos Unidas",
    "inicioBeca": "2023-08-03",
    "estado": "Activo",
    "asistencia": "79%"
  },
  {
    "id": 22,
    "dni": "45.540.914",
    "nombre": "Laura Torres",
    "programas": "Asociación Construyendo",
    "inicioBeca": "2025-06-02",
    "estado": "Activo",
    "asistencia": "92%"
  },
  {
    "id": 23,
    "dni": "35.546.811",
    "nombre": "Carlos Fernández",
    "programas": "Asociación Raíces del Norte",
    "inicioBeca": "2025-09-27",
    "estado": "Activo",
    "asistencia": "76%"
  },
  {
    "id": 24,
    "dni": "27.184.458",
    "nombre": "Pedro Sosa",
    "programas": "Asociación Raíces del Norte",
    "inicioBeca": "2024-03-06",
    "estado": "Activo",
    "asistencia": "98%"
  },
  {
    "id": 25,
    "dni": "21.870.890",
    "nombre": "Pedro Rodríguez",
    "programas": "Cooperativa Manos Solidarias",
    "inicioBeca": "2023-10-05",
    "estado": "Activo",
    "asistencia": "70%"
  },
  {
    "id": 26,
    "dni": "32.728.757",
    "nombre": "Alejandro Sánchez",
    "programas": "Fundación Puente Social",
    "inicioBeca": "2025-06-20",
    "estado": "Egresado",
    "asistencia": "90%"
  },
  {
    "id": 27,
    "dni": "22.296.827",
    "nombre": "María Pérez",
    "programas": "Asociación Raíces del Norte",
    "inicioBeca": "2025-12-28",
    "estado": "Suspendido",
    "asistencia": "72%"
  },
  {
    "id": 28,
    "dni": "36.906.944",
    "nombre": "Jorge Romero",
    "programas": "Cooperativa Trabajo Digno",
    "inicioBeca": "2023-11-26",
    "estado": "Activo",
    "asistencia": "90%"
  },
  {
    "id": 29,
    "dni": "23.860.704",
    "nombre": "Diego Álvarez",
    "programas": "Asociación Manos Unidas",
    "inicioBeca": "2022-02-26",
    "estado": "Egresado",
    "asistencia": "74%"
  },
  {
    "id": 30,
    "dni": "32.561.557",
    "nombre": "Roberto Sánchez",
    "programas": "Cooperativa Trabajo Digno",
    "inicioBeca": "2024-11-20",
    "estado": "Activo",
    "asistencia": "76%"
  },
  {
    "id": 31,
    "dni": "42.875.631",
    "nombre": "Alejandro Álvarez",
    "programas": "Cooperativa Manos Solidarias",
    "inicioBeca": "2024-04-26",
    "estado": "Activo",
    "asistencia": "93%"
  },
  {
    "id": 32,
    "dni": "22.783.665",
    "nombre": "Martina López",
    "programas": "Fundación Sembrando Futuro",
    "inicioBeca": "2023-12-28",
    "estado": "Egresado",
    "asistencia": "74%"
  },
  {
    "id": 33,
    "dni": "42.392.100",
    "nombre": "Lucía Pérez",
    "programas": "Cooperativa Nuevo Horizonte",
    "inicioBeca": "2024-07-16",
    "estado": "Activo",
    "asistencia": "95%"
  },
  {
    "id": 34,
    "dni": "38.877.429",
    "nombre": "Marta Romero",
    "programas": "Cooperativa Nuevo Horizonte",
    "inicioBeca": "2023-11-22",
    "estado": "Activo",
    "asistencia": "77%"
  },
  {
    "id": 35,
    "dni": "25.923.138",
    "nombre": "Ana Gómez",
    "programas": "Taller Textil Esperanza",
    "inicioBeca": "2023-07-01",
    "estado": "Activo",
    "asistencia": "89%"
  }
];
export const oportunidades = [
  {
    "id": 1,
    "titulo": "Licitación Indumentaria Trabajo",
    "organizador": "Min. de Desarrollo Social",
    "fecha": "Vence en 5 días",
    "categoria": "licitacion"
  },
  {
    "id": 2,
    "titulo": "Fondo Semilla Emprendedor",
    "organizador": "Secretaría de Industria",
    "fecha": "Abre mañana",
    "categoria": "fondo"
  },
  {
    "id": 3,
    "titulo": "Capacitación Tecnológica",
    "organizador": "Programa Nodos",
    "fecha": "Cupos disponibles",
    "categoria": "capacitacion"
  },
  {
    "id": 4,
    "titulo": "Compra Pública: Alimentos",
    "organizador": "Ministerio de Educación",
    "fecha": "Vence en 2 días",
    "categoria": "compra"
  },
  {
    "id": 5,
    "titulo": "Subsidio Maquinaria Pesada",
    "organizador": "Secretaría de Producción",
    "fecha": "Próxima semana",
    "categoria": "fondo"
  },
  {
    "id": 6,
    "titulo": "Feria de Emprendedores",
    "organizador": "Municipalidad de Rosario",
    "fecha": "En 15 días",
    "categoria": "default"
  }
];
export const conveniosData = [
  {
    "id": "conv-1",
    "org_id": 1,
    "nombre": "Convenio Semilla 2024",
    "fechaFirma": "2024-01-15",
    "fechaVencimiento": "2026-09-10",
    "monto": 1500000,
    "estado": "Activo"
  },
  {
    "id": "conv-2",
    "org_id": 2,
    "nombre": "Apoyo Maquinaria",
    "fechaFirma": "2024-03-20",
    "fechaVencimiento": "2026-12-01",
    "monto": 2000000,
    "estado": "Activo"
  },
  {
    "id": "conv-3",
    "org_id": 3,
    "nombre": "Fondo Construir",
    "fechaFirma": "2025-05-10",
    "fechaVencimiento": "2027-05-10",
    "monto": 3500000,
    "estado": "Activo"
  },
  {
    "id": "conv-4",
    "org_id": 4,
    "nombre": "Impulso Agro",
    "fechaFirma": "2024-02-10",
    "fechaVencimiento": "2026-09-02",
    "monto": 1200000,
    "estado": "Activo"
  },
  {
    "id": "conv-5",
    "org_id": 6,
    "nombre": "Programa Reciclar",
    "fechaFirma": "2024-08-15",
    "fechaVencimiento": "2026-08-30",
    "monto": 800000,
    "estado": "Por vencer"
  },
  {
    "id": "conv-6",
    "org_id": 8,
    "nombre": "Huertas Comunitarias",
    "fechaFirma": "2023-11-20",
    "fechaVencimiento": "2026-11-20",
    "monto": 1700000,
    "estado": "Activo"
  },
  {
    "id": "conv-7",
    "org_id": 1,
    "nombre": "Ampliación Textil",
    "fechaFirma": "2025-01-10",
    "fechaVencimiento": "2027-01-10",
    "monto": 2500000,
    "estado": "En revisión"
  },
  {
    "id": "conv-8",
    "org_id": 3,
    "nombre": "Capacitación Oficios",
    "fechaFirma": "2025-06-01",
    "fechaVencimiento": "2028-06-01",
    "monto": 4200000,
    "estado": "Activo"
  }
];
export const talleresData = [
  {
    "id": "tall-1",
    "org_id": 1,
    "nombre": "Taller de Costura Avanzada",
    "cupo": 30,
    "inscriptos": 25,
    "estado": "En curso"
  },
  {
    "id": "tall-2",
    "org_id": 1,
    "nombre": "Taller de Moldería",
    "cupo": 20,
    "inscriptos": 20,
    "estado": "En curso"
  },
  {
    "id": "tall-3",
    "org_id": 2,
    "nombre": "Manipulación de Alimentos",
    "cupo": 50,
    "inscriptos": 48,
    "estado": "En curso"
  },
  {
    "id": "tall-4",
    "org_id": 3,
    "nombre": "Albañilería Básica",
    "cupo": 40,
    "inscriptos": 35,
    "estado": "En curso"
  },
  {
    "id": "tall-5",
    "org_id": 4,
    "nombre": "Cultivo Orgánico",
    "cupo": 25,
    "inscriptos": 12,
    "estado": "Abierto"
  },
  {
    "id": "tall-6",
    "org_id": 6,
    "nombre": "Gestión de Residuos",
    "cupo": 30,
    "inscriptos": 0,
    "estado": "Abierto"
  },
  {
    "id": "tall-7",
    "org_id": 7,
    "nombre": "Corte y Confección",
    "cupo": 20,
    "inscriptos": 18,
    "estado": "En curso"
  },
  {
    "id": "tall-8",
    "org_id": 8,
    "nombre": "Sistemas de Riego",
    "cupo": 25,
    "inscriptos": 25,
    "estado": "En curso"
  },
  {
    "id": "tall-9",
    "org_id": 10,
    "nombre": "Formación de Formadores",
    "cupo": 15,
    "inscriptos": 15,
    "estado": "Finalizado"
  },
  {
    "id": "tall-10",
    "org_id": 12,
    "nombre": "Cocina Saludable",
    "cupo": 30,
    "inscriptos": 28,
    "estado": "En curso"
  }
];

export const actividadReciente = [
  { id: 1, usuario: "Dir. García", accion: "aprobó el presupuesto para", entidad: "Cooperativa Trabajo Digno", fecha: "Hoy, 10:30 hs", avatar: "DG", tipo: "organizacion", entidadId: 3 },
  { id: 2, usuario: "Sistema", accion: "generó el reporte mensual de", entidad: "Beneficiarios Norte", fecha: "Hoy, 08:15 hs", avatar: "S", tipo: null, entidadId: null },
  { id: 3, usuario: "Ana López", accion: "registró nuevo taller en", entidad: "Asociación Raíces del Norte", fecha: "Ayer, 16:45 hs", avatar: "AL", tipo: "organizacion", entidadId: 2 },
  { id: 4, usuario: "Carlos Ruiz", accion: "actualizó el padrón de", entidad: "Fundación Sembrando Futuro", fecha: "Ayer, 14:20 hs", avatar: "CR", tipo: "organizacion", entidadId: 4 },
  { id: 5, usuario: "Dir. García", accion: "firmó el convenio con", entidad: "Cooperativa Trabajo Digno", fecha: "Hace 2 días", avatar: "DG", tipo: "convenio", entidadId: "conv-3" },
  { id: 6, usuario: "Ana López", accion: "registró seguimiento para", entidad: "Juan López", fecha: "Hace 2 días", avatar: "AL", tipo: "beneficiario", entidadId: 1 },
  { id: 7, usuario: "Carlos Ruiz", accion: "inscribió beneficiario en", entidad: "Taller de Costura Avanzada", fecha: "Hace 3 días", avatar: "CR", tipo: "taller", entidadId: "tall-1" },
  { id: 8, usuario: "Sistema", accion: "detectó convenio próximo a vencer:", entidad: "Convenio Semilla 2024", fecha: "Hace 4 días", avatar: "S", tipo: "convenio", entidadId: "conv-1" },
  { id: 9, usuario: "Dir. García", accion: "aprobó ingreso de", entidad: "Carlos Sánchez", fecha: "Hace 5 días", avatar: "DG", tipo: "beneficiario", entidadId: 2 },
  { id: 10, usuario: "Ana López", accion: "actualizó datos de", entidad: "Cooperativa Manos Solidarias", fecha: "Hace 6 días", avatar: "AL", tipo: "organizacion", entidadId: 1 },
];

export const presupuestoData = [
  { periodo: "Ene 2025", ejecutado: 4200000, asignado: 5000000 },
  { periodo: "Feb 2025", ejecutado: 4500000, asignado: 5000000 },
  { periodo: "Mar 2025", ejecutado: 5100000, asignado: 5500000 },
  { periodo: "Abr 2025", ejecutado: 5300000, asignado: 5500000 },
  { periodo: "May 2025", ejecutado: 5800000, asignado: 6000000 },
  { periodo: "Jun 2025", ejecutado: 6200000, asignado: 6500000 },
  { periodo: "Jul 2025", ejecutado: 6700000, asignado: 7000000 },
  { periodo: "Ago 2025", ejecutado: 7100000, asignado: 7500000 },
  { periodo: "Sep 2025", ejecutado: 7600000, asignado: 8000000 },
  { periodo: "Oct 2025", ejecutado: 8200000, asignado: 8500000 },
  { periodo: "Nov 2025", ejecutado: 8900000, asignado: 9000000 },
  { periodo: "Dic 2025", ejecutado: 9500000, asignado: 9500000 },
];

export const evolucionOrgsData = [
  { periodo: "Jul 2025", organizaciones: 12, beneficiarios: 1540 },
  { periodo: "Ago 2025", organizaciones: 12, beneficiarios: 1820 },
  { periodo: "Sep 2025", organizaciones: 14, beneficiarios: 2100 },
  { periodo: "Oct 2025", organizaciones: 15, beneficiarios: 2350 },
  { periodo: "Nov 2025", organizaciones: 17, beneficiarios: 2500 },
  { periodo: "Dic 2025", organizaciones: 18, beneficiarios: 2847 }
];

export const grafoNodos = [
  {
    "id": 1,
    "nombre": "Cooperativa Manos Solidarias",
    "localizacion": "Rosario, Santa Fe",
    "especializacion": "Textil e Indumentaria",
    "convenios": 2,
    "talleres": 2,
    "presupuesto": 4000000,
    "beneficiarios": 45
  },
  {
    "id": 2,
    "nombre": "Asociación Raíces del Norte",
    "localizacion": "Reconquista, Santa Fe",
    "especializacion": "Producción Alimentaria",
    "convenios": 1,
    "talleres": 1,
    "presupuesto": 2000000,
    "beneficiarios": 48
  },
  {
    "id": 3,
    "nombre": "Cooperativa Trabajo Digno",
    "localizacion": "Santa Fe Capital",
    "especializacion": "Construcción y Hábitat",
    "convenios": 2,
    "talleres": 1,
    "presupuesto": 7700000,
    "beneficiarios": 35
  },
  {
    "id": 4,
    "nombre": "Fundación Sembrando Futuro",
    "localizacion": "Rafaela, Santa Fe",
    "especializacion": "Agricultura Familiar",
    "convenios": 1,
    "talleres": 1,
    "presupuesto": 1200000,
    "beneficiarios": 12
  },
  {
    "id": 5,
    "nombre": "Asociación Manos Unidas",
    "localizacion": "Venado Tuerto, Santa Fe",
    "especializacion": "Artesanías y Manufactura",
    "convenios": 0,
    "talleres": 0,
    "presupuesto": 0,
    "beneficiarios": 6
  },
  {
    "id": 6,
    "nombre": "Cooperativa Sol Naciente",
    "localizacion": "Rosario, Santa Fe",
    "especializacion": "Reciclado y Economía Circular",
    "convenios": 1,
    "talleres": 1,
    "presupuesto": 800000,
    "beneficiarios": 15
  },
  {
    "id": 7,
    "nombre": "Taller Textil Esperanza",
    "localizacion": "Esperanza, Santa Fe",
    "especializacion": "Textil e Indumentaria",
    "convenios": 0,
    "talleres": 1,
    "presupuesto": 0,
    "beneficiarios": 18
  },
  {
    "id": 8,
    "nombre": "Asociación Tierra Fértil",
    "localizacion": "Santa Fe Capital",
    "especializacion": "Agricultura Familiar",
    "convenios": 1,
    "talleres": 1,
    "presupuesto": 1700000,
    "beneficiarios": 25
  },
  {
    "id": 9,
    "nombre": "Cooperativa Nuevo Horizonte",
    "localizacion": "Rosario, Santa Fe",
    "especializacion": "Servicios y Logística",
    "convenios": 0,
    "talleres": 0,
    "presupuesto": 0,
    "beneficiarios": 8
  },
  {
    "id": 10,
    "nombre": "Fundación Puente Social",
    "localizacion": "Rafaela, Santa Fe",
    "especializacion": "Capacitación y Formación",
    "convenios": 0,
    "talleres": 1,
    "presupuesto": 0,
    "beneficiarios": 15
  },
  {
    "id": 11,
    "nombre": "Asociación Construyendo",
    "localizacion": "Reconquista, Santa Fe",
    "especializacion": "Construcción y Hábitat",
    "convenios": 0,
    "talleres": 0,
    "presupuesto": 0,
    "beneficiarios": 12
  },
  {
    "id": 12,
    "nombre": "Cooperativa Sabores Nuestros",
    "localizacion": "Venado Tuerto, Santa Fe",
    "especializacion": "Producción Alimentaria",
    "convenios": 0,
    "talleres": 1,
    "presupuesto": 0,
    "beneficiarios": 28
  }
];
export const grafoLinks = [
  { source: 1, target: 7, tipo: "colaboracion", fuerza: 2 },
  { source: 3, target: 11, tipo: "dependencia", fuerza: 3 },
  { source: 2, target: 12, tipo: "colaboracion", fuerza: 1 },
  { source: 4, target: 8, tipo: "colaboracion", fuerza: 2 }
];
