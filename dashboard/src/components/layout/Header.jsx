import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlass, Bell, List, Warning, Tag, Clock, ArrowRight } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { dropdownVariants } from '../../lib/motionTokens';

export default function Header({ onMenuClick }) {
  const { organizaciones, beneficiarios, convenios, talleres, alertas } = useData();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setIsSearchFocused(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return [];
    const term = searchTerm.toLowerCase();
    const results = [];

    organizaciones.forEach(org => {
      if ((org.nombre || "").toLowerCase().includes(term) || (org.localizacion || "").toLowerCase().includes(term)) {
        results.push({ type: 'Organización', text: org.nombre, route: '/organizaciones', state: { openModalId: org.id } });
      }
    });
    beneficiarios.forEach(ben => {
      if ((ben.nombre || "").toLowerCase().includes(term) || (ben.dni || "").includes(term)) {
        results.push({ type: 'Beneficiario', text: ben.nombre, subtext: `DNI: ${ben.dni}`, route: '/beneficiarios', state: { search: ben.dni } });
      }
    });
    convenios.forEach(conv => {
      if ((conv.nombre || "").toLowerCase().includes(term) || conv.expediente?.includes(term)) {
        results.push({ type: 'Convenio', text: conv.nombre, subtext: conv.expediente, route: '/convenios' });
      }
    });
    talleres.forEach(tall => {
      if ((tall.nombre || "").toLowerCase().includes(term)) {
        results.push({ type: 'Taller', text: tall.nombre, route: '/talleres' });
      }
    });

    return results.slice(0, 8);
  }, [searchTerm, organizaciones, beneficiarios, convenios, talleres]);

  const handleSearchNavigate = (result) => {
    setIsSearchOpen(false);
    setIsSearchFocused(false);
    setSearchTerm('');
    navigate(result.route, { state: result.state });
  };

  const getAlertIcon = (tipo, prioridad) => {
    const props = { 
      weight: "duotone", 
      style: { width: '20px', height: '20px' },
      className: prioridad === 'critica' ? 'text-critico' : prioridad === 'alta' ? 'text-naranja' : 'text-pizarra'
    };
    if (tipo === 'oportunidad') return <Tag {...props} />;
    if (tipo === 'sin_actualizacion') return <Clock {...props} />;
    return <Warning {...props} />;
  };

  return (
    <header className="bg-superficie border-b border-borde flex items-center justify-between sticky top-0 z-40 shrink-0" style={{ height: '80px', padding: '0 clamp(24px, 5vw, 48px)', gap: '16px' }}>
      {/* Left side: Hamburger + Search */}
      <div className="flex items-center" style={{ gap: '16px' }}>
        <button 
          type="button" 
          onClick={onMenuClick}
          className="lg:hidden text-pizarra hover:bg-superficie-sec rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primario cursor-pointer"
          style={{ padding: '8px' }}
        >
          <List style={{ width: '24px', height: '24px' }} />
        </button>
        
        <motion.div 
          layout
          className="relative hidden sm:block z-50 transition-all duration-200" 
          style={{ width: isSearchFocused ? '420px' : '340px' }} 
          ref={searchRef}
        >
          <MagnifyingGlass className="text-pizarra/60 absolute pointer-events-none" style={{ width: '18px', height: '18px', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Buscar organización, expediente o DNI..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => {
              setIsSearchFocused(true);
              if (searchTerm.length >= 2) setIsSearchOpen(true);
            }}
            onBlur={() => {
              if (!searchTerm) setIsSearchFocused(false);
            }}
            className="w-full bg-canvas text-texto placeholder:text-pizarra/60 text-[14px] rounded-md focus:outline-none focus:ring-2 focus:ring-primario/30 border border-transparent focus:border-primario/40 transition-all font-medium shadow-sm"
            style={{ padding: '12px 16px 12px 42px' }}
          />
          
          {/* Search Results Dropdown */}
          <AnimatePresence>
            {isSearchOpen && searchTerm.length >= 2 && (
              <motion.div 
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-borde overflow-hidden flex flex-col" 
                style={{ maxHeight: '400px' }}
              >
                <div className="px-4 py-2 bg-canvas/50 border-b border-borde text-xs font-bold text-pizarra/60 uppercase">
                  Resultados de búsqueda
                </div>
                <div className="overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map((res, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ backgroundColor: 'rgba(245, 246, 248, 1)' }}
                        onClick={() => handleSearchNavigate(res)}
                        className="w-full text-left px-4 py-3 border-b border-borde last:border-b-0 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-primario mb-0.5">{res.type}</span>
                          <span className="text-sm font-semibold text-texto">{res.text}</span>
                          {res.subtext && <span className="text-xs text-pizarra/60">{res.subtext}</span>}
                        </div>
                        <ArrowRight className="text-pizarra/30 group-hover:text-primario transition-colors group-hover:translate-x-0.5" style={{ width: '16px', height: '16px' }} />
                      </motion.button>
                    ))
                  ) : (
                    <div className="p-6 text-center text-sm font-medium text-pizarra/60">
                      No se encontraron resultados para "{searchTerm}"
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Right side: Notifications */}
      <div className="flex items-center relative" ref={notifRef}>
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsNotifOpen(!isNotifOpen)}
          className={`relative text-pizarra/80 hover:text-pizarra hover:bg-canvas rounded-lg transition-colors cursor-pointer flex items-center justify-center ${isNotifOpen ? 'bg-canvas' : ''}`}
          title="Notificaciones"
          style={{ padding: '10px' }}
        >
          <Bell style={{ width: '22px', height: '22px' }} />
          {alertas && alertas.length > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.6 }}
              className="absolute bg-critico text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white" 
              style={{ width: '18px', height: '18px', top: '4px', right: '4px' }}
            >
              {alertas.length}
            </motion.span>
          )}
        </motion.button>

        {/* Notifications Dropdown */}
        <AnimatePresence>
          {isNotifOpen && (
            <motion.div 
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-borde overflow-hidden flex flex-col z-50"
            >
              <div className="p-4 border-b border-borde flex items-center justify-between bg-canvas/50">
                <h3 className="font-bold text-pizarra text-sm">Notificaciones</h3>
                <span className="text-xs font-bold bg-naranja/10 text-naranja px-2 py-0.5 rounded-full">{alertas.length} nuevas</span>
              </div>
              
              <div className="overflow-y-auto" style={{ maxHeight: '350px' }}>
                {alertas.length > 0 ? (
                  alertas.map(alerta => (
                    <motion.div 
                      key={alerta.id} 
                      whileHover={{ backgroundColor: 'rgba(245, 246, 248, 0.7)' }}
                      onClick={() => {
                        setIsNotifOpen(false);
                        navigate('/oportunidades');
                      }}
                      className="p-4 border-b border-borde last:border-0 transition-colors cursor-pointer flex gap-3"
                    >
                      <div className="shrink-0 mt-1">
                        {getAlertIcon(alerta.tipo, alerta.prioridad)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-texto leading-snug">{alerta.mensaje}</p>
                        <p className="text-xs text-pizarra/60 mt-1">{new Date(alerta.fecha).toLocaleDateString('es-AR')}</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-6 text-center text-sm font-medium text-pizarra/60">
                    No hay notificaciones pendientes.
                  </div>
                )}
              </div>

              <div className="p-3 border-t border-borde bg-canvas/50 text-center">
                <button 
                  onClick={() => {
                    setIsNotifOpen(false);
                    navigate('/oportunidades');
                  }}
                  className="text-xs font-bold text-primario hover:underline cursor-pointer"
                >
                  Ver Central de Alertas y Oportunidades &rarr;
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
