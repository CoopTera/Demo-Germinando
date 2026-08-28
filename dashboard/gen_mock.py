import json
import random

# Fixed lists
ciudades = ["Rosario, Santa Fe", "Santa Fe Capital", "Rafaela, Santa Fe", "Reconquista, Santa Fe", "Venado Tuerto, Santa Fe", "Esperanza, Santa Fe"]
especialidades = ["Textil e Indumentaria", "Producción Alimentaria", "Construcción y Hábitat", "Agricultura Familiar", "Artesanías y Manufactura", "Reciclado y Economía Circular", "Servicios y Logística", "Capacitación y Formación"]

orgs = [
  {"id": 1, "nombre": "Cooperativa Manos Solidarias", "localizacion": "Rosario, Santa Fe", "especializacion": "Textil e Indumentaria"},
  {"id": 2, "nombre": "Asociación Raíces del Norte", "localizacion": "Reconquista, Santa Fe", "especializacion": "Producción Alimentaria"},
  {"id": 3, "nombre": "Cooperativa Trabajo Digno", "localizacion": "Santa Fe Capital", "especializacion": "Construcción y Hábitat"},
  {"id": 4, "nombre": "Fundación Sembrando Futuro", "localizacion": "Rafaela, Santa Fe", "especializacion": "Agricultura Familiar"},
  {"id": 5, "nombre": "Asociación Manos Unidas", "localizacion": "Venado Tuerto, Santa Fe", "especializacion": "Artesanías y Manufactura"},
  {"id": 6, "nombre": "Cooperativa Sol Naciente", "localizacion": "Rosario, Santa Fe", "especializacion": "Reciclado y Economía Circular"},
  {"id": 7, "nombre": "Taller Textil Esperanza", "localizacion": "Esperanza, Santa Fe", "especializacion": "Textil e Indumentaria"},
  {"id": 8, "nombre": "Asociación Tierra Fértil", "localizacion": "Santa Fe Capital", "especializacion": "Agricultura Familiar"},
  {"id": 9, "nombre": "Cooperativa Nuevo Horizonte", "localizacion": "Rosario, Santa Fe", "especializacion": "Servicios y Logística"},
  {"id": 10, "nombre": "Fundación Puente Social", "localizacion": "Rafaela, Santa Fe", "especializacion": "Capacitación y Formación"},
  {"id": 11, "nombre": "Asociación Construyendo", "localizacion": "Reconquista, Santa Fe", "especializacion": "Construcción y Hábitat"},
  {"id": 12, "nombre": "Cooperativa Sabores Nuestros", "localizacion": "Venado Tuerto, Santa Fe", "especializacion": "Producción Alimentaria"}
]

# 8 Convenios
convenios = [
  {"id": "conv-1", "org_id": 1, "nombre": "Convenio Semilla 2024", "fechaFirma": "2024-01-15", "fechaVencimiento": "2026-09-10", "monto": 1500000, "estado": "Activo"},
  {"id": "conv-2", "org_id": 2, "nombre": "Apoyo Maquinaria", "fechaFirma": "2024-03-20", "fechaVencimiento": "2026-12-01", "monto": 2000000, "estado": "Activo"},
  {"id": "conv-3", "org_id": 3, "nombre": "Fondo Construir", "fechaFirma": "2025-05-10", "fechaVencimiento": "2027-05-10", "monto": 3500000, "estado": "Activo"},
  {"id": "conv-4", "org_id": 4, "nombre": "Impulso Agro", "fechaFirma": "2024-02-10", "fechaVencimiento": "2026-09-02", "monto": 1200000, "estado": "Activo"},
  {"id": "conv-5", "org_id": 6, "nombre": "Programa Reciclar", "fechaFirma": "2024-08-15", "fechaVencimiento": "2026-08-30", "monto": 800000, "estado": "Por vencer"},
  {"id": "conv-6", "org_id": 8, "nombre": "Huertas Comunitarias", "fechaFirma": "2023-11-20", "fechaVencimiento": "2026-11-20", "monto": 1700000, "estado": "Activo"},
  {"id": "conv-7", "org_id": 1, "nombre": "Ampliación Textil", "fechaFirma": "2025-01-10", "fechaVencimiento": "2027-01-10", "monto": 2500000, "estado": "En revisión"},
  {"id": "conv-8", "org_id": 3, "nombre": "Capacitación Oficios", "fechaFirma": "2025-06-01", "fechaVencimiento": "2028-06-01", "monto": 4200000, "estado": "Activo"}
]

