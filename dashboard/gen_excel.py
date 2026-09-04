import pandas as pd
import os

os.makedirs('demo_files', exist_ok=True)

# 1. Padrón Beneficiarios
df_ben = pd.DataFrame([
    {'DNI': '28.456.789', 'Nombre': 'Carlos Alberto Gómez', 'Localización': 'Rosario, Santa Fe', 'Dirección': 'San Martín 3200, Rosario', 'Fecha Inicio': '2023-05-12', 'Beca Mensual': 120000, 'Último Registro': '2024-03-01', 'Estado': 'Activo'},
    {'DNI': '32.123.456', 'Nombre': 'María Laura Silva', 'Localización': 'Santa Fe Capital', 'Dirección': 'Suipacha 1500, Santa Fe', 'Fecha Inicio': '2023-08-20', 'Beca Mensual': 120000, 'Último Registro': '2023-11-15', 'Estado': 'Sin seguimiento'},
    {'DNI': '40.987.654', 'Nombre': 'Joaquín Martínez', 'Localización': 'Rafaela, Santa Fe', 'Dirección': 'Bv. Santa Fe 900, Rafaela', 'Fecha Inicio': '2024-01-10', 'Beca Mensual': 150000, 'Último Registro': '2024-03-25', 'Estado': 'Activo'}
])
df_ben.to_excel('demo_files/Padron_Beneficiarios.xlsx', index=False)

# 2. Organizaciones
df_org = pd.DataFrame([
    {'Nombre': 'Cooperativa de Trabajo La Ribera', 'Localización': 'Rosario, Santa Fe', 'Dirección': 'Av. Belgrano 1200, Rosario', 'Especialización': 'Reciclaje y Ambiente', 'Presupuesto': 8500000, 'Convenios': 1, 'Talleres': 2},
    {'Nombre': 'Asociación Civil Vecinos al Frente', 'Localización': 'Santa Fe Capital', 'Dirección': 'Blvd. Pellegrini 2500, Santa Fe', 'Especialización': 'Construcción y Hábitat', 'Presupuesto': 14200000, 'Convenios': 2, 'Talleres': 1}
])
df_org.to_excel('demo_files/Organizaciones_Import.xlsx', index=False)

# 3. Convenios
df_conv = pd.DataFrame([
    {'Convenio': 'Convenio Marco Medio Ambiente - La Ribera', 'Organización': 'Cooperativa de Trabajo La Ribera', 'Monto': 2500000, 'Firma': '2023-04-10', 'Vencimiento': '2025-04-09', 'Estado': 'Activo'}
])
df_conv.to_excel('demo_files/Convenios_Import.xlsx', index=False)

# 4. Talleres
df_tal = pd.DataFrame([
    {'Taller': 'Reciclaje de Plásticos', 'Organización': 'Cooperativa de Trabajo La Ribera', 'Cupo': 20, 'Inscriptos': 15, 'Estado': 'En curso', 'Fecha Inicio': '2024-01-15', 'Fecha Fin': '2024-06-15'}
])
df_tal.to_excel('demo_files/Talleres_Import.xlsx', index=False)

print('Nuevos Excel generados con Direcciones y Santa Fe')
