import json

orgs = [
    {
        'id': 1, 'nombre': 'Cooperativa de Trabajo La Ribera', 'localizacion': 'Rosario, Santa Fe', 'direccion': 'Av. Belgrano 1200, Rosario',
        'especializacion': 'Reciclaje y Ambiente', 'presupuesto': 8500000, 'convenios': 2, 'talleres': 3,
        'contacto': 'contacto@laribera.org.ar', 'telefono': '341-4123456', 'fechaAlta': '2022-03-10', 'estado': 'Activa',
        'descripcion': 'Cooperativa enfocada en la recolección y reciclaje de materiales urbanos.',
        'coordenadas': {'lat': -32.9468, 'lng': -60.6393}
    },
    {
        'id': 2, 'nombre': 'Asociación Civil Vecinos al Frente', 'localizacion': 'Santa Fe Capital', 'direccion': 'Blvd. Pellegrini 2500, Santa Fe',
        'especializacion': 'Construcción y Hábitat', 'presupuesto': 14200000, 'convenios': 2, 'talleres': 2,
        'contacto': 'vecinos@frente.org', 'telefono': '342-4987654', 'fechaAlta': '2021-06-15', 'estado': 'Activa',
        'descripcion': 'Organización comunitaria para el desarrollo de mejoras habitacionales.',
        'coordenadas': {'lat': -31.6333, 'lng': -60.7000}
    },
    {
        'id': 3, 'nombre': 'Fundación Santa Fe Produce', 'localizacion': 'Rafaela, Santa Fe', 'direccion': 'Av. Lehmann 500, Rafaela',
        'especializacion': 'Producción Alimentaria', 'presupuesto': 9300000, 'convenios': 1, 'talleres': 3,
        'contacto': 'info@santafeproduce.com', 'telefono': '3492-456789', 'fechaAlta': '2023-01-20', 'estado': 'Activa',
        'descripcion': 'Fomento de huertas comunitarias y producción de conservas alimentarias.',
        'coordenadas': {'lat': -31.2526, 'lng': -61.4867}
    },
    {
        'id': 4, 'nombre': 'Cooperativa Textil Esperanza', 'localizacion': 'Reconquista, Santa Fe', 'direccion': 'Patricio Diez 1020, Reconquista',
        'especializacion': 'Textil e Indumentaria', 'presupuesto': 5100000, 'convenios': 1, 'talleres': 2,
        'contacto': 'textilesperanza@gmail.com', 'telefono': '3482-411223', 'fechaAlta': '2023-05-12', 'estado': 'Activa',
        'descripcion': 'Talleres textiles comunitarios para la confección de prendas y uniformes.',
        'coordenadas': {'lat': -29.1412, 'lng': -59.8296}
    },
    {
        'id': 5, 'nombre': 'Club Barrial El Trébol', 'localizacion': 'El Trébol, Santa Fe', 'direccion': 'Rosario 890, El Trébol',
        'especializacion': 'Deporte y Cultura', 'presupuesto': 3500000, 'convenios': 1, 'talleres': 1,
        'contacto': 'clubtrebol@club.org', 'telefono': '3401-455544', 'fechaAlta': '2020-08-30', 'estado': 'Activa',
        'descripcion': 'Club social y deportivo enfocado en la inclusión laboral de jóvenes.',
        'coordenadas': {'lat': -32.2023, 'lng': -61.7011}
    },
    {
        'id': 6, 'nombre': 'Centro Formativo Venado Tuerto', 'localizacion': 'Venado Tuerto, Santa Fe', 'direccion': 'Av. Casey 450, Venado Tuerto',
        'especializacion': 'Metalúrgica y Carpintería', 'presupuesto': 11000000, 'convenios': 2, 'talleres': 2,
        'contacto': 'capacitacion@venadotuerto.org', 'telefono': '3462-422334', 'fechaAlta': '2022-11-05', 'estado': 'Activa',
        'descripcion': 'Capacitación en soldadura, tornería y armado de carpintería metálica.',
        'coordenadas': {'lat': -33.7456, 'lng': -61.9688}
    },
    {
        'id': 7, 'nombre': 'Asociación Agro-Ecológica Santo Tomé', 'localizacion': 'Santo Tomé, Santa Fe', 'direccion': 'Av. Luján 3100, Santo Tomé',
        'especializacion': 'Agricultura Familiar', 'presupuesto': 6800000, 'convenios': 1, 'talleres': 2,
        'contacto': 'agro.santotome@gmail.com', 'telefono': '342-4745890', 'fechaAlta': '2023-03-14', 'estado': 'Activa',
        'descripcion': 'Desarrollo de huertas orgánicas y compostaje domiciliario e institucional.',
        'coordenadas': {'lat': -31.6628, 'lng': -60.7644}
    },
    {
        'id': 8, 'nombre': 'Cooperativa de Servicios Sunchales', 'localizacion': 'Sunchales, Santa Fe', 'direccion': 'Av. Independencia 600, Sunchales',
        'especializacion': 'Tecnología y Economía Circular', 'presupuesto': 12500000, 'convenios': 2, 'talleres': 2,
        'contacto': 'contacto@coopsunchales.com.ar', 'telefono': '3493-421100', 'fechaAlta': '2021-09-18', 'estado': 'Activa',
        'descripcion': 'Recuperación electrónica y cursos de mantenimiento informático.',
        'coordenadas': {'lat': -30.9442, 'lng': -61.5619}
    },
    {
        'id': 9, 'nombre': 'Mutual de Desarrollo Cañada de Gómez', 'localizacion': 'Cañada de Gómez, Santa Fe', 'direccion': 'Lavalle 720, Cañada de Gómez',
        'especializacion': 'Oficios y Capacitación', 'presupuesto': 7400000, 'convenios': 1, 'talleres': 2,
        'contacto': 'mutualcg@gmail.com', 'telefono': '3471-423311', 'fechaAlta': '2022-08-01', 'estado': 'Activa',
        'descripcion': 'Capacitación integral en servicios generales y desarrollo emprendedor.',
        'coordenadas': {'lat': -32.8167, 'lng': -61.3833}
    },
    {
        'id': 10, 'nombre': 'Red de Artesanos Casilda', 'localizacion': 'Casilda, Santa Fe', 'direccion': 'Buenos Aires 1400, Casilda',
        'especializacion': 'Artesanías y Manufactura', 'presupuesto': 4800000, 'convenios': 1, 'talleres': 1,
        'contacto': 'artesanos.casilda@gmail.com', 'telefono': '3464-421990', 'fechaAlta': '2023-04-05', 'estado': 'Activa',
        'descripcion': 'Taller y feria permanente de productos regionales y manufacturas en cuero y cerámica.',
        'coordenadas': {'lat': -33.0442, 'lng': -61.1681}
    }
]

