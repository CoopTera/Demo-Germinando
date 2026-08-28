import React, { useState, useMemo, useEffect } from 'react';
import { Building2, MapPin, Hammer, Users, DollarSign, Target } from 'lucide-react';
import { useData } from '../context/DataContext';
import OrganizacionesTable from '../components/organizaciones/OrganizacionesTable';
import OrganizacionesGrid from '../components/organizaciones/OrganizacionesGrid';
import PageTemplate from '../components/layout/PageTemplate';
import Modal from '../components/common/Modal';
import OrganizacionForm from '../components/forms/OrganizacionForm';
import { useLocation } from 'react-router-dom';

const FILTROS = ['Todas', 'Textil e Indumentaria', 'Producción Alimentaria', 'Construcción y Hábitat', 'Agricultura Familiar', 'Artesanías y Manufactura', 'Reciclado y Economía Circular'];

export default function OrganizacionesPage() {
  const { organizaciones, importarDesdeExcel, eliminarOrganizacion } = useData();
  const location = useLocation();
  const [viewMode, setViewMode] = useState('list');
  const [busqueda, setBusqueda] = useState('');
  const [filtroActivo, setFiltroActivo] = useState('Todas');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [isDeletingItem, setIsDeletingItem] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  useEffect(() => {
    if (location.state?.openModalId) {
      const org = organizaciones.find(o => o.id === location.state.openModalId);
      if (org) {
        setSelectedItem(org);
      }
      // Clean up state so it doesn't reopen on refresh
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
      presupuestoTotal: organizaciones.length > 0 ? '$ 15.610.000' : '$ 0'
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
      return matchesSearch && matchesFilter;
    });
  }, [organizaciones, busqueda, filtroActivo]);

  const getDetailContent = (org) => {
    if (!org) return null;
    return (
      <div className="flex flex-col" style={{ gap: '20px' }}>
        <div className="flex items-center text-sm font-semibold text-pizarra/80 mb-2" style={{ gap: '6px' }}>
          <MapPin style={{ width: '16px', height: '16px' }} className="text-pizarra/50" />
          {org.localizacion}
        </div>

        <div className="grid grid-cols-2" style={{ gap: '16px' }}>
          <div className="bg-canvas rounded border border-borde" style={{ padding: '16px' }}>
            <div className="flex items-center text-xs font-bold text-pizarra/50 uppercase mb-1" style={{ gap: '4px' }}><Target style={{ width: '14px', height: '14px' }} /> Especialización</div>
            <p className="text-sm font-bold text-texto">{org.especializacion}</p>
          </div>
          <div className="bg-canvas rounded border border-borde" style={{ padding: '16px' }}>
            <div className="flex items-center text-xs font-bold text-pizarra/50 uppercase mb-1" style={{ gap: '4px' }}><DollarSign style={{ width: '14px', height: '14px' }} /> Presupuesto</div>
            <p className="text-base font-bold text-texto">{org.presupuesto}</p>
          </div>
          <div className="bg-canvas rounded border border-borde" style={{ padding: '16px' }}>
            <div className="flex items-center text-xs font-bold text-pizarra/50 uppercase mb-1" style={{ gap: '4px' }}><Hammer style={{ width: '14px', height: '14px' }} /> Talleres</div>
            <p className="text-base font-semibold text-texto">{org.talleres}</p>
          </div>
          <div className="bg-canvas rounded border border-borde" style={{ padding: '16px' }}>
            <div className="flex items-center text-xs font-bold text-pizarra/50 uppercase mb-1" style={{ gap: '4px' }}><Users style={{ width: '14px', height: '14px' }} /> Beneficiarios</div>
            <p className="text-base font-semibold text-texto">{org.beneficiarios || '-'}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <PageTemplate
        icon={Building2}
        title="Organizaciones"
        subtitle="Gestión de unidades productivas del programa"
        onImport={importarDesdeExcel}
        onNew={() => setIsNewModalOpen(true)}
        newButtonText="Nueva Organización"
        stats={stats}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        filtros={FILTROS}
        filtroActivo={filtroActivo}
        setFiltroActivo={setFiltroActivo}
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalItems={organizaciones.length}
        filteredItemsCount={filteredData.length}
      >
        {viewMode === 'list' ? (
          <OrganizacionesTable data={filteredData} onItemClick={setSelectedItem} />
        ) : (
          <OrganizacionesGrid data={filteredData} onItemClick={setSelectedItem} />
        )}
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
              <button onClick={() => setIsDeletingItem(false)} className="text-sm font-semibold text-pizarra hover:bg-canvas rounded-md transition-colors cursor-pointer border border-borde" style={{ padding: '8px 16px' }}>Cancelar</button>
              <button onClick={confirmDelete} className="text-sm font-semibold text-white bg-critico hover:bg-critico/90 rounded-md shadow-sm transition-colors cursor-pointer" style={{ padding: '8px 16px' }}>Sí, eliminar</button>
            </div>
          </div>
        ) : (
          <>
            {getDetailContent(selectedItem)}
            
            <div className="mt-4 flex gap-2">
              <button className="flex-1 text-xs font-semibold text-pizarra hover:bg-canvas border border-borde rounded-md py-2 transition-colors flex items-center justify-center gap-2">
                + Añadir Convenio
              </button>
              <button className="flex-1 text-xs font-semibold text-pizarra hover:bg-canvas border border-borde rounded-md py-2 transition-colors flex items-center justify-center gap-2">
                + Añadir Taller
              </button>
            </div>

            <div className="flex justify-end border-t border-borde mt-6" style={{ paddingTop: '16px', gap: '12px' }}>
              <button onClick={() => setIsDeletingItem(true)} className="text-sm font-semibold text-critico hover:bg-critico/10 rounded-md transition-colors cursor-pointer border border-critico/20" style={{ padding: '8px 16px' }}>Eliminar</button>
              <button onClick={() => setIsEditingItem(true)} className="text-sm font-semibold text-white bg-primario hover:bg-primario/90 rounded-md shadow-sm transition-colors cursor-pointer" style={{ padding: '8px 16px' }}>Editar</button>
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
