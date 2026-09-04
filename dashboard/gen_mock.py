import json
import os

# Generar datos reales para el Gobierno de Santa Fe
orgs = [
    {
        'id': 1, 'nombre': 'Cooperativa de Trabajo La Ribera', 'localizacion': 'Rosario, Santa Fe', 'direccion': 'Av. Belgrano 1200, Rosario', 
        'especializacion': 'Reciclaje y Ambiente', 'presupuesto': 8500000, 'convenios': 1, 'talleres': 2,
        'contacto': 'contacto@laribera.org.ar', 'telefono': '341-1234567',
        'fechaAlta': '2022-03-10', 'estado': 'Activa',
        'descripcion': 'Cooperativa enfocada en la recolección y tratamiento de residuos sólidos urbanos en la zona ribereña.',
        'coordenadas': {'lat': -32.9468, 'lng': -60.6393}
    },
    {
        'id': 2, 'nombre': 'Asociación Civil Vecinos al Frente', 'localizacion': 'Santa Fe Capital', 'direccion': 'Blvd. Pellegrini 2500, Santa Fe', 
        'especializacion': 'Construcción y Hábitat', 'presupuesto': 14200000, 'convenios': 2, 'talleres': 1,
        'contacto': 'vecinos@frente.org', 'telefono': '342-9876543',
        'fechaAlta': '2021-06-15', 'estado': 'Activa',
        'descripcion': 'Organización comunitaria para el desarrollo de viviendas sociales.',
        'coordenadas': {'lat': -31.6333, 'lng': -60.7000}
    },
    {
        'id': 3, 'nombre': 'Fundación Santa Fe Produce', 'localizacion': 'Rafaela, Santa Fe', 'direccion': 'Lehmann 500, Rafaela', 
        'especializacion': 'Producción Alimentaria', 'presupuesto': 9300000, 'convenios': 1, 'talleres': 3,
        'contacto': 'info@santafeproduce.com', 'telefono': '3492-456789',
        'fechaAlta': '2023-01-20', 'estado': 'Activa',
        'descripcion': 'Fomento de huertas comunitarias y producción de conservas.',
        'coordenadas': {'lat': -31.2526, 'lng': -61.4867}
    },
    {
        'id': 4, 'nombre': 'Cooperativa Textil Esperanza', 'localizacion': 'Reconquista, Santa Fe', 'direccion': 'Patricio Diez 1020, Reconquista', 
        'especializacion': 'Textil e Indumentaria', 'presupuesto': 5100000, 'convenios': 1, 'talleres': 1,
        'contacto': 'textilesperanza@gmail.com', 'telefono': '3482-112233',
        'fechaAlta': '2023-05-12', 'estado': 'Activa',
        'descripcion': 'Talleres textiles para mujeres en situación de vulnerabilidad.',
        'coordenadas': {'lat': -29.1412, 'lng': -59.8296}
    },
    {
        'id': 5, 'nombre': 'Club barrial El Trébol', 'localizacion': 'El Trébol, Santa Fe', 'direccion': 'Rosario 890, El Trébol', 
        'especializacion': 'Deporte y Cultura', 'presupuesto': 3500000, 'convenios': 0, 'talleres': 1,
        'contacto': 'clubtrebol@club.org', 'telefono': '3401-555444',
        'fechaAlta': '2020-08-30', 'estado': 'Suspendida',
        'descripcion': 'Club de barrio con foco en integración social.',
        'coordenadas': {'lat': -32.2023, 'lng': -61.7011}
    },
]

