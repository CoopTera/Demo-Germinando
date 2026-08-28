import React from 'react';
import { Warning } from '@phosphor-icons/react';
import { useTableResize } from '../../hooks/useTableResize';

export default function BeneficiariosTable({ data = [], onItemClick }) {
  const { widths, startResize } = useTableResize({
    col1: 120, col2: 200, col3: 300, col4: 120, col5: 120, col6: 150, col7: 120
  });

  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return '$ 0';
    return amount.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    });
  };

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
              <th scope="col" className="border-r border-borde" style={thStyle(widths.col1)}>DNI<Resizer colKey="col1" /></th>
              <th scope="col" className="border-r border-borde" style={thStyle(widths.col2)}>Nombre<Resizer colKey="col2" /></th>
              <th scope="col" className="border-r border-borde" style={thStyle(widths.col3)}>Organizaciones/Programas<Resizer colKey="col3" /></th>
              <th scope="col" className="border-r border-borde" style={thStyle(widths.col4)}>Fecha Inicio<Resizer colKey="col4" /></th>
              <th scope="col" className="text-right border-r border-borde" style={thStyle(widths.col5)}>Beca Mensual<Resizer colKey="col5" /></th>
              <th scope="col" className="border-r border-borde" style={thStyle(widths.col6)}>Último Registro<Resizer colKey="col6" /></th>
              <th scope="col" className="text-center" style={thStyle(widths.col7)}>Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borde">
            {data && data.length > 0 ? (
              data.map((row, index) => {
                const hasAlert = row.alerta === true || row.estado === 'Sin seguimiento';
                
                const orgsRaw = row.programas || row.organizaciones;
                const orgs = typeof orgsRaw === 'string' 
                  ? orgsRaw.split(',').map(s => s.trim())
                  : Array.isArray(orgsRaw)
                    ? orgsRaw
                    : orgsRaw
                    ? [orgsRaw]
                    : [];

                const fecha = row.inicioBeca || row.fechaInicio;
                const monto = row.monto !== undefined ? row.monto : row.presupuestoBeca;
                const ultimoReg = row.actividad || row.ultimoRegistro;

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
                      <div className="flex flex-wrap" style={{ gap: '4px', overflow: 'hidden', height: '24px' }}>
                        {orgs.length > 0 ? (
                          orgs.map((org, orgIdx) => (
                            <span
                              key={orgIdx}
                              className="bg-primario/10 text-primario text-xs rounded-full inline-block font-medium truncate"
                              style={{ padding: '2px 8px', maxWidth: '100%' }}
                              title={org}
                            >
                              {org}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-xs">Sin organización</span>
                        )}
                      </div>
                    </td>
                    <td className="text-sm text-texto border-r border-borde" title={formatDate(fecha)} style={cellStyle(widths.col4)}>
                      {formatDate(fecha)}
                    </td>
                    <td className="text-sm text-texto text-right font-semibold border-r border-borde" title={formatCurrency(monto)} style={cellStyle(widths.col5)}>
                      {formatCurrency(monto)}
                    </td>
                    <td
                      className={`text-sm border-r border-borde ${
                        hasAlert ? 'text-naranja font-semibold' : 'text-texto'
                      }`}
                      style={cellStyle(widths.col6)}
                      title={formatDate(ultimoReg)}
                    >
                      <div className="flex items-center" style={{ gap: '6px', overflow: 'hidden' }}>
                        {hasAlert && (
                          <Warning className="text-naranja shrink-0" style={{ width: '14px', height: '14px' }} />
                        )}
                        <span className="truncate">{formatDate(ultimoReg)}</span>
                      </div>
                    </td>
                    <td className="text-sm text-center" style={cellStyle(widths.col7)}>
                      {hasAlert ? (
                        <span className="inline-flex items-center rounded-full text-xs font-semibold bg-naranja/10 text-naranja truncate" style={{ padding: '4px 8px', maxWidth: '100%' }}>
                          Sin seguimiento
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full text-xs font-semibold bg-exito/10 text-exito truncate" style={{ padding: '4px 8px', maxWidth: '100%' }}>
                          Activo
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={7}
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

