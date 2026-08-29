import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, List, Grid } from '@carbon/icons-react';
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
  viewMode,
  setViewMode,
  totalItems,
  filteredItemsCount,
  children
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onImport) {
      onImport(file);
    }
    e.target.value = null;
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
                whileHover={{ y: -1, backgroundColor: '#f8fafc' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center border border-borde bg-white text-pizarra text-[14px] font-semibold rounded-md transition-colors shadow-sm cursor-pointer" 
                style={{ padding: '10px 20px' }}
              >
                <span>Importar</span>
              </motion.button>
            </>
          )}
          
          {onNew && (
            <motion.button 
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNew}
              className="flex items-center bg-primario hover:bg-primario/90 text-white text-[14px] font-semibold rounded-lg transition-all shadow-sm hover:shadow cursor-pointer" 
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
              whileHover={{ y: -1 }}
              className="bg-white rounded-lg border border-borde text-sm flex items-center card-elevated" 
              style={{ padding: '10px 16px' }}
            >
              {stat.label && <span className={stat.labelColor || "text-pizarra/50"} style={{ marginRight: '4px' }}>{stat.label}:</span>}
              <span className={`font-bold ${stat.valueColor || 'text-pizarra'}`}>
                {stat.value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Controls Bar (Search + Filters + View Toggle) */}
      <motion.div variants={staggerItemVariants} className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row md:items-center flex-1" style={{ gap: '16px' }}>
          {/* Search */}
          <div className="relative flex-1" style={{ maxWidth: '320px' }}>
            <Search size={16} className="text-pizarra/40 absolute pointer-events-none" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-white text-texto placeholder:text-pizarra/40 text-sm rounded-lg border border-borde focus:outline-none focus:ring-2 focus:ring-primario/20 focus:border-primario/30 transition-all shadow-sm"
              style={{ padding: '8px 16px 8px 36px' }}
            />
          </div>

          {/* Filters with animated layout indicator */}
          {filtros.length > 0 && (
            <div className="flex items-center overflow-x-auto pb-1 hide-scrollbar" style={{ gap: '6px' }}>
              <Filter size={16} className="text-pizarra/40 shrink-0" style={{ marginRight: '4px' }} />
              {filtros.map((f) => {
                const isSelected = filtroActivo === f;
                const isWarning = f === 'Sin seguimiento';
                return (
                  <button
                    key={f}
                    onClick={() => setFiltroActivo(f)}
                    className={`relative whitespace-nowrap rounded-full text-xs font-semibold cursor-pointer border transition-colors ${
                      isSelected
                        ? isWarning
                          ? 'text-white border-naranja shadow-sm'
                          : 'text-white border-primario shadow-sm'
                        : 'bg-white text-pizarra/70 border-borde hover:border-primario/30 hover:text-primario'
                    }`}
                    style={{ padding: '6px 14px' }}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeCategoryFilterPill"
                        className={`absolute inset-0 rounded-full ${isWarning ? 'bg-naranja' : 'bg-primario'}`}
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        style={{ zIndex: 0 }}
                      />
                    )}
                    <span className="relative z-10">{f}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* View Toggle */}
        {setViewMode && (
          <div className="flex items-center bg-white border border-borde rounded-lg p-1 shrink-0 shadow-sm relative">
            <button
              onClick={() => setViewMode('list')}
              className={`relative rounded-md cursor-pointer transition-colors z-10 ${viewMode === 'list' ? 'text-primario font-bold' : 'text-pizarra/50 hover:text-pizarra'}`}
              title="Vista de Lista"
              style={{ padding: '6px 10px' }}
            >
              {viewMode === 'list' && (
                <motion.div
                  layoutId="viewModeSwitchPill"
                  className="absolute inset-0 bg-canvas rounded-md border border-borde/60 shadow-sm -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`relative rounded-md cursor-pointer transition-colors z-10 ${viewMode === 'grid' ? 'text-primario font-bold' : 'text-pizarra/50 hover:text-pizarra'}`}
              title="Vista de Cuadrícula"
              style={{ padding: '6px 10px' }}
            >
              {viewMode === 'grid' && (
                <motion.div
                  layoutId="viewModeSwitchPill"
                  className="absolute inset-0 bg-canvas rounded-md border border-borde/60 shadow-sm -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Grid size={16} />
            </button>
          </div>
        )}
      </motion.div>

      {/* Content */}
      <motion.div variants={staggerItemVariants}>
        {children}
        <div className="flex items-center justify-between" style={{ marginTop: '16px', padding: '0 8px' }}>
          <p className="text-xs text-pizarra/40 font-medium">
            Mostrando <span className="font-semibold text-pizarra/60">{filteredItemsCount}</span> de{' '}
            <span className="font-semibold text-pizarra/60">{totalItems}</span> registros
          </p>
          <div className="flex items-center" style={{ gap: '4px' }}>
            <button className="rounded-lg text-xs font-medium bg-primario text-white cursor-pointer" style={{ padding: '6px 12px' }}>1</button>
            <button className="rounded-lg text-xs font-medium text-pizarra/50 hover:bg-superficie-sec cursor-pointer" style={{ padding: '6px 12px' }}>2</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
