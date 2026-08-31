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
        <div className="bg-white p-3 rounded-xl card-elevated text-xs">
          <p className="font-semibold text-pizarra">{payload[0].name}</p>
          <p className="text-texto font-normal mt-1">
            <span className="font-bold">{payload[0].value}</span> beneficiarios
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl card-elevated" style={{ padding: '20px' }}>
      <div className="mb-4">
        <h3 className="font-semibold text-pizarra text-base">
          Estado de Beneficiarios
        </h3>
      </div>

      <div style={{ height: '300px', width: '100%' }}>
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

