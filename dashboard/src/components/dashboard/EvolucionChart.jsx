import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { evolucionOrgsData } from '../../data/mockData';

export default function EvolucionChart({ animate = true }) {
  return (
    <motion.div 
      initial={animate ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={animate ? { duration: 0.35, delay: 0.05 } : { duration: 0 }}
      className="bg-white rounded-2xl h-full flex flex-col card-elevated" 
      style={{ padding: '24px' }}
    >
      <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
        <h2 className="font-semibold text-pizarra text-base">Evolución de Impacto</h2>
        <span className="text-xs font-medium text-pizarra/50 bg-superficie-sec px-3 py-1 rounded-full">Últimos 12 meses</span>
      </div>
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={evolucionOrgsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6B1330" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#6B1330" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3E1E2" />
            <XAxis dataKey="periodo" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#494963' }} dy={10} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#494963' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: '1px solid #DCD9E2', backgroundColor: '#FFFFFF' }}
              itemStyle={{ fontSize: '13px', fontWeight: 600 }}
              labelStyle={{ fontSize: '12px', color: '#494963', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="beneficiarios" 
              name="Beneficiarios" 
              stroke="#6B1330" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorBen)"
              animationDuration={animate ? 1200 : 0}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
