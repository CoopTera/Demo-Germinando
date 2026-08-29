import React from 'react';
import { motion } from 'framer-motion';
import { BookmarkSimple, MapPin, Calendar, ArrowSquareOut } from '@phosphor-icons/react';
import { staggerContainerVariants, staggerItemVariants } from '../../lib/motionTokens';

export default function OportunidadesGrid({ data }) {
  if (data.length === 0) {
    return (
      <div className="col-span-full text-center text-pizarra/60 font-medium bg-white rounded-xl border border-borde" style={{ padding: '48px 0' }}>
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
          variants={staggerItemVariants}
          whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(73, 73, 99, 0.12)' }}
          whileTap={{ scale: 0.99 }}
          className="bg-white rounded-xl shadow-sm border border-borde p-6 flex flex-col card-elevated cursor-pointer group"
          style={{ padding: '24px' }}
        >
          <div className="flex justify-between items-start" style={{ marginBottom: '16px' }}>
            <div className="bg-primario/10 text-primario rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primario group-hover:text-white transition-colors" style={{ width: '48px', height: '48px' }}>
              <BookmarkSimple style={{ width: '24px', height: '24px' }} />
            </div>
            <span className="inline-flex items-center rounded-full text-xs font-bold uppercase tracking-wider bg-canvas border border-borde text-pizarra" style={{ padding: '4px 12px' }}>
              {item.titulo?.includes('Licitación') ? 'Licitación' : item.titulo?.includes('Fondo') ? 'Fondo' : 'Capacitación'}
            </span>
          </div>
          
          <h3 className="font-bold text-texto text-lg leading-tight group-hover:text-primario transition-colors" style={{ marginBottom: '8px' }}>{item.titulo}</h3>
          
          <div className="flex flex-col" style={{ gap: '8px', marginBottom: '24px' }}>
            <div className="flex items-center text-sm font-medium text-pizarra/80" style={{ gap: '8px' }}>
              <MapPin className="text-pizarra/50" style={{ width: '16px', height: '16px' }} />
              {item.organizador}
            </div>
            <div className="flex items-center text-sm font-medium text-pizarra/80" style={{ gap: '8px' }}>
              <Calendar className="text-pizarra/50" style={{ width: '16px', height: '16px' }} />
              {item.fecha}
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-borde flex items-center justify-between" style={{ paddingTop: '16px' }}>
            <span className="text-sm font-semibold text-primario">Ver detalles</span>
            <ArrowSquareOut className="text-primario group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" style={{ width: '16px', height: '16px' }} />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
