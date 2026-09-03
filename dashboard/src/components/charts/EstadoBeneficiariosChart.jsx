import React, { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useData } from '../../context/DataContext';
import { beneficiariosData } from '../../data/mockData';

const COLORS = ['#22C55E', '#E42153']; // Verde para Activos, Rojo para Sin seguimiento

export default function EstadoBeneficiariosChart() {
  const { beneficiarios } = useData();
  const displayData = beneficiarios && beneficiarios.length > 0 ? beneficiarios : beneficiariosData;

  const chartData = useMemo(() => {
    let activos = 0;
    let inactivos = 0;
    displayData.forEach(b => {
      const isSinSeguimiento = b.alerta || b.estado === 'Sin seguimiento';
      if (isSinSeguimiento) inactivos++;
      else activos++;
    });

    return [
      { name: 'Activos', value: activos },
      { name: 'Sin seguimiento', value: inactivos }
    ];
  }, [displayData]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded-lg shadow-md border border-borde text-xs font-sans" style={{ padding: '8px 12px' }}>
          <p className="font-semibold text-pizarra">{payload[0].name}</p>
          <p className="text-texto mt-1">
            <span className="font-bold">{payload[0].value}</span> beneficiarios
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
          Estado de Beneficiarios
        </h3>
      </div>

      <div className="flex-1 w-full min-h-0 flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ fontSize: '11px', paddingTop: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

