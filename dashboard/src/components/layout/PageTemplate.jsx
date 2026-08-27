import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Upload, Plus, List, LayoutGrid } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function PageTemplate({
  icon: Icon,
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
  viewMode, // 'list' or 'grid' (optional)
  setViewMode, // function (optional)
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
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-pizarra flex items-center" style={{ gap: '8px' }}>
            {Icon && <Icon style={{ width: '24px', height: '24px' }} />}
            {title}
          </h1>
          <p className="text-sm text-pizarra/50" style={{ marginTop: '4px' }}>
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
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center border border-borde bg-white hover:bg-canvas text-pizarra text-[14px] font-semibold rounded-md transition-colors shadow-sm cursor-pointer" 
                style={{ padding: '10px 20px', gap: '8px' }}
              >
                <Upload className="stroke-[2.5]" style={{ width: '18px', height: '18px' }} />
                <span>Importar</span>
              </button>
            </>
          )}
          
          {onNew && (
            <button 
              onClick={onNew}
              className="flex items-center bg-primario hover:bg-primario/90 text-white text-[14px] font-semibold rounded-lg transition-colors shadow-sm cursor-pointer" 
              style={{ padding: '10px 20px', gap: '8px' }}
            >
              <Plus style={{ width: '16px', height: '16px' }} />
              {newButtonText || 'Nuevo Registro'}
            </button>
          )}
        </div>
      </motion.div>

      {/* Stats Bar */}
      {stats.length > 0 && (
        <motion.div variants={itemVariants} className="flex flex-wrap items-center" style={{ gap: '16px' }}>
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-lg border text-sm flex items-center card-elevated ${stat.bgColor || 'border-borde'}`} 
              style={{ padding: '10px 16px', gap: stat.icon ? '8px' : '0' }}
            >
              {stat.icon && <stat.icon className={`${stat.iconColor} ${stat.pulse ? 'animate-pulse-soft' : ''}`} style={{ width: '16px', height: '16px' }} />}
              <span className={stat.labelColor || "text-pizarra/50"} style={{ marginRight: '4px' }}>{stat.label}:</span>
              <span className={`font-bold ${stat.valueColor || 'text-pizarra'}`}>
                {stat.value}
              </span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Controls Bar (Search + Filters + View Toggle) */}
      <motion.div variants={itemVariants} className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row md:items-center flex-1" style={{ gap: '16px' }}>
          {/* Search */}
          <div className="relative flex-1" style={{ maxWidth: '320px' }}>
            <Search className="text-pizarra/40 absolute" style={{ width: '16px', height: '16px', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-white text-texto placeholder:text-pizarra/40 text-sm rounded-lg border border-borde focus:outline-none focus:ring-2 focus:ring-primario/20 focus:border-primario/30 transition-all shadow-sm"
              style={{ padding: '8px 16px 8px 36px' }}
            />
          </div>

          {/* Filters */}
          {filtros.length > 0 && (
            <div className="flex items-center overflow-x-auto pb-1 hide-scrollbar" style={{ gap: '6px' }}>
              <Filter className="text-pizarra/40 shrink-0" style={{ width: '16px', height: '16px', marginRight: '4px' }} />
              {filtros.map((f) => (
                <button
                  key={f}
                  onClick={() => setFiltroActivo(f)}
                  className={`whitespace-nowrap rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                    filtroActivo === f
                      ? f === 'Sin seguimiento'
                        ? 'bg-naranja text-white border-naranja shadow-sm'
                        : 'bg-primario text-white border-primario shadow-sm'
                      : 'bg-white text-pizarra/70 border-borde hover:border-primario/30 hover:text-primario'
                  }`}
                  style={{ padding: '6px 12px' }}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* View Toggle */}
        {setViewMode && (
          <div className="flex items-center bg-white border border-borde rounded-md p-1 shrink-0 shadow-sm">
            <button
              onClick={() => setViewMode('list')}
              className={`rounded cursor-pointer transition-colors ${viewMode === 'list' ? 'bg-canvas text-primario shadow-sm' : 'text-pizarra/50 hover:text-pizarra'}`}
              title="Vista de Lista"
              style={{ padding: '6px' }}
            >
              <List style={{ width: '16px', height: '16px' }} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded cursor-pointer transition-colors ${viewMode === 'grid' ? 'bg-canvas text-primario shadow-sm' : 'text-pizarra/50 hover:text-pizarra'}`}
              title="Vista de Tarjetas"
              style={{ padding: '6px' }}
            >
              <LayoutGrid style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        )}
      </motion.div>

      {/* Content */}
      <motion.div variants={itemVariants}>
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
