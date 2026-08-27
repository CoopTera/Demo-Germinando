import React, { useState, useMemo } from 'react';
import { Building2, MapPin, Hammer, Users, DollarSign, Target } from 'lucide-react';
import { useData } from '../context/DataContext';
import OrganizacionesTable from '../components/organizaciones/OrganizacionesTable';
import OrganizacionesGrid from '../components/organizaciones/OrganizacionesGrid';
import PageTemplate from '../components/layout/PageTemplate';
import Modal from '../components/common/Modal';
import OrganizacionForm from '../components/forms/OrganizacionForm';

const FILTROS = ['Todas', 'Textil e Indumentaria', 'Producción Alimentaria', 'Construcción y Hábitat', 'Agricultura Familiar', 'Artesanías y Manufactura', 'Reciclado y Economía Circular'];

export default function OrganizacionesPage() {
  const { organizaciones, importarDesdeExcel } = useData();
  const [viewMode, setViewMode] = useState('list');
  const [busqueda, setBusqueda] = useState('');
  const [filtroActivo, setFiltroActivo] = useState('Todas');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

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
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        title={selectedItem?.nombre || 'Detalle de Organización'}
      >
        {getDetailContent(selectedItem)}
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
