const fs = require('fs');

const content = `import React, { useState } from 'react';
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
  Education,
  SidePanelOpen,
  SidePanelClose,
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

function ActivePill() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      style={{ transformOrigin: 'right center', backgroundColor: '#EBEDF2', right: '-2px' }}
      className="absolute inset-y-0 -right-[2px] left-4 rounded-l-2xl z-20"
      transition={{ type: 'spring', stiffness: 320, damping: 26, mass: 0.8 }}
    >
      <motion.svg
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="absolute -top-4 right-0 w-4 h-4 pointer-events-none"
        viewBox="0 0 16 16" fill="none"
      >
        <path d="M0 16 C 8.836 16 16 8.836 16 0 L 16 16 Z" fill="#EBEDF2" />
      </motion.svg>
      <motion.svg
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="absolute -bottom-4 right-0 w-4 h-4 pointer-events-none"
        viewBox="0 0 16 16" fill="none"
      >
        <path d="M0 0 C 8.836 0 16 7.164 16 16 L 16 0 Z" fill="#EBEDF2" />
      </motion.svg>
    </motion.div>
  );
}

export default function Sidebar({ isOpen, onClose, collapsed, onToggleCollapse }) {
  return (
    <>
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

      <motion.aside
        animate={{ width: collapsed ? 72 : 280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
        className={\`fixed lg:static inset-y-0 left-0 h-screen shrink-0 text-white flex flex-col justify-between z-50 border-r border-white/10 lg:border-r-0 select-none overflow-hidden \${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }\`}
        style={{ backgroundColor: '#6B1330', minWidth: collapsed ? 72 : 280 }}
      >
        <div className="flex flex-col min-h-0">
          <div
            className="h-24 flex items-center border-b border-white/10 shrink-0 relative"
            style={{ padding: collapsed ? '0 16px' : '0 28px', gap: '14px', justifyContent: collapsed ? 'center' : 'flex-start' }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 flex items-center justify-center shrink-0"
            >
              <img src={LogoSantaFe} alt="Santa Fe Provincia" className="w-full h-full object-contain" />
            </motion.div>

            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.18 }}
                  className="overflow-hidden"
                >
                  <h1 className="font-bold text-lg leading-tight tracking-wide text-white whitespace-nowrap">Germinando</h1>
                  <p className="text-[12px] text-white/70 font-medium whitespace-nowrap">Gobierno de Santa Fe</p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={onToggleCollapse}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hidden lg:flex items-center justify-center text-white/60 hover:text-white transition-colors rounded-md shrink-0"
              style={{
                position: collapsed ? 'static' : 'absolute',
                right: collapsed ? undefined : '12px',
                top: collapsed ? undefined : '50%',
                transform: collapsed ? undefined : 'translateY(-50%)',
                width: 28,
                height: 28,
              }}
              title={collapsed ? 'Expandir panel' : 'Contraer panel'}
            >
              {collapsed ? <SidePanelOpen size={18} /> : <SidePanelClose size={18} />}
            </motion.button>
          </div>

          <nav className="overflow-y-auto overflow-x-hidden" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
            {navSections.map((section) => (
              <div key={section.category} className="mb-2">
                <AnimatePresence>
                  {!collapsed && (
                    <motion.p
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-[10px] font-bold tracking-widest text-white/40 uppercase mb-1 px-8"
                    >
                      {section.category}
                    </motion.p>
                  )}
                </AnimatePresence>
                <div className="flex flex-col">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.end}
                        onClick={onClose}
                        title={collapsed ? item.name : undefined}
                        style={{
                          padding: collapsed ? '14px 0' : '14px 32px',
                          gap: '14px',
                          position: 'relative',
                          justifyContent: collapsed ? 'center' : 'flex-start',
                        }}
                        className={({ isActive }) =>
                          \`relative flex items-center text-[15px] transition-colors duration-150 \${
                            isActive ? 'text-[#6B1330] font-bold' : 'text-white/80 hover:bg-white/5 hover:text-white font-medium'
                          }\`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {isActive && <ActivePill />}
                            <Icon className="shrink-0 relative z-30" size={20} />
                            <AnimatePresence>
                              {!collapsed && (
                                <motion.span
                                  initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }}
                                  transition={{ duration: 0.15 }}
                                  className="truncate relative z-30 whitespace-nowrap"
                                >
                                  {item.name}
                                </motion.span>
                              )}
                            </AnimatePresence>
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
          <div style={{ paddingTop: '16px', paddingBottom: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <NavLink
              to="/perfil"
              onClick={onClose}
              title={collapsed ? 'Director General' : undefined}
              style={{
                padding: collapsed ? '14px 0' : '14px 32px',
                gap: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                position: 'relative',
              }}
              className={({ isActive }) =>
                \`relative text-[15px] transition-colors duration-150 \${
                  isActive ? 'text-[#6B1330] font-bold' : 'text-white/80 hover:bg-white/5 hover:text-white font-medium'
                }\`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <ActivePill />}
                  <div
                    className={\`rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 relative z-30 transition-colors \${
                      isActive ? 'bg-[#6B1330] text-white' : 'bg-white/20 text-white'
                    }\`}
                    style={{ width: '24px', height: '24px' }}
                  >
                    DG
                  </div>
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }}
                        transition={{ duration: 0.15 }}
                        className="truncate relative z-30 whitespace-nowrap"
                      >
                        Director General
                      </motion.span>
                    )}
                  </AnimatePresence>
                </>
              )}
            </NavLink>
          </div>

          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="pb-6 pt-2 text-center shrink-0"
              >
                <p className="text-xs text-superficie-sec/60">Programa Germinando © 2026</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </>
  );
}
`;

fs.writeFileSync('src/components/layout/Sidebar.jsx', content, 'utf8');
console.log('Sidebar written OK');
