import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from '@phosphor-icons/react';

// Color palette per card type — subtle but distinct
const ACCENT_COLORS = [
  { bg: '#EEF2FF', text: '#3C3AE5', border: 'rgba(60,58,229,0.15)', hover: '#E0E7FF' }, // azul — beneficiarios
  { bg: '#FFF7ED', text: '#C2530A', border: 'rgba(255,116,2,0.15)', hover: '#FFEDD5' }, // naranja — convenios
  { bg: '#F0FDF4', text: '#166534', border: 'rgba(34,197,94,0.12)', hover: '#DCFCE7' }, // verde — organizaciones
  { bg: '#F5F3FF', text: '#6D28D9', border: 'rgba(109,40,217,0.12)', hover: '#EDE9FE' }, // violeta — talleres
];

export default function KPICard({ titulo, valor, variacion, periodo, presupuesto, index = 0 }) {
  const isPositive = typeof variacion === 'number' ? variacion > 0 : false;
  const isNegative = typeof variacion === 'number' ? variacion < 0 : false;
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -4, backgroundColor: accent.hover, transition: { duration: 0.18 } }}
      style={{
        backgroundColor: accent.bg,
        border: `1.5px solid ${accent.border}`,
        borderRadius: '14px',
        minHeight: '180px',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '28px 28px 24px', display: 'flex', flexDirection: 'column', height: '100%', gap: '8px' }}>
        {/* Title */}
        <h2 style={{ fontSize: '11px', fontWeight: 700, color: accent.text, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.85 }}>
          {titulo}
        </h2>

        {/* Big number */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', marginTop: '8px' }}>
          <span style={{ fontSize: '3rem', fontWeight: 800, color: '#1a1a2e', lineHeight: 1, letterSpacing: '-0.03em' }}>
            {valor}
          </span>
        </div>

        {/* Presupuesto bar — only for the budget card */}
        {presupuesto && (
          <div style={{ marginTop: '4px', marginBottom: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>Ejecutado</span>
              <span style={{ fontSize: '12px', color: accent.text, fontWeight: 700 }}>{presupuesto.porcentaje}%</span>
            </div>
            <div style={{ height: '5px', borderRadius: '99px', backgroundColor: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${presupuesto.porcentaje}%` }}
                transition={{ duration: 0.8, delay: index * 0.08 + 0.3, ease: 'easeOut' }}
                style={{ height: '100%', backgroundColor: accent.text, borderRadius: '99px' }}
              />
            </div>
          </div>
        )}

        {/* Variation pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
          {isPositive && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700, color: '#16a34a', backgroundColor: 'rgba(34,197,94,0.12)', padding: '3px 10px', borderRadius: '99px' }}>
              <TrendingUp weight="bold" style={{ width: '12px', height: '12px' }} />
              +{variacion}%
            </span>
          )}
          {isNegative && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700, color: '#dc2626', backgroundColor: 'rgba(228,33,83,0.1)', padding: '3px 10px', borderRadius: '99px' }}>
              <TrendingDown weight="bold" style={{ width: '12px', height: '12px' }} />
              {variacion}%
            </span>
          )}
          {periodo && (
            <span style={{ fontSize: '11px', color: '#9ca3af' }}>{periodo}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
