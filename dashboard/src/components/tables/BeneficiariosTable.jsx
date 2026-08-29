import React from 'react';
import { Warning } from '@phosphor-icons/react';
import { useTableResize } from '../../hooks/useTableResize';
import { useTableSort } from '../../hooks/useTableSort';
import SortableHeader from './SortableHeader';
import { useData } from '../../context/DataContext';

export default function BeneficiariosTable({ data = [], onItemClick }) {
  const { talleres } = useData();
  const { widths, startResize } = useTableResize({
    col1: 100, col2: 180, col3: 200, col4: 200, col5: 120, col6: 140, col7: 100, col8: 120
  });

  const { sortedData, sortConfig, requestSort } = useTableSort(data);

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    if (typeof dateStr === 'string' && dateStr.includes('/')) return dateStr;
    if (typeof dateStr === 'string' && dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        return new Date(year, month, day).toLocaleDateString('es-AR');
      }
    }
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString('es-AR');
  };

  const getTiempoPrograma = (dateStr) => {
    if (!dateStr) return '-';
    let date;
    if (typeof dateStr === 'string' && dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        date = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      }
    }
    if (!date) date = new Date(dateStr);
    if (isNaN(date.getTime())) return '-';
    
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return `${diffDays} días`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `${diffMonths} meses`;
    const diffYears = Math.floor(diffMonths / 12);
    const extraMonths = diffMonths % 12;
    return extraMonths > 0 ? `${diffYears}a ${extraMonths}m` : `${diffYears} años`;
  };

  const cellStyle = (width, extraPadding = {}) => ({
    width: `${width}px`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    padding: '16px 20px',
    ...extraPadding
  });

  const Resizer = ({ colKey }) => (
    <div 
      onMouseDown={(e) => startResize(e, colKey)}
      style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '4px', cursor: 'col-resize', backgroundColor: '#E3E1E2', zIndex: 10
      }}
      onMouseEnter={(e) => e.target.style.backgroundColor = '#3C3AE5'}
      onMouseLeave={(e) => e.target.style.backgroundColor = '#E3E1E2'}
    />
  );

  const thStyle = (width, extraPadding = {}) => ({
    ...cellStyle(width, { padding: '12px 20px', ...extraPadding }),
    position: 'relative',
    userSelect: 'none'
  });

  return (
    <div className="bg-white rounded-xl card-elevated animate-fade-in-up border border-borde overflow-hidden">
      <div className="overflow-x-auto">
        <table className="text-left border-collapse" style={{ tableLayout: 'fixed', width: '100%' }}>
          <thead className="bg-superficie-sec text-pizarra text-sm font-semibold uppercase tracking-wider">
            <tr>
              <th scope="col" className="border-r border-borde" style={thStyle(widths.col1)}>
                <SortableHeader label="DNI" sortKey="dni" sortConfig={sortConfig} requestSort={requestSort} />
                <Resizer colKey="col1" />
              </th>
              <th scope="col" className="border-r border-borde" style={thStyle(widths.col2)}>
                <SortableHeader label="Nombre" sortKey="nombre" sortConfig={sortConfig} requestSort={requestSort} />
                <Resizer colKey="col2" />
              </th>
              <th scope="col" className="border-r border-borde" style={thStyle(widths.col3)}>
                <SortableHeader label="Organización" sortKey="programas" sortConfig={sortConfig} requestSort={requestSort} />
                <Resizer colKey="col3" />
              </th>
              <th scope="col" className="border-r border-borde" style={thStyle(widths.col4)}>
                <span className="truncate">Talleres</span>
                <Resizer colKey="col4" />
              </th>
              <th scope="col" className="border-r border-borde" style={thStyle(widths.col5)}>
                <SortableHeader label="Ingreso" sortKey="inicioBeca" sortConfig={sortConfig} requestSort={requestSort} />
                <Resizer colKey="col5" />
              </th>
              <th scope="col" className="border-r border-borde" style={thStyle(widths.col6)}>
                <span className="truncate">Tiempo en Prog.</span>
                <Resizer colKey="col6" />
              </th>
              <th scope="col" className="text-center border-r border-borde" style={thStyle(widths.col7)}>
                <SortableHeader label="Asistencia" sortKey="asistencia" sortConfig={sortConfig} requestSort={requestSort} />
                <Resizer colKey="col7" />
              </th>
              <th scope="col" className="text-center" style={thStyle(widths.col8)}>
                <SortableHeader label="Estado" sortKey="estado" sortConfig={sortConfig} requestSort={requestSort} />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borde">
            {sortedData && sortedData.length > 0 ? (
              sortedData.map((row, index) => {
                const hasAlert = row.estado === 'Suspendido';
                const org = row.programas || row.organizaciones;
                const fecha = row.inicioBeca || row.fechaInicio;
                const tiempoProg = getTiempoPrograma(fecha);
                const asistenciaNum = parseInt((row.asistencia || "0").replace('%', ''));
                const asisColor = asistenciaNum < 75 ? 'text-naranja' : 'text-texto';
                
                const benTalleres = (row.talleres || []).map(tId => talleres.find(t => t.id === tId)?.nombre).filter(Boolean);

                return (
                  <tr
                    key={row.id || row.dni}
                    onClick={() => onItemClick && onItemClick(row)}
                    className={`border-b border-borde last:border-0 transition-colors cursor-pointer ${
                      hasAlert
                        ? 'bg-naranja/5 hover:bg-naranja/10'
                        : `hover:bg-canvas ${index % 2 === 0 ? '' : 'bg-canvas/50'}`
                    }`}
                  >
                    <td className="text-sm text-texto font-medium border-r border-borde" title={row.dni} style={cellStyle(widths.col1)}>
                      {row.dni}
                    </td>
                    <td className="text-sm text-texto font-semibold border-r border-borde" title={row.nombre} style={cellStyle(widths.col2)}>
                      {row.nombre}
                    </td>
                    <td className="text-sm text-texto border-r border-borde" style={cellStyle(widths.col3)}>
                        <div className="flex flex-wrap" style={{ gap: '4px' }}>
                          {org ? (
                            org.split(',').map((o, i) => (
                              <span
                                key={i}
                                className="bg-primario/10 text-primario text-xs rounded-full inline-block font-medium truncate"
                                style={{ padding: '2px 8px', maxWidth: '100%' }}
                                title={o.trim()}
                              >
                                {o.trim()}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 text-xs">Sin organización</span>
                          )}
                        </div>
                    </td>
                    <td className="text-sm text-texto border-r border-borde" style={cellStyle(widths.col4)}>
                        <div className="flex flex-wrap" style={{ gap: '4px' }}>
                          {benTalleres.length > 0 ? (
                            benTalleres.map((o, i) => (
                              <span
                                key={i}
                                className="bg-naranja/10 text-naranja text-[10px] rounded-full inline-block font-bold uppercase truncate"
                                style={{ padding: '2px 8px', maxWidth: '100%' }}
                                title={o.trim()}
                              >
                                {o.trim()}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 text-xs">-</span>
                          )}
                        </div>
                    </td>
                    <td className="text-sm text-texto border-r border-borde" title={formatDate(fecha)} style={cellStyle(widths.col5)}>
                      {formatDate(fecha)}
                    </td>
                    <td className="text-sm text-texto font-medium border-r border-borde" title={tiempoProg} style={cellStyle(widths.col6)}>
                      {tiempoProg}
                    </td>
                    <td className={`text-sm text-center font-bold border-r border-borde ${asisColor}`} style={cellStyle(widths.col7)}>
                      {row.asistencia || '-'}
                    </td>
                    <td className="text-sm text-center" style={cellStyle(widths.col8)}>
                      {row.estado === 'Activo' ? (
                        <span className="inline-flex items-center rounded-full text-xs font-semibold bg-exito/10 text-exito truncate" style={{ padding: '4px 8px', maxWidth: '100%' }}>
                          Activo
                        </span>
                      ) : row.estado === 'Egresado' ? (
                        <span className="inline-flex items-center rounded-full text-xs font-semibold bg-primario/10 text-primario truncate" style={{ padding: '4px 8px', maxWidth: '100%' }}>
                          Egresado
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full text-xs font-semibold bg-naranja/10 text-naranja truncate" style={{ padding: '4px 8px', maxWidth: '100%' }}>
                          {row.estado}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="text-center text-sm text-pizarra/70"
                  style={{ padding: '32px 20px' }}
                >
                  No se encontraron beneficiarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
