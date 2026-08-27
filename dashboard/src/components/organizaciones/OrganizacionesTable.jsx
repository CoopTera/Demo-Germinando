import React from 'react';
import { Pencil, MapPin } from 'lucide-react';

const getEspecializacionColor = (esp) => {
  if (esp.toLowerCase().includes('textil')) return 'text-primario';
  if (esp.toLowerCase().includes('alimentaria')) return 'text-exito';
  if (esp.toLowerCase().includes('hábitat')) return 'text-naranja';
  return 'text-pizarra';
};

export default function OrganizacionesTable({ data, onItemClick }) {
  return (
    <div className="bg-white rounded-md shadow-sm border border-borde overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-superficie-sec border-b border-borde">
              <th className="text-xs font-bold text-pizarra tracking-wider" style={{ padding: '12px 16px', paddingLeft: '24px' }}>NOMBRE</th>
              <th className="text-xs font-bold text-pizarra tracking-wider" style={{ padding: '12px 16px' }}>LOCALIZACIÓN</th>
              <th className="text-xs font-bold text-pizarra tracking-wider" style={{ padding: '12px 16px' }}>ESPECIALIZACIÓN</th>
              <th className="text-xs font-bold text-pizarra tracking-wider text-center" style={{ padding: '12px 16px' }}>CONVENIOS</th>
              <th className="text-xs font-bold text-pizarra tracking-wider text-center" style={{ padding: '12px 16px' }}>TALLERES</th>
              <th className="text-xs font-bold text-pizarra tracking-wider text-right" style={{ padding: '12px 16px' }}>PRESUPUESTO</th>
              <th className="text-xs font-bold text-pizarra tracking-wider text-center" style={{ padding: '12px 16px', paddingRight: '24px' }}>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {data.map((org, i) => (
              <tr 
                key={org.id || i} 
                onClick={() => onItemClick && onItemClick(org)}
                className="border-b border-borde last:border-0 hover:bg-canvas transition-colors cursor-pointer"
              >
                <td className="text-sm font-semibold text-texto" style={{ padding: '12px 16px', paddingLeft: '24px' }}>
                  {org.nombre}
                </td>
                <td className="text-sm text-pizarra/80 font-medium" style={{ padding: '12px 16px' }}>
                  <div className="flex items-center" style={{ gap: '6px' }}>
                    <MapPin className="text-pizarra/50" style={{ width: '14px', height: '14px' }} />
                    {org.localizacion}
                  </div>
                </td>
                <td className={`text-sm font-semibold ${getEspecializacionColor(org.especializacion)}`} style={{ padding: '12px 16px' }}>
                  {org.especializacion}
                </td>
                <td className="text-sm text-texto font-bold text-center" style={{ padding: '12px 16px' }}>
                  {org.convenios}
                </td>
                <td className="text-sm text-texto font-bold text-center" style={{ padding: '12px 16px' }}>
                  {org.talleres}
                </td>
                <td className="text-sm font-bold text-texto text-right" style={{ padding: '12px 16px' }}>
                  {typeof org.presupuesto === 'number' ? `$ ${org.presupuesto.toLocaleString('es-AR')}` : org.presupuesto}
                </td>
                <td className="text-center" style={{ padding: '12px 16px', paddingRight: '24px' }}>
                  <button className="inline-flex items-center text-xs font-medium text-pizarra hover:text-primario transition-colors" style={{ gap: '4px' }}>
                    <Pencil style={{ width: '14px', height: '14px' }} />
                    Editar
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-pizarra/60 font-medium" style={{ padding: '32px 16px' }}>
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
