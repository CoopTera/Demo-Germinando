import { Lightbulb, ArrowSquareOut } from '@phosphor-icons/react';
import { oportunidades } from '../../data/mockData';

export default function OportunidadesPanel() {
  return (
    <div className="bg-white rounded-md shadow-sm border border-borde h-full flex flex-col card-elevated" style={{ padding: '24px' }}>
      <div className="flex items-center" style={{ gap: '10px', marginBottom: '24px' }}>
        <Lightbulb className="w-5 h-5 text-amarillo" />
        <h2 className="font-semibold text-pizarra text-base">Oportunidades</h2>
      </div>
      <div className="flex flex-col flex-1" style={{ gap: '16px' }}>
        {oportunidades.map((op) => (
          <div key={op.id} className="group rounded-md border border-borde bg-canvas/30 hover:bg-white hover:border-primario/30 transition-all cursor-pointer" style={{ padding: '16px' }}>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-texto text-sm line-clamp-1">{op.titulo}</h3>
              <ArrowSquareOut className="w-3.5 h-3.5 text-pizarra/40 group-hover:text-primario transition-colors shrink-0" />
            </div>
            <p className="text-xs text-pizarra/70 mb-2">{op.organizador}</p>
            <span className="inline-block px-2 py-0.5 bg-exito/10 text-exito text-[10px] font-bold uppercase tracking-wider rounded-sm">
              {op.fecha}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-auto" style={{ paddingTop: '16px' }}>
        <button type="button" className="text-xs text-primario font-medium hover:underline flex items-center gap-1 outline-none">
          Explorar convocatorias
        </button>
      </div>
    </div>
  );
}

