# -*- coding: utf-8 -*-
import json
import random
from datetime import datetime, timedelta

def get_random_date(start_year, end_year):
    start_date = datetime(start_year, 1, 1)
    end_date = datetime(end_year, 12, 31)
    delta = end_date - start_date
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = random.randrange(int_delta)
    return (start_date + timedelta(seconds=random_second)).strftime('%Y-%m-%d')

nombres = ['Valentina', 'Facundo', 'Milagros', 'Santiago', 'Camila', 'Mateo', 'Martina', 'Luciano', 'Sofía', 'Joaquín', 'Florencia', 'Bautista', 'Agustina', 'Tomás', 'Lucía', 'Nicolás', 'Micaela', 'Federico', 'Julieta', 'Gastón']
apellidos = ['Rossi', 'Quiroga', 'Tevez', 'García', 'Fernández', 'González', 'Rodríguez', 'López', 'Martínez', 'Pérez', 'Gómez', 'Sánchez', 'Díaz', 'Álvarez', 'Romero', 'Sosa', 'Ruiz', 'Torres', 'Suárez', 'Castro']
localidades = ['Rosario, Santa Fe', 'Córdoba Capital, Cba', 'La Plata, PBA', 'Resistencia, Chaco', 'San Miguel de Tucumán', 'Salta Capital', 'Neuquén, NQN', 'Mar del Plata, PBA', 'Mendoza Capital', 'Paraná, Entre Ríos']
especializaciones = ['Textil e Indumentaria', 'Alimentaria y Gastronomía', 'Construcción', 'Reciclaje y Ambiente', 'Carpintería', 'Tecnología', 'Agricultura Familiar']

orgs = []
talleres = []
convenios = []
beneficiarios = []

for i in range(1, 15):
    orgs.append({
        'id': i,
        'nombre': random.choice(['Cooperativa', 'Asociación Civil', 'Fundación']) + ' ' + random.choice(['El Ceibo', 'Unión y Progreso', 'La Semilla', 'Manos a la Obra', 'Futuro Mejor', 'Raíces', 'Sol Naciente', 'Nuevo Horizonte', 'Tierra Fértil', 'Construyendo', 'Esperanza', 'Trabajo Digno', 'Puente Social']),
        'localizacion': random.choice(localidades),
        'especializacion': random.choice(especializaciones),
        'presupuesto': random.randint(100, 900) * 10000,
        'convenios': 0,
        'talleres': 0,
        'beneficiarios': 0
    })

for i in range(1, 20):
    org = random.choice(orgs)
    talleres.append({
        'id': 'tall-' + str(i),
        'nombre': 'Taller de ' + random.choice(['Costura', 'Moldería', 'Panadería', 'Huerta', 'Albañilería', 'Electricidad', 'Gestión de Residuos', 'Alfabetización Digital', 'Herrería', 'Economía Social']),
        'cupo': random.choice([15, 20, 25, 30, 40]),
        'inscriptos': 0,
        'estado': random.choice(['Abierto', 'En curso', 'En curso', 'Finalizado']),
        'org_ids': [org['id']]
    })
    org['talleres'] += 1

for i in range(1, 10):
    org = random.choice(orgs)
    fecha_firma = get_random_date(2023, 2024)
    vencimiento_base = datetime.strptime(fecha_firma, '%Y-%m-%d') + timedelta(days=random.choice([365, 730]))
    vencimiento = vencimiento_base.strftime('%Y-%m-%d')
    days_left = (vencimiento_base - datetime.now()).days
    if days_left < 0:
        estado = 'Vencido'
    elif days_left < 30:
        estado = 'Por vencer'
    else:
        estado = 'Activo'

    convenios.append({
        'id': 'conv-' + str(i),
        'org_id': org['id'],
        'fechaFirma': fecha_firma,
        'fechaVencimiento': vencimiento,
        'monto': random.randint(100, 500) * 10000,
        'estado': estado,
        'nombre': 'Convenio Marco ' + str(2023+i) + ' - ' + org['nombre']
    })
    org['convenios'] += 1

for i in range(1, 150):
    nombre_completo = random.choice(nombres) + ' ' + random.choice(apellidos)
    estado = random.choices(['Activo', 'Suspendido', 'Egresado'], weights=[80, 10, 10])[0]
    
    taller_inscriptos = []
    if estado == 'Activo':
        talleres_disponibles = [t for t in talleres if t['estado'] in ['Abierto', 'En curso'] and t['inscriptos'] < t['cupo']]
        if talleres_disponibles:
            num = random.choice([0, 1, 1, 2])
            elegidos = random.sample(talleres_disponibles, min(num, len(talleres_disponibles)))
            for t in elegidos:
                t['inscriptos'] += 1
                taller_inscriptos.append(t['id'])
    
    org_set = set()
    for t_id in taller_inscriptos:
        t = next((t for t in talleres if t['id'] == t_id), None)
        if t:
            for o_id in t['org_ids']:
                org_set.add(o_id)
    for o_id in org_set:
        org = next((o for o in orgs if o['id'] == o_id), None)
        if org:
            org['beneficiarios'] += 1

    alerta = random.random() < 0.05
    beneficiarios.append({
        'id': i,
        'dni': str(random.randint(20000000, 45000000)),
        'nombre': nombre_completo,
        'programas': '', 
        'inicioBeca': get_random_date(2022, 2025),
        'presupuestoBeca': random.randint(10, 30) * 10000,
        'ultimoRegistro': get_random_date(2026, 2026) if not alerta else get_random_date(2025, 2025),
        'estado': estado,
        'asistencia': str(random.randint(60, 100)) + '%',
        'talleres': taller_inscriptos,
        'alerta': alerta
    })

