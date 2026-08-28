import { motion } from 'framer-motion';
import { TrendUp, TrendDown } from '@phosphor-icons/react';

const ACCENT_COLORS = [
  { bg: '#3C3AE5', text: '#3C3AE5', border: 'rgba(60,58,229,0.3)' }, // azul
  { bg: '#FF7402', text: '#FF7402', border: 'rgba(255,116,2,0.3)' }, // naranja
  { bg: '#22C55E', text: '#22C55E', border: 'rgba(34,197,94,0.3)' }, // verde
  { bg: '#6D28D9', text: '#6D28D9', border: 'rgba(109,40,217,0.3)' }, // violeta
];

export default function KPICard({ titulo, valor, variacion, periodo, presupuesto, index = 0 }) {
  const isPositive = typeof variacion === 'number' ? variacion > 0 : false;
  const isNegative = typeof variacion === 'number' ? variacion < 0 : false;
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="bg-white rounded-md shadow-sm card-elevated flex flex-col"
      style={{
        border: '1px solid #E3E1E2',
        borderTop: `4px solid ${accent.bg}`,
        padding: '20px 24px',
        gap: '12px',
      }}
    >
      <h2 style={{ fontSize: '12px', fontWeight: 600, color: '#494963', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {titulo}
      </h2>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span style={{ fontSize: '32px', fontWeight: 800, color: '#1a1a2e', lineHeight: 1 }}>
          {valor}
        </span>
      </div>

      {presupuesto && (
        <div style={{ marginTop: '4px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase' }}>Ejecutado</span>
            <span style={{ fontSize: '12px', color: accent.text, fontWeight: 700 }}>{presupuesto.porcentaje}%</span>
          </div>
          <div style={{ height: '6px', borderRadius: '99px', backgroundColor: '#EAE9EE', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${presupuesto.porcentaje}%` }}
              transition={{ duration: 0.8, delay: index * 0.08 + 0.3, ease: 'easeOut' }}
              style={{ height: '100%', backgroundColor: accent.bg, borderRadius: '99px' }}
            />
          </div>
        </div>
      )}

      {(isPositive || isNegative || periodo) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto', paddingTop: '4px' }}>
          {isPositive && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700, color: '#16a34a', backgroundColor: 'rgba(34,197,94,0.12)', padding: '2px 8px', borderRadius: '99px' }}>
              <TrendUp weight="bold" style={{ width: '12px', height: '12px' }} />
              +{variacion}%
            </span>
          )}
          {isNegative && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700, color: '#dc2626', backgroundColor: 'rgba(228,33,83,0.1)', padding: '2px 8px', borderRadius: '99px' }}>
              <TrendDown weight="bold" style={{ width: '12px', height: '12px' }} />
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