talleres = [
    {'id': 1, 'nombre': 'Reciclaje de Plásticos y Polímeros', 'org_ids': [1, 8], 'cupo': 25, 'inscriptos': 22, 'estado': 'En curso', 'fechaInicio': '2024-01-15', 'fechaFin': '2024-06-15'},
    {'id': 2, 'nombre': 'Clasificación de Metales y Chatarra', 'org_ids': [1, 6], 'cupo': 20, 'inscriptos': 18, 'estado': 'Planificado', 'fechaInicio': '2024-04-01', 'fechaFin': '2024-08-01'},
    {'id': 3, 'nombre': 'Albañilería y Reparaciones del Hábitat', 'org_ids': [2], 'cupo': 30, 'inscriptos': 28, 'estado': 'En curso', 'fechaInicio': '2023-11-01', 'fechaFin': '2024-03-31'},
    {'id': 4, 'nombre': 'Huerta Orgánica Comunitaria', 'org_ids': [3, 7], 'cupo': 30, 'inscriptos': 26, 'estado': 'En curso', 'fechaInicio': '2024-02-10', 'fechaFin': '2024-07-10'},
    {'id': 5, 'nombre': 'Conservas, Envasados y Dulces', 'org_ids': [3], 'cupo': 20, 'inscriptos': 20, 'estado': 'Finalizado', 'fechaInicio': '2023-08-01', 'fechaFin': '2023-12-01'},
    {'id': 6, 'nombre': 'Panificación e Higiene Alimentaria', 'org_ids': [3], 'cupo': 25, 'inscriptos': 22, 'estado': 'En curso', 'fechaInicio': '2024-03-01', 'fechaFin': '2024-09-01'},
    {'id': 7, 'nombre': 'Costura Industrial y Marroquinería', 'org_ids': [4], 'cupo': 20, 'inscriptos': 19, 'estado': 'En curso', 'fechaInicio': '2024-01-20', 'fechaFin': '2024-06-20'},
    {'id': 8, 'nombre': 'Diseño y Confección de Indumentaria', 'org_ids': [4, 5], 'cupo': 20, 'inscriptos': 15, 'estado': 'En curso', 'fechaInicio': '2024-02-15', 'fechaFin': '2024-07-15'},
    {'id': 9, 'nombre': 'Iniciación a la Soldadura Eléctrica', 'org_ids': [6], 'cupo': 15, 'inscriptos': 14, 'estado': 'En curso', 'fechaInicio': '2024-01-10', 'fechaFin': '2024-05-10'},
    {'id': 10, 'nombre': 'Carpintería en Madera Reforestada', 'org_ids': [2, 6], 'cupo': 25, 'inscriptos': 21, 'estado': 'Planificado', 'fechaInicio': '2024-05-01', 'fechaFin': '2024-10-01'},
    {'id': 11, 'nombre': 'Compostaje Urbano e Institucional', 'org_ids': [7, 1], 'cupo': 20, 'inscriptos': 17, 'estado': 'En curso', 'fechaInicio': '2024-03-10', 'fechaFin': '2024-08-10'},
    {'id': 12, 'nombre': 'Reparación de PC y Hardware', 'org_ids': [8], 'cupo': 18, 'inscriptos': 16, 'estado': 'En curso', 'fechaInicio': '2024-02-01', 'fechaFin': '2024-06-30'},
    {'id': 13, 'nombre': 'Instalaciones Eléctricas Domiciliarias', 'org_ids': [9], 'cupo': 20, 'inscriptos': 18, 'estado': 'En curso', 'fechaInicio': '2024-01-15', 'fechaFin': '2024-06-15'},
    {'id': 14, 'nombre': 'Modelado e Impresión 3D', 'org_ids': [8, 9], 'cupo': 15, 'inscriptos': 12, 'estado': 'Planificado', 'fechaInicio': '2024-06-01', 'fechaFin': '2024-11-01'},
    {'id': 15, 'nombre': 'Marroquinería y Calzado Artesanal', 'org_ids': [10, 4], 'cupo': 18, 'inscriptos': 16, 'estado': 'En curso', 'fechaInicio': '2024-02-20', 'fechaFin': '2024-07-20'}
]

