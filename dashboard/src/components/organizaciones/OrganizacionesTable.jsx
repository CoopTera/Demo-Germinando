import React from 'react';
import { Pencil, MapPin } from 'lucide-react';

const getEspecializacionColor = (esp) => {
  if (esp.toLowerCase().includes('textil')) return 'text-primario';
  if (esp.toLowerCase().includes('alimentaria')) return 'text-exito';
  if (esp.toLowerCase().includes('hábitat')) return 'text-naranja';
  return 'text-pizarra';
};

export default function OrganizacionesTable({ data }) {
  return (
    <div className="bg-white rounded-md shadow-sm border border-borde overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-superficie-sec border-b border-borde">
              <th className="py-3 px-4 text-xs font-bold text-pizarra tracking-wider" style={{ paddingLeft: '24px' }}>NOMBRE</th>
              <th className="py-3 px-4 text-xs font-bold text-pizarra tracking-wider">LOCALIZACIÓN</th>
              <th className="py-3 px-4 text-xs font-bold text-pizarra tracking-wider">ESPECIALIZACIÓN</th>
              <th className="py-3 px-4 text-xs font-bold text-pizarra tracking-wider text-center">CONVENIOS</th>
              <th className="py-3 px-4 text-xs font-bold text-pizarra tracking-wider text-center">TALLERES</th>
              <th className="py-3 px-4 text-xs font-bold text-pizarra tracking-wider text-right">PRESUPUESTO</th>
              <th className="py-3 px-4 text-xs font-bold text-pizarra tracking-wider text-center" style={{ paddingRight: '24px' }}>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {data.map((org, i) => (
              <tr key={org.id || i} className="border-b border-borde last:border-0 hover:bg-canvas transition-colors">
                <td className="py-3 px-4 text-sm font-semibold text-texto" style={{ paddingLeft: '24px' }}>
                  {org.nombre}
                </td>
                <td className="py-3 px-4 text-sm text-pizarra/80 font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-pizarra/50" />
                    {org.localizacion}
                  </div>
                </td>
                <td className={`py-3 px-4 text-sm font-semibold ${getEspecializacionColor(org.especializacion)}`}>
                  {org.especializacion}
                </td>
                <td className="py-3 px-4 text-sm text-texto font-bold text-center">
                  {org.convenios}
                </td>
                <td className="py-3 px-4 text-sm text-texto font-bold text-center">
                  {org.talleres}
                </td>
                <td className="py-3 px-4 text-sm font-bold text-texto text-right">
                  {org.presupuesto}
                </td>
                <td className="py-3 px-4 text-center" style={{ paddingRight: '24px' }}>
                  <button className="inline-flex items-center gap-1 text-xs font-medium text-pizarra hover:text-primario transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                    Editar
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="7" className="py-8 text-center text-pizarra/60 font-medium">
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
