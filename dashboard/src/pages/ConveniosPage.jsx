import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import PageTemplate from '../components/layout/PageTemplate';
import Modal from '../components/common/Modal';
import ColumnSelector from '../components/common/ColumnSelector';
import ConveniosTable from '../components/tables/ConveniosTable';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ConveniosPage() {
  const { convenios, organizaciones, talleres, setConvenios } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [isDeletingItem, setIsDeletingItem] = useState(false);
  const [filtroActivo, setFiltroActivo] = useState('Todos');
  const [visibleCols, setVisibleCols] = useState(() => {
    const defaultCols = { col1: true, col2: true, col4: true, col5: true, col3: true, col5: true, col6: true };
    try {
      const saved = localStorage.getItem('cols_convenios_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (e) {}
    return defaultCols;
  });

  const [orderedColumns, setOrderedColumns] = useState(() => {
    const defaultOrder = [
      { id: 'col1', label: 'Nombre' },
      { id: 'col2', label: 'Organización Vinculada' },
      { id: 'col4', label: 'Firma' },
      { id: 'col5', label: 'Vencimiento' },
      { id: 'col3', label: 'Monto' },
      { id: 'col6', label: 'Estado' }
    ];
    try {
      const savedOrder = localStorage.getItem('order_convenios_v3');
      if (savedOrder) {
        const parsed = JSON.parse(savedOrder);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch(e) {}
    return defaultOrder;
  });

  React.useEffect(() => {
    localStorage.setItem('order_convenios_v3', JSON.stringify(orderedColumns));
  }, [orderedColumns]);

  useEffect(() => {
    if (location.state?.openModalId) {
      const conv = convenios.find(c => c.id === location.state.openModalId);
      if (conv) setSelectedItem(conv);
      window.history.replaceState({}, document.title);
    }
  }, [location.state, convenios]);

  const getOrgName = (orgId) => {
    const org = organizaciones.find(o => o.id === orgId);
    return org ? org.nombre : 'Desconocida';
  };

  const getDaysLeft = (fechaVencimiento) => {
    if (!fechaVencimiento) return null;
    const [year, month, day] = fechaVencimiento.split('-');
    const vDate = new Date(year, month - 1, day);
    const today = new Date();
    const diff = vDate - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const filteredConvenios = convenios.filter(c => {
    const matchesSearch = c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          getOrgName(c.org_id).toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    if (filtroActivo !== 'Todos') {
      if (filtroActivo === 'Próximos a vencer') {
        const daysLeft = getDaysLeft(c.fechaVencimiento);
        matchesFilter = daysLeft !== null && daysLeft >= 0 && daysLeft <= 30;
      } else {
        matchesFilter = c.estado === filtroActivo;
      }
    }
    
    return matchesSearch && matchesFilter;
  });

  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return '$\u00A00';
    const formatted = amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
    return formatted.replace(/\$\s*/g, '$\u00A0');
  };



  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filtroActivo]);

  const paginatedConvenios = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredConvenios.slice(start, start + pageSize);
  }, [filteredConvenios, currentPage, pageSize]);

  return (
    <PageTemplate 
      title="Gestión de Convenios" 
      subtitle="Administración de convenios activos con organizaciones"
      busqueda={searchTerm}
      setBusqueda={setSearchTerm}
      filtros={['Todos', 'Activo', 'Próximos a vencer', 'Por vencer', 'En revisión', 'Finalizado']}
      filtroActivo={filtroActivo}
      setFiltroActivo={setFiltroActivo}
      onNew={() => setIsNewModalOpen(true)}
      newButtonText="Nuevo Convenio"
      totalItems={convenios.length}
      filteredItemsCount={filteredConvenios.length}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
      stats={[
        { label: 'Total Convenios', value: convenios.length },
        { label: 'Presupuesto Total', value: formatCurrency(convenios.reduce((acc, c) => acc + c.monto, 0)) }
      ]}
      tableControls={
        <ColumnSelector 
          columns={orderedColumns} 
          setColumns={setOrderedColumns}
          visibleColumns={visibleCols} 
          setVisibleColumns={setVisibleCols} 
          storageKey="cols_convenios_v3" 
        />
      }
    >
      <div className="pt-2">
        <ConveniosTable data={paginatedConvenios} onItemClick={setSelectedItem} visibleCols={visibleCols} orderedColumns={orderedColumns} getOrgName={getOrgName} />
      </div>

      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.nombre || 'Detalle de Convenio'}>
        {selectedItem && (
          <>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-pizarra/70 uppercase font-bold tracking-wider">Organización</label>
                <button 
                  onClick={() => {
                    setSelectedItem(null);
                    navigate('/organizaciones', { state: { openModalId: selectedItem.org_id } });
                  }}
                  className="text-sm font-semibold text-primario hover:underline cursor-pointer block text-left"
                >
                  {getOrgName(selectedItem.org_id)}
                </button>
              </div>
              <div>
                <label className="text-xs text-pizarra/70 uppercase font-bold tracking-wider">Monto Asignado</label>
                <p className="text-lg font-bold text-texto">{formatCurrency(selectedItem.monto)}</p>
              </div>
              <div>
                <label className="text-xs text-pizarra/70 uppercase font-bold tracking-wider">Estado</label>
                <p className="text-sm font-medium text-texto">{selectedItem.estado}</p>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 bg-white border border-borde text-pizarra hover:bg-canvas rounded-md py-2 font-medium text-sm transition-colors cursor-pointer">
                  Ver Documento (PDF)
                </button>
              </div>
            </div>

            {/* Mini-listado de talleres vinculados */}
            {(() => {
              const convTalleres = talleres.filter(t => t.convenio_id === selectedItem.id);
              return convTalleres.length > 0 ? (
                <div style={{ marginTop: '20px' }}>
                  <h4 className="text-xs font-bold text-pizarra/70 uppercase tracking-wider" style={{ marginBottom: '12px' }}>
                    Talleres vinculados ({convTalleres.length})
                  </h4>
                  <div className="flex flex-col" style={{ gap: '8px' }}>
                    {convTalleres.map(taller => (
                      <button 
                        key={taller.id} 
                        onClick={() => navigate('/talleres', { state: { filterOrg: taller.nombre } })}
                        className="bg-canvas border border-borde rounded-xl flex items-center justify-between text-left hover:bg-superficie-sec hover:border-primario/30 transition-all cursor-pointer" 
                        style={{ padding: '12px 16px' }}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-texto truncate group-hover:text-primario">{taller.nombre}</p>
                          <p className="text-xs text-pizarra/60">Cupo: {taller.inscriptos}/{taller.cupo}</p>
                        </div>
                        <div className="flex items-center shrink-0" style={{ gap: '12px' }}>
                          <span className={`text-xs font-bold rounded-full ${taller.estado === 'En curso' ? 'bg-primario/10 text-primario' : 'bg-pizarra/10 text-pizarra'}`} style={{ padding: '3px 10px' }}>
                            {taller.estado}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}

            <div className="flex justify-end border-t border-borde" style={{ marginTop: '20px', paddingTop: '16px', gap: '12px' }}>
              <button onClick={() => setIsDeletingItem(true)} className="text-sm font-semibold text-critico hover:bg-critico/10 rounded-xl transition-colors cursor-pointer border border-critico/20" style={{ padding: '8px 16px' }}>Eliminar</button>
              <button onClick={() => setIsEditingItem(true)} className="text-sm font-semibold text-white bg-primario hover:bg-primario/90 rounded-xl transition-colors cursor-pointer" style={{ padding: '8px 16px' }}>Editar</button>
            </div>
          </>
        )}
      </Modal>

      {/* Form Modal */}
      <Modal isOpen={isNewModalOpen} onClose={() => setIsNewModalOpen(false)} title="Nuevo Convenio">
        <form onSubmit={(e) => { e.preventDefault(); setIsNewModalOpen(false); }} className="flex flex-col" style={{ gap: '16px' }}>
          <div>
            <label className="block text-sm font-bold text-pizarra mb-1">Nombre del Convenio</label>
            <input type="text" required className="w-full bg-canvas text-texto text-sm rounded-xl border border-borde focus:outline-none focus:ring-2 focus:ring-primario/20" style={{ padding: '10px 16px' }} placeholder="Ej: Convenio Marco..." />
          </div>
          <div className="grid grid-cols-2" style={{ gap: '16px' }}>
            <div>
              <label className="block text-sm font-bold text-pizarra mb-1">Organización</label>
              <select required className="w-full bg-canvas text-texto text-sm rounded-xl border border-borde focus:outline-none focus:ring-2 focus:ring-primario/20 cursor-pointer" style={{ padding: '10px 16px' }}>
                <option value="">Seleccionar...</option>
                {organizaciones.map(org => <option key={org.id} value={org.id}>{org.nombre}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-pizarra mb-1">Monto Asignado ($)</label>
              <input type="number" required className="w-full bg-canvas text-texto text-sm rounded-xl border border-borde focus:outline-none focus:ring-2 focus:ring-primario/20" style={{ padding: '10px 16px' }} placeholder="Ej: 500000" />
            </div>
          </div>
          <div className="grid grid-cols-2" style={{ gap: '16px' }}>
            <div>
              <label className="block text-sm font-bold text-pizarra mb-1">Fecha de Firma</label>
              <input type="date" required className="w-full bg-canvas text-texto text-sm rounded-xl border border-borde focus:outline-none focus:ring-2 focus:ring-primario/20" style={{ padding: '10px 16px' }} />
            </div>
            <div>
              <label className="block text-sm font-bold text-pizarra mb-1">Fecha de Vencimiento</label>
              <input type="date" required className="w-full bg-canvas text-texto text-sm rounded-xl border border-borde focus:outline-none focus:ring-2 focus:ring-primario/20" style={{ padding: '10px 16px' }} />
            </div>
          </div>
          <div className="flex justify-end border-t border-borde" style={{ gap: '12px', marginTop: '16px', paddingTop: '16px' }}>
            <button type="button" onClick={() => setIsNewModalOpen(false)} className="text-sm font-semibold text-pizarra hover:bg-canvas rounded-xl transition-colors cursor-pointer border border-borde" style={{ padding: '8px 16px' }}>Cancelar</button>
            <button type="submit" className="text-sm font-semibold text-white bg-primario hover:bg-primario/90 rounded-xl transition-colors cursor-pointer" style={{ padding: '8px 16px' }}>Guardar Convenio</button>
          </div>
        </form>
      </Modal>
    </PageTemplate>
  );
}
