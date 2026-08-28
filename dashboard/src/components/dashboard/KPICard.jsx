import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function KPICard({ titulo, valor, variacion, periodo, icono: Icon, index = 0 }) {
  const isPositive = typeof variacion === 'number' ? variacion > 0 : false;
  const isNegative = typeof variacion === 'number' ? variacion < 0 : false;
  const formattedValue = typeof valor === 'number' ? valor.toLocaleString('es-AR') : valor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="relative bg-white rounded-md overflow-hidden gradient-border-top card-elevated min-h-[140px]"
    >
      <div className="relative flex flex-col justify-between h-full gap-4" style={{ padding: '24px' }}>
        {/* Top: Title */}
        <div className="flex justify-between items-start">
          <h2 className="text-sm font-semibold text-pizarra/80 uppercase tracking-wider">{titulo}</h2>
        </div>

        {/* Value */}
        <div className="flex-1 flex items-center mt-2">
          <span className="text-3xl font-bold text-texto leading-none tracking-tight">
            {valor}
          </span>
        </div>

        {/* Variation pill */}
        <div className="flex items-center" style={{ gap: '8px', marginTop: '8px' }}>
          {isPositive && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-exito bg-exito/10 px-2.5 py-1 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="sr-only">Incremento del </span>
              +{variacion}%
            </span>
          )}
          {isNegative && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-critico bg-critico/10 px-2.5 py-1 rounded-full">
              <TrendingDown className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="sr-only">Reducción del </span>
              {variacion}%
            </span>
          )}
          {!isPositive && !isNegative && variacion !== undefined && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-pizarra bg-superficie-sec px-2.5 py-1 rounded-full">
              {variacion}%
            </span>
          )}
          {periodo && <span className="text-xs text-pizarra/50">{periodo}</span>}
        </div>
      </div>
    </motion.div>
  );
}

