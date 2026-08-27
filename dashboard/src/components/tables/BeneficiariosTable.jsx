import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function BeneficiariosTable({ data = [] }) {
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

  return (
    <div className="bg-white rounded-xl card-elevated animate-fade-in-up border border-borde overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-superficie-sec text-pizarra text-sm font-semibold uppercase tracking-wider">
            <tr>
              <th scope="col" className="px-5 py-3">DNI</th>
              <th scope="col" className="px-5 py-3">Nombre</th>
              <th scope="col" className="px-5 py-3">Organizaciones</th>
              <th scope="col" className="px-5 py-3">Fecha Inicio</th>
              <th scope="col" className="px-5 py-3 text-right">Beca Mensual</th>
              <th scope="col" className="px-5 py-3">Último Registro</th>
              <th scope="col" className="px-5 py-3 text-center">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borde">
            {data && data.length > 0 ? (
              data.map((row, index) => {
                const hasAlert = row.alerta === true;
                const orgs = Array.isArray(row.organizaciones)
                  ? row.organizaciones
                  : row.organizaciones
                  ? [row.organizaciones]
                  : [];

                return (
                  <tr
                    key={row.id || row.dni}
                    className={`relative transition-colors ${
                      hasAlert
                        ? 'bg-naranja/5 hover:bg-naranja/10'
                        : `row-hover-accent ${index % 2 === 0 ? '' : 'bg-canvas/50'}`
                    }`}
                  >
                    <td className="px-5 py-5 text-sm text-texto font-medium whitespace-nowrap">
                      {row.dni}
                    </td>
                    <td className="px-5 py-5 text-sm text-texto font-semibold">
                      {row.nombre}
                    </td>
                    <td className="px-5 py-5 text-sm text-texto">
                      <div className="flex flex-wrap gap-1">
                        {orgs.length > 0 ? (
                          orgs.map((org, orgIdx) => (
                            <span
                              key={orgIdx}
                              className="bg-primario/10 text-primario text-xs rounded-full px-2 py-0.5 mr-1 inline-block font-medium"
                            >
                              {org}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-xs">Sin organización</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-5 text-sm text-texto whitespace-nowrap">
                      {formatDate(row.fechaInicio)}
                    </td>
                    <td className="px-5 py-5 text-sm text-texto text-right font-semibold whitespace-nowrap">
                      {formatCurrency(row.presupuestoBeca)}
                    </td>
                    <td
                      className={`px-5 py-5 text-sm whitespace-nowrap ${
                        hasAlert ? 'text-naranja font-semibold' : 'text-texto'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        {hasAlert && (
                          <AlertTriangle className="w-3.5 h-3.5 text-naranja shrink-0" />
                        )}
                        <span>{formatDate(row.ultimoRegistro)}</span>
                      </div>
                    </td>
                    <td className="px-5 py-5 text-sm text-center whitespace-nowrap">
                      {hasAlert ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-naranja/10 text-naranja">
                          Sin seguimiento
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-exito/10 text-exito">
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
                  className="px-5 py-8 text-center text-sm text-pizarra/70"
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
