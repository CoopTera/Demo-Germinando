import React, { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useData } from '../../context/DataContext';

const COLORS = ['#6B1330', '#FF7402', '#494963', '#FFCB02', '#E42153', '#22C55E', '#8B5CF6'];

export default function EspecialidadChart() {
  const { organizaciones } = useData();

  const chartData = useMemo(() => {
    if (!organizaciones || organizaciones.length === 0) return [];
    const counts = {};
    organizaciones.forEach(org => {
      const esp = org.especializacion || 'Sin Especificar';
      counts[esp] = (counts[esp] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [organizaciones]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded-lg shadow-md border border-borde text-xs font-sans" style={{ padding: '8px 12px' }}>
          <p className="font-semibold text-pizarra">{payload[0].name}</p>
          <p className="text-texto font-normal mt-1">
            <span className="font-bold">{payload[0].value}</span> organizaciones
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-borde h-full flex flex-col" style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 className="font-semibold text-pizarra text-base">
          Distribución por Especialización
        </h3>
      </div>

      <div className="flex-1 w-full min-h-0 flex items-center justify-center relative">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{ fontSize: '11px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-xs text-pizarra/50 italic">No hay datos de organizaciones</div>
        )}
      </div>
    </div>
  );
}
