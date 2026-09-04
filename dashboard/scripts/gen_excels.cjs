const xlsx = require('xlsx');
const fs = require('fs');

// --- BENEFICIARIOS ---
const benefHeaders = ['DNI', 'NOMBRE', 'ORGANIZACIONES', 'INICIO_BECA', 'PRESUPUESTO', 'ULTIMO_REGISTRO', 'ESTADO', 'ASISTENCIA'];

// Empty Template
const benefEmpty = xlsx.utils.book_new();
const wsBenefEmpty = xlsx.utils.aoa_to_sheet([benefHeaders]);
xlsx.utils.book_append_sheet(benefEmpty, wsBenefEmpty, 'Beneficiarios');
xlsx.writeFile(benefEmpty, 'excels_demo/Plantilla_Beneficiarios.xlsx');

// Filled Demo File
const benefDemo = xlsx.utils.book_new();
const benefData = [
  benefHeaders,
  ['35987123', 'Carlos Tevez', 'Cooperativa El Ceibo', '2025-01-15', '250000', '2026-08-20', 'Activo', '95%'],
  ['40123999', 'Luciana Aymar', 'Asociación Civil Unión', '2024-05-10', '210000', '2026-08-15', 'Activo', '100%'],
  ['28456789', 'Emanuel Ginóbili', 'Fundación La Semilla', '2023-11-01', '180000', '2026-02-10', 'Suspendido', '45%'],
  ['41000222', 'Paula Pareto', 'Cooperativa El Ceibo', '2026-02-20', '300000', '2026-09-01', 'Activo', '80%'],
  ['39888777', 'Lionel Messi', 'Fundación Rosario', '2022-03-10', '500000', '2026-08-30', 'Egresado', '100%']
];
const wsBenefDemo = xlsx.utils.aoa_to_sheet(benefData);
xlsx.utils.book_append_sheet(benefDemo, wsBenefDemo, 'Beneficiarios');
xlsx.writeFile(benefDemo, 'excels_demo/Beneficiarios_Demo_Lleno.xlsx');

// --- ORGANIZACIONES ---
const orgHeaders = ['NOMBRE', 'LOCALIZACION', 'ESPECIALIZACION', 'PRESUPUESTO', 'CUIT', 'Q PARTICIPANTES'];

// Empty Template
const orgEmpty = xlsx.utils.book_new();
const wsOrgEmpty = xlsx.utils.aoa_to_sheet([orgHeaders]);
xlsx.utils.book_append_sheet(orgEmpty, wsOrgEmpty, 'Organizaciones');
xlsx.writeFile(orgEmpty, 'excels_demo/Plantilla_Organizaciones.xlsx');

// Filled Demo File
const orgDemo = xlsx.utils.book_new();
const orgData = [
  orgHeaders,
  ['Cooperativa Sol de Mayo', 'Rosario, Santa Fe', 'Agricultura Familiar', '8500000', '30-71123456-9', '45'],
  ['Asociación Civil Norte', 'Salta Capital', 'Textil e Indumentaria', '4200000', '33-55667788-1', '22'],
  ['Fundación Reciclar', 'Córdoba Capital', 'Reciclaje y Ambiente', '12000000', '30-99887766-5', '80']
];
const wsOrgDemo = xlsx.utils.aoa_to_sheet(orgData);
xlsx.utils.book_append_sheet(orgDemo, wsOrgDemo, 'Organizaciones');
xlsx.writeFile(orgDemo, 'excels_demo/Organizaciones_Demo_Lleno.xlsx');

console.log('Archivos Excel generados exitosamente en la carpeta /excels_demo');
