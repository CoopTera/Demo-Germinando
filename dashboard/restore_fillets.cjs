const fs = require('fs');

const content = `import React from 'react';
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

function ActivePill({ collapsed }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      style={{ transformOrigin: 'right center', backgroundColor: '#EBEDF2', right: '-2px' }}
      className={\`absolute inset-y-0 -right-[2px] rounded-l-2xl z-20 \${collapsed ? 'left-3' : 'left-4'}\`}
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

export default function Sidebar({ isOpen, onClose, collapsed }) {
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
        initial={false}
        animate={{ width: collapsed ? 72 : 280 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 0.8 }}
        className={\`fixed lg:static inset-y-0 left-0 h-screen shrink-0 text-white flex flex-col justify-between z-50 border-r border-white/10 lg:border-r-0 select-none \${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }\`}
        style={{ backgroundColor: '#6B1330' }}
      >
        <div className="flex flex-col min-h-0">
          {/* Brand Header */}
          <div
            className="h-24 flex items-center border-b border-white/10 shrink-0"
            style={{ paddingLeft: '16px', paddingRight: '16px', gap: '14px' }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 flex items-center justify-center shrink-0"
            >
              <img src={LogoSantaFe} alt="Santa Fe Provincia" className="w-full h-full object-contain" />
            </motion.div>

            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2, ease: 'easeOut', delay: 0.05 }}
                  className="overflow-hidden whitespace-nowrap shrink-0"
                >
                  <h1 className="font-bold text-lg leading-tight tracking-wide text-white">Germinando</h1>
                  <p className="text-[12px] text-white/70 font-medium">Gobierno de Santa Fe</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Links */}
          <nav className="overflow-y-auto overflow-x-visible" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
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
                        title={collapsed ? item.name : undefined}
                        style={{
                          paddingTop: '14px',
                          paddingBottom: '14px',
                          paddingLeft: '26px',
                          paddingRight: '16px',
                          gap: '14px',
                          position: 'relative',
                        }}
                        className={({ isActive }) =>
                          \`relative flex items-center text-[15px] transition-colors duration-150 whitespace-nowrap \${
                            isActive ? 'text-[#6B1330] font-bold' : 'text-white/80 hover:bg-white/5 hover:text-white font-medium'
                          }\`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {isActive && <ActivePill collapsed={collapsed} />}
                            <Icon className="shrink-0 relative z-30" size={20} />
                            <AnimatePresence mode="wait">
                              {!collapsed && (
                                <motion.span
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  transition={{ duration: 0.2, ease: 'easeOut', delay: 0.05 }}
                                  className="truncate relative z-30"
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

        {/* Footer / Profile */}
        <div className="mt-auto">
          <div style={{ paddingTop: '16px', paddingBottom: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <NavLink
              to="/perfil"
              onClick={onClose}
              title={collapsed ? 'Director General' : undefined}
              style={{
                paddingTop: '14px',
                paddingBottom: '14px',
                paddingLeft: '24px',
                paddingRight: '16px',
                gap: '14px',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
              className={({ isActive }) =>
                \`relative text-[15px] transition-colors duration-150 whitespace-nowrap \${
                  isActive ? 'text-[#6B1330] font-bold' : 'text-white/80 hover:bg-white/5 hover:text-white font-medium'
                }\`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <ActivePill collapsed={collapsed} />}
                  <div
                    className={\`rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 relative z-30 transition-colors \${
                      isActive ? 'bg-[#6B1330] text-white' : 'bg-white/20 text-white'
                    }\`}
                    style={{ width: '24px', height: '24px' }}
                  >
                    DG
                  </div>
                  <AnimatePresence mode="wait">
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2, ease: 'easeOut', delay: 0.05 }}
                        className="truncate relative z-30"
                      >
                        Director General
                      </motion.span>
                    )}
                  </AnimatePresence>
                </>
              )}
            </NavLink>
          </div>

          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="pb-6 pt-2 text-center shrink-0 whitespace-nowrap overflow-hidden"
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
console.log('Restored rounded scoop fillets perfectly!');
