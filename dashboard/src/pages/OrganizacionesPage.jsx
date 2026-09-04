import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import PageTemplate from '../components/layout/PageTemplate';
import Modal from '../components/common/Modal';
import InlineDetailPanel from '../components/common/InlineDetailPanel';
import ColumnSelector from '../components/common/ColumnSelector';
import OrganizacionesTable from '../components/tables/OrganizacionesTable';
import OrganizacionesGrid from '../components/organizaciones/OrganizacionesGrid';
import OrganizacionForm from '../components/forms/OrganizacionForm';
import MiniGraph from '../components/graph/MiniGraph';
import { useLocation, useNavigate } from 'react-router-dom';
import { Location, Document, Construction, UserMultiple } from '@carbon/icons-react';

const FILTROS = ['Todas', 'Textil e Indumentaria', 'Producción Alimentaria', 'Construcción y Hábitat', 'Agricultura Familiar', 'Artesanías y Manufactura', 'Reciclado y Economía Circular'];

export default function OrganizacionesPage() {
  const { organizaciones, convenios, talleres, beneficiarios, importarDesdeExcel, eliminarOrganizacion } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const [filtroActivo, setFiltroActivo] = useState('Todas');
  const [busqueda, setBusqueda] = useState(location.state?.filterOrg || location.state?.search || '');
  const [viewMode, setViewMode] = useState('list');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [isDeletingItem, setIsDeletingItem] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [panelWidth, setPanelWidth] = useState(480);

  const ciudades = useMemo(() => {
    const unique = [...new Set(organizaciones.map(o => o.localizacion).filter(Boolean))];
    return ['Todas', ...unique];
  }, [organizaciones]);

  const [filtroCiudad, setFiltroCiudad] = useState('Todas');

  const defaultCols = useMemo(() => ({
    col1: true, col2: true, col7: false, col3: true, col4: true, col5: true, col8: true, col6: true
  }), []);

  const defaultOrder = useMemo(() => [
    { id: 'col1', label: 'Nombre' },
    { id: 'col2', label: 'Localización' },
    { id: 'col7', label: 'Dirección' },
    { id: 'col3', label: 'Especialización' },
    { id: 'col4', label: 'Convenios' },
    { id: 'col5', label: 'Talleres' },
    { id: 'col8', label: 'Beneficiarios' },
    { id: 'col6', label: 'Presupuesto' }
  ], []);

  const [visibleCols, setVisibleCols] = useState(() => {
    try {
      const saved = localStorage.getItem('cols_organizaciones_v5');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return { ...defaultCols, ...parsed };
        }
      }
    } catch (e) {}
    return defaultCols;
  });

  const [orderedColumns, setOrderedColumns] = useState(() => {
    try {
      const savedOrder = localStorage.getItem('order_organizaciones_v5');
      if (savedOrder) {
        const parsed = JSON.parse(savedOrder);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const missing = defaultOrder.filter(d => !parsed.some(p => p.id === d.id));
          return [...parsed, ...missing];
        }
      }
    } catch(e) {}
    return defaultOrder;
  });

  React.useEffect(() => {
    localStorage.setItem('order_organizaciones_v5', JSON.stringify(orderedColumns));
  }, [orderedColumns]);

  React.useEffect(() => {
    if (location.state?.openModalId) {
      const org = organizaciones.find(o => o.id === location.state.openModalId);
      if (org) setSelectedItem(org);
      window.history.replaceState({}, document.title);
    }
  }, [location.state, organizaciones]);

  const filteredData = useMemo(() => {
    return organizaciones.filter(o => {
      const matchCat = filtroActivo === 'Todas' || o.especializacion === filtroActivo;
      const matchCiu = filtroCiudad === 'Todas' || o.localizacion === filtroCiudad;
      const busq = busqueda.toLowerCase();
      const matchBusq = !busqueda || 
        (o.nombre && o.nombre.toLowerCase().includes(busq)) ||
        (o.localizacion && o.localizacion.toLowerCase().includes(busq)) ||
        (o.especializacion && o.especializacion.toLowerCase().includes(busq));
      return matchCat && matchCiu && matchBusq;
    });
  }, [organizaciones, filtroActivo, filtroCiudad, busqueda]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [busqueda, filtroActivo, filtroCiudad]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const confirmDelete = () => {
    if (selectedItem) {
      eliminarOrganizacion(selectedItem.id);
      setSelectedItem(null);
      setIsDeletingItem(false);
    }
  };

  const stats = [
    { label: 'Total', value: `${organizaciones.length} org.` },
    { label: 'Convenios Activos', value: convenios.filter(c => c.estado === 'Activo').length }
  ];

  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return '$ 0';
    return amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
  };

  const getOrgDetailContent = (org) => {
    if (!org) return null;
    const orgConvenios = convenios.filter(c => c.org_id === org.id);
    const orgTalleres = talleres.filter(t => (t.org_ids || []).includes(org.id));
    const orgBen = beneficiarios.filter(b => (b.talleres || []).some(tId => orgTalleres.some(t => t.id === tId)));

    return (
      <div className="flex flex-col gap-5 text-texto">
        {/* Category & Location Header Pill Bar */}
        <div className="bg-white p-4 rounded-xl border border-borde shadow-sm flex items-center justify-between gap-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-primario/10 text-primario border border-primario/20">
            {org.especializacion}
          </span>
          <p className="text-xs text-pizarra/70 font-semibold flex items-center gap-1">
            <Location size={14} className="shrink-0 text-pizarra/40" />
            {org.localizacion}
          </p>
        </div>

        {/* 3 Metrics Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-borde shadow-sm flex flex-col items-center justify-center text-center">
            <Document size={20} className="text-pizarra/50 mb-1" />
            <span className="text-[11px] font-bold text-pizarra/60 uppercase tracking-wider block mb-0.5">Convenios</span>
            <p className="text-2xl font-extrabold text-texto">{orgConvenios.length || org.convenios || 0}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-borde shadow-sm flex flex-col items-center justify-center text-center">
            <Construction size={20} className="text-naranja/70 mb-1" />
            <span className="text-[11px] font-bold text-pizarra/60 uppercase tracking-wider block mb-0.5">Talleres</span>
            <p className="text-2xl font-extrabold text-texto">{orgTalleres.length || org.talleres || 0}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-borde shadow-sm flex flex-col items-center justify-center text-center">
            <UserMultiple size={20} className="text-primario/70 mb-1" />
            <span className="text-[11px] font-bold text-pizarra/60 uppercase tracking-wider block mb-0.5">Beneficiarios</span>
            <p className="text-2xl font-extrabold text-primario">{orgBen.length}</p>
          </div>
        </div>

        {/* Info Grid (2 Columns) */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-5 rounded-2xl border border-borde shadow-sm">
            <span className="text-xs font-bold text-pizarra/60 uppercase tracking-wider block mb-1">Presupuesto Asignado</span>
            <p className="text-lg font-extrabold text-primario">{formatCurrency(org.presupuesto)}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-borde shadow-sm">
            <span className="text-xs font-bold text-pizarra/60 uppercase tracking-wider block mb-1">Dirección</span>
            <p className="text-sm font-semibold text-texto leading-snug">{org.direccion || 'Sin dirección registrada'}</p>
          </div>
        </div>

        {/* Linked Convenios */}
        {orgConvenios.length > 0 && (
          <div className="bg-white p-5 rounded-2xl border border-borde shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-pizarra/70 uppercase tracking-wider">Convenios Vinculados</span>
              <span className="px-2.5 py-0.5 bg-primario/10 text-primario rounded-full text-xs font-bold">{orgConvenios.length}</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {orgConvenios.map(c => (
                <button
                  key={c.id}
                  onClick={() => navigate('/convenios', { state: { openModalId: c.id } })}
                  className="w-full text-left p-3.5 rounded-xl bg-canvas border border-borde hover:bg-superficie-sec transition-all cursor-pointer flex justify-between items-center gap-3 group"
                >
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-xs font-bold text-texto truncate group-hover:text-primario transition-colors">{c.nombre}</span>
                    <span className="text-[11px] text-pizarra/60">{c.expediente || 'Sin exp.'}</span>
                  </div>
                  <span className="text-xs font-extrabold text-primario shrink-0">{formatCurrency(c.monto)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Linked Talleres */}
        {orgTalleres.length > 0 && (
          <div className="bg-white p-5 rounded-2xl border border-borde shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-pizarra/70 uppercase tracking-wider">Talleres a Cargo</span>
              <span className="px-2.5 py-0.5 bg-naranja/10 text-naranja rounded-full text-xs font-bold">{orgTalleres.length}</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {orgTalleres.map(t => (
                <button
                  key={t.id}
                  onClick={() => navigate('/talleres', { state: { filterOrg: t.nombre } })}
                  className="w-full text-left p-3.5 rounded-xl bg-canvas border border-borde hover:bg-superficie-sec transition-all cursor-pointer flex flex-col gap-2 group"
                >
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-xs font-bold text-texto truncate group-hover:text-primario transition-colors">{t.nombre}</span>
                    <span className="text-xs font-bold text-naranja shrink-0">{t.inscriptos}/{t.cupo} inscriptos</span>
                  </div>
                  {/* Capacity Bar */}
                  <div className="w-full h-1.5 bg-borde rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-naranja rounded-full transition-all" 
                      style={{ width: `${Math.min(100, (t.inscriptos / t.cupo) * 100)}%` }} 
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Red de Vínculos (At Very Bottom) */}
        <div className="bg-white p-5 rounded-2xl border border-borde shadow-sm space-y-3">
          <div>
            <span className="text-xs font-bold text-pizarra/70 uppercase tracking-wider block">Red de Vínculos</span>
            <p className="text-xs text-pizarra/60 mt-0.5">Mapa de conexiones directas de la organización.</p>
          </div>
          <MiniGraph rootEntityId={org.id} rootEntityType="organizacion" height={200} />
        </div>
      </div>
    );
  };

  return (
    <>
      <div 
        className="transition-all duration-300 min-w-0" 
        style={{ marginRight: selectedItem && !isEditingItem && !isDeletingItem ? `${panelWidth}px` : 0 }}
      >
        <PageTemplate
          title="Organizaciones"
          subtitle="Registro y gestión de organizaciones de la economía social"
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
              label: 'Localidad',
              options: ciudades,
              active: filtroCiudad,
              onChange: setFiltroCiudad,
              defaultVal: 'Todas',
              layoutId: 'activeOrgCityPill'
            }
          ]}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalItems={organizaciones.length}
          filteredItemsCount={filteredData.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          tableControls={
            viewMode === 'list' && (
              <ColumnSelector 
                columns={orderedColumns} 
                setColumns={setOrderedColumns}
                visibleColumns={visibleCols} 
                setVisibleColumns={setVisibleCols} 
                storageKey="cols_organizaciones_v5" 
              />
            )
          }
        >
          <div className="pt-2">
            {viewMode === 'list' ? (
              <OrganizacionesTable data={paginatedData} onItemClick={setSelectedItem} visibleCols={visibleCols} orderedColumns={orderedColumns} />
            ) : (
              <OrganizacionesGrid data={paginatedData} onItemClick={setSelectedItem} />
            )}
          </div>
        </PageTemplate>
      </div>

      <InlineDetailPanel 
        isOpen={!!selectedItem && !isEditingItem && !isDeletingItem} 
        onClose={() => setSelectedItem(null)} 
        title={selectedItem?.nombre || 'Detalle de Organización'}
        onWidthChange={setPanelWidth}
        actions={
          <>
            <button onClick={() => setIsDeletingItem(true)} style={{ fontSize: '13px', fontWeight: 600, color: '#E42153', background: '#fff', border: '1px solid rgba(228,33,83,0.25)', borderRadius: '10px', padding: '8px 18px', cursor: 'pointer', transition: 'all 0.15s' }}>Eliminar</button>
            <button onClick={() => setIsEditingItem(true)} style={{ fontSize: '13px', fontWeight: 600, color: '#fff', background: '#6B1330', border: 'none', borderRadius: '10px', padding: '8px 22px', cursor: 'pointer', transition: 'all 0.15s' }}>Editar</button>
          </>
        }
      >
        {getOrgDetailContent(selectedItem)}
      </InlineDetailPanel>

      <Modal isOpen={isDeletingItem} onClose={() => setIsDeletingItem(false)} title="Confirmar Eliminación">
        <div className="flex flex-col items-center text-center py-4">
          <h3 className="text-lg font-bold text-texto mb-2">¿Eliminar Organización?</h3>
          <p className="text-sm text-pizarra/80 mb-6">Esta acción no se puede deshacer.</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => setIsDeletingItem(false)} className="text-sm font-semibold text-pizarra border border-borde rounded-xl px-4 py-2">Cancelar</button>
            <button onClick={confirmDelete} className="text-sm font-semibold text-white bg-critico rounded-xl px-4 py-2">Sí, eliminar</button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isEditingItem} onClose={() => setIsEditingItem(false)} title="Editar Organización">
        <OrganizacionForm initialData={selectedItem} onClose={() => { setIsEditingItem(false); setSelectedItem(null); }} />
      </Modal>

      <Modal isOpen={isNewModalOpen} onClose={() => setIsNewModalOpen(false)} title="Nueva Organización">
        <OrganizacionForm onClose={() => setIsNewModalOpen(false)} />
      </Modal>
    </>
  );
}
