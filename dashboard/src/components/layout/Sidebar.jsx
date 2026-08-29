import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LogoSantaFe from '../../assets/logo-santa-fe.png';
import {
  Dashboard,
  Enterprise,
  Group,
  ChartBar,
  Network_2,
  Catalog,
  Document,
  Education
} from '@carbon/icons-react';

const navSections = [
  {
    category: 'PRINCIPAL',
    items: [
      { name: 'Panel Ejecutivo', path: '/', icon: Dashboard, end: true },
      { name: 'Oportunidades', path: '/oportunidades', icon: Catalog },
      { name: 'Organizaciones', path: '/organizaciones', icon: Enterprise },
      { name: 'Beneficiarios', path: '/beneficiarios', icon: Group },
      { name: 'Convenios', path: '/convenios', icon: Document },
      { name: 'Talleres', path: '/talleres', icon: Education },
    ],
  },
  {
    category: 'ANÁLISIS',
    items: [
      { name: 'Gráficos', path: '/graficos', icon: ChartBar },
      { name: 'Grafo de Vínculos', path: '/grafo', icon: Network_2 },
    ],
  },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 backdrop-blur-sm z-40 lg:hidden"
            style={{ backgroundColor: 'rgba(107, 19, 48, 0.5)' }}
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 w-[280px] h-screen shrink-0 text-white flex flex-col justify-between z-50 shadow-2xl lg:shadow-none select-none transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ backgroundColor: '#6B1330' }}
      >
        <div className="flex flex-col min-h-0">
          {/* Brand / Logo */}
          <div className="h-24 flex items-center border-b border-white/10 shrink-0" style={{ padding: '0 28px', gap: '14px' }}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center shrink-0 overflow-hidden shadow-sm"
              style={{ padding: '6px' }}
            >
              <img 
                src={LogoSantaFe} 
                alt="Santa Fe Provincia" 
                className="w-full h-full object-contain" 
              />
            </motion.div>
            <div>
              <h1 className="font-bold text-lg leading-tight tracking-wide text-white">
                Germinando
              </h1>
              <p className="text-[12px] text-white/70 font-medium whitespace-nowrap">
                Gobierno de Santa Fe
              </p>
            </div>
          </div>

          {/* Navigation Sections */}
          <nav className="overflow-y-auto" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
            {navSections.map((section) => (
              <div key={section.category} className="mb-2">
                <div className="flex flex-col">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.end}
                        onClick={onClose}
                        style={{
                          padding: '14px 32px',
                          gap: '14px',
                          position: 'relative'
                        }}
                        className={({ isActive }) =>
                          `relative flex items-center text-[15px] transition-colors duration-150 ${
                            isActive
                              ? 'text-[#6B1330] font-bold'
                              : 'text-white/80 hover:bg-white/5 hover:text-white font-medium'
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {isActive && (
                              <motion.div
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                style={{ transformOrigin: 'right center', backgroundColor: '#F5F6F8', right: '-2px' }}
                                className="absolute inset-y-0 -right-[2px] left-4 rounded-l-2xl z-20"
                                transition={{
                                  type: 'spring',
                                  stiffness: 320,
                                  damping: 26,
                                  mass: 0.8,
                                }}
                              >
                                {/* Top scoop fillet */}
                                <motion.svg 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.2, ease: 'easeOut' }}
                                  className="absolute -top-4 right-0 w-4 h-4 pointer-events-none" 
                                  viewBox="0 0 16 16" 
                                  fill="none"
                                >
                                  <path d="M0 16 C 8.836 16 16 8.836 16 0 L 16 16 Z" fill="#F5F6F8" />
                                </motion.svg>
                                {/* Bottom scoop fillet */}
                                <motion.svg 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.2, ease: 'easeOut' }}
                                  className="absolute -bottom-4 right-0 w-4 h-4 pointer-events-none" 
                                  viewBox="0 0 16 16" 
                                  fill="none"
                                >
                                  <path d="M0 0 C 8.836 0 16 7.164 16 16 L 16 0 Z" fill="#F5F6F8" />
                                </motion.svg>
                              </motion.div>
                            )}
                            <Icon className="shrink-0 relative z-30" size={20} />
                            <span className="truncate relative z-30">{item.name}</span>
                          </>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-auto">
          {/* User Profile */}
          <div style={{ paddingTop: '16px', paddingBottom: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <NavLink
              to="/perfil"
              onClick={onClose}
              style={{
                padding: '14px 32px',
                gap: '14px',
                display: 'flex',
                alignItems: 'center',
                position: 'relative'
              }}
              className={({ isActive }) =>
                `relative text-[15px] transition-colors duration-150 ${
                  isActive
                    ? 'text-[#6B1330] font-bold'
                    : 'text-white/80 hover:bg-white/5 hover:text-white font-medium'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      style={{ transformOrigin: 'right center', backgroundColor: '#F5F6F8', right: '-2px' }}
                      className="absolute inset-y-0 -right-[2px] left-4 rounded-l-2xl z-20"
                      transition={{
                        type: 'spring',
                        stiffness: 320,
                        damping: 26,
                        mass: 0.8,
                      }}
                    >
                      {/* Top scoop fillet */}
                      <motion.svg 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute -top-4 right-0 w-4 h-4 pointer-events-none" 
                        viewBox="0 0 16 16" 
                        fill="none"
                      >
                        <path d="M0 16 C 8.836 16 16 8.836 16 0 L 16 16 Z" fill="#F5F6F8" />
                      </motion.svg>
                      {/* Bottom scoop fillet */}
                      <motion.svg 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute -bottom-4 right-0 w-4 h-4 pointer-events-none" 
                        viewBox="0 0 16 16" 
                        fill="none"
                      >
                        <path d="M0 0 C 8.836 0 16 7.164 16 16 L 16 0 Z" fill="#F5F6F8" />
                      </motion.svg>
                    </motion.div>
                  )}
                  <div className={`rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 relative z-30 transition-colors ${
                    isActive ? 'bg-[#6B1330] text-white' : 'bg-white/20 text-white'
                  }`} style={{ width: '24px', height: '24px' }}>
                    DG
                  </div>
                  <span className="truncate relative z-30">Director General</span>
                </>
              )}
            </NavLink>
          </div>

          {/* Footer */}
          <div className="pb-6 pt-2 text-center shrink-0">
            <p className="text-xs text-superficie-sec/60">
              Programa Germinando © 2026
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
