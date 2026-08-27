import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function BeneficiariosTable({ data = [], onItemClick }) {
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
    // Si ya viene formateado con barras (ej: 15/3/2025) del Excel, lo devolvemos tal cual
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

  return (
    <div className="bg-white rounded-xl card-elevated animate-fade-in-up border border-borde overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-superficie-sec text-pizarra text-sm font-semibold uppercase tracking-wider">
            <tr>
              <th scope="col" style={{ padding: '12px 20px' }}>DNI</th>
              <th scope="col" style={{ padding: '12px 20px' }}>Nombre</th>
              <th scope="col" style={{ padding: '12px 20px' }}>Organizaciones/Programas</th>
              <th scope="col" style={{ padding: '12px 20px' }}>Fecha Inicio</th>
              <th scope="col" className="text-right" style={{ padding: '12px 20px' }}>Beca Mensual</th>
              <th scope="col" style={{ padding: '12px 20px' }}>Último Registro</th>
              <th scope="col" className="text-center" style={{ padding: '12px 20px' }}>Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borde">
            {data && data.length > 0 ? (
              data.map((row, index) => {
                const hasAlert = row.alerta === true || row.estado === 'Sin seguimiento';
                
                // Handle both mock data and imported excel data structures
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
                    <td className="text-sm text-texto font-medium whitespace-nowrap" style={{ padding: '16px 20px' }}>
                      {row.dni}
                    </td>
                    <td className="text-sm text-texto font-semibold" style={{ padding: '16px 20px' }}>
                      {row.nombre}
                    </td>
                    <td className="text-sm text-texto" style={{ padding: '16px 20px' }}>
                      <div className="flex flex-wrap" style={{ gap: '4px' }}>
                        {orgs.length > 0 ? (
                          orgs.map((org, orgIdx) => (
                            <span
                              key={orgIdx}
                              className="bg-primario/10 text-primario text-xs rounded-full inline-block font-medium"
                              style={{ padding: '2px 8px' }}
                            >
                              {org}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-xs">Sin organización</span>
                        )}
                      </div>
                    </td>
                    <td className="text-sm text-texto whitespace-nowrap" style={{ padding: '16px 20px' }}>
                      {formatDate(fecha)}
                    </td>
                    <td className="text-sm text-texto text-right font-semibold whitespace-nowrap" style={{ padding: '16px 20px' }}>
                      {formatCurrency(monto)}
                    </td>
                    <td
                      className={`text-sm whitespace-nowrap ${
                        hasAlert ? 'text-naranja font-semibold' : 'text-texto'
                      }`}
                      style={{ padding: '16px 20px' }}
                    >
                      <div className="flex items-center" style={{ gap: '6px' }}>
                        {hasAlert && (
                          <AlertTriangle className="text-naranja shrink-0" style={{ width: '14px', height: '14px' }} />
                        )}
                        <span>{formatDate(ultimoReg)}</span>
                      </div>
                    </td>
                    <td className="text-sm text-center whitespace-nowrap" style={{ padding: '16px 20px' }}>
                      {hasAlert ? (
                        <span className="inline-flex items-center rounded-full text-xs font-semibold bg-naranja/10 text-naranja" style={{ padding: '4px 8px' }}>
                          Sin seguimiento
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full text-xs font-semibold bg-exito/10 text-exito" style={{ padding: '4px 8px' }}>
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
