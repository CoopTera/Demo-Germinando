import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

export default function OrganizacionForm({ onClose, initialData = null }) {
  const { agregarOrganizacion, editarOrganizacion } = useData();
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || '',
    especializacion: initialData?.especializacion || '',
    localizacion: initialData?.localizacion || '',
    cuit: initialData?.cuit || '',
    beneficiarios: initialData?.beneficiarios || '',
    presupuesto: initialData?.presupuesto?.replace(/[^0-9]/g, '') || '',
    convenios: initialData?.convenios || '',
    talleres: initialData?.talleres || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      beneficiarios: Number(formData.beneficiarios) || 0,
      convenios: Number(formData.convenios) || 0,
      talleres: Number(formData.talleres) || 0,
      presupuesto: `$ ${Number(formData.presupuesto).toLocaleString('es-AR') || 0}`
    };

    if (initialData && initialData.id) {
      editarOrganizacion(initialData.id, dataToSave);
    } else {
      agregarOrganizacion(dataToSave);
    }
    onClose();
  };

  const inputStyle = { padding: '8px 12px', marginBottom: '16px', display: 'block', width: '100%' };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '16px' }}>
        <div className="md:col-span-2">
          <label className="text-xs font-bold text-pizarra/70 uppercase mb-1 block">Nombre de la Organización</label>
          <input required type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="bg-canvas border border-borde rounded-md text-sm text-texto focus:border-primario focus:ring-1 focus:ring-primario outline-none" style={inputStyle} />
        </div>
        <div>
          <label className="text-xs font-bold text-pizarra/70 uppercase mb-1 block">Especialización</label>
          <input required type="text" name="especializacion" value={formData.especializacion} onChange={handleChange} placeholder="Ej: Textil e Indumentaria" className="bg-canvas border border-borde rounded-md text-sm text-texto focus:border-primario focus:ring-1 focus:ring-primario outline-none" style={inputStyle} />
        </div>
        <div>
          <label className="text-xs font-bold text-pizarra/70 uppercase mb-1 block">Localización</label>
          <input required type="text" name="localizacion" value={formData.localizacion} onChange={handleChange} placeholder="Ej: Rosario, Santa Fe" className="bg-canvas border border-borde rounded-md text-sm text-texto focus:border-primario focus:ring-1 focus:ring-primario outline-none" style={inputStyle} />
        </div>
        <div>
          <label className="text-xs font-bold text-pizarra/70 uppercase mb-1 block">CUIT</label>
          <input type="text" name="cuit" value={formData.cuit} onChange={handleChange} className="bg-canvas border border-borde rounded-md text-sm text-texto focus:border-primario focus:ring-1 focus:ring-primario outline-none" style={inputStyle} />
        </div>
        <div>
          <label className="text-xs font-bold text-pizarra/70 uppercase mb-1 block">Cantidad de Beneficiarios</label>
          <input required type="number" name="beneficiarios" value={formData.beneficiarios} onChange={handleChange} className="bg-canvas border border-borde rounded-md text-sm text-texto focus:border-primario focus:ring-1 focus:ring-primario outline-none" style={inputStyle} />
        </div>
        <div>
          <label className="text-xs font-bold text-pizarra/70 uppercase mb-1 block">Presupuesto Ejecutado ($)</label>
          <input type="number" name="presupuesto" value={formData.presupuesto} onChange={handleChange} className="bg-canvas border border-borde rounded-md text-sm text-texto focus:border-primario focus:ring-1 focus:ring-primario outline-none" style={inputStyle} />
        </div>
        <div>
          <label className="text-xs font-bold text-pizarra/70 uppercase mb-1 block">Convenios Activos</label>
          <input type="number" name="convenios" value={formData.convenios} onChange={handleChange} className="bg-canvas border border-borde rounded-md text-sm text-texto focus:border-primario focus:ring-1 focus:ring-primario outline-none" style={inputStyle} />
        </div>
      </div>
      
      <div className="flex justify-end border-t border-borde mt-4" style={{ paddingTop: '16px', gap: '12px' }}>
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-pizarra hover:bg-canvas rounded-md transition-colors cursor-pointer border border-borde">Cancelar</button>
        <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-primario hover:bg-primario/90 rounded-md shadow-sm transition-colors cursor-pointer">Guardar Organización</button>
      </div>
    </form>
  );
}
