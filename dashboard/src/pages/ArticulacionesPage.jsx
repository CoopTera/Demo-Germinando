import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import PageTemplate from '../components/layout/PageTemplate';
import Modal from '../components/common/Modal';
import InlineDetailPanel from '../components/common/InlineDetailPanel';
import GanttChart from '../components/vinculos/GanttChart';
import VinculosTable from '../components/vinculos/VinculosTable';
import VinculosGrid from '../components/vinculos/VinculosGrid';
import VinculoDetailContent from '../components/vinculos/VinculoDetailContent';
import VinculoForm from '../components/vinculos/VinculoForm';

const FILTROS_ESTADO = ['Todos', 'Vigente', 'En Negociación', 'Finalizado', 'Suspendido'];
const FILTROS_NIVEL = ['Todos', 'Provincial', 'Nacional', 'Municipal'];

export default function VinculosPage() {
  const { vinculos, programasEstado, organizaciones, editarVinculo, addVinculo, deleteVinculo } = useData();

  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [filtroNivel, setFiltroNivel] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [viewMode, setViewMode] = useState('gantt');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [isDeletingItem, setIsDeletingItem] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [panelWidth, setPanelWidth] = useState(480);

  const getPrograma = (programaId) => programasEstado.find(p => p.id === programaId);

  const filteredData = useMemo(() => {
    let data = [...vinculos];
    if (filtroEstado !== 'Todos') data = data.filter(v => v.estado === filtroEstado);
    if (filtroNivel !== 'Todos') {
      data = data.filter(v => {
        const prog = getPrograma(v.programa_id);
        return prog && prog.nivel === filtroNivel;
      });
    }
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase();
      data = data.filter(v => {
        const prog = getPrograma(v.programa_id);
        return v.titulo.toLowerCase().includes(q) ||
          (prog && (prog.nombre.toLowerCase().includes(q) || prog.area.toLowerCase().includes(q)));
      });
    }
    return data;
  }, [vinculos, filtroEstado, filtroNivel, busqueda, programasEstado]);

  // KPIs
  const totalVinculos = vinculos.length;
  const totalProgramas = new Set(vinculos.map(v => v.programa_id)).size;
  const totalPresupuesto = vinculos.reduce((s, v) => s + (v.presupuestoAsignado || 0), 0);
  const totalEjecutado = vinculos.reduce((s, v) => s + (v.presupuestoEjecutado || 0), 0);
  const pctEjecucion = totalPresupuesto > 0 ? Math.round((totalEjecutado / totalPresupuesto) * 100) : 0;
  const totalBeneficiarios = vinculos.reduce((s, v) => s + (v.beneficiarios_derivados || 0), 0);

  const formatCurrency = (n) => n?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }) || '$ 0';

  const stats = [
    { label: 'Vínculos Activos', value: vinculos.filter(v => v.estado === 'Vigente').length, valueColor: 'text-primario' },
    { label: 'Programas', value: totalProgramas },
    { label: 'Presupuesto Total', value: formatCurrency(totalPresupuesto) },
    { label: 'Ejecución', value: `${pctEjecucion}%`, valueColor: pctEjecucion >= 60 ? 'text-exito' : 'text-naranja' },
    { label: 'Beneficiarios', value: totalBeneficiarios },
  ];

  const handleSaveNew = (vinculo) => {
    addVinculo({ ...vinculo, id: `vinc-${Date.now()}` });
    setIsNewModalOpen(false);
  };

  const handleSaveEdit = (vinculo) => {
    editarVinculo(vinculo);
    setIsEditingItem(false);
    setSelectedItem(vinculo);
  };

  const handleDelete = () => {
    if (selectedItem) {
      deleteVinculo(selectedItem.id);
      setSelectedItem(null);
      setIsDeletingItem(false);
    }
  };

  const mainContentStyle = {
    marginRight: selectedItem && !isEditingItem && !isDeletingItem ? `${panelWidth}px` : 0,
    transition: 'margin-right 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
  };

  return (
    <>
      <div style={mainContentStyle}>
        <PageTemplate
          title="Articulaciones con otros Programas"
          subtitle="Gestión y seguimiento de vínculos institucionales"
          onNew={() => setIsNewModalOpen(true)}
          newButtonText="Nueva Articulación"
          stats={stats}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          filtros={FILTROS_ESTADO}
          filtroActivo={filtroEstado}
          setFiltroActivo={setFiltroEstado}
          viewMode={viewMode}
          setViewMode={setViewMode}
          viewModes={['gantt', 'list', 'grid']}
          totalItems={vinculos.length}
          filteredItemsCount={filteredData.length}
        >
          <div className="flex flex-col h-[calc(100vh-280px)] min-h-[500px]">
            {/* Nivel filter row */}
            <div className="flex items-center gap-2 mb-4 shrink-0">
              <span className="text-xs font-bold text-pizarra/50 uppercase tracking-wider">Nivel:</span>
              {FILTROS_NIVEL.map(n => (
                <button
                  key={n}
                  onClick={() => setFiltroNivel(n)}
                  className={`text-[11px] font-bold rounded-full transition-all cursor-pointer ${
                    filtroNivel === n
                      ? 'bg-[#6B1330] text-white shadow-sm'
                      : 'bg-white text-[#494963] border border-[#E2E4EB] hover:bg-[#F5F6F8]'
                  }`}
                  style={{ padding: '4px 12px' }}
                >
                  {n}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-hidden relative">
              {viewMode === 'gantt' && (
                <GanttChart
                  vinculos={filteredData}
                  programas={programasEstado}
                  onItemClick={setSelectedItem}
                  selectedId={selectedItem?.id}
                />
              )}
              {viewMode === 'list' && (
                <div className="h-full overflow-auto">
                  <VinculosTable
                    data={filteredData}
                    programas={programasEstado}
                    onItemClick={setSelectedItem}
                  />
                </div>
              )}
              {viewMode === 'grid' && (
                <div className="h-full overflow-auto p-1">
                  <VinculosGrid
                    data={filteredData}
                    programas={programasEstado}
                    onItemClick={setSelectedItem}
                  />
                </div>
              )}
            </div>
          </div>
        </PageTemplate>
      </div>

      <InlineDetailPanel
        isOpen={!!selectedItem && !isEditingItem && !isDeletingItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.titulo || 'Detalle del Vínculo'}
        onWidthChange={setPanelWidth}
        actions={
          <>
            <button onClick={() => setIsDeletingItem(true)} style={{ fontSize: '13px', fontWeight: 600, color: '#E42153', background: '#fff', border: '1px solid rgba(228,33,83,0.25)', borderRadius: '10px', padding: '8px 18px', cursor: 'pointer', transition: 'all 0.15s' }}>Eliminar</button>
            <button onClick={() => setIsEditingItem(true)} style={{ fontSize: '13px', fontWeight: 600, color: '#fff', background: '#6B1330', border: 'none', borderRadius: '10px', padding: '8px 22px', cursor: 'pointer', transition: 'all 0.15s' }}>Editar</button>
          </>
        }
      >
        {selectedItem && (
          <VinculoDetailContent
            vinculo={selectedItem}
            programa={getPrograma(selectedItem.programa_id)}
            organizaciones={organizaciones}
          />
        )}
      </InlineDetailPanel>

      {/* Delete confirmation */}
      <Modal isOpen={isDeletingItem} onClose={() => setIsDeletingItem(false)} title="Confirmar Eliminación">
        <div className="flex flex-col items-center text-center py-4">
          <h3 className="text-lg font-bold text-texto mb-2">¿Eliminar Vínculo?</h3>
          <p className="text-sm text-pizarra/80 mb-6">Esta acción no se puede deshacer.</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => setIsDeletingItem(false)} className="text-sm font-semibold text-pizarra border border-borde rounded-xl px-4 py-2 cursor-pointer">Cancelar</button>
            <button onClick={handleDelete} className="text-sm font-semibold text-white bg-critico rounded-xl px-4 py-2 cursor-pointer">Eliminar</button>
          </div>
        </div>
      </Modal>

      {/* New/Edit modal */}
      <Modal isOpen={isNewModalOpen || isEditingItem} onClose={() => { setIsNewModalOpen(false); setIsEditingItem(false); }} title={isEditingItem ? 'Editar Vínculo' : 'Nuevo Vínculo'}>
        <VinculoForm
          vinculo={isEditingItem ? selectedItem : null}
          programas={programasEstado}
          onSave={isEditingItem ? handleSaveEdit : handleSaveNew}
          onCancel={() => { setIsNewModalOpen(false); setIsEditingItem(false); }}
        />
      </Modal>
    </>
  );
}
