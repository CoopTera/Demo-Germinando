import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainerVariants, staggerItemVariants } from '../../lib/motionTokens';

export default function VinculosGrid({ data, programas, onItemClick }) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl text-center text-[#494963]/60 font-medium shadow-sm" style={{ padding: '64px 0' }}>
        No hay articulaciones registradas.
      </div>
    );
  }

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Vigente': return 'text-[#22C55E] bg-[#22C55E]/10';
      case 'En Negociación': return 'text-[#FF7402] bg-[#FF7402]/10';
      case 'Finalizado': return 'text-[#494963] bg-[#494963]/10';
      case 'Suspendido': return 'text-[#E42153] bg-[#E42153]/10';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getProgramaColor = (programaId) => {
    const prog = programas.find(p => p.id === programaId);
    return prog ? prog.color : '#494963';
  };
  
  const getProgramaNombre = (programaId) => {
    const prog = programas.find(p => p.id === programaId);
    return prog ? prog.nombre : 'Sin programa';
  };

  return (
    <motion.div 
      variants={staggerContainerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
      style={{ gap: '24px' }}
    >
      {data.map((v, i) => {
        const pColor = getProgramaColor(v.programa_id);
        const pName = getProgramaNombre(v.programa_id);
        const ejecucion = v.presupuestoAsignado ? (v.presupuestoEjecutado / v.presupuestoAsignado) : 0;
        
        return (
          <motion.div 
            key={v.id || i} 
            variants={staggerItemVariants}
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onItemClick && onItemClick(v)}
            className="bg-white rounded-2xl flex flex-col shadow-sm cursor-pointer border border-[#E2E4EB]" 
            style={{ padding: '20px' }}
          >
            <div className="flex justify-between items-start" style={{ marginBottom: '16px' }}>
              <div>
                <h3 className="font-semibold text-[#2D2D3A] text-[15px] leading-tight" style={{ marginBottom: '6px' }}>{v.titulo}</h3>
                <span className="text-[11px] font-bold uppercase tracking-wider rounded-sm inline-flex items-center gap-1.5" style={{ color: pColor, backgroundColor: `${pColor}1A`, padding: '2px 8px' }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pColor }}></div>
                  {pName}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center" style={{ marginBottom: '16px' }}>
              <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getEstadoColor(v.estado)}`}>
                {v.estado}
              </span>
              <span className="text-xs text-[#494963]/70 font-semibold uppercase tracking-wider">{v.nivel || 'Provincial'}</span>
            </div>

            <div className="grid grid-cols-2 mt-auto" style={{ gap: '12px', marginBottom: '16px' }}>
              <div className="bg-[#EBEDF2]/40 rounded-xl border border-[#E2E4EB] flex flex-col" style={{ padding: '8px 12px' }}>
                <p className="text-[10px] text-[#494963]/70 font-bold uppercase">Inicio</p>
                <p className="text-sm font-semibold text-[#2D2D3A]">{v.fechaInicio}</p>
              </div>
              <div className="bg-[#EBEDF2]/40 rounded-xl border border-[#E2E4EB] flex flex-col" style={{ padding: '8px 12px' }}>
                <p className="text-[10px] text-[#494963]/70 font-bold uppercase">Fin</p>
                <p className="text-sm font-semibold text-[#2D2D3A]">{v.fechaFin}</p>
              </div>
            </div>

            <div className="border-t border-[#E2E4EB] flex flex-col" style={{ paddingTop: '12px' }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#494963]/60 uppercase">Ejecución ({Math.round(ejecucion * 100)}%)</span>
                <span className="text-xs font-bold text-[#2D2D3A]">
                  {v.presupuestoEjecutado ? `$ ${v.presupuestoEjecutado.toLocaleString('es-AR')}` : '$ 0'} / {v.presupuestoAsignado ? `$ ${v.presupuestoAsignado.toLocaleString('es-AR')}` : '$ 0'}
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#EBEDF2] rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all" 
                  style={{ width: `${Math.min(100, ejecucion * 100)}%`, backgroundColor: pColor }}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
