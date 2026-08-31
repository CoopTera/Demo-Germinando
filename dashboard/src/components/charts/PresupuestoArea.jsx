import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { presupuestoData } from '../../data/mockData';

const formatCurrency = (val) => {
  const formatted = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(val);
  return formatted.replace(/\$\s*/g, '$\u00A0');
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-xl card-elevated text-xs font-sans">
        <p className="font-semibold text-pizarra mb-2 border-b border-borde pb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4 py-1">
            <span className="flex items-center gap-1.5 text-texto font-normal">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: entry.stroke || entry.color }}
              />
              {entry.name}:
            </span>
            <span className="font-semibold text-texto whitespace-nowrap">
              {formatCurrency(entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function PresupuestoArea() {
  return (
    <div className="bg-white rounded-2xl card-elevated" style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 className="font-semibold text-pizarra text-base">
          Evolución de Presupuesto Ejecutado
        </h3>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={presupuestoData}
            margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
          >
            <defs>
              <linearGradient id="gradAsignado" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EAE9EE" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#EAE9EE" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gradEjecutado" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6B1330" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6B1330" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E3E1E2" vertical={false} />
            <XAxis
              dataKey="periodo"
              tick={{ fontSize: 11, fill: '#494963' }}
              angle={-45}
              textAnchor="end"
              height={60}
              stroke="#E3E1E2"
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#494963' }}
              stroke="#E3E1E2"
              tickFormatter={(val) => `$${(val / 1000000).toFixed(val % 1000000 === 0 ? 0 : 1)}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ paddingTop: '10px' }}
              formatter={(value) => <span className="text-xs font-medium text-texto">{value}</span>}
            />
            <Area
              type="monotone"
              dataKey="asignado"
              name="Presupuesto Asignado"
              stroke="#494963"
              strokeWidth={1.5}
              fillOpacity={1}
              fill="url(#gradAsignado)"
            />
            <Area
              type="monotone"
              dataKey="ejecutado"
              name="Presupuesto Ejecutado"
              stroke="#6B1330"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#gradEjecutado)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

