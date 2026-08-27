import React from 'react';
import { Bookmark, MapPin, Calendar, ExternalLink } from 'lucide-react';

export default function OportunidadesTable({ data }) {
  if (data.length === 0) {
    return (
      <div className="text-center text-pizarra/60 font-medium bg-white rounded-xl border border-borde" style={{ padding: '48px 0' }}>
        No se encontraron oportunidades que coincidan con la búsqueda.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-borde overflow-hidden shadow-sm flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-borde bg-canvas/50">
              <th className="text-xs font-bold text-pizarra/50 uppercase tracking-wider whitespace-nowrap" style={{ padding: '16px 24px' }}>Título</th>
              <th className="text-xs font-bold text-pizarra/50 uppercase tracking-wider whitespace-nowrap" style={{ padding: '16px 24px' }}>Organizador</th>
              <th className="text-xs font-bold text-pizarra/50 uppercase tracking-wider whitespace-nowrap" style={{ padding: '16px 24px' }}>Fecha / Plazo</th>
              <th className="text-xs font-bold text-pizarra/50 uppercase tracking-wider whitespace-nowrap text-right" style={{ padding: '16px 24px' }}>Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borde">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-canvas/50 transition-colors cursor-pointer group">
                <td style={{ padding: '16px 24px' }}>
                  <div className="flex items-center" style={{ gap: '12px' }}>
                    <div className="bg-primario/10 text-primario rounded-lg flex items-center justify-center shrink-0" style={{ width: '40px', height: '40px' }}>
                      <Bookmark style={{ width: '20px', height: '20px' }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-texto group-hover:text-primario transition-colors">{item.titulo}</p>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-pizarra bg-canvas border border-borde rounded-full mt-1" style={{ padding: '2px 8px' }}>
                        {item.titulo?.includes('Licitación') ? 'Licitación' : item.titulo?.includes('Fondo') ? 'Fondo' : 'Capacitación'}
                      </span>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div className="flex items-center text-sm font-medium text-pizarra/80" style={{ gap: '6px' }}>
                    <MapPin className="text-pizarra/50" style={{ width: '14px', height: '14px' }} />
                    {item.organizador}
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div className="flex items-center text-sm font-medium text-pizarra/80" style={{ gap: '6px' }}>
                    <Calendar className="text-pizarra/50" style={{ width: '14px', height: '14px' }} />
                    {item.fecha}
                  </div>
                </td>
                <td className="text-right" style={{ padding: '16px 24px' }}>
                  <button className="text-pizarra/40 hover:text-primario transition-colors cursor-pointer">
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