# 10 Talleres
talleres = [
  {"id": "tall-1", "org_id": 1, "nombre": "Taller de Costura Avanzada", "cupo": 30, "inscriptos": 25, "estado": "En curso"},
  {"id": "tall-2", "org_id": 1, "nombre": "Taller de Moldería", "cupo": 20, "inscriptos": 20, "estado": "En curso"},
  {"id": "tall-3", "org_id": 2, "nombre": "Manipulación de Alimentos", "cupo": 50, "inscriptos": 48, "estado": "En curso"},
  {"id": "tall-4", "org_id": 3, "nombre": "Albañilería Básica", "cupo": 40, "inscriptos": 35, "estado": "En curso"},
  {"id": "tall-5", "org_id": 4, "nombre": "Cultivo Orgánico", "cupo": 25, "inscriptos": 12, "estado": "Abierto"},
  {"id": "tall-6", "org_id": 6, "nombre": "Gestión de Residuos", "cupo": 30, "inscriptos": 0, "estado": "Abierto"},
  {"id": "tall-7", "org_id": 7, "nombre": "Corte y Confección", "cupo": 20, "inscriptos": 18, "estado": "En curso"},
  {"id": "tall-8", "org_id": 8, "nombre": "Sistemas de Riego", "cupo": 25, "inscriptos": 25, "estado": "En curso"},
  {"id": "tall-9", "org_id": 10, "nombre": "Formación de Formadores", "cupo": 15, "inscriptos": 15, "estado": "Finalizado"},
  {"id": "tall-10", "org_id": 12, "nombre": "Cocina Saludable", "cupo": 30, "inscriptos": 28, "estado": "En curso"}
]

# Calc derived fields for Orgs
for o in orgs:
    o_convs = [c for c in convenios if c["org_id"] == o["id"]]
    o_talls = [t for t in talleres if t["org_id"] == o["id"]]
    o["convenios"] = len(o_convs)
    o["talleres"] = len(o_talls)
    o["presupuesto"] = sum([c["monto"] for c in o_convs])
    bens = sum([t["inscriptos"] for t in o_talls])
    o["beneficiarios"] = bens if bens > 0 else random.randint(5, 15)

# Generate 35 beneficiaries
beneficiarios = []
nombres_base = ["María", "Juan", "Pedro", "Ana", "Lucía", "Carlos", "Roberto", "Laura", "Sofía", "Diego", "Martina", "Alejandro", "Valentina", "Marta", "Jorge"]
apellidos = ["Gómez", "López", "Ruiz", "Díaz", "Fernández", "Pérez", "González", "Romero", "Sosa", "Torres", "Álvarez", "García", "Rodríguez", "Sánchez"]
for i in range(1, 36):
    org = random.choice(orgs)
    nombre_completo = f"{random.choice(nombres_base)} {random.choice(apellidos)}"
    estado = random.choice(["Activo", "Activo", "Activo", "Activo", "Suspendido", "Egresado"])
    fecha_inicio = f"{random.randint(2022, 2025)}-{random.randint(1, 12):02d}-{random.randint(1, 28):02d}"
    beneficiarios.append({
        "id": i,
        "dni": f"{random.randint(20, 45)}.{random.randint(100, 999)}.{random.randint(100, 999)}",
        "nombre": nombre_completo,
        "programas": org["nombre"],
        "inicioBeca": fecha_inicio,
        "estado": estado,
        "asistencia": f"{random.randint(70, 100)}%"
    })

