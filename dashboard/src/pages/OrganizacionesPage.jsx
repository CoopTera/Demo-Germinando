import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DocumentPdf } from '@carbon/icons-react';
import { useData } from '../context/DataContext';
import OrganizacionesTable from '../components/organizaciones/OrganizacionesTable';
import OrganizacionesGrid from '../components/organizaciones/OrganizacionesGrid';
import PageTemplate from '../components/layout/PageTemplate';
import Modal from '../components/common/Modal';
import OrganizacionForm from '../components/forms/OrganizacionForm';
import { useLocation, useNavigate } from 'react-router-dom';

const FILTROS = ['Todas', 'Textil e Indumentaria', 'Producción Alimentaria', 'Construcción y Hábitat', 'Agricultura Familiar', 'Artesanías y Manufactura', 'Reciclado y Economía Circular'];

export default function OrganizacionesPage() {
  const { organizaciones, convenios, importarDesdeExcel, eliminarOrganizacion } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list');
  const [busqueda, setBusqueda] = useState('');
  const [filtroActivo, setFiltroActivo] = useState('Todas');
  const [ciudadActiva, setCiudadActiva] = useState('Todas');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [isDeletingItem, setIsDeletingItem] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const ciudades = useMemo(() => {
    const unique = [...new Set(organizaciones.map(o => o.localizacion).filter(Boolean))];
    return ['Todas', ...unique.sort()];
  }, [organizaciones]);

  useEffect(() => {
    if (location.state?.openModalId) {
      const org = organizaciones.find(o => o.id === location.state.openModalId);
      if (org) {
        setSelectedItem(org);
      }
      window.history.replaceState({}, document.title);
    }
  }, [location.state, organizaciones]);

  const confirmDelete = () => {
    if (selectedItem) {
      eliminarOrganizacion(selectedItem.id);
      setSelectedItem(null);
      setIsDeletingItem(false);
    }
  };

  const statsObj = useMemo(() => {
    return {
      total: organizaciones.length,
      convenios: organizaciones.reduce((acc, org) => acc + (org.convenios || 0), 0),
      presupuestoTotal: organizaciones.length > 0 ? '$\u00A015.610.000' : '$\u00A00'
    };
  }, [organizaciones]);

  const stats = [
    { label: 'Total', value: `${statsObj.total} organizaciones` },
    { label: 'Convenios activos', value: statsObj.convenios, valueColor: 'text-primario' },
    { label: 'Presupuesto total', value: statsObj.presupuestoTotal }
  ];

  const filteredData = useMemo(() => {
    return organizaciones.filter(org => {
      const matchesSearch = org.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const matchesFilter = filtroActivo === 'Todas' || org.especializacion.toLowerCase().includes(filtroActivo.toLowerCase());
      const matchesCiudad = ciudadActiva === 'Todas' || org.localizacion === ciudadActiva;
      return matchesSearch && matchesFilter && matchesCiudad;
    });
  }, [organizaciones, busqueda, filtroActivo, ciudadActiva]);

  const getDetailContent = (org) => {
    if (!org) return null;
    return (
      <div className="flex flex-col" style={{ gap: '20px' }}>
        <div className="text-sm font-semibold text-pizarra/80 mb-2">
          {org.localizacion}
        </div>

        <div className="grid grid-cols-2" style={{ gap: '16px' }}>
          <div className="bg-canvas rounded-xl" style={{ padding: '16px' }}>
            <div className="text-xs font-bold text-pizarra/50 uppercase mb-1">Especialización</div>
            <p className="text-sm font-bold text-texto">{org.especializacion}</p>
          </div>
          <div className="bg-canvas rounded-xl" style={{ padding: '16px' }}>
            <div className="text-xs font-bold text-pizarra/50 uppercase mb-1">Presupuesto</div>
            <p className="text-base font-bold text-texto whitespace-nowrap">{typeof org.presupuesto === 'number' ? `$\u00A0${org.presupuesto.toLocaleString('es-AR')}` : String(org.presupuesto || '').replace(/\$\s*/g, '$\u00A0')}</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="group bg-canvas rounded-xl cursor-pointer hover:bg-primario/10 transition-colors" 
            style={{ padding: '16px' }}
            onClick={() => navigate('/talleres', { state: { filterOrg: org.nombre } })}
            title={`Ver talleres de ${org.nombre}`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-pizarra/50 uppercase mb-1">
              <span>Talleres</span>
              <span className="text-[10px] text-primario font-semibold group-hover:underline">Ver todos</span>
            </div>
            <p className="text-base font-bold text-texto">{org.talleres}</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="bg-canvas rounded-xl cursor-pointer hover:bg-primario/10 transition-colors" 
            style={{ padding: '16px' }}
            onClick={() => navigate('/beneficiarios', { state: { filterOrg: org.nombre } })}
            title={`Ver beneficiarios de ${org.nombre}`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-pizarra/50 uppercase mb-1">
              <span>Beneficiarios</span>
              <span className="text-[10px] text-primario font-semibold bg-primario/10 px-1.5 py-0.5 rounded">Ver todos</span>
            </div>
            <p className="text-base font-semibold text-texto">{org.beneficiarios || '-'}</p>
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <>
      <PageTemplate
        title="Organizaciones"
        subtitle="Gestión de unidades productivas del programa"
        onImport={importarDesdeExcel}
        onNew={() => setIsNewModalOpen(true)}
        newButtonText="Nueva Organización"
        stats={stats}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        filterGroups={[
          {
            label: 'Categoría',
            options: FILTROS,
            active: filtroActivo,
            onChange: setFiltroActivo,
            defaultVal: 'Todas',
            layoutId: 'activeOrgCategoryPill'
          },
          {
            label: 'Ciudad',
            options: ciudades,
            active: ciudadActiva,
            onChange: setCiudadActiva,
            defaultVal: 'Todas',
            layoutId: 'activeOrgCityPill',
            formatLabel: (c) => c === 'Todas' ? 'Todas las ciudades' : c.replace(', Santa Fe', '')
          }
        ]}
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalItems={organizaciones.length}
        filteredItemsCount={filteredData.length}
      >
        {/* Table / Grid with generous separation */}
        <div className="pt-2">
          {viewMode === 'list' ? (
            <OrganizacionesTable data={filteredData} onItemClick={setSelectedItem} />
          ) : (
            <OrganizacionesGrid data={filteredData} onItemClick={setSelectedItem} />
          )}
        </div>
      </PageTemplate>

      <Modal 
        isOpen={!!selectedItem && !isEditingItem} 
        onClose={() => { setSelectedItem(null); setIsDeletingItem(false); }} 
        title={isDeletingItem ? 'Confirmar Eliminación' : (selectedItem?.nombre || 'Detalle de Organización')}
      >
        {isDeletingItem ? (
          <div className="flex flex-col items-center text-center" style={{ padding: '24px 0' }}>
            <h3 className="text-lg font-bold text-texto" style={{ marginBottom: '8px' }}>¿Eliminar Organización?</h3>
            <p className="text-sm text-pizarra/80" style={{ marginBottom: '24px' }}>Esta acción no se puede deshacer. Se perderán todos los datos asociados a "{selectedItem?.nombre}".</p>
            <div className="flex justify-center" style={{ gap: '12px' }}>
              <button onClick={() => setIsDeletingItem(false)} className="text-sm font-semibold text-pizarra hover:bg-canvas rounded-xl transition-colors cursor-pointer border border-borde" style={{ padding: '8px 16px' }}>Cancelar</button>
              <button onClick={confirmDelete} className="text-sm font-semibold text-white bg-critico hover:bg-critico/90 rounded-xl transition-colors cursor-pointer" style={{ padding: '8px 16px' }}>Sí, eliminar</button>
            </div>
          </div>
        ) : (
          <>
            {getDetailContent(selectedItem)}
            
            {/* Mini-listado de convenios vinculados */}
            {selectedItem && (() => {
              const orgConvenios = convenios.filter(c => c.org_id === selectedItem.id);
              return orgConvenios.length > 0 ? (
                <div style={{ marginTop: '20px' }}>
                  <h4 className="text-xs font-bold text-pizarra/70 uppercase tracking-wider" style={{ marginBottom: '12px' }}>
                    Convenios vinculados ({orgConvenios.length})
                  </h4>
                  <div className="flex flex-col" style={{ gap: '8px' }}>
                    {orgConvenios.map(conv => (
                      <div key={conv.id} className="bg-canvas border border-borde rounded-xl flex items-center justify-between" style={{ padding: '12px 16px' }}>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-texto truncate">{conv.nombre}</p>
                          <p className="text-xs text-pizarra/60">Firma: {conv.fechaFirma} · Vto: {conv.fechaVencimiento}</p>
                        </div>
                        <div className="flex items-center shrink-0" style={{ gap: '12px' }}>
                          <span className={`text-xs font-bold rounded-full ${conv.estado === 'Activo' ? 'bg-exito/10 text-exito' : 'bg-naranja/10 text-naranja'}`} style={{ padding: '3px 10px' }}>
                            {conv.estado}
                          </span>
                          <button className="text-pizarra/40 hover:text-primario transition-colors cursor-pointer" title="Ver documento (demo)">
                            <DocumentPdf size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center text-pizarra/40 text-sm font-medium" style={{ marginTop: '20px', padding: '16px 0' }}>
                  No tiene convenios vinculados.
                </div>
              );
            })()}

            <div className="flex justify-end border-t border-borde" style={{ marginTop: '20px', paddingTop: '16px', gap: '12px' }}>
              <button onClick={() => setIsDeletingItem(true)} className="text-sm font-semibold text-critico hover:bg-critico/10 rounded-xl transition-colors cursor-pointer border border-critico/20" style={{ padding: '8px 16px' }}>Eliminar</button>
              <button onClick={() => setIsEditingItem(true)} className="text-sm font-semibold text-white bg-primario hover:bg-primario/90 rounded-xl transition-colors cursor-pointer" style={{ padding: '8px 16px' }}>Editar</button>
            </div>
          </>
        )}
      </Modal>

      <Modal
        isOpen={isEditingItem && !!selectedItem}
        onClose={() => setIsEditingItem(false)}
        title="Editar Organización"
      >
        <OrganizacionForm initialData={selectedItem} onClose={() => { setIsEditingItem(false); setSelectedItem(null); }} />
      </Modal>

      <Modal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        title="Nueva Organización"
      >
        <OrganizacionForm onClose={() => setIsNewModalOpen(false)} />
      </Modal>
    </>
  );
}
