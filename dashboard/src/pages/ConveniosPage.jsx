import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import PageTemplate from '../components/layout/PageTemplate';
import { useTableResize } from '../hooks/useTableResize';
import Modal from '../components/common/Modal';

export default function ConveniosPage() {
  const { convenios, organizaciones, setConvenios } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [filtroActivo, setFiltroActivo] = useState('Todos');

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
    if (typeof amount !== 'number') return '$ 0';
    return amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
  };

  const thStyle = (width, extra = {}) => ({
    width: `${width}px`, minWidth: `${width}px`, maxWidth: `${width}px`,
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    padding: '12px 16px', position: 'relative', userSelect: 'none',
    ...extra
  });

  const Resizer = ({ colKey }) => (
    <div onMouseDown={(e) => startResize(e, colKey)}
         style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '4px', cursor: 'col-resize', backgroundColor: '#E3E1E2', zIndex: 10 }}
         onMouseEnter={(e) => e.target.style.backgroundColor = '#6B1330'}
         onMouseLeave={(e) => e.target.style.backgroundColor = '#E3E1E2'} />
  );

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
      stats={[
        { label: 'Total Convenios', value: convenios.length },
        { label: 'Presupuesto Total', value: formatCurrency(convenios.reduce((acc, c) => acc + c.monto, 0)) }
      ]}
    >
      <div className="bg-white rounded-xl shadow-sm border border-borde overflow-hidden">
        <div className="overflow-x-auto">
          <table className="text-left border-collapse" style={{ tableLayout: 'fixed', width: '100%' }}>
            <thead className="bg-superficie-sec border-b border-borde">
              <tr>
                <th className="text-xs font-bold text-pizarra tracking-wider border-r border-borde" style={thStyle(widths.col1, { paddingLeft: '24px' })}>NOMBRE<Resizer colKey="col1" /></th>
                <th className="text-xs font-bold text-pizarra tracking-wider border-r border-borde" style={thStyle(widths.col2)}>ORGANIZACIÓN ASOCIADA<Resizer colKey="col2" /></th>
                <th className="text-xs font-bold text-pizarra tracking-wider border-r border-borde" style={thStyle(widths.col3)}>FECHA FIRMA<Resizer colKey="col3" /></th>
                <th className="text-xs font-bold text-pizarra tracking-wider border-r border-borde text-right" style={thStyle(widths.col4)}>MONTO<Resizer colKey="col4" /></th>
                <th className="text-xs font-bold text-pizarra tracking-wider border-r border-borde text-center" style={thStyle(widths.col5)}>ESTADO Y VENCIMIENTO<Resizer colKey="col5" /></th>
                <th className="text-xs font-bold text-pizarra tracking-wider text-center" style={thStyle(widths.col6, { paddingRight: '24px' })}>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {filteredConvenios.map((conv) => {
                const daysLeft = getDaysLeft(conv.fechaVencimiento);

                return (
                  <tr key={conv.id} onClick={() => setSelectedItem(conv)} className="border-b border-borde hover:bg-canvas cursor-pointer transition-colors">
                    <td className="text-sm font-semibold text-texto border-r border-borde" style={thStyle(widths.col1, { paddingLeft: '24px' })} title={conv.nombre}>
                      {conv.nombre}
                    </td>
                    <td className="text-sm font-medium text-pizarra/80 border-r border-borde" style={thStyle(widths.col2)} title={getOrgName(conv.org_id)}>{getOrgName(conv.org_id)}</td>
                    <td className="text-sm text-texto border-r border-borde" style={thStyle(widths.col3)}>{conv.fechaFirma}</td>
                    <td className="text-sm font-bold text-texto text-right border-r border-borde" style={thStyle(widths.col4)}>{formatCurrency(conv.monto)}</td>
                    <td className="text-sm text-center border-r border-borde" style={{...thStyle(widths.col5), padding: '8px 16px'}}>
                      <div className="flex flex-col items-center justify-center" style={{ gap: '4px' }}>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          conv.estado === 'Activo' ? 'bg-exito/10 text-exito' :
                          conv.estado === 'Por vencer' ? 'bg-naranja/10 text-naranja' :
                          conv.estado === 'En revisión' ? 'bg-amarillo/10 text-amarillo' :
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
                    <td className="text-center" style={thStyle(widths.col6, { paddingRight: '24px' })}>
                      <button className="text-xs font-semibold text-pizarra/70 hover:text-primario cursor-pointer">
                        Editar
                      </button>
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
              <p className="text-sm font-medium text-texto">{getOrgName(selectedItem.org_id)}</p>
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
              <button className="flex-1 bg-white border border-borde text-pizarra hover:bg-canvas rounded-md py-2 font-medium text-sm transition-colors">
                Modo Demo: Ver PDF
              </button>
            </div>
          </div>
        )}
      </Modal>
    </PageTemplate>
  );
}
