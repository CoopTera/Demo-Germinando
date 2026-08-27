import React, { createContext, useContext, useState } from 'react';
import * as xlsx from 'xlsx';
import { organizacionesData, beneficiariosData } from '../data/mockData';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [organizaciones, setOrganizaciones] = useState(organizacionesData);
  const [beneficiarios, setBeneficiarios] = useState(beneficiariosData);

  const importarDesdeExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = xlsx.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const json = xlsx.utils.sheet_to_json(worksheet);
      
      const nuevasOrgs = json.map((row, index) => ({
        id: `import-${index}`,
        nombre: row['NOMBRE']?.toString().trim() || 'Sin nombre',
        especializacion: row['ESPECIALIZACION']?.toString().trim() || 'General',
        localizacion: row['LOCALIZACION']?.toString().trim() || 'Sin especificar',
        cuit: row['CUIT'] || '',
        convenios: Math.floor(Math.random() * 3) + 1,
        talleres: Math.floor(Math.random() * 5) + 1,
        beneficiarios: parseInt(row['Q PARTICIPANTES']) || 0,
        presupuesto: row['PRESUPUESTO'] || '$ 0'
      }));

      setOrganizaciones(nuevasOrgs);
    };
    reader.readAsArrayBuffer(file);
  };

  const ExcelDateToJSDate = (serial) => {
    if (!serial || isNaN(serial)) return serial;
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;                                        
    const date_info = new Date(utc_value * 1000);
    return date_info.toLocaleDateString('es-AR');
  };

  const importarBeneficiarios = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = xlsx.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = xlsx.utils.sheet_to_json(worksheet);
      
      const nuevosBeneficiarios = json.map((row, index) => ({
        id: `ben-${index}`,
        nombre: row['NOMBRE']?.toString().trim() || 'Sin nombre',
        dni: row['DNI']?.toString().trim() || 'S/D',
        programas: row['PROGRAMAS QUE LO BENEFICIAN']?.toString().trim() || '-',
        inicioBeca: ExcelDateToJSDate(row['INICIO DE LA BECA']) || '-',
        tiempoBeca: row['TIEMPO DE BECA']?.toString().trim() || '-',
        monto: parseInt(row['MONTO BECA MENSUAL']) || 0,
        actividad: row['ULTIMA ACTIVIDAD']?.toString().trim() || '-',
        estado: row['ESTADO DE SEGUIMIENTO']?.toString().trim() || 'Sin seguimiento'
      }));

      setBeneficiarios(nuevosBeneficiarios);
      alert(`✅ Se importaron ${nuevosBeneficiarios.length} beneficiarios correctamente.`);
    };
    reader.readAsArrayBuffer(file);
  };

  const agregarOrganizacion = (nuevaOrg) => {
    setOrganizaciones([...organizaciones, { ...nuevaOrg, id: Date.now() }]);
  };

  const agregarBeneficiario = (nuevoBen) => {
    setBeneficiarios([...beneficiarios, { ...nuevoBen, id: Date.now() }]);
  };

  return (
    <DataContext.Provider value={{ 
      organizaciones, 
      setOrganizaciones, 
      importarDesdeExcel,
      agregarOrganizacion,
      beneficiarios,
      importarBeneficiarios,
      agregarBeneficiario
    }}>
      {children}
    </DataContext.Provider>
  );
};
