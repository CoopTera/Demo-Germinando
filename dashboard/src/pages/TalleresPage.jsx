import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import PageTemplate from '../components/layout/PageTemplate';
import { useTableResize } from '../hooks/useTableResize';
import Modal from '../components/common/Modal';
import ColumnSelector from '../components/common/ColumnSelector';
import TalleresTable from '../components/tables/TalleresTable';

export default function TalleresPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { talleres, organizaciones } = useData();
  const [searchTerm, setSearchTerm] = useState(location.state?.filterOrg || location.state?.search || '');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [filtroActivo, setFiltroActivo] = useState('Todos');

  const [visibleCols, setVisibleCols] = useState(() => {
    const defaultCols = { col1: true, col2: true, col3: true, col4: true, col5: true };
    try {
      const saved = localStorage.getItem('cols_talleres');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (e) {}
    return defaultCols;
  });

  const [orderedColumns, setOrderedColumns] = useState(() => {
    const defaultOrder = [
      { id: 'col1', label: 'Nombre del Taller' },
      { id: 'col2', label: 'Organización a Cargo' },
      { id: 'col3', label: 'Cupo Máximo' },
      { id: 'col4', label: 'Inscriptos' },
      { id: 'col5', label: 'Estado' }
    ];
    try {
      const savedOrder = localStorage.getItem('order_talleres');
      if (savedOrder) {
        const parsed = JSON.parse(savedOrder);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch(e) {}
    return defaultOrder;
  });

  React.useEffect(() => {
    localStorage.setItem('order_talleres', JSON.stringify(orderedColumns));
  }, [orderedColumns]);

  const getOrgName = (orgId) => {
    const org = organizaciones.find(o => o.id === orgId);
    return org ? org.nombre : 'Desconocida';
  };

  const filteredTalleres = talleres.filter(t => {
    const matchesSearch = t.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (t.org_ids || []).some(id => getOrgName(id).toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filtroActivo === 'Todos' || t.estado === filtroActivo;
    return matchesSearch && matchesFilter;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filtroActivo]);

  const paginatedTalleres = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTalleres.slice(start, start + pageSize);
  }, [filteredTalleres, currentPage, pageSize]);

  return (
    <PageTemplate 
      title="Gestión de Talleres" 
      subtitle="Administración de actividades y capacitaciones"
      busqueda={searchTerm}
      setBusqueda={setSearchTerm}
      filtros={['Todos', 'Abierto', 'En curso', 'Finalizado']}
      filtroActivo={filtroActivo}
      setFiltroActivo={setFiltroActivo}
      onNew={() => setIsNewModalOpen(true)}
      newButtonText="Nuevo Taller"
      totalItems={talleres.length}
      filteredItemsCount={filteredTalleres.length}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
      stats={[
        { label: 'Total Talleres', value: talleres.length },
        { label: 'Inscriptos Activos', value: talleres.reduce((acc, t) => acc + t.inscriptos, 0) }
      ]}
      tableControls={
        <ColumnSelector 
          columns={orderedColumns} 
          setColumns={setOrderedColumns}
          visibleColumns={visibleCols} 
          setVisibleColumns={setVisibleCols} 
          storageKey="cols_talleres" 
        />
      }
    >
      <div className="pt-2">
        <TalleresTable data={paginatedTalleres} onItemClick={setSelectedItem} visibleCols={visibleCols} orderedColumns={orderedColumns} getOrgName={getOrgName} />
      </div>

      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.nombre || 'Detalle de Taller'}>
        {selectedItem && (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-pizarra/70 uppercase font-bold tracking-wider">Organización a Cargo</label>
              <div className="flex flex-wrap" style={{ gap: '6px' }}>
                  {(selectedItem.org_ids || []).map((id, i) => (
                    <span key={i} onClick={() => navigate('/organizaciones', { state: { openModalId: id } })} className="bg-primario/10 text-primario text-xs rounded-full inline-block font-medium truncate cursor-pointer hover:bg-primario/20 transition-colors" style={{ padding: '4px 10px', maxWidth: '100%' }} title={getOrgName(id)}>
                      {getOrgName(id)}
                    </span>
                  ))}
                </div>
            </div>
            <div className="flex gap-8">
              <div>
                <label className="text-xs text-pizarra/70 uppercase font-bold tracking-wider">Inscriptos</label>
                <p className="text-lg font-bold text-texto">{selectedItem.inscriptos} / {selectedItem.cupo}</p>
              </div>
              <div>
                <label className="text-xs text-pizarra/70 uppercase font-bold tracking-wider">Estado</label>
                <p className="text-sm font-medium text-texto">{selectedItem.estado}</p>
              </div>
            </div>
            <div className="flex justify-end border-t border-borde pt-4 mt-4" style={{ gap: '12px' }}>
              <button onClick={() => { /* set deleting */ }} className="text-sm font-semibold text-critico hover:bg-critico/10 rounded-xl transition-colors cursor-pointer border border-critico/20" style={{ padding: '8px 16px' }}>Eliminar</button>
              <button onClick={() => { /* set editing */ }} className="text-sm font-semibold text-white bg-primario hover:bg-primario/90 rounded-xl transition-colors cursor-pointer" style={{ padding: '8px 16px' }}>Editar</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Form Modal */}
      <Modal isOpen={isNewModalOpen} onClose={() => setIsNewModalOpen(false)} title="Nuevo Taller">
        <form onSubmit={(e) => { e.preventDefault(); setIsNewModalOpen(false); }} className="flex flex-col" style={{ gap: '16px' }}>
          <div>
            <label className="block text-sm font-bold text-pizarra mb-1">Nombre del Taller</label>
            <input type="text" required className="w-full bg-canvas text-texto text-sm rounded-xl border border-borde focus:outline-none focus:ring-2 focus:ring-primario/20" style={{ padding: '10px 16px' }} placeholder="Ej: Taller de Oficios..." />
          </div>
          <div>
            <label className="block text-sm font-bold text-pizarra mb-1">Organización a Cargo</label>
            <select required className="w-full bg-canvas text-texto text-sm rounded-xl border border-borde focus:outline-none focus:ring-2 focus:ring-primario/20 cursor-pointer" style={{ padding: '10px 16px' }}>
              <option value="">Seleccionar...</option>
              {organizaciones.map(org => <option key={org.id} value={org.id}>{org.nombre}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2" style={{ gap: '16px' }}>
            <div>
              <label className="block text-sm font-bold text-pizarra mb-1">Cupo Máximo</label>
              <input type="number" required min="1" className="w-full bg-canvas text-texto text-sm rounded-xl border border-borde focus:outline-none focus:ring-2 focus:ring-primario/20" style={{ padding: '10px 16px' }} placeholder="Ej: 30" />
            </div>
            <div>
              <label className="block text-sm font-bold text-pizarra mb-1">Estado</label>
              <select required className="w-full bg-canvas text-texto text-sm rounded-xl border border-borde focus:outline-none focus:ring-2 focus:ring-primario/20 cursor-pointer" style={{ padding: '10px 16px' }}>
                <option value="Abierto">Abierto</option>
                <option value="En curso">En curso</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end border-t border-borde" style={{ gap: '12px', marginTop: '16px', paddingTop: '16px' }}>
            <button type="button" onClick={() => setIsNewModalOpen(false)} className="text-sm font-semibold text-pizarra hover:bg-canvas rounded-xl transition-colors cursor-pointer border border-borde" style={{ padding: '8px 16px' }}>Cancelar</button>
            <button type="submit" className="text-sm font-semibold text-white bg-primario hover:bg-primario/90 rounded-xl transition-colors cursor-pointer" style={{ padding: '8px 16px' }}>Guardar Taller</button>
          </div>
        </form>
      </Modal>
    </PageTemplate>
  );
}

