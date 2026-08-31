import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

export default function BeneficiarioForm({ onClose, initialData = null }) {
  const { agregarBeneficiario, editarBeneficiario } = useData();
  
  // Helper to convert DD/MM/YYYY to YYYY-MM-DD for the input
  const parseDateForInput = (dateStr) => {
    if (!dateStr || dateStr === '-') return '';
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    return '';
  };

  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || '',
    dni: initialData?.dni || '',
    programas: initialData?.programas || '',
    inicioBeca: parseDateForInput(initialData?.inicioBeca),
    tiempoBeca: initialData?.tiempoBeca || '',
    monto: initialData?.monto || '',
    actividad: parseDateForInput(initialData?.actividad),
    estado: initialData?.estado || 'Activo'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Helper to format YYYY-MM-DD to local string
    const formatDateForSave = (dateStr) => {
      if (!dateStr) return '-';
      const [y, m, d] = dateStr.split('-');
      if (y && m && d) return `${d}/${m}/${y}`;
      return '-';
    };

    const dataToSave = {
      ...formData,
      monto: Number(formData.monto) || 0,
      inicioBeca: formatDateForSave(formData.inicioBeca),
      actividad: formatDateForSave(formData.actividad),
      alerta: formData.estado === 'Sin seguimiento'
    };

    if (initialData && initialData.id) {
      editarBeneficiario(initialData.id, dataToSave);
    } else {
      agregarBeneficiario(dataToSave);
    }
    onClose();
  };

  const inputStyle = { padding: '8px 12px', marginBottom: '16px', display: 'block', width: '100%' };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '16px' }}>
        <div>
          <label className="text-xs font-bold text-pizarra/70 uppercase mb-1 block">Nombre Completo</label>
          <input required type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="bg-canvas border border-borde rounded-md text-sm text-texto focus:border-primario focus:ring-1 focus:ring-primario outline-none" style={inputStyle} />
        </div>
        <div>
          <label className="text-xs font-bold text-pizarra/70 uppercase mb-1 block">DNI</label>
          <input required type="text" name="dni" value={formData.dni} onChange={handleChange} className="bg-canvas border border-borde rounded-md text-sm text-texto focus:border-primario focus:ring-1 focus:ring-primario outline-none" style={inputStyle} />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-bold text-pizarra/70 uppercase mb-1 block">Programas / Organizaciones (separar con comas)</label>
          <input required type="text" name="programas" value={formData.programas} onChange={handleChange} placeholder="Ej: Coop. Manos Solidarias, Asoc. Tierra Fértil" className="bg-canvas border border-borde rounded-md text-sm text-texto focus:border-primario focus:ring-1 focus:ring-primario outline-none" style={inputStyle} />
        </div>
        <div>
          <label className="text-xs font-bold text-pizarra/70 uppercase mb-1 block">Fecha de Inicio de Beca</label>
          <input required type="date" name="inicioBeca" value={formData.inicioBeca} onChange={handleChange} className="bg-canvas border border-borde rounded-md text-sm text-texto focus:border-primario focus:ring-1 focus:ring-primario outline-none" style={inputStyle} />
        </div>
        <div>
          <label className="text-xs font-bold text-pizarra/70 uppercase mb-1 block">Tiempo de Beca</label>
          <input type="text" name="tiempoBeca" value={formData.tiempoBeca} onChange={handleChange} placeholder="Ej: 12 meses" className="bg-canvas border border-borde rounded-md text-sm text-texto focus:border-primario focus:ring-1 focus:ring-primario outline-none" style={inputStyle} />
        </div>
        <div>
          <label className="text-xs font-bold text-pizarra/70 uppercase mb-1 block">Monto Mensual ($)</label>
          <input required type="number" name="monto" value={formData.monto} onChange={handleChange} className="bg-canvas border border-borde rounded-md text-sm text-texto focus:border-primario focus:ring-1 focus:ring-primario outline-none" style={inputStyle} />
        </div>
        <div>
          <label className="text-xs font-bold text-pizarra/70 uppercase mb-1 block">Última Actividad / Registro</label>
          <input type="date" name="actividad" value={formData.actividad} onChange={handleChange} className="bg-canvas border border-borde rounded-md text-sm text-texto focus:border-primario focus:ring-1 focus:ring-primario outline-none" style={inputStyle} />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-bold text-pizarra/70 uppercase mb-1 block">Estado de Seguimiento</label>
          <select name="estado" value={formData.estado} onChange={handleChange} className="bg-canvas border border-borde rounded-md text-sm text-texto focus:border-primario focus:ring-1 focus:ring-primario outline-none w-full" style={{ padding: '8px 12px' }}>
            <option value="Activo">Activo</option>
            <option value="Sin seguimiento">Sin seguimiento</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end border-t border-borde mt-4" style={{ paddingTop: '16px', gap: '12px' }}>
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-pizarra hover:bg-canvas rounded-xl transition-colors cursor-pointer border border-borde">Cancelar</button>
        <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-primario hover:bg-primario/90 rounded-xl transition-colors cursor-pointer">Guardar Beneficiario</button>
      </div>
    </form>
  );
}
