import React, { useState } from 'react';
import { Users, AlertTriangle, CreditCard, Calendar, Clock } from 'lucide-react';
import BeneficiariosTable from '../components/tables/BeneficiariosTable';
import BeneficiariosGrid from '../components/tables/BeneficiariosGrid';
import { useData } from '../context/DataContext';
import PageTemplate from '../components/layout/PageTemplate';
import Modal from '../components/common/Modal';
import BeneficiarioForm from '../components/forms/BeneficiarioForm';

const FILTROS_ESTADO = ['Todos', 'Activos', 'Sin seguimiento'];

export default function BeneficiariosPage() {
  const { beneficiarios, importarBeneficiarios } = useData();
  const [filtro, setFiltro] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

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
      b.nombre.toLowerCase().includes(busq) ||
      b.dni.includes(busq);
      
    return matchFiltro && matchBusqueda;
  });

  const stats = [
    { label: 'Total', value: `${beneficiarios.length} personas` },
    { label: 'Becas activas', value: beneficiarios.length - conAlerta, valueColor: 'text-primario' }
  ];

  if (conAlerta > 0) {
    stats.push({
      label: '', // label handled as value
      value: `${conAlerta} sin seguimiento`,
      bgColor: 'bg-naranja/10 border-naranja/30',
      valueColor: 'text-naranja',
      icon: AlertTriangle,
      iconColor: 'text-naranja',
      pulse: true
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
    
    return (
      <div className="flex flex-col" style={{ gap: '20px' }}>
        <div className="grid grid-cols-2" style={{ gap: '16px' }}>
          <div className="bg-canvas rounded border border-borde" style={{ padding: '16px' }}>
            <div className="flex items-center text-xs font-bold text-pizarra/50 uppercase mb-1" style={{ gap: '4px' }}><CreditCard style={{ width: '14px', height: '14px' }} /> DNI</div>
            <p className="text-base font-semibold text-texto">{b.dni}</p>
          </div>
          <div className="bg-canvas rounded border border-borde" style={{ padding: '16px' }}>
            <div className="flex items-center text-xs font-bold text-pizarra/50 uppercase mb-1" style={{ gap: '4px' }}><Calendar style={{ width: '14px', height: '14px' }} /> Fecha Inicio</div>
            <p className="text-base font-semibold text-texto">{fecha}</p>
          </div>
          <div className="bg-canvas rounded border border-borde" style={{ padding: '16px' }}>
            <div className="flex items-center text-xs font-bold text-pizarra/50 uppercase mb-1" style={{ gap: '4px' }}><Clock style={{ width: '14px', height: '14px' }} /> Último Registro</div>
            <p className="text-base font-semibold text-texto">{ultimoReg}</p>
          </div>
          <div className="bg-canvas rounded border border-borde" style={{ padding: '16px' }}>
            <div className="flex items-center text-xs font-bold text-pizarra/50 uppercase mb-1" style={{ gap: '4px' }}>Monto Beca</div>
            <p className="text-base font-semibold text-texto">{formatCurrency(monto)}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-bold text-pizarra uppercase mb-2">Programas y Organizaciones</h3>
          <div className="flex flex-wrap" style={{ gap: '8px' }}>
            {orgs.length > 0 ? orgs.map((org, idx) => (
              <span key={idx} className="bg-primario/10 text-primario text-sm rounded-full font-bold uppercase tracking-wider" style={{ padding: '6px 12px' }}>
                {org}
              </span>
            )) : <span className="text-gray-400">Sin organización asignada</span>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <PageTemplate
        icon={Users}
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

      <Modal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        title={selectedItem?.nombre || 'Detalle'}
      >
        {getDetailContent(selectedItem)}
      </Modal>

      <Modal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        title="Nuevo Beneficiario"
      >
        <BeneficiarioForm onClose={() => setIsNewModalOpen(false)} />
      </Modal>
    </>
  );
}
