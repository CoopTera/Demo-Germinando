import pandas as pd
import os

os.makedirs('demo_files', exist_ok=True)

# 1. Padrón Beneficiarios completo
df_ben = pd.DataFrame([
    {'DNI': '28.456.789', 'Nombre': 'Carlos Alberto Gómez', 'Localización': 'Rosario, Santa Fe', 'Dirección': 'San Martín 3200, Rosario', 'Fecha Inicio': '2022-05-12', 'Beca Mensual': 120000, 'Último Registro': '2024-03-01', 'Estado': 'Activo'},
    {'DNI': '32.123.456', 'Nombre': 'María Laura Silva', 'Localización': 'Santa Fe Capital', 'Dirección': 'Suipacha 1500, Santa Fe', 'Fecha Inicio': '2021-08-20', 'Beca Mensual': 120000, 'Último Registro': '2023-11-15', 'Estado': 'Sin seguimiento'},
    {'DNI': '40.987.654', 'Nombre': 'Joaquín Martínez', 'Localización': 'Rafaela, Santa Fe', 'Dirección': 'Bv. Santa Fe 900, Rafaela', 'Fecha Inicio': '2023-01-10', 'Beca Mensual': 150000, 'Último Registro': '2024-03-25', 'Estado': 'Activo'},
    {'DNI': '25.333.444', 'Nombre': 'Susana Beatríz López', 'Localización': 'Reconquista, Santa Fe', 'Dirección': 'Mitre 450, Reconquista', 'Fecha Inicio': '2023-02-05', 'Beca Mensual': 120000, 'Último Registro': '2024-03-20', 'Estado': 'Activo'},
    {'DNI': '27.654.321', 'Nombre': 'Roberto Matías Benítez', 'Localización': 'Rosario, Santa Fe', 'Dirección': 'Córdoba 4500, Rosario', 'Fecha Inicio': '2022-03-15', 'Beca Mensual': 125000, 'Último Registro': '2024-04-05', 'Estado': 'Activo'}
])
df_ben.to_excel('demo_files/Padron_Beneficiarios.xlsx', index=False)

# 2. Organizaciones completo
df_org = pd.DataFrame([
    {'Nombre': 'Cooperativa de Trabajo La Ribera', 'Localización': 'Rosario, Santa Fe', 'Dirección': 'Av. Belgrano 1200, Rosario', 'Especialización': 'Reciclaje y Ambiente', 'Convenios': 2, 'Talleres': 3, 'Beneficiarios': 5, 'Presupuesto': 8500000},
    {'Nombre': 'Asociación Civil Vecinos al Frente', 'Localización': 'Santa Fe Capital', 'Dirección': 'Blvd. Pellegrini 2500, Santa Fe', 'Especialización': 'Construcción y Hábitat', 'Convenios': 2, 'Talleres': 2, 'Beneficiarios': 4, 'Presupuesto': 14200000},
    {'Nombre': 'Fundación Santa Fe Produce', 'Localización': 'Rafaela, Santa Fe', 'Dirección': 'Av. Lehmann 500, Rafaela', 'Especialización': 'Producción Alimentaria', 'Convenios': 1, 'Talleres': 3, 'Beneficiarios': 3, 'Presupuesto': 9300000}
])
df_org.to_excel('demo_files/Organizaciones_Import.xlsx', index=False)

# 3. Convenios completo
df_conv = pd.DataFrame([
    {'Convenio': 'Convenio Marco Reciclaje RSU - La Ribera', 'Organización': 'Cooperativa de Trabajo La Ribera', 'Firma': '2023-04-10', 'Vencimiento': '2025-04-09', 'Monto': 3500000, 'Estado': 'Activo'},
    {'Convenio': 'Convenio Obras Menores 2024 - Vecinos al Frente', 'Organización': 'Asociación Civil Vecinos al Frente', 'Firma': '2024-02-01', 'Vencimiento': '2026-01-31', 'Monto': 4200000, 'Estado': 'Activo'}
])
df_conv.to_excel('demo_files/Convenios_Import.xlsx', index=False)

# 4. Talleres completo
df_tal = pd.DataFrame([
    {'Taller': 'Reciclaje de Plásticos y Polímeros', 'Organización': 'Cooperativa de Trabajo La Ribera', 'Inscriptos': 22, 'Cupo': 25, 'Fecha Inicio': '2024-01-15', 'Fecha Cierre': '2024-06-15', 'Estado': 'En curso'},
    {'Taller': 'Albañilería y Reparaciones del Hábitat', 'Organización': 'Asociación Civil Vecinos al Frente', 'Inscriptos': 28, 'Cupo': 30, 'Fecha Inicio': '2023-11-01', 'Fecha Cierre': '2024-03-31', 'Estado': 'En curso'}
])
df_tal.to_excel('demo_files/Talleres_Import.xlsx', index=False)

print('Excel files regenerated with complete fields and Beneficiarios column!')
