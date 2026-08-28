import React from 'react';
import { CreditCard, Calendar, Clock, ChartBar } from '@phosphor-icons/react';

export default function BeneficiariosGrid({ data, onItemClick }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    if (typeof dateStr === 'string' && dateStr.includes('/')) return dateStr;
    if (typeof dateStr === 'string' && dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts.length === 3) return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10)-1, parseInt(parts[2], 10)).toLocaleDateString('es-AR');
    }
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('es-AR');
  };

  const getTiempoPrograma = (dateStr) => {
    if (!dateStr) return '-';
    let date;
    if (typeof dateStr === 'string' && dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        date = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      }
    }
    if (!date) date = new Date(dateStr);
    if (isNaN(date.getTime())) return '-';
    
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return `${diffDays} días`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `${diffMonths} meses`;
    const diffYears = Math.floor(diffMonths / 12);
    const extraMonths = diffMonths % 12;
    return extraMonths > 0 ? `${diffYears}a ${extraMonths}m` : `${diffYears} años`;
  };

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-md border border-borde text-center text-pizarra/60 font-medium shadow-sm" style={{ padding: '64px 0' }}>
        No hay beneficiarios cargados. Importá un Excel para comenzar.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3" style={{ gap: '24px' }}>
      {data.map((row, i) => {
        const hasAlert = row.estado === 'Suspendido';
        const org = row.programas || row.organizaciones;
        const fecha = row.inicioBeca || row.fechaInicio;
        const tiempoProg = getTiempoPrograma(fecha);
        const asistenciaNum = parseInt((row.asistencia || "0").replace('%', ''));
        const asisColor = asistenciaNum < 75 ? 'text-naranja' : 'text-texto';

        return (
          <div 
            key={row.id || i} 
            onClick={() => onItemClick && onItemClick(row)}
            className="bg-white rounded-md shadow-sm border border-borde hover:shadow-md transition-shadow flex flex-col card-elevated cursor-pointer relative overflow-hidden" 
            style={{ padding: '20px' }}
          >
            {hasAlert && <div className="absolute top-0 left-0 w-full bg-naranja" style={{ height: '4px' }} />}
            
            <div className="flex justify-between items-start" style={{ marginBottom: '16px' }}>
              <div>
                <h3 className="font-semibold text-texto text-[16px] leading-tight" style={{ marginBottom: '4px' }}>{row.nombre}</h3>
                <div className="flex items-center text-sm font-medium text-pizarra/70" style={{ gap: '6px' }}>
                  <CreditCard style={{ width: '14px', height: '14px' }} />
                  {row.dni}
                </div>
              </div>
              {row.estado === 'Activo' ? (
                <span className="inline-flex items-center rounded-full text-[10px] uppercase font-bold bg-exito/10 text-exito shrink-0" style={{ padding: '4px 8px' }}>Activo</span>
              ) : row.estado === 'Egresado' ? (
                <span className="inline-flex items-center rounded-full text-[10px] uppercase font-bold bg-primario/10 text-primario shrink-0" style={{ padding: '4px 8px' }}>Egresado</span>
              ) : (
                <span className="inline-flex items-center rounded-full text-[10px] uppercase font-bold bg-naranja/10 text-naranja shrink-0" style={{ padding: '4px 8px' }}>{row.estado}</span>
              )}
            </div>

            <div className="flex flex-wrap" style={{ gap: '6px', marginBottom: '16px' }}>
              {org ? (
                <span className="bg-primario/10 text-primario text-[11px] rounded-full font-bold uppercase tracking-wider" style={{ padding: '2px 8px' }}>
                  {org}
                </span>
              ) : <span className="text-gray-400 text-xs">Sin organización</span>}
            </div>

            <div className="grid grid-cols-2 mt-auto" style={{ gap: '12px', marginBottom: '16px' }}>
              <div className="bg-canvas rounded border border-borde flex flex-col" style={{ padding: '8px 12px' }}>
                <div className="flex items-center text-[10px] text-pizarra/70 font-bold uppercase mb-1" style={{ gap: '4px' }}>
                  <Calendar style={{ width: '12px', height: '12px' }} /> Inicio
                </div>
                <p className="text-sm font-semibold text-texto">{formatDate(fecha)}</p>
              </div>
              <div className="bg-canvas rounded border border-borde flex flex-col" style={{ padding: '8px 12px' }}>
                <div className="flex items-center text-[10px] text-pizarra/70 font-bold uppercase mb-1" style={{ gap: '4px' }}>
                  <Clock style={{ width: '12px', height: '12px' }} /> Tiempo
                </div>
                <p className="text-sm font-semibold text-texto">{tiempoProg}</p>
              </div>
            </div>

            <div className="border-t border-borde flex items-center justify-between" style={{ paddingTop: '12px' }}>
              <div className="flex items-center gap-1 text-xs font-bold text-pizarra/70 uppercase">
                <ChartBar style={{ width: '14px', height: '14px' }} /> Asistencia
              </div>
              <div className={`font-bold text-[15px] ${asisColor}`}>{row.asistencia || '-'}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
