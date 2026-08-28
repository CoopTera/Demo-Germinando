import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { evolucionOrgsData } from '../../data/mockData';
import { TrendUp } from '@phosphor-icons/react';

export default function EvolucionChart() {
  return (
    <div className="bg-white rounded-md shadow-sm border border-borde h-full flex flex-col card-elevated" style={{ padding: '24px' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
        <div className="flex items-center" style={{ gap: '10px' }}>
          <TrendUp weight="duotone" className="w-5 h-5 text-pizarra" />
          <h2 className="font-semibold text-pizarra text-base">Evolución de Impacto</h2>
        </div>
        <span className="text-xs font-medium text-pizarra/50 bg-superficie-sec px-3 py-1 rounded-full">Últimos 12 meses</span>
      </div>
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={evolucionOrgsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3C3AE5" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3C3AE5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3E1E2" />
            <XAxis dataKey="periodo" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#494963' }} dy={10} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#494963' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontSize: '13px', fontWeight: 600 }}
              labelStyle={{ fontSize: '12px', color: '#494963', marginBottom: '4px' }}
            />
            <Area type="monotone" dataKey="beneficiarios" name="Beneficiarios" stroke="#3C3AE5" strokeWidth={3} fillOpacity={1} fill="url(#colorBen)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


