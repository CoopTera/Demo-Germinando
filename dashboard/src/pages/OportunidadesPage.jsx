import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import PageTemplate from '../components/layout/PageTemplate';
import OportunidadesGrid from '../components/oportunidades/OportunidadesGrid';
import Modal from '../components/common/Modal';
import CustomSelect from '../components/common/CustomSelect';
import CustomDatePicker from '../components/common/CustomDatePicker';
import { staggerContainerVariants, staggerItemVariants } from '../lib/motionTokens';
import { formatDate } from '../utils/formatters';

const FILTROS = ['Todas', 'Licitaciones', 'Compras Públicas', 'Fondos', 'Capacitaciones'];

export default function OportunidadesPage() {
  const navigate = useNavigate();
  const { oportunidades, alertas, setAlertas, setOportunidades } = useData();
  const [busqueda, setBusqueda] = useState('');
  const [filtroActivo, setFiltroActivo] = useState('Todas');
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [nuevoForm, setNuevoForm] = useState({ tipo: 'Licitaciones', fecha: '', titulo: '', organizador: '' });

  const handleResolver = (id) => {
    setAlertas(prev => prev.filter(a => a.id !== id));
  };

  const handleCreateOportunidad = (e) => {
    e.preventDefault();
    if (!nuevoForm.titulo) return;
    const nueva = {
      id: Date.now(),
      titulo: nuevoForm.titulo,
      organizador: nuevoForm.organizador || 'Gobierno de Santa Fe',
      fecha: nuevoForm.fecha || '2024-06-01',
      tipo: nuevoForm.tipo
    };
    setOportunidades(prev => [nueva, ...prev]);
    setIsNewModalOpen(false);
    setNuevoForm({ tipo: 'Licitaciones', fecha: '', titulo: '', organizador: '' });
  };

  const stats = [
    { label: 'Total Alertas', value: (alertas || []).length },
    { label: 'Críticas', value: (alertas || []).filter(a => a.prioridad === 'critica').length, valueColor: 'text-critico' },
    { label: 'Oportunidades Activas', value: (oportunidades || []).length }
  ];

  const filteredOportunidades = useMemo(() => {
    return (oportunidades || []).filter(opt => {
      const matchesSearch = opt.titulo?.toLowerCase().includes(busqueda.toLowerCase()) || 
                            opt.organizador?.toLowerCase().includes(busqueda.toLowerCase()) ||
                            opt.orgAsignada?.toLowerCase().includes(busqueda.toLowerCase());
      const matchesFiltro = filtroActivo === 'Todas' || 
                            (filtroActivo === 'Licitaciones' && opt.titulo?.toLowerCase().includes('licitación')) ||
                            (filtroActivo === 'Compras Públicas' && opt.titulo?.toLowerCase().includes('compra pública')) ||
                            (filtroActivo === 'Fondos' && opt.titulo?.toLowerCase().includes('fondo')) ||
                            (filtroActivo === 'Capacitaciones' && opt.titulo?.toLowerCase().includes('capacitación'));
      return matchesSearch && matchesFiltro;
    });
  }, [oportunidades, busqueda, filtroActivo]);
  
  const filteredAlertas = useMemo(() => {
     return (alertas || []).filter(a => a.mensaje.toLowerCase().includes(busqueda.toLowerCase()));
  }, [alertas, busqueda]);

  return (
    <>
      <PageTemplate
        title="Oportunidades & Alertas"
        subtitle="Buscador de licitaciones y panel de notificaciones del sistema"
        onNew={() => setIsNewModalOpen(true)}
        newButtonText="Nueva Oportunidad"
        stats={stats}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        filtros={FILTROS}
        filtroActivo={filtroActivo}
        setFiltroActivo={setFiltroActivo}
        totalItems={(oportunidades || []).length + (alertas || []).length}
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
              <AnimatePresence>
                {filteredAlertas.map(alerta => {
                  const bgPrioridad = alerta.prioridad === 'critica' ? 'bg-critico/10' : alerta.prioridad === 'alta' ? 'bg-naranja/10' : 'bg-pizarra/10';
                  const textPrioridad = alerta.prioridad === 'critica' ? 'text-critico' : alerta.prioridad === 'alta' ? 'text-naranja' : 'text-pizarra';
                  
                  return (
                    <motion.div 
                      layout
                      key={alerta.id} 
                      variants={staggerItemVariants}
                      exit={{ opacity: 0, scale: 0.9, x: -20, transition: { duration: 0.2 } }}
                      className="bg-white rounded-2xl flex flex-col relative overflow-hidden shadow-sm border border-borde" 
                      style={{ padding: '20px' }}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
                          <span className={`inline-block rounded-full text-[10px] font-bold uppercase tracking-wider ${bgPrioridad} ${textPrioridad}`} style={{ padding: '2px 8px' }}>
                            Prioridad {alerta.prioridad}
                          </span>
                          <p className="text-xs text-pizarra/50 font-medium">{formatDate(alerta.fecha)}</p>
                        </div>
                        <h3 className="font-semibold text-texto text-[14px] leading-snug" style={{ marginBottom: '4px' }}>{alerta.mensaje}</h3>
                      </div>
                      <div className="flex justify-end border-t border-borde" style={{ marginTop: '16px', paddingTop: '12px', gap: '8px' }}>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (alerta.tipo === 'convenio_vencimiento') navigate('/convenios');
                            else if (alerta.tipo === 'sin_actualizacion') navigate('/talleres');
                          }}
                          className="text-xs font-semibold text-pizarra hover:bg-canvas border border-borde cursor-pointer rounded-lg transition-colors"
                          style={{ padding: '6px 12px' }}
                        >
                          Ver detalles
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleResolver(alerta.id)}
                          className="text-xs font-semibold text-white bg-primario hover:bg-primario/90 cursor-pointer rounded-lg transition-colors shadow-sm"
                          style={{ padding: '6px 12px' }}
                        >
                          Resolver acción
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              
              {filteredAlertas.length === 0 && (
                <div className="bg-white rounded-2xl border border-borde text-center text-pizarra/50 font-medium flex flex-col items-center justify-center" style={{ padding: '40px 20px', gap: '12px' }}>
                  No hay alertas pendientes.
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Oportunidades */}
          <div className="flex-[2] flex flex-col" style={{ gap: '20px' }}>
            <div>
              <h2 className="font-semibold text-pizarra text-lg">Oportunidades Destacadas</h2>
            </div>
            
            <OportunidadesGrid data={filteredOportunidades} onItemClick={setSelectedItem} />
          </div>
          
        </div>
      </PageTemplate>

      {/* Detail Modal */}
      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title="Detalle de Oportunidad">
        {selectedItem && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-pizarra/70 uppercase font-bold tracking-wider">Título</label>
              <p className="text-lg font-bold text-texto">{selectedItem.titulo}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-pizarra/70 uppercase font-bold tracking-wider">Organizador / Asignada</label>
                <p className="text-sm font-medium text-texto">{selectedItem.orgAsignada || selectedItem.organizador || 'Santa Fe'}</p>
              </div>
              <div>
                <label className="text-xs text-pizarra/70 uppercase font-bold tracking-wider">Fecha Cierre</label>
                <p className="text-sm font-medium text-texto">{formatDate(selectedItem.fechaCierre || selectedItem.fecha)}</p>
              </div>
            </div>
            <div className="flex justify-end border-t border-borde pt-4 mt-2">
              <button onClick={() => setSelectedItem(null)} className="text-sm font-semibold text-white bg-primario hover:bg-primario/90 rounded-xl transition-colors cursor-pointer" style={{ padding: '8px 16px' }}>Cerrar</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Form Modal */}
      <Modal isOpen={isNewModalOpen} onClose={() => setIsNewModalOpen(false)} title="Nueva Oportunidad">
        <form onSubmit={handleCreateOportunidad} className="flex flex-col" style={{ gap: '16px' }}>
          <div>
            <label className="block text-sm font-bold text-pizarra mb-1">Título de la Oportunidad</label>
            <input 
              type="text" 
              required 
              value={nuevoForm.titulo}
              onChange={(e) => setNuevoForm(prev => ({ ...prev, titulo: e.target.value }))}
              className="w-full bg-canvas text-texto text-sm rounded-xl border border-borde focus:outline-none focus:ring-2 focus:ring-primario/20" 
              style={{ padding: '10px 16px' }} 
              placeholder="Ej: Licitación Pública..." 
            />
          </div>
          <div className="grid grid-cols-2" style={{ gap: '16px' }}>
            <div>
              <label className="block text-sm font-bold text-pizarra mb-1">Organizador</label>
              <input 
                type="text" 
                required 
                value={nuevoForm.organizador}
                onChange={(e) => setNuevoForm(prev => ({ ...prev, organizador: e.target.value }))}
                className="w-full bg-canvas text-texto text-sm rounded-xl border border-borde focus:outline-none focus:ring-2 focus:ring-primario/20" 
                style={{ padding: '10px 16px' }} 
                placeholder="Ej: Ministerio..." 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-pizarra mb-1">Tipo</label>
              <CustomSelect 
                value={nuevoForm.tipo} 
                onChange={(val) => setNuevoForm(prev => ({ ...prev, tipo: val }))}
                options={FILTROS.filter(f => f !== 'Todas').map(f => ({ value: f, label: f }))}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-pizarra mb-1">Fecha Límite</label>
            <CustomDatePicker 
              value={nuevoForm.fecha}
              onChange={(val) => setNuevoForm(prev => ({ ...prev, fecha: val }))}
              required
            />
          </div>
          <div className="flex justify-end border-t border-borde" style={{ gap: '12px', marginTop: '16px', paddingTop: '16px' }}>
            <button type="button" onClick={() => setIsNewModalOpen(false)} className="text-sm font-semibold text-pizarra hover:bg-canvas rounded-xl transition-colors cursor-pointer border border-borde" style={{ padding: '8px 16px' }}>Cancelar</button>
            <button type="submit" className="text-sm font-semibold text-white bg-primario hover:bg-primario/90 rounded-xl transition-colors cursor-pointer" style={{ padding: '8px 16px' }}>Guardar Oportunidad</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
