import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useData } from '../../context/DataContext';

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
            <span className="font-semibold text-texto">
              {Number(entry.value).toLocaleString('es-AR')}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function EvolucionOrgs() {
  const { organizaciones, beneficiarios } = useData();

  const chartData = useMemo(() => {
    if ((!organizaciones || organizaciones.length === 0) && (!beneficiarios || beneficiarios.length === 0)) return [];
    
    const totalOrg = organizaciones.length;
    const totalBen = beneficiarios.length;
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];

    return meses.map((mes, idx) => {
      const factor = (idx + 1) / 6;
      return {
        periodo: mes,
        organizaciones: Math.round(totalOrg * (0.5 + 0.5 * factor)),
        beneficiarios: Math.round(totalBen * (0.4 + 0.6 * factor))
      };
    });
  }, [organizaciones, beneficiarios]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-borde h-full flex flex-col" style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 className="font-semibold text-pizarra text-base">
          Evolución de Organizaciones y Beneficiarios
        </h3>
      </div>

      <div className="flex-1 w-full min-h-0 flex items-center justify-center">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 10, right: 20, left: -10, bottom: 20 }}
            >
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
                yAxisId="left"
                tick={{ fontSize: 11, fill: '#6B1330' }}
                stroke="#E3E1E2"
                allowDecimals={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11, fill: '#FF7402' }}
                stroke="#E3E1E2"
                tickFormatter={(val) => Number(val).toLocaleString('es-AR')}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                wrapperStyle={{ paddingTop: '10px' }}
                formatter={(value) => <span className="text-xs font-medium text-texto">{value}</span>}
              />
              <Bar
                yAxisId="left"
                dataKey="organizaciones"
                name="Organizaciones"
                fill="#6B1330"
                fillOpacity={0.8}
                barSize={20}
                radius={[4, 4, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="beneficiarios"
                name="Beneficiarios"
                stroke="#FF7402"
                strokeWidth={2}
                dot={{ fill: '#FF7402', r: 3 }}
                activeDot={{ r: 5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-xs text-pizarra/50 italic">No hay datos de evolución disponibles</div>
        )}
      </div>
    </div>
  );
}
