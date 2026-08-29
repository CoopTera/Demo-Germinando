import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BookmarkSimple, BellRinging, Warning } from '@phosphor-icons/react';
import { oportunidades, alertas } from '../data/mockData';
import PageTemplate from '../components/layout/PageTemplate';
import OportunidadesGrid from '../components/oportunidades/OportunidadesGrid';
import { staggerContainerVariants, staggerItemVariants } from '../lib/motionTokens';

const FILTROS = ['Todas', 'Licitaciones', 'Fondos', 'Capacitaciones'];

export default function OportunidadesPage() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroActivo, setFiltroActivo] = useState('Todas');

  const stats = [
    { label: 'Total Alertas', value: alertas.length },
    { label: 'Críticas', value: alertas.filter(a => a.prioridad === 'critica').length, valueColor: 'text-critico' },
    { label: 'Oportunidades Activas', value: oportunidades.length }
  ];

  const filteredOportunidades = useMemo(() => {
    return oportunidades.filter(opt => {
      const matchesSearch = opt.titulo?.toLowerCase().includes(busqueda.toLowerCase()) || 
                            opt.organizador?.toLowerCase().includes(busqueda.toLowerCase());
      const matchesFiltro = filtroActivo === 'Todas' || 
                            (filtroActivo === 'Licitaciones' && opt.titulo?.toLowerCase().includes('licitación')) ||
                            (filtroActivo === 'Fondos' && opt.titulo?.toLowerCase().includes('fondo')) ||
                            (filtroActivo === 'Capacitaciones' && opt.titulo?.toLowerCase().includes('capacitación'));
      return matchesSearch && matchesFiltro;
    });
  }, [busqueda, filtroActivo]);
  
  const filteredAlertas = useMemo(() => {
     return alertas.filter(a => a.mensaje.toLowerCase().includes(busqueda.toLowerCase()));
  }, [busqueda]);

  return (
    <PageTemplate
      icon={BookmarkSimple}
      title="Oportunidades & Alertas"
      subtitle="Buscador de licitaciones y panel de notificaciones del sistema"
      onNew={() => console.log('Nueva oportunidad')}
      newButtonText="Nueva Oportunidad"
      stats={stats}
      busqueda={busqueda}
      setBusqueda={setBusqueda}
      filtros={FILTROS}
      filtroActivo={filtroActivo}
      setFiltroActivo={setFiltroActivo}
      totalItems={oportunidades.length + alertas.length}
      filteredItemsCount={filteredOportunidades.length + filteredAlertas.length}
    >
      <div className="flex flex-col xl:flex-row" style={{ gap: '32px' }}>
        
        {/* Left Column: Alertas */}
        <div className="flex-1 xl:max-w-md flex flex-col" style={{ gap: '20px' }}>
          <div className="flex items-center" style={{ gap: '10px' }}>
            <BellRinging weight="duotone" style={{ width: '24px', height: '24px', color: '#494963' }} />
            <h2 className="font-semibold text-pizarra text-lg">Alertas del Sistema</h2>
          </div>
          
          <motion.div 
            variants={staggerContainerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col" 
            style={{ gap: '16px' }}
          >
            {filteredAlertas.map(alerta => {
              const bgPrioridad = alerta.prioridad === 'critica' ? 'bg-critico/10' : alerta.prioridad === 'alta' ? 'bg-naranja/10' : 'bg-pizarra/10';
              const textPrioridad = alerta.prioridad === 'critica' ? 'text-critico' : alerta.prioridad === 'alta' ? 'text-naranja' : 'text-pizarra';
              const borderPrioridad = alerta.prioridad === 'critica' ? 'border-critico' : alerta.prioridad === 'alta' ? 'border-naranja' : 'border-pizarra/30';
              
              return (
                <motion.div 
                  key={alerta.id} 
                  variants={staggerItemVariants}
                  whileHover={{ y: -2, boxShadow: '0 6px 18px rgba(73, 73, 99, 0.1)' }}
                  className="bg-white rounded-md border border-borde shadow-sm flex flex-col relative overflow-hidden card-elevated" 
                  style={{ padding: '20px', borderLeftWidth: '4px', borderLeftColor: borderPrioridad === 'border-critico' ? '#E42153' : borderPrioridad === 'border-naranja' ? '#FF7402' : '#E3E1E2' }}
                >
                  <div className="flex items-start" style={{ gap: '16px' }}>
                    <div className={`rounded-full flex items-center justify-center shrink-0 ${bgPrioridad} ${textPrioridad}`} style={{ width: '40px', height: '40px' }}>
                      <Warning weight="duotone" style={{ width: '24px', height: '24px' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${bgPrioridad} ${textPrioridad}`}>
                        Prioridad {alerta.prioridad}
                      </span>
                      <h3 className="font-semibold text-texto text-[15px] leading-snug mb-1">{alerta.mensaje}</h3>
                      <p className="text-xs text-pizarra/60 font-medium">Registrada el {new Date(alerta.fecha).toLocaleDateString('es-AR')}</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 pt-4 border-t border-borde">
                    <button className="text-sm font-semibold text-primario hover:underline flex items-center cursor-pointer" style={{ gap: '4px' }}>
                      Resolver Acción &rarr;
                    </button>
                  </div>
                </motion.div>
              );
            })}
            
            {filteredAlertas.length === 0 && (
              <div className="bg-white rounded-md border border-borde text-center text-pizarra/50 font-medium shadow-sm flex flex-col items-center justify-center" style={{ padding: '40px 20px', gap: '12px' }}>
                <BellRinging style={{ width: '32px', height: '32px', opacity: 0.3 }} />
                No hay alertas que coincidan con la búsqueda.
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column: Oportunidades */}
        <div className="flex-[2] flex flex-col" style={{ gap: '20px' }}>
          <div className="flex items-center justify-between">
             <div className="flex items-center" style={{ gap: '10px' }}>
               <BookmarkSimple weight="duotone" style={{ width: '24px', height: '24px', color: '#494963' }} />
               <h2 className="font-semibold text-pizarra text-lg">Oportunidades Destacadas</h2>
             </div>
          </div>
          
          <OportunidadesGrid data={filteredOportunidades} />
        </div>
        
      </div>
    </PageTemplate>
  );
}
