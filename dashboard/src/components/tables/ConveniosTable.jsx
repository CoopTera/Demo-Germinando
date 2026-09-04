import { formatDate } from "../../utils/formatters";
import React from 'react';
import DataTable from './DataTable';

export default function ConveniosTable({ data = [], onItemClick, visibleCols = {}, orderedColumns = [], getOrgName }) {
  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return '$ 0';
    return amount.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    });
  };

  const columns = [
    {
      id: 'col1', label: 'Nombre', sortKey: 'nombre', width: 250,
      renderCell: (row) => <span className="font-semibold" title={row.nombre}>{row.nombre}</span>
    },
    {
      id: 'col2', label: 'Organización Vinculada', sortKey: 'org_id', width: 250,
      customSort: (a, b, dir) => {
        const aOrg = getOrgName(a.org_id);
        const bOrg = getOrgName(b.org_id);
        if (aOrg < bOrg) return dir === 'asc' ? -1 : 1;
        if (aOrg > bOrg) return dir === 'asc' ? 1 : -1;
        return 0;
      },
      renderCell: (row) => {
        const orgName = getOrgName(row.org_id);
        return (
          <span className="bg-primario/10 text-primario text-xs rounded-full inline-block font-medium truncate" style={{ padding: '2px 8px', maxWidth: '100%' }} title={orgName}>
            {orgName}
          </span>
        );
      }
    },
    {
      id: 'col4', label: 'Firma', sortKey: 'fechaFirma', width: 120,
      renderCell: (row) => formatDate(row.fechaFirma)
    },
    {
      id: 'col5', label: 'Vencimiento', sortKey: 'fechaVencimiento', width: 120,
      cellClassName: (row) => {
        const parts = formatDate(row.fechaVencimiento).split('/');
        const isExpiring = parts.length === 3 && parts[0] === '2024';
        return isExpiring ? 'text-naranja font-bold' : '';
      },
      renderCell: (row) => formatDate(row.fechaVencimiento)
    },
    {
      id: 'col3', label: 'Monto', sortKey: 'monto', width: 150,
      headerClassName: 'text-right', cellClassName: 'text-right font-bold',
      renderCell: (row) => formatCurrency(row.monto)
    },
    {
      id: 'col6', label: 'Estado', sortKey: 'estado', width: 120,
      headerClassName: 'text-center', cellClassName: 'text-center',
      renderCell: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${row.estado === 'Activo' ? 'bg-exito/10 text-exito' : 'bg-naranja/10 text-naranja'}`}>
          {row.estado}
        </span>
      )
    }
  ];

  const rowClassName = (row, index) => {
    const parts = formatDate(row.fechaVencimiento).split('/');
    const isExpiring = parts.length === 3 && parts[0] === '2024';
    return `border-b border-borde hover:bg-canvas cursor-pointer transition-colors ${
      isExpiring ? 'bg-naranja/5' : index % 2 !== 0 ? 'bg-canvas/50' : ''
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
      emptyMessage="No se encontraron convenios."
    />
  );
}
