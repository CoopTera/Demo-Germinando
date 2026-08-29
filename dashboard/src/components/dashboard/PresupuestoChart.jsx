import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CurrencyDollar } from '@phosphor-icons/react';
import AnimatedCounter from '../common/AnimatedCounter';

const data = [
  { name: 'Ejecutado', value: 85 },
  { name: 'Disponible', value: 15 }
];
const COLORS = ['#FF7402', '#EAE9EE'];

export default function PresupuestoChart({ animate = true }) {
  return (
    <motion.div 
      initial={animate ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={animate ? { duration: 0.35, delay: 0.1 } : { duration: 0 }}
      className="bg-white rounded-md shadow-sm border border-borde h-full flex flex-col card-elevated" 
      style={{ padding: '24px' }}
    >
      <div className="flex items-center" style={{ gap: '10px', marginBottom: '24px' }}>
        <CurrencyDollar weight="duotone" className="w-5 h-5 text-pizarra" />
        <h2 className="font-semibold text-pizarra text-base">Presupuesto</h2>
      </div>
      <div className="flex-1 w-full relative min-h-[200px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              startAngle={90}
              endAngle={-270}
              animationDuration={animate ? 1200 : 0}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `${value}%`}
              contentStyle={{ borderRadius: '8px', border: '1px solid #E3E1E2', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-texto">
            <AnimatedCounter value={85} suffix="%" animate={animate} />
          </span>
          <span className="text-[11px] font-semibold text-pizarra/60 uppercase tracking-wider">Ejecutado</span>
        </div>
      </div>
      <div className="flex justify-between items-center" style={{ marginTop: '16px' }}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-naranja" />
          <span className="text-xs text-texto font-medium">Ejecutado (85%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-superficie-sec" />
          <span className="text-xs text-texto font-medium">Disponible (15%)</span>
        </div>
      </div>
    </motion.div>
  );
}