# 25 Beneficiarios con variedad de localidades, montos y talleres múltiples
beneficiarios = [
    {'id': 1, 'dni': '28.456.789', 'nombre': 'Carlos Alberto Gómez', 'localizacion': 'Rosario, Santa Fe', 'direccion': 'San Martín 3200, Rosario', 'talleres': [1, 2], 'fechaInicio': '2022-05-12', 'inicioBeca': '2022-05-12', 'presupuestoBeca': 120000, 'ultimoRegistro': '2024-03-01', 'estado': 'Activo', 'alerta': False, 'contacto': 'carlosg@gmail.com', 'telefono': '341-999888'},
    {'id': 2, 'dni': '32.123.456', 'nombre': 'María Laura Silva', 'localizacion': 'Santa Fe Capital', 'direccion': 'Suipacha 1500, Santa Fe', 'talleres': [3, 10], 'fechaInicio': '2021-08-20', 'inicioBeca': '2021-08-20', 'presupuestoBeca': 120000, 'ultimoRegistro': '2023-11-15', 'estado': 'Sin seguimiento', 'alerta': True, 'contacto': 'mlsilva@hotmail.com', 'telefono': '342-444555'},
    {'id': 3, 'dni': '40.987.654', 'nombre': 'Joaquín Martínez', 'localizacion': 'Rafaela, Santa Fe', 'direccion': 'Bv. Santa Fe 900, Rafaela', 'talleres': [4, 5, 6], 'fechaInicio': '2023-01-10', 'inicioBeca': '2023-01-10', 'presupuestoBeca': 150000, 'ultimoRegistro': '2024-03-25', 'estado': 'Activo', 'alerta': False, 'contacto': 'joaquinm@gmail.com', 'telefono': '3492-333222'},
    {'id': 4, 'dni': '25.333.444', 'nombre': 'Susana Beatríz López', 'localizacion': 'Reconquista, Santa Fe', 'direccion': 'Mitre 450, Reconquista', 'talleres': [7, 8], 'fechaInicio': '2023-02-05', 'inicioBeca': '2023-02-05', 'presupuestoBeca': 120000, 'ultimoRegistro': '2024-03-20', 'estado': 'Activo', 'alerta': False, 'contacto': 'susilopez@gmail.com', 'telefono': '3482-111111'},
    {'id': 5, 'dni': '38.555.666', 'nombre': 'Lucas Emanuel Fernández', 'localizacion': 'Rosario, Santa Fe', 'direccion': 'Pellegrini 2200, Rosario', 'talleres': [1, 11], 'fechaInicio': '2023-09-28', 'inicioBeca': '2023-09-28', 'presupuestoBeca': 150000, 'ultimoRegistro': '2023-09-10', 'estado': 'Suspendido', 'alerta': True, 'contacto': 'lucasf@yahoo.com', 'telefono': '341-777666'},
    {'id': 6, 'dni': '31.111.222', 'nombre': 'Ana Paula Giraldi', 'localizacion': 'Santa Fe Capital', 'direccion': 'Urquiza 3100, Santa Fe', 'talleres': [3], 'fechaInicio': '2022-11-05', 'inicioBeca': '2022-11-05', 'presupuestoBeca': 120000, 'ultimoRegistro': '2024-04-10', 'estado': 'Activo', 'alerta': False, 'contacto': 'anapaula@gmail.com', 'telefono': '342-888999'},
    {'id': 7, 'dni': '36.777.888', 'nombre': 'Esteban Gabriel Rossi', 'localizacion': 'Venado Tuerto, Santa Fe', 'direccion': 'Chaco 450, Venado Tuerto', 'talleres': [2, 9], 'fechaInicio': '2023-04-12', 'inicioBeca': '2023-04-12', 'presupuestoBeca': 140000, 'ultimoRegistro': '2024-03-18', 'estado': 'Activo', 'alerta': False, 'contacto': 'erossi@gmail.com', 'telefono': '3462-555123'},
    {'id': 8, 'dni': '39.444.111', 'nombre': 'Florencia Antonella Ríos', 'localizacion': 'Santo Tomé, Santa Fe', 'direccion': '7 de Marzo 1800, Santo Tomé', 'talleres': [4, 11], 'fechaInicio': '2023-06-01', 'inicioBeca': '2023-06-01', 'presupuestoBeca': 130000, 'ultimoRegistro': '2024-04-02', 'estado': 'Activo', 'alerta': False, 'contacto': 'flor.rios@hotmail.com', 'telefono': '342-666333'},
    {'id': 9, 'dni': '29.888.333', 'nombre': 'Gonzalo Javier Peralta', 'localizacion': 'Sunchales, Santa Fe', 'direccion': 'Alem 340, Sunchales', 'talleres': [12, 14], 'fechaInicio': '2022-01-15', 'inicioBeca': '2022-01-15', 'presupuestoBeca': 160000, 'ultimoRegistro': '2024-03-30', 'estado': 'Activo', 'alerta': False, 'contacto': 'gonza.peralta@gmail.com', 'telefono': '3493-456123'},
    {'id': 10, 'dni': '34.222.999', 'nombre': 'Valeria Soledad Domínguez', 'localizacion': 'El Trébol, Santa Fe', 'direccion': 'Córdoba 120, El Trébol', 'talleres': [8], 'fechaInicio': '2023-07-20', 'inicioBeca': '2023-07-20', 'presupuestoBeca': 120000, 'ultimoRegistro': '2024-01-10', 'estado': 'Sin seguimiento', 'alerta': True, 'contacto': 'valedominguez@gmail.com', 'telefono': '3401-444777'},
    {'id': 11, 'dni': '27.654.321', 'nombre': 'Roberto Matías Benítez', 'localizacion': 'Rosario, Santa Fe', 'direccion': 'Córdoba 4500, Rosario', 'talleres': [1, 11], 'fechaInicio': '2022-03-15', 'inicioBeca': '2022-03-15', 'presupuestoBeca': 125000, 'ultimoRegistro': '2024-04-05', 'estado': 'Activo', 'alerta': False, 'contacto': 'rbenitez@gmail.com', 'telefono': '341-456789'},
    {'id': 12, 'dni': '33.987.123', 'nombre': 'Camila Inés Almada', 'localizacion': 'Santa Fe Capital', 'direccion': 'General Paz 5600, Santa Fe', 'talleres': [3, 4], 'fechaInicio': '2023-05-10', 'inicioBeca': '2023-05-10', 'presupuestoBeca': 135000, 'ultimoRegistro': '2024-03-28', 'estado': 'Activo', 'alerta': False, 'contacto': 'cami.almada@yahoo.com.ar', 'telefono': '342-789012'},
    {'id': 13, 'dni': '37.456.987', 'nombre': 'Damián Ezequiel Acosta', 'localizacion': 'Cañada de Gómez, Santa Fe', 'direccion': 'Rivadavia 410, Cañada de Gómez', 'talleres': [13], 'fechaInicio': '2023-09-01', 'inicioBeca': '2023-09-01', 'presupuestoBeca': 140000, 'ultimoRegistro': '2024-04-01', 'estado': 'Activo', 'alerta': False, 'contacto': 'acostadamian@gmail.com', 'telefono': '3471-554433'},
    {'id': 14, 'dni': '35.123.654', 'nombre': 'Nadia Jacqueline Carrizo', 'localizacion': 'Casilda, Santa Fe', 'direccion': 'España 920, Casilda', 'talleres': [15, 7], 'fechaInicio': '2022-10-18', 'inicioBeca': '2022-10-18', 'presupuestoBeca': 130000, 'ultimoRegistro': '2024-03-15', 'estado': 'Activo', 'alerta': False, 'contacto': 'nadia.carrizo@hotmail.com', 'telefono': '3464-667788'},
    {'id': 15, 'dni': '41.234.567', 'nombre': 'Facundo Nicolás Medina', 'localizacion': 'Rafaela, Santa Fe', 'direccion': 'Belgrano 1100, Rafaela', 'talleres': [6], 'fechaInicio': '2023-11-20', 'inicioBeca': '2023-11-20', 'presupuestoBeca': 150000, 'ultimoRegistro': '2024-04-12', 'estado': 'Activo', 'alerta': False, 'contacto': 'facumedina@gmail.com', 'telefono': '3492-998877'},
    {'id': 16, 'dni': '30.876.543', 'nombre': 'Lorena Beatriz Mansilla', 'localizacion': 'Reconquista, Santa Fe', 'direccion': 'Roca 830, Reconquista', 'talleres': [7, 15], 'fechaInicio': '2021-04-05', 'inicioBeca': '2021-04-05', 'presupuestoBeca': 120000, 'ultimoRegistro': '2024-02-28', 'estado': 'Activo', 'alerta': False, 'contacto': 'loremansilla@gmail.com', 'telefono': '3482-332211'},
    {'id': 17, 'dni': '26.543.210', 'nombre': 'Hugo Alberto Maidana', 'localizacion': 'Venado Tuerto, Santa Fe', 'direccion': 'Maipú 670, Venado Tuerto', 'talleres': [9, 10], 'fechaInicio': '2022-07-22', 'inicioBeca': '2022-07-22', 'presupuestoBeca': 145000, 'ultimoRegistro': '2023-12-20', 'estado': 'Sin seguimiento', 'alerta': True, 'contacto': 'hugomaidana@gmail.com', 'telefono': '3462-887766'},
    {'id': 18, 'dni': '42.345.678', 'nombre': 'Sofía Belén Coronel', 'localizacion': 'Rosario, Santa Fe', 'direccion': 'Mendoza 5400, Rosario', 'talleres': [1, 8], 'fechaInicio': '2024-01-08', 'inicioBeca': '2024-01-08', 'presupuestoBeca': 150000, 'ultimoRegistro': '2024-04-08', 'estado': 'Activo', 'alerta': False, 'contacto': 'sofi.coronel@gmail.com', 'telefono': '341-223344'},
    {'id': 19, 'dni': '38.901.234', 'nombre': 'Mariano Iván Leguizamón', 'localizacion': 'Santo Tomé, Santa Fe', 'direccion': 'Alvear 2100, Santo Tomé', 'talleres': [11, 4], 'fechaInicio': '2023-03-30', 'inicioBeca': '2023-03-30', 'presupuestoBeca': 130000, 'ultimoRegistro': '2024-03-22', 'estado': 'Activo', 'alerta': False, 'contacto': 'mleguizamon@yahoo.com', 'telefono': '342-554411'},
    {'id': 20, 'dni': '29.345.678', 'nombre': 'Griselda Noemí Godoy', 'localizacion': 'Sunchales, Santa Fe', 'direccion': 'Zeballos 490, Sunchales', 'talleres': [12, 14], 'fechaInicio': '2022-09-14', 'inicioBeca': '2022-09-14', 'presupuestoBeca': 160000, 'ultimoRegistro': '2024-04-03', 'estado': 'Activo', 'alerta': False, 'contacto': 'ggodoy@gmail.com', 'telefono': '3493-889900'},
    {'id': 21, 'dni': '43.123.890', 'nombre': 'Tomás Ignacio Ocampo', 'localizacion': 'Cañada de Gómez, Santa Fe', 'direccion': 'Ocampo 310, Cañada de Gómez', 'talleres': [13], 'fechaInicio': '2024-02-01', 'inicioBeca': '2024-02-01', 'presupuestoBeca': 140000, 'ultimoRegistro': '2024-04-10', 'estado': 'Activo', 'alerta': False, 'contacto': 'tomasocampo@gmail.com', 'telefono': '3471-112244'},
    {'id': 22, 'dni': '31.567.890', 'nombre': 'Patricia Elizabeth Vivas', 'localizacion': 'Casilda, Santa Fe', 'direccion': 'Dante Alighieri 2200, Casilda', 'talleres': [15], 'fechaInicio': '2022-04-19', 'inicioBeca': '2022-04-19', 'presupuestoBeca': 130000, 'ultimoRegistro': '2023-10-30', 'estado': 'Suspendido', 'alerta': True, 'contacto': 'patrivivas@gmail.com', 'telefono': '3464-334455'},
    {'id': 23, 'dni': '39.876.543', 'nombre': 'Joana Micaela Bustos', 'localizacion': 'Rosario, Santa Fe', 'direccion': 'Arijón 1400, Rosario', 'talleres': [1, 2], 'fechaInicio': '2023-08-11', 'inicioBeca': '2023-08-11', 'presupuestoBeca': 120000, 'ultimoRegistro': '2024-03-29', 'estado': 'Activo', 'alerta': False, 'contacto': 'joanabustos@gmail.com', 'telefono': '341-889900'},
    {'id': 24, 'dni': '33.456.789', 'nombre': 'Leandro David Ferreyra', 'localizacion': 'Santa Fe Capital', 'direccion': 'Aristóbulo del Valle 7200, Santa Fe', 'talleres': [3, 10], 'fechaInicio': '2021-12-01', 'inicioBeca': '2021-12-01', 'presupuestoBeca': 140000, 'ultimoRegistro': '2024-04-09', 'estado': 'Activo', 'alerta': False, 'contacto': 'lferreyra@gmail.com', 'telefono': '342-123987'},
    {'id': 25, 'dni': '36.123.987', 'nombre': 'Brenda Magalí Sosa', 'localizacion': 'El Trébol, Santa Fe', 'direccion': 'Balcarce 650, El Trébol', 'talleres': [8], 'fechaInicio': '2023-10-05', 'inicioBeca': '2023-10-05', 'presupuestoBeca': 120000, 'ultimoRegistro': '2024-03-12', 'estado': 'Activo', 'alerta': False, 'contacto': 'brendasosa@gmail.com', 'telefono': '3401-998877'}
]

