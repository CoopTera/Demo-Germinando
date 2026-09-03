import React from 'react';

export default function OrganizacionesTable({ data = [], onItemClick }) {
  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return '$ 0';
    return amount.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    });
  };

  const getEspecializacionBadgeClass = (esp) => {
    if (!esp) return 'bg-superficie-sec text-pizarra';
    if (esp.includes('Textil')) return 'bg-primario/10 text-primario';
    if (esp.includes('Alimentar')) return 'bg-exito/10 text-exito';
    if (esp.includes('Construcc')) return 'bg-naranja/10 text-naranja';
    return 'bg-superficie-sec text-pizarra';
  };

  return (
    <div className="bg-white rounded-2xl animate-fade-in-up overflow-hidden shadow-sm border border-borde">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-superficie-sec text-pizarra text-sm font-semibold uppercase tracking-wider">
            <tr>
              <th scope="col" className="px-5 py-3">Nombre</th>
              <th scope="col" className="px-5 py-3">Localización</th>
              <th scope="col" className="px-5 py-3">Especialización</th>
              <th scope="col" className="px-5 py-3 text-center">Convenios</th>
              <th scope="col" className="px-5 py-3 text-center">Talleres</th>
              <th scope="col" className="px-5 py-3 text-right">Presupuesto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borde">
            {data && data.length > 0 ? (
              data.map((org, index) => (
                <tr
                  key={org.id}
                  onClick={() => onItemClick?.(org)}
                  className={`row-hover-accent relative transition-all cursor-pointer hover:bg-superficie-sec/50 ${
                    index % 2 === 0 ? '' : 'bg-canvas/50'
                  }`}
                >
                  <td className="px-5 py-5 text-sm text-texto font-medium">
                    {org.nombre}
                  </td>
                  <td className="px-5 py-5 text-sm text-pizarra/80 font-medium">
                    {org.localizacion}
                  </td>
                  <td className="px-5 py-5 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getEspecializacionBadgeClass(
                        org.especializacion
                      )}`}
                    >
                      {org.especializacion}
                    </span>
                  </td>
                  <td className="px-5 py-5 text-sm text-texto text-center font-bold">
                    {org.convenios}
                  </td>
                  <td className="px-5 py-5 text-sm text-texto text-center font-bold">
                    {org.talleres}
                  </td>
                  <td className="px-5 py-5 text-sm text-texto text-right font-semibold">
                    {formatCurrency(org.presupuesto)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-8 text-center text-sm text-pizarra/70"
                >
                  No se encontraron organizaciones registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

