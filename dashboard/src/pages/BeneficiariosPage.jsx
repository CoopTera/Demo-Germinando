import React, { useState } from 'react';
import BeneficiariosTable from '../components/tables/BeneficiariosTable';
import BeneficiariosGrid from '../components/tables/BeneficiariosGrid';
import { useData } from '../context/DataContext';
import PageTemplate from '../components/layout/PageTemplate';
import Modal from '../components/common/Modal';
import InlineDetailPanel from '../components/common/InlineDetailPanel';
import ColumnSelector from '../components/common/ColumnSelector';
import EntityTimeline from '../components/common/EntityTimeline';
import MiniGraph from '../components/graph/MiniGraph';
import BeneficiarioForm from '../components/forms/BeneficiarioForm';
import CustomSelect from '../components/common/CustomSelect';
import { Add, EventSchedule, Location, Calendar, Time, Money } from '@carbon/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';

const FILTROS_ESTADO = ['Todos', 'Activos', 'Sin seguimiento'];

export default function BeneficiariosPage() {
  const { beneficiarios, importarBeneficiarios, eliminarBeneficiario, editarBeneficiario, organizaciones, talleres } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const [filtro, setFiltro] = useState('Todos');
  const [busqueda, setBusqueda] = useState(location.state?.filterOrg || location.state?.search || '');
  const [viewMode, setViewMode] = useState('list');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [isDeletingItem, setIsDeletingItem] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [panelWidth, setPanelWidth] = useState(480);
  
  const [visibleCols, setVisibleCols] = useState(() => {
    const defaultCols = { col2: true, col1: false, col3: true, col4: true, col9: true, col10: false, col5: true, col6: true, col7: true, col8: true };
    try {
      const saved = localStorage.getItem('cols_beneficiarios_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (e) {}
    return defaultCols;
  });

  const [orderedColumns, setOrderedColumns] = useState(() => {
    const defaultOrder = [
      { id: 'col2', label: 'Nombre' },
      { id: 'col1', label: 'DNI' },
      { id: 'col3', label: 'Organización' },
      { id: 'col4', label: 'Talleres' },
      { id: 'col9', label: 'Localización' },
      { id: 'col10', label: 'Dirección' },
      { id: 'col5', label: 'Fecha de Ingreso' },
      { id: 'col6', label: 'Tiempo de Beca' },
      { id: 'col7', label: 'Asistencia ($)' },
      { id: 'col8', label: 'Estado' }
    ];
    try {
      const savedOrder = localStorage.getItem('order_beneficiarios_v3');
      if (savedOrder) {
        const parsed = JSON.parse(savedOrder);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch(e) {}
    return defaultOrder;
  });

  React.useEffect(() => {
    localStorage.setItem('order_beneficiarios_v3', JSON.stringify(orderedColumns));
  }, [orderedColumns]);

  const [isTallerModalOpen, setIsTallerModalOpen] = useState(false);
  const [selectedTallerId, setSelectedTallerId] = useState('');
  
  const [isSeguimientoModalOpen, setIsSeguimientoModalOpen] = useState(false);
  const [seguimientoNota, setSeguimientoNota] = useState('');

  const confirmDelete = () => {
    if (selectedItem) {
      eliminarBeneficiario(selectedItem.id);
      setSelectedItem(null);
      setIsDeletingItem(false);
    }
  };

  const conAlerta = beneficiarios.filter((b) => b.alerta || b.estado === 'Sin seguimiento').length;

  const filteredData = beneficiarios.filter((b) => {
    const isSinSeguimiento = b.alerta || b.estado === 'Sin seguimiento';
    const matchFiltro =
      filtro === 'Todos' ||
      (filtro === 'Activos' && !isSinSeguimiento) ||
      (filtro === 'Sin seguimiento' && isSinSeguimiento);
    
    const busq = busqueda.toLowerCase();
    const matchBusqueda =
      !busqueda ||
      (b.nombre && b.nombre.toLowerCase().includes(busq)) ||
      (b.dni && b.dni.includes(busq)) ||
      (b.programas && b.programas.toLowerCase().includes(busq));
      
    return matchFiltro && matchBusqueda;
  });

  const stats = [
    { label: 'Total', value: `${beneficiarios.length} personas` },
    { label: 'Becas activas', value: beneficiarios.length - conAlerta, valueColor: 'text-primario' }
  ];

  if (conAlerta > 0) {
    stats.push({
      label: 'Sin seguimiento',
      value: `${conAlerta} personas`,
      valueColor: 'text-naranja'
    });
  }

  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return '$ 0';
    return amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
  };

  const getDetailContent = (b) => {
    if (!b) return null;
    const bTalleres = (b.talleres || []).map(tId => talleres.find(t => t.id === tId)).filter(Boolean);
    const bOrgsMap = new Map();
    bTalleres.forEach(t => {
      (t.org_ids || []).forEach(oId => {
        const o = organizaciones.find(org => org.id === oId);
        if (o) bOrgsMap.set(o.id, o);
      });
    });
    const bOrgs = Array.from(bOrgsMap.values());

    const fecha = b.inicioBeca || b.fechaInicio;
    const monto = b.monto !== undefined ? b.monto : b.presupuestoBeca;
    const ultimoReg = b.actividad || b.ultimoRegistro;
    const isSinSeguimiento = b.alerta || b.estado === 'Sin seguimiento';

    const handleOrgClick = (org) => {
      navigate('/organizaciones', { state: { openModalId: org.id } });
    };

    const handleEditEvent = (updatedEvent) => {
      const newHistorial = b.historial.map(e => e.id === updatedEvent.id ? updatedEvent : e);
      editarBeneficiario({ ...b, historial: newHistorial });
      setSelectedItem({ ...b, historial: newHistorial });
    };

    const handleDeleteEvent = (eventId) => {
      const newHistorial = b.historial.filter(e => e.id !== eventId);
      editarBeneficiario({ ...b, historial: newHistorial });
      setSelectedItem({ ...b, historial: newHistorial });
    };
    
    const cardStyle = { background: '#FFFFFF', padding: '20px 22px', borderRadius: '14px', border: '1px solid #E2E4EB' };
    const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 700, color: '#494963', opacity: 0.55, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* DNI + Status */}
        <div style={{ ...cardStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <span style={labelStyle}>DNI</span>
            <p style={{ fontSize: '15px', fontWeight: 700, color: '#2D2D3A' }}>{b.dni}</p>
          </div>
          <span style={{ padding: '5px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, ...(isSinSeguimiento ? { background: '#FFF0E5', color: '#FF7402' } : b.estado === 'Suspendido' ? { background: '#FDE8ED', color: '#E42153' } : { background: '#E8FAE8', color: '#22C55E' }) }}>
            {b.estado || (isSinSeguimiento ? 'Sin seguimiento' : 'Activo')}
          </span>
        </div>

        {/* Fechas & Monto Beca */}
        <div style={cardStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <span style={labelStyle}>Fecha Inicio</span>
              <p className="flex items-center gap-1.5" style={{ fontSize: '14px', fontWeight: 700, color: '#2D2D3A' }}>
                <Calendar size={16} className="text-pizarra/40 shrink-0" />
                {fecha}
              </p>
            </div>
            <div>
              <span style={labelStyle}>Último Registro</span>
              <p className="flex items-center gap-1.5" style={{ fontSize: '14px', fontWeight: 700, color: '#2D2D3A' }}>
                <Time size={16} className="text-pizarra/40 shrink-0" />
                {ultimoReg}
              </p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #E2E4EB', marginTop: '16px', paddingTop: '16px' }}>
            <span style={labelStyle}>Monto Beca Mensual</span>
            <p className="flex items-center gap-2" style={{ fontSize: '22px', fontWeight: 800, color: '#6B1330' }}>
              <Money size={22} style={{ color: '#6B1330', opacity: 0.5 }} className="shrink-0" />
              {formatCurrency(monto)}
            </p>
          </div>
        </div>

        {/* Localización & Dirección */}
        <div style={cardStyle}>
          <span style={labelStyle}>Localización & Dirección</span>
          <p className="flex items-center gap-1.5" style={{ fontSize: '14px', fontWeight: 700, color: '#2D2D3A' }}>
            <Location size={16} className="text-pizarra/40 shrink-0" />
            {b.localizacion || 'Santa Fe'}
          </p>
          <p style={{ fontSize: '13px', color: '#494963', opacity: 0.65, marginTop: '4px', paddingLeft: '22px' }}>{b.direccion || 'Sin dirección registrada'}</p>
        </div>
        
        {/* Programas y Organizaciones */}
        <div style={cardStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            {/* Talleres */}
            <div>
              <span style={labelStyle}>Talleres Asignados</span>
              <div className="flex flex-col gap-2" style={{ marginTop: '8px' }}>
                {bTalleres.length > 0 ? bTalleres.map((t, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF7402' }} />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#2D2D3A' }}>{t.nombre}</span>
                  </div>
                )) : <span style={{ color: '#494963', opacity: 0.5, fontSize: '13px', fontStyle: 'italic' }}>Sin talleres asignados</span>}
              </div>
            </div>
            
            {/* Organizaciones */}
            <div style={{ borderTop: '1px solid #E2E4EB', paddingTop: '16px' }}>
              <span style={labelStyle}>Organizaciones Vinculadas</span>
              <div className="flex flex-wrap gap-2" style={{ marginTop: '8px' }}>
                {bOrgs.length > 0 ? bOrgs.map((org, idx) => (
                  <button key={idx} onClick={() => handleOrgClick(org)} style={{ background: 'rgba(107,19,48,0.08)', color: '#6B1330', border: '1px solid rgba(107,19,48,0.15)', padding: '7px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => { e.target.style.background = '#6B1330'; e.target.style.color = '#fff'; }} onMouseLeave={e => { e.target.style.background = 'rgba(107,19,48,0.08)'; e.target.style.color = '#6B1330'; }}>
                    {org.nombre}
                  </button>
                )) : <span style={{ color: '#494963', opacity: 0.5, fontSize: '13px', fontStyle: 'italic' }}>Sin organizaciones vinculadas</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div style={cardStyle}>
          <span style={labelStyle}>Acciones Rápidas</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '4px' }}>
            <button onClick={() => setIsTallerModalOpen(true)} className="flex items-center justify-center gap-2 cursor-pointer" style={{ width: '100%', background: '#EBEDF2', border: '1px solid #E2E4EB', borderRadius: '10px', padding: '11px 14px', fontSize: '13px', fontWeight: 600, color: '#494963', transition: 'all 0.2s' }}>
              <Add size={18} /> Asignar Taller
            </button>
            <button onClick={() => setIsSeguimientoModalOpen(true)} className="flex items-center justify-center gap-2 cursor-pointer" style={{ width: '100%', background: '#EBEDF2', border: '1px solid #E2E4EB', borderRadius: '10px', padding: '11px 14px', fontSize: '13px', fontWeight: 600, color: '#494963', transition: 'all 0.2s' }}>
              <EventSchedule size={18} /> Seguimiento
            </button>
          </div>
        </div>

        {/* Línea de Tiempo */}
        <div style={cardStyle}>
          <span style={{ ...labelStyle, marginBottom: '14px' }}>Línea de Tiempo</span>
          <EntityTimeline historial={b.historial} onEdit={handleEditEvent} onDelete={handleDeleteEvent} />
        </div>

        {/* Red de Vínculos */}
        <div style={cardStyle}>
          <span style={labelStyle}>Red de Vínculos</span>
          <p style={{ fontSize: '12px', color: '#494963', opacity: 0.5, marginTop: '2px', marginBottom: '12px' }}>Mapa de conexiones directas del beneficiario.</p>
          <MiniGraph rootEntityId={b.id} rootEntityType="beneficiario" height={200} />
        </div>
      </div>
    );
  };

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [busqueda, filtro]);

  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  return (
    <>
      <div 
        className="transition-all duration-300 min-w-0" 
        style={{ marginRight: selectedItem && !isEditingItem && !isDeletingItem ? `${panelWidth}px` : 0 }}
      >
        <PageTemplate
          title="Beneficiarios"
          subtitle="Seguimiento de personas beneficiarias del programa"
          onImport={importarBeneficiarios}
          onNew={() => setIsNewModalOpen(true)}
          newButtonText="Nuevo Beneficiario"
          stats={stats}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          filtros={FILTROS_ESTADO}
          filtroActivo={filtro}
          setFiltroActivo={setFiltro}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalItems={beneficiarios.length}
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
                storageKey="cols_beneficiarios_v3" 
              />
            )
          }
        >
          <div className="pt-2">
            {viewMode === 'list' ? (
              <BeneficiariosTable data={paginatedData} onItemClick={setSelectedItem} visibleCols={visibleCols} orderedColumns={orderedColumns} />
            ) : (
              <BeneficiariosGrid data={paginatedData} onItemClick={setSelectedItem} />
            )}
          </div>
        </PageTemplate>
      </div>

      <InlineDetailPanel 
        isOpen={!!selectedItem && !isEditingItem && !isDeletingItem} 
        onClose={() => setSelectedItem(null)} 
        title={selectedItem?.nombre || 'Detalle del Beneficiario'}
        onWidthChange={setPanelWidth}
        actions={
          <>
            <button onClick={() => setIsDeletingItem(true)} style={{ fontSize: '13px', fontWeight: 600, color: '#E42153', background: '#fff', border: '1px solid rgba(228,33,83,0.25)', borderRadius: '10px', padding: '8px 18px', cursor: 'pointer', transition: 'all 0.15s' }}>Eliminar</button>
            <button onClick={() => setIsEditingItem(true)} style={{ fontSize: '13px', fontWeight: 600, color: '#fff', background: '#6B1330', border: 'none', borderRadius: '10px', padding: '8px 22px', cursor: 'pointer', transition: 'all 0.15s' }}>Editar</button>
          </>
        }
      >
        {getDetailContent(selectedItem)}
      </InlineDetailPanel>

      <Modal 
        isOpen={isDeletingItem} 
        onClose={() => setIsDeletingItem(false)} 
        title="Confirmar Eliminación"
      >
        <div className="flex flex-col items-center text-center py-6">
          <h3 className="text-lg font-bold text-texto mb-2">¿Eliminar Beneficiario?</h3>
          <p className="text-sm text-pizarra/80 mb-6">Esta acción no se puede deshacer. Se perderán todos los datos asociados a "{selectedItem?.nombre}".</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => setIsDeletingItem(false)} className="text-sm font-semibold text-pizarra hover:bg-canvas rounded-xl transition-colors cursor-pointer border border-borde px-4 py-2">Cancelar</button>
            <button onClick={confirmDelete} className="text-sm font-semibold text-white bg-critico hover:bg-critico/90 rounded-xl transition-colors cursor-pointer px-4 py-2">Sí, eliminar</button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isEditingItem && !!selectedItem}
        onClose={() => setIsEditingItem(false)}
        title="Editar Beneficiario"
      >
        <BeneficiarioForm initialData={selectedItem} onClose={() => { setIsEditingItem(false); setSelectedItem(null); }} />
      </Modal>

      <Modal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        title="Nuevo Beneficiario"
      >
        <BeneficiarioForm onClose={() => setIsNewModalOpen(false)} />
      </Modal>

      <Modal isOpen={isTallerModalOpen} onClose={() => setIsTallerModalOpen(false)} title="Asignar a Taller">
        <div className="flex flex-col gap-4 py-4">
          <div>
            <label className="block text-sm font-bold text-pizarra mb-2">Seleccionar Taller</label>
            <CustomSelect 
              value={selectedTallerId} 
              onChange={setSelectedTallerId}
              options={talleres.map(t => ({ value: t.id.toString(), label: t.nombre }))}
              placeholder="-- Elija un taller --"
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button onClick={() => setIsTallerModalOpen(false)} className="text-sm font-semibold text-pizarra border border-borde rounded-xl hover:bg-canvas transition-colors cursor-pointer px-4 py-2">Cancelar</button>
            <button 
              onClick={() => {
                if(!selectedTallerId) return;
                const tallerSeleccionado = talleres.find(t => t.id.toString() === selectedTallerId);
                const newEvent = { id: Date.now(), fecha: new Date().toLocaleDateString('es-AR'), tipo: 'taller', titulo: 'Asignación a Taller', descripcion: `Inscripto en: ${tallerSeleccionado?.nombre || 'Taller'}.` };
                const newHistorial = [...(selectedItem.historial || []), newEvent];
                const currentTalleres = selectedItem.talleres || [];
                const newTalleres = [...currentTalleres, parseInt(selectedTallerId)];
                editarBeneficiario({ ...selectedItem, historial: newHistorial, talleres: newTalleres });
                setSelectedItem({ ...selectedItem, historial: newHistorial, talleres: newTalleres });
                setIsTallerModalOpen(false);
                setSelectedTallerId('');
              }} 
              className="text-sm font-semibold text-white bg-primario rounded-xl hover:bg-primario/90 disabled:opacity-50 transition-colors cursor-pointer px-4 py-2"
              disabled={!selectedTallerId}
            >
              Asignar
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isSeguimientoModalOpen} onClose={() => setIsSeguimientoModalOpen(false)} title="Registrar Seguimiento">
        <div className="flex flex-col gap-4 py-4">
          <div>
            <label className="block text-sm font-bold text-pizarra mb-2">Notas del Seguimiento</label>
            <textarea 
              value={seguimientoNota} 
              onChange={(e) => setSeguimientoNota(e.target.value)}
              placeholder="Detalles de la entrevista, avances, observaciones..."
              className="w-full bg-canvas border border-borde rounded-xl text-texto focus:outline-none focus:ring-2 focus:ring-primario/20 resize-none transition-all p-3"
              rows={4}
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button onClick={() => setIsSeguimientoModalOpen(false)} className="text-sm font-semibold text-pizarra border border-borde rounded-xl hover:bg-canvas transition-colors cursor-pointer px-4 py-2">Cancelar</button>
            <button 
              onClick={() => {
                if(!seguimientoNota.trim()) return;
                const newEvent = { id: Date.now(), fecha: new Date().toLocaleDateString('es-AR'), tipo: 'seguimiento', titulo: 'Nuevo Seguimiento', descripcion: seguimientoNota };
                const newHistorial = [...(selectedItem.historial || []), newEvent];
                editarBeneficiario({ ...selectedItem, historial: newHistorial, actividad: newEvent.fecha });
                setSelectedItem({ ...selectedItem, historial: newHistorial, actividad: newEvent.fecha });
                setIsSeguimientoModalOpen(false);
                setSeguimientoNota('');
              }} 
              className="text-sm font-semibold text-white bg-primario rounded-xl hover:bg-primario/90 disabled:opacity-50 transition-colors cursor-pointer px-4 py-2"
              disabled={!seguimientoNota.trim()}
            >
              Guardar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
