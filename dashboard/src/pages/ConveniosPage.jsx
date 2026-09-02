import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import PageTemplate from '../components/layout/PageTemplate';
import { useTableResize } from '../hooks/useTableResize';
import Modal from '../components/common/Modal';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ConveniosPage() {
  const { convenios, organizaciones, setConvenios } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [filtroActivo, setFiltroActivo] = useState('Todos');

  useEffect(() => {
    if (location.state?.openModalId) {
      const conv = convenios.find(c => c.id === location.state.openModalId);
      if (conv) setSelectedItem(conv);
      window.history.replaceState({}, document.title);
    }
  }, [location.state, convenios]);

  const { widths, startResize } = useTableResize({
    col1: 220, col2: 250, col3: 150, col4: 150, col5: 200, col6: 100
  });

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

  const thStyle = (width, extra = {}) => ({
    ...(width ? { width: `${width}px`, minWidth: `${width}px`, maxWidth: `${width}px` } : {}),
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    padding: '12px 16px', position: 'relative', userSelect: 'none',
    ...extra
  });

  const totalFixedWidth = Object.values(widths).reduce((a, b) => a + b, 0);

  const Resizer = ({ colKey }) => (
    <div onMouseDown={(e) => startResize(e, colKey)}
         style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '4px', cursor: 'col-resize', backgroundColor: '#E3E1E2', zIndex: 10 }}
         onMouseEnter={(e) => e.target.style.backgroundColor = '#6B1330'}
         onMouseLeave={(e) => e.target.style.backgroundColor = '#E3E1E2'} />
  );

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
      onNew={() => console.log('Nuevo Convenio')}
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
    >
      <div className="bg-white rounded-2xl overflow-hidden card-elevated">
        <div className="overflow-x-auto">
          <table className="text-left border-collapse" style={{ tableLayout: 'fixed', minWidth: '100%', width: totalFixedWidth > 0 ? `${totalFixedWidth}px` : '100%' }}>
            <thead className="bg-superficie-sec border-b border-borde">
              <tr>
                <th className="text-xs font-bold text-pizarra tracking-wider border-r border-borde" style={thStyle(widths.col1, { paddingLeft: '24px' })}>NOMBRE<Resizer colKey="col1" /></th>
                <th className="text-xs font-bold text-pizarra tracking-wider border-r border-borde" style={thStyle(widths.col2)}>ORGANIZACIÓN ASOCIADA<Resizer colKey="col2" /></th>
                <th className="text-xs font-bold text-pizarra tracking-wider border-r border-borde" style={thStyle(widths.col3)}>FECHA FIRMA<Resizer colKey="col3" /></th>
                <th className="text-xs font-bold text-pizarra tracking-wider border-r border-borde text-right" style={thStyle(widths.col4)}>MONTO<Resizer colKey="col4" /></th>
                <th className="text-xs font-bold text-pizarra tracking-wider text-center" style={thStyle(null, { paddingRight: '24px' })}>ESTADO Y VENCIMIENTO</th>
              </tr>
            </thead>
            <tbody>
              {paginatedConvenios.map((conv) => {
                const daysLeft = getDaysLeft(conv.fechaVencimiento);

                return (
                  <tr key={conv.id} onClick={() => setSelectedItem(conv)} className="border-b border-borde hover:bg-canvas cursor-pointer transition-colors">
                    <td className="text-sm font-semibold text-texto border-r border-borde" style={thStyle(widths.col1, { paddingLeft: '24px' })} title={conv.nombre}>
                      {conv.nombre}
                    </td>
                    <td className="text-sm font-medium text-pizarra/80 border-r border-borde" style={thStyle(widths.col2)} title={getOrgName(conv.org_id)}>{getOrgName(conv.org_id)}</td>
                    <td className="text-sm text-texto border-r border-borde" style={thStyle(widths.col3)}>{conv.fechaFirma}</td>
                    <td className="text-sm font-bold text-texto text-right border-r border-borde whitespace-nowrap" style={thStyle(widths.col4)}>{formatCurrency(conv.monto)}</td>
                    <td className="text-sm text-center" style={{...thStyle(null), padding: '8px 24px 8px 16px'}}>
                      <div className="flex flex-col items-center justify-center" style={{ gap: '4px' }}>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          conv.estado === 'Activo' ? 'bg-exito/10 text-exito' :
                          conv.estado === 'Próximos a vencer' ? 'bg-naranja/10 text-naranja' :
                          conv.estado === 'Por vencer' ? 'bg-critico/10 text-critico' :
                          'bg-pizarra/10 text-pizarra'
                        }`}>
                          {conv.estado}
                        </span>
                        {daysLeft !== null && daysLeft <= 30 && (
                          <div className="text-[10px] font-bold text-naranja">
                            Vence en {daysLeft} días
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.nombre || 'Detalle de Convenio'}>
        {selectedItem && (
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
            <div className="flex justify-end border-t border-borde pt-4 mt-4" style={{ gap: '12px' }}>
              <button onClick={() => { /* set deleting */ }} className="text-sm font-semibold text-critico hover:bg-critico/10 rounded-xl transition-colors cursor-pointer border border-critico/20" style={{ padding: '8px 16px' }}>Eliminar</button>
              <button onClick={() => { /* set editing */ }} className="text-sm font-semibold text-white bg-primario hover:bg-primario/90 rounded-xl transition-colors cursor-pointer" style={{ padding: '8px 16px' }}>Editar</button>
            </div>
          </div>
        )}
      </Modal>
    </PageTemplate>
  );
}
