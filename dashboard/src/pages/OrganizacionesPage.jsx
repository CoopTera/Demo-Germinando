import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Building2, LayoutGrid, List, Search, Filter, Plus } from 'lucide-react';
import { useData } from '../context/DataContext';
import OrganizacionesTable from '../components/organizaciones/OrganizacionesTable';
import OrganizacionesGrid from '../components/organizaciones/OrganizacionesGrid';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function OrganizacionesPage() {
  const { organizaciones } = useData();
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todas');

  const stats = useMemo(() => {
    return {
      total: organizaciones.length,
      convenios: organizaciones.reduce((acc, org) => acc + (org.convenios || 0), 0),
      presupuestoTotal: organizaciones.length > 0 ? '$ 15.610.000' : '$ 0' // Mocked total based on screenshot
    };
  }, [organizaciones]);

  const filters = ['Todas', 'Textil e Indumentaria', 'Producción Alimentaria', 'Construcción y Hábitat', 'Agricultura Familiar', 'Artesanías y Manufactura', 'Reciclado y Economía Circular'];

  const filteredData = useMemo(() => {
    return organizaciones.filter(org => {
      const matchesSearch = org.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'Todas' || org.especializacion.toLowerCase().includes(activeFilter.toLowerCase());
      return matchesSearch && matchesFilter;
    });
  }, [organizaciones, searchTerm, activeFilter]);

  return (
    <motion.div 
      className="flex flex-col"
      style={{ gap: '32px' }}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3" style={{ marginBottom: '8px' }}>
            <Building2 className="w-7 h-7 text-pizarra" />
            <h1 className="text-3xl font-bold text-pizarra">Organizaciones</h1>
          </div>
          <p className="text-[15px] text-pizarra/70 font-medium">Gestión de unidades productivas del programa</p>
          
          <div className="flex items-center gap-4 mt-3">
            <span className="text-sm font-semibold text-texto"><span className="text-pizarra/60 font-medium">Total:</span> {stats.total} organizaciones</span>
            <span className="text-sm font-semibold text-primario"><span className="text-pizarra/60 font-medium text-sm">Convenios activos:</span> {stats.convenios}</span>
            <span className="text-sm font-semibold text-texto"><span className="text-pizarra/60 font-medium text-sm">Presupuesto total:</span> {stats.presupuestoTotal}</span>
          </div>
        </div>

        <button className="flex items-center bg-primario hover:bg-primario/90 text-white text-[14px] font-semibold rounded-md transition-colors shadow-sm cursor-pointer" style={{ padding: '10px 20px', gap: '8px' }}>
          <Plus className="stroke-[2.5]" style={{ width: '18px', height: '18px' }} />
          <span>Nueva Organización</span>
        </button>
      </motion.div>

      {/* Controls Bar */}
      <motion.div variants={itemVariants} className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          {/* Search */}
          <div className="relative" style={{ width: '300px' }}>
            <Search className="text-pizarra/50 absolute" style={{ width: '16px', height: '16px', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Buscar organización..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white text-texto placeholder:text-pizarra/50 text-sm rounded-md border border-borde focus:outline-none focus:ring-2 focus:ring-primario/30 focus:border-primario/40 transition-all font-medium shadow-sm"
              style={{ padding: '8px 12px 8px 36px' }}
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
            <Filter className="w-4 h-4 text-pizarra/50 shrink-0 mr-1" />
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                  activeFilter === f 
                    ? 'bg-primario text-white border-primario' 
                    : 'bg-white text-pizarra/70 border-borde hover:bg-canvas'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-white border border-borde rounded-md p-1 shrink-0 shadow-sm">
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-canvas text-primario shadow-sm' : 'text-pizarra/50 hover:text-pizarra'}`}
            title="Vista de Lista"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-canvas text-primario shadow-sm' : 'text-pizarra/50 hover:text-pizarra'}`}
            title="Vista de Tarjetas"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div variants={itemVariants}>
        {viewMode === 'list' ? (
          <OrganizacionesTable data={filteredData} />
        ) : (
          <OrganizacionesGrid data={filteredData} />
        )}
        <div className="mt-4 flex justify-between items-center text-xs font-medium text-pizarra/60">
          <span>Mostrando {filteredData.length} de {organizaciones.length} organizaciones</span>
          {/* Mock Pagination */}
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded border border-borde flex items-center justify-center bg-white hover:bg-canvas transition-colors text-pizarra">&lt;</button>
            <button className="w-7 h-7 rounded border border-primario flex items-center justify-center bg-primario/10 text-primario font-bold">1</button>
            <button className="w-7 h-7 rounded border border-borde flex items-center justify-center bg-white hover:bg-canvas transition-colors text-pizarra">2</button>
            <button className="w-7 h-7 rounded border border-borde flex items-center justify-center bg-white hover:bg-canvas transition-colors text-pizarra">&gt;</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
