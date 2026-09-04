import React from 'react';
import DataTable from '../tables/DataTable';

const VinculosTable = ({ data, programas, onItemClick }) => {
  const columns = [
    {
      id: 'titulo',
      label: 'Título',
      sortKey: 'titulo',
      width: '250px',
      renderCell: (row) => (
        <span className="font-semibold text-[#2D2D3A] truncate block w-[230px]" title={row.titulo}>
          {row.titulo}
        </span>
      )
    },
    {
      id: 'programa',
      label: 'Programa',
      sortKey: 'programa_id',
      renderCell: (row) => {
        const prog = programas.find(p => p.id === row.programa_id) || { nombre: 'Desconocido', color: '#888' };
        return (
          <div 
            className="inline-block px-2 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: `${prog.color}1A`, color: prog.color }}
          >
            {prog.nombre}
          </div>
        );
      }
    },
    {
      id: 'area',
      label: 'Área',
      renderCell: (row) => {
        const prog = programas.find(p => p.id === row.programa_id) || {};
        return <span className="text-[#494963] text-sm">{prog.area || '-'}</span>;
      }
    },
    {
      id: 'nivel',
      label: 'Nivel',
      renderCell: (row) => {
        const prog = programas.find(p => p.id === row.programa_id) || {};
        const isProv = prog.nivel === 'Provincial';
        return (
          <span className={`px-2 py-1 rounded text-xs font-medium ${isProv ? 'bg-[#6B1330]/10 text-[#6B1330]' : 'bg-[#FF7402]/10 text-[#FF7402]'}`}>
            {prog.nivel || '-'}
          </span>
        );
      }
    },
    {
      id: 'tipo',
      label: 'Tipo',
      sortKey: 'tipo',
      renderCell: (row) => <span className="text-[#494963] text-sm">{row.tipo}</span>
    },
    {
      id: 'estado',
      label: 'Estado',
      sortKey: 'estado',
      renderCell: (row) => {
        let colors = 'bg-gray-100 text-gray-500';
        if (row.estado === 'Vigente') colors = 'bg-[#22C55E]/10 text-[#22C55E]';
        else if (row.estado === 'En Negociación') colors = 'bg-[#FF7402]/10 text-[#FF7402]';
        else if (row.estado === 'Finalizado') colors = 'bg-[#494963]/10 text-[#494963]';
        else if (row.estado === 'Suspendido') colors = 'bg-[#E42153]/10 text-[#E42153]';
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors}`}>
            {row.estado}
          </span>
        );
      }
    },
    {
      id: 'periodo',
      label: 'Período',
      sortKey: 'fechaInicio',
      renderCell: (row) => (
        <span className="text-[#494963] text-xs whitespace-nowrap">
          {new Date(row.fechaInicio).toLocaleDateString()} → <br /> {new Date(row.fechaFin).toLocaleDateString()}
        </span>
      )
    },
    {
      id: 'presupuesto',
      label: 'Presupuesto',
      sortKey: 'presupuestoAsignado',
      renderCell: (row) => (
        <span className="text-[#2D2D3A] font-medium text-sm">
          {row.presupuestoAsignado ? row.presupuestoAsignado.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }) : '-'}
        </span>
      )
    },
    {
      id: 'ejecucion',
      label: 'Ejecución',
      renderCell: (row) => {
        if (!row.presupuestoAsignado) return <span className="text-gray-400">-</span>;
        const pct = (row.presupuestoEjecutado / row.presupuestoAsignado) * 100;
        const prog = programas.find(p => p.id === row.programa_id) || { color: '#888' };
        
        return (
          <div className="flex items-center gap-2 w-24">
            <div className="h-1.5 w-full bg-[#EBEDF2] rounded-full overflow-hidden flex-1">
              <div 
                className="h-full rounded-full" 
                style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: prog.color }}
              ></div>
            </div>
            <span className="text-xs font-medium text-[#494963]">{pct.toFixed(0)}%</span>
          </div>
        );
      }
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E2E4EB] overflow-hidden">
      <DataTable data={data} columns={columns} onRowClick={onItemClick} />
    </div>
  );
};

export default VinculosTable;
