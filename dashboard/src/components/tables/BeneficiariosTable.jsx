import { formatDate } from "../../utils/formatters";
import React from 'react';
import DataTable from './DataTable';
import { useData } from '../../context/DataContext';

export default function BeneficiariosTable({ data = [], onItemClick, visibleCols = {}, orderedColumns = [] }) {
  const { talleres, organizaciones } = useData();

  const getTiempoPrograma = (fechaInicio) => {
    if (!fechaInicio) return '-';
    const inicio = new Date(fechaInicio);
    const hoy = new Date();
    const meses = (hoy.getFullYear() - inicio.getFullYear()) * 12 + (hoy.getMonth() - inicio.getMonth());
    if (meses < 1) return 'Menos de 1 mes';
    const anios = Math.floor(meses / 12);
    const mesesRest = meses % 12;
    if (anios === 0) return `${meses} meses`;
    if (mesesRest === 0) return `${anios} ${anios === 1 ? 'año' : 'años'}`;
    return `${anios} ${anios === 1 ? 'año' : 'años'} y ${mesesRest} m.`;
  };

  const columns = [
    {
      id: 'col2', label: 'Nombre', sortKey: 'nombre', width: 180,
      renderCell: (row) => <span className="font-semibold text-texto">{row.nombre}</span>
    },
    {
      id: 'col1', label: 'DNI', sortKey: 'dni', width: 100,
      renderCell: (row) => <span className="font-mono text-xs text-pizarra/70">{row.dni}</span>
    },
    {
      id: 'col3', label: 'Organización', sortKey: 'programas', width: 200,
      renderCell: (row) => {
        const benOrgs = new Set();
        (row.talleres || []).forEach(tId => {
          const t = talleres.find(t => t.id === tId);
          if (t && t.org_ids) {
            t.org_ids.forEach(oId => {
              const o = organizaciones.find(org => org.id === oId);
              if (o) benOrgs.add(o.nombre);
            });
          }
        });
        const orgNames = Array.from(benOrgs);

        return (
          <div className="flex flex-wrap" style={{ gap: '4px' }}>
            {orgNames.length > 0 ? (
              orgNames.map((o, i) => (
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
      id: 'col9', label: 'Localización', sortKey: 'localizacion', width: 160,
      renderCell: (row) => row.localizacion || '-'
    },
    {
      id: 'col10', label: 'Dirección', sortKey: 'direccion', width: 200,
      renderCell: (row) => row.direccion || '-'
    },
    {
      id: 'col5', label: 'Fecha de Ingreso', sortKey: 'inicioBeca', width: 120,
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
      id: 'col7', label: 'Asistencia ($)', sortKey: 'asistencia', width: 120,
      headerClassName: 'text-right', cellClassName: 'text-right font-semibold',
      renderCell: (row) => {
        const monto = row.presupuestoBeca || row.monto;
        return typeof monto === 'number' ? `$ ${monto.toLocaleString('es-AR')}` : '-';
      }
    },
    {
      id: 'col8', label: 'Estado', sortKey: 'estado', width: 120,
      headerClassName: 'text-center', cellClassName: 'text-center',
      renderCell: (row) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${row.alerta || row.estado === 'Sin seguimiento' ? 'bg-naranja/10 text-naranja' : row.estado === 'Suspendido' ? 'bg-critico/10 text-critico' : 'bg-exito/10 text-exito'}`}>
          {row.estado || (row.alerta ? 'Sin seguimiento' : 'Activo')}
        </span>
      )
    }
  ];

  const rowClassName = (row, index) => {
    const isAlert = row.alerta || row.estado === 'Sin seguimiento';
    return `border-b border-borde hover:bg-canvas cursor-pointer transition-colors ${
      isAlert ? 'bg-naranja/5' : index % 2 !== 0 ? 'bg-canvas/50' : ''
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
      emptyMessage="No se encontraron beneficiarios."
    />
  );
}
