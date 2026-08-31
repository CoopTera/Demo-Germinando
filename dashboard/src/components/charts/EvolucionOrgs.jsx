import React from 'react';
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
import { evolucionOrgsData } from '../../data/mockData';

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
  return (
    <div className="bg-white rounded-2xl card-elevated" style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 className="font-semibold text-pizarra text-base">
          Evolución de Organizaciones y Beneficiarios
        </h3>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={evolucionOrgsData}
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
      </div>
    </div>
  );
}


