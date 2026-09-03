import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from '../common/AnimatedCounter';

export default function KPICard({ titulo, valor, variacion, periodo, presupuesto, index = 0, animate = true }) {
  const isPositive = typeof variacion === 'number' ? variacion > 0 : false;
  const isNegative = typeof variacion === 'number' ? variacion < 0 : false;

  const getFontSize = (val) => {
    const str = String(val || '').trim();
    const len = str.length;
    if (len <= 5) return '30px';
    if (len <= 8) return '26px';
    if (len <= 11) return '23px';
    if (len <= 14) return '20px';
    return '18px';
  };

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={animate ? { duration: 0.35, delay: index * 0.08, ease: 'easeOut' } : { duration: 0 }}
      className="bg-white rounded-2xl card-elevated flex flex-col cursor-default"
      style={{
        padding: '20px 22px',
        gap: '12px',
      }}
    >
      <h2 className="truncate" style={{ fontSize: '12px', fontWeight: 600, color: '#494963', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {titulo}
      </h2>

      <div style={{ display: 'flex', alignItems: 'baseline', minWidth: 0, overflow: 'visible' }} className="whitespace-nowrap">
        <span 
          style={{ 
            fontSize: getFontSize(valor), 
            fontWeight: 800, 
            color: '#1a1a2e', 
            lineHeight: 1.1,
            letterSpacing: '-0.02em' 
          }} 
          className="whitespace-nowrap select-none"
        >
          <AnimatedCounter value={valor} animate={animate} />
        </span>
      </div>

      {presupuesto && (
        <div style={{ marginTop: '4px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase' }}>Ejecutado</span>
            <span style={{ fontSize: '12px', color: '#6B1330', fontWeight: 700 }}>
              <AnimatedCounter value={presupuesto.porcentaje} suffix="%" animate={animate} />
            </span>
          </div>
          <div style={{ height: '6px', borderRadius: '99px', backgroundColor: '#EAE9EE', overflow: 'hidden' }}>
            <motion.div
              initial={animate ? { width: 0 } : { width: `${presupuesto.porcentaje}%` }}
              animate={{ width: `${presupuesto.porcentaje}%` }}
              transition={animate ? { duration: 0.9, delay: index * 0.08 + 0.3, ease: [0.25, 1, 0.5, 1] } : { duration: 0 }}
              style={{ height: '100%', backgroundColor: '#6B1330', borderRadius: '99px' }}
            />
          </div>
        </div>
      )}

      {(isPositive || isNegative || periodo) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto', paddingTop: '4px' }}>
          {isPositive && (
            <span 
              style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a' }}
            >
              +{variacion}%
            </span>
          )}
          {isNegative && (
            <span 
              style={{ fontSize: '12px', fontWeight: 700, color: '#dc2626' }}
            >
              {variacion}%
            </span>
          )}
          {periodo && (
            <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 500 }}>{periodo}</span>
          )}
        </div>
      )}
    </motion.div>
  );
}
