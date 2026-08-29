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
      <div className="bg-white p-3 rounded-lg shadow border border-borde text-xs">
        <p className="font-semibold text-pizarra">{label}</p>
        <p className="text-texto font-normal mt-1">
          <span className="font-bold">{payload[0].value.toLocaleString('es-AR')}</span> beneficiarios
        </p>
      </div>
    );
  }
  return null;
};

export default function CrecimientoBeneficiarios() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-borde" style={{ padding: '20px' }}>
      <div className="mb-4">
        <h3 className="font-semibold text-pizarra text-base">
          Crecimiento Interanual de Beneficiarios
        </h3>
      </div>

      <div style={{ height: '300px', width: '100%' }}>
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
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(60,58,229,0.05)' }} />
            <Bar
              dataKey="beneficiarios"
              fill="#3C3AE5"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
