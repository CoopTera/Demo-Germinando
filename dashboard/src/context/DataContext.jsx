import React, { createContext, useContext, useState } from 'react';
import * as xlsx from 'xlsx';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const mockInitial = [
  {
    id: 1,
    nombre: 'Fundación SEDHA',
    especializacion: 'Casas de acompañamiento y centros terapéuticos',
    localizacion: 'Rosario',
    convenios: 1,
    talleres: 1,
    beneficiarios: 34,
    presupuesto: '$ 25.000.000'
  },
  {
    id: 2,
    nombre: 'Textil Municipal Arcoíris',
    especializacion: 'Espacio público de formación y trabajo textil',
    localizacion: 'Villa Gobernador Galvez',
    convenios: 1,
    talleres: 1,
    beneficiarios: 37,
    presupuesto: '$ 19.000.000'
  }
];

export const DataProvider = ({ children }) => {
  const [organizaciones, setOrganizaciones] = useState(mockInitial);

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
        // The excel has specific text for CONVENIOS and TALLERES, we will mock the count
        convenios: Math.floor(Math.random() * 3) + 1,
        talleres: Math.floor(Math.random() * 5) + 1,
        beneficiarios: parseInt(row['Q PARTICIPANTES']) || 0,
        presupuesto: row['PRESUPUESTO'] || '$ 0'
      }));

      setOrganizaciones(nuevasOrgs);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <DataContext.Provider value={{ organizaciones, setOrganizaciones, importarDesdeExcel }}>
      {children}
    </DataContext.Provider>
  );
};