talleres = [
    {'id': 1, 'nombre': 'Reciclaje de Plásticos', 'org_ids': [1], 'cupo': 20, 'inscriptos': 15, 'estado': 'En curso', 'fechaInicio': '2024-01-15', 'fechaFin': '2024-06-15', 'horario': 'Lun y Mie 15:00'},
    {'id': 2, 'nombre': 'Clasificación de Metales', 'org_ids': [1], 'cupo': 15, 'inscriptos': 12, 'estado': 'Planificado', 'fechaInicio': '2024-04-01', 'fechaFin': '2024-08-01', 'horario': 'Mar y Jue 10:00'},
    {'id': 3, 'nombre': 'Albañilería Básica', 'org_ids': [2], 'cupo': 30, 'inscriptos': 28, 'estado': 'En curso', 'fechaInicio': '2023-11-01', 'fechaFin': '2024-03-31', 'horario': 'Sab 09:00'},
    {'id': 4, 'nombre': 'Huerta Comunitaria Avanzada', 'org_ids': [3], 'cupo': 25, 'inscriptos': 20, 'estado': 'En curso', 'fechaInicio': '2024-02-10', 'fechaFin': '2024-07-10', 'horario': 'Lun 08:00'},
    {'id': 5, 'nombre': 'Conservas y Envasados', 'org_ids': [3], 'cupo': 20, 'inscriptos': 20, 'estado': 'Completado', 'fechaInicio': '2023-08-01', 'fechaFin': '2023-12-01', 'horario': 'Vie 14:00'},
    {'id': 6, 'nombre': 'Panificación Artesanal', 'org_ids': [3], 'cupo': 15, 'inscriptos': 10, 'estado': 'En curso', 'fechaInicio': '2024-03-01', 'fechaFin': '2024-09-01', 'horario': 'Mie 16:00'},
    {'id': 7, 'nombre': 'Costura y Confección', 'org_ids': [4], 'cupo': 20, 'inscriptos': 18, 'estado': 'En curso', 'fechaInicio': '2024-01-20', 'fechaFin': '2024-06-20', 'horario': 'Mar y Jue 17:00'},
    {'id': 8, 'nombre': 'Taller Deportivo', 'org_ids': [5], 'cupo': 50, 'inscriptos': 45, 'estado': 'Suspendido', 'fechaInicio': '2023-10-01', 'fechaFin': '2024-10-01', 'horario': 'Sab 10:00'},
]

beneficiarios = [
    {
        'id': 1, 'dni': '28.456.789', 'nombre': 'Carlos Alberto Gómez', 'localizacion': 'Rosario, Santa Fe', 'direccion': 'San Martín 3200, Rosario',
        'talleres': [1], 'fechaInicio': '2023-05-12', 'inicioBeca': '2023-05-12', 'presupuestoBeca': 120000, 'ultimoRegistro': '2024-03-01', 'estado': 'Activo', 'alerta': False,
        'contacto': 'carlosg@gmail.com', 'telefono': '341-999888',
        'historial': [{'fecha': '2024-03-01', 'accion': 'Asistencia a taller de reciclaje'}]
    },
    {
        'id': 2, 'dni': '32.123.456', 'nombre': 'María Laura Silva', 'localizacion': 'Santa Fe Capital', 'direccion': 'Suipacha 1500, Santa Fe',
        'talleres': [3], 'fechaInicio': '2023-08-20', 'inicioBeca': '2023-08-20', 'presupuestoBeca': 120000, 'ultimoRegistro': '2023-11-15', 'estado': 'Sin seguimiento', 'alerta': True,
        'contacto': 'mlsilva@hotmail.com', 'telefono': '342-444555',
        'historial': [{'fecha': '2023-11-15', 'accion': 'Falta injustificada'}]
    },
    {
        'id': 3, 'dni': '40.987.654', 'nombre': 'Joaquín Martínez', 'localizacion': 'Rafaela, Santa Fe', 'direccion': 'Bv. Santa Fe 900, Rafaela',
        'talleres': [4, 6], 'fechaInicio': '2024-01-10', 'inicioBeca': '2024-01-10', 'presupuestoBeca': 150000, 'ultimoRegistro': '2024-03-25', 'estado': 'Activo', 'alerta': False,
        'contacto': 'joaquinm@gmail.com', 'telefono': '3492-333222',
        'historial': [{'fecha': '2024-03-25', 'accion': 'Participación en feria'}]
    },
    {
        'id': 4, 'dni': '25.333.444', 'nombre': 'Susana Beatríz López', 'localizacion': 'Reconquista, Santa Fe', 'direccion': 'Mitre 450, Reconquista',
        'talleres': [7], 'fechaInicio': '2023-02-05', 'inicioBeca': '2023-02-05', 'presupuestoBeca': 120000, 'ultimoRegistro': '2024-03-20', 'estado': 'Activo', 'alerta': False,
        'contacto': 'susilopez@gmail.com', 'telefono': '3482-111111',
        'historial': [{'fecha': '2024-03-20', 'accion': 'Entrega de materiales textiles'}]
    },
    {
        'id': 5, 'dni': '38.555.666', 'nombre': 'Lucas Emanuel Fernández', 'localizacion': 'Rosario, Santa Fe', 'direccion': 'Pellegrini 2200, Rosario',
        'talleres': [1, 2], 'fechaInicio': '2024-02-28', 'inicioBeca': '2024-02-28', 'presupuestoBeca': 150000, 'ultimoRegistro': '2023-09-10', 'estado': 'Suspendido', 'alerta': True,
        'contacto': 'lucasf@yahoo.com', 'telefono': '341-777666',
        'historial': [{'fecha': '2023-09-10', 'accion': 'Suspensión temporal por inasistencias'}]
    },
    {
        'id': 6, 'dni': '31.111.222', 'nombre': 'Ana Paula Giraldi', 'localizacion': 'Santa Fe Capital', 'direccion': 'Urquiza 3100, Santa Fe',
        'talleres': [3], 'fechaInicio': '2023-11-05', 'inicioBeca': '2023-11-05', 'presupuestoBeca': 120000, 'ultimoRegistro': '2024-04-10', 'estado': 'Activo', 'alerta': False,
        'contacto': 'anapaula@gmail.com', 'telefono': '342-888999',
        'historial': [{'fecha': '2024-04-10', 'accion': 'Evaluación aprobada'}]
    },
]

