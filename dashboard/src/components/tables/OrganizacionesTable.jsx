import React from 'react';
import DataTable from './DataTable';
import { useData } from '../../context/DataContext';

export default function OrganizacionesTable({ data = [], onItemClick, visibleCols = {}, orderedColumns = [] }) {
  const { talleres, beneficiarios } = useData();

  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return '$ 0';
    return amount.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    });
  };

  const getEspecializacionBadge = (esp) => {
    if (!esp) return null;
    let colorClass = 'bg-superficie-sec text-pizarra';
    if (esp.includes('Textil')) colorClass = 'bg-primario/10 text-primario';
    else if (esp.includes('Aliment') || esp.includes('Agricultura')) colorClass = 'bg-exito/10 text-exito';
    else if (esp.includes('Construcc')) colorClass = 'bg-naranja/10 text-naranja';
    else if (esp.includes('Recicl')) colorClass = 'bg-amarillo/20 text-pizarra';

    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
        {esp}
      </span>
    );
  };

  const getBeneficiariosCount = (orgId) => {
    const count = beneficiarios.filter(b => (b.talleres || []).some(tId => {
      const t = talleres.find(tall => tall.id === tId);
      return t && (t.org_ids || []).includes(orgId);
    })).length;
    return count > 0 ? count : 0;
  };

  const columns = [
    {
      id: 'col1', label: 'Nombre', sortKey: 'nombre', width: 250,
      renderCell: (row) => <span className="font-medium">{row.nombre}</span>
    },
    {
      id: 'col2', label: 'Localización', sortKey: 'localizacion', width: 180,
      renderCell: (row) => (
        <span className="flex items-center gap-1.5 text-pizarra/80">
          <svg className="w-3.5 h-3.5 text-pizarra/40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          {row.localizacion || '-'}
        </span>
      )
    },
    {
      id: 'col7', label: 'Dirección', sortKey: 'direccion', width: 220,
      renderCell: (row) => row.direccion || '-'
    },
    {
      id: 'col3', label: 'Especialización', sortKey: 'especializacion', width: 200,
      renderCell: (row) => getEspecializacionBadge(row.especializacion)
    },
    {
      id: 'col4', label: 'Convenios', sortKey: 'convenios', width: 120,
      headerClassName: 'text-center', cellClassName: 'text-center font-semibold',
      renderCell: (row) => row.convenios || 0
    },
    {
      id: 'col5', label: 'Talleres', sortKey: 'talleres', width: 120,
      headerClassName: 'text-center', cellClassName: 'text-center font-semibold',
      renderCell: (row) => row.talleres || 0
    },
    {
      id: 'col8', label: 'Beneficiarios', sortKey: 'beneficiariosCount', width: 130,
      headerClassName: 'text-center', cellClassName: 'text-center font-semibold text-primario',
      renderCell: (row) => getBeneficiariosCount(row.id) || row.beneficiarios || 0
    },
    {
      id: 'col6', label: 'Presupuesto', sortKey: 'presupuesto', width: 180,
      headerClassName: 'text-right', cellClassName: 'text-right font-bold text-texto',
      renderCell: (row) => formatCurrency(row.presupuesto)
    }
  ];

  return (
    <DataTable 
      data={data}
      columns={columns}
      orderedColumns={orderedColumns}
      visibleCols={visibleCols}
      onItemClick={onItemClick}
      emptyMessage="No se encontraron organizaciones."
    />
  );
}