convenios = [
    {'id': 'conv-1', 'org_id': 1, 'fechaFirma': '2023-04-10', 'fechaVencimiento': '2025-04-09', 'monto': 3500000, 'estado': 'Activo', 'nombre': 'Convenio Marco Reciclaje RSU - La Ribera'},
    {'id': 'conv-2', 'org_id': 1, 'fechaFirma': '2022-01-15', 'fechaVencimiento': '2023-01-14', 'monto': 2000000, 'estado': 'Finalizado', 'nombre': 'Equipamiento Inicial Planta Reciclaje'},
    {'id': 'conv-3', 'org_id': 2, 'fechaFirma': '2023-01-15', 'fechaVencimiento': '2024-01-14', 'monto': 1800000, 'estado': 'Por vencer', 'nombre': 'Subsidio Hábitat y Mejoras Vivienda'},
    {'id': 'conv-4', 'org_id': 2, 'fechaFirma': '2024-02-01', 'fechaVencimiento': '2026-01-31', 'monto': 4200000, 'estado': 'Activo', 'nombre': 'Convenio Obras Menores 2024 - Vecinos al Frente'},
    {'id': 'conv-5', 'org_id': 3, 'fechaFirma': '2023-09-20', 'fechaVencimiento': '2024-11-19', 'monto': 2500000, 'estado': 'Activo', 'nombre': 'Programa Fomento Agroalimentario - SF Produce'},
    {'id': 'conv-6', 'org_id': 4, 'fechaFirma': '2024-01-10', 'fechaVencimiento': '2025-01-09', 'monto': 3100000, 'estado': 'Activo', 'nombre': 'Fortalecimiento Textil Comunitario Reconquista'},
    {'id': 'conv-7', 'org_id': 6, 'fechaFirma': '2023-06-15', 'fechaVencimiento': '2025-06-14', 'monto': 5000000, 'estado': 'Activo', 'nombre': 'Capacitación Industrial Metalúrgica Venado Tuerto'},
    {'id': 'conv-8', 'org_id': 8, 'fechaFirma': '2023-08-01', 'fechaVencimiento': '2025-07-31', 'monto': 4500000, 'estado': 'Activo', 'nombre': 'Inclusión Digital y RAEE Sunchales'},
    {'id': 'conv-9', 'org_id': 9, 'fechaFirma': '2023-11-01', 'fechaVencimiento': '2024-11-01', 'monto': 2800000, 'estado': 'Activo', 'nombre': 'Capacitación en Servicios Cañada de Gómez'},
    {'id': 'conv-10', 'org_id': 10, 'fechaFirma': '2024-03-01', 'fechaVencimiento': '2025-03-01', 'monto': 2200000, 'estado': 'Activo', 'nombre': 'Fondo de Desarrollo Manufacturero Casilda'}
]

