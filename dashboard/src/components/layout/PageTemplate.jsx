import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, List, Grid, ChevronDown, Close } from '@carbon/icons-react';
import { pageContainerVariants, staggerItemVariants } from '../../lib/motionTokens';

export default function PageTemplate({
  title,
  subtitle,
  onImport,
  onNew,
  newButtonText,
  stats = [],
  busqueda,
  setBusqueda,
  filtros = [],
  filtroActivo,
  setFiltroActivo,
  filterGroups,
  viewMode,
  setViewMode,
  totalItems,
  filteredItemsCount,
  children
}) {
  const fileInputRef = useRef(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onImport) {
      onImport(file);
    }
    e.target.value = null;
  };

  // Normalize filter groups
  const groups = filterGroups || (filtros.length > 0 ? [{
    label: 'Categoría',
    options: filtros,
    active: filtroActivo,
    onChange: setFiltroActivo,
    defaultVal: filtros[0] || 'Todas',
    layoutId: 'activeCategoryFilterPill'
  }] : []);

  const activeFilters = groups.filter(g => g.active && g.active !== (g.defaultVal || 'Todas') && g.active !== 'Todos');
  const hasActiveFilter = activeFilters.length > 0;

  const handleResetFilters = (e) => {
    if (e) e.stopPropagation();
    groups.forEach(g => {
      if (g.onChange) g.onChange(g.defaultVal || 'Todas');
    });
  };

  const getFilterButtonLabel = () => {
    if (!hasActiveFilter) return 'Filtros';
    if (activeFilters.length === 1) {
      const active = activeFilters[0];
      const val = active.formatLabel ? active.formatLabel(active.active) : active.active;
      return `${active.label}: ${val}`;
    }
    return `Filtros (${activeFilters.length})`;
  };

  return (
    <motion.div 
      className="flex flex-col" 
      style={{ gap: '24px' }}
      variants={pageContainerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Page Header */}
      <motion.div variants={staggerItemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-pizarra">
            {title}
          </h1>
          <p className="text-sm text-pizarra/60" style={{ marginTop: '4px' }}>
            {subtitle}
          </p>
        </div>

        <div className="flex items-center" style={{ gap: '12px' }}>
          {onImport && (
            <>
              <input 
                type="file" 
                accept=".xlsx, .xls" 
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }} 
              />
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center bg-white text-pizarra text-[14px] font-semibold rounded-xl transition-all cursor-pointer card-elevated" 
                style={{ padding: '10px 20px' }}
              >
                <span>Importar</span>
              </motion.button>
            </>
          )}
          
          {onNew && (
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onNew}
              className="flex items-center bg-primario hover:bg-primario/90 text-white text-[14px] font-semibold rounded-xl transition-all cursor-pointer card-elevated" 
              style={{ padding: '10px 20px' }}
            >
              {newButtonText || 'Nuevo Registro'}
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Stats Bar */}
      {stats.length > 0 && (
        <motion.div variants={staggerItemVariants} className="flex flex-wrap items-center" style={{ gap: '16px' }}>
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl text-sm flex items-center card-elevated" 
              style={{ padding: '12px 20px' }}
            >
              {stat.label && <span className={stat.labelColor || "text-pizarra/50"} style={{ marginRight: '6px' }}>{stat.label}:</span>}
              <span className={`font-bold whitespace-nowrap ${stat.valueColor || 'text-pizarra'}`}>
                {stat.value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Controls Bar (Search + Minimized Filter Trigger + View Toggle) */}
      <motion.div variants={staggerItemVariants} className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-1 max-w-full flex-wrap sm:flex-nowrap">
            {/* Search Input */}
            <div className="relative flex-1 sm:max-w-[320px] min-w-[200px]">
              <Search size={16} className="text-pizarra/40 absolute pointer-events-none" style={{ left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full bg-white text-texto placeholder:text-pizarra/40 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primario/20 transition-all font-medium card-elevated"
                style={{ padding: '10px 16px 10px 38px' }}
              />
            </div>

            {/* Minimized Filter Trigger (Toggles Pills) */}
            {groups.length > 0 && (
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 text-xs font-semibold rounded-xl transition-all cursor-pointer select-none card-elevated ${
                  hasActiveFilter
                    ? 'bg-primario text-white'
                    : isFilterOpen
                    ? 'bg-white text-primario font-bold'
                    : 'bg-white text-pizarra/80 hover:text-primario'
                }`}
                style={{ padding: '10px 16px' }}
              >
                <Filter size={15} className={hasActiveFilter ? 'text-white' : 'text-pizarra/60'} />
                <span className="whitespace-nowrap font-medium">
                  {getFilterButtonLabel()}
                </span>
                {hasActiveFilter && (
                  <span 
                    onClick={handleResetFilters}
                    className="hover:bg-white/20 rounded-full p-0.5 ml-0.5 text-white"
                    title="Quitar filtros"
                  >
                    <Close size={12} />
                  </span>
                )}
                <ChevronDown 
                  size={14} 
                  className={`transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''} ${hasActiveFilter ? 'text-white' : 'text-pizarra/40'}`} 
                />
              </motion.button>
            )}
          </div>

          {/* View Toggle */}
          {setViewMode && (
            <div className="flex items-center bg-white rounded-xl p-1 shrink-0 self-start sm:self-auto card-elevated">
              <button
                onClick={() => setViewMode('list')}
                className={`relative rounded-lg cursor-pointer transition-colors z-10 ${viewMode === 'list' ? 'text-primario font-bold' : 'text-pizarra/50 hover:text-pizarra'}`}
                title="Vista de Lista"
                style={{ padding: '6px 12px' }}
              >
                {viewMode === 'list' && (
                  <motion.div
                    layoutId="viewModeSwitchPill"
                    className="absolute inset-0 bg-canvas rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`relative rounded-lg cursor-pointer transition-colors z-10 ${viewMode === 'grid' ? 'text-primario font-bold' : 'text-pizarra/50 hover:text-pizarra'}`}
                title="Vista de Cuadrícula"
                style={{ padding: '6px 12px' }}
              >
                {viewMode === 'grid' && (
                  <motion.div
                    layoutId="viewModeSwitchPill"
                    className="absolute inset-0 bg-canvas rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Grid size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Collapsible Pill Groups (Expands smoothly on tap showing all filter pill rows) */}
        <AnimatePresence>
          {isFilterOpen && groups.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-2.5 pt-2 pb-2">
                {groups.map((group, gIdx) => (
                  <div key={gIdx} className="flex items-center flex-wrap gap-2">
                    <span className="text-xs font-bold text-pizarra/60 uppercase tracking-wider shrink-0 mr-1 min-w-[70px]">
                      {group.label}:
                    </span>
                    {group.options.map((opt) => {
                      const isSelected = group.active === opt;
                      const isWarning = opt === 'Sin seguimiento';
                      const displayLabel = group.formatLabel ? group.formatLabel(opt) : opt;
                      return (
                        <motion.button
                          key={opt}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => group.onChange && group.onChange(opt)}
                          className={`relative whitespace-nowrap rounded-full text-xs font-semibold cursor-pointer transition-all card-elevated ${
                            isSelected
                              ? 'text-white font-bold'
                              : 'bg-white text-pizarra/80 hover:text-primario'
                          }`}
                          style={{ padding: '7px 16px' }}
                        >
                          {isSelected && (
                            <motion.div
                              layoutId={group.layoutId || `activeFilterPill_${gIdx}`}
                              className={`absolute inset-0 rounded-full ${
                                isWarning
                                  ? 'bg-naranja'
                                  : group.label === 'Ciudad'
                                  ? 'bg-pizarra'
                                  : 'bg-primario'
                              }`}
                              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                              style={{ zIndex: 0 }}
                            />
                          )}
                          <span className="relative z-10">{displayLabel}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Content */}
      <motion.div variants={staggerItemVariants}>
        {children}
        <div className="flex items-center justify-between" style={{ marginTop: '20px', padding: '0 8px' }}>
          <p className="text-xs text-pizarra/40 font-medium">
            Mostrando <span className="font-semibold text-pizarra/60">{filteredItemsCount}</span> de{' '}
            <span className="font-semibold text-pizarra/60">{totalItems}</span> registros
          </p>
          <div className="flex items-center" style={{ gap: '6px' }}>
            <button className="rounded-xl text-xs font-semibold bg-primario text-white cursor-pointer card-elevated" style={{ padding: '7px 14px' }}>1</button>
            <button className="rounded-xl text-xs font-semibold bg-white text-pizarra/60 hover:text-pizarra cursor-pointer card-elevated" style={{ padding: '7px 14px' }}>2</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
