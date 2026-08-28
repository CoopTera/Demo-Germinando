import React, { useState, useMemo } from 'react';
import { Bookmark } from 'lucide-react';
import { oportunidades } from '../data/mockData';
import PageTemplate from '../components/layout/PageTemplate';
import OportunidadesTable from '../components/oportunidades/OportunidadesTable';
import OportunidadesGrid from '../components/oportunidades/OportunidadesGrid';

const FILTROS = ['Todas', 'Licitaciones', 'Fondos', 'Capacitaciones'];

export default function OportunidadesPage() {
  const [viewMode, setViewMode] = useState('list');
  const [busqueda, setBusqueda] = useState('');
  const [filtroActivo, setFiltroActivo] = useState('Todas');

  const statsObj = useMemo(() => {
    return {
      total: oportunidades.length,
      proximas: 2
    };
  }, []);

  const stats = [
    { label: 'Oportunidades Activas', value: statsObj.total },
    { label: 'Vencen pronto', value: statsObj.proximas, valueColor: 'text-naranja' }
  ];

  const filteredData = useMemo(() => {
    return oportunidades.filter(opt => {
      const matchesSearch = opt.titulo?.toLowerCase().includes(busqueda.toLowerCase()) || 
                            opt.organizador?.toLowerCase().includes(busqueda.toLowerCase());
      const matchesFiltro = filtroActivo === 'Todas' || 
                            (filtroActivo === 'Licitaciones' && opt.titulo?.includes('Licitación')) ||
                            (filtroActivo === 'Fondos' && opt.titulo?.includes('Fondo')) ||
                            (filtroActivo === 'Capacitaciones' && opt.titulo?.includes('Capacitación'));
      return matchesSearch && matchesFiltro;
    });
  }, [busqueda, filtroActivo]);

  return (
    <PageTemplate
      icon={Bookmark}
      title="Oportunidades"
      subtitle="Buscador de licitaciones, fondos y capacitaciones"
      onNew={() => console.log('Nueva oportunidad')}
      newButtonText="Nueva Oportunidad"
      stats={stats}
      busqueda={busqueda}
      setBusqueda={setBusqueda}
      filtros={FILTROS}
      filtroActivo={filtroActivo}
      setFiltroActivo={setFiltroActivo}
      viewMode={viewMode}
      setViewMode={setViewMode}
      totalItems={oportunidades.length}
      filteredItemsCount={filteredData.length}
    >
      {viewMode === 'list' ? (
        <OportunidadesTable data={filteredData} />
      ) : (
        <OportunidadesGrid data={filteredData} />
      )}
    </PageTemplate>
  );
}
