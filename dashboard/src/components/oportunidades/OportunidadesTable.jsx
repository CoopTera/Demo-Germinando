import React from 'react';
import { useTableResize } from '../../hooks/useTableResize';

export default function OportunidadesTable({ data }) {
  const { widths, startResize } = useTableResize({
    col1: 300, col2: 250, col3: 200, col4: 120
  });

  if (data.length === 0) {
    return (
      <div className="text-center text-pizarra/60 font-medium bg-white rounded-xl border border-borde" style={{ padding: '48px 0' }}>
        No se encontraron oportunidades que coincidan con la búsqueda.
      </div>
    );
  }

  const cellStyle = (width, extraPadding = {}) => ({
    width: `${width}px`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    padding: '16px 24px',
    ...extraPadding
  });

  const Resizer = ({ colKey }) => (
    <div 
      onMouseDown={(e) => startResize(e, colKey)}
      style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '4px', cursor: 'col-resize', backgroundColor: '#E3E1E2', zIndex: 10 }}
      onMouseEnter={(e) => e.target.style.backgroundColor = '#6B1330'}
      onMouseLeave={(e) => e.target.style.backgroundColor = '#E3E1E2'}
    />
  );

  const thStyle = (width, extraPadding = {}) => ({
    ...cellStyle(width, extraPadding),
    position: 'relative',
    userSelect: 'none'
  });

  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="text-left border-collapse" style={{ tableLayout: 'fixed', width: '100%' }}>
          <thead>
            <tr className="border-b border-borde bg-superficie-sec">
              <th className="text-xs font-bold text-pizarra tracking-wider uppercase border-r border-borde" style={thStyle(widths.col1)}>Título<Resizer colKey="col1" /></th>
              <th className="text-xs font-bold text-pizarra tracking-wider uppercase border-r border-borde" style={thStyle(widths.col2)}>Organizador<Resizer colKey="col2" /></th>
              <th className="text-xs font-bold text-pizarra tracking-wider uppercase border-r border-borde" style={thStyle(widths.col3)}>Fecha / Plazo<Resizer colKey="col3" /></th>
              <th className="text-xs font-bold text-pizarra tracking-wider uppercase text-center" style={thStyle(widths.col4)}>Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borde">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-canvas transition-colors cursor-pointer group">
                <td className="border-r border-borde" style={cellStyle(widths.col1)} title={item.titulo}>
                  <p className="text-sm font-semibold text-texto group-hover:text-primario transition-colors truncate">{item.titulo}</p>
                </td>
                <td className="border-r border-borde" style={cellStyle(widths.col2)} title={item.organizador}>
                  <span className="text-sm font-medium text-pizarra/80 truncate">{item.organizador}</span>
                </td>
                <td className="border-r border-borde" style={cellStyle(widths.col3)}>
                  <span className="text-sm font-medium text-pizarra/80 truncate">{item.fecha}</span>
                </td>
                <td className="text-center" style={cellStyle(widths.col4)}>
                  <button className="text-xs font-semibold text-primario hover:underline cursor-pointer">
                    Ver detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

