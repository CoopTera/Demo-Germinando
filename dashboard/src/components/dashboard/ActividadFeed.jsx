import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { staggerContainerVariants, staggerItemVariants } from '../../lib/motionTokens';

export default function ActividadFeed({ animate = true }) {
  const navigate = useNavigate();
  const { actividadReciente } = useData();

  const list = actividadReciente || [];

  const handleClick = (item) => {
    if (!item.tipo || !item.entidadId) return;
    const routes = {
      beneficiario: '/beneficiarios',
      organizacion: '/organizaciones',
      convenio: '/convenios',
      taller: '/talleres',
    };
    const route = routes[item.tipo];
    if (route) navigate(route, { state: { openModalId: item.entidadId } });
  };

  return (
    <motion.div 
      initial={animate ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={animate ? { duration: 0.35, delay: 0.15 } : { duration: 0 }}
      className="bg-white rounded-2xl flex flex-col card-elevated h-full min-h-[420px]" 
      style={{ padding: '24px' }}
    >
      <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
        <h2 className="font-semibold text-pizarra text-base">Actividad Reciente</h2>
        <span className="text-xs text-pizarra/40 font-medium">Últimos 7 días</span>
      </div>

      <motion.div 
        variants={animate ? staggerContainerVariants : undefined}
        initial={animate ? 'hidden' : false}
        animate="show"
        className="flex flex-col flex-1 overflow-y-auto pr-2 min-h-0 custom-scrollbar" 
        style={{ gap: '24px' }}
      >
        {list.length > 0 ? (
          list.map((item, i) => (
            <motion.div
              key={item.id || i}
              variants={animate ? staggerItemVariants : undefined}
              whileHover={item.entidadId ? { x: 3 } : {}}
              onClick={() => handleClick(item)}
              className={`relative flex items-start ${item.entidadId ? 'cursor-pointer group' : ''}`}
              style={{ gap: '16px' }}
            >
              {i !== list.length - 1 && (
                <motion.div 
                  initial={animate ? { scaleY: 0 } : false}
                  animate={{ scaleY: 1 }}
                  transition={animate ? { duration: 0.4, delay: i * 0.08 + 0.2 } : { duration: 0 }}
                  style={{ transformOrigin: 'top' }}
                  className="absolute left-[19px] top-10 bottom-[-24px] w-0.5 bg-borde" 
                />
              )}
              
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="rounded-full bg-pizarra/10 flex items-center justify-center text-pizarra font-bold text-xs shrink-0 z-10 border-[3px] border-white group-hover:bg-primario group-hover:text-white transition-colors" 
                style={{ width: '40px', height: '40px' }}
              >
                {item.avatar || 'TG'}
              </motion.div>
              
              <div className="flex-1 pt-1.5 pb-2">
                <p className="text-sm text-texto leading-relaxed">
                  <span className="font-semibold">{item.usuario}</span> {item.accion} <span className="font-semibold text-primario group-hover:underline">{item.modulo || item.entidad}</span>
                </p>
                <p className="text-[11px] text-pizarra/50 mt-1 font-medium">{item.fecha}</p>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-xs text-pizarra/50 italic text-center py-12">No hay actividad reciente registrada</div>
        )}
      </motion.div>
    </motion.div>
  );
}
