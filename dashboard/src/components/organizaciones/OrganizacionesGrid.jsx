import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainerVariants, staggerItemVariants } from '../../lib/motionTokens';

export default function OrganizacionesGrid({ data, onItemClick }) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-md border border-borde text-center text-pizarra/60 font-medium shadow-sm" style={{ padding: '64px 0' }}>
        No hay organizaciones cargadas. Importá un Excel para comenzar.
      </div>
    );
  }

  return (
    <motion.div 
      variants={staggerContainerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
      style={{ gap: '24px' }}
    >
      {data.map((org, i) => (
        <motion.div 
          key={org.id || i} 
          variants={staggerItemVariants}
          whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(73, 73, 99, 0.12)' }}
          whileTap={{ scale: 0.99 }}
          onClick={() => onItemClick && onItemClick(org)}
          className="bg-white rounded-md shadow-sm border border-borde flex flex-col card-elevated cursor-pointer" 
          style={{ padding: '20px' }}
        >
          <div className="flex justify-between items-start" style={{ marginBottom: '16px' }}>
            <div>
              <h3 className="font-semibold text-texto text-[15px] leading-tight" style={{ marginBottom: '6px' }}>{org.nombre}</h3>
              <span className="text-[11px] font-bold uppercase tracking-wider text-primario bg-primario/10 rounded-sm" style={{ padding: '2px 8px' }}>
                {org.especializacion}
              </span>
            </div>
          </div>

          <div className="text-xs text-pizarra/80 font-medium" style={{ marginBottom: '16px' }}>
            {org.localizacion}
          </div>

          <div className="grid grid-cols-2 mt-auto" style={{ gap: '12px', marginBottom: '16px' }}>
            <div className="bg-canvas rounded border border-borde flex flex-col" style={{ padding: '8px 12px' }}>
              <p className="text-[10px] text-pizarra/70 font-bold uppercase">Convenios</p>
              <p className="text-sm font-semibold text-texto">{org.convenios}</p>
            </div>
            <div className="bg-canvas rounded border border-borde flex flex-col" style={{ padding: '8px 12px' }}>
              <p className="text-[10px] text-pizarra/70 font-bold uppercase">Talleres</p>
              <p className="text-sm font-semibold text-texto">{org.talleres}</p>
            </div>
          </div>

          <div className="border-t border-borde flex items-center justify-between" style={{ paddingTop: '12px' }}>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-pizarra/50 uppercase mb-1">
                Presupuesto
              </span>
              <span className="text-sm font-bold text-texto">
                {typeof org.presupuesto === 'number' ? `$ ${org.presupuesto.toLocaleString('es-AR')}` : org.presupuesto}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