convenios = [
    {'id': 'conv-1', 'org_id': 1, 'fechaFirma': '2023-04-10', 'fechaVencimiento': '2025-04-09', 'monto': 2500000, 'estado': 'Activo', 'nombre': 'Convenio Marco Medio Ambiente - La Ribera'},
    {'id': 'conv-2', 'org_id': 2, 'fechaFirma': '2023-01-15', 'fechaVencimiento': '2024-01-14', 'monto': 1800000, 'estado': 'Vencido', 'nombre': 'Subsidio Hábitat - Vecinos al Frente'},
    {'id': 'conv-3', 'org_id': 2, 'fechaFirma': '2024-02-01', 'fechaVencimiento': '2026-01-31', 'monto': 4200000, 'estado': 'Activo', 'nombre': 'Convenio Obras Menores 2024 - Vecinos al Frente'},
    {'id': 'conv-4', 'org_id': 3, 'fechaFirma': '2023-09-20', 'fechaVencimiento': '2024-11-19', 'monto': 1500000, 'estado': 'Activo', 'nombre': 'Fomento Productivo - Santa Fe Produce'},
    {'id': 'conv-5', 'org_id': 4, 'fechaFirma': '2024-01-10', 'fechaVencimiento': '2025-01-09', 'monto': 2000000, 'estado': 'Activo', 'nombre': 'Programa Textil Joven - Esperanza'},
]

alertas = [
    {'id': 1, 'tipo': 'sin_actualizacion', 'mensaje': 'Beneficiario María Laura Silva (32.123.456) sin registro hace más de 3 meses.', 'fecha': 'hace 2 horas', 'prioridad': 'alta'},
    {'id': 2, 'tipo': 'convenio_vencimiento', 'mensaje': 'Subsidio Hábitat de Asociación Civil Vecinos al Frente vencido.', 'fecha': 'hace 5 horas', 'prioridad': 'critica'},
    {'id': 3, 'tipo': 'oportunidad', 'mensaje': 'Nuevo programa "Santa Fe Más" disponible para Talleres Textiles.', 'fecha': 'hace 1 día', 'prioridad': 'media'},
]

actividadReciente = [
    {'id': 1, 'usuario': 'Tamara G.', 'accion': 'importó beneficiarios', 'modulo': 'Beneficiarios', 'fecha': 'hace 10 min', 'avatar': 'TG'},
    {'id': 2, 'usuario': 'Facundo M.', 'accion': 'creó un nuevo convenio', 'modulo': 'Convenios', 'fecha': 'hace 1 hora', 'avatar': 'FM'},
]

kpiData = {
    'totalInversion': 31600000, 'variacionInversion': 12.5,
    'beneficiariosActivos': 1250, 'variacionBeneficiarios': 5.2,
    'talleresEnCurso': 45, 'variacionTalleres': -2.1,
    'conveniosActivos': 18, 'variacionConvenios': 8.4
}

