import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { periodo: '2021', beneficiarios: 420 },
  { periodo: '2022', beneficiarios: 870 },
  { periodo: '2023', beneficiarios: 1450 },
  { periodo: '2024', beneficiarios: 2200 },
  { periodo: '2025', beneficiarios: 2847 },
  { periodo: '2026 (proy.)', beneficiarios: 3500 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-borde text-xs font-sans" style={{ padding: '12px' }}>
        <p className="font-semibold text-pizarra mb-2 border-b border-borde pb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4 py-1">
            <span className="flex items-center gap-1.5 text-texto font-normal">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}:
            </span>
            <span className="font-bold font-mono text-texto">
              {Number(entry.value).toLocaleString('es-AR')}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function CrecimientoBeneficiarios() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-borde h-full flex flex-col" style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 className="font-semibold text-pizarra text-base">
          Crecimiento Interanual de Beneficiarios
        </h3>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EAE9EE" vertical={false} />
            <XAxis
              dataKey="periodo"
              tick={{ fontSize: 11, fill: '#494963' }}
              tickLine={false}
              axisLine={{ stroke: '#EAE9EE' }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => v.toLocaleString('es-AR')}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(107,19,48,0.05)' }} />
            <Bar
              dataKey="beneficiarios"
              fill="#6B1330"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
