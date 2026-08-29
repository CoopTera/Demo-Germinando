import React, { useState } from 'react';
import BeneficiariosTable from '../components/tables/BeneficiariosTable';
import BeneficiariosGrid from '../components/tables/BeneficiariosGrid';
import { useData } from '../context/DataContext';
import PageTemplate from '../components/layout/PageTemplate';
import Modal from '../components/common/Modal';
import Drawer from '../components/common/Drawer';
import EntityTimeline from '../components/common/EntityTimeline';
import MiniGraph from '../components/graph/MiniGraph';
import BeneficiarioForm from '../components/forms/BeneficiarioForm';

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
    const orgsRaw = b.programas || b.organizaciones;
    const orgs = typeof orgsRaw === 'string' ? orgsRaw.split(',').map(s => s.trim()) : Array.isArray(orgsRaw) ? orgsRaw : orgsRaw ? [orgsRaw] : [];
    const fecha = b.inicioBeca || b.fechaInicio;
    const monto = b.monto !== undefined ? b.monto : b.presupuestoBeca;
    const ultimoReg = b.actividad || b.ultimoRegistro;

    const handleOrgClick = (orgName) => {
      // Find org ID based on normalized name
      const normalize = (str) => str.toLowerCase().replace('coop.', 'cooperativa').replace('asoc.', 'asociación').replace('fund.', 'fundación');
      const normName = normalize(orgName);
      const org = organizaciones.find(o => normalize(o.nombre).includes(normName) || normName.includes(normalize(o.nombre)));
      if (org) {
        navigate('/organizaciones', { state: { openModalId: org.id } });
      } else {
        navigate('/organizaciones');
      }
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
    
    return (
      <div className="flex flex-col lg:flex-row h-full" style={{ gap: '24px' }}>
        {/* Columna Izquierda: Datos y Timeline */}
        <div className="flex-1 flex flex-col overflow-y-auto" style={{ gap: '24px', paddingRight: '8px' }}>
          <div className="grid grid-cols-2" style={{ gap: '16px' }}>
            <div className="bg-white rounded-xl border border-borde shadow-sm" style={{ padding: '16px' }}>
              <div className="text-xs font-bold text-pizarra/50 uppercase mb-1">DNI</div>
              <p className="text-base font-semibold text-texto">{b.dni}</p>
            </div>
            <div className="bg-white rounded-xl border border-borde shadow-sm" style={{ padding: '16px' }}>
              <div className="text-xs font-bold text-pizarra/50 uppercase mb-1">Fecha Inicio</div>
              <p className="text-base font-semibold text-texto">{fecha}</p>
            </div>
            <div className="bg-white rounded-xl border border-borde shadow-sm" style={{ padding: '16px' }}>
              <div className="text-xs font-bold text-pizarra/50 uppercase mb-1">Último Registro</div>
              <p className="text-base font-semibold text-texto">{ultimoReg}</p>
            </div>
            <div className="bg-white rounded-xl border border-borde shadow-sm" style={{ padding: '16px' }}>
              <div className="text-xs font-bold text-pizarra/50 uppercase mb-1">Monto Beca</div>
              <p className="text-base font-bold text-primario">{formatCurrency(monto)}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-borde shadow-sm" style={{ padding: '20px' }}>
            <h3 className="text-sm font-bold text-pizarra uppercase tracking-wider border-b border-borde" style={{ marginBottom: '16px', paddingBottom: '8px' }}>Programas y Organizaciones</h3>
            <div className="flex flex-wrap" style={{ gap: '8px' }}>
              {orgs.length > 0 ? orgs.map((org, idx) => (
                <button key={idx} onClick={() => handleOrgClick(org)} className="bg-primario/10 hover:bg-primario text-primario hover:text-white transition-colors text-xs rounded-full font-bold uppercase tracking-wider cursor-pointer" style={{ padding: '6px 12px' }}>
                  {org}
                </button>
              )) : <span className="text-pizarra/50 text-sm">Sin organización asignada</span>}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-borde shadow-sm flex-1" style={{ padding: '20px' }}>
            <h3 className="text-sm font-bold text-pizarra uppercase tracking-wider border-b border-borde" style={{ marginBottom: '8px', paddingBottom: '8px' }}>Línea de Tiempo</h3>
            <EntityTimeline historial={b.historial} onEdit={handleEditEvent} onDelete={handleDeleteEvent} />
          </div>
        </div>

        {/* Columna Derecha: Grafo */}
        <div className="w-full lg:w-[350px] shrink-0 flex flex-col" style={{ gap: '24px' }}>
          <div className="bg-white rounded-xl border border-borde shadow-sm" style={{ padding: '20px' }}>
            <h3 className="text-sm font-bold text-pizarra uppercase tracking-wider border-b border-borde" style={{ marginBottom: '16px', paddingBottom: '8px' }}>Red de Vínculos</h3>
            <p className="text-xs text-pizarra/60" style={{ marginBottom: '16px' }}>Mapeo de conexiones directas del beneficiario.</p>
            <MiniGraph rootEntityId={b.id} rootEntityType="beneficiario" />
          </div>
          
          <div className="bg-canvas rounded-xl border border-borde shadow-sm mt-auto" style={{ padding: '20px' }}>
             <h3 className="text-sm font-bold text-pizarra uppercase tracking-wider" style={{ marginBottom: '8px' }}>Acciones Rápidas</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button onClick={() => setIsTallerModalOpen(true)} className="w-full bg-white border border-borde hover:border-primario hover:text-primario text-pizarra text-sm font-semibold rounded-lg transition-colors cursor-pointer" style={{ padding: '8px' }}>
                  Asignar a Taller
                </button>
                <button onClick={() => setIsSeguimientoModalOpen(true)} className="w-full bg-white border border-borde hover:border-primario hover:text-primario text-pizarra text-sm font-semibold rounded-lg transition-colors cursor-pointer" style={{ padding: '8px' }}>
                  Registrar Seguimiento
                </button>
             </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
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
      >
        {viewMode === 'list' ? (
          <BeneficiariosTable data={filteredData} onItemClick={setSelectedItem} />
        ) : (
          <BeneficiariosGrid data={filteredData} onItemClick={setSelectedItem} />
        )}
      </PageTemplate>

      <Drawer 
        isOpen={!!selectedItem && !isEditingItem && !isDeletingItem} 
        onClose={() => { setSelectedItem(null); }} 
        title={selectedItem?.nombre || 'Detalle del Beneficiario'}
        actions={
          <>
            <button onClick={() => setIsDeletingItem(true)} className="text-sm font-semibold text-critico hover:bg-critico/10 rounded-md transition-colors cursor-pointer border border-critico/20" style={{ padding: '8px 16px' }}>Eliminar</button>
            <button onClick={() => setIsEditingItem(true)} className="text-sm font-semibold text-white bg-primario hover:bg-primario/90 rounded-md shadow-sm transition-colors cursor-pointer" style={{ padding: '8px 16px' }}>Editar</button>
          </>
        }
      >
        {getDetailContent(selectedItem)}
      </Drawer>

      <Modal 
        isOpen={isDeletingItem} 
        onClose={() => setIsDeletingItem(false)} 
        title="Confirmar Eliminación"
      >
        <div className="flex flex-col items-center text-center py-6">
          <h3 className="text-lg font-bold text-texto mb-2">Â¿Eliminar Beneficiario?</h3>
          <p className="text-sm text-pizarra/80 mb-6">Esta acción no se puede deshacer. Se perderán todos los datos asociados a "{selectedItem?.nombre}".</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => setIsDeletingItem(false)} className="text-sm font-semibold text-pizarra hover:bg-canvas rounded-md transition-colors cursor-pointer border border-borde px-4 py-2">Cancelar</button>
            <button onClick={confirmDelete} className="text-sm font-semibold text-white bg-critico hover:bg-critico/90 rounded-md shadow-sm transition-colors cursor-pointer px-4 py-2">Sí, eliminar</button>
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

      {/* Modal: Asignar Taller */}
      <Modal isOpen={isTallerModalOpen} onClose={() => setIsTallerModalOpen(false)} title="Asignar a Taller">
        <div className="flex flex-col" style={{ gap: '16px', padding: '16px 0' }}>
          <div>
            <label className="block text-sm font-bold text-pizarra mb-2">Seleccionar Taller</label>
            <select 
              value={selectedTallerId} 
              onChange={(e) => setSelectedTallerId(e.target.value)}
              className="w-full bg-canvas border border-borde rounded-lg text-texto focus:outline-none focus:border-primario"
              style={{ padding: '12px' }}
            >
              <option value="">-- Elija un taller --</option>
              {talleres.map(t => (
                <option key={t.id} value={t.id}>{t.nombre}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end mt-4" style={{ gap: '8px' }}>
            <button onClick={() => setIsTallerModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-pizarra border border-borde rounded-md hover:bg-canvas">Cancelar</button>
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
              className="px-4 py-2 text-sm font-semibold text-white bg-primario rounded-md hover:bg-primario/90 disabled:opacity-50"
              disabled={!selectedTallerId}
            >
              Asignar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal: Registrar Seguimiento */}
      <Modal isOpen={isSeguimientoModalOpen} onClose={() => setIsSeguimientoModalOpen(false)} title="Registrar Seguimiento">
        <div className="flex flex-col" style={{ gap: '16px', padding: '16px 0' }}>
          <div>
            <label className="block text-sm font-bold text-pizarra mb-2">Notas del Seguimiento</label>
            <textarea 
              value={seguimientoNota} 
              onChange={(e) => setSeguimientoNota(e.target.value)}
              placeholder="Detalles de la entrevista, avances, observaciones..."
              className="w-full bg-canvas border border-borde rounded-lg text-texto focus:outline-none focus:border-primario resize-none"
              rows={4}
              style={{ padding: '12px' }}
            />
          </div>
          <div className="flex justify-end mt-4" style={{ gap: '8px' }}>
            <button onClick={() => setIsSeguimientoModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-pizarra border border-borde rounded-md hover:bg-canvas">Cancelar</button>
            <button 
              onClick={() => {
                if(!seguimientoNota.trim()) return;
                const newEvent = { id: Date.now(), fecha: new Date().toLocaleDateString('es-AR'), tipo: 'seguimiento', titulo: 'Nuevo Seguimiento', descripcion: seguimientoNota };
                const newHistorial = [...(selectedItem.historial || []), newEvent];
                  const currentTalleres = selectedItem.talleres || [];
                  const newTalleres = [...currentTalleres, parseInt(selectedTallerId)];
                editarBeneficiario({ ...selectedItem, historial: newHistorial, actividad: newEvent.fecha });
                setSelectedItem({ ...selectedItem, historial: newHistorial, actividad: newEvent.fecha });
                setIsSeguimientoModalOpen(false);
                setSeguimientoNota('');
              }} 
              className="px-4 py-2 text-sm font-semibold text-white bg-primario rounded-md hover:bg-primario/90 disabled:opacity-50"
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



