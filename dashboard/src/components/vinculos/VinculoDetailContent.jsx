import React from 'react';
import { Calendar, Time, Money, Location, UserMultiple, Checkmark, CheckmarkFilled, CircleDash, Document, Partnership } from '@carbon/icons-react';

const cardStyle = { background: '#FFFFFF', padding: '20px 22px', borderRadius: '14px', border: '1px solid #E2E4EB' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 700, color: '#494963', opacity: 0.55, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' };

const VinculoDetailContent = ({ vinculo, programa, organizaciones }) => {
  if (!vinculo) return null;

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Vigente': return { bg: 'rgba(34,197,94,0.1)', text: '#22C55E' };
      case 'En Negociación': return { bg: 'rgba(255,116,2,0.1)', text: '#FF7402' };
      case 'Finalizado': return { bg: 'rgba(73,73,99,0.1)', text: '#494963' };
      case 'Suspendido': return { bg: 'rgba(228,33,83,0.1)', text: '#E42153' };
      default: return { bg: '#f3f4f6', text: '#6b7280' };
    }
  };

  const st = getEstadoColor(vinculo.estado);

  const start = new Date(vinculo.fechaInicio);
  const end = new Date(vinculo.fechaFin);
  const today = new Date();
  
  const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  
  const totalMs = end - start;
  const elapsedMs = today - start;
  let timePct = (elapsedMs / totalMs) * 100;
  if (timePct < 0) timePct = 0;
  if (timePct > 100) timePct = 100;

  const pctExec = vinculo.presupuestoAsignado ? (vinculo.presupuestoEjecutado / vinculo.presupuestoAsignado) * 100 : 0;
  
  const formatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });

  const progColor = programa?.color || '#888';

  return (
    <div className="flex flex-col gap-4 font-sans text-sm pb-8">
      {/* Estado + Tipo */}
      <div style={cardStyle} className="flex justify-between items-center">
        <div>
          <span style={labelStyle}>Estado</span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: st.bg, color: st.text }}>
            {vinculo.estado}
          </span>
        </div>
        <div className="text-right">
          <span style={labelStyle}>Tipo de Vínculo</span>
          <span className="text-[#2D2D3A] font-medium flex items-center justify-end gap-1">
            <Partnership size={16} className="text-[#494963]" /> {vinculo.tipo}
          </span>
        </div>
      </div>

      {/* Programa */}
      <div style={cardStyle}>
        <span style={labelStyle}>Programa Vinculado</span>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: progColor }}>
            {programa?.nombre?.charAt(0) || '?'}
          </div>
          <div>
            <div className="font-semibold text-[#2D2D3A] text-base">{programa?.nombre || 'Desconocido'}</div>
            <div className="text-[#494963] text-xs mt-1 flex items-center gap-2">
              <span>{programa?.area}</span>
              <span className="w-1 h-1 rounded-full bg-[#E2E4EB]"></span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${programa?.nivel === 'Provincial' ? 'bg-[#6B1330]/10 text-[#6B1330]' : 'bg-[#FF7402]/10 text-[#FF7402]'}`}>
                {programa?.nivel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Período */}
      <div style={cardStyle}>
        <div className="flex justify-between items-center mb-2">
          <span style={labelStyle}>Período de Ejecución</span>
          <span className="text-xs font-medium text-[#494963] bg-[#EBEDF2] px-2 py-0.5 rounded">{totalMonths} meses</span>
        </div>
        <div className="flex items-center gap-2 text-[#2D2D3A] mb-3">
          <Calendar size={16} className="text-[#494963]" />
          <span>{start.toLocaleDateString()}</span>
          <span className="text-[#494963]">→</span>
          <span>{end.toLocaleDateString()}</span>
        </div>
        <div className="h-1.5 w-full bg-[#EBEDF2] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${timePct}%`, backgroundColor: '#494963' }}></div>
        </div>
      </div>

      {/* Presupuesto */}
      <div style={cardStyle}>
        <span style={labelStyle}>Ejecución Presupuestaria</span>
        <div className="flex justify-between items-end mb-2">
          <div className="text-2xl font-bold text-[#2D2D3A]">{formatter.format(vinculo.presupuestoEjecutado || 0)}</div>
          <div className="text-xs text-[#494963] font-medium">de {formatter.format(vinculo.presupuestoAsignado || 0)}</div>
        </div>
        <div className="h-2 w-full bg-[#EBEDF2] rounded-full overflow-hidden relative mb-1">
          <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pctExec, 100)}%`, backgroundColor: progColor }}></div>
        </div>
        <div className="text-right text-xs font-bold" style={{ color: progColor }}>{pctExec.toFixed(1)}% Ejecutado</div>
      </div>

      {/* Organizaciones */}
      <div style={cardStyle}>
        <span style={labelStyle}>Organizaciones Involucradas</span>
        <div className="flex flex-wrap gap-2">
          {vinculo.organizaciones_ids?.map(id => {
            const org = organizaciones?.find(o => o.id === id);
            return (
              <span key={id} className="inline-flex items-center gap-1 bg-[#EBEDF2] text-[#494963] px-2.5 py-1 rounded-md text-xs font-medium">
                <Location size={14} /> {org ? org.nombre : `Org #${id}`}
              </span>
            );
          })}
          {(!vinculo.organizaciones_ids || vinculo.organizaciones_ids.length === 0) && (
            <span className="text-xs text-[#494963] italic">No hay organizaciones vinculadas</span>
          )}
        </div>
      </div>

      {/* Beneficiarios */}
      <div style={cardStyle} className="flex justify-between items-center">
        <span style={labelStyle} className="!mb-0">Beneficiarios Impactados</span>
        <div className="flex items-center gap-2 text-lg font-bold text-[#2D2D3A]">
          <UserMultiple size={20} className="text-[#FF7402]" />
          {vinculo.beneficiarios_derivados || 0}
        </div>
      </div>

      {/* Hitos */}
      {vinculo.hitos && vinculo.hitos.length > 0 && (
        <div style={cardStyle}>
          <span style={labelStyle}>Hitos del Vínculo</span>
          <div className="flex flex-col gap-3 mt-3 relative">
            <div className="absolute left-[9px] top-2 bottom-2 w-[2px] bg-[#EBEDF2]"></div>
            {vinculo.hitos.map(hito => (
              <div key={hito.id} className="flex gap-3 relative z-10">
                <div className="bg-white pt-0.5">
                  {hito.completado ? (
                    <CheckmarkFilled size={20} className="text-[#22C55E]" />
                  ) : (
                    <CircleDash size={20} className="text-[#E2E4EB]" />
                  )}
                </div>
                <div>
                  <div className={`font-medium text-sm ${hito.completado ? 'text-[#2D2D3A]' : 'text-[#494963]'}`}>
                    {hito.titulo}
                  </div>
                  <div className="text-xs text-[#494963] opacity-80 mt-0.5">
                    {new Date(hito.fecha).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notas */}
      {vinculo.notas && (
        <div style={cardStyle}>
          <span style={labelStyle}>Notas</span>
          <div className="text-sm text-[#494963] leading-relaxed flex gap-2">
            <Document size={16} className="shrink-0 mt-0.5 opacity-50" />
            <p>{vinculo.notas}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VinculoDetailContent;
