import React from 'react';
import { Building2, MapPin, FileText, Hammer, DollarSign, Pencil } from 'lucide-react';

export default function OrganizacionesGrid({ data }) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-md border border-borde py-16 text-center text-pizarra/60 font-medium shadow-sm">
        No hay organizaciones cargadas. Importá un Excel para comenzar.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3" style={{ gap: '24px' }}>
      {data.map((org, i) => (
        <div key={org.id || i} className="bg-white rounded-md shadow-sm border border-borde p-5 hover:shadow-md transition-shadow flex flex-col card-elevated">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-superficie-sec flex items-center justify-center shrink-0 border border-borde">
                <Building2 className="w-5 h-5 text-pizarra/70" />
              </div>
              <div>
                <h3 className="font-semibold text-texto text-[15px] leading-tight mb-1">{org.nombre}</h3>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primario bg-primario/10 px-2 py-0.5 rounded-sm">
                  {org.especializacion}
                </span>
              </div>
            </div>
            <button className="text-pizarra/40 hover:text-primario transition-colors" title="Editar">
              <Pencil className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-pizarra/80 font-medium mb-4">
            <MapPin className="w-3.5 h-3.5 text-pizarra/50" />
            {org.localizacion}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4 mt-auto">
            <div className="bg-canvas rounded border border-borde p-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-pizarra/60" />
              <div>
                <p className="text-[10px] text-pizarra/70 font-bold uppercase">Convenios</p>
                <p className="text-sm font-semibold text-texto">{org.convenios}</p>
              </div>
            </div>
            <div className="bg-canvas rounded border border-borde p-2 flex items-center gap-2">
              <Hammer className="w-4 h-4 text-pizarra/60" />
              <div>
                <p className="text-[10px] text-pizarra/70 font-bold uppercase">Talleres</p>
                <p className="text-sm font-semibold text-texto">{org.talleres}</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-borde flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs font-bold text-pizarra/70 uppercase">
              <DollarSign className="w-3.5 h-3.5" />
              Presupuesto
            </div>
            <div className="font-bold text-texto text-[15px]">
              {org.presupuesto}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
