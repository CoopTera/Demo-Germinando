import React from 'react';
import { useTableResize } from '../../hooks/useTableResize';

const getEspecializacionColor = (esp) => {
  if (esp.toLowerCase().includes('textil')) return 'text-primario';
  if (esp.toLowerCase().includes('alimentaria')) return 'text-exito';
  if (esp.toLowerCase().includes('hábitat')) return 'text-naranja';
  return 'text-pizarra';
};

export default function OrganizacionesTable({ data, onItemClick }) {
  const { widths, startResize } = useTableResize({
    col1: 250, col2: 200, col3: 200, col4: 100, col5: 100, col6: 120, col7: 100
  });

  const cellStyle = (width, extraPadding = {}) => ({
    ...(width ? { width: `${width}px` } : {}),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    padding: '12px 16px',
    ...extraPadding
  });

  const Resizer = ({ colKey }) => (
    <div 
      onMouseDown={(e) => startResize(e, colKey)}
      style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '4px', cursor: 'col-resize', backgroundColor: '#E3E1E2', zIndex: 10
      }}
      onMouseEnter={(e) => e.target.style.backgroundColor = '#6B1330'}
      onMouseLeave={(e) => e.target.style.backgroundColor = '#E3E1E2'}
    />
  );

  const thStyle = (width, extraPadding = {}) => ({
    ...(width ? cellStyle(width, extraPadding) : { padding: '12px 16px', ...extraPadding }),
    position: 'relative',
    userSelect: 'none'
  });

  // Calculate total fixed width
  const totalFixedWidth = Object.values(widths).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="text-left border-collapse" style={{ tableLayout: 'fixed', minWidth: '100%', width: totalFixedWidth > 0 ? `${totalFixedWidth}px` : '100%' }}>
          <thead>
            <tr className="bg-superficie-sec border-b border-borde">
              <th className="text-xs font-bold text-pizarra tracking-wider border-r border-borde" style={thStyle(widths.col1, { paddingLeft: '24px' })}>NOMBRE<Resizer colKey="col1" /></th>
              <th className="text-xs font-bold text-pizarra tracking-wider border-r border-borde" style={thStyle(widths.col2)}>LOCALIZACIÓN<Resizer colKey="col2" /></th>
              <th className="text-xs font-bold text-pizarra tracking-wider border-r border-borde" style={thStyle(widths.col3)}>ESPECIALIZACIÓN<Resizer colKey="col3" /></th>
              <th className="text-xs font-bold text-pizarra tracking-wider text-center border-r border-borde" style={thStyle(widths.col4)}>CONVENIOS<Resizer colKey="col4" /></th>
              <th className="text-xs font-bold text-pizarra tracking-wider text-center border-r border-borde" style={thStyle(widths.col5)}>TALLERES ACTIVOS<Resizer colKey="col5" /></th>
              <th className="text-xs font-bold text-pizarra tracking-wider text-right" style={thStyle(null, { paddingRight: '24px' })}>PRESUPUESTO</th>
            </tr>
          </thead>
          <tbody>
            {data.map((org, i) => (
              <tr 
                key={org.id || i} 
                onClick={() => onItemClick && onItemClick(org)}
                className="border-b border-borde last:border-0 hover:bg-canvas transition-colors cursor-pointer"
              >
                <td className="text-sm font-semibold text-texto border-r border-borde" title={org.nombre} style={cellStyle(widths.col1, { paddingLeft: '24px' })}>
                  {org.nombre}
                </td>
                <td className="text-sm text-pizarra/80 font-medium border-r border-borde" title={org.localizacion} style={cellStyle(widths.col2)}>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{org.localizacion}</span>
                  </div>
                </td>
                <td className={`text-sm font-semibold border-r border-borde ${getEspecializacionColor(org.especializacion)}`} title={org.especializacion} style={cellStyle(widths.col3)}>
                  {org.especializacion}
                </td>
                <td className="text-sm text-texto font-bold text-center border-r border-borde" style={cellStyle(widths.col4)}>
                  {org.convenios}
                </td>
                <td className="text-sm text-texto font-bold text-center border-r border-borde" style={cellStyle(widths.col5)}>
                  {org.talleres}
                </td>
                <td className="text-sm font-bold text-texto text-right whitespace-nowrap" style={cellStyle(null, { paddingRight: '24px' })}>
                  {typeof org.presupuesto === 'number' ? `$\u00A0${org.presupuesto.toLocaleString('es-AR')}` : String(org.presupuesto || '').replace(/\$\s*/g, '$\u00A0')}
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-pizarra/60 font-medium" style={{ padding: '32px 16px' }}>
                  No hay organizaciones cargadas. Importá un Excel para comenzar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

