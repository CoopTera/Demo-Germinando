import React from 'react';
import { Building2, MapPin, FileText, Hammer, DollarSign, Pencil } from 'lucide-react';

export default function OrganizacionesGrid({ data, onItemClick }) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-md border border-borde text-center text-pizarra/60 font-medium shadow-sm" style={{ padding: '64px 0' }}>
        No hay organizaciones cargadas. Importá un Excel para comenzar.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3" style={{ gap: '24px' }}>
      {data.map((org, i) => (
        <div 
          key={org.id || i} 
          onClick={() => onItemClick && onItemClick(org)}
          className="bg-white rounded-md shadow-sm border border-borde hover:shadow-md transition-shadow flex flex-col card-elevated cursor-pointer" 
          style={{ padding: '20px' }}
        >
          <div className="flex justify-between items-start" style={{ marginBottom: '16px' }}>
            <div className="flex" style={{ gap: '12px' }}>
              <div className="rounded-full bg-superficie-sec flex items-center justify-center shrink-0 border border-borde" style={{ width: '40px', height: '40px' }}>
                <Building2 className="text-pizarra/70" style={{ width: '20px', height: '20px' }} />
              </div>
              <div>
                <h3 className="font-semibold text-texto text-[15px] leading-tight" style={{ marginBottom: '4px' }}>{org.nombre}</h3>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primario bg-primario/10 rounded-sm" style={{ padding: '2px 8px' }}>
                  {org.especializacion}
                </span>
              </div>
            </div>
            <button className="text-pizarra/40 hover:text-primario transition-colors" title="Editar">
              <Pencil style={{ width: '16px', height: '16px' }} />
            </button>
          </div>

          <div className="flex items-center text-xs text-pizarra/80 font-medium" style={{ gap: '6px', marginBottom: '16px' }}>
            <MapPin className="text-pizarra/50" style={{ width: '14px', height: '14px' }} />
            {org.localizacion}
          </div>

          <div className="grid grid-cols-2 mt-auto" style={{ gap: '12px', marginBottom: '16px' }}>
            <div className="bg-canvas rounded border border-borde flex items-center" style={{ padding: '8px', gap: '8px' }}>
              <FileText className="text-pizarra/60" style={{ width: '16px', height: '16px' }} />
              <div>
                <p className="text-[10px] text-pizarra/70 font-bold uppercase">Convenios</p>
                <p className="text-sm font-semibold text-texto">{org.convenios}</p>
              </div>
            </div>
            <div className="bg-canvas rounded border border-borde flex items-center" style={{ padding: '8px', gap: '8px' }}>
              <Hammer className="text-pizarra/60" style={{ width: '16px', height: '16px' }} />
              <div>
                <p className="text-[10px] text-pizarra/70 font-bold uppercase">Talleres</p>
                <p className="text-sm font-semibold text-texto">{org.talleres}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-borde flex items-center justify-between" style={{ paddingTop: '12px' }}>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-pizarra/50 uppercase mb-1 flex items-center" style={{ gap: '4px' }}>
                <DollarSign style={{ width: '12px', height: '12px' }} /> Presupuesto
              </span>
              <span className="text-sm font-bold text-texto">
                {typeof org.presupuesto === 'number' ? `$ ${org.presupuesto.toLocaleString('es-AR')}` : org.presupuesto}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
