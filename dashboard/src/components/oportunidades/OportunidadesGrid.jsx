import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainerVariants, staggerItemVariants } from '../../lib/motionTokens';

export default function OportunidadesGrid({ data, onItemClick }) {
  if (data.length === 0) {
    return (
      <div className="col-span-full text-center text-pizarra/60 font-medium bg-white rounded-2xl card-elevated" style={{ padding: '48px 0' }}>
        No se encontraron oportunidades que coincidan con la búsqueda.
      </div>
    );
  }

  return (
    <motion.div 
      variants={staggerContainerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
      style={{ gap: '24px' }}
    >
      {data.map((item) => (
        <motion.div 
          key={item.id} 
          onClick={() => onItemClick && onItemClick(item)}
          variants={staggerItemVariants}
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-2xl p-6 flex flex-col card-elevated cursor-pointer group"
          style={{ padding: '24px' }}
        >
          <div className="flex justify-between items-start" style={{ marginBottom: '16px' }}>
            <span className="inline-flex items-center rounded-full text-xs font-bold uppercase tracking-wider bg-canvas text-pizarra" style={{ padding: '4px 12px' }}>
              {item.titulo?.includes('Licitación') ? 'Licitación' : item.titulo?.includes('Compra Pública') ? 'Compra Pública' : item.titulo?.includes('Fondo') ? 'Fondo' : 'Capacitación'}
            </span>
          </div>
          
          <h3 className="font-bold text-texto text-lg leading-tight group-hover:text-primario transition-colors" style={{ marginBottom: '8px' }}>{item.titulo}</h3>
          
          <div className="flex flex-col" style={{ gap: '6px', marginBottom: '24px' }}>
            <div className="text-sm font-medium text-pizarra/80">
              {item.organizador}
            </div>
            <div className="text-xs font-medium text-pizarra/60">
              {item.fecha}
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-borde flex items-center justify-between" style={{ paddingTop: '16px' }}>
            <span className="text-sm font-semibold text-primario">Ver detalles</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