topOrganizaciones = [
    {'id': 2, 'nombre': 'Asociación Civil Vecinos al Frente', 'talleres': 1, 'beneficiarios': 112},
    {'id': 1, 'nombre': 'Cooperativa La Ribera', 'talleres': 2, 'beneficiarios': 98},
    {'id': 3, 'nombre': 'Fundación Santa Fe Produce', 'talleres': 3, 'beneficiarios': 76},
    {'id': 4, 'nombre': 'Cooperativa Textil Esperanza', 'talleres': 1, 'beneficiarios': 45},
    {'id': 5, 'nombre': 'Club barrial El Trébol', 'talleres': 1, 'beneficiarios': 30},
]

evolucionOrgsData = [
    {'mes': 'Ene', 'organizaciones': 10}, {'mes': 'Feb', 'organizaciones': 12},
    {'mes': 'Mar', 'organizaciones': 15}, {'mes': 'Abr', 'organizaciones': 18},
    {'mes': 'May', 'organizaciones': 22}, {'mes': 'Jun', 'organizaciones': 25}
]

presupuestoData = [
    {'categoria': 'Reciclaje', 'valor': 35}, {'categoria': 'Textil', 'valor': 25},
    {'categoria': 'Construcción', 'valor': 20}, {'categoria': 'Alimentos', 'valor': 15},
    {'categoria': 'Deporte', 'valor': 5}
]

grafoNodos = [
    {'id': 'org-1', 'group': 1, 'label': 'La Ribera', 'val': 20},
    {'id': 'org-2', 'group': 1, 'label': 'Vecinos al Frente', 'val': 30},
    {'id': 'tal-1', 'group': 2, 'label': 'Reciclaje', 'val': 10},
    {'id': 'tal-3', 'group': 2, 'label': 'Albañilería', 'val': 15},
    {'id': 'ben-1', 'group': 3, 'label': 'Carlos Gómez', 'val': 5},
    {'id': 'ben-2', 'group': 3, 'label': 'María Silva', 'val': 5}
]

grafoLinks = [
    {'source': 'org-1', 'target': 'tal-1'},
    {'source': 'org-2', 'target': 'tal-3'},
    {'source': 'tal-1', 'target': 'ben-1'},
    {'source': 'tal-3', 'target': 'ben-2'}
]

oportunidades = [
  { 'id': 1, 'titulo': 'Licitación Ministerio Educación Santa Fe', 'orgAsignada': 'Cooperativa Textil Esperanza', 'monto': 15000000, 'estado': 'adjudicada', 'fechaCierre': '2024-05-20' },
  { 'id': 2, 'titulo': 'Provisión Mobiliario Municipal Rosario', 'orgAsignada': 'Cooperativa La Ribera', 'monto': 8500000, 'estado': 'en_evaluacion', 'fechaCierre': '2024-06-15' },
  { 'id': 3, 'titulo': 'Catering Evento Gubernamental SF', 'orgAsignada': 'Fundación Santa Fe Produce', 'monto': 2000000, 'estado': 'abierta', 'fechaCierre': '2024-07-10' }
]

out = f'''export const organizacionesData = {json.dumps(orgs, indent=2)};
export const beneficiariosData = {json.dumps(beneficiarios, indent=2)};
export const conveniosData = {json.dumps(convenios, indent=2)};
export const talleresData = {json.dumps(talleres, indent=2)};
export const alertas = {json.dumps(alertas, indent=2)};
export const actividadReciente = {json.dumps(actividadReciente, indent=2)};
export const kpiData = {json.dumps(kpiData, indent=2)};
export const topOrganizaciones = {json.dumps(topOrganizaciones, indent=2)};
export const evolucionOrgsData = {json.dumps(evolucionOrgsData, indent=2)};
export const presupuestoData = {json.dumps(presupuestoData, indent=2)};
export const grafoNodos = {json.dumps(grafoNodos, indent=2)};
export const grafoLinks = {json.dumps(grafoLinks, indent=2)};
export const oportunidades = {json.dumps(oportunidades, indent=2)};
'''

with open('src/data/mockData.js', 'w', encoding='utf-8') as f:
    f.write(out)
print('Generated new mock data tailored to Santa Fe')