alertas = [
    {'id': 1, 'tipo': 'sin_actualizacion', 'mensaje': 'Beneficiario María Laura Silva (32.123.456) sin registro hace más de 3 meses.', 'fecha': '2024-03-01', 'prioridad': 'alta'},
    {'id': 2, 'tipo': 'convenio_vencimiento', 'mensaje': 'Convenio "Subsidio Hábitat" de Vecinos al Frente próximo a vencer.', 'fecha': '2024-03-05', 'prioridad': 'critica'},
    {'id': 3, 'tipo': 'oportunidad', 'mensaje': 'Nuevo programa "Santa Fe Más" disponible para convocatorias industriales.', 'fecha': '2024-03-10', 'prioridad': 'media'},
    {'id': 4, 'tipo': 'sin_actualizacion', 'mensaje': 'Beneficiario Valeria Domínguez (34.222.999) requiere informe de asistencia.', 'fecha': '2024-03-12', 'prioridad': 'alta'},
    {'id': 5, 'tipo': 'sin_actualizacion', 'mensaje': 'Beneficiario Patricia Vivas (31.567.890) con beca suspendida por inasistencias.', 'fecha': '2024-03-15', 'prioridad': 'alta'}
]

actividadReciente = [
    {'id': 1, 'usuario': 'Tamara G.', 'accion': 'importó 25 beneficiarios', 'modulo': 'Beneficiarios', 'fecha': '2024-03-20', 'avatar': 'TG'},
    {'id': 2, 'usuario': 'Facundo M.', 'accion': 'aprobó el convenio #conv-10', 'modulo': 'Convenios', 'fecha': '2024-03-21', 'avatar': 'FM'},
    {'id': 3, 'usuario': 'Gonzalo R.', 'accion': 'asignó 2 nuevos talleres a Cañada de Gómez', 'modulo': 'Talleres', 'fecha': '2024-03-22', 'avatar': 'GR'}
]

