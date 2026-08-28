import React from 'react';
import { Bookmark, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { useTableResize } from '../../hooks/useTableResize';

export default function OportunidadesTable({ data }) {
  const { widths, startResize } = useTableResize({
    col1: 300, col2: 250, col3: 200, col4: 100
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
      onMouseEnter={(e) => e.target.style.backgroundColor = '#3C3AE5'}
      onMouseLeave={(e) => e.target.style.backgroundColor = '#E3E1E2'}
    />
  );

  const thStyle = (width, extraPadding = {}) => ({
    ...cellStyle(width, extraPadding),
    position: 'relative',
    userSelect: 'none'
  });

  return (
    <div className="bg-white rounded-xl border border-borde overflow-hidden shadow-sm flex flex-col">
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
                  <div className="flex items-center" style={{ gap: '12px' }}>
                    <div className="bg-primario/10 text-primario rounded-lg flex items-center justify-center shrink-0" style={{ width: '32px', height: '32px' }}>
                      <Bookmark style={{ width: '16px', height: '16px' }} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-texto group-hover:text-primario transition-colors truncate">{item.titulo}</p>
                    </div>
                  </div>
                </td>
                <td className="border-r border-borde" style={cellStyle(widths.col2)} title={item.organizador}>
                  <div className="flex items-center text-sm font-medium text-pizarra/80" style={{ gap: '6px' }}>
                    <MapPin className="text-pizarra/50 shrink-0" style={{ width: '14px', height: '14px' }} />
                    <span className="truncate">{item.organizador}</span>
                  </div>
                </td>
                <td className="border-r border-borde" style={cellStyle(widths.col3)}>
                  <div className="flex items-center text-sm font-medium text-pizarra/80" style={{ gap: '6px' }}>
                    <Calendar className="text-pizarra/50 shrink-0" style={{ width: '14px', height: '14px' }} />
                    <span className="truncate">{item.fecha}</span>
                  </div>
                </td>
                <td className="text-center" style={cellStyle(widths.col4)}>
                  <button className="text-pizarra/40 hover:text-primario transition-colors cursor-pointer mx-auto block">
                    <ExternalLink style={{ width: '18px', height: '18px' }} />
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
