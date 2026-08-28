import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import PageTemplate from '../components/layout/PageTemplate';
import { BookOpen, Pencil } from 'lucide-react';
import { useTableResize } from '../hooks/useTableResize';
import Modal from '../components/common/Modal';

export default function TalleresPage() {
  const { talleres, organizaciones } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [filtroActivo, setFiltroActivo] = useState('Todos');

  const { widths, startResize } = useTableResize({
    col1: 250, col2: 250, col3: 150, col4: 150, col5: 150, col6: 100
  });

  const getOrgName = (orgId) => {
    const org = organizaciones.find(o => o.id === orgId);
    return org ? org.nombre : 'Desconocida';
  };

  const filteredTalleres = talleres.filter(t => {
    const matchesSearch = t.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          getOrgName(t.org_id).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filtroActivo === 'Todos' || t.estado === filtroActivo;
    return matchesSearch && matchesFilter;
  });

  const thStyle = (width, extra = {}) => ({
    width: `${width}px`, minWidth: `${width}px`, maxWidth: `${width}px`,
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    padding: '12px 16px', position: 'relative', userSelect: 'none',
    ...extra
  });

  const Resizer = ({ colKey }) => (
    <div onMouseDown={(e) => startResize(e, colKey)}
         style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '4px', cursor: 'col-resize', backgroundColor: '#E3E1E2', zIndex: 10 }}
         onMouseEnter={(e) => e.target.style.backgroundColor = '#3C3AE5'}
         onMouseLeave={(e) => e.target.style.backgroundColor = '#E3E1E2'} />
  );

  return (
    <PageTemplate 
      title="Gestión de Talleres" 
      subtitle="Administración de actividades y capacitaciones"
      icon={BookOpen}
      busqueda={searchTerm}
      setBusqueda={setSearchTerm}
      filtros={['Todos', 'Abierto', 'En curso', 'Finalizado']}
      filtroActivo={filtroActivo}
      setFiltroActivo={setFiltroActivo}
      onNew={() => console.log('Nuevo Taller')}
      newButtonText="Nuevo Taller"
      totalItems={talleres.length}
      filteredItemsCount={filteredTalleres.length}
      stats={[
        { label: 'Total Talleres', value: talleres.length },
        { label: 'Inscriptos Activos', value: talleres.reduce((acc, t) => acc + t.inscriptos, 0) }
      ]}
    >
      <div className="bg-white rounded-xl shadow-sm border border-borde overflow-hidden">
        <div className="overflow-x-auto">
          <table className="text-left border-collapse" style={{ tableLayout: 'fixed', width: '100%' }}>
            <thead className="bg-superficie-sec border-b border-borde">
              <tr>
                <th className="text-xs font-bold text-pizarra tracking-wider border-r border-borde" style={thStyle(widths.col1, { paddingLeft: '24px' })}>NOMBRE DEL TALLER<Resizer colKey="col1" /></th>
                <th className="text-xs font-bold text-pizarra tracking-wider border-r border-borde" style={thStyle(widths.col2)}>ORGANIZACIÓN A CARGO<Resizer colKey="col2" /></th>
                <th className="text-xs font-bold text-pizarra tracking-wider border-r border-borde text-center" style={thStyle(widths.col3)}>CUPO MÁXIMO<Resizer colKey="col3" /></th>
                <th className="text-xs font-bold text-pizarra tracking-wider border-r border-borde text-center" style={thStyle(widths.col4)}>INSCRIPTOS<Resizer colKey="col4" /></th>
                <th className="text-xs font-bold text-pizarra tracking-wider border-r border-borde text-center" style={thStyle(widths.col5)}>ESTADO<Resizer colKey="col5" /></th>
                <th className="text-xs font-bold text-pizarra tracking-wider text-center" style={thStyle(widths.col6, { paddingRight: '24px' })}>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {filteredTalleres.map((taller) => (
                <tr key={taller.id} onClick={() => setSelectedItem(taller)} className="border-b border-borde hover:bg-canvas cursor-pointer transition-colors">
                  <td className="text-sm font-semibold text-texto border-r border-borde" style={thStyle(widths.col1, { paddingLeft: '24px' })} title={taller.nombre}>{taller.nombre}</td>
                  <td className="text-sm font-medium text-pizarra/80 border-r border-borde" style={thStyle(widths.col2)} title={getOrgName(taller.org_id)}>{getOrgName(taller.org_id)}</td>
                  <td className="text-sm font-bold text-texto text-center border-r border-borde" style={thStyle(widths.col3)}>{taller.cupo}</td>
                  <td className="text-sm font-bold text-texto text-center border-r border-borde" style={thStyle(widths.col4)}>{taller.inscriptos}</td>
                  <td className="text-sm text-center border-r border-borde" style={thStyle(widths.col5)}>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${taller.estado === 'En curso' ? 'bg-primario/10 text-primario' : taller.estado === 'Finalizado' ? 'bg-pizarra/10 text-pizarra' : 'bg-exito/10 text-exito'}`}>
                      {taller.estado}
                    </span>
                  </td>
                  <td className="text-center" style={thStyle(widths.col6, { paddingRight: '24px' })}>
                    <button className="inline-flex items-center gap-1 text-xs font-medium text-pizarra hover:text-primario">
                      <Pencil className="w-3.5 h-3.5" /> Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.nombre || 'Detalle de Taller'}>
        {selectedItem && (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-pizarra/70 uppercase font-bold tracking-wider">Organización a Cargo</label>
              <p className="text-sm font-medium text-texto">{getOrgName(selectedItem.org_id)}</p>
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
          </div>
        )}
      </Modal>
    </PageTemplate>
  );
}