oportunidades = [
    {"id": 1, "titulo": "Licitación Indumentaria Trabajo", "organizador": "Min. de Desarrollo Social", "fecha": "Vence en 5 días", "categoria": "licitacion"},
    {"id": 2, "titulo": "Fondo Semilla Emprendedor", "organizador": "Secretaría de Industria", "fecha": "Abre mañana", "categoria": "fondo"},
    {"id": 3, "titulo": "Capacitación Tecnológica", "organizador": "Programa Nodos", "fecha": "Cupos disponibles", "categoria": "capacitacion"},
    {"id": 4, "titulo": "Compra Pública: Alimentos", "organizador": "Ministerio de Educación", "fecha": "Vence en 2 días", "categoria": "compra"},
    {"id": 5, "titulo": "Subsidio Maquinaria Pesada", "organizador": "Secretaría de Producción", "fecha": "Próxima semana", "categoria": "fondo"},
    {"id": 6, "titulo": "Feria de Emprendedores", "organizador": "Municipalidad de Rosario", "fecha": "En 15 días", "categoria": "default"}
]

js = f"""// Datos mock realistas para la demo del Dashboard Germinando

export const kpiData = {{
  beneficiarios: {{
    total: 3500,
    variacion: 12.3,
    periodo: "vs. mes anterior",
    tendencia: "positiva",
  }},
  convenios: {{
    total: {len(convenios)},
    variacion: 5.9,
    periodo: "vs. mes anterior",
    tendencia: "positiva",
  }},
  unidadesProductivas: {{
    total: {len(orgs)},
    variacion: -2.1,
    periodo: "vs. mes anterior",
    tendencia: "negativa",
  }},
  talleres: {{
    total: {len(talleres)},
    variacion: 8.4,
    periodo: "vs. mes anterior",
    tendencia: "positiva",
  }},
}};

export const alertas = [
  {{ id: 1, tipo: "convenio_vencimiento", icono: "calendar", mensaje: "Convenio #2024-089 — Asoc. Manos Unidas vence en 15 días", fecha: "2026-09-10", prioridad: "critica" }},
  {{ id: 2, tipo: "oportunidad", icono: "tag", mensaje: "Compra Pública: Alimentos", fecha: "2026-08-26", prioridad: "alta" }},
  {{ id: 3, tipo: "sin_actualizacion", icono: "clock", mensaje: "Taller Gestión de Residuos sin inscriptos", fecha: "2026-08-25", prioridad: "media" }}
];

export const topOrganizaciones = {json.dumps(orgs[:5], indent=2, ensure_ascii=False)};
export const organizacionesData = {json.dumps(orgs, indent=2, ensure_ascii=False)};
export const beneficiariosData = {json.dumps(beneficiarios, indent=2, ensure_ascii=False)};
export const oportunidades = {json.dumps(oportunidades, indent=2, ensure_ascii=False)};
export const conveniosData = {json.dumps(convenios, indent=2, ensure_ascii=False)};
export const talleresData = {json.dumps(talleres, indent=2, ensure_ascii=False)};

export const actividadReciente = [
  {{ id: 1, usuario: "Dir. García", accion: "aprobó el presupuesto para", entidad: "Cooperativa Trabajo Digno", fecha: "Hoy, 10:30 hs", avatar: "DG", tipo: "organizacion", entidadId: 3 }},
  {{ id: 2, usuario: "Sistema", accion: "generó el reporte mensual de", entidad: "Beneficiarios Norte", fecha: "Hoy, 08:15 hs", avatar: "S", tipo: null, entidadId: null }},
  {{ id: 3, usuario: "Ana López", accion: "registró nuevo taller en", entidad: "Asociación Raíces del Norte", fecha: "Ayer, 16:45 hs", avatar: "AL", tipo: "organizacion", entidadId: 2 }},
  {{ id: 4, usuario: "Carlos Ruiz", accion: "actualizó el padrón de", entidad: "Fundación Sembrando Futuro", fecha: "Ayer, 14:20 hs", avatar: "CR", tipo: "organizacion", entidadId: 4 }},
  {{ id: 5, usuario: "Dir. García", accion: "firmó el convenio con", entidad: "Cooperativa Trabajo Digno", fecha: "Hace 2 días", avatar: "DG", tipo: "convenio", entidadId: "conv-3" }},
  {{ id: 6, usuario: "Ana López", accion: "registró seguimiento para", entidad: "{beneficiarios[0]['nombre']}", fecha: "Hace 2 días", avatar: "AL", tipo: "beneficiario", entidadId: {beneficiarios[0]['id']} }},
  {{ id: 7, usuario: "Carlos Ruiz", accion: "inscribió beneficiario en", entidad: "Taller de Costura Avanzada", fecha: "Hace 3 días", avatar: "CR", tipo: "taller", entidadId: "tall-1" }},
  {{ id: 8, usuario: "Sistema", accion: "detectó convenio próximo a vencer:", entidad: "Convenio Semilla 2024", fecha: "Hace 4 días", avatar: "S", tipo: "convenio", entidadId: "conv-1" }},
  {{ id: 9, usuario: "Dir. García", accion: "aprobó ingreso de", entidad: "{beneficiarios[1]['nombre']}", fecha: "Hace 5 días", avatar: "DG", tipo: "beneficiario", entidadId: {beneficiarios[1]['id']} }},
  {{ id: 10, usuario: "Ana López", accion: "actualizó datos de", entidad: "Cooperativa Manos Solidarias", fecha: "Hace 6 días", avatar: "AL", tipo: "organizacion", entidadId: 1 }},
];

export const presupuestoData = [
  {{ periodo: "Ene 2025", ejecutado: 4200000, asignado: 5000000 }},
  {{ periodo: "Feb 2025", ejecutado: 4500000, asignado: 5000000 }},
  {{ periodo: "Mar 2025", ejecutado: 5100000, asignado: 5500000 }},
  {{ periodo: "Abr 2025", ejecutado: 5300000, asignado: 5500000 }},
  {{ periodo: "May 2025", ejecutado: 5800000, asignado: 6000000 }},
  {{ periodo: "Jun 2025", ejecutado: 6200000, asignado: 6500000 }},
  {{ periodo: "Jul 2025", ejecutado: 6700000, asignado: 7000000 }},
  {{ periodo: "Ago 2025", ejecutado: 7100000, asignado: 7500000 }},
  {{ periodo: "Sep 2025", ejecutado: 7600000, asignado: 8000000 }},
  {{ periodo: "Oct 2025", ejecutado: 8200000, asignado: 8500000 }},
  {{ periodo: "Nov 2025", ejecutado: 8900000, asignado: 9000000 }},
  {{ periodo: "Dic 2025", ejecutado: 9500000, asignado: 9500000 }},
];

export const evolucionOrgsData = [
  {{ periodo: "Jul 2025", organizaciones: 12, beneficiarios: 1540 }},
  {{ periodo: "Ago 2025", organizaciones: 12, beneficiarios: 1820 }},
  {{ periodo: "Sep 2025", organizaciones: 14, beneficiarios: 2100 }},
  {{ periodo: "Oct 2025", organizaciones: 15, beneficiarios: 2350 }},
  {{ periodo: "Nov 2025", organizaciones: 17, beneficiarios: 2500 }},
  {{ periodo: "Dic 2025", organizaciones: 18, beneficiarios: 2847 }}
];

export const grafoNodos = {json.dumps(orgs, indent=2, ensure_ascii=False)};
export const grafoLinks = [
  {{ source: 1, target: 7, tipo: "colaboracion", fuerza: 2 }},
  {{ source: 3, target: 11, tipo: "dependencia", fuerza: 3 }},
  {{ source: 2, target: 12, tipo: "colaboracion", fuerza: 1 }},
  {{ source: 4, target: 8, tipo: "colaboracion", fuerza: 2 }}
];
"""

with open("src/data/mockData.js", "w", encoding="utf-8") as f:
    f.write(js)
