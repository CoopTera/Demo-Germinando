import React, { useState, useEffect } from 'react';

const VinculoForm = ({ vinculo, programas, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    programa_id: programas[0]?.id || '',
    tipo: 'Convenio Marco',
    estado: 'En Negociación',
    fechaInicio: '',
    fechaFin: '',
    presupuestoAsignado: 0,
    presupuestoEjecutado: 0,
    descripcion: '',
    notas: ''
  });

  useEffect(() => {
    if (vinculo) {
      setFormData({
        titulo: vinculo.titulo || '',
        programa_id: vinculo.programa_id || programas[0]?.id || '',
        tipo: vinculo.tipo || 'Convenio Marco',
        estado: vinculo.estado || 'En Negociación',
        fechaInicio: vinculo.fechaInicio || '',
        fechaFin: vinculo.fechaFin || '',
        presupuestoAsignado: vinculo.presupuestoAsignado || 0,
        presupuestoEjecutado: vinculo.presupuestoEjecutado || 0,
        descripcion: vinculo.descripcion || '',
        notas: vinculo.notas || ''
      });
    }
  }, [vinculo, programas]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'presupuestoAsignado' || name === 'presupuestoEjecutado' || name === 'programa_id') 
        ? Number(value) 
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: vinculo ? vinculo.id : `vinc-${Date.now()}`
    });
  };

  const inputClass = "w-full border border-[#E2E4EB] rounded-xl py-2.5 px-3.5 text-sm font-sans focus:outline-none focus:border-[#6B1330] focus:ring-1 focus:ring-[#6B1330] text-[#2D2D3A] bg-[#FAFAFC] hover:bg-white hover:border-[#494963]/30 transition-all";
  const labelClass = "block text-[11px] font-bold text-[#494963] uppercase tracking-wider opacity-70 mb-2";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-2">
      <div>
        <label className={labelClass}>Título del Vínculo</label>
        <input 
          type="text" 
          name="titulo" 
          value={formData.titulo} 
          onChange={handleChange} 
          className={inputClass}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Programa</label>
          <select 
            name="programa_id" 
            value={formData.programa_id} 
            onChange={handleChange} 
            className={inputClass}
          >
            {programas.map(p => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Tipo de Vínculo</label>
          <select 
            name="tipo" 
            value={formData.tipo} 
            onChange={handleChange} 
            className={inputClass}
          >
            <option value="Convenio Marco">Convenio Marco</option>
            <option value="Acta Complementaria">Acta Complementaria</option>
            <option value="Cooperación Técnica">Cooperación Técnica</option>
            <option value="Derivación">Derivación</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Fecha Inicio</label>
          <input 
            type="date" 
            name="fechaInicio" 
            value={formData.fechaInicio} 
            onChange={handleChange} 
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Fecha Fin</label>
          <input 
            type="date" 
            name="fechaFin" 
            value={formData.fechaFin} 
            onChange={handleChange} 
            className={inputClass}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className={labelClass}>Estado</label>
          <select 
            name="estado" 
            value={formData.estado} 
            onChange={handleChange} 
            className={inputClass}
          >
            <option value="Vigente">Vigente</option>
            <option value="En Negociación">En Negociación</option>
            <option value="Finalizado">Finalizado</option>
            <option value="Suspendido">Suspendido</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Presup. Asignado</label>
          <input 
            type="number" 
            name="presupuestoAsignado" 
            value={formData.presupuestoAsignado} 
            onChange={handleChange} 
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Presup. Ejecutado</label>
          <input 
            type="number" 
            name="presupuestoEjecutado" 
            value={formData.presupuestoEjecutado} 
            onChange={handleChange} 
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Descripción</label>
        <textarea 
          name="descripcion" 
          value={formData.descripcion} 
          onChange={handleChange} 
          className={`${inputClass} resize-y min-h-[80px]`}
          rows={3}
        />
      </div>

      <div>
        <label className={labelClass}>Notas</label>
        <textarea 
          name="notas" 
          value={formData.notas} 
          onChange={handleChange} 
          className={`${inputClass} resize-y min-h-[60px]`}
          rows={2}
        />
      </div>

      <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-[#E2E4EB]">
        <button 
          type="button" 
          onClick={onCancel}
          className="text-[13px] font-semibold text-[#494963] bg-white border border-[#E2E4EB] hover:bg-[#F5F6F8] rounded-xl px-5 py-2.5 cursor-pointer transition-colors"
        >
          Cancelar
        </button>
        <button 
          type="submit"
          className="text-[13px] font-semibold text-white bg-[#6B1330] hover:bg-[#4D0A20] rounded-xl px-5 py-2.5 cursor-pointer transition-colors shadow-sm"
        >
          Guardar Vínculo
        </button>
      </div>
    </form>
  );
};

export default VinculoForm;
