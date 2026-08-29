import React, { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useData } from '../../context/DataContext';
import { organizacionesData } from '../../data/mockData';

const COLORS = ['#3C3AE5', '#FF7402', '#494963', '#FFCB02', '#E42153', '#22C55E', '#8B5CF6'];

export default function EspecialidadChart() {
  const { organizaciones } = useData();
  const displayData = organizaciones && organizaciones.length > 0 ? organizaciones : organizacionesData;

  const chartData = useMemo(() => {
    const counts = {};
    displayData.forEach(org => {
      const esp = org.especializacion || 'Sin Especificar';
      counts[esp] = (counts[esp] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [displayData]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow border border-borde text-xs">
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
    <div className="bg-white rounded-xl shadow-sm border border-borde" style={{ padding: '20px' }}>
      <div className="mb-4">
        <h3 className="font-semibold text-pizarra text-base">
          Distribución por Especialización
        </h3>
      </div>

      <div style={{ height: '300px', width: '100%' }}>
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
      </div>
    </div>
  );
}

