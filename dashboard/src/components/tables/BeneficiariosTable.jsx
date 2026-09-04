import React from 'react';
import DataTable from './DataTable';
import { useData } from '../../context/DataContext';

export default function BeneficiariosTable({ data = [], onItemClick, visibleCols = {}, orderedColumns = [] }) {
  const { talleres } = useData();

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    try {
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    } catch (e) {
      return dateStr;
    }
  };

  const getTiempoPrograma = (fechaInicio) => {
    if (!fechaInicio) return '-';
    const inicio = new Date(fechaInicio);
    const hoy = new Date();
    const meses = (hoy.getFullYear() - inicio.getFullYear()) * 12 + (hoy.getMonth() - inicio.getMonth());
    if (meses < 1) return 'Menos de 1 mes';
    if (meses === 1) return '1 mes';
    if (meses < 12) return `${meses} meses`;
    const anios = Math.floor(meses / 12);
    return anios === 1 ? '1 año' : `${anios} años`;
  };

  const columns = [
    {
      id: 'col1', label: 'DNI', sortKey: 'dni', width: 100,
      renderCell: (row) => <span className="font-medium">{row.dni}</span>
    },
    {
      id: 'col2', label: 'Nombre', sortKey: 'nombre', width: 180,
      renderCell: (row) => <span className="font-semibold">{row.nombre}</span>
    },
    {
      id: 'col3', label: 'Organización', sortKey: 'programas', width: 200,
      renderCell: (row) => {
        const org = row.programas || row.organizaciones;
        return (
          <div className="flex flex-wrap" style={{ gap: '4px' }}>
            {org ? (
              org.split(',').map((o, i) => (
                <span key={i} className="bg-primario/10 text-primario text-xs rounded-full inline-block font-medium truncate" style={{ padding: '2px 8px', maxWidth: '100%' }} title={o.trim()}>
                  {o.trim()}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-xs">Sin organización</span>
            )}
          </div>
        );
      }
    },
    {
      id: 'col4', label: 'Talleres', sortKey: 'talleres', width: 200,
      customSort: (a, b, dir) => {
        const aLen = (a.talleres || []).length;
        const bLen = (b.talleres || []).length;
        return dir === 'asc' ? aLen - bLen : bLen - aLen;
      },
      renderCell: (row) => {
        const benTalleres = (row.talleres || []).map(tId => talleres.find(t => t.id === tId)?.nombre).filter(Boolean);
        return (
          <div className="flex flex-wrap" style={{ gap: '4px' }}>
            {benTalleres.length > 0 ? (
              benTalleres.map((o, i) => (
                <span key={i} className="bg-naranja/10 text-naranja text-[10px] rounded-full inline-block font-bold uppercase truncate" style={{ padding: '2px 8px', maxWidth: '100%' }} title={o.trim()}>
                  {o.trim()}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-xs">-</span>
            )}
          </div>
        );
      }
    },
    {
      id: 'col5', label: 'Ingreso', sortKey: 'inicioBeca', width: 120,
      renderCell: (row) => {
        const fecha = row.inicioBeca || row.fechaInicio;
        return <span title={formatDate(fecha)}>{formatDate(fecha)}</span>;
      }
    },
    {
      id: 'col6', label: 'Tiempo de Beca', sortKey: 'inicioBeca', width: 140,
      renderCell: (row) => {
        const fecha = row.inicioBeca || row.fechaInicio;
        const tiempoProg = getTiempoPrograma(fecha);
        return <span className="font-medium" title={tiempoProg}>{tiempoProg}</span>;
      }
    },
    {
      id: 'col7', label: 'Asistencia', sortKey: 'asistencia', width: 100,
      headerClassName: 'text-center',
      cellClassName: (row) => {
        const asistenciaNum = parseInt((row.asistencia || "0").replace('%', ''));
        return `text-center font-bold ${asistenciaNum < 75 ? 'text-naranja' : 'text-texto'}`;
      },
      renderCell: (row) => row.asistencia || '-'
    },
    {
      id: 'col8', label: 'Estado', sortKey: 'estado', width: 120,
      headerClassName: 'text-center',
      headerStyle: { paddingRight: '24px' },
      cellClassName: 'text-center',
      cellStyle: { paddingRight: '24px' },
      renderCell: (row) => {
        return row.estado === 'Activo' ? (
          <span className="inline-flex items-center rounded-full text-xs font-semibold bg-exito/10 text-exito truncate" style={{ padding: '4px 8px', maxWidth: '100%' }}>Activo</span>
        ) : row.estado === 'Egresado' ? (
          <span className="inline-flex items-center rounded-full text-xs font-semibold bg-primario/10 text-primario truncate" style={{ padding: '4px 8px', maxWidth: '100%' }}>Egresado</span>
        ) : (
          <span className="inline-flex items-center rounded-full text-xs font-semibold bg-naranja/10 text-naranja truncate" style={{ padding: '4px 8px', maxWidth: '100%' }}>{row.estado}</span>
        );
      }
    }
  ];

  const rowClassName = (row, index) => {
    const hasAlert = row.estado === 'Suspendido';
    return hasAlert
      ? 'bg-naranja/5 hover:bg-naranja/10'
      : `hover:bg-canvas ${index % 2 === 0 ? '' : 'bg-canvas/50'}`;
  };

  return (
    <DataTable 
      data={data}
      columns={columns}
      orderedColumns={orderedColumns}
      visibleCols={visibleCols}
      onItemClick={onItemClick}
      rowClassName={rowClassName}
      emptyMessage="No se encontraron beneficiarios registrados."
    />
  );
}
