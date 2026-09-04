import React from 'react';
import { useData } from '../../context/DataContext';
import { formatDate } from '../../utils/formatters';

export default function AlertPanel() {
  const { alertas } = useData();
  const list = alertas || [];

  return (
    <div className="bg-white rounded-2xl flex flex-col h-full overflow-hidden card-elevated">
      <div className="flex items-center justify-between p-8 pb-4">
        <h2 className="font-semibold text-pizarra text-base">Central de Alertas</h2>
        {list.length > 0 && (
          <span className="bg-critico/10 text-critico text-xs font-bold px-2 py-0.5 rounded-full">
            {list.length}
          </span>
        )}
      </div>

      <div className="flex flex-col overflow-y-auto flex-1">
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 text-pizarra/50">
            <p className="text-sm font-medium text-pizarra">Todo está al día</p>
            <p className="text-xs mt-1">No hay alertas críticas pendientes en este momento.</p>
          </div>
        ) : (
          list.map((alert) => (
            <button
              type="button"
              key={alert.id}
              className="w-full text-left group flex flex-col border-b border-borde last:border-0 hover:bg-superficie-sec/50 transition-colors focus-visible:outline-none focus-visible:bg-superficie-sec/50"
              style={{ padding: '16px 24px' }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-texto leading-relaxed">
                  {alert.mensaje}
                </p>
                <p className="text-xs text-pizarra/50 mt-1 font-medium">
                  {formatDate(alert.fecha)}
                </p>
              </div>
            </button>
          ))
        )}
      </div>

      <div className="p-4 border-t border-borde mt-auto">
        <button type="button" className="text-xs text-primario font-semibold hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primario rounded-sm cursor-pointer">
          Ver todas las alertas
        </button>
      </div>
    </div>
  );
}
