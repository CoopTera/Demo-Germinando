import { formatDate } from "../../utils/formatters";
import React from 'react';
import DataTable from './DataTable';
import { useNavigate } from 'react-router-dom';

export default function TalleresTable({ data = [], onItemClick, visibleCols = {}, orderedColumns = [], getOrgName }) {
  const navigate = useNavigate();

  const columns = [
    {
      id: 'col1', label: 'Nombre del Taller', sortKey: 'nombre', width: 250,
      renderCell: (row) => <span className="font-semibold">{row.nombre}</span>
    },
    {
      id: 'col2', label: 'Organización a Cargo', sortKey: 'org_ids', width: 250,
      customSort: (a, b, dir) => {
        const aOrg = getOrgName(a.org_ids?.[0] || '');
        const bOrg = getOrgName(b.org_ids?.[0] || '');
        if (aOrg < bOrg) return dir === 'asc' ? -1 : 1;
        if (aOrg > bOrg) return dir === 'asc' ? 1 : -1;
        return 0;
      },
      renderCell: (row) => (
        <div className="flex flex-wrap" style={{ gap: '4px' }}>
          {(row.org_ids || []).map((id, i) => (
            <span 
              key={i} 
              className="bg-primario/10 text-primario text-xs rounded-full inline-block font-medium truncate hover:bg-primario/20 transition-colors cursor-pointer" 
              style={{ padding: '2px 8px', maxWidth: '100%' }} 
              onClick={(e) => { 
                e.stopPropagation(); 
                navigate('/organizaciones', { state: { filterOrg: getOrgName(id) } }); 
              }} 
              title={getOrgName(id)}
            >
              {getOrgName(id)}
            </span>
          ))}
        </div>
      )
    },
    {
      id: 'col4', label: 'Inscriptos', sortKey: 'inscriptos', width: 130,
      headerClassName: 'text-center', cellClassName: 'text-center font-bold',
      renderCell: (row) => row.inscriptos
    },
    {
      id: 'col3', label: 'Cupo Máximo', sortKey: 'cupo', width: 130,
      headerClassName: 'text-center', cellClassName: 'text-center font-bold',
      renderCell: (row) => row.cupo
    },
    {
      id: 'col6', label: 'Fecha Inicio', sortKey: 'fechaInicio', width: 130,
      headerClassName: 'text-center', cellClassName: 'text-center',
      renderCell: (row) => formatDate(row.fechaInicio)
    },
    {
      id: 'col7', label: 'Fecha Cierre', sortKey: 'fechaFin', width: 130,
      headerClassName: 'text-center', cellClassName: 'text-center',
      renderCell: (row) => formatDate(row.fechaFin)
    },
    {
      id: 'col5', label: 'Estado', sortKey: 'estado', width: 130,
      headerClassName: 'text-center', cellClassName: 'text-center',
      renderCell: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${row.estado === 'En curso' ? 'bg-primario/10 text-primario' : row.estado === 'Finalizado' ? 'bg-pizarra/10 text-pizarra' : 'bg-exito/10 text-exito'}`}>
          {row.estado}
        </span>
      )
    }
  ];

  return (
    <DataTable 
      data={data}
      columns={columns}
      orderedColumns={orderedColumns}
      visibleCols={visibleCols}
      onItemClick={onItemClick}
      emptyMessage="No se encontraron talleres."
    />
  );
}
