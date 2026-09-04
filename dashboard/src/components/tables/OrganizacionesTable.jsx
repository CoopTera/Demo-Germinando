import React from 'react';
import DataTable from './DataTable';

export default function OrganizacionesTable({ data = [], onItemClick, visibleCols = {}, orderedColumns = [] }) {
  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return '$ 0';
    return amount.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    });
  };

  const getEspecializacionBadgeClass = (esp) => {
    if (!esp) return 'bg-superficie-sec text-pizarra';
    if (esp.includes('Textil')) return 'bg-primario/10 text-primario';
    if (esp.includes('Alimentar')) return 'bg-exito/10 text-exito';
    if (esp.includes('Construcc')) return 'bg-naranja/10 text-naranja';
    return 'bg-superficie-sec text-pizarra';
  };

  const columns = [
    {
      id: 'col1', label: 'Nombre', sortKey: 'nombre', width: 250,
      renderCell: (row) => <span className="font-medium">{row.nombre}</span>
    },
    {
      id: 'col2', label: 'Localización', sortKey: 'localizacion', width: 200,
      renderCell: (row) => <span className="text-pizarra/80 font-medium">{row.localizacion}</span>
    },
    {
      id: 'col3', label: 'Especialización', sortKey: 'especializacion', width: 200,
      renderCell: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getEspecializacionBadgeClass(row.especializacion)}`}>
          {row.especializacion}
        </span>
      )
    },
    {
      id: 'col4', label: 'Convenios', sortKey: 'convenios', width: 120,
      headerClassName: 'text-center', cellClassName: 'text-center font-bold',
      renderCell: (row) => row.convenios
    },
    {
      id: 'col5', label: 'Talleres', sortKey: 'talleres', width: 120,
      headerClassName: 'text-center', cellClassName: 'text-center font-bold',
      renderCell: (row) => row.talleres
    },
    {
      id: 'col6', label: 'Presupuesto', sortKey: 'presupuesto', width: 180,
      headerClassName: 'text-right', cellClassName: 'text-right font-semibold',
      renderCell: (row) => formatCurrency(row.presupuesto)
    }
  ];

  const rowClassName = (row, index) => {
    return `row-hover-accent relative transition-all cursor-pointer hover:bg-superficie-sec/50 ${
      index % 2 === 0 ? '' : 'bg-canvas/50'
    }`;
  };

  return (
    <DataTable 
      data={data}
      columns={columns}
      orderedColumns={orderedColumns}
      visibleCols={visibleCols}
      onItemClick={onItemClick}
      rowClassName={rowClassName}
      emptyMessage="No se encontraron organizaciones registradas."
    />
  );
}
