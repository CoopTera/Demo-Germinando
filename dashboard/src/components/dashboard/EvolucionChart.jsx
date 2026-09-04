import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useData } from '../../context/DataContext';

export default function EvolucionChart({ animate = true }) {
  const { beneficiarios, organizaciones } = useData();
  const [rango, setRango] = useState(12);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = [
    { value: 3, label: 'Últimos 3 meses' },
    { value: 6, label: 'Últimos 6 meses' },
    { value: 9, label: 'Últimos 9 meses' },
    { value: 12, label: 'Últimos 12 meses' }
  ];

  const chartData = useMemo(() => {
    if (!beneficiarios || beneficiarios.length === 0) return [];
    
    // Generar buckets dinámicos basados en la cantidad de beneficiarios y organizaciones
    const totalBen = beneficiarios.length;
    const totalOrg = organizaciones.length;
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    return meses.map((mes, idx) => {
      const factor = (idx + 1) / 12;
      return {
        periodo: mes,
        beneficiarios: Math.round(totalBen * (0.3 + 0.7 * factor)),
        organizaciones: Math.round(totalOrg * (0.4 + 0.6 * factor))
      };
    }).slice(-rango);
  }, [beneficiarios, organizaciones, rango]);

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
        {chartData.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-xs font-medium text-pizarra/80 bg-superficie-sec border border-borde outline-none cursor-pointer hover:bg-canvas transition-all rounded-full flex items-center justify-between"
              style={{ padding: '4px 12px', minWidth: '130px' }}
            >
              {options.find(o => o.value === rango)?.label}
              <svg xmlns="http://www.w3.org/2000/svg" className={`w-3 h-3 ml-2 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1 w-full min-w-[130px] bg-white border border-borde rounded-xl shadow-lg z-50 overflow-hidden py-1">
                  {options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setRango(opt.value);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
                        rango === opt.value 
                          ? 'bg-primario/10 text-primario' 
                          : 'text-pizarra hover:bg-superficie-sec hover:text-texto'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <div className="flex-1 w-full min-h-[250px] flex items-center justify-center">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
        ) : (
          <div className="text-xs text-pizarra/50 italic">No hay datos de evolución para mostrar</div>
        )}
      </div>
    </motion.div>
  );
}
