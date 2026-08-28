import React from 'react';
import { BookmarkSimple, MapPin, Calendar, ArrowSquareOut } from '@phosphor-icons/react';

export default function OportunidadesGrid({ data }) {
  if (data.length === 0) {
    return (
      <div className="col-span-full text-center text-pizarra/60 font-medium bg-white rounded-xl border border-borde" style={{ padding: '48px 0' }}>
        No se encontraron oportunidades que coincidan con la búsqueda.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ gap: '24px' }}>
      {data.map((item) => (
        <div 
          key={item.id} 
          className="bg-white rounded-xl shadow-sm border border-borde p-6 hover:shadow-md transition-shadow flex flex-col card-elevated cursor-pointer"
          style={{ padding: '24px' }}
        >
          <div className="flex justify-between items-start" style={{ marginBottom: '16px' }}>
            <div className="bg-primario/10 text-primario rounded-lg flex items-center justify-center shrink-0" style={{ width: '48px', height: '48px' }}>
              <BookmarkSimple style={{ width: '24px', height: '24px' }} />
            </div>
            <span className="inline-flex items-center rounded-full text-xs font-bold uppercase tracking-wider bg-canvas border border-borde text-pizarra" style={{ padding: '4px 12px' }}>
              {item.titulo?.includes('Licitación') ? 'Licitación' : item.titulo?.includes('Fondo') ? 'Fondo' : 'Capacitación'}
            </span>
          </div>
          
          <h3 className="font-bold text-texto text-lg leading-tight" style={{ marginBottom: '8px' }}>{item.titulo}</h3>
          
          <div className="flex flex-col" style={{ gap: '8px', marginBottom: '24px' }}>
            <div className="flex items-center text-sm font-medium text-pizarra/80" style={{ gap: '8px' }}>
              <MapPin className="text-pizarra/50" style={{ width: '16px', height: '16px' }} />
              {item.organizador}
            </div>
            <div className="flex items-center text-sm font-medium text-pizarra/80" style={{ gap: '8px' }}>
              <Calendar className="text-pizarra/50" style={{ width: '16px', height: '16px' }} />
              {item.fecha}
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-borde flex items-center justify-between" style={{ paddingTop: '16px' }}>
            <span className="text-sm font-semibold text-primario">Ver detalles</span>
            <ArrowSquareOut className="text-primario" style={{ width: '16px', height: '16px' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

