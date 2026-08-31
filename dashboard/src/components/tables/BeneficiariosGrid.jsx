import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { staggerContainerVariants, staggerItemVariants } from '../../lib/motionTokens';

export default function BeneficiariosGrid({ data = [], onItemClick }) {
  const { talleres } = useData();
  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    if (typeof dateStr === 'string' && dateStr.includes('/')) return dateStr;
    if (typeof dateStr === 'string' && dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)).toLocaleDateString('es-AR');
      }
    }
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString('es-AR');
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

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl text-center text-pizarra/60 font-medium card-elevated" style={{ padding: '64px 0' }}>
        No se encontraron beneficiarios que coincidan con la búsqueda.
      </div>
    );
  }

  return (
    <motion.div 
      variants={staggerContainerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
      style={{ gap: '20px' }}
    >
      {data.map((row) => {
        const org = row.programas || row.organizaciones;
        const fecha = row.inicioBeca || row.fechaInicio;
        const asistenciaNum = parseInt((row.asistencia || "0").replace('%', ''));
        const asisColor = asistenciaNum < 75 ? 'text-naranja' : 'text-texto';
        const benTalleres = (row.talleres || []).map(tId => talleres.find(t => t.id === tId)?.nombre).filter(Boolean);

        return (
          <motion.div
            key={row.id || row.dni}
            variants={staggerItemVariants}
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onItemClick && onItemClick(row)}
            className="bg-white rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full card-elevated"
          >
            {/* Cabecera Tarjeta */}
            <div className="p-5 pb-4 bg-superficie-sec/50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-pizarra text-base leading-tight" title={row.nombre}>{row.nombre}</h3>
                  <p className="text-pizarra/60 text-xs mt-1 font-medium font-mono">{row.dni}</p>
                </div>
              </div>

              <div className="flex flex-wrap" style={{ gap: '6px', marginBottom: '8px' }}>
                {org ? (
                  org.split(',').map((o, i) => (
                    <span key={i} className="bg-primario/10 text-primario text-[10px] rounded-full font-bold uppercase tracking-wider" style={{ padding: '2px 8px' }}>
                      {o.trim()}
                    </span>
                  ))
                ) : <span className="text-gray-400 text-[10px]">Sin organización</span>}
              </div>

              <div className="flex flex-wrap" style={{ gap: '6px' }}>
                {benTalleres.length > 0 ? (
                  benTalleres.map((t, i) => (
                    <span key={i} className="bg-naranja/10 text-naranja text-[10px] rounded-full font-bold uppercase tracking-wider" style={{ padding: '2px 8px' }}>
                      {t.trim()}
                    </span>
                  ))
                ) : <span className="text-gray-400 text-[10px]">Sin talleres</span>}
              </div>
            </div>

            {/* Cuerpo Tarjeta */}
            <div className="p-5 flex-1 flex flex-col justify-between" style={{ gap: '16px' }}>
              <div className="grid grid-cols-2" style={{ gap: '12px' }}>
                <div>
                  <p className="text-[10px] text-pizarra/60 font-bold uppercase tracking-wider mb-1">Ingreso</p>
                  <p className="text-sm font-medium text-texto">
                    {formatDate(fecha)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-pizarra/60 font-bold uppercase tracking-wider mb-1">Tiempo</p>
                  <p className="text-sm font-medium text-texto">{getTiempoPrograma(fecha)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 pt-3 border-t border-borde/50" style={{ gap: '12px' }}>
                <div>
                  <p className="text-[10px] text-pizarra/60 font-bold uppercase tracking-wider mb-1">Asistencia</p>
                  <p className={`text-sm font-bold ${asisColor}`}>{row.asistencia || '-'}</p>
                </div>
                <div>
                  <p className="text-[10px] text-pizarra/60 font-bold uppercase tracking-wider mb-1">Estado</p>
                  {row.estado === 'Activo' ? (
                    <span className="inline-block text-xs font-bold text-exito">
                      ACTIVO
                    </span>
                  ) : row.estado === 'Egresado' ? (
                    <span className="inline-block text-xs font-bold text-primario">
                      EGRESADO
                    </span>
                  ) : (
                    <span className="inline-block text-xs font-bold text-naranja">
                      {row.estado.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
