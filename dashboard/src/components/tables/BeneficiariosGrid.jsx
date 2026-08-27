import React from 'react';
import { CreditCard, Calendar, Clock } from 'lucide-react';

export default function BeneficiariosGrid({ data, onItemClick }) {
  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return '$ 0';
    return amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
  };

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
        const hasAlert = row.alerta === true || row.estado === 'Sin seguimiento';
        const orgsRaw = row.programas || row.organizaciones;
        const orgs = typeof orgsRaw === 'string' ? orgsRaw.split(',').map(s => s.trim()) : Array.isArray(orgsRaw) ? orgsRaw : orgsRaw ? [orgsRaw] : [];
        const fecha = row.inicioBeca || row.fechaInicio;
        const monto = row.monto !== undefined ? row.monto : row.presupuestoBeca;
        const ultimoReg = row.actividad || row.ultimoRegistro;

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
              {hasAlert ? (
                <span className="inline-flex items-center rounded-full text-[10px] uppercase font-bold bg-naranja/10 text-naranja shrink-0" style={{ padding: '4px 8px' }}>Sin Seg.</span>
              ) : (
                <span className="inline-flex items-center rounded-full text-[10px] uppercase font-bold bg-exito/10 text-exito shrink-0" style={{ padding: '4px 8px' }}>Activo</span>
              )}
            </div>

            <div className="flex flex-wrap" style={{ gap: '6px', marginBottom: '16px' }}>
              {orgs.length > 0 ? orgs.map((org, orgIdx) => (
                <span key={orgIdx} className="bg-primario/10 text-primario text-[11px] rounded-full font-bold uppercase tracking-wider" style={{ padding: '2px 8px' }}>
                  {org}
                </span>
              )) : <span className="text-gray-400 text-xs">Sin organización</span>}
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
                  <Clock style={{ width: '12px', height: '12px' }} /> Ult. Reg
                </div>
                <p className="text-sm font-semibold text-texto">{formatDate(ultimoReg)}</p>
              </div>
            </div>

            <div className="border-t border-borde flex items-center justify-between" style={{ paddingTop: '12px' }}>
              <div className="text-xs font-bold text-pizarra/70 uppercase">Beca Mensual</div>
              <div className="font-bold text-texto text-[15px]">{formatCurrency(monto)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
