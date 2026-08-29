import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
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
          <div>
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
              
              return (
                <motion.div 
                  key={alerta.id} 
                  variants={staggerItemVariants}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-md border border-borde shadow-sm flex flex-col relative overflow-hidden card-elevated" 
                  style={{ padding: '20px' }}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${bgPrioridad} ${textPrioridad}`}>
                        Prioridad {alerta.prioridad}
                      </span>
                      <p className="text-xs text-pizarra/50 font-medium">{new Date(alerta.fecha).toLocaleDateString('es-AR')}</p>
                    </div>
                    <h3 className="font-semibold text-texto text-[14px] leading-snug mb-1">{alerta.mensaje}</h3>
                  </div>
                  <div className="flex justify-end mt-4 pt-3 border-t border-borde">
                    <button className="text-xs font-semibold text-primario hover:underline cursor-pointer">
                      Resolver acción
                    </button>
                  </div>
                </motion.div>
              );
            })}
            
            {filteredAlertas.length === 0 && (
              <div className="bg-white rounded-md border border-borde text-center text-pizarra/50 font-medium shadow-sm flex flex-col items-center justify-center" style={{ padding: '40px 20px', gap: '12px' }}>
                No hay alertas que coincidan con la búsqueda.
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column: Oportunidades */}
        <div className="flex-[2] flex flex-col" style={{ gap: '20px' }}>
          <div>
            <h2 className="font-semibold text-pizarra text-lg">Oportunidades Destacadas</h2>
          </div>
          
          <OportunidadesGrid data={filteredOportunidades} />
        </div>
        
      </div>
    </PageTemplate>
  );
}