oportunidades = [
  { 'id': 1, 'titulo': 'Licitación Uniformes Salud Santa Fe', 'orgAsignada': 'Cooperativa Textil Esperanza', 'monto': 15000000, 'estado': 'adjudicada', 'fechaCierre': '2024-05-20' },
  { 'id': 2, 'titulo': 'Provisión Mobiliario Escolar Rosario', 'orgAsignada': 'Centro Formativo Venado Tuerto', 'monto': 8500000, 'estado': 'en_evaluacion', 'fechaCierre': '2024-06-15' },
  { 'id': 3, 'titulo': 'Catering Evento Provincial Rafaela', 'orgAsignada': 'Fundación Santa Fe Produce', 'monto': 2000000, 'estado': 'abierta', 'fechaCierre': '2024-07-10' },
  { 'id': 4, 'titulo': 'Recolección RSU Sector Puerto Rosario', 'orgAsignada': 'Cooperativa de Trabajo La Ribera', 'monto': 12000000, 'estado': 'abierta', 'fechaCierre': '2024-08-01' }
]

out = f'''export const organizacionesData = {json.dumps(orgs, indent=2)};
export const beneficiariosData = {json.dumps(beneficiarios, indent=2)};
export const conveniosData = {json.dumps(convenios, indent=2)};
export const talleresData = {json.dumps(talleres, indent=2)};
export const alertas = {json.dumps(alertas, indent=2)};
export const actividadReciente = {json.dumps(actividadReciente, indent=2)};
export const oportunidades = {json.dumps(oportunidades, indent=2)};
export const grafoLinks = [
  {{ source: 1, target: 2, tipo: 'cooperacion' }},
  {{ source: 3, target: 7, tipo: 'red' }},
  {{ source: 4, target: 8, tipo: 'convenio_conjunto' }}
];
'''

with open('src/data/mockData.js', 'w', encoding='utf-8') as f:
    f.write(out)
print('Generated rich 25-beneficiary Santa Fe dataset in mockData.js')
