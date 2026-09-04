import React, { createContext, useContext, useState, useEffect } from 'react';
import * as xlsx from 'xlsx';
import { 
  organizacionesData, 
  beneficiariosData, 
  conveniosData, 
  talleresData, 
  alertas as alertasData,
  oportunidades as oportunidadesData,
  actividadReciente as actividadData
} from '../data/mockData';
import { programasEstado as programasEstadoData, vinculosInstitucionales as vinculosData } from '../data/vinculosData';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const processedBeneficiarios = beneficiariosData.map(b => ({
  ...b,
  historial: [
    { id: 1, fecha: b.inicioBeca, tipo: 'ingreso', titulo: 'Ingreso al programa', descripcion: 'Asignado a beca y talleres' },
    { id: 2, fecha: b.ultimoRegistro || b.inicioBeca, tipo: 'seguimiento', titulo: 'Última actividad', descripcion: `Estado de seguimiento: ${b.estado}`}
  ]
}));

export const DataProvider = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState(() => localStorage.getItem('demoMode') === 'true');

  const [organizaciones, setOrganizaciones] = useState(() => isDemoMode ? [] : organizacionesData);
  const [beneficiarios, setBeneficiarios] = useState(() => isDemoMode ? [] : processedBeneficiarios);
  const [convenios, setConvenios] = useState(() => isDemoMode ? [] : conveniosData);
  const [talleres, setTalleres] = useState(() => isDemoMode ? [] : talleresData);
  const [alertas, setAlertas] = useState(() => isDemoMode ? [] : alertasData);
  const [oportunidades, setOportunidades] = useState(() => isDemoMode ? [] : oportunidadesData);
  const [actividadReciente, setActividadReciente] = useState(() => isDemoMode ? [] : actividadData);
  const [programasEstado, setProgramasEstado] = useState(() => isDemoMode ? [] : programasEstadoData);
  const [vinculos, setVinculos] = useState(() => isDemoMode ? [] : vinculosData);
  
  const [hasDashboardAnimated, setHasDashboardAnimated] = useState(false);

  useEffect(() => {
    localStorage.setItem('demoMode', isDemoMode);
  }, [isDemoMode]);

  const resetDatabase = (clean = false) => {
    setIsDemoMode(clean);
    if (clean) {
      setOrganizaciones([]);
      setBeneficiarios([]);
      setConvenios([]);
      setTalleres([]);
      setAlertas([]);
      setOportunidades([]);
      setActividadReciente([]);
      setProgramasEstado([]);
      setVinculos([]);
    } else {
      setOrganizaciones(organizacionesData);
      setBeneficiarios(processedBeneficiarios);
      setConvenios(conveniosData);
      setTalleres(talleresData);
      setAlertas(alertasData);
      setOportunidades(oportunidadesData);
      setActividadReciente(actividadData);
      setProgramasEstado(programasEstadoData);
      setVinculos(vinculosData);
    }
  };

  // Generic CRUD
  const editarBeneficiario = (updated) => setBeneficiarios(prev => prev.map(b => b.id === updated.id ? updated : b));
  const editarOrganizacion = (updated) => setOrganizaciones(prev => prev.map(o => o.id === updated.id ? updated : o));
  const editarConvenio = (updated) => setConvenios(prev => prev.map(c => c.id === updated.id ? updated : c));
  const editarTaller = (updated) => setTalleres(prev => prev.map(t => t.id === updated.id ? updated : t));

  const addBeneficiario = (nuevo) => setBeneficiarios(prev => [nuevo, ...prev]);
  const addOrganizacion = (nuevo) => setOrganizaciones(prev => [nuevo, ...prev]);
  const addConvenio = (nuevo) => setConvenios(prev => [nuevo, ...prev]);
  const addTaller = (nuevo) => setTalleres(prev => [nuevo, ...prev]);

  const deleteBeneficiario = (id) => setBeneficiarios(prev => prev.filter(b => b.id !== id));
  const deleteOrganizacion = (id) => setOrganizaciones(prev => prev.filter(o => o.id !== id));
  const deleteConvenio = (id) => setConvenios(prev => prev.filter(c => c.id !== id));
  const deleteTaller = (id) => setTalleres(prev => prev.filter(t => t.id !== id));

  const resolveAlerta = (id) => setAlertas(prev => prev.filter(a => a.id !== id));

  const editarVinculo = (updated) => setVinculos(prev => prev.map(v => v.id === updated.id ? updated : v));
  const addVinculo = (nuevo) => setVinculos(prev => [nuevo, ...prev]);
  const deleteVinculo = (id) => setVinculos(prev => prev.filter(v => v.id !== id));

  const importarDesdeExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = xlsx.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const json = xlsx.utils.sheet_to_json(worksheet);
      
      if (json.length === 0) {
        alert('El archivo está vacío.');
        return;
      }

      const firstRow = json[0];
      if (firstRow.hasOwnProperty('DNI') || firstRow.hasOwnProperty('dni')) {
        const nuevos = json.map((row, index) => ({
          id: `import-ben-${Date.now()}-${index}`,
          dni: row['DNI']?.toString() || '',
          nombre: row['NOMBRE']?.toString() || 'Sin nombre',
          localizacion: row['LOCALIZACION'] || row['Localización'] || 'Santa Fe',
          direccion: row['DIRECCION'] || row['Dirección'] || '',
          inicioBeca: row['FECHA_INICIO'] || row['Fecha Inicio'] || '2024-01-01',
          fechaInicio: row['FECHA_INICIO'] || row['Fecha Inicio'] || '2024-01-01',
          presupuestoBeca: row['BECA_MENSUAL'] || row['Beca Mensual'] || 120000,
          ultimoRegistro: row['ULTIMO_REGISTRO'] || row['Último Registro'] || '2024-03-01',
          estado: row['ESTADO']?.toString() || 'Activo',
          talleres: [],
          historial: []
        }));
        setBeneficiarios(prev => [...nuevos, ...prev]);
        alert(`Éxito. Se importaron ${nuevos.length} beneficiarios correctamente.`);
      } else {
        const nuevasOrgs = json.map((row, index) => ({
          id: `import-org-${Date.now()}-${index}`,
          nombre: row['NOMBRE']?.toString().trim() || 'Sin nombre',
          especializacion: row['ESPECIALIZACION'] || row['Especialización'] || 'General',
          localizacion: row['LOCALIZACION'] || row['Localización'] || 'Santa Fe',
          direccion: row['DIRECCION'] || row['Dirección'] || '',
          convenios: row['CONVENIOS'] || 0,
          talleres: row['TALLERES'] || 0,
          presupuesto: row['PRESUPUESTO'] || 5000000
        }));
        setOrganizaciones(prev => [...nuevasOrgs, ...prev]);
        alert(`Éxito. Se importaron ${nuevasOrgs.length} organizaciones correctamente.`);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <DataContext.Provider value={{
      isDemoMode, resetDatabase,
      organizaciones, beneficiarios, convenios, talleres, alertas, oportunidades, actividadReciente,
      programasEstado, vinculos,
      editarBeneficiario, editarOrganizacion, editarConvenio, editarTaller,
      addBeneficiario, addOrganizacion, addConvenio, addTaller,
      deleteBeneficiario, deleteOrganizacion, deleteConvenio, deleteTaller,
      editarVinculo, addVinculo, deleteVinculo,
      resolveAlerta, setAlertas, setOportunidades, setActividadReciente,
      hasDashboardAnimated, setHasDashboardAnimated,
      importarDesdeExcel
    }}>
      {children}
    </DataContext.Provider>
  );
};