alertas = []
por_vencer = [c for c in convenios if c['estado'] == 'Por vencer']
if por_vencer:
    alertas.append({ 'id': 1, 'tipo': 'convenio_vencimiento', 'icono': 'calendar', 'mensaje': f'El {por_vencer[0]["nombre"]} vence pronto.', 'fecha': por_vencer[0]['fechaVencimiento'], 'prioridad': 'critica' })

vacios = [t for t in talleres if t['inscriptos'] == 0]
if vacios:
    alertas.append({ 'id': 2, 'tipo': 'sin_actualizacion', 'icono': 'clock', 'mensaje': f'El {vacios[0]["nombre"]} no tiene inscriptos activos.', 'fecha': datetime.now().strftime('%Y-%m-%d'), 'prioridad': 'media' })

alertas.append({ 'id': 3, 'tipo': 'oportunidad', 'icono': 'tag', 'mensaje': 'Nueva Licitación Pública: Ropa de Trabajo (PBA)', 'fecha': datetime.now().strftime('%Y-%m-%d'), 'prioridad': 'alta' })

out = '''export const kpiData = {
  beneficiarios: { total: 3500, variacion: 12.3, periodo: 'vs. mes anterior', tendencia: 'positiva' },
  convenios: { total: 8, variacion: 5.9, periodo: 'vs. mes anterior', tendencia: 'positiva' },
  unidadesProductivas: { total: 12, variacion: -2.1, periodo: 'vs. mes anterior', tendencia: 'negativa' },
  talleres: { total: 10, variacion: 8.4, periodo: 'vs. mes anterior', tendencia: 'positiva' }
};

export const alertas = ''' + json.dumps(alertas, indent=2) + ''';

export const organizacionesData = ''' + json.dumps(orgs, indent=2) + ''';

export const beneficiariosData = ''' + json.dumps(beneficiarios, indent=2) + ''';

export const conveniosData = ''' + json.dumps(convenios, indent=2) + ''';

export const talleresData = ''' + json.dumps(talleres, indent=2) + ''';

export const oportunidades = ''' + json.dumps([
  {
    "id": 1,
    "titulo": "Compra Pública: Uniformes de Trabajo",
    "organizador": "Ministerio de Desarrollo, Provincia de Santa Fe",
    "fecha": "2026-09-15",
    "estado": "Abierta",
    "tipo": "Licitaciones",
    "monto": "$ 12.500.000"
  },
  {
    "id": 2,
    "titulo": "Fondo Semilla Emprendedores Rurales",
    "organizador": "Banco Interamericano de Desarrollo",
    "fecha": "2026-10-01",
    "estado": "Próxima",
    "tipo": "Fondos",
    "monto": "Hasta $ 5.000.000 por proyecto"
  },
  {
    "id": 3,
    "titulo": "Capacitación: Gestión Administrativa para Cooperativas",
    "organizador": "Universidad Nacional de Rosario (UNR)",
    "fecha": "2026-08-30",
    "estado": "Cerrada",
    "tipo": "Capacitaciones",
    "monto": "-"
  }
], indent=2) + ''';

export const topOrganizaciones = organizacionesData.slice(0, 5);

export const evolucionOrgsData = [
  { mes: 'Ene', activas: 20, en_proceso: 5, capacitacion: 3 },
  { mes: 'Feb', activas: 22, en_proceso: 6, capacitacion: 4 },
  { mes: 'Mar', activas: 25, en_proceso: 4, capacitacion: 5 },
  { mes: 'Abr', activas: 28, en_proceso: 5, capacitacion: 5 },
  { mes: 'May', activas: 30, en_proceso: 7, capacitacion: 6 },
  { mes: 'Jun', activas: 35, en_proceso: 5, capacitacion: 4 }
];

export const presupuestoData = [
  { name: 'Ejecutado', value: 65, fill: 'var(--primario)' },
  { name: 'Comprometido', value: 20, fill: 'var(--pizarra)' },
  { name: 'Disponible', value: 15, fill: 'var(--superficie-sec)' }
];

export const grafoNodos = [
  { id: '1', name: 'Germinando', group: 1, val: 20 },
  ...organizacionesData.map(o => ({ id: \org-\\, name: o.nombre, group: 2, val: o.beneficiarios / 5 + 5 })),
  ...talleresData.map(t => ({ id: \	all-\\, name: t.nombre, group: 3, val: 5 }))
];

export const grafoLinks = [
  ...organizacionesData.map(o => ({ source: '1', target: \org-\\, value: 1 })),
  ...talleresData.flatMap(t => t.org_ids.map(oid => ({ source: \org-\\, target: \	all-\\, value: 1 })))
];
'''

with open('src/data/mockData.js', 'w', encoding='utf-8') as f:
    f.write(out)

print('Generated mockData.js successfully')
