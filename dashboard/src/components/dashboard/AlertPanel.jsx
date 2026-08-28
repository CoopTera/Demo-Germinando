import { useState } from 'react';
import { Warning, Tag, Clock, Calendar, WarningCircle, CaretRight } from '@phosphor-icons/react';
import { alertas } from '../../data/mockData';

const getAlertIcon = (tipo) => {
  switch (tipo) {
    case 'oportunidad':
      return (
        <div className="w-9 h-9 rounded-lg bg-primario/10 flex items-center justify-center shrink-0">
          <Tag className="w-4.5 h-4.5 text-primario" />
        </div>
      );
    case 'sin_actualizacion':
      return (
        <div className="w-9 h-9 rounded-lg bg-naranja/10 flex items-center justify-center shrink-0">
          <Clock className="w-4.5 h-4.5 text-naranja" />
        </div>
      );
    case 'convenio_vencimiento':
      return (
        <div className="w-9 h-9 rounded-lg bg-critico/10 flex items-center justify-center shrink-0">
          <Calendar className="w-4.5 h-4.5 text-critico" />
        </div>
      );
    default:
      return (
        <div className="w-9 h-9 rounded-lg bg-pizarra/10 flex items-center justify-center shrink-0">
          <WarningCircle weight="duotone" className="w-4.5 h-4.5 text-pizarra" />
        </div>
      );
  }
};

const getPriorityBorderClass = (prioridad) => {
  switch (prioridad) {
    case 'critica':
      return 'border-l-critico';
    case 'alta':
      return 'border-l-naranja';
    case 'media':
      return 'border-l-amarillo';
    default:
      return 'border-l-pizarra';
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }
  return dateStr;
};

export default function AlertPanel() {
  const [list] = useState(alertas);

  return (
    <div className="bg-white rounded-md shadow-sm border border-borde flex flex-col h-full overflow-hidden">
      {/* Title */}
      <div className="flex items-center gap-2.5 p-8 pb-4">
        <Warning weight="duotone" className="w-5 h-5 text-pizarra" />
        <h2 className="font-semibold text-pizarra text-base">Central de Alertas</h2>
        {list.length > 0 && (
          <span className="ml-auto bg-critico/10 text-critico text-xs font-bold px-2 py-0.5 rounded-full">
            {alertas.length}
          </span>
        )}
      </div>

      {/* List */}
      <div className="flex flex-col overflow-y-auto flex-1">
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 text-pizarra/50">
            <div className="w-12 h-12 rounded-full bg-exito/10 flex items-center justify-center mb-3">
              <Warning weight="duotone" className="w-6 h-6 text-exito" />
            </div>
            <p className="text-sm font-medium text-pizarra">Todo está al día</p>
            <p className="text-xs mt-1">No hay alertas críticas pendientes en este momento.</p>
          </div>
        ) : (
          list.map((alert) => (
            <button
              type="button"
              key={alert.id}
              className="w-full text-left group flex items-start gap-5 border-b border-borde last:border-0 hover:bg-superficie-sec/50 transition-colors focus-visible:outline-none focus-visible:bg-superficie-sec/50"
              style={{ padding: '20px 24px' }}
            >
              {/* Icon */}
              {getAlertIcon(alert.tipo)}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-texto leading-relaxed">
                  {alert.mensaje}
                </p>
                <p className="text-xs text-pizarra/50 mt-1.5 font-medium">
                  {formatDate(alert.fecha)}
                </p>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-borde mt-auto">
        <button type="button" className="text-xs text-primario font-medium hover:underline flex items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-primario rounded-sm">
          Ver todas las alertas
          <CaretRight weight="bold" className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}



