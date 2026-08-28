import { Activity } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { actividadReciente } from '../../data/mockData';

export default function ActividadFeed() {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (!item.tipo || !item.entidadId) return;
    const routes = {
      beneficiario: '/beneficiarios',
      organizacion: '/organizaciones',
      convenio: '/convenios',
      taller: '/talleres',
    };
    const route = routes[item.tipo];
    if (route) navigate(route, { state: { openModalId: item.entidadId } });
  };

  return (
    <div className="bg-white rounded-md shadow-sm border border-borde h-full flex flex-col card-elevated" style={{ padding: '24px' }}>
      <div className="flex items-center" style={{ gap: '10px', marginBottom: '24px' }}>
        <Activity weight="duotone" style={{ width: '20px', height: '20px', color: '#494963' }} />
        <h2 className="font-semibold text-pizarra text-base">Actividad Reciente</h2>
        <span className="ml-auto text-xs text-pizarra/40 font-medium">Últimos 7 días</span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto pr-2" style={{ gap: '24px' }}>
        {actividadReciente.map((item, i) => (
          <div
            key={item.id}
            onClick={() => handleClick(item)}
            className={`relative flex ${item.entidadId ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
            style={{ gap: '16px' }}
          >
            {/* Timeline line */}
            {i !== actividadReciente.length - 1 && (
              <div className="absolute left-[19px] top-10 bottom-[-24px] w-0.5 bg-borde" />
            )}
            
            {/* Avatar */}
            <div className="rounded-full bg-pizarra/10 flex items-center justify-center text-pizarra font-bold text-xs shrink-0 z-10 border-[3px] border-white" style={{ width: '40px', height: '40px' }}>
              {item.avatar}
            </div>
            
            {/* Content */}
            <div className="flex-1 pt-1.5 pb-2">
              <p className="text-sm text-texto leading-relaxed">
                <span className="font-semibold">{item.usuario}</span> {item.accion} <span className="font-medium text-primario">{item.entidad}</span>
              </p>
              <p className="text-[11px] text-pizarra/50 mt-1 font-medium">{item.fecha}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
